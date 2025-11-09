/* Color Manager - StudienplanBase Integration */

StudienplanBase.prototype.initializeColorManager = function() {
    if (!this.config.enableColorManager || this.colorManager) return;

    this.colorManager = new StudienplanBaseColorManager(this);

    setTimeout(() => {
        this.colorManager.addControls();
        this.colorManager.applyColors();
    }, 100);
};

// Auto-Integration
if (!StudienplanBase.prototype._colorManagerIntegrated) {
    const originalInit = StudienplanBase.prototype.initialize;
    StudienplanBase.prototype.initialize = function() {
        originalInit.call(this);
        if (this.config.enableColorManager) {
            this.initializeColorManager();
        }
    };
    StudienplanBase.prototype._colorManagerIntegrated = true;
}
