import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  console.warn('Supabase env vars are missing — set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env for auth to work.');
}

// createClient() throws on an empty URL, so skip it entirely until real
// credentials exist — the rest of the app must keep working without auth.
//
// detectSessionInUrl is off because we handle magic-link/recovery links
// ourselves (see auth.js:completeSessionFromUrl) — the app is a Capacitor
// WebView pointed at this live site rather than a bundled build, and a
// Universal Link opening the native app never triggers a real page
// navigation for Supabase's own URL-detection to run against.
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, { auth: { detectSessionInUrl: false } })
  : null;

// Every Netlify function that writes data, awards XP, or spends paid API
// quota verifies the caller via this token (see netlify/functions/lib/
// verify-user.cjs) rather than trusting a client-supplied userId — so any
// fetch to one of those functions needs this header attached.
export async function getAuthHeader() {
  if (!supabase) throw new Error('Not configured');
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (!token) throw new Error('Not signed in.');
  return { Authorization: `Bearer ${token}` };
}
