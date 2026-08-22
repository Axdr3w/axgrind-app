async function callFn(path, body) {
  const resp = await fetch(`/.netlify/functions/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await resp.json();
  if (!resp.ok) throw new Error(data.error?.message || 'Something went wrong.');
  return data;
}

export function uploadProgressPhoto(userId, imageBase64, loggedAt) {
  return callFn('upload-progress-photo', { userId, imageBase64, loggedAt });
}

export async function fetchProgressPhotos(userId) {
  const { photos } = await callFn('get-progress-photos', { userId });
  return photos;
}

export function deleteProgressPhoto(userId, loggedAt) {
  return callFn('delete-progress-photo', { userId, loggedAt });
}
