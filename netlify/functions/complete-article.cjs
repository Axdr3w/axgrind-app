const { createClient } = require('@supabase/supabase-js');
const { verifyUser } = require('./lib/verify-user.cjs');
const { awardXp } = require('./lib/award-xp.cjs');

const ARTICLE_XP = 25;

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
    const { articleId } = JSON.parse(event.body || '{}');
    if (!articleId) {
      return { statusCode: 400, body: JSON.stringify({ error: { message: 'articleId is required.' } }) };
    }

    const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
    const { error: insertError } = await supabase.from('article_reads').insert({
      user_id: userId,
      article_id: articleId,
      xp_value: ARTICLE_XP,
    });

    if (insertError) {
      if (insertError.code === '23505') {
        return { statusCode: 409, body: JSON.stringify({ error: { message: 'Already read this article.' } }) };
      }
      return { statusCode: 500, body: JSON.stringify({ error: { message: insertError.message } }) };
    }

    let newXp;
    try {
      newXp = await awardXp(supabase, userId, ARTICLE_XP);
    } catch (err) {
      return { statusCode: 500, body: JSON.stringify({ error: { message: err.message } }) };
    }

    return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ xpAwarded: ARTICLE_XP, newXp }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: { message: err.message } }) };
  }
};
