// Shared by every module that renders user-supplied text (display names,
// chat/forum/DM messages, bios) into innerHTML — pulled out of six separate
// copy-pasted copies so there's exactly one place to get this right, instead
// of one place that could be missed the next time a new feature needs it.
export function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
