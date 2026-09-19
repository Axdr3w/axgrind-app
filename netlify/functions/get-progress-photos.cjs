const { createClient } = require('@supabase/supabase-js');
const { verifyUser } = require('./lib/verify-user.cjs');

const BUCKET = 'progress-photos';

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
    const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
    const { data: files, error: listError } = await supabase.storage.from(BUCKET).list(userId, {
      limit: 100,
      sortBy: { column: 'name', order: 'asc' },
    });
    if (listError) {
      return { statusCode: 500, body: JSON.stringify({ error: { message: listError.message } }) };
    }
    if (!files || files.length === 0) {
      return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ photos: [] }) };
    }

    const paths = files.map((f) => `${userId}/${f.name}`);
    const { data: signedList, error: signError } = await supabase.storage.from(BUCKET).createSignedUrls(paths, 3600);
    if (signError) {
      return { statusCode: 500, body: JSON.stringify({ error: { message: signError.message } }) };
    }

    const photos = signedList
      .filter((s) => !s.error)
      .map((s) => ({
        loggedAt: s.path.split('/')[1].replace('.jpg', ''),
        url: s.signedUrl,
      }));

    return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ photos }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: { message: err.message } }) };
  }
};
