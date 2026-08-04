import { getExerciseInfo, getAllExerciseNames } from './exercise-info.js';
import { WORKOUTS } from './workouts-data.js';
import { SPORTS_WORKOUTS } from './sports-data.js';
import { PROGRAM_WORKOUTS } from './programs-data.js';
import { t, getLanguage } from './i18n/index.js';
import { translateBatch } from './i18n/content-translate.js';

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

let allNames = [];
let currentFiltered = [];
// English display-name/caption -> translated, for the current language.
// Kept separate from the raw `name` values used for lookups/filtering, so
// exercise-info.js's (English-internal) caption pipeline is never affected.
let translatedMap = new Map();
let libGen = 0;

function renderFilteredVideos(names) {
  currentFiltered = names;
  const container = document.getElementById('video-library');
  document.getElementById('video-count').textContent = t('videos.exerciseCount', { count: names.length });
  if (names.length === 0) {
    container.innerHTML = `<div style="text-align:center;padding:40px;color:var(--muted);font-size:13px;">${t('videos.noMatches')}</div>`;
    return;
  }
  container.innerHTML = names.map(name => {
    const info = getExerciseInfo(name);
    const displayName = translatedMap.get(info.name) ?? info.name;
    const displayCaption = translatedMap.get(info.caption) ?? info.caption;
    return `
      <div class="exercise-card">
        <div class="exercise-card-name">${escapeHtml(displayName)}</div>
        <div class="exercise-card-caption">${escapeHtml(displayCaption)}</div>
        <a class="exercise-card-link" href="${info.searchUrl}" target="_blank" rel="noopener">${t('modal.watchVideo')}</a>
      </div>
    `;
  }).join('');
}

function triggerLibraryTranslation() {
  const lang = getLanguage();
  if (lang === 'en') { translatedMap = new Map(); return; }
  const myGen = ++libGen;
  const texts = [];
  allNames.forEach(name => {
    const info = getExerciseInfo(name);
    texts.push(info.name);
    texts.push(info.caption);
  });
  translateBatch(texts, lang).then((translated) => {
    if (myGen !== libGen) return; // language changed again before this resolved
    const map = new Map();
    texts.forEach((text, i) => map.set(text, translated[i]));
    translatedMap = map;
    renderFilteredVideos(currentFiltered);
  });
}

export function renderVideoLibrary() {
  allNames = getAllExerciseNames([...WORKOUTS, ...SPORTS_WORKOUTS, ...PROGRAM_WORKOUTS]);
  renderFilteredVideos(allNames);
  triggerLibraryTranslation();
}

export function filterVideoLibrary(query) {
  const q = query.trim().toLowerCase();
  // Matches against the English name OR its translated counterpart (once
  // resolved), so a non-English speaker typing in their own language still
  // finds results instead of only matching untranslated English text.
  const filtered = q
    ? allNames.filter(n => {
        if (n.toLowerCase().includes(q)) return true;
        const translated = translatedMap.get(getExerciseInfo(n).name);
        return translated ? translated.toLowerCase().includes(q) : false;
      })
    : allNames;
  renderFilteredVideos(filtered);
}

export function openExerciseInfo(name) {
  const info = getExerciseInfo(name);
  const displayName = translatedMap.get(info.name) ?? info.name;
  const displayCaption = translatedMap.get(info.caption) ?? info.caption;
  document.getElementById('exercise-modal-title').textContent = displayName;
  document.getElementById('exercise-modal-caption').textContent = displayCaption;
  document.getElementById('exercise-modal-video-link').href = info.searchUrl;
  document.getElementById('exercise-modal').classList.add('open');
  document.body.style.overflow = 'hidden';

  const lang = getLanguage();
  if (lang === 'en' || translatedMap.has(info.name)) return;
  // Exercise wasn't in the library-wide translation batch (e.g. opened via
  // data-exercise from a workout modal before the library page ever loaded)
  // — translate just this one on demand.
  translateBatch([info.name, info.caption], lang).then(([tName, tCaption]) => {
    translatedMap.set(info.name, tName);
    translatedMap.set(info.caption, tCaption);
    if (document.getElementById('exercise-modal').classList.contains('open')
        && document.getElementById('exercise-modal-title').textContent === info.name) {
      document.getElementById('exercise-modal-title').textContent = tName;
      document.getElementById('exercise-modal-caption').textContent = tCaption;
    }
  });
}

export function closeExerciseInfo() {
  document.getElementById('exercise-modal').classList.remove('open');
  document.body.style.overflow = '';
}

window.addEventListener('ax:languagechange', () => {
  translatedMap = new Map();
  renderFilteredVideos(currentFiltered);
  triggerLibraryTranslation();
});
