-- Body measurements: one row per user per day, each field optional (inches).
-- Run this once in the Supabase dashboard (Project → SQL Editor → New query → Run).

create table if not exists body_measurements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  logged_at date not null,
  neck numeric,
  shoulders numeric,
  chest numeric,
  arms numeric,
  waist numeric,
  hips numeric,
  thighs numeric,
  calves numeric,
  created_at timestamptz not null default now(),
  unique (user_id, logged_at)
);

create index if not exists body_measurements_user_date_idx on body_measurements (user_id, logged_at desc);

alter table body_measurements enable row level security;

create policy "Users can view own measurements" on body_measurements
  for select using (auth.uid() = user_id);

create policy "Users can insert own measurements" on body_measurements
  for insert with check (auth.uid() = user_id);

create policy "Users can update own measurements" on body_measurements
  for update using (auth.uid() = user_id);

create policy "Users can delete own measurements" on body_measurements
  for delete using (auth.uid() = user_id);
