-- Per-user timezone (IANA name, e.g. "America/Los_Angeles") and a chosen
-- local time for the daily "come train" reminder — both nullable, since
-- most users never open this setting. Absence of a value is meaningful:
-- the scheduled function treats a missing reminder_time as 18:00 (6pm)
-- local, and a missing timezone means that user is skipped for the
-- time-based reminder entirely (we can't compute "their local time"
-- without it) until the client captures one on next login.
-- Run this once in the Supabase dashboard (Project → SQL Editor → New query → Run).

alter table profiles add column if not exists timezone text;
alter table profiles add column if not exists reminder_time text; -- 'HH:MM', 24h, local to `timezone`
-- The scheduled function runs every 15 minutes; this is how it avoids
-- re-firing the same user's reminder on every run within their target
-- window, or re-checking them for the rest of the day once sent.
alter table profiles add column if not exists last_daily_reminder_sent_date text; -- 'YYYY-MM-DD', in the user's own local time
