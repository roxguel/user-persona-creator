import { state, persistState } from './state.js';
import { tintFromHex, darkTintFromHex } from './color.js';

export function setAppTheme(isDark) {
  state.appDark = isDark;
  document.documentElement.setAttribute('data-app-theme', isDark ? 'dark' : 'light');
  const toggle = document.getElementById('appDarkToggle');
  if (toggle) toggle.checked = isDark;
  persistState();
}

export function setCardTheme(isDark) {
  state.cardDark = isDark;
  const card = document.getElementById('personaCard');
  if (card) card.classList.toggle('card-dark', isDark);
  const toggle = document.getElementById('cardDarkToggle');
  if (toggle) toggle.checked = isDark;
  const tint = isDark ? darkTintFromHex(state.primaryColor) : tintFromHex(state.primaryColor);
  document.documentElement.style.setProperty('--bg-tint', tint);
  persistState();
}
