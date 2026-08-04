import { t } from './i18n/index.js';

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
  document.getElementById('result-cals').textContent = tdee;
  document.getElementById('r-protein').textContent = protein;
  document.getElementById('r-carbs').textContent = carbs;
  document.getElementById('r-fats').textContent = fats;
  document.getElementById('calc-result').classList.add('show');
}
