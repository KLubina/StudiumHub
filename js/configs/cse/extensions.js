/* ==== CSE EXTENSIONS ==== */
/* Spezielle Funktionalitäten und erweiterte Klasse für den CSE Studiengang */

// Module dynamisch laden
const loadCSEModules = async () => {
  const modulePaths = [
    './modules/ColorManager.js',
    './modules/GradeCalculator.js', 
    './modules/TooltipManager.js',
    './modules/UIControlsManager.js'
  ];

  for (const modulePath of modulePaths) {
    try {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = modulePath;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    } catch (error) {
      console.error(`Fehler beim Laden des Moduls ${modulePath}:`, error);
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
    this.colorManager = new CSEColorManager(this);
    this.gradeCalculator = new CSEGradeCalculator(this);
    this.tooltipManager = new CSETooltipManager(this);
    this.uiControlsManager = new CSEUIControlsManager(this, this.colorManager, this.gradeCalculator);
    
    this.modulesLoaded = true;
    
    // Falls initialize bereits aufgerufen wurde, UI-Controls hinzufügen
    if (this.isInitialized) {
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
    return this.colorManager.coloringMode;
  }

  set coloringMode(mode) {
    this.colorManager.coloringMode = mode;
  }

  updateModuleColors() {
    this.colorManager.updateModuleColors();
  }

  updateLegend() {
    this.colorManager.updateLegend();
  }

  removeColorClasses(element) {
    this.colorManager.removeColorClasses(element);
  }

  getModuleCssClass(modul) {
    return this.colorManager.getModuleCssClass(modul);
  }

  createThemenbereichLegend(container) {
    this.colorManager.createThemenbereichLegend(container);
  }

  showGradeCalculator() {
    this.gradeCalculator.showGradeCalculator();
  }

  addLegendTooltipEvents(div, kategorie) {
    this.tooltipManager.addLegendTooltipEvents(div, kategorie);
  }

  showVertiefungsgebieteTooltip(event) {
    this.tooltipManager.showVertiefungsgebieteTooltip(event);
  }

  showWahlfaecherTooltip(event) {
    this.tooltipManager.showWahlfaecherTooltip(event);
  }

  // Delegate-Methoden für Kompatibilität
  get coloringMode() {
    return this.colorManager.coloringMode;
  }

  set coloringMode(mode) {
    this.colorManager.coloringMode = mode;
  }

  updateModuleColors() {
    this.colorManager.updateModuleColors();
  }

  updateLegend() {
    this.colorManager.updateLegend();
  }

  removeColorClasses(element) {
    this.colorManager.removeColorClasses(element);
  }

  getModuleCssClass(modul) {
    return this.colorManager.getModuleCssClass(modul);
  }

  createThemenbereichLegend(container) {
    this.colorManager.createThemenbereichLegend(container);
  }

  showGradeCalculator() {
    this.gradeCalculator.showGradeCalculator();
  }

  addLegendTooltipEvents(div, kategorie) {
    this.tooltipManager.addLegendTooltipEvents(div, kategorie);
  }

  showVertiefungsgebieteTooltip(event) {
    this.tooltipManager.showVertiefungsgebieteTooltip(event);
  }

  showWahlfaecherTooltip(event) {
    this.tooltipManager.showWahlfaecherTooltip(event);
  }
};