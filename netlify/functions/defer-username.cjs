const { createClient } = require('@supabase/supabase-js');
const { verifyUser } = require('./lib/verify-user.cjs');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: { message: 'Server is missing SUPABASE_SERVICE_ROLE_KEY.' } }) };
  }
  const auth = await verifyUser(event);
  if (auth.error) return auth.error;
  const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
  const { data, error } = await supabase.from('profiles')
    .update({ username_prompt_dismissed: true })
    .eq('id', auth.userId)
    .select('member_number')
    .single();
  if (error) return { statusCode: 500, body: JSON.stringify({ error: { message: error.message } }) };
  return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ok: true, memberNumber: data.member_number }) };
};
