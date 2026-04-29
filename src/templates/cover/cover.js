import { ICONS } from '../../js/icons.js';
import { escapeHTML } from '../../js/state.js';

export function scaffold() {
  return `
    <div class="tc-left">
      <img id="previewPhoto" class="tc-cover-photo" alt="" />
      <div class="tc-cover-fallback" id="avatarFallback">?</div>
      <div class="tc-name-area">
        <h2 class="tc-name" id="previewName"></h2>
        <p class="tc-role" id="previewRole"></p>
      </div>
    </div>
    <div class="tc-right">
      <div class="tc-header">
        <div class="tc-stat"><span class="tc-stat-icon">${ICONS.age}</span><span id="previewAge"></span></div>
        <div class="tc-stat"><span class="tc-stat-icon">${ICONS.location}</span><span id="previewLocation"></span></div>
        <div class="tc-stat"><span class="tc-stat-icon">${ICONS.position}</span><span id="previewPosition"></span></div>
        <div class="tc-stat"><span class="tc-stat-icon">${ICONS.education}</span><span id="previewEducation"></span></div>
        <div class="tc-stat"><span class="tc-stat-icon">${ICONS.gender}</span><span id="previewGender"></span></div>
        <div class="tc-stat"><span class="tc-stat-icon">${ICONS.marital}</span><span id="previewMaritalStatus"></span></div>
      </div>
      <div class="tc-columns">
        <div class="tc-col-text">
          <section class="block">
            <h3 class="section-title" data-i18n="previewBehavior">Behavior</h3>
            <p class="paragraph" id="previewBehavior"></p>
          </section>
          <section class="block">
            <h3 class="section-title" data-i18n="previewGoals">Goals</h3>
            <ul class="bullet-list" id="previewGoals"></ul>
          </section>
          <section class="block">
            <h3 class="section-title" data-i18n="previewPainPoints">Pain Points</h3>
            <ul class="bullet-list" id="previewPainPoints"></ul>
          </section>
        </div>
        <div class="tc-col-visual">
          <section class="block">
            <h3 class="section-title" data-i18n="previewPersonality">Personality</h3>
            <div class="personality-list" id="previewPersonality"></div>
          </section>
          <section class="block">
            <h3 class="section-title" data-i18n="previewMotivations">Motivations</h3>
            <div class="behavior-list" id="previewMotivations"></div>
          </section>
          <section class="block">
            <h3 class="section-title" data-i18n="previewAbout">About</h3>
            <div class="tc-tags" id="previewChips"></div>
          </section>
        </div>
      </div>
    </div>
  `;
}

export function render(data) {
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };

  const name = data.name || ' ';
  set('previewName', name);
  set('previewRole', data.role);
  set('previewAge', data.age);
  set('previewLocation', data.location);
  set('previewPosition', data.position);
  set('previewEducation', data.education);
  set('previewGender', data.gender);
  set('previewMaritalStatus', data.maritalStatus);

  const initials = name.trim().split(/\s+/).slice(0, 2).map(s => s[0] || '').join('').toUpperCase();
  set('avatarFallback', initials || '?');

  const img = document.getElementById('previewPhoto');
  if (img) {
    if (data.photo) { img.src = data.photo; img.classList.add('loaded'); }
    else { img.removeAttribute('src'); img.classList.remove('loaded'); }
  }

  const chipsEl = document.getElementById('previewChips');
  if (chipsEl) {
    chipsEl.innerHTML = '';
    data.chips.split(',').map(s => s.trim()).filter(Boolean).forEach(text => {
      const tag = document.createElement('span');
      tag.className = 'tc-tag';
      tag.textContent = text;
      chipsEl.appendChild(tag);
    });
  }

  set('previewBehavior', data.behavior);
  renderList('previewGoals', data.goals);
  renderList('previewPainPoints', data.painPoints);

  const pContainer = document.getElementById('previewPersonality');
  if (pContainer) {
    pContainer.innerHTML = '';
    data.personality.forEach(item => {
      const el = document.createElement('div');
      el.className = 'personality-item';
      el.innerHTML = `
        <div class="labels"><span>${escapeHTML(item.left)}</span><span>${escapeHTML(item.right)}</span></div>
        <div class="bar"><div class="bar-fill" style="width:${item.value}%"></div></div>
      `;
      pContainer.appendChild(el);
    });
  }

  const mContainer = document.getElementById('previewMotivations');
  if (mContainer) {
    mContainer.innerHTML = '';
    data.motivations.forEach(item => {
      const el = document.createElement('div');
      el.className = 'behavior-item';
      let dotsHtml = '';
      for (let i = 1; i <= 10; i++) {
        dotsHtml += `<span class="dot ${i <= item.value ? 'filled' : ''}"></span>`;
      }
      el.innerHTML = `<p class="skill-name">${escapeHTML(item.name)}</p><div class="dots">${dotsHtml}</div>`;
      mContainer.appendChild(el);
    });
  }
}

function renderList(targetId, raw) {
  const ul = document.getElementById(targetId);
  if (!ul) return;
  ul.innerHTML = '';
  raw.split('\n').map(s => s.trim()).filter(Boolean).forEach(text => {
    const li = document.createElement('li');
    li.textContent = text;
    ul.appendChild(li);
  });
}
