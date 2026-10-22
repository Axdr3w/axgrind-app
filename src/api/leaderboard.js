import { supabase } from './supabaseClient.js';

// Global ranking is ordered by total quest XP. For equal XP, the earlier
// registered member (lower member_number) wins; id is the final stable tie-break.
export async function fetchAllRanked() {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('profiles')
    .select('id, handle, display_name, member_number, username_prompt_dismissed, xp')
    .order('xp', { ascending: false })
    .order('member_number', { ascending: true, nullsFirst: false })
    .order('id', { ascending: true })
    .limit(100);
  if (error) throw error;
  return data ?? [];
}
