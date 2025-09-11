class StudienplanBase {
    constructor(config) {
        this.config = config;
        this.tooltipEl = null;
        this.aktivesModul = null;
        this.isTooltipLocked = false;
        this.isVertiefungsgebieteTooltipLocked = false;
        this.isWahlfaecherTooltipLocked = false;
    }

    /* ==== INITIALIZATION ==== */
    initialize() {
        this.setPageInfo();
        this.createLegend();
        this.createStudienplan();
        this.setupEventListeners();
        
        // Text-fitting nach dem Rendern
        setTimeout(() => {
            this.adjustAllText();
        }, 100);
    }

    setPageInfo() {
        document.getElementById('page-title').textContent = this.config.title;
        document.getElementById('studienplan-title').textContent = this.config.title;
        
        document.getElementById('studienplan-subtitle').textContent = this.config.subtitle;
        
        document.getElementById('legende-titel').textContent = this.config.legendTitle;
    }

    /* ==== EVENT LISTENERS ==== */
    setupEventListeners() {
        document.addEventListener('click', (event) => {
            let isModulClick = false;
            let isLegendClick = false;
            let target = event.target;
            
            while (target && !isModulClick && !isLegendClick) {
                if (target.classList.contains('modul')) {
                    isModulClick = true;
                } else if (target.classList.contains('legende-item')) {
                    isLegendClick = true;
                }
                target = target.parentElement;
            }
            
            if (!isModulClick && !isLegendClick) {
                this.hideTooltip();
            }
        });
    }

    /* ==== UTILITY METHODS ==== */
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

/* ==== GLOBAL INITIALIZATION ==== */
function initializeStudienplan(config) {
    console.log('🎯 initializeStudienplan aufgerufen!');
    
    let StudiengangClass = window.StudiengangClass || window.StudiengangCustomClass;
    
    StudiengangClass = StudiengangClass || window.ITETStudienplan || window.CSEStudienplan || window.RIGStudienplan || window.MTECStudienplan || StudienplanBase;
    
    const studienplan = new StudiengangClass(config);
    studienplan.initialize();
    
    window.currentStudienplan = studienplan;
}