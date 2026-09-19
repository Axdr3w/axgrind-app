-- Tracks whether a user has seen the onboarding tour, on the account itself
-- rather than in the browser's localStorage — so a returning user switching
-- devices or clearing their browser isn't shown a first-timer's tour again.
-- Run this once in the Supabase dashboard (Project → SQL Editor → New query → Run).

alter table profiles add column if not exists has_seen_tour boolean not null default false;
