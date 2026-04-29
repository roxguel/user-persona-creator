import { state, escapeAttr, clamp, currentLang } from './state.js';
import { I18N } from './i18n.js';

let _onUpdate = () => {};

export function initEditor(onUpdateCallback) {
  _onUpdate = onUpdateCallback;
}

export function renderPersonalityEditor() {
  const container = document.getElementById('personalityList');
  if (!container) return;
  container.innerHTML = '';
  const removeLabel = I18N[currentLang].btnRemoveItem;

  state.personality.forEach((item, i) => {
    const row = document.createElement('div');
    row.className = 'dynamic-item';
    row.innerHTML = `
      <input type="text"   data-idx="${i}" data-key="left"  value="${escapeAttr(item.left)}" />
      <input type="text"   data-idx="${i}" data-key="right" value="${escapeAttr(item.right)}" />
      <input type="number" min="0" max="100" data-idx="${i}" data-key="value" value="${item.value}" />
      <button type="button" class="remove-btn" data-idx="${i}" title="${escapeAttr(removeLabel)}" aria-label="${escapeAttr(removeLabel)}">×</button>
    `;
    container.appendChild(row);
  });

  container.appendChild(createAddButton(() => {
    state.personality.push({ left: '', right: '', value: 50 });
    renderPersonalityEditor();
    _onUpdate();
  }));

  container.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', (e) => {
      const idx = +e.target.dataset.idx;
      const key = e.target.dataset.key;
      state.personality[idx][key] = key === 'value' ? clamp(+e.target.value || 0, 0, 100) : e.target.value;
      _onUpdate();
    });
  });

  container.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      state.personality.splice(+e.currentTarget.dataset.idx, 1);
      renderPersonalityEditor();
      _onUpdate();
    });
  });
}

export function renderMotivationsEditor() {
  const container = document.getElementById('motivationsList');
  if (!container) return;
  container.innerHTML = '';
  const removeLabel = I18N[currentLang].btnRemoveItem;

  state.motivations.forEach((item, i) => {
    const row = document.createElement('div');
    row.className = 'dynamic-item single';
    row.innerHTML = `
      <input type="text"   data-idx="${i}" data-key="name"  value="${escapeAttr(item.name)}" />
      <input type="number" min="0" max="10" data-idx="${i}" data-key="value" value="${item.value}" />
      <button type="button" class="remove-btn" data-idx="${i}" title="${escapeAttr(removeLabel)}" aria-label="${escapeAttr(removeLabel)}">×</button>
    `;
    container.appendChild(row);
  });

  container.appendChild(createAddButton(() => {
    state.motivations.push({ name: '', value: 5 });
    renderMotivationsEditor();
    _onUpdate();
  }));

  container.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', (e) => {
      const idx = +e.target.dataset.idx;
      const key = e.target.dataset.key;
      state.motivations[idx][key] = key === 'value' ? clamp(+e.target.value || 0, 0, 10) : e.target.value;
      _onUpdate();
    });
  });

  container.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      state.motivations.splice(+e.currentTarget.dataset.idx, 1);
      renderMotivationsEditor();
      _onUpdate();
    });
  });
}

function createAddButton(onClick) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'btn-add';
  btn.textContent = '+ ' + I18N[currentLang].btnAddItem;
  btn.addEventListener('click', onClick);
  return btn;
}
