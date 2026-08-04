// code: BCP-47-ish tag used as the locale-file key and Intl locale argument.
// nativeName: shown in the picker, always in that language's own script —
// never the English name.
export const SUPPORTED_LANGUAGES = [
  { code: 'en', nativeName: 'English', rtl: false },
  { code: 'es', nativeName: 'Español', rtl: false },
  { code: 'pt', nativeName: 'Português', rtl: false },
  { code: 'fr', nativeName: 'Français', rtl: false },
  { code: 'de', nativeName: 'Deutsch', rtl: false },
  { code: 'it', nativeName: 'Italiano', rtl: false },
  { code: 'nl', nativeName: 'Nederlands', rtl: false },
  { code: 'pl', nativeName: 'Polski', rtl: false },
  { code: 'ru', nativeName: 'Русский', rtl: false },
  { code: 'uk', nativeName: 'Українська', rtl: false },
  { code: 'tr', nativeName: 'Türkçe', rtl: false },
  { code: 'el', nativeName: 'Ελληνικά', rtl: false },
  { code: 'cs', nativeName: 'Čeština', rtl: false },
  { code: 'sv', nativeName: 'Svenska', rtl: false },
  { code: 'ro', nativeName: 'Română', rtl: false },
  { code: 'ar', nativeName: 'العربية', rtl: true },
  { code: 'he', nativeName: 'עברית', rtl: true },
  { code: 'fa', nativeName: 'فارسی', rtl: true },
  { code: 'ur', nativeName: 'اردو', rtl: true },
  { code: 'hi', nativeName: 'हिन्दी', rtl: false },
  { code: 'bn', nativeName: 'বাংলা', rtl: false },
  { code: 'id', nativeName: 'Bahasa Indonesia', rtl: false },
  { code: 'vi', nativeName: 'Tiếng Việt', rtl: false },
  { code: 'th', nativeName: 'ไทย', rtl: false },
  { code: 'zh-Hans', nativeName: '简体中文', rtl: false },
  { code: 'zh-Hant', nativeName: '繁體中文', rtl: false },
  { code: 'ja', nativeName: '日本語', rtl: false },
  { code: 'ko', nativeName: '한국어', rtl: false },
  { code: 'sw', nativeName: 'Kiswahili', rtl: false },
  { code: 'tl', nativeName: 'Filipino', rtl: false },
];

export const DEFAULT_LANGUAGE = 'en';

export function isSupported(code) {
  return SUPPORTED_LANGUAGES.some((l) => l.code === code);
}

export function getLanguageMeta(code) {
  return SUPPORTED_LANGUAGES.find((l) => l.code === code) ?? SUPPORTED_LANGUAGES[0];
}
