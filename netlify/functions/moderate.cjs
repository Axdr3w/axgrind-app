const SYSTEM_PROMPT = `You are a content moderator for AX.GRIND, a general-audience fitness community forum. Review the post below (text and/or image) and decide whether it should be BLOCKED before it's allowed to post.

Block for:
- Spam, scams, or advertising unrelated to fitness
- NSFW, sexual, or overly explicit content (this is a fitness app — shirtless/workout photos and normal gym attire are fine, sexually explicit content is not)
- Violence, gore, or graphic content
- Hate speech, harassment, or targeted abuse
- Anything illegal

Do NOT block normal fitness content: workout photos, progress pics in athletic wear, gym selfies, food/meal photos, encouraging or blunt motivational text, mild profanity used casually.

Respond ONLY with valid JSON, no markdown, no extra text:
{"blocked": true or false, "reason": "short reason if blocked, empty string if not"}`;

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: { message: 'Server is missing ANTHROPIC_API_KEY.' } }) };
  }
  try {
    const { text, imageBase64, mediaType } = JSON.parse(event.body || '{}');
    if (!text && !imageBase64) {
      return { statusCode: 200, body: JSON.stringify({ blocked: false, reason: '' }) };
    }

    const content = [];
    if (imageBase64) {
      content.push({ type: 'image', source: { type: 'base64', media_type: mediaType || 'image/jpeg', data: imageBase64 } });
    }
    content.push({ type: 'text', text: `Post text: ${text || '(no text, image only)'}` });

    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 200,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content }],
      }),
    });
    const data = await resp.json();
    if (data.error) {
      // Fail open on API errors so a moderation outage doesn't block all posting.
      return { statusCode: 200, body: JSON.stringify({ blocked: false, reason: '', warning: data.error.message }) };
    }
    const raw = (data.content || []).map(b => b.text || '').join('');
    let verdict;
    try {
      verdict = JSON.parse(raw.replace(/```json|```/g, '').trim());
    } catch {
      verdict = { blocked: false, reason: '' };
    }
    return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(verdict) };
  } catch (err) {
    // Fail open — a moderation bug shouldn't be able to take down posting entirely.
    return { statusCode: 200, body: JSON.stringify({ blocked: false, reason: '', warning: err.message }) };
  }
};
