import {
  fetchPosts,
  fetchLikedPostIds,
  createPost,
  deletePost,
  toggleLike,
  fetchComments,
  createComment,
  deleteComment,
  reportContent,
  uploadForumImage,
} from './api/forum.js';
import { moderateContent } from './api/moderation.js';
import { getRankMap } from './rank-cache.js';
import { t, getLanguage } from './i18n/index.js';
import { escapeHtml } from './html-utils.js';

let currentUserId = null;
let likedPostIds = new Set();
let oldestLoadedAt = null;
let pendingImageFile = null;
let openCommentPostIds = new Set();
let rankMap = new Map();


function relativeTime(isoString) {
  const diffMs = Date.now() - new Date(isoString).getTime();
  const mins = Math.floor(diffMs / 60000);
  const rtf = new Intl.RelativeTimeFormat(getLanguage(), { numeric: 'auto' });
  if (mins < 1) return rtf.format(0, 'second');
  if (mins < 60) return rtf.format(-mins, 'minute');
  const hours = Math.floor(mins / 60);
  if (hours < 24) return rtf.format(-hours, 'hour');
  const days = Math.floor(hours / 24);
  if (days < 7) return rtf.format(-days, 'day');
  return new Date(isoString).toLocaleDateString(getLanguage());
}

function authorName(post) {
  return escapeHtml(post.profiles?.display_name || t('common.memberFallback'));
}

function rankBadge(userId) {
  const rank = rankMap.get(userId);
  return rank ? `<span class="rank-badge">#${rank}</span>` : '';
}

function setPostMessage(text, isError) {
  const el = document.getElementById('forum-post-message');
  el.textContent = text;
  el.style.color = isError ? '#ff6040' : '#4ade80';
}

function renderPostCard(post) {
  const liked = likedPostIds.has(post.id);
  const isOwn = post.user_id === currentUserId;
  const moderationBtn = isOwn
    ? `<button class="forum-mod-btn" data-action="delete-post" data-id="${post.id}">${t('common.delete')}</button>`
    : `<button class="forum-mod-btn" data-action="report-post" data-id="${post.id}">${t('common.report')}</button>`;
  return `
    <div class="forum-post" data-id="${post.id}">
      <div class="forum-post-header">
        <div class="forum-post-avatar">${authorName(post)[0]?.toUpperCase() || 'A'}</div>
        <div class="forum-post-who">
          <div class="forum-post-author">${authorName(post)}${rankBadge(post.user_id)}</div>
          <div class="forum-post-time">${relativeTime(post.created_at)}</div>
        </div>
        ${moderationBtn}
      </div>
      ${post.body ? `<div class="forum-post-body">${escapeHtml(post.body)}</div>` : ''}
      ${post.image_url ? `<img class="forum-post-image" src="${escapeHtml(post.image_url)}" loading="lazy">` : ''}
      <div class="forum-post-actions">
        <button class="forum-action-btn forum-like-btn${liked ? ' liked' : ''}" data-id="${post.id}"><i class="ti ti-heart"></i> <span>${post.like_count}</span></button>
        <button class="forum-action-btn forum-comment-toggle" data-id="${post.id}"><i class="ti ti-message-circle"></i> <span class="forum-comment-count">${post.comment_count}</span></button>
      </div>
      <div class="forum-comments" data-post-id="${post.id}" style="display:${openCommentPostIds.has(post.id) ? 'block' : 'none'};"></div>
    </div>
  `;
}

async function renderFeed(posts, append) {
  const container = document.getElementById('forum-feed');
  const html = posts.map(renderPostCard).join('');
  if (append) container.insertAdjacentHTML('beforeend', html);
  else container.innerHTML = html || `<div class="empty-fade" style="text-align:center;padding:30px;color:var(--muted);font-size:13px;">${t('forum.emptyFeed')}</div>`;

  for (const post of posts) {
    if (openCommentPostIds.has(post.id)) await renderComments(post.id);
  }
}

// Shaped like a real post (avatar + name line + body lines) so the loading
// state reads as "your feed is coming" instead of a blank pause, and
// doesn't reflow the layout once real posts replace it.
function forumFeedSkeleton(count = 3) {
  return Array.from({ length: count }, () => `
    <div class="skeleton-forum-post">
      <div class="skeleton-post-header">
        <div class="skeleton-circle"></div>
        <div class="skeleton-line" style="width:110px;"></div>
      </div>
      <div class="skeleton-line" style="width:92%;"></div>
      <div class="skeleton-line" style="width:55%;"></div>
    </div>
  `).join('');
}

async function loadFeed() {
  const container = document.getElementById('forum-feed');
  container.innerHTML = forumFeedSkeleton();
  let posts;
  try {
    [posts, rankMap] = await Promise.all([fetchPosts(), getRankMap().catch(() => rankMap)]);
  } catch (err) {
    container.innerHTML = `<div style="text-align:center;padding:20px;color:#ff6040;font-size:12px;">${t('forum.errorLoad', { reason: err.message })}</div>`;
    return;
  }
  oldestLoadedAt = posts.length ? posts[posts.length - 1].created_at : null;
  document.getElementById('forum-load-more-btn').style.display = posts.length >= 20 ? 'block' : 'none';
  await renderFeed(posts, false);
}

async function loadMore() {
  if (!oldestLoadedAt) return;
  const posts = await fetchPosts(oldestLoadedAt);
  oldestLoadedAt = posts.length ? posts[posts.length - 1].created_at : oldestLoadedAt;
  document.getElementById('forum-load-more-btn').style.display = posts.length >= 20 ? 'block' : 'none';
  await renderFeed(posts, true);
}

async function renderComments(postId) {
  const container = document.querySelector(`.forum-comments[data-post-id="${postId}"]`);
  if (!container) return;
  container.innerHTML = `<div style="padding:10px;color:var(--muted);font-size:12px;">${t('forum.loadingComments')}</div>`;
  const comments = await fetchComments(postId);
  const list = comments.map(c => {
    const isOwn = c.user_id === currentUserId;
    const name = escapeHtml(c.profiles?.display_name || t('common.memberFallback'));
    return `
      <div class="forum-comment" data-id="${c.id}">
        <div class="forum-comment-author">${name}${rankBadge(c.user_id)}</div>
        <div class="forum-comment-body">${escapeHtml(c.body)}</div>
        ${isOwn
          ? `<button class="forum-mod-btn small" data-action="delete-comment" data-id="${c.id}" data-post-id="${postId}">${t('common.delete')}</button>`
          : `<button class="forum-mod-btn small" data-action="report-comment" data-id="${c.id}" data-post-id="${postId}">${t('common.report')}</button>`}
      </div>
    `;
  }).join('');
  container.innerHTML = `
    <div class="forum-comment-list">${list || `<div style="color:var(--muted);font-size:12px;padding:6px 0;">${t('forum.emptyComments')}</div>`}</div>
    <div class="forum-comment-add">
      <input class="calc-input" type="text" placeholder="${t('forum.commentPlaceholder')}" data-post-id="${postId}" class="forum-comment-input">
      <button class="btn-follow forum-comment-send" data-post-id="${postId}" style="width:auto;margin-top:0;">${t('forum.send')}</button>
    </div>
  `;
  container.querySelector('.forum-comment-send').addEventListener('click', () => handleAddComment(postId));
  const input = container.querySelector('input[data-post-id]');
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleAddComment(postId); });
}

async function handleAddComment(postId) {
  const container = document.querySelector(`.forum-comments[data-post-id="${postId}"]`);
  const input = container.querySelector('input[data-post-id]');
  const body = input.value.trim();
  if (!body) return;
  await createComment(postId, currentUserId, body);
  const countEl = document.querySelector(`.forum-post[data-id="${postId}"] .forum-comment-count`);
  if (countEl) countEl.textContent = String(Number(countEl.textContent) + 1);
  await renderComments(postId);
}

async function handleLikeToggle(postId) {
  const liked = likedPostIds.has(postId);
  const btn = document.querySelector(`.forum-like-btn[data-id="${postId}"]`);
  const countSpan = btn.querySelector('span');
  if (liked) { likedPostIds.delete(postId); btn.classList.remove('liked'); countSpan.textContent = String(Number(countSpan.textContent) - 1); }
  else { likedPostIds.add(postId); btn.classList.add('liked'); countSpan.textContent = String(Number(countSpan.textContent) + 1); }
  try {
    await toggleLike(postId, currentUserId, liked);
  } catch (err) {
    // revert on failure
    if (liked) { likedPostIds.add(postId); btn.classList.add('liked'); countSpan.textContent = String(Number(countSpan.textContent) + 1); }
    else { likedPostIds.delete(postId); btn.classList.remove('liked'); countSpan.textContent = String(Number(countSpan.textContent) - 1); }
  }
}

async function handleModAction(action, id, postId) {
  if (action === 'delete-post') {
    if (!confirm(t('forum.confirmDeletePost'))) return;
    await deletePost(id);
    document.querySelector(`.forum-post[data-id="${id}"]`)?.remove();
  } else if (action === 'delete-comment') {
    if (!confirm(t('forum.confirmDeleteComment'))) return;
    await deleteComment(id);
    const countEl = document.querySelector(`.forum-post[data-id="${postId}"] .forum-comment-count`);
    if (countEl) countEl.textContent = String(Math.max(0, Number(countEl.textContent) - 1));
    await renderComments(postId);
  } else if (action === 'report-post') {
    const reason = prompt(t('common.reportPrompt'));
    if (reason === null) return;
    await reportContent(currentUserId, { postId: id, reason });
    alert(t('common.reportedThanks'));
  } else if (action === 'report-comment') {
    const reason = prompt(t('common.reportPrompt'));
    if (reason === null) return;
    await reportContent(currentUserId, { commentId: id, reason });
    alert(t('common.reportedThanks'));
  }
}

function handleImageSelect(e) {
  const file = e.target.files[0];
  if (!file) return;
  if (file.size > 5 * 1024 * 1024) {
    setPostMessage(t('forum.imageTooLarge'), true);
    e.target.value = '';
    return;
  }
  pendingImageFile = file;
  const reader = new FileReader();
  reader.onload = (ev) => {
    document.getElementById('forum-image-preview-img').src = ev.target.result;
    document.getElementById('forum-image-preview').style.display = 'block';
  };
  reader.readAsDataURL(file);
}

export function removeForumImage() {
  pendingImageFile = null;
  document.getElementById('forum-image-input').value = '';
  document.getElementById('forum-image-preview').style.display = 'none';
}

async function handleCreatePost() {
  const textarea = document.getElementById('forum-post-body');
  const body = textarea.value.trim();
  if (!body && !pendingImageFile) {
    setPostMessage(t('forum.writeSomethingFirst'), true);
    return;
  }
  const btn = document.getElementById('forum-post-btn');
  const originalText = btn.textContent;
  btn.disabled = true;
  btn.textContent = originalText + '…';
  setPostMessage(t('forum.checking'), false);
  try {
    const verdict = await moderateContent(body, pendingImageFile);
    if (verdict.blocked) {
      setPostMessage(t('forum.postBlocked', { reason: verdict.reason || t('forum.postBlockedDefault') }), true);
      return;
    }
    setPostMessage('', false);

    let imageUrl = null;
    if (pendingImageFile) {
      imageUrl = await uploadForumImage(currentUserId, pendingImageFile);
    }
    const post = await createPost(currentUserId, { body, imageUrl });
    textarea.value = '';
    removeForumImage();
    document.getElementById('forum-feed').insertAdjacentHTML('afterbegin', renderPostCard(post));
  } catch (err) {
    setPostMessage(t('forum.errorPost', { reason: err.message }), true);
  } finally {
    btn.disabled = false;
    btn.textContent = originalText;
  }
}

// Attached once at module load — initForum() runs on every login.
document.getElementById('forum-post-btn').addEventListener('click', handleCreatePost);
document.getElementById('forum-add-photo-btn').addEventListener('click', () => document.getElementById('forum-image-input').click());
document.getElementById('forum-image-input').addEventListener('change', handleImageSelect);
document.getElementById('forum-load-more-btn').addEventListener('click', loadMore);

document.getElementById('forum-feed').addEventListener('click', (e) => {
  const likeBtn = e.target.closest('.forum-like-btn');
  if (likeBtn) { handleLikeToggle(likeBtn.dataset.id); return; }

  const commentToggle = e.target.closest('.forum-comment-toggle');
  if (commentToggle) {
    const postId = commentToggle.dataset.id;
    const panel = document.querySelector(`.forum-comments[data-post-id="${postId}"]`);
    const willOpen = panel.style.display === 'none';
    panel.style.display = willOpen ? 'block' : 'none';
    if (willOpen) { openCommentPostIds.add(postId); renderComments(postId); }
    else { openCommentPostIds.delete(postId); }
    return;
  }

  const modBtn = e.target.closest('.forum-mod-btn');
  if (modBtn) { handleModAction(modBtn.dataset.action, modBtn.dataset.id, modBtn.dataset.postId); }
});

export async function initForum(userId) {
  currentUserId = userId;
  openCommentPostIds = new Set();
  removeForumImage();
  document.getElementById('forum-post-body').value = '';
  setPostMessage('', false);
  try {
    likedPostIds = await fetchLikedPostIds(userId);
  } catch {
    likedPostIds = new Set();
  }
  await loadFeed();
}

export function teardownForum() {
  currentUserId = null;
  document.getElementById('forum-feed').innerHTML = '';
}
