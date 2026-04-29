import { currentLang, setCurrentLang } from './state.js';

export const I18N = {
  en: {
    pageTitle: 'User Persona Creator',
    appSubtitle: 'Fill in the data and export the image.',
    sectionAppearance: 'Appearance',
    labelPrimaryColor: 'Primary color',
    labelPhoto: 'Photo',
    sectionPersonal: 'Personal data',
    labelName: 'Name',
    labelRole: 'Role',
    labelAge: 'Age',
    labelLocation: 'Location',
    labelPosition: 'Position',
    labelEducation: 'Education',
    labelGender: 'Gender',
    labelMaritalStatus: 'Marital status',
    labelChips: 'Auxiliary data (chips, comma separated)',
    sectionMotivations: 'Motivations',
    sectionGoals: 'Milestones and needs',
    sectionPainPoints: 'Pain points',
    sectionPersonality: 'Personality',
    sectionBehavior: 'Behavior',
    hintOnePerLine: 'One per line',
    hintPersonality: 'Value 0–100 (bar position).',
    hintMotivations: 'Value 0–10 (filled dots).',
    btnExportPNG: 'Export PNG',
    btnReset: 'Reset',
    btnExportJSON: 'Export JSON',
    btnImportJSON: 'Import JSON',
    btnGenerating: 'Generating...',
    btnAddItem: 'Add item',
    btnRemoveItem: 'Remove',
    confirmReset: 'Reset all fields to the initial state?',
    errorExport: 'Could not export the image: ',
    errorRead: 'Could not read the file: ',
    errorInvalidJSON: 'The JSON file does not have a valid format.',
    previewAbout: 'About',
    previewMotivations: 'Motivations',
    previewGoals: 'Goals',
    previewPainPoints: 'Pain Points',
    previewPersonality: 'Personality',
    previewBehavior: 'Behavior',
    labelAppTheme: 'App',
    labelCardTheme: 'Card',
    labelTemplate: 'Template',
    labelLayout: 'Layout',
    labelDarkMode: 'Dark Mode',
    btnHorizontal: '↔ Horiz.',
    btnVertical: '↕ Vert.',
    defaults: {
      name: 'John David',
      role: 'Persona role',
      age: '27',
      location: 'London',
      position: 'CEO',
      education: "Bachelor's",
      gender: 'Non-Binary',
      maritalStatus: 'Single',
      chips: 'Meticulous, Assertive, Energetic, Helpful, Creative, Tech Savvy',
      behavior: 'Spends time online researching and comparing options before making decisions, frequently uses social media, and prefers digital channels for everyday transactions.',
      goals: 'Make data-driven decisions.\nReduce time spent on repetitive tasks.\nTrain the team on new tools.\nImprove customer satisfaction.',
      painPoints: 'Manual and repetitive processes.\nLack of integration between systems.\nInformation scattered across different sources.\nLong learning curves.',
      personality: [
        { left: 'Introvert',  right: 'Extrovert',   value: 65 },
        { left: 'Rational',   right: 'Emotional',   value: 45 },
        { left: 'Methodical', right: 'Spontaneous', value: 70 },
        { left: 'Assertive',  right: 'Insecure',    value: 35 },
        { left: 'Intuitive',  right: 'Observant',   value: 55 }
      ],
      motivations: [
        { name: 'Convenience', value: 8 },
        { name: 'Wellness',    value: 6 },
        { name: 'Speed',       value: 7 },
        { name: 'Preferences', value: 5 }
      ]
    }
  },
  es: {
    pageTitle: 'Creador de User Persona',
    appSubtitle: 'Completá los datos y exportá la imagen.',
    sectionAppearance: 'Apariencia',
    labelPrimaryColor: 'Color principal',
    labelPhoto: 'Foto',
    sectionPersonal: 'Datos personales',
    labelName: 'Nombre',
    labelRole: 'Rol',
    labelAge: 'Edad',
    labelLocation: 'Ubicación',
    labelPosition: 'Cargo',
    labelEducation: 'Educación',
    labelGender: 'Género',
    labelMaritalStatus: 'Estado civil',
    labelChips: 'Datos auxiliares (chips, separados por coma)',
    sectionMotivations: 'Motivaciones',
    sectionGoals: 'Hitos y necesidades',
    sectionPainPoints: 'Puntos de dolor',
    sectionPersonality: 'Personalidad',
    sectionBehavior: 'Comportamiento',
    hintOnePerLine: 'Una por línea',
    hintPersonality: 'Valor 0–100 (posición de la barra).',
    hintMotivations: 'Valor 0–10 (puntos llenos).',
    btnExportPNG: 'Exportar PNG',
    btnReset: 'Restablecer',
    btnExportJSON: 'Exportar JSON',
    btnImportJSON: 'Importar JSON',
    btnGenerating: 'Generando...',
    btnAddItem: 'Agregar ítem',
    btnRemoveItem: 'Quitar',
    confirmReset: '¿Restablecer todos los campos al estado inicial?',
    errorExport: 'No se pudo exportar la imagen: ',
    errorRead: 'No se pudo leer el archivo: ',
    errorInvalidJSON: 'El archivo JSON no tiene un formato válido.',
    previewAbout: 'Sobre',
    previewMotivations: 'Motivaciones',
    previewGoals: 'Hitos y necesidades',
    previewPainPoints: 'Puntos de dolor',
    previewPersonality: 'Personalidad',
    previewBehavior: 'Comportamiento',
    labelAppTheme: 'App',
    labelCardTheme: 'Tarjeta',
    labelTemplate: 'Plantilla',
    labelLayout: 'Layout',
    labelDarkMode: 'Modo oscuro',
    btnHorizontal: '↔ Horiz.',
    btnVertical: '↕ Vert.',
    defaults: {
      name: 'Juan David',
      role: 'Rol de la persona',
      age: '27',
      location: 'Montevideo',
      position: 'Director',
      education: 'Licenciatura',
      gender: 'No binario',
      maritalStatus: 'Soltero/a',
      chips: 'Meticuloso, Asertivo, Enérgico, Servicial, Creativo, Tecnológico',
      behavior: 'Pasa tiempo en línea investigando y comparando opciones antes de decidir, usa frecuentemente redes sociales y prefiere canales digitales para sus transacciones cotidianas.',
      goals: 'Tomar decisiones basadas en datos.\nReducir tiempos en tareas repetitivas.\nCapacitar al equipo en nuevas herramientas.\nMejorar la satisfacción del cliente.',
      painPoints: 'Procesos manuales y repetitivos.\nFalta de integración entre sistemas.\nInformación dispersa en distintas fuentes.\nCurvas de aprendizaje extensas.',
      personality: [
        { left: 'Introvertido', right: 'Extrovertido', value: 65 },
        { left: 'Racional',     right: 'Emocional',    value: 45 },
        { left: 'Metódico',     right: 'Espontáneo',   value: 70 },
        { left: 'Asertivo',     right: 'Inseguro',     value: 35 },
        { left: 'Intuitivo',    right: 'Observador',   value: 55 }
      ],
      motivations: [
        { name: 'Conveniencia', value: 8 },
        { name: 'Bienestar',    value: 6 },
        { name: 'Velocidad',    value: 7 },
        { name: 'Preferencias', value: 5 }
      ]
    }
  }
};

export function applyTranslations(lang) {
  const dict = I18N[lang];
  if (!dict) return;
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (dict[key] !== undefined) el.textContent = dict[key];
  });
  if (dict.pageTitle) document.title = dict.pageTitle;
}

export function highlightActiveLang(lang) {
  document.querySelectorAll('#langToggle button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

export function applyDefaults(lang, options = {}) {
  const force = options.force === true;
  const fromLang = options.fromLang || null;
  const newDefaults = I18N[lang].defaults;
  const oldDefaults = fromLang ? I18N[fromLang].defaults : null;

  const TEXT_FIELD_IDS = ['name','role','age','location','position','education','gender','maritalStatus','chips','behavior','goals','painPoints'];
  TEXT_FIELD_IDS.forEach(id => {
    const input = document.getElementById(id);
    if (!input) return;
    const isUntouched = !oldDefaults || input.value === oldDefaults[id] || input.value === '';
    if (force || isUntouched) input.value = newDefaults[id];
  });

  return { newPersonality: newDefaults.personality, newMotivations: newDefaults.motivations, oldDefaults };
}

export function setLanguage(lang, state) {
  if (!I18N[lang] || lang === currentLang) {
    highlightActiveLang(currentLang);
    return false;
  }
  const fromLang = currentLang;
  setCurrentLang(lang);

  applyTranslations(lang);
  const { newPersonality, newMotivations, oldDefaults } = applyDefaults(lang, { fromLang });

  const personalityUntouched = !oldDefaults || JSON.stringify(state.personality) === JSON.stringify(oldDefaults.personality);
  if (personalityUntouched) state.personality = JSON.parse(JSON.stringify(newPersonality));

  const motivationsUntouched = !oldDefaults || JSON.stringify(state.motivations) === JSON.stringify(oldDefaults.motivations);
  if (motivationsUntouched) state.motivations = JSON.parse(JSON.stringify(newMotivations));

  highlightActiveLang(lang);
  return true;
}
