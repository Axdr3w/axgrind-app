import { registerPlugin, Capacitor } from '@capacitor/core';
import { supabase } from './api/supabaseClient.js';

const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY;

// Talks to the custom native plugin in ios/App/App/PushPlugin.swift — Web
// Push (serviceWorker/PushManager) cannot work inside a Capacitor WKWebView
// on iOS at all, so the native app needs a real APNs registration path
// instead. See that file's header comment for the full reasoning.
const AxPush = registerPlugin('AxPush');

function isNativeIOS() {
  return Capacitor.isNativePlatform() && Capacitor.getPlatform() === 'ios';
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map(c => c.charCodeAt(0)));
}

export function isPushSupported() {
  if (isNativeIOS()) return true;
  return 'serviceWorker' in navigator && 'PushManager' in window && Boolean(VAPID_PUBLIC_KEY);
}

// Only meaningful for the web path — there's no equivalent "check if
// already subscribed" call on the native side, so callers checking this to
// decide whether to show an "Enable Reminders" banner should treat a null
// return on native as "unknown," not "not subscribed."
export async function getExistingSubscription() {
  if (isNativeIOS()) return null;
  if (!('serviceWorker' in navigator)) return null;
  const reg = await navigator.serviceWorker.getRegistration();
  if (!reg) return null;
  return reg.pushManager.getSubscription();
}

export async function enablePushReminders(userId) {
  if (!isPushSupported()) {
    throw new Error("Push notifications aren't supported in this browser.");
  }
  if (!supabase) {
    throw new Error("Accounts aren't set up yet.");
  }

  if (isNativeIOS()) {
    return enableNativePush(userId);
  }

  const permission = await Notification.requestPermission();
  if (permission !== 'granted') {
    throw new Error('Notification permission was not granted.');
  }

  const registration = await navigator.serviceWorker.register('/sw.js');
  await navigator.serviceWorker.ready;

  let subscription = await registration.pushManager.getSubscription();
  if (!subscription) {
    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
    });
  }

  const json = subscription.toJSON();
  const { error } = await supabase.from('push_subscriptions').upsert(
    {
      user_id: userId,
      endpoint: json.endpoint,
      p256dh: json.keys.p256dh,
      auth_key: json.keys.auth,
      platform: 'web',
    },
    { onConflict: 'endpoint' }
  );
  if (error) throw error;

  return subscription;
}

// The device token arrives asynchronously via a plugin event, not as the
// return value of requestPermission() — see PushPlugin.swift. Resolves once
// that event fires (or rejects on a registration failure), same external
// shape as the web path above despite the very different mechanism.
function enableNativePush(userId) {
  return new Promise((resolve, reject) => {
    let settled = false;

    const registrationHandle = AxPush.addListener('registration', async ({ token }) => {
      if (settled) return;
      settled = true;
      registrationHandle.remove();
      errorHandle.remove();
      try {
        const { error } = await supabase.from('push_subscriptions').upsert(
          { user_id: userId, endpoint: `apns:${token}`, platform: 'ios' },
          { onConflict: 'endpoint' }
        );
        if (error) reject(error);
        else resolve({ platform: 'ios' });
      } catch (err) {
        reject(err);
      }
    });

    const errorHandle = AxPush.addListener('registrationError', ({ error }) => {
      if (settled) return;
      settled = true;
      registrationHandle.remove();
      errorHandle.remove();
      reject(new Error(error || 'Push registration failed.'));
    });

    AxPush.requestPermission().then(({ granted, error }) => {
      if (!granted && !settled) {
        settled = true;
        registrationHandle.remove();
        errorHandle.remove();
        reject(new Error(error || 'Notification permission was not granted.'));
      }
    });
  });
}
