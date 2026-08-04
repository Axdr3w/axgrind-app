import { supabase } from './supabaseClient.js';
import { todayStr, toDateStr } from '../date-utils.js';

export async function fetchQuestsForDate(userId, dateStr) {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('quests')
    .select('*')
    .eq('user_id', userId)
    .eq('quest_date', dateStr)
    .order('due_time', { ascending: true, nullsFirst: false });
  if (error) throw error;
  return data ?? [];
}

export async function fetchRecentQuests(userId, days = 60) {
  if (!supabase) return [];
  const since = new Date();
  since.setDate(since.getDate() - days);
  const { data, error } = await supabase
    .from('quests')
    .select('quest_date, completed_at')
    .eq('user_id', userId)
    .gte('quest_date', toDateStr(since));
  if (error) throw error;
  return data ?? [];
}

export async function createQuest(userId, { title, questDate, dueTime, reminderMinutesBefore, xpValue = 10 }) {
  if (!supabase) throw new Error('Not configured');
  const { data, error } = await supabase
    .from('quests')
    .insert({
      user_id: userId,
      title,
      quest_date: questDate || todayStr(),
      due_time: dueTime || null,
      reminder_minutes_before: reminderMinutesBefore || null,
      xp_value: xpValue,
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function toggleQuestComplete(questId, isCurrentlyComplete) {
  if (!supabase) throw new Error('Not configured');
  const { data, error } = await supabase
    .from('quests')
    .update({ completed_at: isCurrentlyComplete ? null : new Date().toISOString() })
    .eq('id', questId)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteQuest(questId) {
  if (!supabase) throw new Error('Not configured');
  const { error } = await supabase.from('quests').delete().eq('id', questId);
  if (error) throw error;
}

export async function fetchProfileXp(userId) {
  if (!supabase) return 0;
  const { data, error } = await supabase.from('profiles').select('xp').eq('id', userId).single();
  if (error) throw error;
  return data?.xp ?? 0;
}
