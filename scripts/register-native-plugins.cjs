#!/usr/bin/env node
// Capacitor registers iOS plugins solely from `packageClassList` in the
// bundled capacitor.config.json (see CapacitorBridge.registerPlugins) —
// there is no Objective-C runtime auto-discovery. The CLI builds that list
// by scanning installed npm plugin *packages* only (util/iosplugin.js), so
// plugins written directly in the app target are never included, and
// `npx cap sync ios` rewrites the key unconditionally — wiping any manual
// edit on every build, including Xcode Cloud's.
//
// This re-adds them, doing for app-target plugins exactly what the CLI
// does for packaged ones: find `@objc(ClassName)` on a CAPPlugin subclass.
// Must run *after* `npx cap sync ios` — see ios/App/ci_scripts/ci_post_clone.sh.

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const nativeDir = path.join(repoRoot, 'ios', 'App', 'App');
const configPath = path.join(nativeDir, 'capacitor.config.json');

const localClasses = fs
  .readdirSync(nativeDir)
  .filter((name) => name.endsWith('.swift'))
  .flatMap((name) => {
    const source = fs.readFileSync(path.join(nativeDir, name), 'utf8');
    if (!source.includes('CAPPlugin')) return [];
    const match = /@objc\(([A-Za-z0-9_]+)\)/.exec(source);
    return match ? [match[1]] : [];
  });

const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const existing = config.packageClassList || [];
const merged = [...new Set([...existing, ...localClasses])];

config.packageClassList = merged;
fs.writeFileSync(configPath, JSON.stringify(config, null, '\t') + '\n');

const added = localClasses.filter((name) => !existing.includes(name));
console.log(
  added.length
    ? `register-native-plugins: added ${added.join(', ')} (list is now ${merged.join(', ')})`
    : `register-native-plugins: already registered — ${merged.join(', ') || 'none'}`
);
