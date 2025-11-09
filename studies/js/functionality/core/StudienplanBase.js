/* Studienplan Base Class */

class StudienplanBase {
    constructor(config) {
        this.config = config;
        this.tooltipEl = null;
        this.aktivesModul = null;
        this.isTooltipLocked = false;
        this.isVertiefungsgebieteTooltipLocked = false;
        this.isWahlfaecherTooltipLocked = false;

        this.kpCounter = null;
    }

    getUniqueYears() {
        return [...new Set(this.config.daten.map(m => m.jahr))].sort();
    }

    getCssClassForCategory(categoryName) {
        const mapping = this.config.kategorieZuKlasse || {};
        return mapping[categoryName] || categoryName.toLowerCase().replace(/\s+/g, '-');
    }

    addLegendTooltipEvents(div, kategorie) {
        // Override in subclasses for special tooltip functionality
    }
}

window.StudienplanBase = StudienplanBase;
