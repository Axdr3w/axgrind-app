const { createClient } = require('@supabase/supabase-js');

// Batches many short strings (exercise names, workout titles, form-cue
// captions) into one Claude call per page load rather than one call per
// string. Writes happen here (service_role), never from the client — see
// the `translations` table's RLS policy comment for why.
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
    const { texts, targetLang, targetLangName } = JSON.parse(event.body || '{}');
    if (!Array.isArray(texts) || !texts.length || !targetLang || !targetLangName) {
      return { statusCode: 400, body: JSON.stringify({ error: { message: 'texts (array), targetLang, and targetLangName are required.' } }) };
    }

    const numbered = texts.map((t, i) => `${i + 1}. ${t}`).join('\n');
    const systemPrompt = `You are a professional fitness-content translator. Translate each numbered line into ${targetLangName} (locale code: ${targetLang}). Preserve exercise/movement terminology accuracy. If a line contains HTML tags like <strong>...</strong>, keep the tags in the same position around the equivalent translated text. Return ONLY the translated lines, one per line, in the exact same numbered format ("1. ...", "2. ...", etc), same order, same count. No commentary, no extra text before or after.`;

    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 4000,
        system: systemPrompt,
        messages: [{ role: 'user', content: numbered }],
      }),
    });
    const data = await resp.json();
    if (data.error) {
      return { statusCode: resp.status, body: JSON.stringify({ error: data.error }) };
    }

    const raw = (data.content || []).map((b) => b.text || '').join('');
    const lines = raw.split('\n').map((l) => l.trim()).filter(Boolean);
    const parsed = new Array(texts.length).fill(null);
    for (const line of lines) {
      const m = line.match(/^(\d+)\.\s(.*)$/);
      if (!m) continue;
      const idx = Number(m[1]) - 1;
      if (idx >= 0 && idx < texts.length) parsed[idx] = m[2];
    }

    // If the model didn't return a clean 1:1 numbered match, fail the whole
    // batch rather than risk misaligning a translation to the wrong string.
    const translations = parsed.every((p) => p !== null) ? parsed : texts.map(() => null);

    if (translations.some((t) => t !== null)) {
      // Best-effort cache write — if it fails (e.g. migration not run yet),
      // the caller still gets the freshly-translated text back; it just
      // won't be cached for next time until the table exists.
      try {
        const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
        const rows = texts
          .map((source_text, i) => ({ source_text, target_lang: targetLang, translated_text: translations[i] }))
          .filter((r) => r.translated_text !== null);
        await supabase.from('translations').upsert(rows, { onConflict: 'source_text,target_lang' });
      } catch { /* see comment above */ }
    }

    return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ translations }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: { message: err.message } }) };
  }
};
