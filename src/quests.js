import {
  fetchQuestsForDate,
  fetchRecentQuests,
  createQuest,
  toggleQuestComplete,
  deleteQuest,
  fetchProfileXp,
} from './api/quests.js';
import { fetchWorkoutHistory, fetchWorkoutCompletionCount } from './api/xp.js';
import { findWorkoutById } from './workout-lookup.js';
import { levelFromXp, xpIntoLevel, computeStreak } from './gamification.js';
import { toDateStr, todayStr } from './date-utils.js';
import { isPushSupported, getExistingSubscription, enablePushReminders } from './push.js';
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

async function renderQuestList() {
  const container = document.getElementById('quest-list');
  container.innerHTML = `<div style="text-align:center;padding:20px;color:var(--muted);font-size:12px;">${t('common.loading')}</div>`;
  let quests;
  try {
    quests = await fetchQuestsForDate(currentUserId, selectedDate);
  } catch (err) {
    container.innerHTML = `<div style="text-align:center;padding:20px;color:#ff6040;font-size:12px;">${t('quests.errorLoadQuests', { reason: err.message })}</div>`;
    return;
  }
  if (quests.length === 0) {
    container.innerHTML = `<div style="text-align:center;padding:30px;color:var(--muted);font-size:13px;">${t('quests.emptyDay')}</div>`;
    return;
  }
  container.innerHTML = quests.map(q => {
    const completed = Boolean(q.completed_at);
    return `
      <div class="quest-row${completed ? ' completed' : ''}">
        <button class="quest-check" data-id="${q.id}" data-completed="${completed}">${completed ? '✓' : ''}</button>
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
      await toggleQuestComplete(btn.dataset.id, btn.dataset.completed === 'true');
      await renderQuestList();
      await renderHeader();
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

async function renderHeader() {
  let xp, recent;
  try {
    [xp, recent] = await Promise.all([
      fetchProfileXp(currentUserId),
      fetchRecentQuests(currentUserId),
    ]);
  } catch (err) {
    setAddQuestMessage(t('quests.errorLoadProfile', { reason: err.message }), true);
    return;
  }
  const level = levelFromXp(xp);
  const into = xpIntoLevel(xp);
  const streak = computeStreak(recent);

  document.getElementById('quest-level').textContent = level;
  document.getElementById('quest-streak').textContent = streak;
  document.getElementById('xp-into-level').textContent = into;
  document.getElementById('xp-bar-fill').style.width = into + '%';
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
  container.innerHTML = rows.map((r) => {
    const workout = findWorkoutById(r.workout_id);
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

  addBtn.disabled = true;
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
  btn.disabled = true;
  try {
    await enablePushReminders(currentUserId);
    await refreshPushBanner();
  } catch (err) {
    setAddQuestMessage(t('quests.errorEnableReminders', { reason: err.message }), true);
  } finally {
    btn.disabled = false;
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
