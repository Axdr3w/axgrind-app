import { supabase } from './supabaseClient.js';

const PAGE_SIZE = 20;

export async function fetchPosts(before = null) {
  if (!supabase) return [];
  let query = supabase
    .from('forum_posts')
    .select('*, profiles(display_name)')
    .order('created_at', { ascending: false })
    .limit(PAGE_SIZE);
  if (before) query = query.lt('created_at', before);
  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function fetchLikedPostIds(userId) {
  if (!supabase) return new Set();
  const { data, error } = await supabase.from('forum_likes').select('post_id').eq('user_id', userId);
  if (error) throw error;
  return new Set((data ?? []).map(r => r.post_id));
}

export async function createPost(userId, { body, imageUrl }) {
  if (!supabase) throw new Error('Not configured');
  const { data, error } = await supabase
    .from('forum_posts')
    .insert({ user_id: userId, body: body || null, image_url: imageUrl || null })
    .select('*, profiles(display_name)')
    .single();
  if (error) throw error;
  return data;
}

export async function deletePost(id) {
  if (!supabase) throw new Error('Not configured');
  const { error } = await supabase.from('forum_posts').delete().eq('id', id);
  if (error) throw error;
}

export async function toggleLike(postId, userId, isCurrentlyLiked) {
  if (!supabase) throw new Error('Not configured');
  if (isCurrentlyLiked) {
    const { error } = await supabase.from('forum_likes').delete().eq('post_id', postId).eq('user_id', userId);
    if (error) throw error;
  } else {
    const { error } = await supabase.from('forum_likes').insert({ post_id: postId, user_id: userId });
    if (error) throw error;
  }
}

export async function fetchComments(postId) {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('forum_comments')
    .select('*, profiles(display_name)')
    .eq('post_id', postId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function createComment(postId, userId, body) {
  if (!supabase) throw new Error('Not configured');
  const { data, error } = await supabase
    .from('forum_comments')
    .insert({ post_id: postId, user_id: userId, body })
    .select('*, profiles(display_name)')
    .single();
  if (error) throw error;
  return data;
}

export async function deleteComment(id) {
  if (!supabase) throw new Error('Not configured');
  const { error } = await supabase.from('forum_comments').delete().eq('id', id);
  if (error) throw error;
}

export async function reportContent(reporterId, { postId, commentId, reason }) {
  if (!supabase) throw new Error('Not configured');
  const { error } = await supabase.from('forum_reports').insert({
    reporter_id: reporterId,
    post_id: postId || null,
    comment_id: commentId || null,
    reason: reason || null,
  });
  if (error) throw error;
}

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

export async function uploadForumImage(userId, file) {
  if (!supabase) throw new Error('Not configured');
  if (file.size > MAX_IMAGE_BYTES) throw new Error('Image is too large (5MB max).');
  const ext = file.name.split('.').pop() || 'jpg';
  const path = `${userId}/${Date.now()}.${ext}`;
  const { error } = await supabase.storage.from('forum-images').upload(path, file);
  if (error) throw error;
  const { data } = supabase.storage.from('forum-images').getPublicUrl(path);
  return data.publicUrl;
}
