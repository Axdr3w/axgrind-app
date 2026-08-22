import { t } from './i18n/index.js';
import { fetchRecentQuests, fetchProfileXp } from './api/quests.js';
import { fetchWorkoutCompletionCount, fetchWeightLogs } from './api/xp.js';
import { fetchProgressPhotos } from './api/progressPhotos.js';
import { fetchMeasurements } from './api/measurements.js';
import { levelFromXp, computeStreak } from './gamification.js';

// Every condition here reads from data the app already tracks — no new
// table, no new tracking just to power a badge. icon/title/desc are plain
// strings (not i18n keys) for now, same simplification other lightly-used
// copy in the app already makes; can be moved into locale files later if
// this becomes a bigger feature.
const ACHIEVEMENTS = [
  { id: 'quest-1', icon: '✅', title: 'Getting Started', desc: 'Complete your first quest', check: (s) => s.questsCompleted >= 1 },
  { id: 'quest-25', icon: '✅', title: 'Consistent', desc: 'Complete 25 quests', check: (s) => s.questsCompleted >= 25 },
  { id: 'streak-7', icon: '🔥', title: 'On Fire', desc: '7-day quest streak', check: (s) => s.streak >= 7 },
  { id: 'streak-30', icon: '🔥', title: 'Unstoppable', desc: '30-day quest streak', check: (s) => s.streak >= 30 },
  { id: 'workout-1', icon: '💪', title: 'First Rep', desc: 'Complete your first workout', check: (s) => s.workoutsCompleted >= 1 },
  { id: 'workout-25', icon: '💪', title: 'Iron Will', desc: 'Complete 25 workouts', check: (s) => s.workoutsCompleted >= 25 },
  { id: 'workout-100', icon: '💪', title: 'Grinder', desc: 'Complete 100 workouts', check: (s) => s.workoutsCompleted >= 100 },
  { id: 'weight-7', icon: '⚖️', title: 'Data Driven', desc: 'Log your weight 7 times', check: (s) => s.weightLogsCount >= 7 },
  { id: 'weight-30', icon: '⚖️', title: 'Tracked', desc: 'Log your weight 30 times', check: (s) => s.weightLogsCount >= 30 },
  { id: 'photo-1', icon: '📸', title: 'Say Cheese', desc: 'Add your first progress photo', check: (s) => s.photosCount >= 1 },
  { id: 'photo-10', icon: '📸', title: 'Time Lapse', desc: 'Add 10 progress photos', check: (s) => s.photosCount >= 10 },
  { id: 'measure-5', icon: '📏', title: 'Measured Up', desc: 'Log body measurements 5 times', check: (s) => s.measurementsCount >= 5 },
  { id: 'level-5', icon: '⭐', title: 'Level 5', desc: 'Reach level 5', check: (s) => s.level >= 5 },
  { id: 'level-10', icon: '⭐', title: 'Level 10', desc: 'Reach level 10', check: (s) => s.level >= 10 },
];

let currentUserId = null;
let open = false;
// Baseline snapshot of what's unlocked, set on login without celebrating —
// only unlocks that happen *after* that baseline (a real action this
// session) should pop a toast, not everything the user already had.
let lastUnlockedIds = null;

function el(id) { return document.getElementById(id); }

export async function initAchievements(userId) {
  currentUserId = userId;
  await refresh({ celebrate: false });
}

export function teardownAchievements() {
  currentUserId = null;
  open = false;
  lastUnlockedIds = null;
}

async function computeStats() {
  const [quests, workoutsCompleted, weightLogs, photos, measurements, xp] = await Promise.all([
    fetchRecentQuests(currentUserId, 3650),
    fetchWorkoutCompletionCount(currentUserId),
    fetchWeightLogs(currentUserId, 500),
    fetchProgressPhotos(currentUserId),
    fetchMeasurements(currentUserId),
    fetchProfileXp(currentUserId),
  ]);
  const questsCompleted = quests.filter((q) => q.completed_at).length;
  return {
    questsCompleted,
    streak: computeStreak(quests),
    workoutsCompleted,
    weightLogsCount: weightLogs.length,
    photosCount: photos.length,
    measurementsCount: measurements.length,
    level: levelFromXp(xp),
  };
}

// Single entry point for both the passive "keep the panel in sync" case
// (login, opening the panel) and the active "something might have just
// unlocked" case (called right after a quest/workout/weigh-in/photo/
// measurement action) — celebrate only distinguishes whether newly-crossed
// badges should pop a toast.
async function refresh({ celebrate }) {
  if (!currentUserId) return;
  let stats;
  try {
    stats = await computeStats();
  } catch {
    return;
  }
  const unlocked = ACHIEVEMENTS.filter((a) => a.check(stats));
  const unlockedIds = new Set(unlocked.map((a) => a.id));

  const countEl = el('achievements-unlocked-count');
  if (countEl) {
    countEl.textContent = unlocked.length;
    el('achievements-total-count').textContent = ACHIEVEMENTS.length;
    renderGrid(unlockedIds);
  }

  if (celebrate && lastUnlockedIds) {
    const newlyUnlocked = ACHIEVEMENTS.filter((a) => unlockedIds.has(a.id) && !lastUnlockedIds.has(a.id));
    newlyUnlocked.forEach((a, i) => setTimeout(() => showToast(a), i * 3200));
  }
  lastUnlockedIds = unlockedIds;
}

// Called after actions that could plausibly unlock something (quest
// completed, workout finished, weight logged, photo added, measurements
// logged). Fire-and-forget from the caller's side — a failed check here
// should never interrupt the action that triggered it.
export function checkForNewAchievements() {
  return refresh({ celebrate: true }).catch(() => {});
}

function renderGrid(unlockedIds) {
  const grid = el('achievements-grid');
  if (!grid) return;
  grid.innerHTML = ACHIEVEMENTS.map((a) => {
    const isUnlocked = unlockedIds.has(a.id);
    return `
      <div class="achievement-card ${isUnlocked ? 'unlocked' : 'locked'}">
        <div class="achievement-icon">${a.icon}</div>
        <div class="achievement-title">${a.title}</div>
        <div class="achievement-desc">${a.desc}</div>
      </div>
    `;
  }).join('');
}

function showToast(achievement) {
  const container = el('achievement-toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'achievement-toast';
  toast.innerHTML = `
    <div class="achievement-toast-icon">${achievement.icon}</div>
    <div>
      <div class="achievement-toast-label">${t('achievements.unlockedLabel')}</div>
      <div class="achievement-toast-title">${achievement.title}</div>
    </div>
  `;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

export function toggleAchievements() {
  open = !open;
  const grid = el('achievements-grid');
  const arrow = el('achievements-toggle-arrow');
  grid.style.display = open ? 'grid' : 'none';
  arrow.textContent = open ? '▴' : '▾';
  // Refreshed on open (not just on login) so a badge earned earlier this
  // session shows unlocked right away — but never celebrates here, only
  // checkForNewAchievements() (called right after the earning action) does.
  if (open) refresh({ celebrate: false });
}
