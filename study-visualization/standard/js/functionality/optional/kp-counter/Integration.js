/* KP Counter - StudienplanBase Integration */

StudienplanBase.prototype.initializeKPCounter = function() {
    if (!this.config.enableKPCounter) return;

    this.kpCounter = new StudienplanKPCounter(this.config);
    this.addKPCounter();
    this.updateKPDisplay();
};

StudienplanBase.prototype.addKPCounter = function() {
    if (!this.config.enableKPCounter || document.getElementById("kp-counter")) return;

    const legendContainer = document.querySelector(".farben-legende");
    if (legendContainer && this.kpCounter) {
        const kpCounterElement = this.kpCounter.createKPCounter();
        legendContainer.insertBefore(kpCounterElement, legendContainer.firstChild);
    }
};

StudienplanBase.prototype.updateKPDisplay = function() {
    if (!this.config.enableKPCounter || !this.kpCounter) return;

    return this.kpCounter.updateKPDisplay(this.config);
};

StudienplanBase.prototype.updateCategoryKPDisplay = function(categoryName, selectedModules, minKP = 0) {
    if (!this.config.enableKPCounter || !this.kpCounter) return 0;

    return this.kpCounter.updateCategoryKPDisplay(categoryName, selectedModules, minKP);
};
