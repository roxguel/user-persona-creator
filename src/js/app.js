import { state, TEXT_FIELD_IDS, persistState, loadFromStorage, clearStorage, enablePersist, currentLang } from './state.js';
import { I18N, applyTranslations, highlightActiveLang, applyDefaults, setLanguage } from './i18n.js';
import { applyPrimaryColor, renderColorPresets } from './color.js';
import { setAppTheme, setCardTheme } from './themes.js';
import { setTemplate, getCurrentTemplate, TEMPLATES } from '../templates/registry.js';
import { initEditor, renderPersonalityEditor, renderMotivationsEditor } from './editor.js';
import { exportPNG, exportJSON, readJSONFile, applyImportedStateData } from './export.js';

// ── Data collection ──────────────────────────────────────────────────────
function collectFormData() {
  const get = (id) => document.getElementById(id)?.value ?? '';
  return {
    name: get('name').trim() || ' ',
    role: get('role'),
    age: get('age'),
    location: get('location'),
    position: get('position'),
    education: get('education'),
    gender: get('gender'),
    maritalStatus: get('maritalStatus'),
    chips: get('chips'),
    behavior: get('behavior'),
    goals: get('goals'),
    painPoints: get('painPoints'),
    personality: state.personality,
    motivations: state.motivations,
    photo: state.photo,
    lang: currentLang,
  };
}

// ── Preview render ───────────────────────────────────────────────────────
function renderPreview() {
  getCurrentTemplate().render(collectFormData());
  persistState();
}

// ── Template switching ───────────────────────────────────────────────────
function applyTemplate(id) {
  if (!TEMPLATES[id]) return;
  state.template = id;
  setTemplate(id);
  // Re-apply card dark and vertical after scaffold rebuild
  const card = document.getElementById('personaCard');
  if (card) {
    card.classList.toggle('card-dark', state.cardDark);
    card.classList.toggle('vertical', state.verticalLayout);
  }
  applyTranslations(currentLang);
  renderPreview();
  highlightActiveTemplate(id);
  persistState();
}

function highlightActiveTemplate(id) {
  document.querySelectorAll('#templateSelector button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.template === id);
  });
}

// ── Vertical layout ──────────────────────────────────────────────────────
function applyVertical(isVertical) {
  state.verticalLayout = isVertical;
  const card = document.getElementById('personaCard');
  if (card) card.classList.toggle('vertical', isVertical);
  document.querySelectorAll('#orientationToggle button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.orient === (isVertical ? 'vertical' : 'horizontal'));
  });
  persistState();
}

// ── Photo upload ─────────────────────────────────────────────────────────
function handlePhotoUpload(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    state.photo = e.target.result;
    const img = document.getElementById('previewPhoto');
    if (img) { img.src = state.photo; img.classList.add('loaded'); }
    persistState();
  };
  reader.readAsDataURL(file);
}

// ── Reset ────────────────────────────────────────────────────────────────
function resetAll() {
  if (!confirm(I18N[currentLang].confirmReset)) return;
  clearStorage();
  state.photo = null;
  state.appDark = false;
  state.cardDark = false;
  state.template = 'classic';
  state.verticalLayout = false;

  setAppTheme(false);
  setCardTheme(false);

  document.getElementById('primaryColor').value = '#7C3AED';
  applyPrimaryColor('#7C3AED');

  applyDefaults(currentLang, { force: true });
  state.personality = I18N[currentLang].defaults.personality.map(p => ({ ...p }));
  state.motivations = I18N[currentLang].defaults.motivations.map(m => ({ ...m }));

  applyTemplate('classic');
  applyVertical(false);
  renderPersonalityEditor();
  renderMotivationsEditor();
  renderPreview();
}

// ── Import JSON ──────────────────────────────────────────────────────────
async function handleImport(file) {
  if (!file) return;
  let data;
  try {
    data = await readJSONFile(file);
  } catch (err) {
    alert(I18N[currentLang].errorRead + err.message);
    return;
  }

  const result = applyImportedStateData(data);
  if (!result) return;

  if (result.langChanged) applyTranslations(currentLang);
  highlightActiveLang(currentLang);

  applyPrimaryColor(state.primaryColor);

  setAppTheme(state.appDark);
  setCardTheme(state.cardDark);

  applyTemplate(state.template || 'classic');
  applyVertical(state.verticalLayout);

  renderPersonalityEditor();
  renderMotivationsEditor();
  renderPreview();
}

// ── Bind all inputs ──────────────────────────────────────────────────────
function bindInputs() {
  TEXT_FIELD_IDS.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', renderPreview);
  });

  document.getElementById('primaryColor')?.addEventListener('input', (e) => applyPrimaryColor(e.target.value));
  document.getElementById('photoInput')?.addEventListener('change', (e) => handlePhotoUpload(e.target.files[0]));
  document.getElementById('exportBtn')?.addEventListener('click', exportPNG);
  document.getElementById('resetBtn')?.addEventListener('click', resetAll);
  document.getElementById('exportJsonBtn')?.addEventListener('click', exportJSON);
  document.getElementById('importJsonBtn')?.addEventListener('click', () => document.getElementById('importJsonInput')?.click());
  document.getElementById('importJsonInput')?.addEventListener('change', (e) => {
    handleImport(e.target.files[0]);
    e.target.value = '';
  });

  document.querySelectorAll('#langToggle button').forEach(btn => {
    btn.addEventListener('click', () => {
      const changed = setLanguage(btn.dataset.lang, state);
      if (changed) {
        renderPersonalityEditor();
        renderMotivationsEditor();
        renderPreview();
      }
    });
  });

  document.getElementById('appDarkToggle')?.addEventListener('change', (e) => setAppTheme(e.target.checked));
  document.getElementById('cardDarkToggle')?.addEventListener('change', (e) => setCardTheme(e.target.checked));

  document.querySelectorAll('#templateSelector button').forEach(btn => {
    btn.addEventListener('click', () => applyTemplate(btn.dataset.template));
  });

  document.querySelectorAll('#orientationToggle button').forEach(btn => {
    btn.addEventListener('click', () => applyVertical(btn.dataset.orient === 'vertical'));
  });
}

// ── Init ─────────────────────────────────────────────────────────────────
function init() {
  renderColorPresets();
  initEditor(renderPreview);

  const saved = loadFromStorage();
  if (saved && typeof saved === 'object') {
    const result = applyImportedStateData(saved);
    if (result) {
      applyTranslations(currentLang);
      highlightActiveLang(currentLang);
      applyPrimaryColor(state.primaryColor);
      setAppTheme(state.appDark);
      applyTemplate(state.template || 'classic');
      applyVertical(state.verticalLayout);
      setCardTheme(state.cardDark);
    }
  } else {
    applyPrimaryColor(document.getElementById('primaryColor')?.value || '#7C3AED');
    applyTranslations(currentLang);
    highlightActiveLang(currentLang);
    applyDefaults(currentLang, { force: true });
    state.personality = I18N[currentLang].defaults.personality.map(p => ({ ...p }));
    state.motivations = I18N[currentLang].defaults.motivations.map(m => ({ ...m }));
    applyTemplate('classic');
  }

  bindInputs();
  renderPersonalityEditor();
  renderMotivationsEditor();
  renderPreview();

  enablePersist();
  persistState();
}

document.addEventListener('DOMContentLoaded', init);
