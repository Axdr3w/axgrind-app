-- Idempotency markers for the scheduled push-notification functions —
-- separate from read_at (which tracks whether the recipient actually
-- opened it in-app) since a message can be "notified" long before it's
-- "read." Without this, every 5-minute run would re-notify every
-- still-unread message forever.
-- Run this once in the Supabase dashboard (Project → SQL Editor → New query → Run).

alter table dm_messages add column if not exists notified_at timestamptz;
alter table forum_comments add column if not exists notified_at timestamptz;

-- Last leaderboard position we actually told this user about — compared
-- against their current position each run so "moved up" only fires on a
-- real improvement, not every run just because they're still ranked.
alter table profiles add column if not exists last_known_leaderboard_rank integer;
