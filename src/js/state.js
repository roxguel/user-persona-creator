export let currentLang = 'en';
export function setCurrentLang(lang) { currentLang = lang; }

export const state = {
  primaryColor: '#7C3AED',
  photo: null,
  personality: [],
  motivations: [],
  appDark: false,
  cardDark: false,
  template: 'classic',
  verticalLayout: false,
};

export const TEXT_FIELD_IDS = [
  'name', 'role', 'age', 'location', 'position', 'education',
  'gender', 'maritalStatus', 'chips', 'behavior', 'goals', 'painPoints'
];

export const STORAGE_KEY = 'userPersonaCreator:state';

export let persistEnabled = false;
export function enablePersist() { persistEnabled = true; }

export const $ = (id) => document.getElementById(id);
export function clone(obj) { return JSON.parse(JSON.stringify(obj)); }
export function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }
export function escapeHTML(s) {
  return String(s).replace(/[&<>"']/g, ch => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[ch]));
}
export function escapeAttr(s) { return String(s).replace(/"/g, '&quot;'); }

export function isStorageAvailable() {
  try {
    const k = '__test__';
    localStorage.setItem(k, k);
    localStorage.removeItem(k);
    return true;
  } catch (e) {
    return false;
  }
}

export function buildStateSnapshot() {
  return {
    version: 4,
    language: currentLang,
    primaryColor: $('primaryColor') ? $('primaryColor').value : state.primaryColor,
    photo: state.photo,
    appDark: state.appDark,
    cardDark: state.cardDark,
    template: state.template,
    verticalLayout: state.verticalLayout,
    fields: TEXT_FIELD_IDS.reduce((acc, id) => {
      const el = $(id);
      if (el) acc[id] = el.value;
      return acc;
    }, {}),
    personality: clone(state.personality),
    motivations: clone(state.motivations)
  };
}

export function persistState() {
  if (!persistEnabled || !isStorageAvailable()) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(buildStateSnapshot()));
  } catch (e) {
    // Quota or permission error — fail silently
  }
}

export function loadFromStorage() {
  if (!isStorageAvailable()) return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function clearStorage() {
  if (!isStorageAvailable()) return;
  try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
}
