const { createClient } = require('@supabase/supabase-js');
const { verifyUser } = require('./lib/verify-user.cjs');

const SYSTEM_PROMPT = `You are AX Coach — the AI trainer for AX.GRIND, a free fitness platform. The real trainer posts on Instagram and TikTok @ax.grind. Talk like a real coach: direct, motivating, no BS, friendly. Give practical specific advice on training, nutrition, recovery, body comp. Keep responses 2-5 sentences max unless a list is genuinely needed. Simple language. No corporate wellness speak. End with encouragement when it fits.`;

const DAILY_LIMIT = 30;

// Without this, "AI coach" was really just a generic chatbot with a fitness
// system prompt — it had zero access to anything the user had actually
// done, so a question like "should I increase my bench" could only ever get
// a generic answer, or worse, an invented-sounding one. This pulls their
// most recent logged weight per exercise (from the ⚖️ per-exercise logging
// built earlier) so the model can reference real numbers instead of
// guessing. Capped at 8 exercises and one row each — enough to be useful,
// small enough not to bloat every request's token cost.
async function buildTrainingContext(supabase, userId) {
  const { data: logs } = await supabase
    .from('exercise_logs')
    .select('exercise_name, weight, reps, logged_date')
    .eq('user_id', userId)
    .order('logged_date', { ascending: false })
    .limit(50);

  if (!logs || logs.length === 0) {
    return "This user hasn't logged any exercise weights yet. If they ask what weight or reps to use, give sensible general guidance for their apparent level rather than inventing a specific number, and mention they can log their lifts in the app (the ⚖️ icon during a workout) so future advice can be based on their real numbers.";
  }

  const seen = new Set();
  const latestPerExercise = [];
  for (const log of logs) {
    if (seen.has(log.exercise_name)) continue;
    seen.add(log.exercise_name);
    latestPerExercise.push(log);
    if (latestPerExercise.length >= 8) break;
  }

  const lines = latestPerExercise
    .map((l) => `- ${l.exercise_name}: ${l.weight} lbs${l.reps ? ` × ${l.reps} reps` : ''} (logged ${l.logged_date})`)
    .join('\n');

  return `Here is what this user has actually logged recently, most recent entry per exercise:\n${lines}\nUse these real numbers when they ask about progress, what weight to use, or programming — don't guess or invent numbers when their real data answers the question. Their history may not cover every exercise they do; for anything not listed, fall back to general guidance.`;
}

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

    const system = `${SYSTEM_PROMPT} ${await buildTrainingContext(supabase, userId)}${targetLangName && targetLangName !== 'English' ? ` Respond in ${targetLangName}, regardless of what language the user writes in.` : ''}`;
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
