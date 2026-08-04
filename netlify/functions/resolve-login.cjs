const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: { message: 'Server is missing SUPABASE_SERVICE_ROLE_KEY.' } }) };
  }
  try {
    const { identifier } = JSON.parse(event.body || '{}');
    if (!identifier) {
      return { statusCode: 400, body: JSON.stringify({ error: { message: 'identifier is required.' } }) };
    }

    // Already an email — pass it straight through, no lookup needed.
    if (identifier.includes('@')) {
      return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: identifier }) };
    }

    const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
    const { data: profile } = await supabase
      .from('profiles')
      .select('id')
      .ilike('handle', identifier)
      .maybeSingle();

    // Generic "not found" on purpose — never confirm/deny whether a username
    // exists, so the login form can't be used to enumerate accounts.
    if (!profile) {
      return { statusCode: 404, body: JSON.stringify({ error: { message: 'Invalid email/username or password.' } }) };
    }

    const { data: authUser, error } = await supabase.auth.admin.getUserById(profile.id);
    if (error || !authUser?.user?.email) {
      return { statusCode: 404, body: JSON.stringify({ error: { message: 'Invalid email/username or password.' } }) };
    }

    return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: authUser.user.email }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: { message: err.message } }) };
  }
};
