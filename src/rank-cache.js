import { fetchAllRanked } from './api/leaderboard.js';

let cachedList = null;
let cachedAt = 0;
const TTL_MS = 60000;

// Shared by the Leaderboard view and the rank badges shown in Forum/Messages,
// so a busy feed doesn't trigger a full profiles scan per author.
async function getRankedList(force = false) {
  if (!force && cachedList && Date.now() - cachedAt < TTL_MS) return cachedList;
  cachedList = await fetchAllRanked();
  cachedAt = Date.now();
  return cachedList;
}

export async function getRankMap(force = false) {
  const list = await getRankedList(force);
  const map = new Map();
  list.forEach((p, i) => map.set(p.id, i + 1));
  return map;
}

export function invalidateRankCache() {
  cachedList = null;
}

export { getRankedList };
