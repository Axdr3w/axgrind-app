const { createClient } = require('@supabase/supabase-js');
const { verifyUser } = require('./lib/verify-user.cjs');

// Keep in sync with the fullbody-*/cardio-* entries in src/workouts-data.js —
// these are the only ids the model is allowed to recommend, so the client
// can turn "recommended_plan" into a real, clickable link to that plan
// instead of a made-up name that doesn't exist anywhere in the app.
const RECOMMENDABLE_PLANS = [
  ['fullbody-gym-beg', 'Full Body — Beginner 3x/week'],
  ['fullbody-gym-int', '8-Week Shred — Intermediate'],
  ['fullbody-gym-adv', 'Elite 6-Day Split — Advanced'],
  ['fullbody-home-beg', 'Home Starter — Full Body Beginner'],
  ['fullbody-home-int', 'Home Warrior — Full Body'],
  ['fullbody-home-adv', 'Home Beast — Full Body Advanced'],
  ['fullbody-gym-ppl', 'Push Pull Legs — Strength Split'],
  ['fullbody-home-express', 'Full Body Circuit — 20-Min Express'],
  ['cardio-beg', 'Fat Burn — Beginner Cardio'],
  ['cardio-int', 'HIIT Shred — Intermediate'],
  ['cardio-adv', 'Cardio Destroyer — Advanced'],
  ['cardio-gym-beg', 'Machine Cardio — Beginner'],
  ['cardio-gym-int', 'Interval Engine — Intermediate'],
  ['cardio-gym-adv', 'Metabolic Conditioning — Advanced'],
];
const PLAN_LIST_TEXT = RECOMMENDABLE_PLANS.map(([id, title]) => `${id} (${title})`).join(', ');

// Deliberately NOT a physique-rating tool: no body-type classification, no
// "strengths vs weak points" scoring of how someone looks. The photo exists
// only to give the recommendation something concrete to key off of — apparent
// training experience, stance/setup, equipment visible in frame — so the
// plan and tips are less generic than the intake form alone could produce.
// Every output field is about training programming, never about appearance.
const SYSTEM_PROMPT = `You are AX Coach, the AI trainer for AX.GRIND. A user has uploaded a photo so you can recommend a training plan and next steps — you are not rating, scoring, or commenting on their body or appearance. Use the photo only for training-relevant context: apparent experience level, stance/mobility cues relevant to exercise selection, visible equipment or setting. Never comment on physique, body type, weight, or how someone looks. Never use the words "weakness," "flaw," or "body type." Be concise per field — this has to generate quickly, so favor information density over length. Respond ONLY with valid JSON, no markdown, no backticks, no extra text:
{"overall":"A short paragraph (2-3 sentences) on apparent training experience level and what that means for programming — never a description of their physique or appearance","training_focus":["3-5 short phrases naming training priorities to focus on next — programming priorities like 'posterior chain volume' or 'core stability work', never appearance-based observations about their body"],"recommended_plan":"the single best-fit plan id, chosen ONLY from this exact list (respond with just the id, e.g. \\"fullbody-gym-beg\\" — never a made-up name): ${PLAN_LIST_TEXT}","workout_tips":"A detailed paragraph (3-4 sentences) of specific, practical workout advice","nutrition_note":"A paragraph (2-3 sentences) of specific, practical nutrition recommendations to support that training","motivation":"A genuinely hype motivating closing paragraph (2-3 sentences) in AX voice, about training and effort, never about appearance"}`;

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
  const auth = await verifyUser(event);
  if (auth.error) return auth.error;
  const userId = auth.userId;
  try {
    const { imageBase64, mediaType, targetLangName } = JSON.parse(event.body || '{}');
    if (!imageBase64) {
      return { statusCode: 400, body: JSON.stringify({ error: { message: 'imageBase64 is required.' } }) };
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
      ? `${SYSTEM_PROMPT}\nWrite every text value in the JSON in ${targetLangName} EXCEPT "recommended_plan", which must stay exactly one of the raw ids listed above, untranslated. Keep the JSON keys themselves in English.`
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
            { type: 'text', text: 'Use this photo for training-relevant context and give me a plan recommendation and training tips as the AX Coach.' }
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
