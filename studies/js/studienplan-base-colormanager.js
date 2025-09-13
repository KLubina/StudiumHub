/* ==== STUDIENPLAN BASE COLOR MANAGER - MINIMIERT ==== */
/* Pragmatische, minimale Version für alle Studiengänge */

class StudienplanBaseColorManager {
    constructor(studienplan) {
        this.studienplan = studienplan;
        this.coloringMode = "default";
    }

    /* ==== CORE METHODS ==== */
    setColoringMode(mode) {
        this.coloringMode = mode;
        this.updateModuleColors();
        this.updateLegend();
    }

    updateModuleColors() {
        document.querySelectorAll(".modul").forEach(modulEl => {
            const modul = this.getModulFromElement(modulEl);
            if (modul) {
                this.applyColorToModule(modulEl, modul);
            }
        });
    }

    updateLegend() {
        const legendElement = document.getElementById("legende");
        if (legendElement) {
            // Nur Legend-Items entfernen, Controls behalten
            legendElement.querySelectorAll('.legende-item:not([data-controls] *)').forEach(item => item.remove());
            this.studienplan.createLegend();
        }
    }

    /* ==== HELPER METHODS ==== */
    getModulFromElement(modulEl) {
        const titleEl = modulEl.querySelector('.modul-titel');
        if (!titleEl) return null;
        
        const name = titleEl.textContent.trim();
        return this.studienplan.config.daten?.find(m => 
            m.name === name || m.name.includes(name) || name.includes(m.name)
        );
    }

    applyColorToModule(modulEl, modul) {
        // Entferne alte Farb-Klassen
        modulEl.className = modulEl.className.split(' ')
            .filter(cls => !this.isColorClass(cls)).join(' ');
        
        // Füge neue Klasse hinzu
        const cssClass = this.getModuleCssClass(modul);
        if (cssClass) {
            modulEl.classList.add(cssClass);
        }
    }

    isColorClass(className) {
        const colorPrefixes = ['basis', 'block-', 'physik', 'informatik', 'mathematik', 
                              'chemie', 'wissenschaft', 'kern', 'wahl', 'obligatorisch'];
        return colorPrefixes.some(prefix => className.includes(prefix));
    }

    getModuleCssClass(modul) {
        // Standard: Kategorie-basiert
        if (modul.kategorie && this.studienplan.config.kategorieZuKlasse) {
            return this.studienplan.config.kategorieZuKlasse[modul.kategorie];
        }
        return modul.kategorie;
    }

    /* ==== EXTENSIBILITY ==== */
    addColoringModeControls() {
        // Override in subclasses
    }
}

/* ==== INTEGRATION - VEREINFACHT ==== */
StudienplanBase.prototype.initializeColorManager = function() {
    if (!this.config.enableColorManager || this.colorManager) return;
    
    const ColorManagerClass = window.StudiengangColorManager || StudienplanBaseColorManager;
    this.colorManager = new ColorManagerClass(this);
    
    setTimeout(() => {
        if (this.colorManager.addColoringModeControls) {
            this.colorManager.addColoringModeControls();
        }
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

window.StudienplanBaseColorManager = StudienplanBaseColorManager;