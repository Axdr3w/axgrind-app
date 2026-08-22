import { supabase } from './supabaseClient.js';

async function callFn(path, body) {
  const resp = await fetch(`/.netlify/functions/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await resp.json();
  if (!resp.ok) throw new Error(data.error?.message || 'Something went wrong.');
  return data;
}

export function logMeasurements(userId, values, loggedAt) {
  return callFn('log-measurements', { userId, loggedAt, ...values });
}

export async function fetchMeasurements(userId, limit = 200) {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('body_measurements')
    .select('logged_at, neck, shoulders, chest, arms, waist, hips, thighs, calves')
    .eq('user_id', userId)
    .order('logged_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []).reverse();
}
