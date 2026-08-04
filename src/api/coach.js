import { supabase } from './supabaseClient.js';

export async function fetchSavedChats(userId) {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('saved_chats')
    .select('id, question, answer, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

// The 20-per-user cap is enforced by a Postgres trigger (see the migration),
// not here — a client-side count check alone could be raced by two saves
// firing close together.
export async function saveChat(userId, question, answer) {
  if (!supabase) throw new Error('Not configured');
  const { error } = await supabase.from('saved_chats').insert({ user_id: userId, question, answer });
  if (error) {
    if (error.message?.includes('SAVED_CHATS_LIMIT_REACHED')) {
      const limitErr = new Error('Saved chats limit reached');
      limitErr.isLimitReached = true;
      throw limitErr;
    }
    throw error;
  }
}

export async function deleteSavedChat(id) {
  if (!supabase) throw new Error('Not configured');
  const { error } = await supabase.from('saved_chats').delete().eq('id', id);
  if (error) throw error;
}
