import { t, getLanguage } from './i18n/index.js';
import { translateBatch } from './i18n/content-translate.js';
import { completeWorkout, fetchCompletedWorkoutKeysToday } from './api/xp.js';
import { fetchLastExerciseLog, logExerciseWeight } from './api/exerciseLogs.js';
import { getRankMap, invalidateRankCache } from './rank-cache.js';
import { renderBrainArticles } from './brain.js';
import { checkForNewAchievements } from './achievements.js';
import { escapeHtml } from './html-utils.js';
import { todayStr } from './date-utils.js';

// workouts-data.js / sports-data.js / programs-data.js are large content
// libraries — split into their own chunks and fetched in the background
// instead of being part of the initial bundle every visitor downloads,
// matching the same lazy-chunk pattern brain.js uses for brain-data.js.
let workoutDataPromise = null;
function loadWorkoutData() {
  if (!workoutDataPromise) {
    workoutDataPromise = Promise.all([
      import('./workouts-data.js'),
      import('./sports-data.js'),
      import('./programs-data.js'),
    ]).then(([w, s, p]) => ({
      WORKOUTS: w.WORKOUTS,
      SPORTS_WORKOUTS: s.SPORTS_WORKOUTS,
      SPORTS: s.SPORTS,
      PROGRAMS: s.PROGRAMS,
      PROGRAM_WORKOUTS: p.PROGRAM_WORKOUTS,
    }));
  }
  return workoutDataPromise;
}

// exercise-info.js is a large per-exercise caption/video-link library, also
// split into its own chunk.
let exerciseInfoPromise = null;
function loadExerciseInfo() {
  if (!exerciseInfoPromise) exerciseInfoPromise = import('./exercise-info.js');
  return exerciseInfoPromise;
}

const LEVEL_RANK = { beginner: 0, intermediate: 1, advanced: 2 };
function sortByLevel(list) {
  return [...list].sort((a, b) => LEVEL_RANK[a.level] - LEVEL_RANK[b.level]);
}

// Translated strings are runtime network values (not developer-authored
// literals), so — same as forum.js/dm.js — they must be escaped before
// going into innerHTML.

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

// Guest preview (see the auth-gate CSS in style.css) only lets a signed-out
// visitor browse Strength Training → Beginner — everything else in Plans
// prompts them to sign up instead of actually opening.
function isPreviewLocked() {
  return document.body.classList.contains('locked');
}

function redirectToSignup() {
  document.getElementById('auth-tab-signup')?.click();
  document.getElementById('guest-auth-card')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function filterCategory(category, btn) {
  if (isPreviewLocked() && category !== 'strength') {
    redirectToSignup();
    return;
  }
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
  const locked = isPreviewLocked() && w.level !== 'beginner' ? 'preview-locked' : '';
  return `
    <div class="workout-card ${w.featured ? 'featured' : ''} ${locked}" onclick="openWorkout('${w.id}')">
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

// One-time nudge for a first-time visitor to the Plans page, pointing them
// at Strength Training since the 4 category tabs otherwise look equally
// weighted with no indication of where to start. Tracked purely client-side
// (low-stakes UI nicety, not account data) so it never reappears once
// dismissed — or once seen, since the tabs themselves don't need repeating.
const PLANS_HINT_SEEN_KEY = 'ax-plans-hint-seen';
const PLANS_HINT_ID = 'plans-first-visit-hint';

function maybeShowFirstVisitHint() {
  if (document.getElementById(PLANS_HINT_ID)) return; // already inserted
  let seen = true;
  try { seen = !!localStorage.getItem(PLANS_HINT_SEEN_KEY); } catch { /* localStorage unavailable — don't nag */ }
  if (seen) return;
  const tabs = document.querySelector('#page-plans .category-tabs');
  if (!tabs) return;

  const hint = document.createElement('div');
  hint.id = PLANS_HINT_ID;
  hint.className = 'calc-box';
  hint.style.cssText = 'display:flex;align-items:center;gap:10px;justify-content:space-between;margin-bottom:12px;font-size:12px;color:var(--muted);line-height:1.5;';
  hint.innerHTML = `
    <span>${escapeHtml(t('plans.newHereHint'))}</span>
    <button type="button" class="btn-follow btn-xs" style="flex-shrink:0;" id="${PLANS_HINT_ID}-dismiss">${escapeHtml(t('plans.newHereHintDismiss'))}</button>
  `;
  tabs.parentNode.insertBefore(hint, tabs);
  document.getElementById(`${PLANS_HINT_ID}-dismiss`).addEventListener('click', () => {
    try { localStorage.setItem(PLANS_HINT_SEEN_KEY, '1'); } catch { /* best-effort */ }
    hint.remove();
  });
}

let workoutsGen = 0;

export async function renderWorkouts() {
  maybeShowFirstVisitHint();
  const { WORKOUTS, SPORTS_WORKOUTS, PROGRAM_WORKOUTS } = await loadWorkoutData();
  const container = document.getElementById('workout-cards');
  let filtered;
  if (activeCategory === 'strength') {
    filtered = WORKOUTS.filter(w => {
      const mOk = activeMuscleFilt === 'all' || w.muscle === activeMuscleFilt;
      const eOk = activeEnvFilt === 'all' || w.env === activeEnvFilt;
      return mOk && eOk;
    });
  } else {
    const allSportAndProgramWorkouts = [...SPORTS_WORKOUTS, ...PROGRAM_WORKOUTS];
    filtered = allSportAndProgramWorkouts.filter(w => w.sport === selectedSportOrProgram || w.program === selectedSportOrProgram);
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

async function renderSportBrowse() {
  const { SPORTS } = await loadWorkoutData();
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

async function renderProgramBrowse() {
  const { PROGRAMS } = await loadWorkoutData();
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

export async function selectSportOrProgram(id) {
  const { SPORTS, PROGRAMS } = await loadWorkoutData();
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

// "3min"/"90s"/"45 sec"/"none"/"" -> seconds, or null when there's nothing
// to rest for (matches every format actually used in workouts-data.js).
function parseRestSeconds(restStr) {
  const m = String(restStr || '').match(/^(\d+)\s*(s|sec|min)/i);
  if (!m) return null;
  const n = Number(m[1]);
  return n > 0 ? (m[2].toLowerCase().startsWith('min') ? n * 60 : n) : null;
}

function tickTimer(dayKey) {
  const session = sessions.get(dayKey);
  if (!session) return;
  if (session.running) {
    session.seconds++;
    const el = document.getElementById(`timer-${dayKey}`);
    if (el) el.textContent = formatTime(session.seconds);
  }
  // Runs independent of the pause state above — pausing the overall workout
  // clock (e.g. to deal with something between sets) shouldn't also freeze
  // the rest countdown you're actively waiting on.
  if (session.restRemaining != null) {
    session.restRemaining--;
    if (session.restRemaining <= 0) {
      session.restRemaining = null;
      rerenderModal();
    } else {
      const restEl = document.getElementById(`rest-${dayKey}`);
      if (restEl) restEl.textContent = formatTime(session.restRemaining);
    }
  }
}

export function startWorkoutSession(workoutId, dayKey) {
  if (sessions.has(dayKey)) return;
  const session = {
    checked: new Set(), seconds: 0, running: true, intervalId: null, message: null, messageError: false,
    voiceEnabled: false, restRemaining: null, plateCalcOpen: false,
    // Per-exercise weight logging: which rows have their log panel open,
    // the last-logged value fetched for each (only fetched lazily, on open,
    // so opening a workout never fires one query per exercise up front),
    // and the not-yet-saved input values so re-rendering the modal (which
    // happens on every checkbox tap) doesn't wipe out what's half-typed.
    logOpen: new Set(), lastLogCache: new Map(), logDraft: new Map(),
  };
  session.intervalId = setInterval(() => tickTimer(dayKey), 1000);
  sessions.set(dayKey, session);
  rerenderModal();
}

export function skipRest(dayKey) {
  const session = sessions.get(dayKey);
  if (!session) return;
  session.restRemaining = null;
  rerenderModal();
}

export function togglePlateCalc(dayKey) {
  const session = sessions.get(dayKey);
  if (!session) return;
  session.plateCalcOpen = !session.plateCalcOpen;
  rerenderModal();
}

// Greedily breaks the per-side weight into standard plate sizes — the same
// math anyone does in their head at a rack, just done for them. Bar weight
// is whatever they enter (45 is the Olympic-bar default), not assumed.
const PLATE_SIZES = [45, 35, 25, 10, 5, 2.5];

export function calcPlates(dayKey) {
  const target = parseFloat(document.getElementById(`plate-target-${dayKey}`)?.value);
  const bar = parseFloat(document.getElementById(`plate-bar-${dayKey}`)?.value) || 45;
  const resultEl = document.getElementById(`plate-result-${dayKey}`);
  if (!resultEl) return;
  if (!Number.isFinite(target) || target <= bar) {
    resultEl.textContent = '';
    return;
  }
  let perSide = (target - bar) / 2;
  const plates = [];
  for (const size of PLATE_SIZES) {
    while (perSide + 1e-9 >= size) {
      plates.push(size);
      perSide -= size;
    }
  }
  resultEl.textContent = plates.length
    ? `${t('plans.perSide')}: ${plates.map(p => (p % 1 === 0 ? p : p.toFixed(1))).join(' + ')}`
    : t('plans.plateNone');
}

// Opening a log panel lazily fetches that one exercise's last entry — never
// eagerly for every exercise on workout open, since most rows never get
// logged in a given session and that would be one query each for nothing.
export async function toggleExerciseLog(dayKey, idx, exerciseName) {
  const session = sessions.get(dayKey);
  if (!session) return;
  if (session.logOpen.has(idx)) {
    session.logOpen.delete(idx);
    rerenderModal();
    return;
  }
  session.logOpen.add(idx);
  rerenderModal();
  if (!session.lastLogCache.has(idx) && currentUserId) {
    const last = await fetchLastExerciseLog(currentUserId, exerciseName);
    session.lastLogCache.set(idx, last);
    if (session.logOpen.has(idx)) rerenderModal();
  }
}

// The modal body re-renders on every checkbox tap (renderModalBody rebuilds
// the whole innerHTML) — without stashing what's typed so far, checking off
// a different exercise while a log panel is mid-entry would silently wipe
// it. This just keeps that draft in memory; it doesn't need to re-render
// anything itself since the input already shows what was typed locally.
export function updateExerciseLogDraft(dayKey, idx, field, value) {
  const session = sessions.get(dayKey);
  if (!session) return;
  const draft = session.logDraft.get(idx) || {};
  draft[field] = value;
  session.logDraft.set(idx, draft);
}

export async function saveExerciseLog(dayKey, idx, exerciseName) {
  const session = sessions.get(dayKey);
  if (!session || !currentUserId) return;
  const weightInput = document.getElementById(`exlog-weight-${dayKey}-${idx}`);
  const repsInput = document.getElementById(`exlog-reps-${dayKey}-${idx}`);
  const weight = parseFloat(weightInput?.value);
  if (!Number.isFinite(weight) || weight <= 0) return;
  const reps = repsInput?.value ? parseInt(repsInput.value, 10) : null;
  const loggedDate = todayStr();
  try {
    await logExerciseWeight(currentUserId, exerciseName, weight, reps, loggedDate);
    session.lastLogCache.set(idx, { weight, reps, logged_date: loggedDate });
    session.logDraft.delete(idx);
    session.logOpen.delete(idx);
    rerenderModal();
  } catch (err) {
    console.error('[exercise log]', err);
  }
}

// Mid-set is the worst time to be looking at a screen — reads out the next
// exercise via the Web Speech API (no native plugin needed, works in the
// WKWebView the same as the browser). Off by default per session since it
// talks out loud unprompted otherwise; toggled from the session controls.
export function toggleVoiceGuidance(dayKey) {
  const session = sessions.get(dayKey);
  if (!session) return;
  session.voiceEnabled = !session.voiceEnabled;
  if (!session.voiceEnabled && window.speechSynthesis) window.speechSynthesis.cancel();
  rerenderModal();
}

function speakNextExercise(dayKey, justCheckedIdx) {
  if (!window.speechSynthesis || !currentPlan) return;
  const day = findDayByKey(currentPlan, dayKey);
  if (!day) return;
  const nextIdx = day.exercises.findIndex((_, i) => i > justCheckedIdx && !sessions.get(dayKey)?.checked.has(i));
  if (nextIdx === -1) {
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(t('plans.voiceAllDone')));
    return;
  }
  const ex = day.exercises[nextIdx];
  window.speechSynthesis.cancel(); // don't queue up behind a previous announcement
  window.speechSynthesis.speak(new SpeechSynthesisUtterance(`${t('plans.voiceNext')}: ${ex.name}, ${ex.sets}`));
}

export function toggleWorkoutTimer(dayKey) {
  const session = sessions.get(dayKey);
  if (!session) return;
  session.running = !session.running;
  rerenderModal();
}

export function toggleExerciseChecked(dayKey, idx) {
  const session = sessions.get(dayKey);
  if (!session || !currentPlan) return;
  const wasUnchecked = !session.checked.has(idx);
  if (session.checked.has(idx)) session.checked.delete(idx);
  else session.checked.add(idx);
  if (wasUnchecked) {
    if (session.voiceEnabled) speakNextExercise(dayKey, idx);
    const day = findDayByKey(currentPlan, dayKey);
    const restSeconds = parseRestSeconds(day?.exercises[idx]?.rest);
    if (restSeconds) session.restRemaining = restSeconds;
  }
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
    checkForNewAchievements();
    celebrateWorkoutFinish();
  } catch (err) {
    session.message = err.message;
    session.messageError = true;
  }
  rerenderModal();
}

// A real workout is real effort — a number ticking up in the corner doesn't
// match that. A brief, un-skippable full-screen moment does. Pure CSS/JS,
// no native dependency, so unlike haptic feedback this works everywhere the
// site already deploys to (see the finishWorkout call site).
function celebrateWorkoutFinish() {
  const overlay = document.createElement('div');
  overlay.className = 'celebration-overlay';
  const particleCount = 28;
  let particlesHtml = '';
  for (let i = 0; i < particleCount; i++) {
    const angle = (360 / particleCount) * i + (Math.random() * 20 - 10);
    const dist = 120 + Math.random() * 100;
    const delay = Math.random() * 0.15;
    particlesHtml += `<span class="celebration-particle" style="--angle:${angle}deg;--dist:${dist}px;--delay:${delay}s;"></span>`;
  }
  overlay.innerHTML = `${particlesHtml}<div class="celebration-text">${t('plans.workoutComplete')}</div>`;
  document.body.appendChild(overlay);
  setTimeout(() => overlay.remove(), 1400);
}

// "Try Y" is a plain +5lbs nudge off the last logged weight, not an AI or
// physiologically-modeled suggestion — deliberately simple and honestly
// labeled, since the app doesn't (yet) know their rep targets or recovery.
function renderExerciseLogPanel(dayKey, idx, exerciseName, session) {
  const last = session.lastLogCache.get(idx);
  const draft = session.logDraft.get(idx) || {};
  let suggestion;
  if (last) {
    const repsPart = last.reps ? ` × ${last.reps}` : '';
    const suggestedWeight = last.reps ? last.weight + 5 : last.weight;
    suggestion = `<div class="exercise-log-suggestion">${t('plans.lastTimeLabel')}: ${last.weight} lbs${repsPart} — ${t('plans.tryLabel')} ${suggestedWeight}+</div>`;
  } else if (session.lastLogCache.has(idx)) {
    suggestion = `<div class="exercise-log-suggestion muted">${t('plans.noPriorLog')}</div>`;
  } else {
    suggestion = `<div class="exercise-log-suggestion muted">${t('common.loading')}</div>`;
  }
  const nameJsAttr = exerciseName.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '&quot;');
  return `
    <div class="exercise-log-panel">
      ${suggestion}
      <div class="exercise-log-inputs">
        <input type="number" inputmode="decimal" class="calc-input" id="exlog-weight-${dayKey}-${idx}" placeholder="${t('plans.weightPlaceholder')}" value="${draft.weight ?? ''}" oninput="updateExerciseLogDraft('${dayKey}',${idx},'weight',this.value)">
        <input type="number" inputmode="numeric" class="calc-input" id="exlog-reps-${dayKey}-${idx}" placeholder="${t('plans.repsPlaceholder')}" value="${draft.reps ?? ''}" oninput="updateExerciseLogDraft('${dayKey}',${idx},'reps',this.value)">
        <button type="button" class="btn-follow btn-xs" onclick="saveExerciseLog('${dayKey}',${idx},'${nameJsAttr}')">${t('plans.saveLog')}</button>
      </div>
    </div>
  `;
}

// One-time explainer for the session toolbar's icon-only buttons — usability
// testing found this exact spot tripping up a beginner, an experienced lifter
// coming from a different app, and an older user, each for a different
// reason: nobody could tell what 🔇/🔊, 🏋️, and ⚖️ actually did without
// tapping them first. Same dismiss-once pattern (and localStorage key style)
// as the Plans page's first-visit hint — client-side only, low-stakes.
const SESSION_ICONS_HINT_SEEN_KEY = 'ax-session-icons-hint-seen';

function sessionIconsHintSeen() {
  try { return !!localStorage.getItem(SESSION_ICONS_HINT_SEEN_KEY); } catch { return true; }
}

export function dismissSessionIconsHint() {
  try { localStorage.setItem(SESSION_ICONS_HINT_SEEN_KEY, '1'); } catch { /* best-effort */ }
  rerenderModal();
}

function renderDaySessionControls(dayKey, workoutId, totalExercises) {
  const session = sessions.get(dayKey);
  if (session) {
    const msg = session.message
      ? `<div class="day-session-msg${session.messageError ? ' error' : ''}">${escapeHtml(session.message)}</div>`
      : '';
    const iconsHint = sessionIconsHintSeen() ? '' : `
      <div class="calc-box" style="display:flex;align-items:center;gap:10px;justify-content:space-between;margin-bottom:10px;font-size:12px;color:var(--muted);line-height:1.5;">
        <span>${escapeHtml(t('plans.sessionIconsHint'))}</span>
        <button type="button" class="btn-follow btn-xs" style="flex-shrink:0;" onclick="dismissSessionIconsHint()">${escapeHtml(t('plans.newHereHintDismiss'))}</button>
      </div>
    `;
    const restBanner = session.restRemaining != null
      ? `<div class="rest-timer-banner">
          <span class="rest-timer-label">${t('plans.restLabel')}</span>
          <span class="rest-timer-count" id="rest-${dayKey}">${formatTime(session.restRemaining)}</span>
          <button type="button" class="btn-follow btn-xs" onclick="skipRest('${dayKey}')">${t('plans.skipRest')}</button>
        </div>`
      : '';
    const plateCalc = session.plateCalcOpen
      ? `<div class="plate-calc">
          <input type="number" inputmode="decimal" class="calc-input" id="plate-target-${dayKey}" placeholder="${t('plans.targetWeight')}" oninput="calcPlates('${dayKey}')">
          <span class="plate-calc-sep">/</span>
          <input type="number" inputmode="decimal" class="calc-input" id="plate-bar-${dayKey}" placeholder="${t('plans.barWeight')}" value="45" oninput="calcPlates('${dayKey}')">
          <div class="plate-calc-result" id="plate-result-${dayKey}"></div>
        </div>`
      : '';
    return `
      ${iconsHint}
      <div class="day-session-bar">
        <div class="day-timer" id="timer-${dayKey}">${formatTime(session.seconds)}</div>
        <button type="button" class="btn-follow btn-xs" onclick="toggleWorkoutTimer('${dayKey}')">${session.running ? '⏸ ' + t('plans.pauseTimer') : '▶ ' + t('plans.resumeTimer')}</button>
        <button type="button" class="btn-follow btn-xs${session.voiceEnabled ? ' active' : ''}" onclick="toggleVoiceGuidance('${dayKey}')" title="${t('plans.voiceToggle')}" aria-label="${t('plans.voiceToggle')}">${session.voiceEnabled ? '🔊' : '🔇'}</button>
        <button type="button" class="btn-follow btn-xs${session.plateCalcOpen ? ' active' : ''}" onclick="togglePlateCalc('${dayKey}')" title="${t('plans.plateCalcToggle')}" aria-label="${t('plans.plateCalcToggle')}">🏋️</button>
        <div class="day-progress">${session.checked.size}/${totalExercises}</div>
        <button type="button" class="btn-accent btn-xs" onclick="finishWorkout('${workoutId}','${dayKey}')">${t('plans.finishWorkout')}</button>
      </div>
      ${plateCalc}
      ${restBanner}
      ${msg}
    `;
  }
  if (completedTodayKeys.has(`${workoutId}::${dayKey}`)) {
    return `<div class="day-completed-badge">✅ ${t('plans.completedToday')}</div>`;
  }
  return `<button type="button" class="btn-follow btn-xs" onclick="startWorkoutSession('${workoutId}','${dayKey}')">▶ ${t('plans.startWorkout')}</button>`;
}

async function renderModalBody(plan, tr) {
  const { isRealExercise } = await loadExerciseInfo();
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
      // to the generic keyword-fallback caption. Same reasoning applies to
      // exercise_logs rows below — logged/matched by the raw English name,
      // never the translated display text, so "last time" lookups keep
      // working regardless of the active language.
      const rowAttrs = clickable
        ? ` class="exercise-row clickable" data-exercise="${ex.name.replace(/"/g, '&quot;')}"`
        : ' class="exercise-row"';
      const checked = session?.checked.has(i) ?? false;
      const checkbox = session
        ? `<button type="button" class="ex-check${checked ? ' checked' : ''}" onclick="event.stopPropagation();toggleExerciseChecked('${dayKey}',${i})" aria-label="${checked ? 'Completed' : 'Mark exercise complete'}">${checked ? '✓' : ''}</button>`
        : '';
      // Escaped for use inside a single-quoted JS string literal AND a
      // double-quoted HTML attribute at once — exercise names can contain
      // both (e.g. "Farmer's Walk").
      const nameJsAttr = ex.name.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '&quot;');
      const logToggle = session
        ? `<button type="button" class="ex-log-toggle" onclick="event.stopPropagation();toggleExerciseLog('${dayKey}',${i},'${nameJsAttr}')" aria-label="${t('plans.logWeightToggle')}">⚖️</button>`
        : '';
      html += `<div${rowAttrs}>${checkbox}<div class="ex-num">${i + 1}</div><div class="ex-name">${escapeHtml(pick(ex.name))}</div><div class="ex-sets">${escapeHtml(ex.sets)}</div>${ex.rest ? `<div class="ex-rest">${escapeHtml(ex.rest)}</div>` : ''}${logToggle}</div>`;
      if (session?.logOpen.has(i)) {
        html += renderExerciseLogPanel(dayKey, i, ex.name, session);
      }
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

export async function openWorkout(id) {
  const { WORKOUTS, SPORTS_WORKOUTS, PROGRAM_WORKOUTS } = await loadWorkoutData();
  const allSportAndProgramWorkouts = [...SPORTS_WORKOUTS, ...PROGRAM_WORKOUTS];
  const plan = WORKOUTS.find(w => w.id === id) || allSportAndProgramWorkouts.find(w => w.id === id);
  if (!plan) return;
  if (isPreviewLocked() && plan.level !== 'beginner') {
    redirectToSignup();
    return;
  }
  currentPlan = plan;
  currentTrMap = null;

  const myGen = ++modalGen;
  await renderModalBody(plan, null);
  if (myGen !== modalGen) return; // closed/switched workouts while data was loading
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
