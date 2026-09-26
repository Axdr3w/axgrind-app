const webpush = require('web-push');

let configured = false;
function ensureConfigured() {
  if (configured) return;
  webpush.setVapidDetails(process.env.VAPID_SUBJECT, process.env.VITE_VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);
  configured = true;
}

// Sends one payload to every device a user has push enabled on, pruning any
// subscription the browser/OS has since revoked (a 404/410 response means
// "this endpoint is dead," not a real error) instead of leaving it to fail
// forever on every future send. Never throws — a notification failing is
// never worth breaking whatever real action triggered it.
async function sendPushToUser(supabase, userId, payload) {
  if (!process.env.VAPID_PRIVATE_KEY) return 0;
  ensureConfigured();
  const { data: subs } = await supabase.from('push_subscriptions').select('*').eq('user_id', userId);
  let sent = 0;
  for (const sub of subs || []) {
    try {
      await webpush.sendNotification(
        { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth_key } },
        JSON.stringify(payload)
      );
      sent += 1;
    } catch (err) {
      if (err.statusCode === 404 || err.statusCode === 410) {
        await supabase.from('push_subscriptions').delete().eq('id', sub.id);
      }
    }
  }
  return sent;
}

module.exports = { sendPushToUser };
