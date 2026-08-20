const { createClient } = require('@supabase/supabase-js');

// Same XP-must-never-be-client-settable rule as complete-workout.cjs — the
// client only ever reports how many minutes it ran, never the XP value.
// 10 XP/minute, matching the rate shown to the user in the app.
const XP_PER_MINUTE = 10;
const MAX_MINUTES = 180; // sanity cap, not real anti-cheat — see note below

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: { message: 'Server is missing SUPABASE_SERVICE_ROLE_KEY.' } }) };
  }
  try {
    const { userId, minutes } = JSON.parse(event.body || '{}');
    const mins = Number(minutes);
    if (!userId || !Number.isFinite(mins) || mins <= 0 || mins > MAX_MINUTES) {
      return { statusCode: 400, body: JSON.stringify({ error: { message: 'userId and a valid minutes value are required.' } }) };
    }

    const xpAwarded = Math.round(mins * XP_PER_MINUTE);
    const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

    const { data: profile, error: profileError } = await supabase.from('profiles').select('xp').eq('id', userId).single();
    if (profileError) {
      return { statusCode: 500, body: JSON.stringify({ error: { message: profileError.message } }) };
    }
    const newXp = (profile?.xp ?? 0) + xpAwarded;
    const { error: updateError } = await supabase.from('profiles').update({ xp: newXp }).eq('id', userId);
    if (updateError) {
      return { statusCode: 500, body: JSON.stringify({ error: { message: updateError.message } }) };
    }

    return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ xpAwarded, newXp }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: { message: err.message } }) };
  }
};
