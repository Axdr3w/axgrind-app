const { createClient } = require('@supabase/supabase-js');
const { notifyDmMessage, notifyForumComment } = require('./lib/notify-events.cjs');

// Called by a Supabase database webhook the moment a DM or forum comment
// row is inserted, so those notifications arrive immediately instead of
// waiting for a polling run. The scheduled sweeps still exist as a
// backstop for webhook failures, but at a far lower frequency — polling
// every few minutes for events that are usually absent was burning most of
// the Netlify function quota on empty checks.
//
// Supabase sends the row as `record`, and is configured with a shared
// secret in a custom header since this endpoint is otherwise public.

// The posted `record` is only trusted for its id — the content that
// actually goes into the notification is re-read from the database below,
// so a leaked secret can at most re-trigger a notification for a row that
// genuinely exists and hasn't been notified yet, never fabricate one.
const HANDLERS = {
  dm_messages: {
    columns: 'id, conversation_id, sender_id, body, notified_at',
    notify: notifyDmMessage,
  },
  forum_comments: {
    columns: 'id, post_id, user_id, body, notified_at',
    notify: notifyForumComment,
  },
};

exports.handler = async (event) => {
  const secret = process.env.NOTIFY_WEBHOOK_SECRET;
  if (!secret || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Missing server env vars.' }) };
  }

  const provided = event.headers['x-notify-secret'] || event.headers['X-Notify-Secret'];
  if (provided !== secret) {
    return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorized' }) };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  const handler = HANDLERS[payload.table];
  if (payload.type !== 'INSERT' || !handler || !payload.record?.id) {
    return { statusCode: 200, body: JSON.stringify({ ignored: true }) };
  }

  const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

  try {
    const { data: row } = await supabase
      .from(payload.table)
      .select(handler.columns)
      .eq('id', payload.record.id)
      .maybeSingle();

    // Gone already, or the backstop beat the webhook / Supabase retried a
    // delivery it had already made — nothing to do either way.
    if (!row || row.notified_at) {
      return { statusCode: 200, body: JSON.stringify({ ignored: true }) };
    }

    const sent = await handler.notify(supabase, row);
    return { statusCode: 200, body: JSON.stringify({ sent }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
