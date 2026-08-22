const { createClient } = require('@supabase/supabase-js');

const BUCKET = 'progress-photos';

function isValidDateStr(s) {
  return typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(new Date(s).getTime());
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: { message: 'Server is missing SUPABASE_SERVICE_ROLE_KEY.' } }) };
  }
  try {
    const { userId, loggedAt } = JSON.parse(event.body || '{}');
    if (!userId || !isValidDateStr(loggedAt)) {
      return { statusCode: 400, body: JSON.stringify({ error: { message: 'userId and a valid loggedAt date are required.' } }) };
    }

    const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
    const { error } = await supabase.storage.from(BUCKET).remove([`${userId}/${loggedAt}.jpg`]);
    if (error) {
      return { statusCode: 500, body: JSON.stringify({ error: { message: error.message } }) };
    }

    return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ deleted: true }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: { message: err.message } }) };
  }
};
