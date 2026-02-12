/* ==== MSC ITET CLASS DEFINITION ==== */
/* Hauptklasse für den MSc ITET Studienplan */

window.MScITETStudienplan = class MScITETStudienplan extends StudienplanBase {
  constructor(config) {
    super(config);
  }

  initialize() {
    // Basis-Initialisierung (aktiviert automatisch das zentrale Wahlmodule-System)
    super.initialize();

    // ColorManager explizit initialisieren falls aktiviert
    if (this.config.enableColorManager && this.initializeColorManager) {
      this.initializeColorManager();
    }

    // MSc ITET-spezifische Initialisierung
    this.setupMScITETSpecifics();
  }

  setupMScITETSpecifics() {
    // Basis-Klasse hat bereits showMessage und showToastMessage implementiert
  }

  /**
   * Override: CSS-Klasse für Module bestimmen
   * MSc ITET-spezifisch: Kategorien mit Leerzeichen werden korrekt behandelt
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
