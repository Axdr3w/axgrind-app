import { WORKOUTS } from './workouts-data.js';
import { SPORTS_WORKOUTS, SPORTS, PROGRAMS } from './sports-data.js';
import { PROGRAM_WORKOUTS } from './programs-data.js';
import { isRealExercise } from './exercise-info.js';
import { t, getLanguage } from './i18n/index.js';
import { translateBatch } from './i18n/content-translate.js';
import { completeWorkout, fetchCompletedWorkoutKeysToday } from './api/xp.js';
import { getRankMap, invalidateRankCache } from './rank-cache.js';
import { renderBrainArticles } from './brain.js';

const ALL_SPORT_AND_PROGRAM_WORKOUTS = [...SPORTS_WORKOUTS, ...PROGRAM_WORKOUTS];

const LEVEL_RANK = { beginner: 0, intermediate: 1, advanced: 2 };
function sortByLevel(list) {
  return [...list].sort((a, b) => LEVEL_RANK[a.level] - LEVEL_RANK[b.level]);
}

// Translated strings are runtime network values (not developer-authored
// literals), so — same as forum.js/dm.js — they must be escaped before
// going into innerHTML.
function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function levelLabel(level) {
  if (level === 'beginner') return t('plans.levelBeginner');
  if (level === 'intermediate') return t('plans.levelIntermediate');
  if (level === 'advanced') return t('plans.levelAdvanced');
  return level;
}

let activeCategory = 'strength'; // 'strength' | 'sport' | 'programs' | 'brain'
let activeMuscleFilt = 'all', activeEnvFilt = 'all';
let selectedSportOrProgram = null; // id from SPORTS or PROGRAMS, or null = show the browse list
let sportListSearch = '';

// ===== Guided workout session state =====
// Session-local only (not persisted) — closing the modal or navigating away
// resets it, matching the app's existing "no fancy state persistence" pattern.
let currentUserId = null;
let completedTodayKeys = new Set(); // `${workoutId}::${dayKey}` completed today
const sessions = new Map(); // dayKey -> { checked: Set<number>, seconds, running, intervalId, message, messageError }
let currentPlan = null;
let currentTrMap = null;

export async function initPlans(userId) {
  currentUserId = userId;
  try {
    completedTodayKeys = await fetchCompletedWorkoutKeysToday(userId);
  } catch {
    completedTodayKeys = new Set();
  }
}

export function teardownPlans() {
  currentUserId = null;
  completedTodayKeys = new Set();
  sessions.forEach((s) => { if (s.intervalId) clearInterval(s.intervalId); });
  sessions.clear();
}

export function filterCategory(category, btn) {
  activeCategory = category;
  document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('strength-filters').style.display = category === 'strength' ? 'block' : 'none';
  document.getElementById('sport-filters').style.display = category === 'sport' ? 'block' : 'none';
  document.getElementById('programs-filters').style.display = category === 'programs' ? 'block' : 'none';
  document.getElementById('brain-filters').style.display = category === 'brain' ? 'block' : 'none';
  document.getElementById('drill-workout-view').style.display = 'none';
  if (category === 'sport') {
    selectedSportOrProgram = null;
    document.getElementById('workout-cards').style.display = 'none';
    renderSportBrowse();
  } else if (category === 'programs') {
    selectedSportOrProgram = null;
    document.getElementById('workout-cards').style.display = 'none';
    renderProgramBrowse();
  } else if (category === 'brain') {
    document.getElementById('workout-cards').style.display = 'none';
    renderBrainArticles();
  } else {
    document.getElementById('workout-cards').style.display = 'grid';
    renderWorkouts();
  }
}

export function filterMuscle(m, btn) {
  activeMuscleFilt = m;
  document.querySelectorAll('.muscle-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  renderWorkouts();
}

export function filterEnv(e) {
  activeEnvFilt = e;
  document.querySelectorAll('.env-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('env-' + e).classList.add('active');
  renderWorkouts();
}

// `tr` is an optional Map<originalEnglishText, translatedText> — null means
// render in English (either lang === 'en', or the first synchronous pass
// before the translation batch has resolved).
function renderCard(w, tr) {
  const title = tr?.get(w.title) ?? w.title;
  const meta = tr?.get(w.meta) ?? w.meta;
  const envBadge = w.env ? `<span class="badge badge-env">${w.env === 'gym' ? '🏋️' : '🏠'}</span>` : '';
  return `
    <div class="workout-card ${w.featured ? 'featured' : ''}" onclick="openWorkout('${w.id}')">
      <div class="wc-top">
        <div>
          <div class="wc-title">${w.icon} ${escapeHtml(title)}</div>
          <div class="wc-meta">${escapeHtml(meta)}</div>
        </div>
        <div class="wc-badges">
          <span class="badge badge-level-${w.level}">${levelLabel(w.level)}</span>
          ${envBadge}
          ${w.featured ? '<span class="badge badge-hot">🔥</span>' : ''}
        </div>
      </div>
    </div>
  `;
}

let workoutsGen = 0;

export function renderWorkouts() {
  const container = document.getElementById('workout-cards');
  let filtered;
  if (activeCategory === 'strength') {
    filtered = WORKOUTS.filter(w => {
      const mOk = activeMuscleFilt === 'all' || w.muscle === activeMuscleFilt;
      const eOk = activeEnvFilt === 'all' || w.env === activeEnvFilt;
      return mOk && eOk;
    });
  } else {
    filtered = ALL_SPORT_AND_PROGRAM_WORKOUTS.filter(w => w.sport === selectedSportOrProgram || w.program === selectedSportOrProgram);
  }
  filtered = sortByLevel(filtered);
  const myGen = ++workoutsGen;
  if (filtered.length === 0) {
    container.innerHTML = `<div style="text-align:center;padding:40px;color:var(--muted);font-size:13px;">${t('plans.noWorkoutsFound')}</div>`;
    return;
  }
  container.innerHTML = filtered.map(w => renderCard(w, null)).join('');

  const lang = getLanguage();
  if (lang === 'en') return;
  const texts = [];
  filtered.forEach(w => { texts.push(w.title); texts.push(w.meta); });
  translateBatch(texts, lang).then((translated) => {
    if (myGen !== workoutsGen) return; // a newer render superseded this one
    const map = new Map();
    texts.forEach((text, i) => map.set(text, translated[i]));
    container.innerHTML = filtered.map(w => renderCard(w, map)).join('');
  });
}

// ===== Sport browse list =====

function sportListRow(id, icon, name, description) {
  return `
    <div class="sport-list-row" onclick="selectSportOrProgram('${id}')">
      <div class="sport-list-icon">${icon}</div>
      <div class="sport-list-info">
        <div class="sport-list-name">${escapeHtml(name)}</div>
        <div class="sport-list-desc">${escapeHtml(description)}</div>
      </div>
      <div class="sport-list-arrow">→</div>
    </div>
  `;
}

let sportBrowseGen = 0;

function renderSportBrowse() {
  document.getElementById('sport-browse-list').style.display = 'block';

  const q = sportListSearch.trim().toLowerCase();
  const sportRows = [...SPORTS]
    .filter(s => !q || s.name.toLowerCase().includes(q))
    .sort((a, b) => a.name.localeCompare(b.name));

  const myGen = ++sportBrowseGen;

  function build(tr) {
    if (!sportRows.length) {
      return `<div style="text-align:center;padding:40px;color:var(--muted);font-size:13px;">${t('plans.noSearchMatches')}</div>`;
    }
    return sportRows.map(s => sportListRow(s.id, s.icon, tr?.get(s.name) ?? s.name, tr?.get(s.description) ?? s.description)).join('');
  }

  document.getElementById('sport-browse-list').innerHTML = build(null);

  const lang = getLanguage();
  if (lang === 'en' || !sportRows.length) return;
  const texts = [];
  sportRows.forEach(item => { texts.push(item.name); texts.push(item.description); });
  translateBatch(texts, lang).then((translated) => {
    if (myGen !== sportBrowseGen) return;
    const map = new Map();
    texts.forEach((text, i) => map.set(text, translated[i]));
    document.getElementById('sport-browse-list').innerHTML = build(map);
  });
}

export function filterSportList(query) {
  sportListSearch = query;
  renderSportBrowse();
}

// ===== Program browse list =====
// Deliberately unsorted (array order, not A-Z) so featured/priority programs
// like Recovery can stay pinned at the top instead of falling wherever the
// alphabet puts them.

let programBrowseGen = 0;

function renderProgramBrowse() {
  document.getElementById('program-browse-list').style.display = 'block';
  const myGen = ++programBrowseGen;

  function build(tr) {
    return PROGRAMS.map(p => sportListRow(p.id, p.icon, tr?.get(p.name) ?? p.name, tr?.get(p.description) ?? p.description)).join('');
  }

  document.getElementById('program-browse-list').innerHTML = build(null);

  const lang = getLanguage();
  if (lang === 'en') return;
  const texts = [];
  PROGRAMS.forEach(item => { texts.push(item.name); texts.push(item.description); });
  translateBatch(texts, lang).then((translated) => {
    if (myGen !== programBrowseGen) return;
    const map = new Map();
    texts.forEach((text, i) => map.set(text, translated[i]));
    document.getElementById('program-browse-list').innerHTML = build(map);
  });
}

// ===== Shared drill-in workout view (used by both the Sport-Specific and
// Programs tabs — a user can only be drilled into one of them at a time, so
// one view/one piece of state is enough; backToBrowseList() routes back to
// whichever tab's list is currently active). =====

export function selectSportOrProgram(id) {
  selectedSportOrProgram = id;
  document.getElementById('sport-browse-list').style.display = 'none';
  document.getElementById('program-browse-list').style.display = 'none';
  document.getElementById('drill-workout-view').style.display = 'block';
  document.getElementById('workout-cards').style.display = 'grid';
  const meta = SPORTS.find(s => s.id === id) || PROGRAMS.find(p => p.id === id);
  const titleEl = document.getElementById('drill-workout-title');
  titleEl.textContent = meta ? `${meta.icon} ${meta.name}` : '';
  const lang = getLanguage();
  if (meta && lang !== 'en') {
    translateBatch([meta.name], lang).then(([translatedName]) => {
      titleEl.textContent = `${meta.icon} ${translatedName}`;
    });
  }
  renderWorkouts();
}

export function backToBrowseList() {
  selectedSportOrProgram = null;
  document.getElementById('drill-workout-view').style.display = 'none';
  document.getElementById('workout-cards').style.display = 'none';
  if (activeCategory === 'programs') {
    renderProgramBrowse();
  } else {
    renderSportBrowse();
  }
}

// Workout tips are authored as '<strong>Lead sentence.</strong> Rest of the
// tip.' — splitting lets us translate the two text segments independently
// while keeping the (trusted, developer-authored) <strong> tag itself intact.
function splitTip(tip) {
  const m = tip.match(/^<strong([^>]*)>(.*?)<\/strong>\s*(.*)$/s);
  if (!m) return null;
  return { boldAttrs: m[1], bold: m[2], rest: m[3] };
}

function renderTipHtml(tip, tr) {
  const split = splitTip(tip);
  if (!split) return `<div class="workout-tip">${escapeHtml(tr?.get(tip) ?? tip)}</div>`;
  const bold = tr?.get(split.bold) ?? split.bold;
  const rest = tr?.get(split.rest) ?? split.rest;
  return `<div class="workout-tip"><strong${split.boldAttrs}>${escapeHtml(bold)}</strong> ${escapeHtml(rest)}</div>`;
}

function collectPlanTexts(plan) {
  const texts = [plan.title];
  if (plan.tip) {
    const split = splitTip(plan.tip);
    if (split) { texts.push(split.bold); texts.push(split.rest); }
    else texts.push(plan.tip);
  }
  function collectDay(day) {
    texts.push(day.label);
    day.exercises.forEach(ex => texts.push(ex.name));
  }
  if (plan.isProgram && plan.weeks) {
    plan.weeks.forEach(week => {
      texts.push(week.label);
      if (week.note) texts.push(week.note);
      week.days.forEach(collectDay);
    });
  } else {
    plan.days.forEach(collectDay);
  }
  return texts;
}

// ===== Guided session helpers =====

function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const s = (totalSeconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function findDayByKey(plan, dayKey) {
  if (plan.isProgram && plan.weeks) {
    for (let w = 0; w < plan.weeks.length; w++) {
      const days = plan.weeks[w].days;
      for (let d = 0; d < days.length; d++) {
        if (`week${w}day${d}` === dayKey) return days[d];
      }
    }
    return null;
  }
  for (let d = 0; d < plan.days.length; d++) {
    if (`day${d}` === dayKey) return plan.days[d];
  }
  return null;
}

function rerenderModal() {
  if (!currentPlan) return;
  renderModalBody(currentPlan, currentTrMap);
}

function refreshRankDisplay() {
  invalidateRankCache();
  if (!currentUserId) return;
  getRankMap(true).then((map) => {
    const rankEl = document.getElementById('account-rank-display');
    if (rankEl) {
      const r = map.get(currentUserId);
      rankEl.textContent = r ? '#' + r : '—';
    }
  });
}

function tickTimer(dayKey) {
  const session = sessions.get(dayKey);
  if (!session || !session.running) return;
  session.seconds++;
  const el = document.getElementById(`timer-${dayKey}`);
  if (el) el.textContent = formatTime(session.seconds);
}

export function startWorkoutSession(workoutId, dayKey) {
  if (sessions.has(dayKey)) return;
  const session = { checked: new Set(), seconds: 0, running: true, intervalId: null, message: null, messageError: false };
  session.intervalId = setInterval(() => tickTimer(dayKey), 1000);
  sessions.set(dayKey, session);
  rerenderModal();
}

export function toggleWorkoutTimer(dayKey) {
  const session = sessions.get(dayKey);
  if (!session) return;
  session.running = !session.running;
  rerenderModal();
}

export function toggleExerciseChecked(dayKey, idx) {
  const session = sessions.get(dayKey);
  if (!session) return;
  if (session.checked.has(idx)) session.checked.delete(idx);
  else session.checked.add(idx);
  rerenderModal();
}

export async function finishWorkout(workoutId, dayKey) {
  const session = sessions.get(dayKey);
  if (!session || !currentUserId || !currentPlan) return;
  const day = findDayByKey(currentPlan, dayKey);
  const total = day ? day.exercises.length : 0;
  if (session.checked.size < total) {
    if (!confirm(t('plans.confirmFinishIncomplete'))) return;
  }
  try {
    await completeWorkout(currentUserId, workoutId, dayKey);
    if (session.intervalId) clearInterval(session.intervalId);
    sessions.delete(dayKey);
    completedTodayKeys.add(`${workoutId}::${dayKey}`);
    refreshRankDisplay();
  } catch (err) {
    session.message = err.message;
    session.messageError = true;
  }
  rerenderModal();
}

function renderDaySessionControls(dayKey, workoutId, totalExercises) {
  const session = sessions.get(dayKey);
  if (session) {
    const msg = session.message
      ? `<div class="day-session-msg${session.messageError ? ' error' : ''}">${escapeHtml(session.message)}</div>`
      : '';
    return `
      <div class="day-session-bar">
        <div class="day-timer" id="timer-${dayKey}">${formatTime(session.seconds)}</div>
        <button type="button" class="btn-follow btn-xs" onclick="toggleWorkoutTimer('${dayKey}')">${session.running ? '⏸ ' + t('plans.pauseTimer') : '▶ ' + t('plans.resumeTimer')}</button>
        <div class="day-progress">${session.checked.size}/${totalExercises}</div>
        <button type="button" class="btn-accent btn-xs" onclick="finishWorkout('${workoutId}','${dayKey}')">${t('plans.finishWorkout')}</button>
      </div>
      ${msg}
    `;
  }
  if (completedTodayKeys.has(`${workoutId}::${dayKey}`)) {
    return `<div class="day-completed-badge">✅ ${t('plans.completedToday')}</div>`;
  }
  return `<button type="button" class="btn-follow btn-xs" onclick="startWorkoutSession('${workoutId}','${dayKey}')">▶ ${t('plans.startWorkout')}</button>`;
}

function renderModalBody(plan, tr) {
  const pick = (text) => tr?.get(text) ?? text;
  document.getElementById('modal-title').textContent = plan.icon + ' ' + pick(plan.title);
  const envTag = plan.env ? `<span class="ws-tag accent">${plan.env === 'gym' ? '🏋️ ' + t('plans.envGym') : '🏠 ' + t('plans.envHome')}</span>` : '';
  // plan.meta stays in English here — it's short symbolic tokens ("3x/week ·
  // 30 min") joined by a literal '·' that a translation might not preserve
  // exactly, and splitting on a delimiter that could move is riskier than
  // the (largely numeric/universal) content is worth translating.
  let body = `<div class="ws-meta"><span class="ws-tag accent">${levelLabel(plan.level)}</span>${envTag}${plan.meta.split('·').map(tag => `<span class="ws-tag">${escapeHtml(tag.trim())}</span>`).join('')}</div>`;
  if (plan.tip) body += renderTipHtml(plan.tip, tr);

  function renderDay(day, dayKey) {
    const session = sessions.get(dayKey);
    let html = `<div class="day-block" data-day-key="${dayKey}"><div class="day-label">${escapeHtml(pick(day.label))}</div>`;
    html += renderDaySessionControls(dayKey, plan.id, day.exercises.length);
    day.exercises.forEach((ex, i) => {
      const clickable = isRealExercise(ex.name);
      // data-exercise stays the RAW English name — exercise-info.js's caption
      // lookup (normalize/CAPTIONS/keywordCaption) is English-internal, and
      // must never see a translated string or the lookup silently degrades
      // to the generic keyword-fallback caption.
      const rowAttrs = clickable
        ? ` class="exercise-row clickable" data-exercise="${ex.name.replace(/"/g, '&quot;')}"`
        : ' class="exercise-row"';
      const checked = session?.checked.has(i) ?? false;
      const checkbox = session
        ? `<button type="button" class="ex-check${checked ? ' checked' : ''}" onclick="event.stopPropagation();toggleExerciseChecked('${dayKey}',${i})">${checked ? '✓' : ''}</button>`
        : '';
      html += `<div${rowAttrs}>${checkbox}<div class="ex-num">${i + 1}</div><div class="ex-name">${escapeHtml(pick(ex.name))}</div><div class="ex-sets">${escapeHtml(ex.sets)}</div>${ex.rest ? `<div class="ex-rest">${escapeHtml(ex.rest)}</div>` : ''}</div>`;
    });
    html += '</div>';
    return html;
  }

  if (plan.isProgram && plan.weeks) {
    plan.weeks.forEach((week, weekIdx) => {
      body += `<div class="week-block"><div class="week-label">${escapeHtml(pick(week.label))}</div>`;
      if (week.note) body += `<div class="week-note">${escapeHtml(pick(week.note))}</div>`;
      week.days.forEach((day, dayIdx) => { body += renderDay(day, `week${weekIdx}day${dayIdx}`); });
      body += '</div>';
    });
  } else {
    plan.days.forEach((day, dayIdx) => { body += renderDay(day, `day${dayIdx}`); });
  }

  document.getElementById('modal-body').innerHTML = body;
}

let modalGen = 0;

export function openWorkout(id) {
  const plan = WORKOUTS.find(w => w.id === id) || ALL_SPORT_AND_PROGRAM_WORKOUTS.find(w => w.id === id);
  if (!plan) return;
  currentPlan = plan;
  currentTrMap = null;

  const myGen = ++modalGen;
  renderModalBody(plan, null);
  document.getElementById('workout-modal').classList.add('open');
  document.body.style.overflow = 'hidden';

  const lang = getLanguage();
  if (lang === 'en') return;
  const texts = collectPlanTexts(plan);
  translateBatch(texts, lang).then((translated) => {
    if (myGen !== modalGen) return; // user closed/switched workouts before this resolved
    const map = new Map();
    texts.forEach((text, i) => map.set(text, translated[i]));
    currentTrMap = map;
    renderModalBody(plan, map);
  });
}

export function closeWorkout() {
  document.getElementById('workout-modal').classList.remove('open');
  document.body.style.overflow = '';
  modalGen++; // invalidate any in-flight translation for the closed workout
  sessions.forEach((s) => { if (s.intervalId) clearInterval(s.intervalId); });
  sessions.clear();
  currentPlan = null;
  currentTrMap = null;
}

// Re-render whatever's currently on screen in the new language — without
// this, content rendered before a language switch would stay in the old
// language until some other action (a filter click) happened to re-render it.
window.addEventListener('ax:languagechange', () => {
  if (activeCategory === 'brain') {
    // brain.js's own languagechange listener repaints this view's text.
  } else if (activeCategory === 'sport' && !selectedSportOrProgram) {
    renderSportBrowse();
  } else if (activeCategory === 'programs' && !selectedSportOrProgram) {
    renderProgramBrowse();
  } else {
    renderWorkouts();
  }
});
