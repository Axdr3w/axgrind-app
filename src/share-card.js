// Turns an unlocked achievement into a shareable square image (Canvas API)
// and pushes it out through the Web Share API when available, falling back
// to a plain image download everywhere else (desktop browsers, WebViews
// without file-sharing support). No network calls, no dependencies — the
// whole thing is drawn locally from data the caller already has.

const SIZE = 1080;

// Matches the :root custom properties in src/style.css — kept as plain hex
// here since canvas can't read CSS variables.
const COLORS = {
  bg: '#0a0a0a',
  surface: '#111111',
  accent: '#e8ff00',
  text: '#f0f0f0',
  muted: '#a8a8a8',
};

function drawCard({ icon, title }) {
  const canvas = document.createElement('canvas');
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  // Background — a soft radial wash from surface to bg, same dark palette
  // as the rest of the app rather than a flat fill.
  const gradient = ctx.createRadialGradient(
    SIZE / 2, SIZE * 0.4, 0,
    SIZE / 2, SIZE * 0.4, SIZE * 0.8
  );
  gradient.addColorStop(0, COLORS.surface);
  gradient.addColorStop(1, COLORS.bg);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, SIZE, SIZE);

  // Achievement icon (emoji), large and centered.
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `${Math.round(SIZE * 0.32)}px -apple-system, "Segoe UI Emoji", "Noto Color Emoji", sans-serif`;
  ctx.fillText(icon || '🏆', SIZE / 2, SIZE * 0.42);

  // "Achievement Unlocked" label above the title.
  ctx.fillStyle = COLORS.muted;
  ctx.font = `700 ${Math.round(SIZE * 0.028)}px -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif`;
  ctx.fillText('ACHIEVEMENT UNLOCKED', SIZE / 2, SIZE * 0.58);

  // Achievement title, bold and prominent.
  ctx.fillStyle = COLORS.text;
  ctx.font = `900 ${Math.round(SIZE * 0.075)}px -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif`;
  wrapText(ctx, title || '', SIZE / 2, SIZE * 0.66, SIZE * 0.84, SIZE * 0.09);

  // Wordmark near the bottom, in the accent color.
  ctx.fillStyle = COLORS.accent;
  ctx.font = `700 ${Math.round(SIZE * 0.045)}px -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif`;
  ctx.fillText('AX.GRIND', SIZE / 2, SIZE * 0.92);

  return canvas;
}

// Minimal word-wrap for the title so long achievement names don't run off
// the edge of the card.
function wrapText(ctx, text, cx, y, maxWidth, lineHeight) {
  const words = String(text).split(' ');
  let line = '';
  const lines = [];
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  const startY = y - ((lines.length - 1) * lineHeight) / 2;
  lines.forEach((l, i) => ctx.fillText(l, cx, startY + i * lineHeight));
}

function canvasToBlob(canvas) {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), 'image/png');
  });
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// Renders the card and shares it (native share sheet when supported,
// otherwise downloads the PNG). Silently no-ops on any failure — sharing
// a result card is a nice-to-have, never something that should surface an
// error to the user or interrupt whatever flow called it.
export async function shareAchievementCard({ icon, title }) {
  try {
    const canvas = drawCard({ icon, title });
    if (!canvas) return;
    const blob = await canvasToBlob(canvas);
    if (!blob) return;

    const filename = `axgrind-achievement-${Date.now()}.png`;
    const file = new File([blob], filename, { type: 'image/png' });

    if (navigator.canShare && navigator.canShare({ files: [file] }) && navigator.share) {
      await navigator.share({
        files: [file],
        title: title || 'AX.GRIND Achievement',
        text: `Just unlocked "${title}" on AX.GRIND 💪`,
      });
      return;
    }

    downloadBlob(blob, filename);
  } catch (err) {
    console.error('shareAchievementCard failed:', err);
  }
}
