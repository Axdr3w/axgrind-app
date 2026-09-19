import { t } from './i18n/index.js';
import { fetchHasSeenTour, markTourSeen } from './api/profile.js';

// Trimmed from 12 slides (one per nav tab) down to the handful of things
// that are genuinely non-obvious from looking at the app itself — the rest
// is discoverable by tapping around now that the tour isn't standing in
// front of it. See the "First 90 Seconds" review for the full reasoning.
const ICONS = ['⚡', '🎯', '🤖', '📸'];

function getSteps() {
  return ICONS.map((icon, i) => ({
    icon,
    title: t(`tour.step${i + 1}.title`),
    body: t(`tour.step${i + 1}.body`),
  }));
}

let currentStep = 0;
let currentUserIdForTour = null;

function tourLastStepKey(userId) {
  return `ax-tour-last-step-${userId}`;
}

function render() {
  const steps = getSteps();
  const step = steps[currentStep];
  document.getElementById('tour-icon').textContent = step.icon;
  document.getElementById('tour-title').textContent = step.title;
  document.getElementById('tour-body').textContent = step.body;
  document.getElementById('tour-progress').textContent = `${currentStep + 1} / ${steps.length}`;
  document.getElementById('tour-dots').innerHTML = steps.map((_, i) =>
    `<span class="tour-dot${i === currentStep ? ' active' : ''}"></span>`
  ).join('');
  document.getElementById('tour-back-btn').style.visibility = currentStep === 0 ? 'hidden' : 'visible';
  document.getElementById('tour-next-btn').textContent = currentStep === steps.length - 1 ? t('tour.getStarted') : t('tour.next');
}

export function startTour() {
  currentStep = 0;
  render();
  document.getElementById('onboarding-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
  // Mark the tour as seen as soon as it starts, not only when it's finished.
  // If the app gets backgrounded/killed mid-tour, we don't want it to
  // restart from step 1 on next launch — better to not re-show it at all.
  if (currentUserIdForTour) {
    markTourSeen(currentUserIdForTour).catch((err) => console.error('[tour seen sync]', err));
  }
}

export function tourNext() {
  if (currentStep === getSteps().length - 1) {
    finishTour();
    return;
  }
  currentStep += 1;
  render();
  // Persist progress so it isn't lost if the app is interrupted mid-tour.
  // Not used to resume yet — just captured for potential future use.
  if (currentUserIdForTour) {
    localStorage.setItem(tourLastStepKey(currentUserIdForTour), String(currentStep));
  }
}

export function tourBack() {
  if (currentStep === 0) return;
  currentStep -= 1;
  render();
}

export function finishTour() {
  document.getElementById('onboarding-modal').classList.remove('open');
  document.body.style.overflow = '';
  if (currentUserIdForTour) {
    markTourSeen(currentUserIdForTour).catch((err) => console.error('[tour seen sync]', err));
  }
}

// The "seen" flag lives on the account (profiles.has_seen_tour), not the
// browser — a returning user switching devices or clearing localStorage
// should never be shown a first-timer's tour again. Falls back to treating
// the tour as seen if the fetch fails, so a transient error can't turn into
// a stuck "always re-show the tour" state.
export async function maybeStartTour(userId) {
  currentUserIdForTour = userId;
  try {
    const seen = await fetchHasSeenTour(userId);
    if (!seen) startTour();
  } catch (err) {
    console.error('[tour seen fetch]', err);
  }
}
