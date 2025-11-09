/* KP Calculator */

StudienplanKPCounter.prototype.calculateKPBreakdown = function(config) {
    const total = (config && Array.isArray(config.daten))
        ? config.daten.reduce((sum, m) => sum + (m.kp || 0), 0)
        : 0;

    return { total };
};

StudienplanKPCounter.prototype.updateKPDisplay = function(config) {
    const breakdown = this.calculateKPBreakdown(config);

    const totalEl = document.getElementById("kp-total");
    if (totalEl) totalEl.textContent = breakdown.total;

    // Progress handling removed (simplified counter)

    return breakdown;
};

StudienplanKPCounter.prototype.updateCategoryKPDisplay = function(categoryName, selectedModules, minKP = 0) {
    return Object.values(selectedModules || {})
        .flat()
        .reduce((sum, m) => sum + (m.kp || 0), 0);
};
