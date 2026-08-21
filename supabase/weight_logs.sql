-- Progress tracking: one weigh-in per user per day.
-- Run this once in the Supabase dashboard (Project → SQL Editor → New query → Run).

create table if not exists weight_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  weight numeric not null,
  logged_at date not null,
  created_at timestamptz not null default now(),
  unique (user_id, logged_at)
);

create index if not exists weight_logs_user_date_idx on weight_logs (user_id, logged_at desc);

alter table weight_logs enable row level security;

create policy "Users can view own weight logs" on weight_logs
  for select using (auth.uid() = user_id);

create policy "Users can insert own weight logs" on weight_logs
  for insert with check (auth.uid() = user_id);

create policy "Users can update own weight logs" on weight_logs
  for update using (auth.uid() = user_id);

create policy "Users can delete own weight logs" on weight_logs
  for delete using (auth.uid() = user_id);
