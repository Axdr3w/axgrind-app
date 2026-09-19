import { supabase } from './supabaseClient.js';

// Reads go straight through the anon client under RLS (auth.uid() = user_id
// already scopes this to the caller's own rows) — no service-role function
// needed, same as fetchMeasurements/fetchWeightLogs.
//
// Fetched once per workout session (not once per exercise) so "last time
// you did X" can show on every exercise row the moment a session starts,
// instead of only the one row someone happens to tap. 200 rows comfortably
// covers months of daily logging across a real workout's exercise count;
// deduping to "most recent per exercise" happens client-side in plans.js.
export async function fetchAllExerciseLogs(userId) {
  if (!supabase) return [];
  const { data } = await supabase
    .from('exercise_logs')
    .select('exercise_name, weight, reps, logged_date')
    .eq('user_id', userId)
    .order('logged_date', { ascending: false })
    .limit(200);
  return data ?? [];
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
