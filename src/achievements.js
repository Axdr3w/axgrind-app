import { t } from './i18n/index.js';
import { fetchRecentQuests, fetchProfileXp } from './api/quests.js';
import { fetchWorkoutCompletionCount, fetchWeightLogs } from './api/xp.js';
import { fetchProgressPhotos } from './api/progressPhotos.js';
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
  { id: 'level-5', icon: '⭐', title: 'Level 5', desc: 'Reach level 5', check: (s) => s.level >= 5 },
  { id: 'level-10', icon: '⭐', title: 'Level 10', desc: 'Reach level 10', check: (s) => s.level >= 10 },
];

let currentUserId = null;
let open = false;

function el(id) { return document.getElementById(id); }

export async function initAchievements(userId) {
  currentUserId = userId;
  await renderCounts();
}

export function teardownAchievements() {
  currentUserId = null;
  open = false;
}

async function computeStats() {
  const [quests, workoutsCompleted, weightLogs, photos, xp] = await Promise.all([
    fetchRecentQuests(currentUserId, 3650),
    fetchWorkoutCompletionCount(currentUserId),
    fetchWeightLogs(currentUserId, 500),
    fetchProgressPhotos(currentUserId),
    fetchProfileXp(currentUserId),
  ]);
  const questsCompleted = quests.filter((q) => q.completed_at).length;
  return {
    questsCompleted,
    streak: computeStreak(quests),
    workoutsCompleted,
    weightLogsCount: weightLogs.length,
    photosCount: photos.length,
    level: levelFromXp(xp),
  };
}

async function renderCounts() {
  if (!currentUserId) return;
  let stats;
  try {
    stats = await computeStats();
  } catch {
    return;
  }
  const unlocked = ACHIEVEMENTS.filter((a) => a.check(stats));
  el('achievements-unlocked-count').textContent = unlocked.length;
  el('achievements-total-count').textContent = ACHIEVEMENTS.length;
  renderGrid(new Set(unlocked.map((a) => a.id)));
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

export function toggleAchievements() {
  open = !open;
  const grid = el('achievements-grid');
  const arrow = el('achievements-toggle-arrow');
  grid.style.display = open ? 'grid' : 'none';
  arrow.textContent = open ? '▴' : '▾';
  // Refreshed on open (not just on login) so a badge earned earlier this
  // session — a workout finished, a quest completed — shows as unlocked
  // right away instead of waiting for the next page load.
  if (open) renderCounts();
}
