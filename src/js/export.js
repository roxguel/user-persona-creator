import { state, currentLang, TEXT_FIELD_IDS, clone, clamp, setCurrentLang } from './state.js';
import { I18N } from './i18n.js';
import { tintFromHex, darkTintFromHex } from './color.js';

// html2canvas no respeta object-fit:cover sobre <img>, las estira.
// Workaround: para el snapshot reemplazamos cada <img> por un <div> con
// background-image equivalente (background-size sí lo respeta correctamente).
function convertImagesToBackgrounds(rootEl) {
  const imgs = Array.from(rootEl.querySelectorAll('img'));
  imgs.forEach(img => {
    const src = img.getAttribute('src');
    if (!src) return;

    const cs = getComputedStyle(img);
    const objectFit = cs.objectFit || 'cover';
    const objectPosition = cs.objectPosition || 'center center';

    const div = document.createElement('div');
    if (img.id) div.id = img.id;
    if (img.className) div.className = img.className;

    // Propiedades de layout que el div necesita para ocupar el mismo lugar
    const propsToCopy = [
      'position', 'top', 'right', 'bottom', 'left',
      'width', 'height',
      'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
      'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
      'border-radius', 'border-top-left-radius', 'border-top-right-radius',
      'border-bottom-left-radius', 'border-bottom-right-radius',
      'flex-shrink', 'z-index', 'box-sizing', 'overflow'
    ];
    propsToCopy.forEach(p => {
      const v = cs.getPropertyValue(p);
      if (v) div.style.setProperty(p, v);
    });
    div.style.display = 'block';

    div.style.backgroundImage = `url("${src}")`;
    div.style.backgroundSize = objectFit === 'cover' ? 'cover'
                              : objectFit === 'contain' ? 'contain'
                              : objectFit === 'fill' ? '100% 100%'
                              : 'cover';
    div.style.backgroundPosition = objectPosition;
    div.style.backgroundRepeat = 'no-repeat';

    img.replaceWith(div);

    // Si había foto cargada, los fallbacks (iniciales) deben quedar ocultos
    // — los selectores CSS ya no los apagan porque el sibling ahora es <div>
    const parent = div.parentElement;
    if (parent) {
      parent.querySelectorAll('.avatar-fallback, .tc-cover-fallback')
        .forEach(el => { el.style.display = 'none'; });
    }
  });
}

export async function exportPNG() {
  const card = document.getElementById('personaCard');
  const btn = document.getElementById('exportBtn');
  btn.disabled = true;
  const originalText = btn.textContent;
  btn.textContent = I18N[currentLang].btnGenerating;

  const isVertical = state.verticalLayout;
  const EXPORT_WIDTH = isVertical ? 520 : 1200;
  const EXPORT_PADDING = 48;

  const wrapper = document.createElement('div');
  const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--bg-tint').trim()
    || (state.cardDark ? darkTintFromHex(state.primaryColor) : tintFromHex(state.primaryColor));

  Object.assign(wrapper.style, {
    width: `${EXPORT_WIDTH}px`,
    padding: `${EXPORT_PADDING}px`,
    boxSizing: 'border-box',
    background: bgColor,
    position: 'fixed',
    top: '-10000px',
    left: '0'
  });

  const cloneCard = card.cloneNode(true);
  cloneCard.style.width = '100%';
  // Ensure export reflects current state (already on the live card but be explicit)
  if (state.cardDark) cloneCard.classList.add('card-dark');
  if (isVertical) cloneCard.classList.add('vertical');

  wrapper.appendChild(cloneCard);
  document.body.appendChild(wrapper);

  // Reemplazar imágenes por divs con background-image (workaround html2canvas)
  convertImagesToBackgrounds(cloneCard);

  try {
    const canvas = await html2canvas(wrapper, {
      backgroundColor: bgColor,
      scale: 2,
      useCORS: true,
      width: EXPORT_WIDTH,
      windowWidth: EXPORT_WIDTH
    });
    const link = document.createElement('a');
    const safeName = (document.getElementById('name')?.value || 'user-persona')
      .replace(/[^a-z0-9]+/gi, '-').toLowerCase();
    link.download = `${safeName}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (err) {
    alert(I18N[currentLang].errorExport + err.message);
  } finally {
    document.body.removeChild(wrapper);
    btn.disabled = false;
    btn.textContent = originalText;
  }
}

export function exportJSON() {
  const data = {
    version: 4,
    language: currentLang,
    primaryColor: document.getElementById('primaryColor')?.value || state.primaryColor,
    photo: state.photo,
    appDark: state.appDark,
    cardDark: state.cardDark,
    template: state.template,
    verticalLayout: state.verticalLayout,
    fields: TEXT_FIELD_IDS.reduce((acc, id) => {
      const el = document.getElementById(id);
      if (el) acc[id] = el.value;
      return acc;
    }, {}),
    personality: clone(state.personality),
    motivations: clone(state.motivations)
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const safeName = (document.getElementById('name')?.value || 'user-persona')
    .replace(/[^a-z0-9]+/gi, '-').toLowerCase();
  link.download = `${safeName}.json`;
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
}

export function readJSONFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try { resolve(JSON.parse(e.target.result)); }
      catch (err) { reject(err); }
    };
    reader.onerror = (e) => reject(new Error(I18N[currentLang].errorRead + e.target.error));
    reader.readAsText(file);
  });
}

export function applyImportedStateData(data) {
  if (!data || typeof data !== 'object') {
    alert(I18N[currentLang].errorInvalidJSON);
    return null;
  }

  const result = { langChanged: false };

  if (data.language && I18N[data.language]) {
    setCurrentLang(data.language);
    result.langChanged = true;
  }

  if (typeof data.primaryColor === 'string') {
    const colorInput = document.getElementById('primaryColor');
    if (colorInput) colorInput.value = data.primaryColor;
    state.primaryColor = data.primaryColor;
  }

  state.photo = (typeof data.photo === 'string' && data.photo.startsWith('data:image')) ? data.photo : null;
  state.appDark = !!data.appDark;
  state.cardDark = !!data.cardDark;
  state.template = data.template || 'classic';
  state.verticalLayout = !!data.verticalLayout;

  if (data.fields && typeof data.fields === 'object') {
    TEXT_FIELD_IDS.forEach(id => {
      const el = document.getElementById(id);
      if (el && typeof data.fields[id] === 'string') el.value = data.fields[id];
    });
  }

  if (Array.isArray(data.personality)) {
    state.personality = data.personality.map(p => ({
      left: String(p.left ?? ''),
      right: String(p.right ?? ''),
      value: clamp(+p.value || 0, 0, 100)
    }));
  }

  if (Array.isArray(data.motivations)) {
    state.motivations = data.motivations.map(b => ({
      name: String(b.name ?? ''),
      value: clamp(+b.value || 0, 0, 10)
    }));
  }

  return result;
}
