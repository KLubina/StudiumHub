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

    /* ==== MESSAGE SYSTEM ==== */
    showToastMessage(message, type = "info") {
        const toast = document.createElement('div');
        toast.style.position = 'fixed';
        toast.style.top = '20px';
        toast.style.right = '20px';
        toast.style.padding = '10px 15px';
        toast.style.borderRadius = '5px';
        toast.style.zIndex = '9999';
        toast.style.fontSize = '12px';
        toast.style.fontWeight = 'bold';
        toast.textContent = message;

        const colors = {
            success: { bg: '#28a745', color: 'white' },
            warning: { bg: '#ffc107', color: 'black' },
            info: { bg: '#17a2b8', color: 'white' },
            error: { bg: '#dc3545', color: 'white' }
        };

        const style = colors[type] || colors.info;
        toast.style.backgroundColor = style.bg;
        toast.style.color = style.color;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    showMessage(message, type = "info") {
        this.showToastMessage(message, type);
    }
}

window.StudienplanBase = StudienplanBase;
