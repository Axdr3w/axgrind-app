import { supabase } from '../api/supabaseClient.js';
import { getLanguageMeta } from './languages.js';

// Session-lifetime cache: Map<lang, Map<sourceText, translatedText>>. Avoids
// re-querying Supabase for strings already resolved earlier in this session.
const sessionCache = new Map();

function getLangCache(lang) {
  if (!sessionCache.has(lang)) sessionCache.set(lang, new Map());
  return sessionCache.get(lang);
}

// The Videos page can trigger translation of 1000+ exercise names/captions
// in one go — far more than fits in a single Claude call (token limit), a
// single Netlify function invocation (execution time limit), or even a
// single Supabase `.in(...)` filter (the resulting GET URL gets too long and
// fails outright). Everything network-bound in this file runs in small
// chunks, a handful concurrently, rather than one huge request.
const CHUNK_SIZE = 25;
const MAX_CONCURRENT = 4;

async function runChunked(items, worker) {
  const chunks = [];
  for (let i = 0; i < items.length; i += CHUNK_SIZE) chunks.push(items.slice(i, i + CHUNK_SIZE));
  const results = new Array(chunks.length);
  let next = 0;
  async function run() {
    while (next < chunks.length) {
      const idx = next++;
      results[idx] = await worker(chunks[idx]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(MAX_CONCURRENT, chunks.length) }, run));
  return results.flat();
}

async function readCacheChunk(chunk, lang) {
  try {
    const { data } = await supabase
      .from('translations')
      .select('source_text, translated_text')
      .eq('target_lang', lang)
      .in('source_text', chunk);
    return data ?? [];
  } catch {
    return [];
  }
}

async function fetchChunk(chunk, lang) {
  try {
    const resp = await fetch('/.netlify/functions/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ texts: chunk, targetLang: lang, targetLangName: getLanguageMeta(lang).nativeName }),
    });
    const data = await resp.json();
    const translated = data.translations || [];
    return chunk.map((text, i) => translated[i] ?? text);
  } catch {
    return chunk;
  }
}

// Translates a batch of strings into `lang`, returning an array aligned to
// `texts` (same order/length). English or unconfigured Supabase short-circuits
// to the originals. Read-only against the `translations` table — writes only
// happen server-side in translate.cjs (see that file for why).
export async function translateBatch(texts, lang) {
  if (!texts.length || lang === 'en' || !supabase) return texts;

  const cache = getLangCache(lang);
  const result = new Array(texts.length);
  const missing = [];
  const missingIdx = [];

  texts.forEach((text, i) => {
    if (cache.has(text)) result[i] = cache.get(text);
    else { missing.push(text); missingIdx.push(i); }
  });

  if (missing.length) {
    const rows = await runChunked(missing, (chunk) => readCacheChunk(chunk, lang));
    const found = new Map(rows.map((r) => [r.source_text, r.translated_text]));
    missing.forEach((text) => { if (found.has(text)) cache.set(text, found.get(text)); });
  }

  const stillMissing = [];
  const stillMissingIdx = [];
  missingIdx.forEach((i) => {
    const text = texts[i];
    if (cache.has(text)) result[i] = cache.get(text);
    else { stillMissing.push(text); stillMissingIdx.push(i); }
  });

  if (stillMissing.length) {
    const translated = await runChunked(stillMissing, (chunk) => fetchChunk(chunk, lang));
    stillMissingIdx.forEach((i, j) => {
      const value = translated[j] ?? texts[i];
      cache.set(texts[i], value);
      result[i] = value;
    });
  }

  return result;
}
