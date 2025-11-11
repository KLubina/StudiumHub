/* Color Manager - Integration with StudienplanBase */

(function () {
  if (typeof StudienplanBase === "undefined") {
    console.warn(
      "[ColorManager] StudienplanBase nicht gefunden – Integration übersprungen."
    );
    return;
  }

  StudienplanBase.prototype.initializeColorManager = function () {
    if (!this.config || !this.config.enableColorManager) {
      return;
    }

    if (this.colorManagerInstance) {
      this.colorManagerInstance.refreshCurrentMode({
        updateLegend: true,
        updateButtons: true,
      });
      return;
    }

    this.colorManagerInstance = new StudiengangColorManager(this);
    const initialized = this.colorManagerInstance.init();
    if (!initialized) {
      this.colorManagerInstance = null;
    }
  };

  StudienplanBase.prototype.updateColorManager = function () {
    if (!this.colorManagerInstance) return;
    this.colorManagerInstance.refreshCurrentMode({
      updateLegend: false,
      updateButtons: false,
    });
  };

  const originalCreateLegend = StudienplanBase.prototype.createLegend;
  StudienplanBase.prototype.createLegend = function () {
    originalCreateLegend.call(this);
    if (this.colorManagerInstance) {
      this.colorManagerInstance.renderLegendForCurrentMode();
    }
  };
})();

