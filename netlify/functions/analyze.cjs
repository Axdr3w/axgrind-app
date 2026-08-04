const { createClient } = require('@supabase/supabase-js');

const SYSTEM_PROMPT = `You are AX Coach, the AI trainer for AX.GRIND. You analyze physique photos and give honest, detailed, genuinely encouraging advice in a direct coach voice — thorough enough that the user walks away feeling hyped and informed, not shortchanged. Never use the words "weakness," "weak point," or "flaw" — frame anything that isn't a strength yet as potential and opportunity, not a deficiency. Be concise per field — this has to generate quickly, so favor information density over length. Respond ONLY with valid JSON, no markdown, no backticks, no extra text:
{"overall":"A detailed paragraph (3-4 sentences) giving a genuinely encouraging overall impression of their physique and where they're at right now","strengths":["every genuine strength you can identify in the photo, as short phrases — do not cap this list at 3, list as many real strengths as you actually see, typically 4-6"],"potential":["the top 5 areas with the most room to grow, as short phrases, framed as exciting potential and opportunity, never as weaknesses or flaws"],"body_type":"ectomorph/mesomorph/endomorph or combo","recommended_plan":"best plan name from the app","workout_tips":"A detailed paragraph (3-4 sentences) of specific, practical workout advice based on what you see","nutrition_note":"A paragraph (2-3 sentences) of specific, practical nutrition recommendations","motivation":"A genuinely hype motivating closing paragraph (2-3 sentences) in AX voice"}`;

const DAILY_LIMIT = 4;

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
  try {
    const { imageBase64, mediaType, targetLangName, userId } = JSON.parse(event.body || '{}');
    if (!imageBase64) {
      return { statusCode: 400, body: JSON.stringify({ error: { message: 'imageBase64 is required.' } }) };
    }
    if (!userId) {
      return { statusCode: 400, body: JSON.stringify({ error: { message: 'userId is required.' } }) };
    }

    const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
    const { error: limitError } = await supabase.rpc('increment_daily_usage', {
      p_user_id: userId,
      p_feature: 'analyze',
      p_limit: DAILY_LIMIT,
    });
    if (limitError) {
      if (limitError.message?.includes('DAILY_LIMIT_REACHED')) {
        return { statusCode: 429, body: JSON.stringify({ error: { message: 'DAILY_LIMIT_REACHED', limit: DAILY_LIMIT } }) };
      }
      return { statusCode: 500, body: JSON.stringify({ error: { message: limitError.message } }) };
    }
    const system = targetLangName && targetLangName !== 'English'
      ? `${SYSTEM_PROMPT}\nWrite every text value in the JSON (overall, strengths, potential, body_type, recommended_plan, workout_tips, nutrition_note, motivation) in ${targetLangName}. Keep the JSON keys themselves in English.`
      : SYSTEM_PROMPT;
    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-opus-5',
        max_tokens: 1300,
        system,
        messages: [{
          role: 'user',
          content: [
            { type: 'image', source: { type: 'base64', media_type: mediaType || 'image/jpeg', data: imageBase64 } },
            { type: 'text', text: 'Analyze this physique photo and give me your honest assessment and recommendations as the AX Coach.' }
          ]
        }]
      })
    });
    const data = await resp.json();
    return { statusCode: resp.status, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: { message: err.message } }) };
  }
};
