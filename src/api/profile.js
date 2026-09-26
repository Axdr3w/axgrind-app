import { supabase } from './supabaseClient.js';

export async function fetchDisplayName(userId) {
  if (!supabase) return null;
  const { data, error } = await supabase.from('profiles').select('display_name').eq('id', userId).single();
  if (error) throw error;
  return data?.display_name ?? null;
}

export async function updateDisplayName(userId, displayName) {
  if (!supabase) throw new Error('Not configured');
  const { error } = await supabase.from('profiles').update({ display_name: displayName }).eq('id', userId);
  if (error) throw error;
}

export async function fetchHandle(userId) {
  if (!supabase) return null;
  const { data, error } = await supabase.from('profiles').select('handle').eq('id', userId).single();
  if (error) throw error;
  return data?.handle ?? null;
}

export async function fetchLanguage(userId) {
  if (!supabase) return null;
  const { data, error } = await supabase.from('profiles').select('language').eq('id', userId).single();
  if (error) throw error;
  return data?.language ?? null;
}

export async function updateLanguage(userId, language) {
  if (!supabase) return;
  const { error } = await supabase.from('profiles').update({ language }).eq('id', userId);
  if (error) throw error;
}

export async function fetchAccentColor(userId) {
  if (!supabase) return null;
  const { data, error } = await supabase.from('profiles').select('accent_color').eq('id', userId).single();
  if (error) throw error;
  return data?.accent_color ?? null;
}

export async function updateAccentColor(userId, color) {
  if (!supabase) return;
  const { error } = await supabase.from('profiles').update({ accent_color: color }).eq('id', userId);
  if (error) throw error;
}

export async function fetchBgTheme(userId) {
  if (!supabase) return null;
  const { data, error } = await supabase.from('profiles').select('bg_theme').eq('id', userId).single();
  if (error) throw error;
  return data?.bg_theme ?? null;
}

export async function updateBgTheme(userId, themeId) {
  if (!supabase) return;
  const { error } = await supabase.from('profiles').update({ bg_theme: themeId }).eq('id', userId);
  if (error) throw error;
}

// Captured silently on login (see main.js) — never asks the user, just
// keeps the account's timezone current so the daily reminder can compute
// "their local time" without a settings trip. Overwritten every login
// rather than set-once, so travel/relocation stays accurate for free.
export async function updateTimezone(userId, timezone) {
  if (!supabase || !timezone) return;
  const { error } = await supabase.from('profiles').update({ timezone }).eq('id', userId);
  if (error) throw error;
}

export async function fetchReminderTime(userId) {
  if (!supabase) return null;
  const { data, error } = await supabase.from('profiles').select('reminder_time').eq('id', userId).single();
  if (error) throw error;
  return data?.reminder_time ?? null;
}

export async function updateReminderTime(userId, reminderTime) {
  if (!supabase) return;
  const { error } = await supabase.from('profiles').update({ reminder_time: reminderTime }).eq('id', userId);
  if (error) throw error;
}

export async function fetchHasSeenTour(userId) {
  if (!supabase) return true; // not configured — don't force a tour that can't track itself
  const { data, error } = await supabase.from('profiles').select('has_seen_tour').eq('id', userId).single();
  if (error) throw error;
  return data?.has_seen_tour ?? false;
}

export async function markTourSeen(userId) {
  if (!supabase) return;
  const { error } = await supabase.from('profiles').update({ has_seen_tour: true }).eq('id', userId);
  if (error) throw error;
}

// Best-effort pre-check only — the real enforcement is the DB's unique index
// plus the set-username server function, since this is inherently racy.
export async function checkHandleAvailable(handle) {
  if (!supabase) return true;
  const { data, error } = await supabase.from('profiles').select('id').ilike('handle', handle).maybeSingle();
  if (error) throw error;
  return !data;
}

// Looks up another user by handle for starting a DM — deliberately selects
// only public-safe columns, never the legacy `username` column (= email).
export async function findUserByHandle(handle) {
  if (!supabase) return null;
  const { data, error } = await supabase.from('profiles').select('id, handle, display_name').ilike('handle', handle).maybeSingle();
  if (error) throw error;
  return data ?? null;
}
