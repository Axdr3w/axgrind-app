// Ads are off until there's a real AdSense/AdMob publisher account (needs an
// adult account holder — not something set up yet). Every .ad-slot in the
// DOM stays hidden until this is flipped, so nothing changes for users until
// that's a deliberate decision.
const ADS_ENABLED = false;

export function initAds() {
  if (!ADS_ENABLED) return;
  // TODO once there's a real publisher id: load the ad network's script here,
  // and replace each .ad-slot-placeholder with the real ad unit instead of
  // the static "Ad space" text.
  document.querySelectorAll('.ad-slot').forEach((el) => { el.style.display = 'block'; });
}
