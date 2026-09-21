import {
  fetchQuestsForDate,
  fetchRecentQuests,
  createQuest,
  toggleQuestComplete,
  deleteQuest,
  fetchProfileXp,
  fetchRecentStreakFreezes,
  useStreakFreeze,
} from './api/quests.js';
import { fetchWorkoutHistory, fetchWorkoutCompletionCount } from './api/xp.js';
import { findWorkoutById } from './workout-lookup.js';
import { levelFromXp, xpIntoLevel, computeStreak, findFreezableGap } from './gamification.js';
import { toDateStr, todayStr } from './date-utils.js';
import { isPushSupported, getExistingSubscription, enablePushReminders } from './push.js';
import { checkForNewAchievements } from './achievements.js';
import { t, getLanguage } from './i18n/index.js';

let currentUserId = null;
let selectedDate = todayStr();
let historyOpen = false;

function renderDayStrip() {
  const strip = document.getElementById('day-strip');
  const today = new Date();
  const days = [];
  for (let offset = -3; offset <= 3; offset++) {
    const d = new Date(today);
    d.setDate(d.getDate() + offset);
    days.push(d);
  }
  const weekdayFmt = new Intl.DateTimeFormat(getLanguage(), { weekday: 'short' });
  strip.innerHTML = days.map(d => {
    const dateStr = toDateStr(d);
    const active = dateStr === selectedDate ? ' active' : '';
    return `<button class="day-chip${active}" data-date="${dateStr}">
      <div class="day-chip-label">${dateStr === todayStr() ? t('quests.today') : weekdayFmt.format(d)}</div>
      <div class="day-chip-num">${d.getDate()}</div>
    </button>`;
  }).join('');
  strip.querySelectorAll('.day-chip').forEach(btn => {
    btn.addEventListener('click', () => selectDate(btn.dataset.date));
  });
}

async function selectDate(dateStr) {
  selectedDate = dateStr;
  renderDayStrip();
  await renderQuestList();
}

// Shaped like a real quest row (a circle + two lines) so the loading state
// reads as "your quests are coming" instead of a blank pause, and doesn't
// reflow the layout once real rows replace it.
function questListSkeleton(count = 3) {
  return Array.from({ length: count }, () => `
    <div class="skeleton-quest-row">
      <div class="skeleton-circle"></div>
      <div class="skeleton-lines">
        <div class="skeleton-line" style="width:65%;"></div>
        <div class="skeleton-line" style="width:30%;"></div>
      </div>
    </div>
  `).join('');
}

async function renderQuestList() {
  const container = document.getElementById('quest-list');
  container.innerHTML = questListSkeleton();
  let quests;
  try {
    quests = await fetchQuestsForDate(currentUserId, selectedDate);
  } catch (err) {
    container.innerHTML = `<div style="text-align:center;padding:20px;color:#ff6040;font-size:12px;">${t('quests.errorLoadQuests', { reason: err.message })}</div>`;
    return;
  }
  if (quests.length === 0) {
    container.innerHTML = `<div class="empty-fade" style="text-align:center;padding:30px;color:var(--muted);font-size:13px;">${t('quests.emptyDay')}</div>`;
    return;
  }
  container.innerHTML = quests.map(q => {
    const completed = Boolean(q.completed_at);
    return `
      <div class="quest-row${completed ? ' completed' : ''}">
        <button class="quest-check" data-id="${q.id}" data-completed="${completed}" data-xp="${q.xp_value}" aria-label="${completed ? 'Completed' : 'Mark quest complete'}">${completed ? '✓' : ''}</button>
        <div class="quest-info">
          <div class="quest-title">${q.title}</div>
          ${q.due_time ? `<div class="quest-time">${q.due_time.slice(0, 5)}</div>` : ''}
        </div>
        <div class="quest-xp">+${q.xp_value} XP</div>
        <button class="quest-delete" data-id="${q.id}" title="Delete">✕</button>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.quest-check').forEach(btn => {
    btn.addEventListener('click', async () => {
      const wasCompleted = btn.dataset.completed === 'true';
      const xpValue = Number(btn.dataset.xp) || 0;
      await toggleQuestComplete(btn.dataset.id, wasCompleted);
      await renderQuestList();
      await renderHeader();
      if (!wasCompleted) {
        showXpToast(xpValue);
        checkForNewAchievements();
      }
    });
  });
  container.querySelectorAll('.quest-delete').forEach(btn => {
    btn.addEventListener('click', async () => {
      await deleteQuest(btn.dataset.id);
      await renderQuestList();
      await renderHeader();
    });
  });
}

// Completing a quest silently moved the XP bar and nothing else — the one
// step of the whole loop (OPEN → QUESTS → TRAIN → LOG → XP → PROGRESS) that
// never actually celebrated itself the way an achievement unlock does.
// Reuses the same toast container/timing pattern as achievements.js, just
// without a share button since there's nothing to share about +10 XP.
function showXpToast(amount) {
  if (amount <= 0) return;
  const container = document.getElementById('achievement-toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'achievement-toast xp-toast';
  toast.innerHTML = `
    <div class="achievement-toast-icon">⚡</div>
    <div class="achievement-toast-title">+${amount} XP</div>
  `;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 1600);
}

async function renderHeader() {
  let xp, recent, freezes;
  try {
    [xp, recent, freezes] = await Promise.all([
      fetchProfileXp(currentUserId),
      fetchRecentQuests(currentUserId),
      fetchRecentStreakFreezes(currentUserId, 7),
    ]);
  } catch (err) {
    setAddQuestMessage(t('quests.errorLoadProfile', { reason: err.message }), true);
    return;
  }
  const level = levelFromXp(xp);
  const into = xpIntoLevel(xp);
  const frozenDates = new Set(freezes.map((f) => f.used_date));
  const streak = computeStreak(recent, frozenDates);

  document.getElementById('quest-level').textContent = level;
  document.getElementById('quest-streak').textContent = streak;
  document.getElementById('xp-into-level').textContent = into;
  document.getElementById('xp-bar-fill').style.width = into + '%';

  renderStreakFreezeOffer(recent, frozenDates, freezes.length > 0);
  maybeShowRestDayNudge(streak);
}

// An app that only ever pushes for a longer streak doesn't feel like it's
// on your side — after a real run (7+ days), gently suggest a rest day
// instead. Re-checks daily (keyed by today's date) rather than once ever,
// since the streak keeps growing and each new week deserves the nudge
// again — but only ever once per day, not on every quests-page visit.
const REST_DAY_THRESHOLD = 7;
function maybeShowRestDayNudge(streak) {
  const el = document.getElementById('rest-day-nudge');
  if (streak < REST_DAY_THRESHOLD) { el.style.display = 'none'; return; }
  const key = `ax-rest-nudge-dismissed-${todayStr()}`;
  try {
    if (localStorage.getItem(key)) { el.style.display = 'none'; return; }
  } catch { /* localStorage unavailable — just show it, no harm in that */ }
  el.style.display = 'flex';
  el.querySelector('button').onclick = () => {
    el.style.display = 'none';
    try { localStorage.setItem(key, '1'); } catch { /* best-effort only */ }
  };
}

// Offers a freeze only when there's a real gap worth saving and the user
// hasn't already used this week's one allowance (fetchRecentStreakFreezes
// is already scoped to the last 7 days, so any row at all means "used").
function renderStreakFreezeOffer(recent, frozenDates, usedThisWeek) {
  const offer = document.getElementById('streak-freeze-offer');
  const gapDate = usedThisWeek ? null : findFreezableGap(recent, frozenDates);
  if (!gapDate) {
    offer.style.display = 'none';
    return;
  }
  offer.style.display = 'flex';
  const btn = document.getElementById('streak-freeze-btn');
  btn.onclick = async () => {
    const originalText = btn.textContent;
    btn.disabled = true;
    btn.textContent = originalText + '…';
    try {
      await useStreakFreeze(currentUserId, gapDate);
      offer.style.display = 'none';
      await renderHeader();
    } catch (err) {
      btn.disabled = false;
      btn.textContent = originalText;
      console.error('[streak freeze]', err);
    }
  };
}

async function renderHistoryCount() {
  try {
    const count = await fetchWorkoutCompletionCount(currentUserId);
    document.getElementById('history-total-count').textContent = count;
  } catch {
    document.getElementById('history-total-count').textContent = '0';
  }
}

async function renderWorkoutHistoryList() {
  const container = document.getElementById('workout-history-list');
  container.innerHTML = `<div style="text-align:center;padding:20px;color:var(--muted);font-size:12px;">${t('common.loading')}</div>`;
  let rows;
  try {
    rows = await fetchWorkoutHistory(currentUserId);
  } catch (err) {
    container.innerHTML = `<div style="text-align:center;padding:20px;color:#ff6040;font-size:12px;">${t('quests.historyErrorLoad', { reason: err.message })}</div>`;
    return;
  }
  if (rows.length === 0) {
    container.innerHTML = `<div style="text-align:center;padding:20px;color:var(--muted);font-size:13px;">${t('quests.historyEmpty')}</div>`;
    return;
  }
  const dateFmt = new Intl.DateTimeFormat(getLanguage(), { month: 'short', day: 'numeric', year: 'numeric' });
  // findWorkoutById is async (it lazy-loads the workout data chunks), so
  // resolve every row's workout up front instead of inside the .map below.
  const workoutsById = new Map();
  await Promise.all(rows.map(async (r) => {
    if (!workoutsById.has(r.workout_id)) {
      workoutsById.set(r.workout_id, await findWorkoutById(r.workout_id));
    }
  }));
  container.innerHTML = rows.map((r) => {
    const workout = workoutsById.get(r.workout_id);
    const title = workout ? `${workout.icon ?? ''} ${workout.title}` : r.workout_id;
    const date = dateFmt.format(new Date(r.completed_date + 'T00:00:00'));
    return `
      <div class="quest-row">
        <div class="quest-info">
          <div class="quest-title">${title}</div>
          <div class="quest-time">${date}</div>
        </div>
      </div>
    `;
  }).join('');
}

function setAddQuestMessage(text, isError) {
  const el = document.getElementById('quest-add-message');
  el.textContent = text;
  el.style.color = isError ? '#ff6040' : '#4ade80';
}

async function handleAddQuest() {
  const titleInput = document.getElementById('quest-title');
  const timeInput = document.getElementById('quest-time');
  const reminderSelect = document.getElementById('quest-reminder');
  const addBtn = document.getElementById('add-quest-btn');

  const title = titleInput.value.trim();
  if (!title) {
    setAddQuestMessage(t('quests.enterTitleFirst'), true);
    return;
  }

  const originalAddBtnText = addBtn.textContent;
  addBtn.disabled = true;
  addBtn.textContent = originalAddBtnText + '…';
  setAddQuestMessage('', false);
  try {
    await createQuest(currentUserId, {
      title,
      questDate: selectedDate,
      dueTime: timeInput.value || null,
      reminderMinutesBefore: reminderSelect.value === '' ? null : Number(reminderSelect.value),
    });

    titleInput.value = '';
    timeInput.value = '';
    reminderSelect.value = '';

    await renderQuestList();
    await renderHeader();
  } catch (err) {
    setAddQuestMessage(t('quests.errorAddQuest', { reason: err.message }), true);
  } finally {
    addBtn.disabled = false;
    addBtn.textContent = originalAddBtnText;
  }
}

async function refreshPushBanner() {
  const banner = document.getElementById('push-enable-banner');
  if (!isPushSupported()) {
    banner.style.display = 'none';
    return;
  }
  const existing = await getExistingSubscription();
  banner.style.display = existing ? 'none' : 'flex';
}

async function handleEnableReminders() {
  const btn = document.getElementById('enable-reminders-btn');
  // Snapshotting innerHTML (not textContent) here — this button has a nested
  // <span data-i18n> for its label, and swapping textContent would replace
  // that span with a plain text node, permanently breaking re-translation
  // of this button on a later language change.
  const originalHtml = btn.innerHTML;
  btn.disabled = true;
  btn.textContent = btn.textContent + '…';
  try {
    await enablePushReminders(currentUserId);
    await refreshPushBanner();
  } catch (err) {
    setAddQuestMessage(t('quests.errorEnableReminders', { reason: err.message }), true);
  } finally {
    btn.disabled = false;
    btn.innerHTML = originalHtml;
  }
}

export async function toggleWorkoutHistory() {
  historyOpen = !historyOpen;
  const list = document.getElementById('workout-history-list');
  const arrow = document.getElementById('history-toggle-arrow');
  list.style.display = historyOpen ? 'block' : 'none';
  arrow.textContent = historyOpen ? '▴' : '▾';
  if (historyOpen) await renderWorkoutHistoryList();
}

// Attached once at module load — initQuests() runs on every login, so wiring
// this inside it would stack a duplicate listener on each login/logout cycle.
document.getElementById('add-quest-btn').addEventListener('click', handleAddQuest);
document.getElementById('enable-reminders-btn').addEventListener('click', handleEnableReminders);

export async function initQuests(userId) {
  currentUserId = userId;
  selectedDate = todayStr();
  historyOpen = false;
  document.getElementById('workout-history-list').style.display = 'none';
  document.getElementById('history-toggle-arrow').textContent = '▾';
  renderDayStrip();
  await Promise.all([renderQuestList(), renderHeader(), refreshPushBanner(), renderHistoryCount()]);
}

export function teardownQuests() {
  currentUserId = null;
  document.getElementById('quest-list').innerHTML = '';
  document.getElementById('workout-history-list').innerHTML = '';
}
