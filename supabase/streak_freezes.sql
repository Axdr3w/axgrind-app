-- Lets a user "save" a broken quest streak once every 7 days instead of
-- losing it outright — the single most-cited retention mechanic in habit
-- apps, sitting on top of the streak logic that already exists.
-- Run this once in the Supabase dashboard (Project → SQL Editor → New query → Run).

create table if not exists streak_freezes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  used_date date not null,
  created_at timestamptz not null default now(),
  unique (user_id, used_date)
);

create index if not exists streak_freezes_user_idx on streak_freezes (user_id, used_date desc);

alter table streak_freezes enable row level security;

create policy "Users can view own streak freezes" on streak_freezes
  for select using (auth.uid() = user_id);

create policy "Users can insert own streak freezes" on streak_freezes
  for insert with check (auth.uid() = user_id);
