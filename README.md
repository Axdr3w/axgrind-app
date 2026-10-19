<p align="center">
  <img src="store-assets/app-icon-1024.png" alt="AX.GRIND app icon" width="132">
</p>

<h1 align="center">AX.GRIND</h1>
<p align="center"><strong>Free training. Real progress. No paywalls.</strong></p>

---

## Project home

AX.GRIND is a fitness app for the web and iOS. This repository is the canonical home for its app code, site, native iOS wrapper, backend functions, and App Store assets.

### Current product

- Workout library, training plans, exercise guides, timers, and workout logging
- Quests, streaks, achievements, progress tracking, nutrition tools, and an AI coach
- Community forum, direct messages, moderation, and push notifications
- Vite web app, Capacitor iOS app, Supabase data/auth, and Netlify functions

### Work in progress

- App Store submission and iOS packaging
- Startup performance: language dictionaries now load on demand; the initial JavaScript chunk dropped from 1.49 MB to 342 KB in the latest production build
- Store screenshots are in `store-assets/` and `store-assets/6.9-display/`

### Start here

```sh
npm install
npm run dev
```

Create a production web build with `npm run build`. The iOS project is under `ios/App/`; the production Capacitor configuration currently points the native app at `https://axgrind.fit`.

### Important folders

| Path | Contents |
| --- | --- |
| `src/` | App UI, features, APIs, and translations |
| `netlify/functions/` | Server-side endpoints and scheduled notifications |
| `supabase/` | Database schema and SQL functions |
| `ios/App/` | Capacitor iOS app and Xcode project |
| `store-assets/` | App icon, listing copy, and App Store screenshots |
| `public/` | Web icons, policies, and static site files |

### Project conventions

- Keep app changes in this repository and preserve existing uncommitted App Store/Xcode files.
- Keep credentials in local environment files; never commit secrets.
- Run `npm run build` to verify production bundling and the inline-handler check before a release.
- Treat web deployment and App Store submission as separate release steps.
