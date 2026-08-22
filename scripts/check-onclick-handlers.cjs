#!/usr/bin/env node
// Every inline onclick/onchange/oninput in index.html calls a function that
// has to be manually re-exported onto `window` in main.js's single
// Object.assign(window, {...}) block — there's no build-time link between
// the two, so a forgotten export just fails silently at runtime (the
// button does nothing, with only a console ReferenceError to notice it).
// This script closes that gap: it extracts every handler name referenced
// in index.html and checks each one is actually exported, failing the
// build if not. Run via `npm run check:handlers` or automatically before
// every `npm run build` (wired in as `prebuild`).

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const mainJs = fs.readFileSync(path.join(ROOT, 'src/main.js'), 'utf8');

// Pull every on click/change/input attribute value, e.g. onclick="a();b('x')".
const attrRe = /\son(?:click|change|input)="([^"]*)"/g;
const handlerNames = new Set();
let m;
while ((m = attrRe.exec(html))) {
  const body = m[1];
  // Attribute can hold several ;-separated statements; only look at ones
  // that start with a plain identifier call — skips inline DOM property
  // assignments like document.getElementById('x').style.display='none',
  // which don't need a window export at all.
  for (let stmt of body.split(';')) {
    stmt = stmt.trim();
    // Strip a leading guard like "if(event.target===this)" so the call
    // after it is what gets checked, e.g. "if(...)closeX()" -> "closeX()".
    const guarded = stmt.match(/^if\s*\([^)]*\)\s*(.*)$/);
    if (guarded) stmt = guarded[1].trim();
    const call = stmt.match(/^([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/);
    if (call) handlerNames.add(call[1]);
  }
}

// Pull the keys out of Object.assign(window, { ... }) in main.js.
const assignMatch = mainJs.match(/Object\.assign\(window,\s*\{([\s\S]*?)\}\);/);
if (!assignMatch) {
  console.error('check-onclick-handlers: could not find Object.assign(window, {...}) block in main.js — did it move or get renamed?');
  process.exit(1);
}
const exported = new Set(
  assignMatch[1]
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => s.split(':')[0].trim())
);

const missing = [...handlerNames].filter((name) => !exported.has(name)).sort();

if (missing.length > 0) {
  console.error('check-onclick-handlers: index.html calls these via onclick/onchange/oninput, but they are not exported on window in main.js:');
  missing.forEach((name) => console.error(`  - ${name}`));
  console.error('\nAdd each one to the Object.assign(window, {...}) block in src/main.js.');
  process.exit(1);
}

console.log(`check-onclick-handlers: OK — all ${handlerNames.size} inline handler(s) referenced in index.html are exported on window.`);
