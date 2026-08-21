const { createClient } = require('@supabase/supabase-js');

// XP amount is hardcoded here, never read from the request body — same rule
// as every other XP-granting function. A weigh-in is a flat reward (not
// time/effort scaled like a workout or focus session) and only pays out
// once per calendar day: the first log for a given date inserts a new row
// and earns XP, any later log for that same date just corrects the number.
const LOG_XP = 15;
const MIN_WEIGHT = 40;
const MAX_WEIGHT = 700;

function isValidDateStr(s) {
  return typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(new Date(s).getTime());
}

// loggedAt comes from the client's local calendar day, not the server's —
// a weigh-in is "today" wherever the person weighing themselves is. Still
// bounded to a one-day window around the server's own date so this can't be
// used to backfill months of free XP.
function isWithinAllowedWindow(dateStr) {
  const day = 24 * 60 * 60 * 1000;
  const logged = new Date(`${dateStr}T00:00:00Z`).getTime();
  const now = Date.now();
  return logged >= now - day && logged <= now + day;
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: { message: 'Server is missing SUPABASE_SERVICE_ROLE_KEY.' } }) };
  }
  try {
    const { userId, weight, loggedAt } = JSON.parse(event.body || '{}');
    const w = Number(weight);
    if (!userId || !Number.isFinite(w) || w < MIN_WEIGHT || w > MAX_WEIGHT || !isValidDateStr(loggedAt) || !isWithinAllowedWindow(loggedAt)) {
      return { statusCode: 400, body: JSON.stringify({ error: { message: 'userId, a valid weight, and a valid loggedAt date are required.' } }) };
    }

    const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

    const { error: insertError } = await supabase.from('weight_logs').insert({
      user_id: userId,
      weight: w,
      logged_at: loggedAt,
    });

    let xpAwarded = 0;
    if (insertError) {
      if (insertError.code !== '23505') {
        return { statusCode: 500, body: JSON.stringify({ error: { message: insertError.message } }) };
      }
      // Already logged today — update the value, no extra XP.
      const { error: updateLogError } = await supabase
        .from('weight_logs')
        .update({ weight: w })
        .eq('user_id', userId)
        .eq('logged_at', loggedAt);
      if (updateLogError) {
        return { statusCode: 500, body: JSON.stringify({ error: { message: updateLogError.message } }) };
      }
    } else {
      xpAwarded = LOG_XP;
    }

    const { data: profile, error: profileError } = await supabase.from('profiles').select('xp').eq('id', userId).single();
    if (profileError) {
      return { statusCode: 500, body: JSON.stringify({ error: { message: profileError.message } }) };
    }
    const newXp = (profile?.xp ?? 0) + xpAwarded;
    if (xpAwarded > 0) {
      const { error: updateError } = await supabase.from('profiles').update({ xp: newXp }).eq('id', userId);
      if (updateError) {
        return { statusCode: 500, body: JSON.stringify({ error: { message: updateError.message } }) };
      }
    }

    return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ xpAwarded, newXp, weight: w, loggedAt }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: { message: err.message } }) };
  }
};
