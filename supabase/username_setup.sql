-- Stable public fallback names for accounts that defer choosing a username.
-- Apply this migration in the Supabase SQL editor before deploying the app.
create sequence if not exists public.axgrind_member_number_seq;

alter table public.profiles
  add column if not exists member_number bigint,
  add column if not exists username_prompt_dismissed boolean not null default false;

-- Number existing accounts by their actual account creation time.
with ordered_profiles as (
  select p.id,
    coalesce((select max(member_number) from public.profiles), 0)
      + row_number() over (order by u.created_at nulls last, p.id) as member_number
  from public.profiles p
  left join auth.users u on u.id = p.id
  where p.member_number is null
)
update public.profiles p
set member_number = ordered_profiles.member_number
from ordered_profiles
where p.id = ordered_profiles.id;

select setval(
  'public.axgrind_member_number_seq',
  greatest(coalesce((select max(member_number) from public.profiles), 0), 1),
  coalesce((select max(member_number) from public.profiles), 0) > 0
);

alter table public.profiles
  alter column member_number set default nextval('public.axgrind_member_number_seq');

create unique index if not exists profiles_member_number_unique
  on public.profiles (member_number);
