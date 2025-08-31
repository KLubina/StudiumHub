/* ==== CSE EXTENSIONS (VEREINFACHT) ==== */
/* Spezielle Funktionalitäten für den CSE Studiengang - Alles in einer Datei für einfacheres Loading */

// Laden der modularen Klassen direkt aus dem configs/cse Ordner
const loadCSEClasses = async () => {
  const classPaths = [
    './extensions-ColorManager.js',
    './extensions-GradeCalculator.js', 
    './extensions-tooltips.js',
    './extensions-UIControlsManager.js'
  ];

  // Basis-URL ermitteln (configs/cse/)
  let baseUrl = './js/configs/cse/';
  
  for (const classPath of classPaths) {
    const fullPath = baseUrl + classPath.replace('./', '');
    try {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = fullPath;
        script.onload = resolve;
        script.onerror = () => reject(new Error('Failed to load ' + fullPath));
        document.head.appendChild(script);
      });
      console.log(`✓ Klasse geladen: ${fullPath}`);
    } catch (error) {
      console.error(`Fehler beim Laden der Klasse ${fullPath}:`, error);
    }
  }
};

/* ==== CSE-SPEZIFISCHE ERWEITERUNGEN ==== */
window.StudiengangCustomClass = class CSEStudienplan extends StudienplanBase {
  constructor(config) {
    super(config);
    this.classesLoaded = false;
    this.initClassesAsync();
  }

  async initClassesAsync() {
    try {
      await loadCSEClasses();

      // Klassen initialisieren
      if (window.CSEColorManager) this.colorManager = new CSEColorManager(this);
      if (window.CSEGradeCalculator) this.gradeCalculator = new CSEGradeCalculator(this);
      if (window.CSETooltipManager) this.tooltipManager = new CSETooltipManager(this);
      if (window.CSEUIControlsManager) this.uiControlsManager = new CSEUIControlsManager(this, this.colorManager, this.gradeCalculator);

      this.classesLoaded = true;
      console.log('✓ Alle CSE-Klassen initialisiert');

      // Falls initialize bereits aufgerufen wurde, UI-Controls hinzufügen und Farben setzen
      if (this.isInitialized) {
        this.addUIControls();
        this.updateModuleColors();
      }
    } catch (error) {
      console.error('Fehler beim Laden der CSE-Klassen:', error);
    }
  }

  initialize() {
    super.initialize();
    this.isInitialized = true;

    // UI-Controls und Farben hinzufügen, falls Klassen bereits geladen sind
    if (this.classesLoaded) {
      this.addUIControls();
      this.updateModuleColors();
    }
  }

  addUIControls() {
    if (this.uiControlsManager) {
      this.uiControlsManager.addColoringModeControls();
    }
  }

  // Delegate-Methoden für Kompatibilität
  get coloringMode() {
    return this.colorManager ? this.colorManager.coloringMode : 'pruefungsblock';
  }

  set coloringMode(mode) {
    if (this.colorManager) this.colorManager.coloringMode = mode;
  }

  updateModuleColors() {
    console.log('🎨 updateModuleColors aufgerufen');
    if (this.colorManager) {
      this.colorManager.updateModuleColors();
    } else {
      console.warn('ColorManager noch nicht geladen, versuche es später...');
      // Retry nach kurzer Zeit
      setTimeout(() => {
        if (this.colorManager) {
          this.colorManager.updateModuleColors();
        }
      }, 500);
    }
  }

  updateLegend() {
    if (this.colorManager) this.colorManager.updateLegend();
  }

  removeColorClasses(element) {
    if (this.colorManager) this.colorManager.removeColorClasses(element);
  }

  getModuleCssClass(modul) {
    return this.colorManager ? this.colorManager.getModuleCssClass(modul) : modul.kategorie;
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