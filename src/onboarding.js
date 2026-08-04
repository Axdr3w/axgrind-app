import { t } from './i18n/index.js';

const ICONS = ['⚡', '🏠', 'ℹ️', '🎯', '📋', '🍗', '📸', '🤖', '🎥', '💬', '✉️', '👤'];

function getSteps() {
  return ICONS.map((icon, i) => ({
    icon,
    title: t(`tour.step${i + 1}.title`),
    body: t(`tour.step${i + 1}.body`),
  }));
}

let currentStep = 0;

function tourSeenKey(userId) {
  return `ax-tour-seen-${userId}`;
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
}

export function tourNext() {
  if (currentStep === getSteps().length - 1) {
    finishTour();
    return;
  }
  currentStep += 1;
  render();
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
    localStorage.setItem(tourSeenKey(currentUserIdForTour), '1');
  }
}

let currentUserIdForTour = null;

export function maybeStartTour(userId) {
  currentUserIdForTour = userId;
  if (!localStorage.getItem(tourSeenKey(userId))) {
    startTour();
  }
}
