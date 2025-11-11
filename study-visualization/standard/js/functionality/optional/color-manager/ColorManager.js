/* Color Manager - Main Class */

class StudienplanBaseColorManager {
    constructor(studienplan) {
        this.studienplan = studienplan;
        this.config = studienplan.config;

        this.colorConfig = window.ITETColorConfig || window.CSEColorConfig;
        this.modes = this.config.coloringModes || {};
        this.currentMode = this.config.defaultColoringMode || "kategorie";
        this.currentLegend = "standard"; // "standard", "second", etc.
    }

    setMode(mode) {
        this.currentMode = mode;
        this.applyColors();
        this.updateLegend();
        this.syncRadioButtons();
    }

    setLegend(legend) {
        this.currentLegend = legend; // "standard", "second", etc.
        this.applyColors();
        this.updateLegend();
    }

    applyColors() {
        document.querySelectorAll(".modul").forEach(modulEl => {
            const modulName = modulEl.dataset.originalName || modulEl.querySelector('.modul-titel')?.textContent.trim();
            if (!modulName) return;

            modulEl.className = 'modul';

            const cssClass = this.getCssClass(modulName);
            if (cssClass) modulEl.classList.add(cssClass);
        });
    }

    getCssClass(modulName) {
        if (!this.colorConfig) {
            const modul = this.config.daten?.find(m => m.name === modulName);
            if (!modul) return null;
            
            // For third category (themenbereich) - use it directly if available
            if (modul.thirdcategory) {
                return modul.thirdcategory;
            }
            
            // For second/standard category - find the klasse (not the name!)
            const categoryKey = this.currentLegend + "category";
            const categoryName = modul[categoryKey] || modul.standardcategory;
            
            if (categoryName && this.config.kategorien) {
                const category = this.config.kategorien.find(k => k.name === categoryName);
                return category?.klasse || null;
            }
            
            return categoryName;
        }

        if (this.currentMode === "themenbereich") {
            return this.colorConfig.getThemenbereich(modulName);
        }

        if (this.currentMode === "pruefungsblock") {
            const block = this.colorConfig.getPruefungsblock(modulName);
            return block?.cssClass;
        }

        const modul = this.config.daten?.find(m => m.name === modulName);
        if (!modul) return null;
        
        // Use the appropriate category based on current legend
        const categoryKey = this.currentLegend + "category";
        const categoryName = modul[categoryKey] || modul.standardcategory;
        
        // Find the klasse (not the name!)
        if (categoryName && this.config.kategorien) {
            const category = this.config.kategorien.find(k => k.name === categoryName);
            return category?.klasse || null;
        }
        
        return categoryName;
    }

    syncRadioButtons() {
        document.querySelectorAll('input[name="color-mode"]').forEach(radio => {
            radio.checked = radio.value === this.currentMode;
        });
    }

    isLightColor(color) {
        const hex = color?.replace('#','');
        if (!hex || (hex.length !== 3 && hex.length !== 6)) return false;
        const fullHex = hex.length === 3 ? hex.split('').map(c=>c+c).join('') : hex;
        const r = parseInt(fullHex.substring(0,2),16);
        const g = parseInt(fullHex.substring(2,4),16);
        const b = parseInt(fullHex.substring(4,6),16);
        const luminance = (0.2126*r + 0.7152*g + 0.0722*b) / 255;
        return luminance > 0.7;
    }
}

window.StudienplanBaseColorManager = StudienplanBaseColorManager;
