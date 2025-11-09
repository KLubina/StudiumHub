/* Color Manager - Main Class */

class StudienplanBaseColorManager {
    constructor(studienplan) {
        this.studienplan = studienplan;
        this.config = studienplan.config;

        this.colorConfig = window.ITETColorConfig || window.CSEColorConfig;
        this.modes = this.config.coloringModes || {};
        this.currentMode = this.config.defaultColoringMode || "kategorie";
    }

    setMode(mode) {
        this.currentMode = mode;
        this.applyColors();
        this.updateLegend();
        this.syncRadioButtons();
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
            return modul?.kategorie ? this.config.kategorieZuKlasse[modul.kategorie] : null;
        }

        if (this.currentMode === "themenbereich") {
            return this.colorConfig.getThemenbereich(modulName);
        }

        if (this.currentMode === "pruefungsblock") {
            const block = this.colorConfig.getPruefungsblock(modulName);
            return block?.cssClass;
        }

        const modul = this.config.daten?.find(m => m.name === modulName);
        return modul?.kategorie ? this.config.kategorieZuKlasse[modul.kategorie] : null;
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
