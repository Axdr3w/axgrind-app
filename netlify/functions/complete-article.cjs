const { createClient } = require('@supabase/supabase-js');

const ARTICLE_XP = 25;

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: { message: 'Server is missing SUPABASE_SERVICE_ROLE_KEY.' } }) };
  }
  try {
    const { userId, articleId } = JSON.parse(event.body || '{}');
    if (!userId || !articleId) {
      return { statusCode: 400, body: JSON.stringify({ error: { message: 'userId and articleId are required.' } }) };
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

    const { data: profile, error: profileError } = await supabase.from('profiles').select('xp').eq('id', userId).single();
    if (profileError) {
      return { statusCode: 500, body: JSON.stringify({ error: { message: profileError.message } }) };
    }
    const newXp = (profile?.xp ?? 0) + ARTICLE_XP;
    const { error: updateError } = await supabase.from('profiles').update({ xp: newXp }).eq('id', userId);
    if (updateError) {
      return { statusCode: 500, body: JSON.stringify({ error: { message: updateError.message } }) };
    }

    return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ xpAwarded: ARTICLE_XP, newXp }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: { message: err.message } }) };
  }
};
