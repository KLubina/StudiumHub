/* ==== ITET CLASS DEFINITION ==== */
/* Hauptklasse für den ITET Studienplan */

window.ITETStudienplan = class ITETStudienplan extends StudienplanBase {
  constructor(config) {
    super(config);
  }

  initialize() {
    this.config.enableColorManager = true;
    super.initialize();

    if (this.config.enableColorManager && this.initializeColorManager) {
      this.initializeColorManager();
    }
  }
};
