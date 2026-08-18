import { t } from './i18n/index.js';

// GRIND BREATH — our own guided breath-pacing exercise. Inspired by the
// general shape of power-breathing + breath-retention practices, but not a
// reproduction of any specific branded method: our own breath count, our
// own pacing, and our own retention progression (see retentionTarget below).
//
// Safety is load-bearing here, not decoration: breath retention can cause
// lightheadedness or fainting, so every hold is elapsed-time (counts up)
// with an unmissable button to end it immediately — never a countdown that
// implies the user must reach a number. See openBreathIntro's safety copy.

const BREATHS_PER_ROUND = 25;
const BREATH_SECONDS = 1.5; // inhale duration == exhale duration
const RECOVERY_HOLD_SECONDS = 12;
const REST_BETWEEN_ROUNDS = 3;

function retentionTarget(round) {
  return 40 + (round - 1) * 15;
}

let selectedRounds = 3;
let sessionGen = 0; // bumped on close/cancel to stop any in-flight phase

function el(id) { return document.getElementById(id); }

function wait(ms, gen) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (gen !== sessionGen) reject(new Error('cancelled'));
      else resolve();
    }, ms);
  });
}

export function openBreathIntro() {
  el('breath-modal-body').innerHTML = introHTML();
  el('breath-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
  el('breath-round-tabs').querySelectorAll('button').forEach((btn) => {
    btn.addEventListener('click', () => {
      selectedRounds = Number(btn.dataset.rounds);
      el('breath-round-tabs').querySelectorAll('button').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
  el('breath-start-btn').addEventListener('click', startSession);
}

export function closeBreathSession() {
  sessionGen++;
  el('breath-modal').classList.remove('open');
  document.body.style.overflow = '';
}

function introHTML() {
  const roundButtons = [1, 2, 3, 4, 5].map((n) =>
    `<button class="muscle-tab${n === selectedRounds ? ' active' : ''}" data-rounds="${n}">${n}</button>`
  ).join('');
  return `
    <p style="font-size:13px;color:var(--muted);line-height:1.7;margin-bottom:14px;">${t('breath.intro')}</p>
    <div style="background:rgba(255,80,50,.08);border:1px solid rgba(255,80,50,.3);border-radius:10px;padding:14px;margin-bottom:20px;font-size:12px;color:var(--text);line-height:1.65;">
      <strong style="color:#ff6040;">${t('breath.safetyTitle')}</strong><br>${t('breath.safetyBody')}
    </div>
    <div class="calc-label" style="margin-bottom:8px;">${t('breath.roundsLabel')}</div>
    <div class="muscle-tabs" id="breath-round-tabs" style="margin-bottom:22px;">${roundButtons}</div>
    <button class="btn-accent btn-full" id="breath-start-btn">${t('breath.startBtn')}</button>
  `;
}

function sessionShellHTML() {
  return `
    <div class="breath-round-label" id="breath-round-label"></div>
    <div class="breath-circle-wrap">
      <div class="breath-circle" id="breath-circle"></div>
      <div class="breath-phase-label" id="breath-phase-label"></div>
    </div>
    <div class="breath-counter" id="breath-counter"></div>
    <button class="btn-accent btn-full" id="breath-advance-btn" style="display:none;"></button>
    <button class="section-link" id="breath-end-btn" style="display:block;margin:14px auto 0;">${t('breath.endSession')}</button>
  `;
}

async function startSession() {
  sessionGen++;
  const myGen = sessionGen;
  el('breath-modal-body').innerHTML = sessionShellHTML();
  el('breath-end-btn').addEventListener('click', closeBreathSession);

  try {
    for (let round = 1; round <= selectedRounds; round++) {
      el('breath-round-label').textContent = t('breath.roundOf', { round, total: selectedRounds });
      await runPowerBreathing(myGen);
      await runRetention(myGen, round);
      await runRecovery(myGen);
      if (round < selectedRounds) await runRest(myGen);
    }
    if (myGen === sessionGen) showComplete();
  } catch {
    // cancelled via closeBreathSession — nothing to clean up, modal is already closed
  }
}

async function runPowerBreathing(gen) {
  const circle = el('breath-circle');
  el('breath-advance-btn').style.display = 'none';
  circle.style.transitionDuration = `${BREATH_SECONDS}s`;
  for (let i = 1; i <= BREATHS_PER_ROUND; i++) {
    if (gen !== sessionGen) throw new Error('cancelled');
    el('breath-counter').textContent = t('breath.breathCount', { current: i, total: BREATHS_PER_ROUND });
    el('breath-phase-label').textContent = t('breath.phaseIn');
    circle.classList.remove('breath-out');
    circle.classList.add('breath-in');
    await wait(BREATH_SECONDS * 1000, gen);
    el('breath-phase-label').textContent = t('breath.phaseOut');
    circle.classList.remove('breath-in');
    circle.classList.add('breath-out');
    await wait(BREATH_SECONDS * 1000, gen);
  }
}

function runRetention(gen, round) {
  return new Promise((resolve, reject) => {
    const circle = el('breath-circle');
    circle.classList.remove('breath-in');
    circle.classList.add('breath-hold');
    el('breath-phase-label').textContent = t('breath.phaseHold');
    const target = retentionTarget(round);
    let elapsed = 0;
    el('breath-counter').textContent = t('breath.holdElapsed', { elapsed: 0, target });

    const btn = el('breath-advance-btn');
    btn.textContent = t('breath.readyBtn');
    btn.style.display = 'block';

    const tick = setInterval(() => {
      if (gen !== sessionGen) { clearInterval(tick); reject(new Error('cancelled')); return; }
      elapsed++;
      el('breath-counter').textContent = t('breath.holdElapsed', { elapsed, target });
    }, 1000);

    const finish = () => {
      clearInterval(tick);
      btn.removeEventListener('click', finish);
      circle.classList.remove('breath-hold');
      if (gen !== sessionGen) reject(new Error('cancelled'));
      else resolve();
    };
    btn.addEventListener('click', finish);
  });
}

async function runRecovery(gen) {
  const circle = el('breath-circle');
  const btn = el('breath-advance-btn');
  btn.style.display = 'none';

  el('breath-phase-label').textContent = t('breath.phaseRecoverIn');
  el('breath-counter').textContent = '';
  circle.style.transitionDuration = '4s';
  circle.classList.add('breath-in');
  await wait(4000, gen);

  el('breath-phase-label').textContent = t('breath.phaseRecoverHold');
  let remaining = RECOVERY_HOLD_SECONDS;
  el('breath-counter').textContent = t('breath.holdCountdown', { remaining });
  await new Promise((resolve, reject) => {
    const tick = setInterval(() => {
      if (gen !== sessionGen) { clearInterval(tick); reject(new Error('cancelled')); return; }
      remaining--;
      if (remaining <= 0) { clearInterval(tick); resolve(); return; }
      el('breath-counter').textContent = t('breath.holdCountdown', { remaining });
    }, 1000);
  });

  el('breath-phase-label').textContent = t('breath.phaseOut');
  circle.style.transitionDuration = '4s';
  circle.classList.remove('breath-in');
  await wait(4000, gen);
}

async function runRest(gen) {
  el('breath-phase-label').textContent = t('breath.phaseRest');
  el('breath-counter').textContent = '';
  el('breath-advance-btn').style.display = 'none';
  await wait(REST_BETWEEN_ROUNDS * 1000, gen);
}

function showComplete() {
  el('breath-modal-body').innerHTML = `
    <div style="text-align:center;padding:20px 0;">
      <div style="font-size:44px;margin-bottom:14px;">🌬️</div>
      <div style="font-family:'Bebas Neue',sans-serif;font-size:26px;letter-spacing:.05em;margin-bottom:10px;color:var(--accent);">${t('breath.completeTitle')}</div>
      <p style="font-size:13px;color:var(--muted);line-height:1.7;margin-bottom:22px;">${t('breath.completeBody')}</p>
      <button class="btn-accent btn-full" id="breath-done-btn">${t('breath.doneBtn')}</button>
    </div>
  `;
  el('breath-done-btn').addEventListener('click', closeBreathSession);
}
