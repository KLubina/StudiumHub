/* ==== STUDIENPLAN BASE COLOR MANAGER ==== */
/* Zentraler ColorManager für alle Studiengänge */

class StudienplanBaseColorManager {
    constructor(studienplan) {
        this.studienplan = studienplan;
        this.coloringMode = "default"; // Standard-Modus
    }

    /* ==== BASIC COLOR METHODS ==== */
    setColoringMode(mode) {
        this.coloringMode = mode;
        this.updateModuleColors();
        this.updateLegend();
    }

    updateModuleColors() {
        const moduleElements = document.querySelectorAll(".modul");
        if (moduleElements.length === 0) return;
        
        moduleElements.forEach((modulEl) => {
            const modulName = this.extractModuleName(modulEl);
            if (!modulName) return;
            
            const modul = this.findModulInData(modulName);
            if (!modul) return;

            this.removeColorClasses(modulEl);
            const cssClass = this.getModuleCssClass(modul);
            if (cssClass) {
                modulEl.classList.add(cssClass);
            }
        });
    }

    updateLegend() {
        const legendElement = document.getElementById("legende");
        if (!legendElement) return;
        
        legendElement.innerHTML = "";
        this.studienplan.createLegend();
    }

    /* ==== UTILITY METHODS ==== */
    extractModuleName(modulEl) {
        const titleElement = modulEl.querySelector('.modul-titel');
        if (titleElement) {
            return titleElement.textContent.trim();
        }
        
        // Fallback: Text-Inhalt analysieren
        let text = modulEl.textContent.trim();
        text = text.replace(/^[0-9]+\s*(KP|ECTS)?\s*/i, '');
        text = text.split('\n')[0].trim();
        return text.replace(/\.\.\.$/, '').trim();
    }

    findModulInData(modulName) {
        return this.studienplan.config.daten.find(m => {
            return m.name === modulName || 
                   m.name.toLowerCase().includes(modulName.toLowerCase()) ||
                   modulName.toLowerCase().includes(m.name.toLowerCase());
        });
    }

    removeColorClasses(element) {
        const colorClasses = [
            "basis1", "basis2", "block-g1", "block-g2", "block-g3", "block-g4",
            "physik", "informatik", "mathematik", "chemie", "sonstiges",
            "wissenschaftliche-arbeit", "kern", "wahl", "vertiefung",
            "obligatorisch", "obligatorisch-praktikum", "weitere-wahl-grundlagen"
        ];
        colorClasses.forEach(cls => element.classList.remove(cls));
    }

    getModuleCssClass(modul) {
        // Standard: Verwende Prüfungsblock oder Kategorie
        if (modul.pruefungsblock && this.studienplan.config.pruefungsbloecke) {
            const block = this.studienplan.config.pruefungsbloecke.find(b => b.name === modul.pruefungsblock);
            if (block) return block.cssClass;
        }

        if (modul.kategorie && this.studienplan.config.kategorieZuKlasse) {
            return this.studienplan.config.kategorieZuKlasse[modul.kategorie];
        }

        return modul.kategorie;
    }

    /* ==== UI CONTROLS (BASIC) ==== */
    addColoringModeControls() {
        // Override in subclasses for specific controls
    }
}

/* ==== STUDIENPLAN BASE INTEGRATION ==== */
StudienplanBase.prototype.initializeColorManager = function() {
    if (!this.config.enableColorManager) return;
    
    // Verhindere Mehrfach-Initialisierung
    if (this.colorManager) return;
    
    // Use StudiengangColorManager if available, else BaseColorManager
    const ColorManagerClass = window.StudiengangColorManager || StudienplanBaseColorManager;
    this.colorManager = new ColorManagerClass(this);
    
    // Add UI controls if method exists
    if (this.colorManager.addColoringModeControls) {
        this.colorManager.addColoringModeControls();
    }
};

// Add to initialization - SAFER METHOD
if (!StudienplanBase.prototype._colorManagerPatched) {
    const originalInitializeBase = StudienplanBase.prototype.initialize;
    StudienplanBase.prototype.initialize = function() {
        originalInitializeBase.call(this);
        
        // Nur initialisieren wenn noch nicht durch Subklasse gemacht
        if (this.config.enableColorManager && !this.colorManager) {
            this.initializeColorManager();
        }
    };
    StudienplanBase.prototype._colorManagerPatched = true;
}

// Export
window.StudienplanBaseColorManager = StudienplanBaseColorManager;