const { createClient } = require('@supabase/supabase-js');
const { verifyUser } = require('./lib/verify-user.cjs');

const HANDLE_PATTERN = /^[a-zA-Z0-9_]{3,20}$/;

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: { message: 'Server is missing SUPABASE_SERVICE_ROLE_KEY.' } }) };
  }
  const auth = await verifyUser(event);
  if (auth.error) return auth.error;
  try {
    const { handle } = JSON.parse(event.body || '{}');
    if (!handle) {
      return { statusCode: 400, body: JSON.stringify({ error: { message: 'handle is required.' } }) };
    }
    if (!HANDLE_PATTERN.test(handle)) {
      return { statusCode: 400, body: JSON.stringify({ error: { message: 'Username must be 3-20 characters: letters, numbers, underscores only.' } }) };
    }

    const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
    const { error } = await supabase.from('profiles').update({ handle }).eq('id', auth.userId);

    if (error) {
      if (error.code === '23505') {
        return { statusCode: 409, body: JSON.stringify({ error: { message: 'That username is already taken.' } }) };
      }
      return { statusCode: 500, body: JSON.stringify({ error: { message: error.message } }) };
    }

    return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: { message: err.message } }) };
  }
};
