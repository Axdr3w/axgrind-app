import { toDateStr } from './date-utils.js';

export function levelFromXp(xp) {
  return Math.floor((xp ?? 0) / 100) + 1;
}

export function xpIntoLevel(xp) {
  return (xp ?? 0) % 100;
}

// quests: array of { quest_date: 'YYYY-MM-DD', completed_at: string|null }
// Streak = consecutive days, walking back from today, with >=1 completed quest.
// If today has nothing completed yet, that doesn't break the streak on its own —
// the day isn't over yet — so we start counting from yesterday in that case.
export function computeStreak(quests) {
  const completedDates = new Set(
    quests.filter(q => q.completed_at).map(q => q.quest_date)
  );
  const cursor = new Date();
  if (!completedDates.has(toDateStr(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
  }
  let streak = 0;
  for (;;) {
    const dateStr = toDateStr(cursor);
    if (completedDates.has(dateStr)) {
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}
