const { createClient } = require('@supabase/supabase-js');
const { verifyUser } = require('./lib/verify-user.cjs');
const { awardXp } = require('./lib/award-xp.cjs');

// Same flat-per-day XP rule as log-weight.cjs: the first log for a given
// date pays out, correcting/adding to that same date's entry later doesn't.
const LOG_XP = 15;
const MIN_VALUE = 3;
const MAX_VALUE = 100;
const MEASURE_FIELDS = ['neck', 'shoulders', 'chest', 'arms', 'waist', 'hips', 'thighs', 'calves'];

function isValidDateStr(s) {
  return typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(new Date(s).getTime());
}

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
  const auth = await verifyUser(event);
  if (auth.error) return auth.error;
  const userId = auth.userId;
  try {
    const body = JSON.parse(event.body || '{}');
    const { loggedAt } = body;
    if (!isValidDateStr(loggedAt) || !isWithinAllowedWindow(loggedAt)) {
      return { statusCode: 400, body: JSON.stringify({ error: { message: 'A valid loggedAt date is required.' } }) };
    }

    const fields = {};
    for (const key of MEASURE_FIELDS) {
      if (body[key] === undefined || body[key] === null || body[key] === '') continue;
      const v = Number(body[key]);
      if (!Number.isFinite(v) || v < MIN_VALUE || v > MAX_VALUE) {
        return { statusCode: 400, body: JSON.stringify({ error: { message: `${key} must be a number between ${MIN_VALUE} and ${MAX_VALUE}.` } }) };
      }
      fields[key] = v;
    }
    if (Object.keys(fields).length === 0) {
      return { statusCode: 400, body: JSON.stringify({ error: { message: 'At least one measurement is required.' } }) };
    }

    const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

    const { error: insertError } = await supabase.from('body_measurements').insert({
      user_id: userId,
      logged_at: loggedAt,
      ...fields,
    });

    let xpAwarded = 0;
    let newXp;
    if (insertError) {
      if (insertError.code !== '23505') {
        return { statusCode: 500, body: JSON.stringify({ error: { message: insertError.message } }) };
      }
      // Already logged today — merge in whichever fields were provided this
      // time, leaving any other same-day fields (set earlier today) alone.
      const { error: updateError } = await supabase
        .from('body_measurements')
        .update(fields)
        .eq('user_id', userId)
        .eq('logged_at', loggedAt);
      if (updateError) {
        return { statusCode: 500, body: JSON.stringify({ error: { message: updateError.message } }) };
      }
      const { data: profile, error: profileError } = await supabase.from('profiles').select('xp').eq('id', userId).single();
      if (profileError) {
        return { statusCode: 500, body: JSON.stringify({ error: { message: profileError.message } }) };
      }
      newXp = profile?.xp ?? 0;
    } else {
      xpAwarded = LOG_XP;
      try {
        newXp = await awardXp(supabase, userId, xpAwarded);
      } catch (err) {
        return { statusCode: 500, body: JSON.stringify({ error: { message: err.message } }) };
      }
    }

    return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ xpAwarded, newXp, loggedAt, ...fields }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: { message: err.message } }) };
  }
};
