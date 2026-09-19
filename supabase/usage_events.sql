-- Minimal feature-usage tracking — right now every roadmap decision in this
-- project (which nav items are primary, which pages need work) is informed
-- guessing, because there's no data on what people actually open. This
-- table is deliberately small: one row per page view, nothing per-click.
-- Run this once in the Supabase dashboard (Project → SQL Editor → New query → Run).

create table if not exists usage_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  event_name text not null,
  page_id text,
  created_at timestamptz not null default now()
);

create index if not exists usage_events_lookup_idx on usage_events (event_name, created_at desc);

alter table usage_events enable row level security;

-- Anyone (including a signed-out guest) can insert an event — that's the
-- whole point, since guest behavior is exactly what tells us whether the
-- pre-signup experience is working. Authenticated inserts must claim their
-- own user_id, not someone else's; there's no cost to a guest spoofing a
-- null user_id since it's already anonymous.
create policy "Anyone can insert usage events" on usage_events
  for insert with check (user_id is null or auth.uid() = user_id);

-- No select policy — deliberately. Regular app users (guest or logged in)
-- have zero read access to this table via the app's own client; querying
-- it is done from the Supabase dashboard's SQL editor as the project owner,
-- which operates outside RLS. Nobody using the app can pull usage data
-- through it.
