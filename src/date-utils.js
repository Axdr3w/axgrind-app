// Local-date (not UTC) formatting — Date#toISOString() uses UTC, which shows
// the wrong "today" for anyone west of UTC in the evening.
export function toDateStr(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function todayStr() {
  return toDateStr(new Date());
}
