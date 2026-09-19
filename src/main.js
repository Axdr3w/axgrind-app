import './style.css';
import { initLanguageFromStorage, hasChosenLanguage, getLanguage, setLanguage, t } from './i18n/index.js';
import { openLanguagePicker } from './i18n/picker.js';
import { renderQuote, newQuote, refreshQuoteForUser } from './quotes.js';
import { renderWorkouts, filterCategory, filterMuscle, filterEnv, filterSportList, selectSportOrProgram, backToBrowseList, openWorkout, closeWorkout, initPlans, teardownPlans, startWorkoutSession, toggleWorkoutTimer, toggleExerciseChecked, toggleVoiceGuidance, finishWorkout, skipRest, togglePlateCalc, calcPlates, toggleExerciseLog, updateExerciseLogDraft, saveExerciseLog, dismissSessionIconsHint } from './plans.js';
import { renderBrainArticles, selectBrainCategory, backToBrainCategories, openArticle, closeArticle, markArticleRead, initBrain, teardownBrain } from './brain.js';
import { calcCalories } from './nutrition.js';
import { handlePhotoUpload, removePhoto, analyzeBody, initAnalyzer, teardownAnalyzer } from './analyzer.js';
import { sendChip, chatKeydown, autoGrow, sendChatMessage, saveChatMessage, toggleSavedView, deleteSavedChatItem, initCoach, teardownCoach } from './coach.js';
import { renderVideoLibrary, filterVideoLibrary, openExerciseInfo, closeExerciseInfo } from './videos.js';
import { initQuests, teardownQuests, toggleWorkoutHistory } from './quests.js';
import { initForum, teardownForum, removeForumImage } from './forum.js';
import { fetchDisplayName, updateDisplayName, fetchHandle, fetchLanguage, updateLanguage, fetchAccentColor, updateAccentColor, fetchBgTheme, updateBgTheme } from './api/profile.js';
import { initThemeFromStorage, applyAccentColor, renderAccentUI, getAccentColor, applyBgTheme, renderBgThemeUI, getBgThemeId } from './theme.js';
import { getLanguageMeta, isSupported } from './i18n/languages.js';
import { maybeStartTour, tourNext, tourBack, finishTour } from './onboarding.js';
import { openBreathIntro, closeBreathSession } from './breathwork.js';
import { initFocus, teardownFocus } from './focus.js';
import { initProgress, teardownProgress, closePhotoLightbox } from './progress.js';
import { renderWrapped } from './wrapped.js';
import { initAchievements, teardownAchievements, toggleAchievements } from './achievements.js';
import { initMeasurements, teardownMeasurements } from './measurements.js';
import { initDMs, teardownDMs } from './dm.js';
import { initLeaderboard, teardownLeaderboard } from './leaderboard.js';
import { getRankMap } from './rank-cache.js';
import { initAds } from './ads.js';
import {
  signUpWithPassword,
  signInWithPassword,
  signInWithMagicLink,
  signOut,
  getSession,
  onAuthStateChange,
  resolveLoginIdentifier,
  setUsername,
  deleteAccount,
  completeSessionFromUrl,
  requestPasswordReset,
  updatePassword,
} from './auth.js';

// ===================== NAV =====================

// Applies immediately regardless of login state (works for guests too, via
// localStorage) and syncs to the profile in the background when logged in
// so the choice follows the user across devices — same pattern as language.
function selectAccentColor(color) {
  applyAccentColor(color);
  if (lastUserId) updateAccentColor(lastUserId, color).catch((err) => console.error('[accent color sync]', err));
}

function selectBgTheme(id) {
  applyBgTheme(id);
  if (lastUserId) updateBgTheme(lastUserId, id).catch((err) => console.error('[theme sync]', err));
}

// Each entry's modules all live on that one page (including its sub-tabs,
// e.g. Analyze's Progress/Measurements/AI-Scan panels, or Quests' embedded
// Achievements/Leaderboard sections) — grouped so a single visit to the page
// initializes everything on it, rather than one round-trip per sub-panel.
const pageInitFns = {
  home: (userId) => { initFocus(userId); },
  quests: (userId) => { initQuests(userId); initAchievements(userId); initLeaderboard(userId); },
  plans: (userId) => { initPlans(userId); initBrain(userId).then(() => renderBrainArticles()); },
  analyze: (userId) => { initProgress(userId); initMeasurements(userId); initAnalyzer(userId); },
  chat: (userId) => { initCoach(userId); },
  forum: (userId) => { initForum(userId); maybeShowUsernameNudge('page-forum', t('account.forumNeedsUsername')); },
  messages: (userId) => { initDMs(userId); maybeShowUsernameNudge('page-messages', t('account.messagesNeedUsername')); },
  wrapped: (userId) => { renderWrapped(userId); },
};

// A username is only actually required to post/comment/DM — it's no longer
// forced at login (see promptForUsername) — so Forum/Messages nudge for one
// the first time they're opened without one, instead of blocking the page.
function maybeShowUsernameNudge(pageId, message) {
  if (document.getElementById('account-handle-display').dataset.hasHandle !== '0') return;
  const page = document.getElementById(pageId);
  if (page.querySelector('.inline-banner')) return;
  const nudge = document.createElement('div');
  nudge.className = 'inline-banner';
  nudge.innerHTML = `<span>${message}</span><button type="button">${t('account.pickUsernameSave')}</button>`;
  nudge.querySelector('button').addEventListener('click', () => promptForUsername());
  page.insertBefore(nudge, page.querySelector('.section-header').nextSibling);
}
let initializedPages = new Set();

// Runs a page's data/listener setup the first time it's actually visited by
// the current user, instead of eagerly for every page at login — see the
// comment that used to live in updateAccountUI for why this was deferred
// (it now isn't: guarded by initializedPages, so each page's init fires
// exactly once per login regardless of how many times it's revisited).
function ensurePageInit(pageId) {
  if (!lastUserId || initializedPages.has(pageId)) return;
  const fn = pageInitFns[pageId];
  if (!fn) return;
  initializedPages.add(pageId);
  fn(lastUserId);
}

function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('[data-page]').forEach(t => t.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');
  ensurePageInit(id);
  const tab = document.querySelector(`.nav-tab[data-page="${id}"]`);
  if (tab) {
    tab.classList.add('active');
    // On mobile the nav scrolls horizontally instead of wrapping, so keep
    // the active tab in view instead of leaving it scrolled off-screen.
    tab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }
  // A page reached through the "More" menu has no button in the primary
  // row — highlight the More button itself so it's still clear which
  // section is active, and mark the matching row inside the menu too.
  const moreItem = document.querySelector(`.nav-more-item[data-page="${id}"]`);
  if (moreItem) {
    moreItem.classList.add('active');
    document.getElementById('nav-more-btn').classList.add('active');
  }
  window.scrollTo(0, 0);
}

function openNavMore() {
  document.getElementById('nav-more-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeNavMore() {
  document.getElementById('nav-more-modal').classList.remove('open');
  document.body.style.overflow = '';
}

// The Analyze tab grew into five distinct tools (weigh-ins, photos,
// measurements, AI scan) stacked on one long scroll — this splits them into
// sub-tabs instead. Every panel's data is already fetched at login
// regardless of which is visible, so switching is a pure display toggle,
// nothing to re-fetch.
function selectAnalyzeSubtab(name) {
  document.querySelectorAll('#analyze-subtabs .muscle-tab').forEach((t) => {
    t.classList.toggle('active', t.dataset.subtab === name);
  });
  document.querySelectorAll('.analyze-subpage').forEach((p) => {
    p.style.display = p.id === `analyze-subpage-${name}` ? 'block' : 'none';
  });
  window.scrollTo(0, 0);
}

// Legacy inline onclick/onchange handlers in index.html call these on window.
Object.assign(window, {
  showPage,
  openNavMore,
  closeNavMore,
  newQuote,
  filterCategory,
  filterMuscle,
  filterEnv,
  filterSportList,
  selectSportOrProgram,
  backToBrowseList,
  openWorkout,
  closeWorkout,
  startWorkoutSession,
  toggleWorkoutTimer,
  toggleExerciseChecked,
  toggleVoiceGuidance,
  finishWorkout,
  skipRest,
  togglePlateCalc,
  calcPlates,
  toggleExerciseLog,
  updateExerciseLogDraft,
  saveExerciseLog,
  dismissSessionIconsHint,
  selectBrainCategory,
  backToBrainCategories,
  openArticle,
  closeArticle,
  markArticleRead,
  calcCalories,
  handlePhotoUpload,
  removePhoto,
  analyzeBody,
  sendChip,
  chatKeydown,
  autoGrow,
  sendChatMessage,
  saveChatMessage,
  toggleSavedView,
  deleteSavedChatItem,
  closeExerciseInfo,
  selectAccentColor,
  selectBgTheme,
  toggleWorkoutHistory,
  openBreathIntro,
  closeBreathSession,
  closePhotoLightbox,
  closeUsernameModal,
  toggleAchievements,
  selectAnalyzeSubtab,
  removeForumImage,
});

// Applies the detected/stored language immediately (first paint is already
// localized), then — on a true first visit — opens the picker as a
// confirm/change prompt on top of everything else, including the login screen.
initLanguageFromStorage();
if (!hasChosenLanguage()) {
  openLanguagePicker();
}

initThemeFromStorage();
renderAccentUI();
renderBgThemeUI();
initAds();

renderQuote();
renderWorkouts();
renderVideoLibrary();
// Brain articles are NOT pre-rendered here like the others above — the
// 1.5MB article dataset is already lazy-imported inside brain.js, but
// calling renderBrainArticles() unconditionally at boot defeated that by
// fetching it for every visitor immediately, logged in or not. It's not
// part of the guest preview, so there's nothing to show before login
// anyway — initBrain()'s own renderBrainArticles() call (below) covers it.

document.getElementById('video-search').addEventListener('input', (e) => {
  filterVideoLibrary(e.target.value);
});

document.getElementById('modal-body').addEventListener('click', (e) => {
  const row = e.target.closest('.exercise-row[data-exercise]');
  if (row) openExerciseInfo(row.dataset.exercise);
});

// ===================== ACCOUNT / AUTH =====================
const authTabLogin = document.getElementById('auth-tab-login');
const authTabSignup = document.getElementById('auth-tab-signup');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const magicLinkBtn = document.getElementById('magic-link-btn');
const logoutBtn = document.getElementById('logout-btn');
const authMessage = document.getElementById('auth-message');
const guestView = document.getElementById('account-guest-view');
const loggedInView = document.getElementById('account-logged-in-view');

function setAuthMessage(text, isError) {
  authMessage.textContent = text;
  authMessage.style.color = isError ? '#ff6040' : '#4ade80';
}

let lastUserId = null;

function updateAccountUI(session) {
  document.body.classList.toggle('locked', !session?.user);
  if (session?.user) {
    guestView.style.display = 'none';
    loggedInView.style.display = 'block';
    const email = session.user.email || '';
    document.getElementById('account-email-display').textContent = email;
    document.getElementById('account-avatar').textContent = email[0]?.toUpperCase() || 'A';
    if (session.user.id !== lastUserId) {
      const forUserId = session.user.id;
      lastUserId = session.user.id;
      initializedPages = new Set();
      // Only the page the user is actually looking at right now needs its
      // data immediately — everywhere else lazy-inits the moment showPage()
      // navigates there (see pageInitFns/ensurePageInit above). Before this,
      // all 12 modules below fired unconditionally at login: 18 network
      // round-trips before the app was "ready", regardless of which tab (if
      // any) the user ever opened.
      const activePageId = document.querySelector('.page.active')?.id.replace('page-', '');
      if (activePageId) ensurePageInit(activePageId);
      fetchDisplayName(session.user.id).then((name) => {
        if (forUserId !== lastUserId) return;
        document.getElementById('display-name-input').value = name || '';
      });
      fetchHandle(session.user.id).then((handle) => {
        if (forUserId !== lastUserId) return;
        const handleDisplay = document.getElementById('account-handle-display');
        handleDisplay.textContent = handle ? '@' + handle : t('account.noUsernameSet');
        handleDisplay.dataset.hasHandle = handle ? '1' : '0';
        // A username is only load-bearing for Forum/Messages — everything
        // else works fine without one, so it's no longer a forced gate at
        // login. Forum/Messages prompt for it themselves when it's actually
        // needed; here it's just a clickable hint (see the click listener
        // near promptForUsername) for anyone who wants to set it up early.
        maybeStartTour(session.user.id);
      });
      getRankMap().then((map) => {
        if (forUserId !== lastUserId) return;
        const rank = map.get(session.user.id);
        document.getElementById('account-rank-display').textContent = rank ? '#' + rank : '—';
      });
      fetchLanguage(session.user.id).then((lang) => {
        if (forUserId !== lastUserId) return;
        if (lang && isSupported(lang) && lang !== getLanguage()) {
          setLanguage(lang);
        } else if (!lang) {
          updateLanguage(session.user.id, getLanguage()).catch((err) => console.error('[language sync]', err));
        }
        document.getElementById('account-language-display').textContent = getLanguageMeta(getLanguage()).nativeName;
      }).catch(() => {
        document.getElementById('account-language-display').textContent = getLanguageMeta(getLanguage()).nativeName;
      });
      fetchAccentColor(session.user.id).then((color) => {
        if (forUserId !== lastUserId) return;
        if (color) applyAccentColor(color);
        else updateAccentColor(session.user.id, getAccentColor()).catch((err) => console.error('[accent color sync]', err));
      }).catch((err) => console.error('[accent color fetch]', err));
      fetchBgTheme(session.user.id).then((themeId) => {
        if (forUserId !== lastUserId) return;
        if (themeId) applyBgTheme(themeId);
        else updateBgTheme(session.user.id, getBgThemeId()).catch((err) => console.error('[theme sync]', err));
      }).catch((err) => console.error('[theme fetch]', err));
      refreshQuoteForUser(session.user.id);
    }
  } else {
    guestView.style.display = 'block';
    loggedInView.style.display = 'none';
    usernameModal.classList.remove('open');
    document.body.style.overflow = '';
    deleteAccountConfirm.style.display = 'none';
    deleteAccountBtn.style.display = 'block';
    deleteAccountMessage.textContent = '';
    if (lastUserId !== null) {
      lastUserId = null;
      initializedPages.clear();
      teardownFocus();
      teardownProgress();
      teardownMeasurements();
      teardownAchievements();
      teardownQuests();
      teardownForum();
      teardownDMs();
      teardownLeaderboard();
      teardownPlans();
      teardownBrain();
      renderBrainArticles();
      teardownCoach();
      teardownAnalyzer();
    }
  }
}

const forgotPasswordForm = document.getElementById('forgot-password-form');
const forgotPasswordLink = document.getElementById('forgot-password-link');
const backToLoginLink = document.getElementById('back-to-login-link');
const showPasswordLoginLink = document.getElementById('show-password-login-link');
const passwordAuthSection = document.getElementById('password-auth-section');

// Magic link is the default, front-and-center path on the guest auth card;
// password login/signup is a secondary path revealed on demand so it doesn't
// front-load the whole tabs+forms stack before a first-time visitor sees it.
showPasswordLoginLink.addEventListener('click', () => {
  showPasswordLoginLink.style.display = 'none';
  passwordAuthSection.style.display = 'block';
});

authTabLogin.addEventListener('click', () => {
  authTabLogin.classList.add('active');
  authTabSignup.classList.remove('active');
  loginForm.style.display = 'flex';
  signupForm.style.display = 'none';
  forgotPasswordForm.style.display = 'none';
  setAuthMessage('', false);
});

authTabSignup.addEventListener('click', () => {
  authTabSignup.classList.add('active');
  authTabLogin.classList.remove('active');
  signupForm.style.display = 'flex';
  loginForm.style.display = 'none';
  forgotPasswordForm.style.display = 'none';
  setAuthMessage('', false);
});

forgotPasswordLink.addEventListener('click', () => {
  loginForm.style.display = 'none';
  forgotPasswordForm.style.display = 'flex';
  document.getElementById('forgot-password-email').value = document.getElementById('login-email').value.trim();
  setAuthMessage('', false);
});

backToLoginLink.addEventListener('click', () => {
  forgotPasswordForm.style.display = 'none';
  loginForm.style.display = 'flex';
  setAuthMessage('', false);
});

forgotPasswordForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = originalText + '…';
  try {
    const email = document.getElementById('forgot-password-email').value.trim();
    const { error } = await requestPasswordReset(email);
    setAuthMessage(error ? error.message : t('account.resetLinkSent'), !!error);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
});

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = originalText + '…';
  try {
    const identifier = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    try {
      const email = await resolveLoginIdentifier(identifier);
      const { error } = await signInWithPassword(email, password);
      setAuthMessage(error ? error.message : t('account.loggedIn'), !!error);
    } catch (err) {
      setAuthMessage(err.message, true);
    }
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
});

signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = originalText + '…';
  try {
    const username = document.getElementById('signup-username').value.trim();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const { data, error } = await signUpWithPassword(email, password);
    if (error) {
      setAuthMessage(error.message, true);
      return;
    }
    if (data?.user?.id) {
      try {
        await setUsername(data.user.id, username);
      } catch (err) {
        setAuthMessage(t('account.usernameSetupFailed', { reason: err.message }), true);
        return;
      }
    }
    setAuthMessage(t('account.checkEmailConfirm'), false);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
});

const usernameModal = document.getElementById('username-modal');
const pickUsernameForm = document.getElementById('pick-username-form');
const pickUsernameInput = document.getElementById('pick-username-input');
const pickUsernameMessage = document.getElementById('pick-username-message');

// A username is only actually needed for Forum/Messages (everywhere else
// falls back to "AX.GRIND member" just fine) — so this is opened on demand
// rather than forced at login: from the clickable "no username set" hint on
// Account (see the click listener below), or by Forum/DMs themselves the
// first time a handle-less user tries to use them.
function promptForUsername() {
  pickUsernameInput.value = '';
  pickUsernameMessage.textContent = '';
  usernameModal.classList.add('open');
  document.body.style.overflow = 'hidden';
  pickUsernameInput.focus();
}

function closeUsernameModal() {
  usernameModal.classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('account-handle-display').addEventListener('click', (e) => {
  if (e.target.dataset.hasHandle === '0') promptForUsername();
});

pickUsernameForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!lastUserId) return;
  const handle = pickUsernameInput.value.trim();
  try {
    await setUsername(lastUserId, handle);
    const handleDisplay = document.getElementById('account-handle-display');
    handleDisplay.textContent = '@' + handle;
    handleDisplay.dataset.hasHandle = '1';
    closeUsernameModal();
  } catch (err) {
    pickUsernameMessage.textContent = err.message;
    pickUsernameMessage.style.color = '#ff6040';
  }
});

magicLinkBtn.addEventListener('click', async () => {
  const email = document.getElementById('magic-email').value;
  if (!email) { setAuthMessage(t('account.enterEmailFirst'), true); return; }
  const originalText = magicLinkBtn.textContent;
  magicLinkBtn.disabled = true;
  magicLinkBtn.textContent = originalText + '…';
  try {
    const { error } = await signInWithMagicLink(email);
    if (error) {
      setAuthMessage(error.message, true);
      return;
    }
    // A small line of text below the button was easy to miss, especially
    // with the keyboard still open on a phone — swap to a dedicated state
    // that's impossible to scroll past unnoticed.
    document.getElementById('magic-link-sent-desc').textContent = t('account.magicLinkSent');
    document.getElementById('magic-link-form').style.display = 'none';
    document.getElementById('magic-link-sent-state').style.display = 'block';
  } finally {
    magicLinkBtn.disabled = false;
    magicLinkBtn.textContent = originalText;
  }
});

document.getElementById('magic-link-use-different').addEventListener('click', () => {
  document.getElementById('magic-link-sent-state').style.display = 'none';
  document.getElementById('magic-link-form').style.display = 'block';
  document.getElementById('magic-email').value = '';
  document.getElementById('magic-email').focus();
});

logoutBtn.addEventListener('click', async () => {
  await signOut();
});

const deleteAccountBtn = document.getElementById('delete-account-btn');
const deleteAccountConfirm = document.getElementById('delete-account-confirm');
const deleteAccountConfirmBtn = document.getElementById('delete-account-confirm-btn');
const deleteAccountCancelBtn = document.getElementById('delete-account-cancel-btn');
const deleteAccountMessage = document.getElementById('delete-account-message');

deleteAccountBtn.addEventListener('click', () => {
  deleteAccountConfirm.style.display = 'block';
  deleteAccountBtn.style.display = 'none';
});
deleteAccountCancelBtn.addEventListener('click', () => {
  deleteAccountConfirm.style.display = 'none';
  deleteAccountBtn.style.display = 'block';
  deleteAccountMessage.textContent = '';
});
deleteAccountConfirmBtn.addEventListener('click', async () => {
  const originalText = deleteAccountConfirmBtn.textContent;
  deleteAccountConfirmBtn.disabled = true;
  deleteAccountConfirmBtn.textContent = originalText + '…';
  try {
    await deleteAccount();
  } catch (err) {
    deleteAccountMessage.textContent = t('account.deleteFailed', { reason: err.message });
    deleteAccountMessage.style.color = '#ff6040';
    deleteAccountConfirmBtn.disabled = false;
    deleteAccountConfirmBtn.textContent = originalText;
  }
});

document.getElementById('save-display-name-btn').addEventListener('click', async () => {
  const msgEl = document.getElementById('display-name-message');
  const name = document.getElementById('display-name-input').value.trim();
  if (!lastUserId) return;
  try {
    await updateDisplayName(lastUserId, name || null);
    msgEl.textContent = t('account.saved');
    msgEl.style.color = '#4ade80';
  } catch (err) {
    msgEl.textContent = t('account.errorSaveDisplayName', { reason: err.message });
    msgEl.style.color = '#ff6040';
  }
});

document.getElementById('accent-color-picker').addEventListener('input', (e) => {
  selectAccentColor(e.target.value);
});

// ===================== ONBOARDING TOUR =====================
document.getElementById('tour-next-btn').addEventListener('click', tourNext);
document.getElementById('tour-back-btn').addEventListener('click', tourBack);
document.getElementById('tour-skip-btn').addEventListener('click', finishTour);

onAuthStateChange(updateAccountUI);
getSession().then(updateAccountUI);

const resetPasswordModal = document.getElementById('reset-password-modal');
const resetPasswordForm = document.getElementById('reset-password-form');
const resetPasswordMessage = document.getElementById('reset-password-message');

function openResetPasswordModal() {
  resetPasswordForm.reset();
  resetPasswordMessage.textContent = '';
  resetPasswordModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

resetPasswordForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const newPassword = document.getElementById('reset-password-new').value;
  const confirmPassword = document.getElementById('reset-password-confirm').value;
  if (newPassword !== confirmPassword) {
    resetPasswordMessage.textContent = t('account.passwordsDontMatch');
    resetPasswordMessage.style.color = '#ff6040';
    return;
  }
  const { error } = await updatePassword(newPassword);
  if (error) {
    resetPasswordMessage.textContent = error.message;
    resetPasswordMessage.style.color = '#ff6040';
    return;
  }
  resetPasswordModal.classList.remove('open');
  document.body.style.overflow = '';
  setAuthMessage(t('account.passwordUpdated'), false);
});

// A tapped magic-link or password-reset email opens as a Universal Link
// into the native app (see App.entitlements and SceneDelegate.swift)
// rather than a normal page load — and even on the plain website,
// Supabase's own auto-detection is off (see supabaseClient.js) — so both
// paths funnel through this same manual handler. A `type=recovery` link
// opens the "set new password" modal instead of just signing in.
function handleAuthUrl(url) {
  completeSessionFromUrl(url).then((type) => {
    if (type === 'recovery') openResetPasswordModal();
  });
}

handleAuthUrl(window.location.href);
window.__handleUniversalLink = handleAuthUrl;

// Keeps the Account page's language readout in sync, and persists the new
// choice to the signed-in user's profile so it follows them across devices.
window.addEventListener('ax:languagechange', () => {
  document.getElementById('account-language-display').textContent = getLanguageMeta(getLanguage()).nativeName;
  if (lastUserId) updateLanguage(lastUserId, getLanguage()).catch((err) => console.error('[language sync]', err));
});
