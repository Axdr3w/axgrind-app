import { t } from './i18n/index.js';
import { logMeasurements, fetchMeasurements } from './api/measurements.js';
import { checkForNewAchievements } from './achievements.js';
import { todayStr } from './date-utils.js';

const FIELDS = ['neck', 'shoulders', 'chest', 'arms', 'waist', 'hips', 'thighs', 'calves'];

let currentUserId = null;
let measurements = []; // ascending by logged_at

function el(id) { return document.getElementById(id); }

export async function initMeasurements(userId) {
  currentUserId = userId;
  try {
    measurements = await fetchMeasurements(userId);
  } catch {
    measurements = [];
  }
  renderSnapshot();
}

export function teardownMeasurements() {
  currentUserId = null;
  measurements = [];
}

function renderSnapshot() {
  const wrap = el('measure-snapshot');
  if (!wrap) return;
  if (measurements.length === 0) {
    wrap.innerHTML = `<div class="photo-filmstrip-empty">${t('measure.empty')}</div>`;
    return;
  }
  const latest = measurements[measurements.length - 1];
  const first = measurements[0];
  const rows = FIELDS.filter((f) => latest[f] != null).map((f) => {
    const current = latest[f];
    const firstVal = first[f];
    let deltaHtml = '';
    if (firstVal != null && measurements.length > 1 && current !== firstVal) {
      const delta = current - firstVal;
      const sign = delta > 0 ? '+' : '';
      deltaHtml = `<span class="measure-delta">${sign}${delta.toFixed(1)}"</span>`;
    }
    return `<div class="measure-row"><span class="measure-row-label">${t('measure.' + f)}</span><span class="measure-row-value">${current}"</span>${deltaHtml}</div>`;
  }).join('');
  wrap.innerHTML = rows || `<div class="photo-filmstrip-empty">${t('measure.empty')}</div>`;
}

async function submitMeasurements() {
  if (!currentUserId) return;
  const values = {};
  for (const f of FIELDS) {
    const input = el(`measure-${f}`);
    if (input && input.value !== '') values[f] = parseFloat(input.value);
  }
  const msg = el('measure-log-msg');
  if (Object.keys(values).length === 0) {
    msg.textContent = t('measure.invalidEmpty');
    msg.className = 'progress-log-msg error';
    return;
  }
  const btn = el('measure-log-btn');
  btn.disabled = true;
  try {
    const result = await logMeasurements(currentUserId, values, todayStr());
    const today = todayStr();
    const existingIdx = measurements.findIndex((m) => m.logged_at === today);
    const merged = { logged_at: today, ...(existingIdx >= 0 ? measurements[existingIdx] : {}), ...values };
    if (existingIdx >= 0) measurements[existingIdx] = merged;
    else measurements.push(merged);

    FIELDS.forEach((f) => { const input = el(`measure-${f}`); if (input) input.value = ''; });
    msg.textContent = result.xpAwarded > 0 ? t('progress.logSuccessXp', { xp: result.xpAwarded }) : t('progress.logSuccessUpdated');
    msg.className = 'progress-log-msg success';
    renderSnapshot();
    checkForNewAchievements();
  } catch (err) {
    msg.textContent = err.message;
    msg.className = 'progress-log-msg error';
  } finally {
    btn.disabled = false;
  }
}

document.getElementById('measure-log-btn')?.addEventListener('click', submitMeasurements);
