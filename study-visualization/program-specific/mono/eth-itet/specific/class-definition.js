/* ==== ITET CLASS DEFINITION ==== */
/* Hauptklasse für den ITET Studienplan */

window.ITETStudienplan = class ITETStudienplan extends StudienplanBase {
  constructor(config) {
    super(config);
  }

  initialize() {
    // EXPLIZIT: ColorManager für ITET aktivieren (MUSS vor super.initialize() sein!)
    this.config.enableColorManager = true;

    // Basis-Initialisierung (aktiviert automatisch das zentrale Wahlmodule-System)
    super.initialize();

    // ColorManager explizit initialisieren (weil der Monkey-Patch in Integration.js
    // nicht für Subklassen greift, die initialize() überschreiben)
    if (this.config.enableColorManager && this.initializeColorManager) {
      this.initializeColorManager();
    }

    // ITET-spezifische Initialisierung
    this.setupITETSpecifics();
  }

  setupITETSpecifics() {
    // Basis-Klasse hat bereits showMessage und showToastMessage implementiert
  }
};
