import { supabase } from './api/supabaseClient.js';

const NOT_CONFIGURED = { error: { message: 'Accounts aren\'t set up yet — Supabase credentials are missing.' } };

export async function signUpWithPassword(email, password) {
  if (!supabase) return NOT_CONFIGURED;
  return supabase.auth.signUp({ email, password });
}

export async function signInWithPassword(email, password) {
  if (!supabase) return NOT_CONFIGURED;
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signInWithMagicLink(email) {
  if (!supabase) return NOT_CONFIGURED;
  return supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: window.location.origin },
  });
}

export async function signOut() {
  if (!supabase) return NOT_CONFIGURED;
  return supabase.auth.signOut();
}

export async function getSession() {
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export function onAuthStateChange(callback) {
  if (!supabase) return { data: { subscription: { unsubscribe() {} } } };
  return supabase.auth.onAuthStateChange((_event, session) => callback(session));
}

// Resolves a login-form identifier (email or username) to a real email via
// the server (service_role-backed, since a not-yet-logged-in user can't
// look this up themselves under RLS). Throws on failure — caller shows a
// generic "invalid email/username or password" either way.
export async function resolveLoginIdentifier(identifier) {
  const resp = await fetch('/.netlify/functions/resolve-login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier }),
  });
  const data = await resp.json();
  if (data.error) throw new Error(data.error.message);
  return data.email;
}

export async function deleteAccount() {
  if (!supabase) throw new Error('Not configured');
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (!token) throw new Error('Not signed in.');
  const resp = await fetch('/.netlify/functions/delete-account', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
  const result = await resp.json();
  if (result.error) throw new Error(result.error.message);
  await supabase.auth.signOut();
}

export async function setUsername(userId, handle) {
  const resp = await fetch('/.netlify/functions/set-username', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, handle }),
  });
  const data = await resp.json();
  if (data.error) throw new Error(data.error.message);
  return data;
}
