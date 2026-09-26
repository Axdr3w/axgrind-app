const { createClient } = require('@supabase/supabase-js');
const { sendPushToUser } = require('./lib/send-push.cjs');

// Same ranking query the Leaderboard itself uses (src/api/leaderboard.js) —
// position in this list, 1-indexed, is a user's rank.
exports.handler = async () => {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY || !process.env.VAPID_PRIVATE_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Missing server env vars.' }) };
  }

  const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

  const { data: ranked, error } = await supabase
    .from('profiles')
    .select('id, display_name, handle, xp, last_known_leaderboard_rank')
    .order('xp', { ascending: false })
    .order('id', { ascending: true })
    .limit(100);
  if (error) return { statusCode: 500, body: JSON.stringify({ error: error.message }) };

  let sent = 0;
  for (let i = 0; i < (ranked || []).length; i++) {
    const profile = ranked[i];
    const currentRank = i + 1;
    const previousRank = profile.last_known_leaderboard_rank;

    // previousRank === null means this is the first time we've ever
    // snapshotted them — nothing to compare against, so just record it
    // without notifying (otherwise everyone "improves" on their first run).
    if (previousRank !== null && currentRank < previousRank) {
      sent += await sendPushToUser(supabase, profile.id, {
        title: '🏆 You moved up the leaderboard',
        body: `You're now #${currentRank}, up from #${previousRank}.`,
        url: '/',
      });
    }

    if (currentRank !== previousRank) {
      await supabase.from('profiles').update({ last_known_leaderboard_rank: currentRank }).eq('id', profile.id);
    }
  }

  return { statusCode: 200, body: JSON.stringify({ checked: (ranked || []).length, sent }) };
};

exports.config = {
  // Hourly — XP changes constantly, but "you moved up" is a light-touch
  // engagement ping, not something worth checking as often as messages.
  schedule: '0 * * * *',
};
