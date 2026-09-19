const { createClient } = require('@supabase/supabase-js');
const { verifyUser } = require('./lib/verify-user.cjs');

const BUCKET = 'progress-photos';
// Client resizes/re-encodes to JPEG before sending (see progress.js), so this
// is a generous ceiling on the base64 string length, not the real expected size.
const MAX_BASE64_CHARS = 7_000_000; // ~5MB decoded

function isValidDateStr(s) {
  return typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(new Date(s).getTime());
}

// Same one-day window as log-weight.cjs — a progress photo is "today's"
// wherever the person taking it is, bounded so this can't backfill a
// timeline of fabricated dates.
function isWithinAllowedWindow(dateStr) {
  const day = 24 * 60 * 60 * 1000;
  const logged = new Date(`${dateStr}T00:00:00Z`).getTime();
  const now = Date.now();
  return logged >= now - day && logged <= now + day;
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: { message: 'Server is missing SUPABASE_SERVICE_ROLE_KEY.' } }) };
  }
  const auth = await verifyUser(event);
  if (auth.error) return auth.error;
  const userId = auth.userId;
  try {
    const { imageBase64, loggedAt } = JSON.parse(event.body || '{}');
    if (!imageBase64 || !isValidDateStr(loggedAt) || !isWithinAllowedWindow(loggedAt)) {
      return { statusCode: 400, body: JSON.stringify({ error: { message: 'imageBase64 and a valid loggedAt date are required.' } }) };
    }
    if (imageBase64.length > MAX_BASE64_CHARS) {
      return { statusCode: 400, body: JSON.stringify({ error: { message: 'Photo is too large.' } }) };
    }

    const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
    const path = `${userId}/${loggedAt}.jpg`;
    const buffer = Buffer.from(imageBase64, 'base64');

    const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, buffer, {
      contentType: 'image/jpeg',
      upsert: true,
    });
    if (uploadError) {
      return { statusCode: 500, body: JSON.stringify({ error: { message: uploadError.message } }) };
    }

    const { data: signed, error: signError } = await supabase.storage.from(BUCKET).createSignedUrl(path, 3600);
    if (signError) {
      return { statusCode: 500, body: JSON.stringify({ error: { message: signError.message } }) };
    }

    return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ loggedAt, url: signed.signedUrl }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: { message: err.message } }) };
  }
};
