# AX.GRIND — App Store Connect Listing

Everything below is ready to copy-paste directly into App Store Connect. Character counts are checked against Apple's actual limits.

---

## App name (30 char max)
```
AX.GRIND
```
8 characters. Check name availability in App Store Connect when you create the app record — someone else could theoretically already have this exact name, though it's unlikely given the trademark-style dot.

## Subtitle (30 char max)
```
Free Workouts & AI Coach
```
24 characters.

## Promotional text (170 char max — the only field you can edit anytime without a new review)
```
300+ free workouts, an AI coach, nutrition tools, and a community that keeps you accountable. No subscriptions, no paywalls — ever.
```

## Keywords (100 char max, comma-separated, no spaces after commas)
```
workout,fitness,gym,ai coach,nutrition,exercise,training,tracker,progress,strength,diet,muscle
```
94 characters. Don't repeat words already in the app name/subtitle ("free," "ai," "coach," "workout" are already indexed from those fields) — Apple's search already weights those, so this list intentionally covers different terms.

## Description (4000 char max)
```
AX.GRIND is free training for people serious about their grind — real workouts, an AI coach, nutrition tools, and a community, with no subscriptions and no paywalls, ever.

TRAIN
• 300+ workouts from beginner to advanced, for gym or home
• 1,200+ exercises, each with a form cue and a video tutorial
• Sport-specific plans and structured multi-week programs
• Every workout logged automatically — level up, build a streak, and track your all-time history

LOCK IN
A focus timer built for training days: set a duration, stay in the app the whole time, and earn XP for finishing. Leave even for a second and the session ends — no cheating yourself.

GRIND BREATH
A guided breathing exercise to reset between sets or before a session — pick 1 to 5 rounds.

NUTRITION
• A calorie and macro calculator built around your goal — cut, maintain, or bulk
• A sample meal plan and a full breakdown of vitamins, minerals, and which foods to prioritize or limit
• General education, not a diet plan — always check with a doctor or dietitian for anything personalized

PROGRESS
• Log your weight and watch a real trend line, not daily noise
• Add a progress photo alongside each weigh-in and compare any two side by side
• Track body measurements — chest, arms, waist, and more
• Unlock achievements as you build real consistency

AI COACH & BODY ANALYZER
Ask the AI Coach anything about training, nutrition, or recovery. Upload a photo for the AI Body Analyzer to get a personalized plan recommendation. Both are AI-generated — not a replacement for a real doctor, trainer, or dietitian.

COMMUNITY
A forum and direct messages to share progress, ask questions, and stay accountable, plus a leaderboard ranked by XP. Report and block tools keep it safe, and every account can be deleted at any time.

AX.GRIND is intended for users 13 and older. It provides general fitness and nutrition information for educational purposes only — it is not medical advice. Talk to a qualified healthcare provider before starting any new exercise or nutrition program.
```

## What's New (release notes for this version)
```
Welcome to AX.GRIND — 300+ free workouts, an AI coach, nutrition tools, progress tracking, and a community, all in one place. No subscriptions, ever.
```

## URLs
- **Support URL:** `https://axgrind.fit/support.html`
- **Marketing URL (optional):** `https://axgrind.fit`
- **Privacy Policy URL:** `https://axgrind.fit/privacy.html`

## Copyright
```
© 2026 Andrew Xie
```

## Category
- **Primary:** Health & Fitness
- **Secondary (optional):** Lifestyle

## Age Rating questionnaire — recommended answers
Apple's questionnaire doesn't have an exact "13+" tier — the closest fit given the app's own 13+ sign-up gate and moderated (not unrestricted) user content is **12+**. Answer the actual questionnaire yourself in App Store Connect since Apple's exact wording matters, but here's the reasoning for the categories most likely to come up:
- **Unrestricted Web Access:** No
- **User-Generated Content:** Yes (forum posts, comments, direct messages) — but note it's moderated with report + block tools, which keeps this from pushing the rating to 17+
- **Medical/Treatment Information:** No (general fitness/nutrition education, not medical advice — the app is explicit about this in-app and in the Terms)
- **Alcohol, Tobacco, or Drug Use:** No
- **Mature/Suggestive Themes, Horror, Gambling, Contests:** No to all
- **In-App Purchases / Loot Boxes:** No

## App Privacy ("Nutrition Label") questionnaire — data types to declare
Every data type below should be marked **linked to the user's identity** and **used for App Functionality** (none of it is used for third-party advertising or tracking — see the Tracking question below).

| Apple's category | What you collect | Used for |
|---|---|---|
| Contact Info → Email Address | Sign-up email | App Functionality |
| Identifiers → User ID | Account ID | App Functionality |
| Health & Fitness → Fitness | Workout completions, quests, XP, streaks, focus sessions | App Functionality |
| Health & Fitness → Health | Weight logs, body measurements | App Functionality |
| User Content → Photos or Videos | Progress photos (AI Analyzer photos are NOT stored — processed once and discarded) | App Functionality |
| User Content → Other User Content | Forum posts, comments, direct messages | App Functionality |
| Usage Data → Product Interaction | In-app actions (quest/workout completions, achievement unlocks) | App Functionality |

**"Do you or your third-party partners use data collected from this app to track users?"** → **No.** There's no ad SDK, no IDFA usage, no cross-app/cross-site tracking. (The ad slot built into the app is currently disabled and unused — if it's ever turned on with a real ad network later, this answer and the data-collection table both need to be revisited before that update ships.)

---

## Screenshots (in `store-assets/`, all 1290×2796 — iPhone 6.7" display)
Upload in this order:
1. `screenshot-1-home.png` — Home, with Lock In
2. `screenshot-2-achievements.png` — Quests, with the achievements grid
3. `screenshot-3-progress.png` — Analyze → Progress, weight trend chart
4. `screenshot-4-nutrition.png` — Nutrition, calculator + meal plan

`screenshot-native-plans.png` is a real (non-staged) native Simulator capture at a smaller size (1179×2556, iPhone 6.1") — useful as a sanity check that the app looks right in an actual build, but not sized for the required upload slot.

App Store Connect will ask for the largest size (6.9"/6.7", 1290×2796 — covered above); it can auto-generate the smaller display sizes from that if you don't upload them separately.

## App Icon
`app-icon-1024.png` — 1024×1024, no alpha channel, already matches what's built into the Xcode project.
