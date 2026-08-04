import { getRankedList } from './rank-cache.js';
import { t } from './i18n/index.js';

let currentUserId = null;

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function medalFor(rank) {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return null;
}

async function renderLeaderboard() {
  const container = document.getElementById('leaderboard-list');
  container.innerHTML = `<div style="text-align:center;padding:20px;color:var(--muted);font-size:12px;">${t('common.loading')}</div>`;
  let ranked;
  try {
    ranked = await getRankedList(true);
  } catch (err) {
    container.innerHTML = `<div style="text-align:center;padding:20px;color:#ff6040;font-size:12px;">${t('leaderboard.errorLoad', { reason: err.message })}</div>`;
    return;
  }
  if (ranked.length === 0) {
    container.innerHTML = `<div style="text-align:center;padding:30px;color:var(--muted);font-size:13px;">${t('leaderboard.empty')}</div>`;
    return;
  }
  container.innerHTML = ranked.map((p, i) => {
    const rank = i + 1;
    const medal = medalFor(rank);
    const isMe = p.id === currentUserId;
    const name = escapeHtml(p.display_name || p.handle || t('common.memberFallback'));
    return `
      <div class="leaderboard-row${isMe ? ' me' : ''}">
        <div class="leaderboard-rank">${medal || '#' + rank}</div>
        <div class="leaderboard-name">${name}${isMe ? ` <span class="leaderboard-you">(${t('leaderboard.you')})</span>` : ''}</div>
        <div class="leaderboard-xp">${p.xp ?? 0} XP</div>
      </div>
    `;
  }).join('');
}

export function openLeaderboard() {
  document.getElementById('quest-day-view').style.display = 'none';
  document.getElementById('quest-leaderboard-view').style.display = 'block';
  renderLeaderboard();
}

export function closeLeaderboard() {
  document.getElementById('quest-leaderboard-view').style.display = 'none';
  document.getElementById('quest-day-view').style.display = 'block';
}

document.getElementById('open-leaderboard-btn').addEventListener('click', openLeaderboard);
document.getElementById('close-leaderboard-btn').addEventListener('click', closeLeaderboard);

export function initLeaderboard(userId) {
  currentUserId = userId;
}

export function teardownLeaderboard() {
  currentUserId = null;
  document.getElementById('quest-leaderboard-view').style.display = 'none';
  document.getElementById('quest-day-view').style.display = 'block';
  document.getElementById('leaderboard-list').innerHTML = '';
}
