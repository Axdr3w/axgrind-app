// Timezone math for the scheduled notification functions, using Intl so
// there's no date library to pull in.
//
// hourCycle 'h23' rather than hour12:false matters: the latter renders
// midnight as hour "24" in some environments, which silently breaks any
// arithmetic that parses the hour back out.
function zonedParts(instant, timeZone) {
  try {
    const fmt = new Intl.DateTimeFormat('en-CA', {
      timeZone, year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23',
    });
    return Object.fromEntries(fmt.formatToParts(instant).map((p) => [p.type, p.value]));
  } catch {
    return null; // invalid/unknown timezone string stored — caller skips that user
  }
}

// 'YYYY-MM-DD' and 'HH:MM' for `instant` as seen in `timeZone`. The date
// format matches quest_date's plain local-calendar-string convention (see
// src/date-utils.js) so comparisons against client-written rows line up.
function localParts(instant, timeZone) {
  const parts = zonedParts(instant, timeZone);
  if (!parts) return null;
  return {
    date: `${parts.year}-${parts.month}-${parts.day}`,
    time: `${parts.hour}:${parts.minute}`,
  };
}

// The real UTC instant for a wall-clock date+time in `timeZone` — i.e. what
// "5pm on 2026-10-03 in America/Los_Angeles" actually is in absolute time.
//
// Derived by measuring how far the naive UTC reading of that wall clock
// drifts when re-read in the target zone, then correcting by that amount.
// This resolves DST correctly for every normal instant; the only imprecise
// cases are wall-clock times that a DST jump makes nonexistent or
// ambiguous, where it lands on one of the two plausible readings.
function zonedTimeToUtc(dateStr, timeStr, timeZone) {
  const naive = new Date(`${dateStr}T${timeStr}Z`);
  if (Number.isNaN(naive.getTime())) return null;
  const parts = zonedParts(naive, timeZone);
  if (!parts) return null;
  const asIfUtc = Date.UTC(
    Number(parts.year), Number(parts.month) - 1, Number(parts.day),
    Number(parts.hour), Number(parts.minute), Number(parts.second)
  );
  return new Date(naive.getTime() - (asIfUtc - naive.getTime()));
}

module.exports = { localParts, zonedTimeToUtc };
