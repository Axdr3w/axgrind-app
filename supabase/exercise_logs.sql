-- Per-exercise weight/reps, logged once per exercise per day — the data
-- needed to power "last time you did X, try Y" suggestions in the workout
-- session. Keyed by exercise_name (not workout_id/day_key) because the same
-- exercise appears across many different plans, and "last time" should mean
-- the last time you did THAT LIFT, not the last time you did this specific
-- plan's version of day 3.
-- Run this once in the Supabase dashboard (Project → SQL Editor → New query → Run).

create table if not exists exercise_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  exercise_name text not null,
  weight numeric not null,
  reps int,
  logged_date date not null,
  created_at timestamptz not null default now(),
  unique (user_id, exercise_name, logged_date)
);

create index if not exists exercise_logs_lookup_idx on exercise_logs (user_id, exercise_name, logged_date desc);

alter table exercise_logs enable row level security;

create policy "Users can view own exercise logs" on exercise_logs
  for select using (auth.uid() = user_id);

create policy "Users can insert own exercise logs" on exercise_logs
  for insert with check (auth.uid() = user_id);

create policy "Users can update own exercise logs" on exercise_logs
  for update using (auth.uid() = user_id);
