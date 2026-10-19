import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE, isSupported, getLanguageMeta } from './languages.js';

import en from './locales/en.js';

// Keep English in the entry bundle as the immediate fallback, and fetch
// another dictionary only when that language is selected. Importing every
// locale statically made all 30 dictionaries part of the app's first load.
const localeLoaders = import.meta.glob('./locales/*.js');
const LOCALES = { en };
const localePromises = new Map();

function loadLocale(code) {
  if (LOCALES[code]) return Promise.resolve(LOCALES[code]);
  if (!localePromises.has(code)) {
    const loader = localeLoaders[`./locales/${code}.js`];
    if (!loader) return Promise.resolve(LOCALES.en);
    localePromises.set(code, loader().then((module) => {
      LOCALES[code] = module.default;
      return LOCALES[code];
    }).catch((error) => {
      localePromises.delete(code);
      console.error(`[i18n] Failed to load ${code}; using English`, error);
      return LOCALES.en;
    }));
  }
  return localePromises.get(code);
}

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
  const selectedLanguage = currentLanguage;
  const meta = getLanguageMeta(selectedLanguage);
  document.documentElement.lang = selectedLanguage === 'zh-Hans' || selectedLanguage === 'zh-Hant' ? 'zh' : selectedLanguage;
  document.documentElement.dir = meta.rtl ? 'rtl' : 'ltr';
  if (persist) {
    localStorage.setItem(STORAGE_KEY, selectedLanguage);
    localStorage.setItem(STORAGE_CHOSEN_KEY, '1');
  }
  return loadLocale(selectedLanguage).then(() => {
    // A user can switch languages again while this dictionary is loading.
    // Only the latest selection should repaint the page or notify listeners.
    if (selectedLanguage !== currentLanguage) return;
    applyTranslations(document);
    // Static (data-i18n) text is handled above, but already-rendered dynamic
    // content listens for this event so it can refresh in the selected language.
    window.dispatchEvent(new CustomEvent('ax:languagechange', { detail: { lang: selectedLanguage } }));
  });
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
