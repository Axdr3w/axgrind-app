import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE, isSupported, getLanguageMeta } from './languages.js';

import en from './locales/en.js';
import es from './locales/es.js';
import pt from './locales/pt.js';
import fr from './locales/fr.js';
import de from './locales/de.js';
import it from './locales/it.js';
import nl from './locales/nl.js';
import pl from './locales/pl.js';
import ru from './locales/ru.js';
import uk from './locales/uk.js';
import tr from './locales/tr.js';
import el from './locales/el.js';
import cs from './locales/cs.js';
import sv from './locales/sv.js';
import ro from './locales/ro.js';
import ar from './locales/ar.js';
import he from './locales/he.js';
import fa from './locales/fa.js';
import ur from './locales/ur.js';
import hi from './locales/hi.js';
import bn from './locales/bn.js';
import id from './locales/id.js';
import vi from './locales/vi.js';
import th from './locales/th.js';
import zhHans from './locales/zh-Hans.js';
import zhHant from './locales/zh-Hant.js';
import ja from './locales/ja.js';
import ko from './locales/ko.js';
import sw from './locales/sw.js';
import tl from './locales/tl.js';

const LOCALES = {
  en, es, pt, fr, de, it, nl, pl, ru, uk, tr, el, cs, sv, ro,
  ar, he, fa, ur, hi, bn, id, vi, th,
  'zh-Hans': zhHans, 'zh-Hant': zhHant,
  ja, ko, sw, tl,
};

const STORAGE_KEY = 'ax-lang';
const STORAGE_CHOSEN_KEY = 'ax-lang-chosen';

let currentLanguage = DEFAULT_LANGUAGE;

// navigator.language looks like "es-MX", "zh-CN", "pt-BR", "en-US" — map down
// to one of our supported codes, handling the two locales (zh, and implicitly
// pt) where region actually changes which variant we ship. Returns null when
// the browser's language genuinely isn't one we support (callers use that to
// tell "confidently detected" apart from "have to ask").
export function detectLanguage() {
  const raw = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
  if (raw.startsWith('zh')) {
    if (raw.includes('tw') || raw.includes('hk') || raw.includes('mo') || raw.includes('hant')) return 'zh-Hant';
    return 'zh-Hans';
  }
  const primary = raw.split('-')[0];
  if (isSupported(primary)) return primary;
  return null;
}

export function getLanguage() {
  return currentLanguage;
}

export function hasChosenLanguage() {
  return !!localStorage.getItem(STORAGE_CHOSEN_KEY);
}

export function setLanguage(code, { persist = true } = {}) {
  currentLanguage = isSupported(code) ? code : DEFAULT_LANGUAGE;
  const meta = getLanguageMeta(currentLanguage);
  document.documentElement.lang = currentLanguage === 'zh-Hans' || currentLanguage === 'zh-Hant' ? 'zh' : currentLanguage;
  document.documentElement.dir = meta.rtl ? 'rtl' : 'ltr';
  if (persist) {
    localStorage.setItem(STORAGE_KEY, currentLanguage);
    localStorage.setItem(STORAGE_CHOSEN_KEY, '1');
  }
  applyTranslations(document);
  // Static (data-i18n) text is handled above, but already-rendered dynamic
  // content (workout cards, the exercise library) was built with whatever
  // language was active at the time — it doesn't re-render on its own just
  // because the language changed later. Modules with translated dynamic
  // content listen for this to refresh themselves.
  window.dispatchEvent(new CustomEvent('ax:languagechange', { detail: { lang: currentLanguage } }));
}

export function initLanguageFromStorage() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && isSupported(stored)) {
    setLanguage(stored, { persist: false });
    return;
  }
  // First-ever visit — nothing stored yet. If the browser reports a language
  // we ship, adopt it silently and remember it as chosen so the picker never
  // has to force itself open just to confirm what we already know. Only a
  // genuine detection failure (browser language isn't one we support) should
  // still fall through to the forced picker in main.js.
  const detected = detectLanguage();
  if (detected) {
    setLanguage(detected, { persist: true });
  } else {
    setLanguage(DEFAULT_LANGUAGE, { persist: false });
  }
}

function lookup(key) {
  const table = LOCALES[currentLanguage] || LOCALES[DEFAULT_LANGUAGE];
  return table[key] ?? LOCALES[DEFAULT_LANGUAGE][key] ?? key;
}

export function t(key, vars) {
  let str = lookup(key);
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      str = str.replaceAll(`{${k}}`, v);
    }
  }
  return str;
}

export function applyTranslations(root = document) {
  root.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  root.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
  root.querySelectorAll('[data-i18n-title]').forEach((el) => {
    el.title = t(el.dataset.i18nTitle);
  });
}

export { SUPPORTED_LANGUAGES };
