const { createClient } = require('@supabase/supabase-js');

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
  try {
    const { userId, workoutId, dayKey } = JSON.parse(event.body || '{}');
    if (!userId || !workoutId || !dayKey) {
      return { statusCode: 400, body: JSON.stringify({ error: { message: 'userId, workoutId, and dayKey are required.' } }) };
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

    const { data: profile, error: profileError } = await supabase.from('profiles').select('xp').eq('id', userId).single();
    if (profileError) {
      return { statusCode: 500, body: JSON.stringify({ error: { message: profileError.message } }) };
    }
    const newXp = (profile?.xp ?? 0) + WORKOUT_XP;
    const { error: updateError } = await supabase.from('profiles').update({ xp: newXp }).eq('id', userId);
    if (updateError) {
      return { statusCode: 500, body: JSON.stringify({ error: { message: updateError.message } }) };
    }

    return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ xpAwarded: WORKOUT_XP, newXp }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: { message: err.message } }) };
  }
};
