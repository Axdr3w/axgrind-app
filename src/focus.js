import { t } from './i18n/index.js';
import { completeFocusSession } from './api/xp.js';

// LOCK IN — a focus timer inspired by the general "stay in the app or lose
// your progress" idea behind apps like Forest, but our own mechanic: we
// can't block or close other apps (no web/hybrid app can — that needs
// Apple's separately-gated Screen Time API and real native code), so
// instead we detect leaving via the Page Visibility API. Leave for even a
// moment while a session is active and it fails, same stakes, honestly
// described rather than pretending to enforce something we can't.

const XP_PER_MINUTE = 10;
const DURATIONS = [5, 10, 15, 25, 45, 60];

let currentUserId = null;
let selectedMinutes = 25;
let sessionGen = 0;
let totalSeconds = 0;
let remainingSeconds = 0;
let tickInterval = null;

function el(id) { return document.getElementById(id); }

export function initFocus(userId) {
  currentUserId = userId;
  renderSetup();
}

export function teardownFocus() {
  currentUserId = null;
}

function renderSetup() {
  const tabs = el('focus-duration-tabs');
  if (!tabs) return;
  tabs.querySelectorAll('button').forEach((btn) => {
    btn.classList.toggle('active', Number(btn.dataset.min) === selectedMinutes);
  });
  const preview = el('focus-xp-preview');
  if (preview) preview.textContent = selectedMinutes * XP_PER_MINUTE;
}

function selectDuration(minutes) {
  selectedMinutes = minutes;
  renderSetup();
}

function onVisibilityChange() {
  if (document.hidden) failSession();
}

function startSession() {
  sessionGen++;
  const myGen = sessionGen;
  totalSeconds = selectedMinutes * 60;
  remainingSeconds = totalSeconds;

  el('focus-modal-body').innerHTML = activeHTML();
  el('focus-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
  document.addEventListener('visibilitychange', onVisibilityChange);
  el('focus-giveup-btn').addEventListener('click', () => {
    if (confirm(t('focus.confirmGiveUp'))) failSession();
  });

  updateActiveUI();
  tickInterval = setInterval(() => {
    if (myGen !== sessionGen) return;
    remainingSeconds--;
    if (remainingSeconds <= 0) {
      completeSession(myGen);
      return;
    }
    updateActiveUI();
  }, 1000);
}

function updateActiveUI() {
  const elapsed = totalSeconds - remainingSeconds;
  const pct = totalSeconds > 0 ? elapsed / totalSeconds : 0;
  const ring = el('focus-ring');
  if (ring) ring.style.setProperty('--deg', `${Math.round(pct * 360)}deg`);
  const mm = String(Math.floor(remainingSeconds / 60)).padStart(2, '0');
  const ss = String(remainingSeconds % 60).padStart(2, '0');
  const timeEl = el('focus-time');
  if (timeEl) timeEl.textContent = `${mm}:${ss}`;
  const ember = el('focus-ember');
  if (ember) ember.style.transform = `scale(${1 + pct * 0.9})`;
  const xpLive = el('focus-xp-live');
  if (xpLive) xpLive.textContent = t('focus.xpLive', { current: Math.floor(elapsed / 60 * XP_PER_MINUTE), total: selectedMinutes * XP_PER_MINUTE });
}

function stopTicking() {
  sessionGen++;
  clearInterval(tickInterval);
  tickInterval = null;
  document.removeEventListener('visibilitychange', onVisibilityChange);
}

async function completeSession(gen) {
  if (gen !== sessionGen) return;
  stopTicking();
  try {
    const result = currentUserId ? await completeFocusSession(currentUserId, selectedMinutes) : { xpAwarded: selectedMinutes * XP_PER_MINUTE };
    el('focus-modal-body').innerHTML = resultHTML(true, result.xpAwarded);
  } catch (err) {
    el('focus-modal-body').innerHTML = resultHTML(true, null, err.message);
  }
  wireResultClose();
}

function failSession() {
  stopTicking();
  el('focus-modal-body').innerHTML = resultHTML(false);
  wireResultClose();
}

export function closeFocusModal() {
  stopTicking();
  el('focus-modal').classList.remove('open');
  document.body.style.overflow = '';
}

function wireResultClose() {
  el('focus-done-btn')?.addEventListener('click', closeFocusModal);
}

function activeHTML() {
  return `
    <div class="focus-timer-wrap">
      <div class="focus-ring" id="focus-ring">
        <div class="focus-ring-inner">
          <div class="focus-ember" id="focus-ember">🔥</div>
          <div class="focus-time" id="focus-time"></div>
        </div>
      </div>
    </div>
    <div class="focus-xp-live" id="focus-xp-live"></div>
    <div class="focus-warning">${t('focus.activeWarning')}</div>
    <button class="section-link" id="focus-giveup-btn" style="display:block;margin:14px auto 0;">${t('focus.giveUp')}</button>
  `;
}

function resultHTML(success, xpAwarded, errorMsg) {
  if (success) {
    return `
      <div style="text-align:center;padding:16px 0;">
        <div style="font-size:44px;margin-bottom:14px;">🔥</div>
        <div style="font-family:'Bebas Neue',sans-serif;font-size:26px;letter-spacing:.05em;margin-bottom:10px;color:var(--accent);">${t('focus.successTitle')}</div>
        <p style="font-size:13px;color:var(--muted);line-height:1.7;margin-bottom:6px;">${errorMsg ? t('focus.xpErrorBody', { reason: errorMsg }) : t('focus.successBody', { minutes: selectedMinutes, xp: xpAwarded })}</p>
        <button class="btn-accent btn-full" id="focus-done-btn" style="margin-top:16px;">${t('focus.doneBtn')}</button>
      </div>
    `;
  }
  return `
    <div style="text-align:center;padding:16px 0;">
      <div style="font-size:44px;margin-bottom:14px;">💨</div>
      <div style="font-family:'Bebas Neue',sans-serif;font-size:26px;letter-spacing:.05em;margin-bottom:10px;color:#ff6040;">${t('focus.failTitle')}</div>
      <p style="font-size:13px;color:var(--muted);line-height:1.7;margin-bottom:6px;">${t('focus.failBody')}</p>
      <button class="btn-accent btn-full" id="focus-done-btn" style="margin-top:16px;">${t('focus.tryAgainBtn')}</button>
    </div>
  `;
}

// Attached once at module load, matching the rest of the app's pattern.
document.getElementById('focus-duration-tabs')?.querySelectorAll('button').forEach((btn) => {
  btn.addEventListener('click', () => selectDuration(Number(btn.dataset.min)));
});
document.getElementById('focus-start-btn')?.addEventListener('click', startSession);
