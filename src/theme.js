const STORAGE_KEY = 'ax-accent-color';
export const DEFAULT_ACCENT = '#e8ff00';

// A curated set of colors that stay legible against the app's dark
// background and against black text (used on solid accent buttons) — not
// just "any hex", to avoid someone picking a color that makes buttons
// unreadable.
export const PRESET_ACCENTS = [
  '#e8ff00', // lime (default)
  '#00e5ff', // cyan
  '#ff9500', // orange
  '#ff2d78', // pink
  '#b46bff', // purple
  '#ff4444', // red
  '#4d8dff', // blue
  '#f0f0f0', // white
];

export function getAccentColor() {
  return localStorage.getItem(STORAGE_KEY) || DEFAULT_ACCENT;
}

// Applies immediately (no reload) and persists locally — called on every
// selection, and also the sole thing initThemeFromStorage does at startup.
export function applyAccentColor(color) {
  document.documentElement.style.setProperty('--accent', color);
  localStorage.setItem(STORAGE_KEY, color);
  renderAccentUI();
}

export function initThemeFromStorage() {
  document.documentElement.style.setProperty('--accent', getAccentColor());
  const theme = findBgTheme(getBgThemeId());
  const root = document.documentElement.style;
  root.setProperty('--bg', theme.bg);
  root.setProperty('--surface', theme.surface);
  root.setProperty('--surface2', theme.surface2);
}

export function renderAccentUI() {
  const swatchContainer = document.getElementById('accent-swatches');
  if (!swatchContainer) return;
  const current = getAccentColor().toLowerCase();
  swatchContainer.innerHTML = PRESET_ACCENTS.map(c =>
    `<button type="button" class="accent-swatch${c.toLowerCase() === current ? ' active' : ''}" style="background:${c};" onclick="selectAccentColor('${c}')" aria-label="${c}"></button>`
  ).join('');
  const picker = document.getElementById('accent-color-picker');
  if (picker) picker.value = current;
}

// Background is a curated set of coordinated (bg, surface, surface2) triples
// rather than a free color picker — a free picker risks someone choosing a
// light color, which would make the app's fixed light text (--text/--muted)
// unreadable since text color doesn't auto-adjust to background. Presets
// guarantee every option stays dark enough to read.
const BG_STORAGE_KEY = 'ax-bg-theme';
export const DEFAULT_BG_THEME = 'black';

export const PRESET_BG_THEMES = [
  { id: 'black', bg: '#0a0a0a', surface: '#111111', surface2: '#1a1a1a' },
  { id: 'charcoal', bg: '#121212', surface: '#1c1c1c', surface2: '#262626' },
  { id: 'navy', bg: '#0a0e1a', surface: '#111827', surface2: '#1a2235' },
  { id: 'forest', bg: '#0a120d', surface: '#111f16', surface2: '#1a2e20' },
  { id: 'maroon', bg: '#140a0a', surface: '#201212', surface2: '#2e1a1a' },
  { id: 'purple', bg: '#0f0a14', surface: '#1a1220', surface2: '#241a2e' },
];

export function getBgThemeId() {
  return localStorage.getItem(BG_STORAGE_KEY) || DEFAULT_BG_THEME;
}

function findBgTheme(id) {
  return PRESET_BG_THEMES.find(t => t.id === id) || PRESET_BG_THEMES[0];
}

export function applyBgTheme(id) {
  const theme = findBgTheme(id);
  const root = document.documentElement.style;
  root.setProperty('--bg', theme.bg);
  root.setProperty('--surface', theme.surface);
  root.setProperty('--surface2', theme.surface2);
  localStorage.setItem(BG_STORAGE_KEY, theme.id);
  renderBgThemeUI();
}

export function renderBgThemeUI() {
  const container = document.getElementById('bg-theme-swatches');
  if (!container) return;
  const current = getBgThemeId();
  container.innerHTML = PRESET_BG_THEMES.map(t =>
    `<button type="button" class="bg-theme-swatch${t.id === current ? ' active' : ''}" style="background:${t.bg};border-color:${t.surface2};" onclick="selectBgTheme('${t.id}')" aria-label="${t.id}"></button>`
  ).join('');
}
