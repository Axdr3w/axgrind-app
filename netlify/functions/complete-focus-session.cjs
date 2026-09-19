const { createClient } = require('@supabase/supabase-js');
const { verifyUser } = require('./lib/verify-user.cjs');
const { awardXp } = require('./lib/award-xp.cjs');

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
  const auth = await verifyUser(event);
  if (auth.error) return auth.error;
  const userId = auth.userId;
  try {
    const { minutes } = JSON.parse(event.body || '{}');
    const mins = Number(minutes);
    if (!Number.isFinite(mins) || mins <= 0 || mins > MAX_MINUTES) {
      return { statusCode: 400, body: JSON.stringify({ error: { message: 'A valid minutes value is required.' } }) };
    }

    const xpAwarded = Math.round(mins * XP_PER_MINUTE);
    const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

    let newXp;
    try {
      newXp = await awardXp(supabase, userId, xpAwarded);
    } catch (err) {
      return { statusCode: 500, body: JSON.stringify({ error: { message: err.message } }) };
    }

    return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ xpAwarded, newXp }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: { message: err.message } }) };
  }
};
