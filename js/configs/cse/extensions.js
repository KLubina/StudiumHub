/* ==== CSE EXTENSIONS ==== */
/* Spezielle Funktionalitäten und erweiterte Klasse für den CSE Studiengang */

// Module dynamisch laden
const loadCSEModules = async () => {
  const modulePaths = [
    'modules/ColorManager.js',
    'modules/GradeCalculator.js',
    'modules/TooltipManager.js',
    'modules/UIControlsManager.js'
  ];

  // Erzeuge eine absolute Basis-URL relativ zur aktuellen Script-Datei
  // (document.currentScript kann in einigen Setups verfügbar sein)
  let baseUrl = './';
  if (document.currentScript && document.currentScript.src) {
    baseUrl = document.currentScript.src.replace(/\/[^\/]*$/, '/');
  } else {
    // Fallback: nimm das letzte Script-Tag (häufig das aktuell ausgeführte)
    const scripts = document.getElementsByTagName('script');
    if (scripts.length) {
      const s = scripts[scripts.length - 1];
      if (s && s.src) baseUrl = s.src.replace(/\/[^\/]*$/, '/');
    }
  }

  for (const modulePath of modulePaths) {
    const fullPath = new URL(modulePath, baseUrl).href;
    try {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = fullPath;
        script.onload = resolve;
        script.onerror = () => reject(new Error('Failed to load ' + fullPath));
        document.head.appendChild(script);
      });
      console.log(`✓ Modul geladen: ${fullPath}`);
    } catch (error) {
      console.error(`Fehler beim Laden des Moduls ${fullPath}:`, error);
    }
  }
};

/* ==== CSE-SPEZIFISCHE ERWEITERUNGEN ==== */
// Erweiterte Klasse für CSE-spezifische Features
window.StudiengangCustomClass = class CSEStudienplan extends StudienplanBase {
  constructor(config) {
    super(config);
    this.modulesLoaded = false;
    this.initModulesAsync();
  }

  async initModulesAsync() {
    await loadCSEModules();

    // Modulare Komponenten initialisieren
    if (window.CSEColorManager) this.colorManager = new CSEColorManager(this);
    if (window.CSEGradeCalculator) this.gradeCalculator = new CSEGradeCalculator(this);
    if (window.CSETooltipManager) this.tooltipManager = new CSETooltipManager(this);
    if (window.CSEUIControlsManager) this.uiControlsManager = new CSEUIControlsManager(this, this.colorManager, this.gradeCalculator);

    this.modulesLoaded = true;

    // Falls initialize bereits aufgerufen wurde, UI-Controls hinzufügen
    if (this.isInitialized && this.uiControlsManager) {
      this.uiControlsManager.addColoringModeControls();
    }
  }

  initialize() {
    super.initialize();
    this.isInitialized = true;

    // UI-Controls hinzufügen, falls Module bereits geladen sind
    if (this.modulesLoaded && this.uiControlsManager) {
      this.uiControlsManager.addColoringModeControls();
    }
  }

  // Delegate-Methoden für Kompatibilität
  get coloringMode() {
    return this.colorManager && this.colorManager.coloringMode;
  }

  set coloringMode(mode) {
    if (this.colorManager) this.colorManager.coloringMode = mode;
  }

  updateModuleColors() {
    if (this.colorManager) this.colorManager.updateModuleColors();
  }

  updateLegend() {
    if (this.colorManager) this.colorManager.updateLegend();
  }

  removeColorClasses(element) {
    if (this.colorManager) this.colorManager.removeColorClasses(element);
  }

  getModuleCssClass(modul) {
    return this.colorManager ? this.colorManager.getModuleCssClass(modul) : undefined;
  }

  createThemenbereichLegend(container) {
    if (this.colorManager) this.colorManager.createThemenbereichLegend(container);
  }

  showGradeCalculator() {
    if (this.gradeCalculator) this.gradeCalculator.showGradeCalculator();
  }

  addLegendTooltipEvents(div, kategorie) {
    if (this.tooltipManager) this.tooltipManager.addLegendTooltipEvents(div, kategorie);
  }

  showVertiefungsgebieteTooltip(event) {
    if (this.tooltipManager) this.tooltipManager.showVertiefungsgebieteTooltip(event);
  }

  showWahlfaecherTooltip(event) {
    if (this.tooltipManager) this.tooltipManager.showWahlfaecherTooltip(event);
  }
};