/* ==== STUDIENPLAN BASE KP-COUNTER ==== */
/* Zentrales KP-Counter System für alle Studiengänge */

class StudienplanKPCounter {
    constructor(config) {
        this.config = config;
        this.creditUnit = config.creditUnit || 'KP';
        this.counterConfig = config.kpCounterConfig || {};
    }

    /* ==== KP-COUNTER HTML ERSTELLEN ==== */
    createKPCounter() {
        const kpCounterContainer = document.createElement("div");
        kpCounterContainer.id = "kp-counter";
        kpCounterContainer.style.marginBottom = "20px";
        kpCounterContainer.style.padding = "15px";
        kpCounterContainer.style.backgroundColor = "#f8f9fa";
        kpCounterContainer.style.borderRadius = "8px";
        kpCounterContainer.style.border = "2px solid var(--primary-color, #0D5B8C)";
        kpCounterContainer.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";

        const primaryColor = this.getPrimaryColor();
        kpCounterContainer.innerHTML = `
            <div style="text-align: center;">
                <h3 style="margin: 0; color: ${primaryColor}; font-size: 16px;">${this.creditUnit}</h3>
                <div id="kp-total" style="font-size: 22px; font-weight: 700; margin-top: 6px;">0</div>
            </div>
        `;

        return kpCounterContainer;
    }

    /* ==== FARBEN ERMITTELN ==== */
    getPrimaryColor() {
        const style = getComputedStyle(document.documentElement);
        return style.getPropertyValue('--primary-color') || '#0D5B8C';
    }

    getGradientColor() {
        const style = getComputedStyle(document.documentElement);
        return style.getPropertyValue('--secondary-color') || '#00A0E3';
    }

    /* ==== DETAILLIERTE AUFSCHLÜSSELUNG TOGGLE ==== */
    // Detailed toggle removed - simplified counter only shows total KP.

    /* ==== KP BERECHNEN ==== */
    calculateKPBreakdown(config) {
        // Simple total KP calculation
        const total = (config && Array.isArray(config.daten))
            ? config.daten.reduce((sum, m) => sum + (m.kp || 0), 0)
            : 0;

        return { total };
    }

    /* ==== VOLLSTÄNDIGE KP-ANZEIGE AKTUALISIEREN ==== */
    updateKPDisplay(config) {
        const breakdown = this.calculateKPBreakdown(config);

        // Update simplified display
        const totalEl = document.getElementById("kp-total");
        if (totalEl) totalEl.textContent = breakdown.total;

        return breakdown;
    }

    /* ==== KATEGORIE-SPEZIFISCHE KP ANZEIGEN ==== */
    updateCategoryKPDisplay(categoryName, selectedModules, minKP = 0) {
        // Keep compatibility: compute total KP for supplied modules but do not touch any UI beyond total counter
        return Object.values(selectedModules || {})
            .flat()
            .reduce((sum, m) => sum + (m.kp || 0), 0);
    }
}

/* ==== STUDIENPLAN BASE INTEGRATION ==== */
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