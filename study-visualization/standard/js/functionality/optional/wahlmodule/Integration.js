/* Wahlmodule - StudienplanBase Integration */

StudienplanBase.prototype.initializeWahlmoduleSystem = function() {
    if (!this.config.enableWahlmodule) return;

    this.wahlmoduleManager = new StudienplanWahlmoduleManager(this);
    try {
        const legendContainer = document.querySelector('.farben-legende');
        if (legendContainer && Array.isArray(this.config.kategorien)) {
            this.config.kategorien.forEach(kategorie => {
                if (!kategorie || !kategorie.hasTooltip) return;

                let div = null;
                if (kategorie.klasse) {
                    div = legendContainer.querySelector(`.${kategorie.klasse}`);
                }
                if (!div) {
                    const items = Array.from(legendContainer.querySelectorAll('.legende-item'));
                    div = items.find(el => el.textContent && el.textContent.indexOf(kategorie.name) !== -1);
                }

                if (div && !div.classList.contains('tooltip-enabled')) {
                    this.addLegendTooltipEvents(div, kategorie);
                }
            });
        }
    } catch (err) {
        console.error('Fehler beim Anhängen der Legenden-Tooltip-Events:', err);
    }

    this.addWahlmoduleControls();
    this.wahlmoduleManager.updateStudienplanWithSelection();
};

StudienplanBase.prototype.addWahlmoduleControls = function() {
    const legendContainer = document.querySelector(".farben-legende");
    if (!legendContainer || document.getElementById("wahlmodule-controls")) return;
};

StudienplanBase.prototype.addLegendTooltipEvents = function(div, kategorie) {
    if (this.wahlmoduleManager && kategorie && kategorie.hasTooltip) {
        this.wahlmoduleManager.addLegendTooltipEvents(div, kategorie);
    }
};

// Auto-Integration mit Check gegen mehrfache Anwendung
if (!StudienplanBase.prototype._wahlmoduleIntegrated) {
    console.log('🧩 [Wahlmodule] Patching StudienplanBase.prototype.initialize');
    const originalInitialize = StudienplanBase.prototype.initialize;
    console.log('🧩 [Wahlmodule] originalInitialize:', originalInitialize);
    console.log('🧩 [Wahlmodule] originalInitialize.toString():', originalInitialize.toString().substring(0, 200));
    StudienplanBase.prototype.initialize = function() {
        console.log('🧩 [Wahlmodule] Patched initialize() called');
        console.log('🧩 [Wahlmodule] About to call originalInitialize');
        originalInitialize.call(this);
        console.log('🧩 [Wahlmodule] originalInitialize completed');
        this.initializeWahlmoduleSystem();
    };
    StudienplanBase.prototype._wahlmoduleIntegrated = true;
}
