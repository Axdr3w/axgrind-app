const { createClient } = require('@supabase/supabase-js');

// Required by App Store Guideline 5.1.1(v): any app that supports account
// creation must also let the user delete their account from inside the app.
//
// The caller's identity comes only from their own session token — never from
// a client-supplied userId — so this can't be used to delete someone else's
// account.
exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: { message: 'Server is missing SUPABASE_SERVICE_ROLE_KEY.' } }) };
  }

  const authHeader = event.headers.authorization || event.headers.Authorization || '';
  const token = authHeader.replace(/^Bearer\s+/i, '');
  if (!token) {
    return { statusCode: 401, body: JSON.stringify({ error: { message: 'Missing session token.' } }) };
  }

  const anonClient = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);
  const { data: userData, error: authError } = await anonClient.auth.getUser(token);
  if (authError || !userData?.user) {
    return { statusCode: 401, body: JSON.stringify({ error: { message: 'Invalid or expired session.' } }) };
  }
  const userId = userData.user.id;

  const admin = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

  // Best-effort cleanup of user-generated content. None of these block the
  // actual account deletion below if a table has changed shape since this
  // was written — losing the login is what actually matters for the user.
  await Promise.allSettled([
    admin.from('saved_chats').delete().eq('user_id', userId),
    admin.from('quests').delete().eq('user_id', userId),
    admin.from('forum_likes').delete().eq('user_id', userId),
    admin.from('forum_comments').delete().eq('user_id', userId),
    admin.from('forum_posts').delete().eq('user_id', userId),
    admin.from('article_reads').delete().eq('user_id', userId),
    admin.from('workout_completions').delete().eq('user_id', userId),
    admin.from('push_subscriptions').delete().eq('user_id', userId),
    admin.from('dm_messages').delete().eq('sender_id', userId),
    admin.from('dm_conversations').delete().or(`user1_id.eq.${userId},user2_id.eq.${userId}`),
    admin.from('forum_reports').delete().eq('reporter_id', userId),
    admin.from('profiles').delete().eq('id', userId),
  ]);

  const { error: deleteError } = await admin.auth.admin.deleteUser(userId);
  if (deleteError) {
    return { statusCode: 500, body: JSON.stringify({ error: { message: deleteError.message } }) };
  }

  return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ok: true }) };
};
