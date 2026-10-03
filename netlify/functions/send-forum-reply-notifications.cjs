const { createClient } = require('@supabase/supabase-js');
const { notifyForumComment } = require('./lib/notify-events.cjs');

// Backstop only. Forum reply notifications normally fire the instant the
// comment row is inserted, via the Supabase database webhook that calls
// notify-event.cjs — this sweep exists to catch anything that webhook
// failed to deliver. notified_at keeps the two from double-sending.
exports.handler = async () => {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
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

  let sent = 0;
  for (const comment of comments || []) {
    sent += await notifyForumComment(supabase, comment);
  }

  return { statusCode: 200, body: JSON.stringify({ checked: (comments || []).length, sent }) };
};

exports.config = {
  schedule: '*/30 * * * *',
};
