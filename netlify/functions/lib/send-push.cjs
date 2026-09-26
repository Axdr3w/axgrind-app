const webpush = require('web-push');
const { sendApnsNotification } = require('./apns.cjs');

let configured = false;
function ensureConfigured() {
  if (configured) return;
  webpush.setVapidDetails(process.env.VAPID_SUBJECT, process.env.VITE_VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);
  configured = true;
}

// A native iOS row stores 'apns:<device token>' in `endpoint` (see
// apns_push.sql) — there's no real URL for an APNs destination, this is
// just reusing the one column both platforms already share as a unique key.
const APNS_ENDPOINT_PREFIX = 'apns:';

// Sends one payload to every device a user has push enabled on — Web Push
// for browser subscriptions, APNs for the native iOS app (see PushPlugin.
// swift for why these need to be two different delivery paths at all).
// Prunes any subscription the platform has since invalidated (a dead
// endpoint or a 410 device token) instead of leaving it to fail forever on
// every future send. Never throws — a notification failing is never worth
// breaking whatever real action triggered it.
async function sendPushToUser(supabase, userId, payload) {
  const { data: subs } = await supabase.from('push_subscriptions').select('*').eq('user_id', userId);
  let sent = 0;

  for (const sub of subs || []) {
    if (sub.platform === 'ios') {
      if (!process.env.APNS_PRIVATE_KEY) continue;
      const token = sub.endpoint.startsWith(APNS_ENDPOINT_PREFIX) ? sub.endpoint.slice(APNS_ENDPOINT_PREFIX.length) : sub.endpoint;
      try {
        const result = await sendApnsNotification(token, payload);
        if (result.ok) sent += 1;
        else if (result.status === 410 || result.status === 400) {
          await supabase.from('push_subscriptions').delete().eq('id', sub.id);
        }
      } catch {
        // Network/connection failure talking to APNs — leave the
        // subscription in place, it's not necessarily invalid.
      }
      continue;
    }

    if (!process.env.VAPID_PRIVATE_KEY) continue;
    ensureConfigured();
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
