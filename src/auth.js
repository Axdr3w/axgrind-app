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

// Handles both a tapped magic-link email and a tapped password-reset
// email. In the web build this runs against the current page's own URL
// on load; in the native app it also runs against whatever URL arrives
// via a Universal Link (see SceneDelegate.swift / window.__handleUniversalLink
// in main.js), since that never causes a normal page navigation for
// supabase-js to auto-detect on its own (detectSessionInUrl is off — see
// supabaseClient.js). Returns the link's `type` ('recovery', 'magiclink',
// ...) so the caller can react, e.g. opening the "set new password" modal.
export async function completeSessionFromUrl(url) {
  if (!supabase) return null;
  const hashIndex = url.indexOf('#');
  if (hashIndex === -1) return null;
  const params = new URLSearchParams(url.slice(hashIndex + 1));
  const access_token = params.get('access_token');
  const refresh_token = params.get('refresh_token');
  const type = params.get('type');
  if (access_token && refresh_token) {
    await supabase.auth.setSession({ access_token, refresh_token });
  }
  return type;
}

export async function requestPasswordReset(email) {
  if (!supabase) return NOT_CONFIGURED;
  return supabase.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin,
  });
}

export async function updatePassword(newPassword) {
  if (!supabase) return NOT_CONFIGURED;
  return supabase.auth.updateUser({ password: newPassword });
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
