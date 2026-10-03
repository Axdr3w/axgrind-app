-- Per-notification-type opt-outs, surfaced in the app's Account page.
-- All default to true so existing users keep getting exactly what they got
-- before this existed; a row only diverges once someone actively turns
-- something off. Enforced centrally in netlify/functions/lib/send-push.cjs
-- rather than at each call site, so a new notification type can't
-- accidentally ship without honouring them.
-- Run this once in the Supabase dashboard (Project → SQL Editor → New query → Run).

alter table profiles add column if not exists notify_quest_reminders boolean not null default true;
alter table profiles add column if not exists notify_daily_reminder boolean not null default true;
alter table profiles add column if not exists notify_streak boolean not null default true;
alter table profiles add column if not exists notify_dms boolean not null default true;
alter table profiles add column if not exists notify_forum_replies boolean not null default true;
alter table profiles add column if not exists notify_rank_changes boolean not null default true;
