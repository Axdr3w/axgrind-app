const { createClient } = require('@supabase/supabase-js');
const { sendPushToUser } = require('./lib/send-push.cjs');
const { zonedTimeToUtc } = require('./lib/timezone.cjs');

function dateStr(d) {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

// Reminders more than this overdue are skipped rather than fired late
// (e.g. if the scheduled function was down for a while).
const GRACE_MS = 6 * 60 * 60 * 1000;

exports.handler = async () => {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Missing server env vars.' }) };
  }

  const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

  const now = new Date();
  // quest_date is compared as a plain calendar date with no timezone, so widen
  // the window by a day on each side to avoid missing anyone due to UTC vs.
  // local-day skew — the precise firing decision below still uses real time math.
  const windowStart = dateStr(new Date(now.getTime() - 24 * 60 * 60 * 1000));
  const windowEnd = dateStr(new Date(now.getTime() + 24 * 60 * 60 * 1000));

  const { data: quests, error } = await supabase
    .from('quests')
    .select('id, user_id, title, quest_date, due_time, reminder_minutes_before')
    .is('completed_at', null)
    .is('reminder_sent_at', null)
    .gte('quest_date', windowStart)
    .lte('quest_date', windowEnd)
    .not('due_time', 'is', null)
    .not('reminder_minutes_before', 'is', null);

  if (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }

  // due_time is a wall-clock time the user picked, so it only means
  // anything against their own timezone — read as UTC it fired up to 12
  // hours off (a 5pm reminder reaching a Pacific user at 10am). Users
  // whose timezone hasn't been captured yet fall back to the old UTC
  // reading rather than losing reminders entirely; the client records one
  // on next login (see updateTimezone in src/api/profile.js).
  const userIds = [...new Set((quests || []).map((q) => q.user_id))];
  const { data: profiles } = userIds.length
    ? await supabase.from('profiles').select('id, timezone').in('id', userIds)
    : { data: [] };
  const timezoneByUser = new Map((profiles || []).map((p) => [p.id, p.timezone]));

  const due = (quests || []).filter((q) => {
    const timezone = timezoneByUser.get(q.user_id);
    const dueAt = (timezone && zonedTimeToUtc(q.quest_date, q.due_time, timezone))
      || new Date(`${q.quest_date}T${q.due_time}Z`);
    const reminderAt = new Date(dueAt.getTime() - q.reminder_minutes_before * 60000);
    return reminderAt <= now && now.getTime() - dueAt.getTime() < GRACE_MS;
  });

  let sent = 0;
  for (const quest of due) {
    sent += await sendPushToUser(supabase, quest.user_id, { title: 'AX.GRIND Quest Reminder', body: quest.title, url: '/' }, 'quest');
    await supabase.from('quests').update({ reminder_sent_at: new Date().toISOString() }).eq('id', quest.id);
  }

  return { statusCode: 200, body: JSON.stringify({ checked: (quests || []).length, due: due.length, sent }) };
};

exports.config = {
  // Every 30 minutes. Running this every minute meant ~43k invocations a
  // month — about a third of the whole Netlify quota — almost all of them
  // finding nothing due. A reminder can now land up to half an hour after
  // its target, which is well within tolerance for "you have a quest
  // coming up"; GRACE_MS above already allows for far longer gaps.
  schedule: '*/30 * * * *',
};
