import { t, getLanguage } from './i18n/index.js';
import { getLanguageMeta } from './i18n/languages.js';
import { findWorkoutById } from './workout-lookup.js';
import { getAuthHeader } from './api/supabaseClient.js';

let uploadedImageBase64 = null, uploadedMediaType = 'image/jpeg';
let currentUserId = null;

export function initAnalyzer(userId) {
  currentUserId = userId;
}

export function teardownAnalyzer() {
  currentUserId = null;
}

// iPhones shoot HEIC by default. Neither Chrome/Firefox/Edge can preview it
// in an <img> tag, nor does the Anthropic vision API accept it as a media
// type (only jpeg/png/gif/webp) — so it has to be converted client-side
// before it ever touches the preview or the API. MIME type detection for
// HEIC is unreliable across browsers/OSes (some report an empty string), so
// this also falls back to checking the filename extension.
function isHeic(file) {
  const type = (file.type || '').toLowerCase();
  const name = (file.name || '').toLowerCase();
  return type === 'image/heic' || type === 'image/heif' || name.endsWith('.heic') || name.endsWith('.heif');
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export async function handlePhotoUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  let workingFile = file;
  let mediaType = file.type || 'image/jpeg';

  if (isHeic(file)) {
    const loadingText = document.getElementById('analyze-loading-text');
    document.getElementById('upload-section').style.display = 'none';
    loadingText.textContent = t('analyze.convertingText');
    document.getElementById('analyze-loading').style.display = 'block';
    try {
      const heic2any = (await import('heic2any')).default;
      const converted = await heic2any({ blob: file, toType: 'image/jpeg', quality: 0.9 });
      workingFile = Array.isArray(converted) ? converted[0] : converted;
      mediaType = 'image/jpeg';
    } catch (err) {
      document.getElementById('analyze-loading').style.display = 'none';
      document.getElementById('upload-section').style.display = 'block';
      alert(t('analyze.heicErrorGeneric', { reason: err.message }));
      return;
    }
    loadingText.textContent = t('analyze.loadingText'); // restore for the analysis step, reused later
    document.getElementById('analyze-loading').style.display = 'none';
  }

  uploadedMediaType = mediaType;
  const dataUrl = await readFileAsDataUrl(workingFile);
  uploadedImageBase64 = dataUrl.split(',')[1];
  document.getElementById('preview-img').src = dataUrl;
  document.getElementById('upload-section').style.display = 'none';
  document.getElementById('photo-preview-section').style.display = 'block';
  document.getElementById('analyze-result').style.display = 'none';
}

export function removePhoto() {
  uploadedImageBase64 = null;
  document.getElementById('body-file-input').value = '';
  document.getElementById('upload-section').style.display = 'block';
  document.getElementById('photo-preview-section').style.display = 'none';
  document.getElementById('analyze-loading').style.display = 'none';
  document.getElementById('analyze-result').style.display = 'none';
}

export async function analyzeBody() {
  if (!uploadedImageBase64) return;
  document.getElementById('photo-preview-section').style.display = 'none';
  document.getElementById('analyze-loading').style.display = 'block';
  document.getElementById('analyze-result').style.display = 'none';
  try {
    const resp = await fetch('/.netlify/functions/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(await getAuthHeader()) },
      body: JSON.stringify({
        imageBase64: uploadedImageBase64,
        mediaType: uploadedMediaType,
        targetLangName: getLanguageMeta(getLanguage()).nativeName,
        userId: currentUserId,
      })
    });
    const data = await resp.json();
    if (data.error) {
      if (resp.status === 429 && data.error.message === 'DAILY_LIMIT_REACHED') {
        document.getElementById('analyze-loading').style.display = 'none';
        document.getElementById('photo-preview-section').style.display = 'block';
        alert(t('analyze.dailyLimitReached', { limit: data.error.limit }));
        return;
      }
      throw new Error(data.error.message);
    }
    const raw = (data.content || []).map(b => b.text || '').join('');
    let result;
    try { result = JSON.parse(raw.replace(/```json|```/g,'').trim()); }
    catch { result = {overall: raw, strengths:[], potential:[], body_type:'—', recommended_plan:'—', workout_tips:'', nutrition_note:'', motivation:'Keep grinding.'}; }
    let html = '';
    if (result.overall) html += `<div class="analysis-section"><h4>${t('analyze.sectionOverall')}</h4><p>${result.overall}</p></div>`;
    if (result.body_type) html += `<div class="analysis-section"><h4>${t('analyze.sectionBodyType')}</h4><p>${result.body_type}</p></div>`;
    if (result.strengths?.length) html += `<div class="analysis-section"><h4>${t('analyze.sectionStrengths')}</h4><div class="analysis-tags">${result.strengths.map(s=>`<span class="a-tag green">${s}</span>`).join('')}</div></div>`;
    if (result.potential?.length) html += `<div class="analysis-section"><h4>${t('analyze.sectionPotential')}</h4><div class="analysis-tags">${result.potential.map(s=>`<span class="a-tag yellow">${s}</span>`).join('')}</div></div>`;
    if (result.workout_tips) html += `<div class="analysis-section"><h4>${t('analyze.sectionWorkoutTips')}</h4><p>${result.workout_tips}</p></div>`;
    if (result.nutrition_note) html += `<div class="analysis-section"><h4>${t('analyze.sectionNutritionNote')}</h4><p>${result.nutrition_note}</p></div>`;
    const recommendedWorkout = result.recommended_plan ? await findWorkoutById(result.recommended_plan) : null;
    if (recommendedWorkout) {
      html += `<div class="analysis-section"><h4>${t('analyze.sectionRecommendedPlan')}</h4><div class="workout-card featured" style="cursor:pointer;" onclick="openWorkout('${recommendedWorkout.id}')"><div class="wc-top"><span class="wc-icon">${recommendedWorkout.icon ?? ''}</span></div><div class="wc-title">${recommendedWorkout.title}</div><div class="section-link" style="margin-top:6px;">${t('analyze.viewPlan')} →</div></div></div>`;
    } else if (result.recommended_plan) {
      html += `<div class="analysis-section"><h4>${t('analyze.sectionRecommendedPlan')}</h4><div class="analysis-tags"><span class="a-tag yellow">${result.recommended_plan}</span></div></div>`;
    }
    if (result.motivation) html += `<div style="margin-top:14px;padding:12px 14px;background:var(--surface2);border-radius:10px;font-style:italic;color:var(--accent);font-size:13px;">"${result.motivation}"</div>`;
    document.getElementById('analysis-content').innerHTML = html;
    document.getElementById('analyze-loading').style.display = 'none';
    document.getElementById('analyze-result').style.display = 'block';
  } catch (err) {
    document.getElementById('analyze-loading').style.display = 'none';
    document.getElementById('photo-preview-section').style.display = 'block';
    alert(t('analyze.errorGeneric', { reason: err.message }));
  }
}
