import { t } from './i18n/index.js';
import { logWeight, fetchWeightLogs } from './api/xp.js';
import { todayStr } from './date-utils.js';

const GOAL_STORAGE_KEY = 'ax-weight-goal';
const CHART_MAX_POINTS = 30;

let currentUserId = null;
let logs = []; // ascending by logged_at: [{ weight, logged_at }]
let goal = localStorage.getItem(GOAL_STORAGE_KEY) || 'maintain';

function el(id) { return document.getElementById(id); }

export async function initProgress(userId) {
  currentUserId = userId;
  renderGoalTabs();
  try {
    logs = await fetchWeightLogs(userId);
  } catch {
    logs = [];
  }
  renderAll();
}

export function teardownProgress() {
  currentUserId = null;
  logs = [];
}

function renderGoalTabs() {
  const wrap = el('progress-goal-tabs');
  if (!wrap) return;
  wrap.querySelectorAll('button').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.goal === goal);
  });
}

function selectGoal(nextGoal) {
  goal = nextGoal;
  localStorage.setItem(GOAL_STORAGE_KEY, goal);
  renderGoalTabs();
  renderStats();
}

function renderAll() {
  const lastWeight = logs.length ? logs[logs.length - 1].weight : null;
  const input = el('progress-weight-input');
  if (input && !input.value && lastWeight != null) input.placeholder = String(lastWeight);
  renderStats();
  renderChart();
}

function fmt(n) {
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}

function renderStats() {
  const wrap = el('progress-stats-row');
  if (!wrap) return;
  if (logs.length === 0) {
    wrap.innerHTML = '';
    return;
  }
  const start = logs[0].weight;
  const current = logs[logs.length - 1].weight;
  const change = current - start;

  let changeClass = '';
  if (logs.length > 1) {
    if (goal === 'cut') changeClass = change <= -0.1 ? 'good' : (change >= 2 ? 'warn' : '');
    else if (goal === 'bulk') changeClass = change >= 0.1 ? 'good' : (change <= -2 ? 'warn' : '');
    else changeClass = Math.abs(change) <= 2 ? 'good' : 'warn';
  }
  const sign = change > 0 ? '+' : '';

  wrap.innerHTML = `
    <div class="progress-stat"><div class="progress-stat-num">${fmt(start)}</div><div class="progress-stat-label">${t('progress.statStart')}</div></div>
    <div class="progress-stat"><div class="progress-stat-num">${fmt(current)}</div><div class="progress-stat-label">${t('progress.statCurrent')}</div></div>
    <div class="progress-stat"><div class="progress-stat-num ${changeClass}">${logs.length > 1 ? sign + fmt(change) : '—'}</div><div class="progress-stat-label">${t('progress.statChange')}</div></div>
  `;
}

function buildPath(points, width, height, padTop, padBottom, padX) {
  const values = points.map((p) => p.weight);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const innerH = height - padTop - padBottom;
  const innerW = width - padX * 2;
  const coords = points.map((p, i) => {
    const x = points.length > 1 ? padX + (i / (points.length - 1)) * innerW : padX + innerW / 2;
    const y = padTop + (1 - (p.weight - min) / range) * innerH;
    return { x, y };
  });
  const lineD = coords.map((c, i) => `${i === 0 ? 'M' : 'L'}${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(' ');
  const areaD = `${lineD} L${coords[coords.length - 1].x.toFixed(1)},${height - padBottom} L${coords[0].x.toFixed(1)},${height - padBottom} Z`;
  return { lineD, areaD, last: coords[coords.length - 1] };
}

function renderChart() {
  const wrap = el('progress-chart-wrap');
  if (!wrap) return;
  if (logs.length < 2) {
    wrap.innerHTML = `<div class="progress-chart-empty">${t(logs.length === 1 ? 'progress.chartEmptyOne' : 'progress.chartEmptyNone')}</div>`;
    return;
  }

  const points = logs.slice(-CHART_MAX_POINTS);
  const width = 300, height = 110, padTop = 14, padBottom = 8, padX = 4;
  const { lineD, areaD, last } = buildPath(points, width, height, padTop, padBottom, padX);
  const gradId = 'progress-chart-fade';

  wrap.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" class="progress-chart-svg" preserveAspectRatio="none">
      <defs>
        <linearGradient id="${gradId}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="var(--accent)" stop-opacity="0.28"/>
          <stop offset="100%" stop-color="var(--accent)" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <path d="${areaD}" fill="url(#${gradId})" stroke="none"/>
      <path d="${lineD}" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
      <circle cx="${last.x.toFixed(1)}" cy="${last.y.toFixed(1)}" r="3.5" fill="var(--accent)"/>
    </svg>
    <div class="progress-chart-dates">
      <span>${formatShortDate(points[0].logged_at)}</span>
      <span>${formatShortDate(points[points.length - 1].logged_at)}</span>
    </div>
  `;
}

function formatShortDate(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

async function submitLog() {
  if (!currentUserId) return;
  const input = el('progress-weight-input');
  const msg = el('progress-log-msg');
  const w = parseFloat(input.value || input.placeholder);
  if (!w || w < 40 || w > 700) {
    msg.textContent = t('progress.invalidWeight');
    msg.className = 'progress-log-msg error';
    return;
  }
  const btn = el('progress-log-btn');
  btn.disabled = true;
  try {
    const result = await logWeight(currentUserId, w, todayStr());
    const today = todayStr();
    const existingIdx = logs.findIndex((l) => l.logged_at === today);
    if (existingIdx >= 0) logs[existingIdx] = { weight: w, logged_at: today };
    else logs.push({ weight: w, logged_at: today });
    input.value = '';
    input.placeholder = String(w);
    msg.textContent = result.xpAwarded > 0 ? t('progress.logSuccessXp', { xp: result.xpAwarded }) : t('progress.logSuccessUpdated');
    msg.className = 'progress-log-msg success';
    renderStats();
    renderChart();
  } catch (err) {
    msg.textContent = err.message;
    msg.className = 'progress-log-msg error';
  } finally {
    btn.disabled = false;
  }
}

document.getElementById('progress-goal-tabs')?.querySelectorAll('button').forEach((btn) => {
  btn.addEventListener('click', () => selectGoal(btn.dataset.goal));
});
document.getElementById('progress-log-btn')?.addEventListener('click', submitLog);
