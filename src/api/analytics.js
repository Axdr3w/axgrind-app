import { supabase } from './supabaseClient.js';

// Fire-and-forget by design — a tracking failure (offline, RLS misconfig,
// table not created yet) must never surface to the user or block
// navigation. Every roadmap call made so far this session (which nav items
// are primary, which pages are worth more investment) has been judgment
// without data; this is what makes the next one not have to be.
export function trackPageView(pageId, userId) {
  if (!supabase) return;
  supabase.from('usage_events').insert({
    user_id: userId ?? null,
    event_name: 'page_view',
    page_id: pageId,
  }).then(({ error }) => {
    if (error) console.warn('[analytics]', error.message);
  });
}
