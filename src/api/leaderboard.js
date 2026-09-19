import { supabase } from './supabaseClient.js';

// Global ranking is just every profile ordered by total quest XP. Ties broken
// by id so the ordering (and therefore everyone's rank number) is stable.
export async function fetchAllRanked() {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('profiles')
    .select('id, handle, display_name, xp')
    .order('xp', { ascending: false })
    .order('id', { ascending: true })
    .limit(100);
  if (error) throw error;
  return data ?? [];
}
