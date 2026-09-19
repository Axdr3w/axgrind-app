const { createClient } = require('@supabase/supabase-js');

// Verifies the caller's Supabase session token and returns their real user
// id. Every function that writes data, awards XP, or spends paid API quota
// must call this instead of trusting a client-supplied userId — these
// functions run with the service-role key, which bypasses RLS entirely, so
// a client-supplied id would let anyone act as any user just by editing the
// request body. Same pattern delete-account.cjs already used.
async function verifyUser(event) {
  const authHeader = event.headers.authorization || event.headers.Authorization || '';
  const token = authHeader.replace(/^Bearer\s+/i, '');
  if (!token) {
    return { error: { statusCode: 401, body: JSON.stringify({ error: { message: 'Missing session token.' } }) } };
  }
  const anonClient = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);
  const { data, error } = await anonClient.auth.getUser(token);
  if (error || !data?.user) {
    return { error: { statusCode: 401, body: JSON.stringify({ error: { message: 'Invalid or expired session.' } }) } };
  }
  return { userId: data.user.id };
}

module.exports = { verifyUser };
