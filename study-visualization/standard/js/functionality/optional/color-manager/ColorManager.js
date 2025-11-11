/* Color Manager - Main Class - NEUE IMPLEMENTATION */

class StudienplanBaseColorManager {
    constructor(studienplan) {
        this.studienplan = studienplan;
        this.config = studienplan.config;

        // Neue Configs laden
        this.thirdCategoryConfig = window.ITETThirdCategoryConfig;
        this.secondCategoryConfig = window.StudiengangCategoriesConfig;

        // Modi für das neue ColorManagement-System
        this.modes = {
            kategorie: "Kategorien",
            themenbereich: "Themenbereiche"
        };
        this.currentMode = "kategorie";
        this.currentLegend = "standard";
    }

    setMode(mode) {
        if (!this.modes[mode]) return;
        this.currentMode = mode;
        this.applyColors();
        this.updateLegend();
        this.syncRadioButtons();
    }

    setLegend(legend) {
        this.currentLegend = legend;
        this.applyColors();
        this.updateLegend();
    }

    applyColors() {
        document.querySelectorAll(".modul").forEach(modulEl => {
            const modulName = modulEl.dataset.originalName || modulEl.querySelector('.modul-titel')?.textContent.trim();
            if (!modulName) return;

            // Reset classes
            modulEl.className = 'modul';

            const cssClass = this.getCssClass(modulName);
            if (cssClass) modulEl.classList.add(cssClass);
        });
    }

    getCssClass(modulName) {
        const modul = this.config.daten?.find(m => m.name === modulName);
        if (!modul) return null;

        if (this.currentMode === "themenbereich") {
            // Verwende thirdcategory direkt
            return modul.thirdcategory || null;
        }

        if (this.currentMode === "kategorie") {
            // Verwende secondcategory oder standardcategory
            const categoryKey = this.currentLegend + "category";
            const categoryName = modul[categoryKey] || modul.standardcategory || modul.secondcategory;

            // Finde die klasse aus der secondCategoryConfig
            if (categoryName && this.secondCategoryConfig?.kategorien) {
                const category = this.secondCategoryConfig.kategorien.find(k => k.name === categoryName);
                return category?.klasse || null;
            }

            return null;
        }

        return null;
    }

    updateLegend() {
        const legendContainer = document.querySelector('.legende');
        if (!legendContainer) return;

        legendContainer.innerHTML = '';

        let legendItems = [];

        if (this.currentMode === "themenbereich" && this.thirdCategoryConfig?.kategorien) {
            legendItems = this.thirdCategoryConfig.kategorien;
        } else if (this.currentMode === "kategorie" && this.secondCategoryConfig?.kategorien) {
            legendItems = this.secondCategoryConfig.kategorien;
        }

        legendItems.forEach(item => {
            const legendItem = document.createElement('div');
            legendItem.className = `legende-item ${item.klasse}`;
            legendItem.textContent = item.name;
            legendContainer.appendChild(legendItem);
        });
    }

    syncRadioButtons() {
        document.querySelectorAll('input[name="color-mode"]').forEach(radio => {
            radio.checked = radio.value === this.currentMode;
        });
    }
}

window.StudienplanBaseColorManager = StudienplanBaseColorManager;
