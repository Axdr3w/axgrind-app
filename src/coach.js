import { t, getLanguage } from './i18n/index.js';
import { getLanguageMeta } from './i18n/languages.js';
import { fetchSavedChats, saveChat, deleteSavedChat } from './api/coach.js';

let chatHistory = [];
const chatMessages = document.getElementById('chat-messages');

// Keeps only the most recent exchanges in the payload sent to the API —
// without this, a long conversation resends its entire history as input
// tokens on every single message, so cost (and eventually context length)
// grows unbounded with conversation length instead of staying flat.
const MAX_HISTORY_MESSAGES = 20; // ~10 user/assistant exchanges
function trimHistory() {
  if (chatHistory.length > MAX_HISTORY_MESSAGES) {
    chatHistory = chatHistory.slice(-MAX_HISTORY_MESSAGES);
  }
}

let currentUserId = null;
let showingSaved = false;
let savedChats = [];

export function initCoach(userId) {
  currentUserId = userId;
}

export function teardownCoach() {
  currentUserId = null;
  savedChats = [];
  showingSaved = false;
}

function timeNow() { return new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}); }

// Chat replies are free-form model output, not developer-authored literals —
// same as forum.js/dm.js, they must be escaped before going into innerHTML.
function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatMsgBody(text) {
  return escapeHtml(text).replace(/\n/g,'<br>').replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>');
}

// `question` is only passed for AI replies — it's the user message that
// prompted this specific answer, stashed on the bubble so the Save button
// can send the pair without re-deriving it from chat order.
function appendMsg(role, text, question) {
  const div = document.createElement('div');
  div.className = `msg ${role}`;
  const saveBtn = role === 'ai' && question
    ? `<button type="button" class="chat-save-btn" onclick="saveChatMessage(this)">💾 ${t('coach.saveBtn')}</button>`
    : '';
  div.innerHTML = `<div class="msg-bubble">${formatMsgBody(text)}</div>${saveBtn}<div class="msg-time">${timeNow()}</div>`;
  if (role === 'ai' && question) {
    div.dataset.question = question;
    div.dataset.answer = text;
  }
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTyping() {
  const div = document.createElement('div');
  div.className = 'msg ai'; div.id = 'typing-indicator';
  div.innerHTML = `<div class="typing-bubble"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div>`;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTyping() { const t = document.getElementById('typing-indicator'); if (t) t.remove(); }

export async function sendChatMessage() {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text) return;
  input.value = ''; input.style.height = '40px';
  document.getElementById('chat-send-btn').disabled = true;
  appendMsg('user', text);
  chatHistory.push({role:'user', content: text});
  trimHistory();
  showTyping();
  try {
    const resp = await fetch('/.netlify/functions/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: chatHistory, targetLangName: getLanguageMeta(getLanguage()).nativeName, userId: currentUserId })
    });
    const data = await resp.json();
    if (data.error) {
      if (resp.status === 429 && data.error.message === 'DAILY_LIMIT_REACHED') {
        removeTyping();
        appendMsg('ai', t('coach.dailyLimitReached', { limit: data.error.limit }));
        document.getElementById('chat-send-btn').disabled = false;
        return;
      }
      throw new Error(data.error.message);
    }
    const reply = (data.content || []).map(b => b.text || '').join('').trim();
    removeTyping();
    appendMsg('ai', reply, text);
    chatHistory.push({role:'assistant', content: reply});
    trimHistory();
  } catch (err) {
    removeTyping();
    appendMsg('ai', t('coach.connectionError'));
  }
  document.getElementById('chat-send-btn').disabled = false;
}

export function sendChip(btn) { document.getElementById('chat-input').value = btn.textContent; sendChatMessage(); }
export function chatKeydown(e) { if (e.key==='Enter' && !e.shiftKey) { e.preventDefault(); sendChatMessage(); } }
export function autoGrow(el) { el.style.height='40px'; el.style.height=Math.min(el.scrollHeight,110)+'px'; }

export async function saveChatMessage(btn) {
  if (!currentUserId) return;
  const msgDiv = btn.closest('.msg');
  const question = msgDiv.dataset.question;
  const answer = msgDiv.dataset.answer;
  btn.disabled = true;
  try {
    await saveChat(currentUserId, question, answer);
    btn.textContent = `✓ ${t('coach.savedBtn')}`;
    btn.classList.add('saved');
  } catch (err) {
    btn.disabled = false;
    alert(err.isLimitReached ? t('coach.savedLimitReached') : t('coach.saveError', { reason: err.message }));
  }
}

function renderSavedView() {
  const container = document.getElementById('chat-saved-list');
  const countEl = document.getElementById('chat-saved-count');
  if (!container || !countEl) return;
  countEl.textContent = t('coach.savedCount', { count: savedChats.length });
  if (!savedChats.length) {
    container.innerHTML = `<div style="text-align:center;padding:40px;color:var(--muted);font-size:13px;">${t('coach.noSavedChats')}</div>`;
    return;
  }
  container.innerHTML = savedChats.map(s => `
    <div class="saved-chat-card">
      <div class="saved-chat-q">${escapeHtml(s.question)}</div>
      <div class="saved-chat-a">${formatMsgBody(s.answer)}</div>
      <button type="button" class="saved-chat-delete" onclick="deleteSavedChatItem('${s.id}')">🗑 ${t('coach.deleteBtn')}</button>
    </div>
  `).join('');
}

async function refreshSavedView() {
  try {
    savedChats = await fetchSavedChats(currentUserId);
  } catch {
    savedChats = [];
  }
  renderSavedView();
}

export async function toggleSavedView() {
  showingSaved = !showingSaved;
  document.getElementById('chat-live-view').style.display = showingSaved ? 'none' : 'flex';
  document.getElementById('chat-saved-view').style.display = showingSaved ? 'block' : 'none';
  document.getElementById('chat-saved-toggle-label').textContent = t(showingSaved ? 'coach.backToChat' : 'coach.viewSaved');
  if (showingSaved) await refreshSavedView();
}

export async function deleteSavedChatItem(id) {
  try {
    await deleteSavedChat(id);
    savedChats = savedChats.filter(s => s.id !== id);
    renderSavedView();
  } catch (err) {
    alert(t('coach.saveError', { reason: err.message }));
  }
}

window.addEventListener('ax:languagechange', () => {
  document.getElementById('chat-saved-toggle-label').textContent = t(showingSaved ? 'coach.backToChat' : 'coach.viewSaved');
  if (showingSaved) renderSavedView();
});
