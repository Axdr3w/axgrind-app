const { createClient } = require('@supabase/supabase-js');
const { verifyUser } = require('./lib/verify-user.cjs');

const SYSTEM_PROMPT = `You are AX Coach — the AI trainer for AX.GRIND, a free fitness platform. The real trainer posts on Instagram and TikTok @ax.grind. Talk like a real coach: direct, motivating, no BS, friendly. Give practical specific advice on training, nutrition, recovery, body comp. Keep responses 2-5 sentences max unless a list is genuinely needed. Simple language. No corporate wellness speak. End with encouragement when it fits.`;

const DAILY_LIMIT = 30;

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: { message: 'Server is missing ANTHROPIC_API_KEY.' } }) };
  }
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: { message: 'Server is missing SUPABASE_SERVICE_ROLE_KEY.' } }) };
  }
  const auth = await verifyUser(event);
  if (auth.error) return auth.error;
  const userId = auth.userId;
  try {
    const { messages, targetLangName } = JSON.parse(event.body || '{}');
    if (!Array.isArray(messages) || !messages.length) {
      return { statusCode: 400, body: JSON.stringify({ error: { message: 'messages array is required.' } }) };
    }

    const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
    const { error: limitError } = await supabase.rpc('increment_daily_usage', {
      p_user_id: userId,
      p_feature: 'chat',
      p_limit: DAILY_LIMIT,
    });
    if (limitError) {
      if (limitError.message?.includes('DAILY_LIMIT_REACHED')) {
        return { statusCode: 429, body: JSON.stringify({ error: { message: 'DAILY_LIMIT_REACHED', limit: DAILY_LIMIT } }) };
      }
      return { statusCode: 500, body: JSON.stringify({ error: { message: limitError.message } }) };
    }

    const system = targetLangName && targetLangName !== 'English'
      ? `${SYSTEM_PROMPT} Respond in ${targetLangName}, regardless of what language the user writes in.`
      : SYSTEM_PROMPT;
    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1000,
        system,
        messages
      })
    });
    const data = await resp.json();
    return { statusCode: resp.status, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: { message: err.message } }) };
  }
};
