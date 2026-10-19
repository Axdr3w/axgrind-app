import { t } from './i18n/index.js';
import { todayStr } from './date-utils.js';

let nutritionUserId = null;
let nutritionState = { goal: 0, days: {} };
let lastEstimate = 0;
let nutritionInitialized = false;

function storageKey() {
  return `ax-nutrition-log-v1:${nutritionUserId || 'guest'}`;
}

function readNutritionState() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey()) || '{}');
    return {
      goal: Number.isFinite(Number(saved.goal)) ? Number(saved.goal) : 0,
      days: saved.days && typeof saved.days === 'object' ? saved.days : {},
    };
  } catch {
    return { goal: 0, days: {} };
  }
}

function saveNutritionState() {
  try { localStorage.setItem(storageKey(), JSON.stringify(nutritionState)); }
  catch { /* Private browsing or full storage: keep the current session usable. */ }
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[char]);
}

function todayEntries() {
  const entries = nutritionState.days[todayStr()];
  return Array.isArray(entries) ? entries : [];
}

function renderFuelTracker() {
  const totalEl = document.getElementById('fuel-total');
  if (!totalEl) return;
  const entries = todayEntries();
  const total = entries.reduce((sum, entry) => sum + (Number(entry.calories) || 0), 0);
  const goalInput = document.getElementById('fuel-goal-input');
  if (document.activeElement !== goalInput) goalInput.value = nutritionState.goal || '';
  totalEl.textContent = total.toLocaleString();

  const progress = document.querySelector('.fuel-progress-track');
  const fill = document.getElementById('fuel-progress-fill');
  const remaining = document.getElementById('fuel-remaining');
  if (nutritionState.goal > 0) {
    const percent = Math.min(100, Math.round(total / nutritionState.goal * 100));
    fill.style.width = `${percent}%`;
    progress.setAttribute('aria-valuenow', String(percent));
    remaining.textContent = total <= nutritionState.goal
      ? t('nutrition.remainingCals', { count: (nutritionState.goal - total).toLocaleString() })
      : t('nutrition.overTargetCals', { count: (total - nutritionState.goal).toLocaleString() });
  } else {
    fill.style.width = '0%';
    progress.setAttribute('aria-valuenow', '0');
    remaining.textContent = t('nutrition.setTargetHint');
  }

  const list = document.getElementById('fuel-entry-list');
  if (entries.length === 0) {
    list.innerHTML = `<div class="fuel-empty">${t('nutrition.emptyLog')}</div>`;
    return;
  }
  list.innerHTML = entries.map((entry, index) => `
    <div class="fuel-entry-row">
      <span class="fuel-entry-meal">${escapeHTML(t(`nutrition.${String(entry.meal || '').toLowerCase()}`))}</span>
      <span class="fuel-entry-name">${escapeHTML(entry.name)}</span>
      <span class="fuel-entry-cals">${Number(entry.calories).toLocaleString()} cal</span>
      <button class="fuel-entry-remove" type="button" data-index="${index}" aria-label="${escapeHTML(t('nutrition.removeFood', { name: entry.name }))}">×</button>
    </div>
  `).join('');
  list.querySelectorAll('.fuel-entry-remove').forEach((button) => {
    button.addEventListener('click', () => {
      const day = todayStr();
      nutritionState.days[day].splice(Number(button.dataset.index), 1);
      saveNutritionState();
      renderFuelTracker();
    });
  });
}

export function initNutrition(userId = null) {
  nutritionUserId = userId || null;
  nutritionState = readNutritionState();
  renderFuelTracker();
}

function saveFuelGoal(value) {
  const goal = Number(value);
  if (!Number.isFinite(goal) || goal < 500 || goal > 10000) return false;
  nutritionState.goal = Math.round(goal);
  saveNutritionState();
  renderFuelTracker();
  return true;
}

function useEstimate() {
  if (!lastEstimate) return;
  saveFuelGoal(lastEstimate);
}

if (!nutritionInitialized) {
  nutritionInitialized = true;
  document.getElementById('fuel-entry-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const nameInput = document.getElementById('fuel-food-name');
    const caloriesInput = document.getElementById('fuel-food-calories');
    const name = nameInput.value.trim();
    const calories = Number(caloriesInput.value);
    if (!name || !Number.isInteger(calories) || calories < 1 || calories > 10000) return;
    const day = todayStr();
    if (!Array.isArray(nutritionState.days[day])) nutritionState.days[day] = [];
    nutritionState.days[day].push({
      name,
      calories,
      meal: document.getElementById('fuel-meal-type').value,
    });
    saveNutritionState();
    event.currentTarget.reset();
    renderFuelTracker();
    nameInput.focus();
  });
  document.getElementById('fuel-goal-input')?.addEventListener('change', (event) => {
    const value = event.currentTarget.value;
    if (!value) {
      nutritionState.goal = 0;
      saveNutritionState();
      renderFuelTracker();
      return;
    }
    if (!saveFuelGoal(value)) {
      event.currentTarget.setCustomValidity('Enter a target between 500 and 10,000 calories, or leave it blank.');
      event.currentTarget.reportValidity();
      event.currentTarget.setCustomValidity('');
    }
  });
  const useEstimateButtons = [document.getElementById('fuel-use-estimate'), document.getElementById('fuel-use-result')];
  useEstimateButtons.forEach((button) => {
    if (!button) return;
    button.disabled = true;
    button.addEventListener('click', useEstimate);
  });
  window.addEventListener('ax:languagechange', renderFuelTracker);
  renderFuelTracker();
}

export function calcCalories() {
  const w = parseFloat(document.getElementById('c-weight').value);
  const h = parseFloat(document.getElementById('c-height').value);
  const a = parseFloat(document.getElementById('c-age').value);
  const act = parseFloat(document.getElementById('c-activity').value);
  const goal = document.getElementById('c-goal').value;
  if (!w || !h || !a) { alert(t('nutrition.fillAllFields')); return; }
  const wKg = w * 0.453592, hCm = h * 2.54;
  const bmr = (10 * wKg) + (6.25 * hCm) - (5 * a) + 5;
  let tdee = Math.round(bmr * act);
  if (goal === 'cut') tdee -= 400;
  if (goal === 'bulk') tdee += 300;
  const protein = Math.round(w * 1);
  const fats = Math.round((tdee * 0.25) / 9);
  const carbs = Math.round((tdee - (protein * 4) - (fats * 9)) / 4);
  lastEstimate = tdee;
  document.getElementById('fuel-use-estimate')?.removeAttribute('disabled');
  document.getElementById('fuel-use-result')?.removeAttribute('disabled');
  document.getElementById('result-cals').textContent = tdee;
  document.getElementById('r-protein').textContent = protein;
  document.getElementById('r-carbs').textContent = carbs;
  document.getElementById('r-fats').textContent = fats;
  document.getElementById('calc-result').classList.add('show');
}
