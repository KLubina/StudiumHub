/* ==== CSE EXTENSIONS (ZENTRALISIERT) ==== */
/* CSE-spezifische Funktionalitäten mit Integration ins zentrale Wahlmodul-System */

// Laden der modularen Klassen und Daten
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

// Laden der Wahlmodule-Daten
const loadCSEWahlmoduleData = async () => {
  const dataPaths = [
    './js/data/cse/vertiefung-data.js',
    './js/data/cse/wahlfacher-data.js'
  ];
  
  for (const dataPath of dataPaths) {
    try {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = dataPath;
        script.onload = resolve;
        script.onerror = () => reject(new Error('Failed to load ' + dataPath));
        document.head.appendChild(script);
      });
      console.log(`✓ Wahlmodule-Daten geladen: ${dataPath}`);
    } catch (error) {
      console.error(`Fehler beim Laden der Wahlmodule-Daten ${dataPath}:`, error);
    }
  }
};

// Wahlmodule-Daten für das zentrale System vorbereiten
const prepareWahlmoduleData = () => {
  const wahlmoduleData = {
    vertiefungsgebiete: {},
    wahlfaecherBereiche: {}
  };

  // Vertiefungsgebiete gruppieren
  if (window.CSE_VertiefungsgebieteModules) {
    const kategorien = window.getVertiefungsgebieteKategorien ? window.getVertiefungsgebieteKategorien() : [];
    
    kategorien.forEach(kategorie => {
      const module = window.getVertiefungsgebieteByKategorie ? window.getVertiefungsgebieteByKategorie(kategorie) : [];
      wahlmoduleData.vertiefungsgebiete[kategorie] = module;
    });
  }

  // Wahlfächer nach Semester gruppieren
  if (window.CSE_WahlfaecherModules) {
    const semesters = ["Frühlingssemester 2025", "Herbstsemester 2024"];
    
    semesters.forEach(semester => {
      const module = window.getWahlfaecherBySemester ? window.getWahlfaecherBySemester(semester) : [];
      wahlmoduleData.wahlfaecherBereiche[semester] = module;
    });
  }

  return wahlmoduleData;
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
      // Lade Klassen und Daten
      await loadCSEClasses();
      await loadCSEWahlmoduleData();

      // Wahlmodule-Daten ins zentrale System integrieren
      const wahlmoduleData = prepareWahlmoduleData();
      this.config.wahlmoduleData = wahlmoduleData;

      // If the central wahlmoduleManager was already created during base initialization,
      // update its data so tooltips show the freshly loaded modules.
      if (this.wahlmoduleManager) {
        try {
          this.wahlmoduleManager.wahlmoduleData = (wahlmoduleData && typeof wahlmoduleData.getAllWahlmoduleData === 'function')
            ? wahlmoduleData.getAllWahlmoduleData()
            : wahlmoduleData;
          console.log('ℹ️ Aktualisierte wahlmoduleManager.wahlmoduleData mit geladenen CSE-Daten');
        } catch (e) {
          // If wahlmoduleData is a plain object, just assign it
          this.wahlmoduleManager.wahlmoduleData = wahlmoduleData;
        }
      }

      // Klassen initialisieren
      if (window.CSEColorManager) this.colorManager = new CSEColorManager(this);
      if (window.CSEGradeCalculator) this.gradeCalculator = new CSEGradeCalculator(this);
      if (window.CSETooltipManager) this.tooltipManager = new CSETooltipManager(this);
      if (window.CSEUIControlsManager) this.uiControlsManager = new CSEUIControlsManager(this, this.colorManager, this.gradeCalculator);

      this.classesLoaded = true;
      console.log('✓ Alle CSE-Klassen und Wahlmodule-Daten initialisiert');

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

  // Override für zentrale Tooltip-Integration
  addLegendTooltipEvents(div, kategorie) {
    // Zuerst das zentrale System versuchen (für Wahlmodule)
    let handled = false;
    
    // Prüfe ob es ein Wahlmodul-Kategorie ist
    if (this.wahlmoduleManager && kategorie && kategorie.hasTooltip) {
      // Use the central wahlmodule manager for any legend item that declares hasTooltip.
      // This avoids brittle name checks and allows configs to provide the correct key mappings.
      try {
        this.wahlmoduleManager.addLegendTooltipEvents(div, kategorie);
        handled = true;
        console.log('🧭 Delegated legend tooltip to central wahlmoduleManager for', kategorie.name);
      } catch (e) {
        console.warn('⚠️ Failed to delegate to wahlmoduleManager, falling back to CSE tooltipManager', e);
        handled = false;
      }
    }

    // Falls nicht durch Wahlmodul-System behandelt, nutze CSE-spezifisches System
    if (!handled && this.tooltipManager) {
      this.tooltipManager.addLegendTooltipEvents(div, kategorie);
    }

    // Fallback auf Base-System
    if (!handled && typeof StudienplanBase !== 'undefined' && StudienplanBase.prototype.addLegendTooltipEvents) {
      try {
        StudienplanBase.prototype.addLegendTooltipEvents.call(this, div, kategorie);
      } catch (e) {
        // ignore
      }
    }
  }

  // CSE-spezifische Tooltip-Methoden (Rückwärtskompatibilität)
  showVertiefungsgebieteTooltip(event) {
    if (this.tooltipManager) this.tooltipManager.showVertiefungsgebieteTooltip(event);
  }

  showWahlfaecherTooltip(event) {
    if (this.tooltipManager) this.tooltipManager.showWahlfaecherTooltip(event);
  }
};