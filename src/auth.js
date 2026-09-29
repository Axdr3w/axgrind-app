import { registerPlugin, Capacitor } from '@capacitor/core';
import { supabase, getAuthHeader } from './api/supabaseClient.js';

// Talks to the custom native plugin in ios/App/App/AuthPlugin.swift — see
// signInWithOAuth below for why the native app needs it at all.
const AxAuth = registerPlugin('AxAuth');

const NOT_CONFIGURED = { error: { message: 'Accounts aren\'t set up yet — Supabase credentials are missing.' } };

function isNativeIOS() {
  return Capacitor.isNativePlatform() && Capacitor.getPlatform() === 'ios';
}

// Must exactly match a Redirect URL allowed in Supabase's Auth > URL
// Configuration settings, and the CFBundleURLSchemes entry in Info.plist.
const NATIVE_OAUTH_REDIRECT = 'com.axgrind.app://auth-callback';

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

// On the web this just redirects the whole page to Google/Apple and back —
// standard supabase-js behavior. On native iOS it can't do that: Google
// actively blocks OAuth sign-in from a plain embedded webview (the
// "disallowed_useragent" error), so navigating the Capacitor WKWebView
// straight to the consent screen doesn't work. Instead, on native we ask
// Supabase for the sign-in URL without letting it auto-navigate
// (skipBrowserRedirect), hand that URL to AuthPlugin.swift which opens it
// in a system-level ASWebAuthenticationSession, and manually exchange the
// `code` it comes back with for a session — the same "handle the redirect
// ourselves" shape as completeSessionFromUrl below, since a Universal
// Link/custom-scheme redirect never triggers a real page navigation for
// supabase-js's own URL-detection to run against (detectSessionInUrl is
// off — see supabaseClient.js).
export async function signInWithOAuth(provider) {
  if (!supabase) return NOT_CONFIGURED;

  if (!isNativeIOS()) {
    return supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: window.location.origin },
    });
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: { redirectTo: NATIVE_OAUTH_REDIRECT, skipBrowserRedirect: true },
  });
  if (error) return { error };

  const result = await AxAuth.openOAuthSession({ url: data.url, callbackScheme: 'com.axgrind.app' });
  if (result.error) return { error: { message: result.error } };

  const code = new URL(result.url).searchParams.get('code');
  if (!code) return { error: { message: 'Sign-in did not complete.' } };

  return supabase.auth.exchangeCodeForSession(code);
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

  // The web-side leg of signInWithOAuth's PKCE flow: Google/Apple redirect
  // back to this same page with a one-time ?code= in the query string
  // (never the hash), which supabase-js won't auto-exchange on its own
  // here (detectSessionInUrl is off). Strip it from the URL bar either way
  // so a page refresh doesn't retry an already-used code.
  const codeMatch = /[?&]code=([^&]+)/.exec(url);
  if (codeMatch) {
    const code = decodeURIComponent(codeMatch[1]);
    window.history.replaceState({}, '', window.location.pathname);
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    return error ? null : 'oauth';
  }

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
    headers: { 'Content-Type': 'application/json', ...(await getAuthHeader()) },
    body: JSON.stringify({ userId, handle }),
  });
  const data = await resp.json();
  if (data.error) throw new Error(data.error.message);
  return data;
}
