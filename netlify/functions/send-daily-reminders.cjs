const { createClient } = require('@supabase/supabase-js');
const { sendPushToUser } = require('./lib/send-push.cjs');

// Computes 'YYYY-MM-DD' and 'HH:MM' for `now` in the given IANA timezone
// using Intl (no date library needed) — the date format matches
// quest_date's plain local-calendar-string convention (see date-utils.js)
// so the completion lookup below compares correctly against what the
// client already wrote.
function localParts(now, timeZone) {
  try {
    const fmt = new Intl.DateTimeFormat('en-CA', {
      timeZone, year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', hour12: false,
    });
    const parts = Object.fromEntries(fmt.formatToParts(now).map((p) => [p.type, p.value]));
    return { date: `${parts.year}-${parts.month}-${parts.day}`, time: `${parts.hour}:${parts.minute}` };
  } catch {
    return null; // invalid/unknown timezone string stored — skip that user
  }
}

const DEFAULT_REMINDER_TIME = '18:00'; // 6pm local, if the user never set one

function toMinutes(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

// A reminder fires the first run where the user's local clock has just
// passed their target time, within this window.
// last_daily_reminder_sent_date (compared against their own local date) is
// what actually prevents re-firing on later runs, so this window only
// needs to be wide enough to not miss anyone between runs — meaning it
// must stay equal to the cron interval at the bottom of this file.
const WINDOW_MINUTES = 30;
function justPassed(nowMin, targetMin) {
  const diff = (nowMin - targetMin + 1440) % 1440;
  return diff < WINDOW_MINUTES;
}

exports.handler = async () => {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Missing server env vars.' }) };
  }

  const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

  const { data: subs, error: subsError } = await supabase.from('push_subscriptions').select('*');
  if (subsError) return { statusCode: 500, body: JSON.stringify({ error: subsError.message }) };
  const userIds = [...new Set((subs || []).map((s) => s.user_id))];
  if (userIds.length === 0) return { statusCode: 200, body: JSON.stringify({ checked: 0, sent: 0 }) };

  const { data: profiles, error: profilesError } = await supabase
    .from('profiles')
    .select('id, timezone, reminder_time, last_daily_reminder_sent_date')
    .in('id', userIds);
  if (profilesError) return { statusCode: 500, body: JSON.stringify({ error: profilesError.message }) };

  const now = new Date();
  let checked = 0;
  let sent = 0;

  for (const profile of profiles || []) {
    if (!profile.timezone) continue; // can't compute "their local time" without it — captured silently on next login
    const local = localParts(now, profile.timezone);
    if (!local) continue;
    if (profile.last_daily_reminder_sent_date === local.date) continue; // already handled today, their local day

    const targetMinutes = toMinutes(profile.reminder_time || DEFAULT_REMINDER_TIME);
    if (!justPassed(toMinutes(local.time), targetMinutes)) continue;

    checked += 1;

    const { data: quests } = await supabase
      .from('quests')
      .select('completed_at')
      .eq('user_id', profile.id)
      .eq('quest_date', local.date)
      .not('completed_at', 'is', null)
      .limit(1);

    // Mark handled either way — already trained today shouldn't be
    // re-checked on every run for the rest of the window, same as a sent
    // reminder shouldn't repeat.
    await supabase.from('profiles').update({ last_daily_reminder_sent_date: local.date }).eq('id', profile.id);
    if (quests && quests.length > 0) continue;

    sent += await sendPushToUser(supabase, profile.id, {
      title: 'AX.GRIND',
      body: "Haven't trained yet today — even a quick session keeps your streak alive.",
      url: '/',
    }, 'daily');
  }

  return { statusCode: 200, body: JSON.stringify({ checked, sent }) };
};

exports.config = {
  // Must stay in step with WINDOW_MINUTES above.
  schedule: '*/30 * * * *',
};
