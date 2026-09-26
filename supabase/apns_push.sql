-- Native iOS push (APNs) uses a device token, not a Web Push endpoint/keys
-- triplet — reuses the existing `endpoint` column as the universal unique
-- identifier for a push destination (an iOS row stores 'apns:<device
-- token>' there) so the existing upsert-by-endpoint logic in push.js needs
-- no changes, and p256dh/auth_key simply stay null for iOS rows.
-- Run this once in the Supabase dashboard (Project → SQL Editor → New query → Run).

alter table push_subscriptions add column if not exists platform text not null default 'web'; -- 'web' | 'ios'
alter table push_subscriptions alter column p256dh drop not null;
alter table push_subscriptions alter column auth_key drop not null;
