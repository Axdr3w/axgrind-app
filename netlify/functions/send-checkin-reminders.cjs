const { createClient } = require('@supabase/supabase-js');
const { sendPushToUser } = require('./lib/send-push.cjs');

function dateStr(d) {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

// One-time checkpoints, counted in whole days since the user's last
// completed quest. Each fires exactly once per user (on the day the gap
// hits that exact number) rather than every day past the threshold, so a
// long-absent user gets a small handful of nudges instead of a daily spam.
const CHECKPOINTS = [
  { days: 3, title: 'AX Coach', body: "Your AI coach here — haven't seen you in a few days. Pick up where you left off?" },
  { days: 7, title: 'AX Coach', body: "It's been a week. Your goals are still there waiting — even a small session today counts." },
  { days: 14, title: 'AX Coach', body: "Two weeks off the radar. No judgment — just come back whenever you're ready. We'll pick up right where you left off." },
];
const MAX_CHECKPOINT_DAYS = Math.max(...CHECKPOINTS.map((c) => c.days));

// quest_date is a local-calendar-day string written by the client (see
// date-utils.js); this function's own "today" is computed in UTC — the
// same known skew already documented in send-streak-reminders.cjs. Fired
// at a different time of day than that function (17:00 UTC vs 23:00 UTC)
// so the two scheduled jobs don't both hit Supabase/web-push in the same
// minute.
exports.handler = async () => {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Missing server env vars.' }) };
  }

  const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

  const { data: subs, error: subsError } = await supabase.from('push_subscriptions').select('*');
  if (subsError) {
    return { statusCode: 500, body: JSON.stringify({ error: subsError.message }) };
  }

  const userIds = [...new Set((subs || []).map((s) => s.user_id))];
  const today = dateStr(new Date());
  const since = dateStr(new Date(Date.now() - (MAX_CHECKPOINT_DAYS + 1) * 24 * 60 * 60 * 1000));

  let sent = 0;
  let checked = 0;
  for (const userId of userIds) {
    checked += 1;

    // Most recent completed-quest date, within the checkpoint window. A
    // wider one-off query (no date filter) would also work, but this
    // mirrors send-streak-reminders.cjs's bounded-window pattern and is
    // all we need: if the last completion isn't in this window, none of
    // the checkpoints below can match anyway.
    const { data: quests } = await supabase
      .from('quests')
      .select('quest_date, completed_at')
      .eq('user_id', userId)
      .not('completed_at', 'is', null)
      .gte('quest_date', since)
      .order('quest_date', { ascending: false })
      .limit(1);

    if (!quests || quests.length === 0) continue; // no completed quests in window — either never engaged or gap > checkpoint range, skip either way

    const lastCompleted = quests[0].quest_date;
    const gapDays = Math.round((new Date(`${today}T00:00:00Z`) - new Date(`${lastCompleted}T00:00:00Z`)) / (24 * 60 * 60 * 1000));
    const checkpoint = CHECKPOINTS.find((c) => c.days === gapDays);
    if (!checkpoint) continue;

    sent += await sendPushToUser(supabase, userId, { title: checkpoint.title, body: checkpoint.body, url: '/' });
  }

  return { statusCode: 200, body: JSON.stringify({ checked, sent }) };
};

exports.config = {
  // Once daily, offset from the 23:00 UTC streak reminder so the two jobs
  // never fire in the same minute.
  schedule: '0 17 * * *',
};
