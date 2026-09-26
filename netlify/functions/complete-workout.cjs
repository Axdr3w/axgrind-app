const { createClient } = require('@supabase/supabase-js');
const { verifyUser } = require('./lib/verify-user.cjs');
const { awardXp } = require('./lib/award-xp.cjs');
const { sendPushToUser } = require('./lib/send-push.cjs');

// XP amount is hardcoded here, never read from the request body — the client
// only ever sends what was completed, never how much it's worth. See the
// comment on the `workout_completions` table for why.
const WORKOUT_XP = 50;

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
    const { workoutId, dayKey } = JSON.parse(event.body || '{}');
    if (!workoutId || !dayKey) {
      return { statusCode: 400, body: JSON.stringify({ error: { message: 'workoutId and dayKey are required.' } }) };
    }

    const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
    const { error: insertError } = await supabase.from('workout_completions').insert({
      user_id: userId,
      workout_id: workoutId,
      day_key: dayKey,
      xp_value: WORKOUT_XP,
    });

    if (insertError) {
      if (insertError.code === '23505') {
        return { statusCode: 409, body: JSON.stringify({ error: { message: 'Already completed this workout today.' } }) };
      }
      return { statusCode: 500, body: JSON.stringify({ error: { message: insertError.message } }) };
    }

    let newXp;
    try {
      newXp = await awardXp(supabase, userId, WORKOUT_XP);
    } catch (err) {
      return { statusCode: 500, body: JSON.stringify({ error: { message: err.message } }) };
    }

    // Best-effort, never blocks the response — a push failure shouldn't
    // turn a successful workout completion into an error for the user.
    sendPushToUser(supabase, userId, {
      title: 'Workout complete 💪',
      body: `+${WORKOUT_XP} XP earned. Nice work.`,
      url: '/',
    }).catch(() => {});

    return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ xpAwarded: WORKOUT_XP, newXp }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: { message: err.message } }) };
  }
};
