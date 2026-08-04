function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Fails open (returns not-blocked) on any network/parse error, matching the
// server function's fail-open behavior — a moderation outage shouldn't be
// able to take down posting entirely.
export async function moderateContent(text, imageFile) {
  try {
    const body = { text: text || '' };
    if (imageFile) {
      body.imageBase64 = await fileToBase64(imageFile);
      body.mediaType = imageFile.type || 'image/jpeg';
    }
    const resp = await fetch('/.netlify/functions/moderate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await resp.json();
    return { blocked: Boolean(data.blocked), reason: data.reason || '' };
  } catch {
    return { blocked: false, reason: '' };
  }
}
