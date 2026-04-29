import * as classic from './classic/classic.js';
import * as sidebar from './sidebar/sidebar.js';
import * as cover from './cover/cover.js';

export const TEMPLATES = {
  'classic': { module: classic },
  'sidebar': { module: sidebar },
  'cover':   { module: cover },
};

let _currentId = 'classic';
let _currentModule = classic;

export function getCurrentTemplateId() { return _currentId; }
export function getCurrentTemplate() { return _currentModule; }

export function setTemplate(id) {
  if (!TEMPLATES[id]) return false;
  _currentId = id;
  _currentModule = TEMPLATES[id].module;

  const card = document.getElementById('personaCard');
  if (!card) return false;

  card.setAttribute('data-template', id);
  card.innerHTML = _currentModule.scaffold();
  return true;
}
