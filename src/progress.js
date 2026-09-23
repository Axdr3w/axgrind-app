import { t } from './i18n/index.js';
import { logWeight, fetchWeightLogs } from './api/xp.js';
import { uploadProgressPhoto, fetchProgressPhotos, deleteProgressPhoto } from './api/progressPhotos.js';
import { checkForNewAchievements } from './achievements.js';
import { todayStr } from './date-utils.js';
import { saveWeightToHealth, readLatestHealthWeight } from './api/health.js';

const GOAL_STORAGE_KEY = 'ax-weight-goal';
const CHART_MAX_POINTS = 30;
const PHOTO_MAX_DIM = 1080;
const PHOTO_QUALITY = 0.82;

let currentUserId = null;
let logs = []; // ascending by logged_at: [{ weight, logged_at }]
let photos = []; // ascending by loggedAt: [{ loggedAt, url }]
let goal = localStorage.getItem(GOAL_STORAGE_KEY) || 'maintain';
// Tracked separately from "logs.length === 0" — a failed fetch and a
// genuinely new account both leave logs empty, but only one of them should
// tell a user with months of real weight history that there's "nothing
// here yet." Conflating the two reads as data loss, not a network hiccup.
let logsLoadError = false;
let photosLoadError = false;

function el(id) { return document.getElementById(id); }

export async function initProgress(userId) {
  currentUserId = userId;
  renderGoalTabs();
  const chartWrap = el('progress-chart-wrap');
  if (chartWrap) chartWrap.innerHTML = `<div style="text-align:center;padding:20px;color:var(--muted);font-size:12px;">${t('common.loading')}</div>`;
  logsLoadError = false;
  photosLoadError = false;
  try {
    logs = await fetchWeightLogs(userId);
  } catch {
    logs = [];
    logsLoadError = true;
  }
  try {
    photos = await fetchProgressPhotos(userId);
  } catch {
    photos = [];
    photosLoadError = true;
  }
  renderAll();
  renderFilmstrip();
  renderCompare();
  renderOnThisDay();
  maybeOfferHealthImport();
}

// A weigh-in that happened outside the app (a smart scale syncing straight
// to Health) should be easy to bring in without retyping it — but only
// offer this once there's something worth offering: today isn't already
// logged, and the Health sample is actually recent (today or yesterday),
// not some old reading from months ago. Silent no-op on non-iOS/web —
// readLatestHealthWeight already returns null there.
async function maybeOfferHealthImport() {
  const banner = el('health-import-offer');
  if (!banner || !currentUserId) return;
  const today = todayStr();
  if (logs.some((l) => l.logged_at === today)) return;
  const sample = await readLatestHealthWeight();
  if (!sample) return;
  const sampleDateStr = sample.date.slice(0, 10);
  const daysAgo = Math.round((new Date(today + 'T00:00:00') - new Date(sampleDateStr + 'T00:00:00')) / 86400000);
  if (daysAgo < 0 || daysAgo > 1) return;
  const weightRounded = Math.round(sample.weight * 10) / 10;
  el('health-import-text').textContent = t('progress.healthImportOffer', { weight: weightRounded });
  banner.style.display = 'flex';
  el('health-import-btn').onclick = () => {
    el('progress-weight-input').value = weightRounded;
    banner.style.display = 'none';
    el('progress-weight-input').focus();
  };
}

export function teardownProgress() {
  currentUserId = null;
  logs = [];
  photos = [];
  logsLoadError = false;
  photosLoadError = false;
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
  if (logsLoadError) {
    wrap.innerHTML = `<div class="progress-chart-empty error">${t('progress.chartLoadError')}</div>`;
    return;
  }
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

// "On this day" throwback — bonus nostalgia section, not a core feature, so
// it renders nothing when there's no reasonably close match rather than
// showing an empty state.
const ON_THIS_DAY_WEEKS = [4, 8, 12];
const ON_THIS_DAY_TOLERANCE_DAYS = 2;

// entries: logs ({ weight, logged_at }) or photos ({ loggedAt, url }).
// Checks each of the 4/8/12-week targets for an entry within ±2 days, and
// returns whichever candidate lands closest to its target date.
function findOnThisDayMatch(entries, dateField) {
  let best = null;
  for (const weeksAgo of ON_THIS_DAY_WEEKS) {
    const target = new Date();
    target.setDate(target.getDate() - weeksAgo * 7);
    for (const entry of entries) {
      const [y, m, d] = entry[dateField].split('-').map(Number);
      const entryDate = new Date(y, m - 1, d);
      const diffDays = Math.abs((entryDate - target) / 86400000);
      if (diffDays <= ON_THIS_DAY_TOLERANCE_DAYS && (!best || diffDays < best.diffDays)) {
        best = { entry, weeksAgo, diffDays };
      }
    }
  }
  return best;
}

function renderOnThisDay() {
  const wrap = el('on-this-day');
  if (!wrap) return;

  const weightMatch = findOnThisDayMatch(logs, 'logged_at');
  const photoMatch = findOnThisDayMatch(photos, 'loggedAt');
  if (!weightMatch && !photoMatch) {
    wrap.innerHTML = '';
    return;
  }

  let html = '';
  if (weightMatch) {
    const oldWeight = weightMatch.entry.weight;
    const currentWeight = logs.length ? logs[logs.length - 1].weight : null;
    let body = t('progress.onThisDayWeight', { old: fmt(oldWeight) });
    if (currentWeight != null && logs[logs.length - 1].logged_at !== weightMatch.entry.logged_at) {
      const delta = currentWeight - oldWeight;
      const sign = delta > 0 ? '+' : '';
      body = t('progress.onThisDayWeightVsNow', { old: fmt(oldWeight), current: fmt(currentWeight), sign, delta: fmt(Math.abs(delta)) });
    }
    html += `
      <div class="tip-card">
        <div class="tip-num">${weightMatch.weeksAgo}w</div>
        <div>
          <div class="tip-title">${t('progress.onThisDayTitle', { n: weightMatch.weeksAgo })}</div>
          <div class="tip-body">${body}</div>
        </div>
      </div>`;
  }
  const latestPhoto = photos.length ? photos[photos.length - 1] : null;
  if (photoMatch && latestPhoto && photoMatch.entry.loggedAt !== latestPhoto.loggedAt) {
    html += `
      <div class="tip-card" style="flex-direction:column;align-items:stretch;">
        <div class="tip-title" style="margin-bottom:8px;">${t('progress.onThisDayTitle', { n: photoMatch.weeksAgo })}</div>
        <div class="photo-compare-grid">
          <div class="photo-compare-col"><img src="${photoMatch.entry.url}" alt=""><div class="photo-compare-date">${formatShortDate(photoMatch.entry.loggedAt)}</div></div>
          <div class="photo-compare-col"><img src="${latestPhoto.url}" alt=""><div class="photo-compare-date">${formatShortDate(latestPhoto.loggedAt)}</div></div>
        </div>
      </div>`;
  }
  wrap.innerHTML = html;
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
  const originalBtnText = btn.textContent;
  btn.disabled = true;
  btn.textContent = originalBtnText + '…';
  try {
    const result = await logWeight(currentUserId, w, todayStr());
    const today = todayStr();
    const existingIdx = logs.findIndex((l) => l.logged_at === today);
    if (existingIdx >= 0) logs[existingIdx] = { weight: w, logged_at: today };
    else logs.push({ weight: w, logged_at: today });
    saveWeightToHealth(w, today); // fire-and-forget — see health.js
    const healthBanner = el('health-import-offer');
    if (healthBanner) healthBanner.style.display = 'none';
    input.value = '';
    input.placeholder = String(w);
    msg.textContent = result.xpAwarded > 0 ? t('progress.logSuccessXp', { xp: result.xpAwarded }) : t('progress.logSuccessUpdated');
    msg.className = 'progress-log-msg success';
    renderStats();
    renderChart();
    renderOnThisDay();
    checkForNewAchievements();
  } catch (err) {
    msg.textContent = err.message;
    msg.className = 'progress-log-msg error';
  } finally {
    btn.disabled = false;
    btn.textContent = originalBtnText;
  }
}

// iPhones shoot HEIC by default — same detection the AI Analyzer uses,
// since neither Chrome/Firefox/Edge can decode it in <img>/canvas either.
function isHeic(file) {
  const type = (file.type || '').toLowerCase();
  const name = (file.name || '').toLowerCase();
  return type === 'image/heic' || type === 'image/heif' || name.endsWith('.heic') || name.endsWith('.heif');
}

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

// Progress photos accumulate forever (unlike the AI Analyzer's photo, which
// is never stored) — resizing/re-encoding client-side before upload keeps
// storage and function-payload size sane over months of daily use.
async function fileToJpegBase64(file) {
  let workingFile = file;
  if (isHeic(file)) {
    const heic2any = (await import('heic2any')).default;
    const converted = await heic2any({ blob: file, toType: 'image/jpeg', quality: 0.9 });
    workingFile = Array.isArray(converted) ? converted[0] : converted;
  }
  const bitmap = await createImageBitmap(workingFile);
  let { width, height } = bitmap;
  if (width > PHOTO_MAX_DIM || height > PHOTO_MAX_DIM) {
    const scale = PHOTO_MAX_DIM / Math.max(width, height);
    width = Math.round(width * scale);
    height = Math.round(height * scale);
  }
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  canvas.getContext('2d').drawImage(bitmap, 0, 0, width, height);
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', PHOTO_QUALITY));
  return blobToBase64(blob);
}

function renderFilmstrip() {
  const wrap = el('progress-photo-filmstrip');
  if (!wrap) return;
  if (photosLoadError) {
    wrap.innerHTML = `<div class="photo-filmstrip-empty error">${t('progress.photosLoadError')}</div>`;
    return;
  }
  if (photos.length === 0) {
    wrap.innerHTML = `<div class="photo-filmstrip-empty">${t('progress.photoEmpty')}</div>`;
    return;
  }
  wrap.innerHTML = photos.map((p) => `
    <div class="photo-thumb" data-date="${p.loggedAt}">
      <img src="${p.url}" alt="${p.loggedAt}" loading="lazy">
      <div class="photo-thumb-date">${formatShortDate(p.loggedAt)}</div>
    </div>
  `).join('');
  wrap.querySelectorAll('.photo-thumb').forEach((thumb) => {
    thumb.addEventListener('click', () => openLightbox(thumb.dataset.date));
  });
}

function renderCompare() {
  const wrap = el('photo-compare-wrap');
  if (!wrap) return;
  if (photos.length < 2) {
    wrap.style.display = 'none';
    return;
  }
  wrap.style.display = 'block';

  const fromSel = el('photo-compare-from');
  const toSel = el('photo-compare-to');
  const prevFrom = fromSel.value, prevTo = toSel.value;
  const optsHtml = photos.map((p) => `<option value="${p.loggedAt}">${formatShortDate(p.loggedAt)}</option>`).join('');
  fromSel.innerHTML = optsHtml;
  toSel.innerHTML = optsHtml;
  fromSel.value = photos.some((p) => p.loggedAt === prevFrom) ? prevFrom : photos[0].loggedAt;
  toSel.value = photos.some((p) => p.loggedAt === prevTo) ? prevTo : photos[photos.length - 1].loggedAt;

  renderCompareView();
}

function renderCompareView() {
  const fromDate = el('photo-compare-from').value;
  const toDate = el('photo-compare-to').value;
  const fromPhoto = photos.find((p) => p.loggedAt === fromDate);
  const toPhoto = photos.find((p) => p.loggedAt === toDate);
  const grid = el('photo-compare-grid');
  const stats = el('photo-compare-stats');
  if (!fromPhoto || !toPhoto) {
    grid.innerHTML = '';
    stats.innerHTML = '';
    return;
  }
  grid.innerHTML = `
    <div class="photo-compare-col"><img src="${fromPhoto.url}" alt=""><div class="photo-compare-date">${formatShortDate(fromDate)}</div></div>
    <div class="photo-compare-col"><img src="${toPhoto.url}" alt=""><div class="photo-compare-date">${formatShortDate(toDate)}</div></div>
  `;

  const days = Math.round((new Date(`${toDate}T00:00:00`) - new Date(`${fromDate}T00:00:00`)) / 86400000);
  let statsHtml = `<div class="progress-stat"><div class="progress-stat-num">${Math.abs(days)}</div><div class="progress-stat-label">${t('progress.compareDays')}</div></div>`;

  const fromWeight = logs.find((l) => l.logged_at === fromDate)?.weight;
  const toWeight = logs.find((l) => l.logged_at === toDate)?.weight;
  if (fromWeight != null && toWeight != null) {
    const delta = toWeight - fromWeight;
    const sign = delta > 0 ? '+' : '';
    statsHtml += `<div class="progress-stat"><div class="progress-stat-num">${sign}${fmt(delta)}</div><div class="progress-stat-label">${t('progress.compareWeightChange')}</div></div>`;
  } else {
    statsHtml += `<div class="progress-stat"><div class="progress-stat-num">—</div><div class="progress-stat-label">${t('progress.compareWeightChange')}</div></div>`;
  }
  stats.innerHTML = statsHtml;
}

function openLightbox(loggedAt) {
  const photo = photos.find((p) => p.loggedAt === loggedAt);
  if (!photo) return;
  el('photo-lightbox-img').src = photo.url;
  el('photo-lightbox-date').textContent = formatShortDate(loggedAt);
  el('photo-lightbox-delete').dataset.date = loggedAt;
  el('photo-lightbox-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

export function closePhotoLightbox() {
  el('photo-lightbox-modal').classList.remove('open');
  document.body.style.overflow = '';
}

async function handleDeletePhoto() {
  const loggedAt = el('photo-lightbox-delete').dataset.date;
  if (!loggedAt || !confirm(t('progress.photoDeleteConfirm'))) return;
  try {
    await deleteProgressPhoto(currentUserId, loggedAt);
    photos = photos.filter((p) => p.loggedAt !== loggedAt);
    renderFilmstrip();
    renderCompare();
    renderOnThisDay();
    closePhotoLightbox();
  } catch (err) {
    alert(err.message);
  }
}

async function handlePhotoAdd(e) {
  const file = e.target.files[0];
  const input = e.target;
  if (!file || !currentUserId) return;
  const btn = el('progress-photo-add-btn');
  const msg = el('progress-photo-msg');
  const originalBtnText = btn.textContent;
  btn.disabled = true;
  btn.textContent = originalBtnText + '…';
  msg.textContent = '';
  msg.className = 'photo-msg';
  try {
    const base64 = await fileToJpegBase64(file);
    const result = await uploadProgressPhoto(currentUserId, base64, todayStr());
    const existingIdx = photos.findIndex((p) => p.loggedAt === result.loggedAt);
    if (existingIdx >= 0) photos[existingIdx] = result;
    else photos.push(result);
    photos.sort((a, b) => a.loggedAt.localeCompare(b.loggedAt));
    renderFilmstrip();
    renderCompare();
    renderOnThisDay();
    msg.textContent = t('progress.photoSuccess');
    msg.className = 'photo-msg success';
    checkForNewAchievements();
  } catch (err) {
    msg.textContent = err.message;
    msg.className = 'photo-msg error';
  } finally {
    btn.disabled = false;
    btn.textContent = originalBtnText;
    input.value = '';
  }
}

document.getElementById('progress-goal-tabs')?.querySelectorAll('button').forEach((btn) => {
  btn.addEventListener('click', () => selectGoal(btn.dataset.goal));
});
document.getElementById('progress-log-btn')?.addEventListener('click', submitLog);
document.getElementById('progress-photo-add-btn')?.addEventListener('click', () => el('progress-photo-input').click());
document.getElementById('progress-photo-input')?.addEventListener('change', handlePhotoAdd);
document.getElementById('photo-lightbox-close')?.addEventListener('click', closePhotoLightbox);
document.getElementById('photo-lightbox-delete')?.addEventListener('click', handleDeletePhoto);
document.getElementById('photo-compare-from')?.addEventListener('change', renderCompareView);
document.getElementById('photo-compare-to')?.addEventListener('change', renderCompareView);
