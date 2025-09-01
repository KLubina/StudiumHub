/* ==== STUDIENPLAN BASE CORE ==== */
/* Hauptklasse und Initialisierung */

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
        if (this.config.title) {
            document.getElementById('page-title').textContent = this.config.title;
            document.getElementById('studienplan-title').textContent = this.config.title;
        }
        
        if (this.config.subtitle) {
            document.getElementById('studienplan-subtitle').textContent = this.config.subtitle;
        }
        
        if (this.config.legendTitle) {
            document.getElementById('legende-titel').textContent = this.config.legendTitle;
        }
    }

    /* ==== EVENT LISTENERS ==== */
    setupEventListeners() {
        // Click outside tooltip to close
        document.addEventListener('click', (event) => {
            if (this.tooltipEl && event.target !== this.tooltipEl && !this.tooltipEl.contains(event.target)) {
                let isModulClick = false;
                let isLegendClick = false;
                let target = event.target;
                
                while (target && !isModulClick && !isLegendClick) {
                    if (target.classList) {
                        if (target.classList.contains('modul')) {
                            isModulClick = true;
                        } else if (target.classList.contains('legende-item')) {
                            isLegendClick = true;
                        }
                    }
                    target = target.parentElement;
                }
                
                if (!isModulClick && !isLegendClick) {
                    this.hideTooltip();
                }
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
    
    // Spezielle Behandlung für bekannte Custom Classes
    if (!StudiengangClass && window.ITETStudienplan) {
        StudiengangClass = window.ITETStudienplan;
    }
    if (!StudiengangClass && window.CSEStudienplan) {
        StudiengangClass = window.CSEStudienplan;
    }
    if (!StudiengangClass && window.RIGStudienplan) {
        StudiengangClass = window.RIGStudienplan;
    }
    if (!StudiengangClass && window.MTECStudienplan) {
        StudiengangClass = window.MTECStudienplan;
    }
    
    // Fallback auf StudienplanBase
    if (!StudiengangClass) {
        StudiengangClass = StudienplanBase;
    }
    
    const studienplan = new StudiengangClass(config);
    studienplan.initialize();
    
    window.currentStudienplan = studienplan;
}