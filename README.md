# User Persona Creator

A vanilla HTML/CSS/JS web app for building and exporting User Persona cards.

## About

Academic project for the *Fundamentos de Ingeniería de Software* course. Provides a lightweight tool to create, edit, and export User Personas — supporting the analysis and design activities required by the assignment. MIT-licensed and freely available.

## Features

- **3 predefined templates** with distinct layouts; easily extensible with new ones.
- **Dark mode**: independent switches for the app UI and the exported card.
- **Horizontal / Vertical layout** toggle, reflected in both the live preview and the PNG export.
- Live preview that updates as you type.
- Configurable primary color with 8 quick-pick presets (preview background tint derived from the chosen color).
- Photo upload with circular avatar (falls back to initials when no photo is set).
- Quantitative widgets: dual-label bars (0–100) for personality and dot meters (0–10) for motivations. Items can be added or removed.
- Bilingual UI (English / Spanish) with language-aware default content. User edits are preserved when switching languages.
- PNG export at 1200 px wide (700 px in vertical mode), 2× resolution, tinted background.
- JSON export / import to save and resume work.
- Automatic `localStorage` persistence — the last session is restored on reload.

## Project structure

```
Creador User Persona/
├── index.html
├── README.md
├── LICENSE
└── src/
    ├── css/
    │   ├── base.css           # CSS variables (light + dark), reset, app grid
    │   ├── editor.css         # Sidebar: fields, buttons, toggles, controls
    │   └── card-shared.css    # Shared card components (avatar, bars, dots…)
    ├── js/
    │   ├── app.js             # Entry point — init, orchestration
    │   ├── i18n.js            # Translations + language helpers
    │   ├── state.js           # State object, localStorage, utilities
    │   ├── color.js           # Color utilities + preset rendering
    │   ├── themes.js          # App / card dark mode logic
    │   ├── editor.js          # Personality & motivations dynamic editors
    │   ├── export.js          # PNG / JSON export + JSON import
    │   └── icons.js           # Shared SVG icon strings
    └── templates/
        ├── registry.js        # Template registry + setTemplate()
        ├── classic/
        │   ├── classic.css    # 3-column layout
        │   └── classic.js     # scaffold() + render(data)
        ├── sidebar/
        │   ├── sidebar.css    # Colored left panel
        │   └── sidebar.js     # scaffold() + render(data)
        └── cover/
            ├── cover.css      # Full-cover photo left panel
            └── cover.js       # scaffold() + render(data)
```

No build step, no local dependencies. The only external library is `html2canvas`, loaded from CDN for PNG export. Modules are loaded natively via `type="module"`.

## Running locally

ES modules and `html2canvas` (CDN) require an HTTP server — opening `index.html` directly via `file://` will not work.

```bash
npx serve -p 3000 .
```

Then open **http://localhost:3000**.

## Usage

1. Select a **template** (A / B / C) and a **layout** (Horizontal / Vertical).
2. Toggle **App** or **Card** dark mode independently.
3. Pick a primary color or use a preset.
4. Optionally upload a photo.
5. Fill in personal data, behavior, goals, pain points, personality, and motivations.
6. Use **+ Add item** / **×** to manage personality and motivations lists.
7. Click **Export PNG** to download the rendered card.
8. Use **Export JSON** / **Import JSON** to save and restore a persona.
9. **Reset** clears all fields and the saved state.

## Adding a new template

1. Create `src/templates/my-template/my-template.css` — use `.persona-card[data-template="my-template"]` selectors.
2. Create `src/templates/my-template/my-template.js` — export `scaffold()` (returns inner HTML with the standard element IDs) and `render(data)` (populates the DOM from the data object).
3. Register it in `src/templates/registry.js`:
   ```js
   import * as myTemplate from './my-template/my-template.js';
   // add to TEMPLATES:
   'my-template': { module: myTemplate },
   ```
4. Add the CSS `<link>` in `index.html` and a button inside `#templateSelector`:
   ```html
   <link rel="stylesheet" href="src/templates/my-template/my-template.css" />
   …
   <button type="button" data-template="my-template">My Template</button>
   ```

## Persistence

Every change is saved to `localStorage` under `userPersonaCreator:state` (schema version 4). On reload the app restores language, color, photo, all text fields, personality/motivations lists, selected template, layout orientation, and dark mode preferences. If `localStorage` is unavailable the app continues working in-memory without errors.

## Browser support

Tested on recent Chromium-based browsers and Firefox. Requires ES module support (all modern browsers).

## License

Released under the MIT License. See [`LICENSE`](LICENSE) for the full text.
