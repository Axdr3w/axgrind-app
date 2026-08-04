import { BRAIN_CATEGORIES, BRAIN_ARTICLES } from './brain-data.js';
import { t, getLanguage } from './i18n/index.js';
import { translateBatch } from './i18n/content-translate.js';
import { completeArticle, fetchReadArticleIds } from './api/xp.js';
import { getRankMap, invalidateRankCache } from './rank-cache.js';

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

let currentUserId = null;
let readArticleIds = new Set();
let currentArticle = null;
let currentTrMap = null; // Map<originalText, translatedText>
let modalMessage = null;
let modalMessageError = false;

// The Brain category browse list lives inside the "Brain" tab of Plans
// (next to Strength/Sport-Specific/Programs) — these ids point at that tab's
// markup in index.html.
let selectedCategory = null; // category id, or null = show the category browse list
let listGen = 0;
const LIST_ID = 'plans-brain-category-list';
const VIEW_ID = 'plans-brain-article-view';
const TITLE_ID = 'plans-brain-category-title';
const ARTICLE_LIST_ID = 'plans-brain-article-list';

export async function initBrain(userId) {
  currentUserId = userId;
  try {
    readArticleIds = await fetchReadArticleIds(userId);
  } catch {
    readArticleIds = new Set();
  }
}

export function teardownBrain() {
  currentUserId = null;
  readArticleIds = new Set();
}

function refreshRankDisplay() {
  invalidateRankCache();
  if (!currentUserId) return;
  getRankMap(true).then((map) => {
    const rankEl = document.getElementById('account-rank-display');
    if (rankEl) {
      const r = map.get(currentUserId);
      rankEl.textContent = r ? '#' + r : '—';
    }
  });
}

function categoryListRow(cat) {
  const count = BRAIN_ARTICLES.filter(a => a.category === cat.id).length;
  return `
    <div class="sport-list-row" onclick="selectBrainCategory('${cat.id}')">
      <div class="sport-list-icon">${cat.icon}</div>
      <div class="sport-list-info">
        <div class="sport-list-name">${escapeHtml(t('brain.category.' + cat.id))}</div>
        <div class="sport-list-desc">${escapeHtml(t('brain.articleCount', { count }))}</div>
      </div>
      <div class="sport-list-arrow">→</div>
    </div>
  `;
}

// Category names are Tier-1 static translations (already resolved
// synchronously via t()), so — unlike the sport browse list's dev-authored
// English sort — this can sort directly by the displayed, localized name.
function renderBrainCategoryList() {
  const container = document.getElementById(LIST_ID);
  if (!container) return;
  const sorted = [...BRAIN_CATEGORIES].sort((a, b) =>
    t('brain.category.' + a.id).localeCompare(t('brain.category.' + b.id))
  );
  container.innerHTML = sorted.map(categoryListRow).join('');
}

function articleCard(article, tr) {
  const title = tr?.get(article.title) ?? article.title;
  const excerpt = tr?.get(article.excerpt) ?? article.excerpt;
  const cat = BRAIN_CATEGORIES.find(c => c.id === article.category);
  const isRead = readArticleIds.has(article.id);
  return `
    <div class="exercise-card brain-article-card" onclick="openArticle('${article.id}')">
      <div class="brain-card-top">
        <span class="badge">${cat?.icon ?? ''} ${escapeHtml(t('brain.category.' + article.category))}</span>
        ${isRead ? `<span class="badge badge-level-beginner">✓ ${t('brain.readBadge')}</span>` : ''}
      </div>
      <div class="exercise-card-name">${escapeHtml(title)}</div>
      <div class="exercise-card-caption">${escapeHtml(excerpt)}</div>
      <div class="brain-card-meta">📖 ${article.readMinutes} ${t('brain.minRead')} · +25 XP</div>
    </div>
  `;
}

// The entry point called on init/login/logout/language-change/tab-select —
// refreshes whichever of category-list/article-list is currently showing.
export function renderBrainArticles() {
  if (!selectedCategory) {
    renderBrainCategoryList();
    return;
  }
  const container = document.getElementById(ARTICLE_LIST_ID);
  if (!container) return;
  const filtered = BRAIN_ARTICLES.filter(a => a.category === selectedCategory);
  const myGen = ++listGen;
  container.innerHTML = filtered.map(a => articleCard(a, null)).join('');

  const lang = getLanguage();
  if (lang === 'en') return;
  const texts = [];
  filtered.forEach(a => { texts.push(a.title); texts.push(a.excerpt); });
  translateBatch(texts, lang).then((translated) => {
    if (myGen !== listGen) return;
    const map = new Map();
    texts.forEach((text, i) => map.set(text, translated[i]));
    container.innerHTML = filtered.map(a => articleCard(a, map)).join('');
  });
}

export function selectBrainCategory(id) {
  selectedCategory = id;
  document.getElementById(LIST_ID).style.display = 'none';
  document.getElementById(VIEW_ID).style.display = 'block';
  const cat = BRAIN_CATEGORIES.find(c => c.id === id);
  document.getElementById(TITLE_ID).textContent = cat ? `${cat.icon} ${t('brain.category.' + id)}` : '';
  renderBrainArticles();
}

export function backToBrainCategories() {
  selectedCategory = null;
  document.getElementById(VIEW_ID).style.display = 'none';
  document.getElementById(LIST_ID).style.display = 'block';
  renderBrainCategoryList();
}

function bodyParagraphs(body) {
  return body.split(/\n\n+/).filter(p => p.trim());
}

function renderArticleModal(article, tr) {
  const pick = (text) => tr?.get(text) ?? text;
  const cat = BRAIN_CATEGORIES.find(c => c.id === article.category);
  document.getElementById('article-modal-title').textContent = `${cat?.icon ?? ''} ${pick(article.title)}`;
  document.getElementById('article-modal-meta').textContent = `📖 ${article.readMinutes} ${t('brain.minRead')} · ${t('brain.category.' + article.category)}`;
  const paragraphs = bodyParagraphs(article.body);
  const bodyHtml = paragraphs.map(p => `<p class="brain-article-p">${escapeHtml(pick(p))}</p>`).join('');
  document.getElementById('article-modal-text').innerHTML = bodyHtml;

  const isRead = readArticleIds.has(article.id);
  const msg = modalMessage ? `<div class="day-session-msg${modalMessageError ? ' error' : ''}">${escapeHtml(modalMessage)}</div>` : '';
  const footer = document.getElementById('article-modal-footer');
  if (isRead) {
    footer.innerHTML = `<button type="button" class="btn-follow" disabled>✓ ${t('brain.readBadge')}</button>${msg}`;
  } else {
    footer.innerHTML = `<button type="button" class="btn-accent btn-full" onclick="markArticleRead('${article.id}')">${t('brain.markAsRead')}</button>${msg}`;
  }
}

let modalGen = 0;

export function openArticle(id) {
  const article = BRAIN_ARTICLES.find(a => a.id === id);
  if (!article) return;
  currentArticle = article;
  currentTrMap = null;
  modalMessage = null;
  modalMessageError = false;

  const myGen = ++modalGen;
  renderArticleModal(article, null);
  document.getElementById('article-modal').classList.add('open');
  document.body.style.overflow = 'hidden';

  const lang = getLanguage();
  if (lang === 'en') return;
  const texts = [article.title, article.excerpt, ...bodyParagraphs(article.body)];
  translateBatch(texts, lang).then((translated) => {
    if (myGen !== modalGen) return;
    const map = new Map();
    texts.forEach((text, i) => map.set(text, translated[i]));
    currentTrMap = map;
    renderArticleModal(article, map);
  });
}

export function closeArticle() {
  document.getElementById('article-modal').classList.remove('open');
  document.body.style.overflow = '';
  modalGen++;
  currentArticle = null;
  currentTrMap = null;
}

export async function markArticleRead(id) {
  if (!currentUserId || !currentArticle) return;
  try {
    await completeArticle(currentUserId, id);
    readArticleIds.add(id);
    modalMessage = null;
    modalMessageError = false;
    refreshRankDisplay();
    renderBrainArticles();
  } catch (err) {
    modalMessage = err.message;
    modalMessageError = true;
  }
  renderArticleModal(currentArticle, currentTrMap);
}

window.addEventListener('ax:languagechange', () => {
  if (selectedCategory) {
    const cat = BRAIN_CATEGORIES.find(c => c.id === selectedCategory);
    const titleEl = document.getElementById(TITLE_ID);
    if (titleEl) titleEl.textContent = cat ? `${cat.icon} ${t('brain.category.' + selectedCategory)}` : '';
  }
  renderBrainArticles();
});
