/* ==== ITET CLASS DEFINITION ==== */
/* Hauptklasse für den ITET Specificprogram */

window.ITETSpecificprogram = class ITETSpecificprogram extends (
  SpecificprogramBase
) {
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
