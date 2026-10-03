const { sendPushToUser } = require('./send-push.cjs');

// One-row notification logic for the two event-driven notification types,
// shared by the Supabase database webhook (notify-event.cjs, which fires
// the instant a row is inserted) and by the scheduled backstop functions
// that sweep up anything the webhook failed to deliver. notified_at is what
// makes running both safe: whichever gets there first marks the row, and
// the other skips it.

async function notifyDmMessage(supabase, message) {
  const { data: conversation } = await supabase
    .from('dm_conversations')
    .select('id, user1_id, user2_id')
    .eq('id', message.conversation_id)
    .maybeSingle();

  let sent = 0;
  if (conversation) {
    const recipientId = conversation.user1_id === message.sender_id ? conversation.user2_id : conversation.user1_id;
    const { data: sender } = await supabase
      .from('profiles')
      .select('display_name, handle')
      .eq('id', message.sender_id)
      .maybeSingle();
    const senderName = sender?.display_name || sender?.handle || 'Someone';
    sent = await sendPushToUser(supabase, recipientId, {
      title: `New message from ${senderName}`,
      body: (message.body || '').slice(0, 100),
      url: '/',
    }, 'dm');
  }

  await supabase.from('dm_messages').update({ notified_at: new Date().toISOString() }).eq('id', message.id);
  return sent;
}

async function notifyForumComment(supabase, comment) {
  const { data: post } = await supabase
    .from('forum_posts')
    .select('id, user_id')
    .eq('id', comment.post_id)
    .maybeSingle();

  let sent = 0;
  // Skip: post was deleted since, or the author replied to their own post.
  if (post && post.user_id !== comment.user_id) {
    const { data: commenter } = await supabase
      .from('profiles')
      .select('display_name, handle')
      .eq('id', comment.user_id)
      .maybeSingle();
    const commenterName = commenter?.display_name || commenter?.handle || 'Someone';
    sent = await sendPushToUser(supabase, post.user_id, {
      title: `${commenterName} replied to your post`,
      body: (comment.body || '').slice(0, 100),
      url: '/',
    }, 'forum');
  }

  await supabase.from('forum_comments').update({ notified_at: new Date().toISOString() }).eq('id', comment.id);
  return sent;
}

module.exports = { notifyDmMessage, notifyForumComment };
