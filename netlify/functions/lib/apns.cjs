const jwt = require('jsonwebtoken');
const http2 = require('node:http2');

// APNs provider tokens are valid up to an hour — cached and reused across
// invocations within that window instead of re-signing on every single
// notification (this file's sendApnsNotification is called once per
// device per push, potentially many times per scheduled-function run).
let cachedToken = null;
let cachedTokenAt = 0;
const TOKEN_TTL_MS = 55 * 60 * 1000;

function getApnsJwt() {
  if (cachedToken && Date.now() - cachedTokenAt < TOKEN_TTL_MS) return cachedToken;
  // Netlify's env var UI doesn't reliably preserve real newlines in a
  // pasted multi-line secret — the setup instructions have this pasted
  // with literal \n sequences, unescaped here back into a real PEM.
  const privateKey = process.env.APNS_PRIVATE_KEY.replace(/\\n/g, '\n');
  cachedToken = jwt.sign({}, privateKey, {
    algorithm: 'ES256',
    issuer: process.env.APNS_TEAM_ID,
    keyid: process.env.APNS_KEY_ID,
  });
  cachedTokenAt = Date.now();
  return cachedToken;
}

const APNS_BUNDLE_ID = 'com.axgrind.app';

// Sends one alert notification to one device token. Never throws for a
// normal APNs-level rejection (bad token, etc.) — returns { ok, status,
// body } so the caller can decide what a given status means (e.g. 410
// means "prune this token," same idea as web-push's dead-subscription
// pruning in send-push.cjs).
function sendApnsNotification(deviceToken, payload) {
  const host = process.env.APNS_ENVIRONMENT === 'production' ? 'api.push.apple.com' : 'api.sandbox.push.apple.com';

  return new Promise((resolve, reject) => {
    const client = http2.connect(`https://${host}`);
    client.on('error', reject);

    const req = client.request({
      ':method': 'POST',
      ':path': `/3/device/${deviceToken}`,
      authorization: `bearer ${getApnsJwt()}`,
      'apns-topic': APNS_BUNDLE_ID,
      'apns-push-type': 'alert',
      'content-type': 'application/json',
    });

    let status;
    let body = '';
    req.on('response', (headers) => {
      status = headers[':status'];
    });
    req.setEncoding('utf8');
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      client.close();
      resolve({ ok: status === 200, status, body });
    });
    req.on('error', (err) => {
      client.close();
      reject(err);
    });

    req.write(JSON.stringify({
      aps: { alert: { title: payload.title, body: payload.body }, sound: 'default' },
      url: payload.url,
    }));
    req.end();
  });
}

module.exports = { sendApnsNotification };
