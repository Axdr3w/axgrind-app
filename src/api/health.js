import { registerPlugin, Capacitor } from '@capacitor/core';

// Talks to the custom native plugin in ios/App/App/HealthPlugin.swift — not
// a third-party package. Every real Capacitor Health plugin available
// fails to compile against this project's exact Capacitor SPM binary (see
// that file's header comment for why), so this is a small bridge written
// directly against this project's actual native API instead.
const Health = registerPlugin('Health');

export function isNativeHealthAvailable() {
  return Capacitor.isNativePlatform() && Capacitor.getPlatform() === 'ios';
}

// Fire-and-forget by design, same reasoning as analytics — a Health sync
// failure (permission denied, simulator with no Health data, etc.) should
// never block or interrupt the user's actual weight log, which already
// succeeded in the app's own database by the time this runs.
export async function saveWeightToHealth(weightLbs, dateStr) {
  if (!isNativeHealthAvailable()) return;
  try {
    const auth = await Health.requestAuthorization();
    if (!auth.success) return;
    const isoDate = new Date(`${dateStr}T12:00:00`).toISOString();
    await Health.saveWeight({ weight: weightLbs, date: isoDate });
  } catch (err) {
    console.warn('[health] saveWeight failed', err);
  }
}

// Used to import a weigh-in that happened outside the app (a smart scale
// syncing straight to Health) — returns null on any failure or if there's
// nothing more recent than what's already passed in, never throws.
export async function readLatestHealthWeight() {
  if (!isNativeHealthAvailable()) return null;
  try {
    const result = await Health.readLatestWeight();
    return result?.sample ?? null;
  } catch (err) {
    console.warn('[health] readLatestWeight failed', err);
    return null;
  }
}
