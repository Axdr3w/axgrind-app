import { supabase } from './supabaseClient.js';

// Reads go straight through the anon client under RLS (auth.uid() = user_id
// already scopes this to the caller's own rows) — no service-role function
// needed, same as fetchMeasurements/fetchWeightLogs.
export async function fetchLastExerciseLog(userId, exerciseName) {
  if (!supabase) return null;
  const { data } = await supabase
    .from('exercise_logs')
    .select('weight, reps, logged_date')
    .eq('user_id', userId)
    .eq('exercise_name', exerciseName)
    .order('logged_date', { ascending: false })
    .limit(1)
    .maybeSingle();
  return data ?? null;
}

// One row per exercise per day — logging the same exercise again today
// overwrites today's entry rather than creating a second one, matching the
// once-per-day pattern weight_logs/body_measurements already use.
export async function logExerciseWeight(userId, exerciseName, weight, reps, loggedDate) {
  if (!supabase) throw new Error('Not configured');
  const { error } = await supabase
    .from('exercise_logs')
    .upsert(
      { user_id: userId, exercise_name: exerciseName, weight, reps: reps ?? null, logged_date: loggedDate },
      { onConflict: 'user_id,exercise_name,logged_date' }
    );
  if (error) throw error;
}
