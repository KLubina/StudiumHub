/* ==== STUDIENPLAN BASE COLOR MANAGER - VEREINFACHT ==== */

class StudienplanBaseColorManager {
    constructor(studienplan) {
        this.studienplan = studienplan;
        this.config = studienplan.config;
        
        // Hole die ColorConfig direkt (ITET oder CSE)
        this.colorConfig = window.ITETColorConfig || window.CSEColorConfig;
        
        // Verfügbare Modi aus Config
        this.modes = this.config.coloringModes || {};
        this.currentMode = this.config.defaultColoringMode || "kategorie";
    }

    /* ==== HAUPT-METHODEN ==== */
    
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
            
            // Entferne ALLE möglichen Farb-Klassen
            modulEl.className = 'modul';
            
            // Füge neue Klasse hinzu
            const cssClass = this.getCssClass(modulName);
            if (cssClass) modulEl.classList.add(cssClass);
        });
    }

    getCssClass(modulName) {
        if (!this.colorConfig) {
            // Fallback: Kategorie aus Config
            const modul = this.config.daten?.find(m => m.name === modulName);
            return modul?.kategorie ? this.config.kategorieZuKlasse[modul.kategorie] : null;
        }

        // Je nach Mode unterschiedlich
        if (this.currentMode === "themenbereich") {
            return this.colorConfig.getThemenbereich(modulName);
        }
        
        if (this.currentMode === "pruefungsblock") {
            const block = this.colorConfig.getPruefungsblock(modulName);
            return block?.cssClass;
        }
        
        // Default: Kategorie
        const modul = this.config.daten?.find(m => m.name === modulName);
        return modul?.kategorie ? this.config.kategorieZuKlasse[modul.kategorie] : null;
    }

    updateLegend() {
        const legende = document.getElementById("legende");
        if (!legende) return;

        // Entferne alte Items (behalte Controls)
        legende.querySelectorAll('.legende-item:not([data-color-controls] *)').forEach(el => el.remove());

        // Erstelle neue Legend je nach Mode
        if (this.currentMode === "pruefungsblock" && this.colorConfig) {
            this.createPruefungsbloeckeLegend(legende);
        } else if (this.currentMode === "themenbereich" && this.colorConfig) {
            this.createThemenbereichLegend(legende);
        } else {
            this.createKategorienLegend(legende);
        }
    }

    createPruefungsbloeckeLegend(container) {
        Object.values(this.colorConfig.pruefungsbloecke).forEach(block => {
            const div = document.createElement("div");
            div.className = "legende-item";
            if (block.cssClass) {
                div.classList.add(block.cssClass);
            }
            // Keine Inline-Farbe mehr – CSS Klasse + variables regeln Darstellung
            div.textContent = block.shortName || block.name;
            container.appendChild(div);
        });
    }

    createThemenbereichLegend(container) {
        Object.values(this.colorConfig.colors.themenbereiche).forEach(theme => {
            const div = document.createElement("div");
            div.className = "legende-item";
            // Verwende slug als Klasse, damit Variable greifen kann: erwartet --color-<slug>
            const slug = theme.label.toLowerCase().replace(/\s+/g,'-');
            div.classList.add(slug);
            div.textContent = `${theme.emoji} ${theme.label}`;
            container.appendChild(div);
        });
    }

    createKategorienLegend(container) {
        this.config.kategorien?.forEach(kat => {
            this.studienplan.createLegendItem(kat, container);
        });
    }

    /* ==== CONTROLS ==== */
    
    addControls() {
        if (Object.keys(this.modes).length <= 1) return;

        const legende = document.querySelector(".farben-legende");
        if (!legende || legende.querySelector('[data-color-controls]')) return;

        const controls = document.createElement("div");
        controls.setAttribute('data-color-controls', 'true');
        controls.innerHTML = `
            <div style="margin-bottom:15px;padding:10px;background:#f0f0f0;border-radius:5px;">
                <div style="font-weight:bold;margin-bottom:8px;">Färbung nach:</div>
                ${this.createRadioButtons()}
            </div>
        `;

        legende.insertBefore(controls, legende.firstChild);
        
        controls.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.addEventListener('change', () => this.setMode(radio.value));
        });

        this.addCSS();
    }

    createRadioButtons() {
        return Object.entries(this.modes)
            .map(([mode, label]) => `
                <label style="display:block;margin-bottom:5px;cursor:pointer;">
                    <input type="radio" name="color-mode" value="${mode}" 
                           ${mode === this.currentMode ? 'checked' : ''}> 
                    ${label}
                </label>
            `).join('');
    }

    syncRadioButtons() {
        document.querySelectorAll('input[name="color-mode"]').forEach(radio => {
            radio.checked = radio.value === this.currentMode;
        });
    }

    /* ==== CSS ==== */
    
    addCSS() {
        if (document.getElementById('colormanager-styles')) return;

        const style = document.createElement('style');
        style.id = 'colormanager-styles';
        style.textContent = `
            /* Radio Buttons UI */
            [data-color-controls] label:hover {
                background: rgba(0,0,0,0.05);
                border-radius: 3px;
                padding: 2px;
            }
        `;
        document.head.appendChild(style);
    }

    isLightColor(color) {
        // Deprecated: Textfarbe wird künftig durch --color-<slug>-text oder generische Berechnung geregelt
        const hex = color?.replace('#','');
        if (!hex || (hex.length !== 3 && hex.length !== 6)) return false;
        const fullHex = hex.length === 3 ? hex.split('').map(c=>c+c).join('') : hex;
        const r = parseInt(fullHex.substring(0,2),16);
        const g = parseInt(fullHex.substring(2,4),16);
        const b = parseInt(fullHex.substring(4,6),16);
        // Relative luminance formula
        const luminance = (0.2126*r + 0.7152*g + 0.0722*b) / 255;
        return luminance > 0.7;
    }
}

/* ==== INTEGRATION ==== */

StudienplanBase.prototype.initializeColorManager = function() {
    if (!this.config.enableColorManager || this.colorManager) return;
    
    this.colorManager = new StudienplanBaseColorManager(this);
    
    setTimeout(() => {
        this.colorManager.addControls();
        this.colorManager.applyColors();
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