// Atomic XP increment via the increment_xp() Postgres function (see
// supabase/increment_xp.sql). A JS-side "select xp, then update xp + amount"
// can lose an increment when two requests race — a double-tapped "finish
// workout", or the same account open on two devices at once — since both
// reads can see the same starting value before either write lands.
async function awardXp(supabase, userId, amount) {
  const { data, error } = await supabase.rpc('increment_xp', { p_user_id: userId, p_amount: amount });
  if (error) throw error;
  return data;
}

module.exports = { awardXp };
