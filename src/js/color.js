import { state, persistState } from './state.js';

export const COLOR_PRESETS = [
  '#7C3AED', '#2563EB', '#0EA5E9', '#10B981',
  '#D67200', '#EF4444', '#EC4899', '#1F2937'
];

export function hexToRgb(hex) {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
  const n = parseInt(full, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

export function hexToRgba(hex, alpha) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function tintFromHex(hex) {
  const { r, g, b } = hexToRgb(hex);
  const mix = 0.92;
  return `rgb(${Math.round(r * (1 - mix) + 255 * mix)}, ${Math.round(g * (1 - mix) + 255 * mix)}, ${Math.round(b * (1 - mix) + 255 * mix)})`;
}

export function darkTintFromHex(hex) {
  const { r, g, b } = hexToRgb(hex);
  const base = 17;
  const mix = 0.20;
  return `rgb(${Math.round(r * mix + base * (1 - mix))}, ${Math.round(g * mix + base * (1 - mix))}, ${Math.round(b * mix + base * (1 - mix))})`;
}

export function applyPrimaryColor(hex) {
  state.primaryColor = hex;
  document.documentElement.style.setProperty('--primary', hex);
  document.documentElement.style.setProperty('--primary-soft', hexToRgba(hex, 0.12));
  document.documentElement.style.setProperty('--bg-tint', state.cardDark ? darkTintFromHex(hex) : tintFromHex(hex));
  highlightActivePreset(hex);
  persistState();
}

export function renderColorPresets() {
  const container = document.getElementById('colorPresets');
  if (!container) return;
  container.innerHTML = '';
  COLOR_PRESETS.forEach(hex => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'color-preset';
    btn.style.background = hex;
    btn.dataset.color = hex;
    btn.title = hex;
    btn.addEventListener('click', () => {
      document.getElementById('primaryColor').value = hex;
      applyPrimaryColor(hex);
    });
    container.appendChild(btn);
  });
}

export function highlightActivePreset(hex) {
  document.querySelectorAll('.color-preset').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.color.toLowerCase() === hex.toLowerCase());
  });
}
