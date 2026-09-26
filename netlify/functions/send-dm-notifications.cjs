const { createClient } = require('@supabase/supabase-js');
const { sendPushToUser } = require('./lib/send-push.cjs');

// notified_at (not read_at) is what makes this idempotent — a message can
// sit unread for days without getting re-notified on every 5-minute run.
exports.handler = async () => {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY || !process.env.VAPID_PRIVATE_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Missing server env vars.' }) };
  }

  const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

  const { data: messages, error } = await supabase
    .from('dm_messages')
    .select('id, conversation_id, sender_id, body')
    .is('notified_at', null)
    .order('created_at', { ascending: true })
    .limit(200); // bounded per run — a burst catches up over a couple of runs rather than one giant batch
  if (error) return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  if (!messages || messages.length === 0) return { statusCode: 200, body: JSON.stringify({ checked: 0, sent: 0 }) };

  const conversationIds = [...new Set(messages.map((m) => m.conversation_id))];
  const { data: conversations } = await supabase
    .from('dm_conversations')
    .select('id, user1_id, user2_id')
    .in('id', conversationIds);
  const conversationById = new Map((conversations || []).map((c) => [c.id, c]));

  const senderIds = [...new Set(messages.map((m) => m.sender_id))];
  const { data: senders } = await supabase.from('profiles').select('id, display_name, handle').in('id', senderIds);
  const senderById = new Map((senders || []).map((s) => [s.id, s]));

  let sent = 0;
  for (const msg of messages) {
    const conversation = conversationById.get(msg.conversation_id);
    if (conversation) {
      const recipientId = conversation.user1_id === msg.sender_id ? conversation.user2_id : conversation.user1_id;
      const sender = senderById.get(msg.sender_id);
      const senderName = sender?.display_name || sender?.handle || 'Someone';
      const preview = (msg.body || '').slice(0, 100);
      sent += await sendPushToUser(supabase, recipientId, {
        title: `New message from ${senderName}`,
        body: preview,
        url: '/',
      });
    }
    await supabase.from('dm_messages').update({ notified_at: new Date().toISOString() }).eq('id', msg.id);
  }

  return { statusCode: 200, body: JSON.stringify({ checked: messages.length, sent }) };
};

exports.config = {
  schedule: '*/5 * * * *',
};
