import { supabase } from './supabaseClient.js';

// Fetches the list of conversations for a user, each with the other
// participant's public info and the most recent message for a preview.
export async function fetchConversations(userId) {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('dm_conversations')
    .select('*, user1:user1_id(id, handle, display_name), user2:user2_id(id, handle, display_name)')
    .or(`user1_id.eq.${userId},user2_id.eq.${userId}`)
    .order('created_at', { ascending: false });
  if (error) throw error;

  const conversations = data ?? [];
  const withPreviews = await Promise.all(conversations.map(async (c) => {
    const { data: lastMsg } = await supabase
      .from('dm_messages')
      .select('body, created_at, sender_id, read_at')
      .eq('conversation_id', c.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    const otherUser = c.user1_id === userId ? c.user2 : c.user1;
    return { ...c, otherUser, lastMessage: lastMsg ?? null };
  }));
  return withPreviews;
}

export async function findOrCreateConversation(userId, otherUserId) {
  if (!supabase) throw new Error('Not configured');
  const [user1_id, user2_id] = [userId, otherUserId].sort();

  const { data: existing } = await supabase
    .from('dm_conversations')
    .select('*')
    .eq('user1_id', user1_id)
    .eq('user2_id', user2_id)
    .maybeSingle();
  if (existing) return existing;

  const { data, error } = await supabase
    .from('dm_conversations')
    .insert({ user1_id, user2_id })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function fetchMessages(conversationId) {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('dm_messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function sendMessage(conversationId, senderId, body) {
  if (!supabase) throw new Error('Not configured');
  const { data, error } = await supabase
    .from('dm_messages')
    .insert({ conversation_id: conversationId, sender_id: senderId, body })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function markConversationRead(conversationId, userId) {
  if (!supabase) return;
  await supabase
    .from('dm_messages')
    .update({ read_at: new Date().toISOString() })
    .eq('conversation_id', conversationId)
    .is('read_at', null)
    .neq('sender_id', userId);
}

export async function deleteMessage(id) {
  if (!supabase) throw new Error('Not configured');
  const { error } = await supabase.from('dm_messages').delete().eq('id', id);
  if (error) throw error;
}

export async function reportDmMessage(reporterId, dmMessageId, reason) {
  if (!supabase) throw new Error('Not configured');
  const { error } = await supabase.from('forum_reports').insert({
    reporter_id: reporterId,
    dm_message_id: dmMessageId,
    reason: reason || null,
  });
  if (error) throw error;
}
