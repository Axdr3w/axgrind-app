const { createClient } = require('@supabase/supabase-js');
const { sendPushToUser } = require('./lib/send-push.cjs');

// Notifies a post's original author when someone else comments on it.
// notified_at makes this idempotent the same way DM notifications are.
exports.handler = async () => {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY || !process.env.VAPID_PRIVATE_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Missing server env vars.' }) };
  }

  const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

  const { data: comments, error } = await supabase
    .from('forum_comments')
    .select('id, post_id, user_id, body')
    .is('notified_at', null)
    .order('created_at', { ascending: true })
    .limit(200);
  if (error) return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  if (!comments || comments.length === 0) return { statusCode: 200, body: JSON.stringify({ checked: 0, sent: 0 }) };

  const postIds = [...new Set(comments.map((c) => c.post_id))];
  const { data: posts } = await supabase.from('forum_posts').select('id, user_id').in('id', postIds);
  const postById = new Map((posts || []).map((p) => [p.id, p]));

  const commenterIds = [...new Set(comments.map((c) => c.user_id))];
  const { data: commenters } = await supabase.from('profiles').select('id, display_name, handle').in('id', commenterIds);
  const commenterById = new Map((commenters || []).map((c) => [c.id, c]));

  let sent = 0;
  for (const comment of comments) {
    const post = postById.get(comment.post_id);
    // Skip: post was deleted since, or the author replied to their own post.
    if (post && post.user_id !== comment.user_id) {
      const commenter = commenterById.get(comment.user_id);
      const commenterName = commenter?.display_name || commenter?.handle || 'Someone';
      const preview = (comment.body || '').slice(0, 100);
      sent += await sendPushToUser(supabase, post.user_id, {
        title: `${commenterName} replied to your post`,
        body: preview,
        url: '/',
      });
    }
    await supabase.from('forum_comments').update({ notified_at: new Date().toISOString() }).eq('id', comment.id);
  }

  return { statusCode: 200, body: JSON.stringify({ checked: comments.length, sent }) };
};

exports.config = {
  schedule: '*/5 * * * *',
};
