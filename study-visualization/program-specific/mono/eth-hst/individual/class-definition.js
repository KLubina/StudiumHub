/* ==== HST CLASS DEFINITION ==== */
/* Hauptklasse für den HST (Gesundheitswissenschaften und Technologie) Studienplan */

window.HSTStudienplan = class HSTStudienplan extends StudienplanBase {
  constructor(config) {
    super(config);
  }

  initialize() {
    // EXPLIZIT: ColorManager für HST aktivieren (MUSS vor super.initialize() sein!)
    this.config.enableColorManager = true;

    // Basis-Initialisierung (aktiviert automatisch das zentrale Wahlmodule-System)
    super.initialize();

    // ColorManager explizit initialisieren (weil der Monkey-Patch in Integration.js
    // nicht für Subklassen greift, die initialize() überschreiben)
    if (this.config.enableColorManager && this.initializeColorManager) {
      this.initializeColorManager();
    }

    // HST-spezifische Initialisierung
    this.setupHSTSpecifics();
  }

  setupHSTSpecifics() {
    // Basis-Klasse hat bereits showMessage und showToastMessage implementiert
  }

  /**
   * Override: CSS-Klasse für Module bestimmen
   * HST-spezifisch: Kategorien mit Leerzeichen werden korrekt behandelt
   */
  getModuleCssClass(modul) {
    if (modul.pruefungsblock) {
      const block = this.config.pruefungsbloecke.find(
        (b) => b.name === modul.pruefungsblock
      );
      return block ? block.cssClass : null;
    }

    // Kategorie-Namen mit Leerzeichen in CSS-konforme Klassen umwandeln
    if (modul.kategorie) {
      const kategorie = this.config.kategorien.find(
        (k) => k.name === modul.kategorie
      );
      return kategorie ? kategorie.klasse : null;
    }

    return null;
  }
};
