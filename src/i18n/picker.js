import { SUPPORTED_LANGUAGES } from './languages.js';
import { getLanguage, setLanguage, detectLanguage, hasChosenLanguage } from './index.js';

function renderList(highlightCode) {
  const container = document.getElementById('language-list');
  container.innerHTML = SUPPORTED_LANGUAGES.map((lang) => `
    <button class="language-row${lang.code === highlightCode ? ' active' : ''}" data-code="${lang.code}" type="button">
      ${lang.nativeName}
    </button>
  `).join('');
}

// On a true first visit there's no language chosen yet, so the picker is a
// forced step (no way to dismiss without picking). Once a language exists —
// reopened later via the globe icon or Account's "Change" — it's just a
// normal dismissible dialog, since the user might have opened it by mistake.
export function openLanguagePicker() {
  renderList(getLanguage() || detectLanguage());
  document.getElementById('language-modal').classList.add('open');
  document.getElementById('language-close-btn').style.display = hasChosenLanguage() ? 'flex' : 'none';
  document.body.style.overflow = 'hidden';
}

function closeLanguagePicker() {
  if (!hasChosenLanguage()) return; // can't dismiss the first-visit picker without choosing
  document.getElementById('language-modal').classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('language-list').addEventListener('click', (e) => {
  const btn = e.target.closest('.language-row');
  if (!btn) return;
  setLanguage(btn.dataset.code);
  document.getElementById('language-modal').classList.remove('open');
  document.body.style.overflow = '';
});

document.getElementById('language-close-btn').addEventListener('click', closeLanguagePicker);
document.getElementById('language-modal').addEventListener('click', (e) => {
  if (e.target.id === 'language-modal') closeLanguagePicker();
});

const changeLanguageBtn = document.getElementById('change-language-btn');
if (changeLanguageBtn) {
  changeLanguageBtn.addEventListener('click', openLanguagePicker);
}

const globeBtn = document.getElementById('globe-lang-btn');
if (globeBtn) {
  globeBtn.addEventListener('click', openLanguagePicker);
}
