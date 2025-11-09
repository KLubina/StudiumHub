/* ==== ITET CLASS DEFINITION ==== */
/* Hauptklasse für den ITET Studienplan */

window.ITETStudienplan = class ITETStudienplan extends StudienplanBase {
  constructor(config) {
    super(config);
  }

  initialize() {
    // Basis-Initialisierung (aktiviert automatisch das zentrale Wahlmodule-System)
    super.initialize();
    
    // EXPLIZIT: ColorManager für ITET aktivieren
    this.config.enableColorManager = true;
    
    // ITET-spezifische Initialisierung
    this.setupITETSpecifics();
  }

  setupITETSpecifics() {
    // Basis-Klasse hat bereits showMessage und showToastMessage implementiert
  }
};
