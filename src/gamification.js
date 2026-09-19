import { toDateStr } from './date-utils.js';

export function levelFromXp(xp) {
  return Math.floor((xp ?? 0) / 100) + 1;
}

export function xpIntoLevel(xp) {
  return (xp ?? 0) % 100;
}

// quests: array of { quest_date: 'YYYY-MM-DD', completed_at: string|null }
// frozenDates: Set of 'YYYY-MM-DD' strings the user spent a streak freeze on
// (see streak_freezes.sql / useStreakFreeze) — counts exactly like a
// completed day for continuity, without granting any XP for that day.
// Streak = consecutive days, walking back from today, with >=1 completed
// quest or a freeze. If today has nothing completed yet, that doesn't break
// the streak on its own — the day isn't over yet — so we start counting
// from yesterday in that case.
export function computeStreak(quests, frozenDates = new Set()) {
  const completedDates = new Set(
    quests.filter(q => q.completed_at).map(q => q.quest_date)
  );
  const cursor = new Date();
  if (!completedDates.has(toDateStr(cursor)) && !frozenDates.has(toDateStr(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
  }
  let streak = 0;
  for (;;) {
    const dateStr = toDateStr(cursor);
    if (completedDates.has(dateStr) || frozenDates.has(dateStr)) {
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

// Longest streak ever achieved, over the full quest history — unlike
// computeStreak (which walks back from today for the CURRENT streak), this
// walks forward through every completed/frozen date in chronological order
// and tracks the longest run of consecutive days found anywhere in it. Used
// by the Wrapped stats page, which cares about the best stretch ever, not
// just whatever's active right now.
export function computeLongestStreak(quests, frozenDates = new Set()) {
  const completedDates = new Set(quests.filter(q => q.completed_at).map(q => q.quest_date));
  const allDates = Array.from(new Set([...completedDates, ...frozenDates])).sort();
  let longest = 0;
  let current = 0;
  let prevDate = null;
  for (const dateStr of allDates) {
    const diffDays = prevDate
      ? Math.round((new Date(`${dateStr}T00:00:00`) - new Date(`${prevDate}T00:00:00`)) / 86400000)
      : null;
    current = diffDays === 1 ? current + 1 : 1;
    longest = Math.max(longest, current);
    prevDate = dateStr;
  }
  return longest;
}

// Finds the single most recent missed day that, if frozen, would reconnect
// today's activity to a real streak that existed before the gap — the
// signal used to offer "use a streak freeze?" rather than showing it
// unconditionally. Returns null if there's nothing worth saving (no gap in
// the last 2 days, or no real streak sitting on the other side of it).
export function findFreezableGap(quests, frozenDates = new Set()) {
  const completedDates = new Set(quests.filter(q => q.completed_at).map(q => q.quest_date));
  const isCovered = (d) => completedDates.has(d) || frozenDates.has(d);
  const cursor = new Date();
  cursor.setDate(cursor.getDate() - 1); // gaps are only ever in the past — start at yesterday
  for (let i = 0; i < 2; i++) {
    const dateStr = toDateStr(cursor);
    if (isCovered(dateStr)) {
      cursor.setDate(cursor.getDate() - 1);
      continue;
    }
    const dayBefore = new Date(cursor);
    dayBefore.setDate(dayBefore.getDate() - 1);
    return isCovered(toDateStr(dayBefore)) ? dateStr : null;
  }
  return null;
}
