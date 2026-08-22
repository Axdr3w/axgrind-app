const { createClient } = require('@supabase/supabase-js');
const webpush = require('web-push');

function dateStr(d) {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

// Reimplements src/gamification.js's computeStreak walk-back rule — Netlify
// Functions run as plain CommonJS and can't import the client's ES module.
// This only ever gets called for users who haven't completed a quest today
// (checked by the caller), so the walk always starts at yesterday: today
// doesn't count against or for the streak until the day is actually over.
function streakAsOfYesterday(completedDates, yesterdayStr) {
  let streak = 0;
  const cursor = new Date(`${yesterdayStr}T00:00:00Z`);
  for (;;) {
    const ds = dateStr(cursor);
    if (completedDates.has(ds)) {
      streak += 1;
      cursor.setUTCDate(cursor.getUTCDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

// quest_date is a local-calendar-day string written by the client (see
// date-utils.js), but this function's own "today"/"yesterday" are computed
// in UTC — the same known skew already documented in send-reminders.cjs.
// Firing once near the end of the UTC day keeps that skew small without
// needing per-user timezone storage, which is a bigger feature on its own.
exports.handler = async () => {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY || !process.env.VAPID_PRIVATE_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Missing server env vars.' }) };
  }

  const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
  webpush.setVapidDetails(process.env.VAPID_SUBJECT, process.env.VITE_VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);

  const { data: subs, error: subsError } = await supabase.from('push_subscriptions').select('*');
  if (subsError) {
    return { statusCode: 500, body: JSON.stringify({ error: subsError.message }) };
  }

  const userIds = [...new Set((subs || []).map((s) => s.user_id))];
  const today = dateStr(new Date());
  const yesterday = dateStr(new Date(Date.now() - 24 * 60 * 60 * 1000));
  const since = dateStr(new Date(Date.now() - 60 * 24 * 60 * 60 * 1000));

  let sent = 0;
  let checked = 0;
  for (const userId of userIds) {
    checked += 1;
    const { data: quests } = await supabase
      .from('quests')
      .select('quest_date, completed_at')
      .eq('user_id', userId)
      .gte('quest_date', since);

    const completedDates = new Set((quests || []).filter((q) => q.completed_at).map((q) => q.quest_date));
    if (completedDates.has(today)) continue; // already safe today

    const streak = streakAsOfYesterday(completedDates, yesterday);
    if (streak < 1) continue; // no active streak to protect — don't nag

    const userSubs = (subs || []).filter((s) => s.user_id === userId);
    for (const sub of userSubs) {
      try {
        await webpush.sendNotification(
          { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth_key } },
          JSON.stringify({
            title: `🔥 ${streak}-day streak on the line`,
            body: "You haven't completed a quest today — do one now to keep it going.",
            url: '/',
          })
        );
        sent += 1;
      } catch (err) {
        if (err.statusCode === 404 || err.statusCode === 410) {
          await supabase.from('push_subscriptions').delete().eq('id', sub.id);
        }
      }
    }
  }

  return { statusCode: 200, body: JSON.stringify({ checked, sent }) };
};

exports.config = {
  // Once daily, near the end of the UTC day — see the timezone note above.
  schedule: '0 23 * * *',
};
