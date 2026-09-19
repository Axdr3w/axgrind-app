import { t } from './i18n/index.js';
import { fetchProfileXp, fetchRecentQuests, fetchRecentStreakFreezes } from './api/quests.js';
import { levelFromXp, computeLongestStreak } from './gamification.js';

// Far larger than any real account history could be — used to pull the
// FULL quest/freeze history instead of the 60-day window most other screens
// use, since "longest streak ever" and lifetime totals need everything, not
// just recent activity. fetchRecentQuests/fetchRecentStreakFreezes already
// take a `days` param, so this reuses them rather than adding a new query.
const FULL_HISTORY_DAYS = 3650;

function el(id) { return document.getElementById(id); }

export async function renderWrapped(userId) {
  const wrap = el('wrapped-stats');
  if (!wrap || !userId) return;
  wrap.innerHTML = `<div style="text-align:center;color:var(--muted);font-size:12px;padding:24px 0;">${t('common.loading')}</div>`;

  let xp, quests, freezeRows;
  try {
    // totalWorkouts was dropped from here — it's the exact same number
    // already shown on Quests → Workout History ("workouts completed
    // all-time"), just with a different label. No need to fetch or show it
    // twice.
    [xp, quests, freezeRows] = await Promise.all([
      fetchProfileXp(userId),
      fetchRecentQuests(userId, FULL_HISTORY_DAYS),
      fetchRecentStreakFreezes(userId, FULL_HISTORY_DAYS),
    ]);
  } catch {
    wrap.innerHTML = `<div style="text-align:center;color:var(--muted);font-size:12px;padding:24px 0;">${t('wrapped.loadError')}</div>`;
    return;
  }

  const frozenDates = new Set(freezeRows.map((r) => r.used_date));
  const totalDaysTrained = new Set(quests.filter((q) => q.completed_at).map((q) => q.quest_date)).size;
  const longestStreak = computeLongestStreak(quests, frozenDates);
  const level = levelFromXp(xp);

  // A brand-new account has nothing to recap yet — the celebratory copy
  // below ("that's real work, not just intentions") reads as sarcastic at
  // zero, so this isn't just a missing empty state, it's actively bad copy
  // for exactly the user who most needs encouragement. Show a distinct,
  // honest starting-point message instead of a row of zeros.
  if (totalDaysTrained === 0) {
    wrap.innerHTML = `<div class="empty-fade" style="text-align:center;color:var(--muted);font-size:12.5px;line-height:1.6;padding:24px 16px;">${t('wrapped.emptyState')}</div>`;
    return;
  }

  const stats = [
    { num: totalDaysTrained, label: t('wrapped.statDaysTrained'), context: t('wrapped.statDaysTrainedContext', { count: totalDaysTrained }) },
    { num: longestStreak, label: t('wrapped.statLongestStreak'), context: t('wrapped.statLongestStreakContext', { count: longestStreak }) },
    { num: level, label: t('wrapped.statLevel'), context: t('wrapped.statLevelContext', { level }) },
    { num: xp, label: t('wrapped.statTotalXp'), context: t('wrapped.statTotalXpContext', { xp }) },
  ];

  wrap.innerHTML = stats.map((s) => `
    <div class="progress-stat" style="text-align:left;padding:14px 16px;margin-bottom:8px;">
      <div class="progress-stat-num" style="font-size:var(--text-2xl);">${s.num}</div>
      <div class="progress-stat-label" style="text-transform:none;letter-spacing:0;font-size:12px;margin-top:2px;">${s.label}</div>
      <div style="font-size:11px;color:var(--muted);line-height:1.5;margin-top:6px;">${s.context}</div>
    </div>
  `).join('');
}
