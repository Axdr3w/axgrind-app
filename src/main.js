import './style.css';
import { initLanguageFromStorage, hasChosenLanguage, getLanguage, setLanguage, t } from './i18n/index.js';
import { openLanguagePicker } from './i18n/picker.js';
import { renderQuote, newQuote } from './quotes.js';
import { renderWorkouts, filterCategory, filterMuscle, filterEnv, filterSportList, selectSportOrProgram, backToBrowseList, openWorkout, closeWorkout, initPlans, teardownPlans, startWorkoutSession, toggleWorkoutTimer, toggleExerciseChecked, finishWorkout } from './plans.js';
import { renderBrainArticles, selectBrainCategory, backToBrainCategories, openArticle, closeArticle, markArticleRead, initBrain, teardownBrain } from './brain.js';
import { calcCalories } from './nutrition.js';
import { handlePhotoUpload, removePhoto, analyzeBody, initAnalyzer, teardownAnalyzer } from './analyzer.js';
import { sendChip, chatKeydown, autoGrow, sendChatMessage, saveChatMessage, toggleSavedView, deleteSavedChatItem, initCoach, teardownCoach } from './coach.js';
import { renderVideoLibrary, filterVideoLibrary, openExerciseInfo, closeExerciseInfo } from './videos.js';
import { initQuests, teardownQuests, toggleWorkoutHistory } from './quests.js';
import { initForum, teardownForum } from './forum.js';
import { fetchDisplayName, updateDisplayName, fetchHandle, fetchLanguage, updateLanguage, fetchAccentColor, updateAccentColor, fetchBgTheme, updateBgTheme } from './api/profile.js';
import { initThemeFromStorage, applyAccentColor, renderAccentUI, getAccentColor, applyBgTheme, renderBgThemeUI, getBgThemeId } from './theme.js';
import { getLanguageMeta, isSupported } from './i18n/languages.js';
import { maybeStartTour, tourNext, tourBack, finishTour } from './onboarding.js';
import { openBreathIntro, closeBreathSession } from './breathwork.js';
import { initFocus, teardownFocus } from './focus.js';
import { initProgress, teardownProgress, closePhotoLightbox } from './progress.js';
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
} from './auth.js';

// ===================== NAV =====================

// Applies immediately regardless of login state (works for guests too, via
// localStorage) and syncs to the profile in the background when logged in
// so the choice follows the user across devices — same pattern as language.
function selectAccentColor(color) {
  applyAccentColor(color);
  if (lastUserId) updateAccentColor(lastUserId, color).catch(() => {});
}

function selectBgTheme(id) {
  applyBgTheme(id);
  if (lastUserId) updateBgTheme(lastUserId, id).catch(() => {});
}

function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('[data-page]').forEach(t => t.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');
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
  finishWorkout,
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
  toggleAchievements,
  selectAnalyzeSubtab,
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
renderBrainArticles();

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
      lastUserId = session.user.id;
      initFocus(session.user.id);
      initProgress(session.user.id);
      initMeasurements(session.user.id);
      initAchievements(session.user.id);
      initQuests(session.user.id);
      initForum(session.user.id);
      initDMs(session.user.id);
      initLeaderboard(session.user.id);
      initPlans(session.user.id);
      initBrain(session.user.id).then(() => renderBrainArticles());
      initCoach(session.user.id);
      initAnalyzer(session.user.id);
      fetchDisplayName(session.user.id).then((name) => {
        document.getElementById('display-name-input').value = name || '';
      });
      fetchHandle(session.user.id).then((handle) => {
        document.getElementById('account-handle-display').textContent = handle ? '@' + handle : t('account.noUsernameSet');
        if (handle) {
          maybeStartTour(session.user.id);
        } else {
          promptForUsername();
        }
      });
      getRankMap().then((map) => {
        const rank = map.get(session.user.id);
        document.getElementById('account-rank-display').textContent = rank ? '#' + rank : '—';
      });
      fetchLanguage(session.user.id).then((lang) => {
        if (lang && isSupported(lang) && lang !== getLanguage()) {
          setLanguage(lang);
        } else if (!lang) {
          updateLanguage(session.user.id, getLanguage()).catch(() => {});
        }
        document.getElementById('account-language-display').textContent = getLanguageMeta(getLanguage()).nativeName;
      }).catch(() => {
        document.getElementById('account-language-display').textContent = getLanguageMeta(getLanguage()).nativeName;
      });
      fetchAccentColor(session.user.id).then((color) => {
        if (color) applyAccentColor(color);
        else updateAccentColor(session.user.id, getAccentColor()).catch(() => {});
      }).catch(() => {});
      fetchBgTheme(session.user.id).then((themeId) => {
        if (themeId) applyBgTheme(themeId);
        else updateBgTheme(session.user.id, getBgThemeId()).catch(() => {});
      }).catch(() => {});
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

authTabLogin.addEventListener('click', () => {
  authTabLogin.classList.add('active');
  authTabSignup.classList.remove('active');
  loginForm.style.display = 'flex';
  signupForm.style.display = 'none';
  setAuthMessage('', false);
});

authTabSignup.addEventListener('click', () => {
  authTabSignup.classList.add('active');
  authTabLogin.classList.remove('active');
  signupForm.style.display = 'flex';
  loginForm.style.display = 'none';
  setAuthMessage('', false);
});

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const identifier = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  try {
    const email = await resolveLoginIdentifier(identifier);
    const { error } = await signInWithPassword(email, password);
    setAuthMessage(error ? error.message : t('account.loggedIn'), !!error);
  } catch (err) {
    setAuthMessage(err.message, true);
  }
});

signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();
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
});

const usernameModal = document.getElementById('username-modal');
const pickUsernameForm = document.getElementById('pick-username-form');
const pickUsernameInput = document.getElementById('pick-username-input');
const pickUsernameMessage = document.getElementById('pick-username-message');

// Forces anyone who reaches a signed-in state with no handle yet (currently
// only magic-link sign-ins, since password sign-up already collects one) to
// pick a username before they can do anything else — otherwise they'd show
// up everywhere as the generic "AX.GRIND member" fallback.
function promptForUsername() {
  pickUsernameInput.value = '';
  pickUsernameMessage.textContent = '';
  usernameModal.classList.add('open');
  document.body.style.overflow = 'hidden';
  pickUsernameInput.focus();
}

pickUsernameForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!lastUserId) return;
  const handle = pickUsernameInput.value.trim();
  try {
    await setUsername(lastUserId, handle);
    document.getElementById('account-handle-display').textContent = '@' + handle;
    usernameModal.classList.remove('open');
    document.body.style.overflow = '';
    maybeStartTour(lastUserId);
  } catch (err) {
    pickUsernameMessage.textContent = err.message;
    pickUsernameMessage.style.color = '#ff6040';
  }
});

magicLinkBtn.addEventListener('click', async () => {
  const email = document.getElementById('magic-email').value;
  if (!email) { setAuthMessage(t('account.enterEmailFirst'), true); return; }
  const { error } = await signInWithMagicLink(email);
  setAuthMessage(error ? error.message : t('account.magicLinkSent'), !!error);
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
  deleteAccountConfirmBtn.disabled = true;
  try {
    await deleteAccount();
  } catch (err) {
    deleteAccountMessage.textContent = t('account.deleteFailed', { reason: err.message });
    deleteAccountMessage.style.color = '#ff6040';
    deleteAccountConfirmBtn.disabled = false;
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

// Keeps the Account page's language readout in sync, and persists the new
// choice to the signed-in user's profile so it follows them across devices.
window.addEventListener('ax:languagechange', () => {
  document.getElementById('account-language-display').textContent = getLanguageMeta(getLanguage()).nativeName;
  if (lastUserId) updateLanguage(lastUserId, getLanguage()).catch(() => {});
});
