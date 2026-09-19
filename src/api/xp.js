import { supabase, getAuthHeader } from './supabaseClient.js';

// Both writes go through service_role-backed Netlify Functions, never a
// direct client insert — see the plan's "XP must never be client-settable"
// note. These wrappers throw a clean Error with the function's message
// (including the "already completed/read" case) for the caller to display.
async function callXpFunction(path, body) {
  const resp = await fetch(`/.netlify/functions/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(await getAuthHeader()) },
    body: JSON.stringify(body),
  });
  const data = await resp.json();
  if (!resp.ok) throw new Error(data.error?.message || 'Something went wrong.');
  return data;
}

export function completeWorkout(userId, workoutId, dayKey) {
  return callXpFunction('complete-workout', { userId, workoutId, dayKey });
}

export function completeArticle(userId, articleId) {
  return callXpFunction('complete-article', { userId, articleId });
}

export function completeFocusSession(userId, minutes) {
  return callXpFunction('complete-focus-session', { userId, minutes });
}

export function logWeight(userId, weight, loggedAt) {
  return callXpFunction('log-weight', { userId, weight, loggedAt });
}

const todayStr = () => new Date().toISOString().slice(0, 10);

export async function fetchCompletedWorkoutKeysToday(userId) {
  if (!supabase) return new Set();
  const { data } = await supabase
    .from('workout_completions')
    .select('workout_id, day_key')
    .eq('user_id', userId)
    .eq('completed_date', todayStr());
  return new Set((data ?? []).map((r) => `${r.workout_id}::${r.day_key}`));
}

export async function fetchReadArticleIds(userId) {
  if (!supabase) return new Set();
  const { data } = await supabase.from('article_reads').select('article_id').eq('user_id', userId);
  return new Set((data ?? []).map((r) => r.article_id));
}

export async function fetchWorkoutHistory(userId, limit = 30) {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('workout_completions')
    .select('workout_id, day_key, completed_date')
    .eq('user_id', userId)
    .order('completed_date', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data ?? [];
}

export async function fetchWorkoutCompletionCount(userId) {
  if (!supabase) return 0;
  const { count, error } = await supabase
    .from('workout_completions')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId);
  if (error) throw error;
  return count ?? 0;
}

export async function fetchWeightLogs(userId, limit = 90) {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('weight_logs')
    .select('weight, logged_at')
    .eq('user_id', userId)
    .order('logged_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []).reverse();
}
