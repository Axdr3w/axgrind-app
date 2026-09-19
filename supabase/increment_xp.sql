-- Atomic XP increment, used by every Netlify function that awards XP
-- (log-weight, log-measurements, complete-workout, complete-focus-session,
-- complete-article). Replaces the old "select xp, add in JS, update xp" round
-- trip, which could lose an increment when two requests raced each other.
-- Run this once in the Supabase dashboard (Project → SQL Editor → New query → Run).

create or replace function increment_xp(p_user_id uuid, p_amount int)
returns int
language plpgsql
as $$
declare
  v_new_xp int;
begin
  update profiles set xp = xp + p_amount where id = p_user_id returning xp into v_new_xp;
  return v_new_xp;
end;
$$;
