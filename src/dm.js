import {
  fetchConversations,
  findOrCreateConversation,
  fetchMessages,
  sendMessage,
  markConversationRead,
  deleteMessage,
  reportDmMessage,
  blockUser,
  unblockUser,
  fetchBlockedUsers,
} from './api/dm.js';
import { findUserByHandle } from './api/profile.js';
import { getRankMap } from './rank-cache.js';
import { t, getLanguage } from './i18n/index.js';
import { escapeHtml } from './html-utils.js';

let currentUserId = null;
let activeConversation = null;
let activeOtherUserId = null;
let rankMap = new Map();
let blockedIds;

async function refreshBlockedIds() {
  try {
    const rows = await fetchBlockedUsers(currentUserId);
    blockedIds = new Set(rows.map((r) => r.blocked_id));
  } catch (err) {
    if (!blockedIds) blockedIds = new Set();
    console.error('refreshBlockedIds failed, keeping last-known blocked list', err);
    return;
  }
}

function rankBadge(userId) {
  const rank = rankMap.get(userId);
  return rank ? `<span class="rank-badge">#${rank}</span>` : '';
}


function timeNow() { return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); }
function relativeTime(iso) {
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  const rtf = new Intl.RelativeTimeFormat(getLanguage(), { numeric: 'auto', style: 'narrow' });
  if (mins < 1) return rtf.format(0, 'second');
  if (mins < 60) return rtf.format(-mins, 'minute');
  const hours = Math.floor(mins / 60);
  if (hours < 24) return rtf.format(-hours, 'hour');
  return rtf.format(-Math.floor(hours / 24), 'day');
}

function setListMessage(text, isError) {
  const el = document.getElementById('dm-list-message');
  el.textContent = text;
  el.style.color = isError ? '#ff6040' : '#4ade80';
}

async function renderConversationList() {
  const container = document.getElementById('dm-conversation-list');
  container.innerHTML = `<div style="text-align:center;padding:20px;color:var(--muted);font-size:12px;">${t('common.loading')}</div>`;
  let conversations;
  try {
    [conversations, rankMap] = await Promise.all([fetchConversations(currentUserId), getRankMap().catch(() => rankMap)]);
  } catch (err) {
    container.innerHTML = `<div style="text-align:center;padding:20px;color:#ff6040;font-size:12px;">${t('messages.errorLoad', { reason: err.message })}</div>`;
    return;
  }
  conversations = conversations.filter((c) => !blockedIds.has(c.otherUser?.id));
  if (conversations.length === 0) {
    container.innerHTML = `<div class="empty-fade" style="text-align:center;padding:30px;color:var(--muted);font-size:13px;">${t('messages.emptyConversations')}</div>`;
    return;
  }
  container.innerHTML = conversations.map((c) => {
    const name = escapeHtml(c.otherUser?.display_name || c.otherUser?.handle || t('common.memberFallback'));
    const preview = c.lastMessage ? escapeHtml(c.lastMessage.body).slice(0, 60) : t('messages.emptyPreview');
    const unread = c.lastMessage && !c.lastMessage.read_at && c.lastMessage.sender_id !== currentUserId;
    const time = c.lastMessage ? relativeTime(c.lastMessage.created_at) : '';
    return `
      <div class="dm-convo-row${unread ? ' unread' : ''}" data-id="${c.id}" data-other-name="${name}" data-other-id="${c.otherUser?.id ?? ''}">
        <div class="dm-convo-avatar">${name[0]?.toUpperCase() || 'A'}</div>
        <div class="dm-convo-info">
          <div class="dm-convo-name">${name}${rankBadge(c.otherUser?.id)}</div>
          <div class="dm-convo-preview">${preview}</div>
        </div>
        <div class="dm-convo-meta">
          ${time ? `<div class="dm-convo-time">${time}</div>` : ''}
          ${unread ? '<div class="dm-convo-dot"></div>' : ''}
        </div>
      </div>
    `;
  }).join('');
}

async function openConversation(conversationId, otherName, otherUserId) {
  activeConversation = conversationId;
  activeOtherUserId = otherUserId ?? null;
  document.getElementById('dm-list-view').style.display = 'none';
  document.getElementById('dm-thread-view').style.display = 'flex';
  // otherName round-trips through a dataset attribute, which HTML-decodes it —
  // so it's untrusted here even though it was escaped when first rendered.
  // textContent (not innerHTML) keeps it safe regardless.
  document.getElementById('dm-thread-name').textContent = otherName;
  document.getElementById('dm-thread-rank').innerHTML = rankBadge(activeOtherUserId);
  await renderThread();
  await markConversationRead(conversationId, currentUserId);
}

async function renderThread() {
  const container = document.getElementById('dm-messages');
  container.innerHTML = `<div style="text-align:center;padding:20px;color:var(--muted);font-size:12px;">${t('common.loading')}</div>`;
  let messages;
  try {
    messages = await fetchMessages(activeConversation);
  } catch (err) {
    container.innerHTML = `<div style="text-align:center;padding:20px;color:#ff6040;font-size:12px;">${t('messages.errorLoad', { reason: err.message })}</div>`;
    return;
  }
  container.innerHTML = messages.map((m) => {
    const isOwn = m.sender_id === currentUserId;
    const modBtn = isOwn
      ? `<button class="forum-mod-btn small" data-action="delete-dm" data-id="${m.id}">${t('common.delete')}</button>`
      : `<button class="forum-mod-btn small" data-action="report-dm" data-id="${m.id}">${t('common.report')}</button>`;
    return `
      <div class="msg ${isOwn ? 'user' : 'ai'}">
        <div class="msg-bubble">${escapeHtml(m.body)}</div>
        <div class="msg-time">${new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ${modBtn}</div>
      </div>
    `;
  }).join('');
  container.scrollTop = container.scrollHeight;
}

async function handleSendMessage() {
  const input = document.getElementById('dm-input');
  const body = input.value.trim();
  if (!body || !activeConversation) return;
  input.value = '';
  try {
    await sendMessage(activeConversation, currentUserId, body);
    await renderThread();
  } catch (err) {
    alert(t('messages.errorSend', { reason: err.message }));
  }
}

async function handleModAction(action, id) {
  if (action === 'delete-dm') {
    if (!confirm(t('messages.confirmDeleteMessage'))) return;
    await deleteMessage(id);
    await renderThread();
  } else if (action === 'report-dm') {
    const reason = prompt(t('common.reportPrompt'));
    if (reason === null) return;
    await reportDmMessage(currentUserId, id, reason);
    alert(t('common.reportedThanks'));
  }
}

async function handleNewMessage() {
  const input = document.getElementById('dm-new-handle');
  const handle = input.value.trim().replace(/^@/, '');
  if (!handle) return;
  setListMessage('', false);
  try {
    const target = await findUserByHandle(handle);
    if (!target) {
      setListMessage(t('messages.noUserFound'), true);
      return;
    }
    if (target.id === currentUserId) {
      setListMessage(t('messages.ownUsername'), true);
      return;
    }
    if (blockedIds.has(target.id)) {
      setListMessage(t('messages.userIsBlocked'), true);
      return;
    }
    const convo = await findOrCreateConversation(currentUserId, target.id);
    input.value = '';
    await renderConversationList();
    // openConversation sets this via textContent, so pass the raw name — not
    // pre-escaped, or it'll render literal "&amp;"-style entities on screen.
    await openConversation(convo.id, target.display_name || target.handle, target.id);
  } catch (err) {
    setListMessage(err.message, true);
  }
}

function backToList() {
  activeConversation = null;
  document.getElementById('dm-thread-view').style.display = 'none';
  document.getElementById('dm-list-view').style.display = 'block';
  renderConversationList();
}

async function handleBlockUser() {
  if (!activeOtherUserId) return;
  const name = document.getElementById('dm-thread-name').textContent;
  if (!confirm(t('messages.confirmBlock', { name }))) return;
  try {
    await blockUser(currentUserId, activeOtherUserId);
    await refreshBlockedIds();
    alert(t('messages.blockedThanks'));
    backToList();
  } catch (err) {
    alert(err.message);
  }
}

async function renderBlockedList() {
  const container = document.getElementById('dm-blocked-list');
  const rows = await fetchBlockedUsers(currentUserId).catch(() => []);
  if (rows.length === 0) {
    container.innerHTML = `<div style="text-align:center;padding:16px;color:var(--muted);font-size:12px;">${t('messages.noBlockedUsers')}</div>`;
    return;
  }
  container.innerHTML = rows.map((r) => {
    const name = escapeHtml(r.blocked?.display_name || r.blocked?.handle || t('common.memberFallback'));
    return `
      <div class="dm-convo-row" data-blocked-id="${r.blocked_id}" style="cursor:default;">
        <div class="dm-convo-avatar">${name[0]?.toUpperCase() || 'A'}</div>
        <div class="dm-convo-info"><div class="dm-convo-name">${name}</div></div>
        <button class="forum-mod-btn" data-action="unblock" data-id="${r.blocked_id}">${t('messages.unblock')}</button>
      </div>
    `;
  }).join('');
}

async function handleUnblock(blockedId) {
  await unblockUser(currentUserId, blockedId);
  await refreshBlockedIds();
  await renderBlockedList();
}

// Attached once at module load — initDMs() runs on every login.
document.getElementById('dm-new-message-btn').addEventListener('click', handleNewMessage);
document.getElementById('dm-send-btn').addEventListener('click', handleSendMessage);
document.getElementById('dm-input').addEventListener('keydown', (e) => { if (e.key === 'Enter') handleSendMessage(); });
document.getElementById('dm-back-btn').addEventListener('click', backToList);
document.getElementById('dm-block-btn').addEventListener('click', handleBlockUser);
document.getElementById('dm-conversation-list').addEventListener('click', (e) => {
  const row = e.target.closest('.dm-convo-row');
  if (row) openConversation(row.dataset.id, row.dataset.otherName, row.dataset.otherId);
});
document.getElementById('dm-messages').addEventListener('click', (e) => {
  const btn = e.target.closest('.forum-mod-btn');
  if (btn) handleModAction(btn.dataset.action, btn.dataset.id);
});
document.getElementById('dm-manage-blocked-btn').addEventListener('click', async () => {
  const panel = document.getElementById('dm-blocked-list');
  const willOpen = panel.style.display === 'none';
  panel.style.display = willOpen ? 'block' : 'none';
  if (willOpen) await renderBlockedList();
});
document.getElementById('dm-blocked-list').addEventListener('click', (e) => {
  const btn = e.target.closest('[data-action="unblock"]');
  if (btn) handleUnblock(btn.dataset.id);
});

export async function initDMs(userId) {
  currentUserId = userId;
  activeConversation = null;
  activeOtherUserId = null;
  document.getElementById('dm-thread-view').style.display = 'none';
  document.getElementById('dm-list-view').style.display = 'block';
  document.getElementById('dm-new-handle').value = '';
  document.getElementById('dm-blocked-list').style.display = 'none';
  setListMessage('', false);
  await refreshBlockedIds();
  await renderConversationList();
}

export function teardownDMs() {
  currentUserId = null;
  activeConversation = null;
  activeOtherUserId = null;
  document.getElementById('dm-conversation-list').innerHTML = '';
}
