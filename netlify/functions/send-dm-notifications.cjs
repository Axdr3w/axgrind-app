const { createClient } = require('@supabase/supabase-js');
const { notifyDmMessage } = require('./lib/notify-events.cjs');

// Backstop only. DM notifications normally fire the instant the message
// row is inserted, via the Supabase database webhook that calls
// notify-event.cjs — this sweep exists to catch anything that webhook
// failed to deliver. notified_at keeps the two from double-sending.
exports.handler = async () => {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
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

  let sent = 0;
  for (const message of messages || []) {
    sent += await notifyDmMessage(supabase, message);
  }

  return { statusCode: 200, body: JSON.stringify({ checked: (messages || []).length, sent }) };
};

exports.config = {
  schedule: '*/30 * * * *',
};
