/* ==== STUDIENPLAN BASE COLOR MANAGER - ERWEITERT ==== */
/* Bestehende Datei erweitert um CSE/ITET-Features für Vereinheitlichung */

class StudienplanBaseColorManager {
    constructor(studienplan) {
        this.studienplan = studienplan;
        
        // NEU: Konfigurierbare Modi (CSE/ITET-Features)
        this.availableModes = studienplan.config.coloringModes || {};
        this.coloringMode = studienplan.config.defaultColoringMode || "default";
    }

    /* ==== CORE METHODS (BESTEHEND) ==== */
    setColoringMode(mode) {
        this.coloringMode = mode;
        this.updateModuleColors();
        this.updateLegend();
        
        // NEU: Radio-Buttons synchronisieren  
        const radios = document.querySelectorAll('input[name="color-mode"]');
        radios.forEach(radio => {
            radio.checked = radio.value === mode;
        });
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
        if (!legendElement) return;

        // Nur Legend-Items entfernen, Controls behalten
        legendElement.querySelectorAll('.legende-item:not([data-controls] *)').forEach(item => item.remove());

        // NEU: Mode-spezifische Legenden
        if (this.coloringMode === "pruefungsblock") {
            this.createPruefungsbloeckeLegend(legendElement);
        } else if (this.coloringMode === "themenbereich") {
            this.createThemenbereichLegend(legendElement);
        } else {
            // Standard: Kategorien-Legende (OHNE Prüfungsblöcke)
            this.createKategorienLegend(legendElement);
        }
    }

    /* ==== HELPER METHODS (BESTEHEND) ==== */
    getModulFromElement(modulEl) {
        const titleEl = modulEl.querySelector('.modul-titel');
        if (!titleEl) return null;
        
        const name = titleEl.textContent.trim();
        return this.studienplan.config.daten?.find(m => 
            m.name === name || m.name.includes(name) || name.includes(m.name)
        );
    }

    applyColorToModule(modulEl, modul) {
        // ALLE möglichen Farb-Klassen entfernen (komplett)
        const allColorClasses = [
            // Prüfungsblöcke
            'basis', 'block-bpa', 'block-bpb', 'block-p1', 'block-p2', 'block-p3', 'no-pruefungsblock',
            // Themenbereiche
            'physik', 'informatik', 'informationstechnologie', 'mathematik', 'elektrotechnik', 'chemie', 'sonstiges',
            // Kategorien
            'obligatorisch', 'obligatorisch-praktikum', 'kern', 'wahl', 'wissenschaft',
            'weitere-wahl-grundlagen', 'wahl-praktika-projekte'
        ];

        // Entferne ALLE Farb-Klassen
        allColorClasses.forEach(cls => modulEl.classList.remove(cls));

        // Entferne auch inline styles (falls vorhanden)
        modulEl.style.backgroundColor = '';
        modulEl.style.color = '';

        // Neue Klasse anwenden
        const cssClass = this.getModuleCssClass(modul);
        if (cssClass) {
            modulEl.classList.add(cssClass);
        }
    }

    getModuleCssClass(modul) {
        // NEU: Dynamisch je nach Mode (CSE/ITET-Features)
        if (this.coloringMode === "themenbereich") {
            return this.getThemenbereichClass(modul);
        }
        if (this.coloringMode === "pruefungsblock") {
            return this.getPruefungsblockClass(modul);
        }
        
        // Standard: Kategorie-basiert (BESTEHEND)
        if (modul.kategorie && this.studienplan.config.kategorieZuKlasse) {
            return this.studienplan.config.kategorieZuKlasse[modul.kategorie];
        }
        return modul.kategorie;
    }

    /* ==== NEU: CSE-STYLE FEATURES ==== */
    getThemenbereichClass(modul) {
        // ZENTRALE CONFIG: Holt Themenbereich aus ITETColorConfig
        if (window.ITETColorConfig) {
            const themenbereich = window.ITETColorConfig.getThemenbereich(modul.name);
            if (themenbereich) {
                return themenbereich;
            }
        }

        // Fallback für alte Modul-Struktur (wenn noch vorhanden)
        if (modul.themenbereich) {
            return modul.themenbereich;
        }

        // Fallback: Erkenne Thema basierend auf Modulnamen
        const name = modul.name.toLowerCase();

        // Physik
        if (name.includes('physik') || name.includes('mechanik') || name.includes('elektromagnetisch')) {
            return "physik";
        }

        // Elektrotechnik
        if (name.includes('elektrotechnik') || name.includes('netzwerk') || name.includes('schaltung') ||
            name.includes('signal') || name.includes('halbleiter')) {
            return "elektrotechnik";
        }

        // Informationstechnologie
        if (name.includes('informatik') || name.includes('digital') || name.includes('computer') ||
            name.includes('programm') || name.includes('technische informatik')) {
            return "informationstechnologie";
        }

        // Mathematik
        if (name.includes('mathematik') || name.includes('analysis') || name.includes('algebra') ||
            name.includes('numerisch') || name.includes('wahrscheinlichkeit') || name.includes('diskrete')) {
            return "mathematik";
        }

        // Chemie
        if (name.includes('chemie')) {
            return "chemie";
        }

        return "sonstiges";
    }

    /* ==== NEU: ITET-STYLE FEATURES ==== */
    getPruefungsblockClass(modul) {
        // ZENTRALE CONFIG: Holt Prüfungsblock aus ITETColorConfig
        if (window.ITETColorConfig) {
            const block = window.ITETColorConfig.getPruefungsblock(modul.name);
            if (block) {
                return block.cssClass;
            }
        }

        // Fallback: Alte config.pruefungsbloecke (für Abwärtskompatibilität)
        if (this.studienplan.config.pruefungsbloecke) {
            for (const block of this.studienplan.config.pruefungsbloecke) {
                if (block.module && block.module.includes(modul.name)) {
                    return block.cssClass;
                }
            }
        }

        return "no-pruefungsblock";
    }

    createPruefungsbloeckeLegend(container) {
        // ZENTRALE CONFIG: Nutzt ITETColorConfig
        const pruefungsbloecke = window.ITETColorConfig
            ? Object.values(window.ITETColorConfig.pruefungsbloecke)
            : this.studienplan.config.pruefungsbloecke || [];

        if (pruefungsbloecke.length === 0) return;

        pruefungsbloecke.forEach(block => {
            const item = document.createElement("div");
            item.className = "legende-item";
            item.style.backgroundColor = block.color || '#E0E0E0';
            item.style.color = (block.color === '#FFEAA7' || block.color === '#E0E0E0') ? 'black' : 'white';
            item.style.padding = '8px';
            item.style.margin = '2px 0';
            item.style.borderRadius = '4px';
            item.innerHTML = `<span>${block.shortName || block.name}</span>`;
            container.appendChild(item);
        });
    }

    createKategorienLegend(container) {
        // Nur Kategorien anzeigen, OHNE Prüfungsblöcke
        if (this.studienplan.config.kategorien && this.studienplan.config.kategorien.length > 0) {
            this.studienplan.config.kategorien.forEach(kategorie => {
                this.studienplan.createLegendItem(kategorie, container);
            });
        }
    }

    createThemenbereichLegend(container) {
        // ZENTRALE CONFIG: Nutzt ITETColorConfig für Themenbereiche
        if (window.ITETColorConfig && window.ITETColorConfig.colors.themenbereiche) {
            const themenbereiche = window.ITETColorConfig.colors.themenbereiche;

            Object.entries(themenbereiche).forEach(([, config]) => {
                const div = document.createElement("div");
                div.classList.add("legende-item");
                div.textContent = `${config.emoji} ${config.label}`;
                div.style.backgroundColor = config.bg;
                div.style.color = config.text;
                div.style.padding = '8px';
                div.style.margin = '2px 0';
                div.style.borderRadius = '4px';
                container.appendChild(div);
            });
            return;
        }

        // Fallback: Alte Konfiguration
        const themenbereiche = this.studienplan.config.themenbereiche || [
            { name: "Physik", klasse: "physik" },
            { name: "Informatik", klasse: "informatik" },
            { name: "Mathematik", klasse: "mathematik" },
            { name: "Chemie", klasse: "chemie" },
            { name: "Sonstiges", klasse: "sonstiges" }
        ];

        const colorMap = {
            'physik': { bg: '#2196F3', color: 'white' },
            'informatik': { bg: '#2600ff', color: 'white' },
            'informationstechnologie': { bg: '#2600ff', color: 'white' },
            'mathematik': { bg: '#00a99d', color: 'white' },
            'elektrotechnik': { bg: '#FF6B35', color: 'white' },
            'chemie': { bg: '#9C27B0', color: 'white' },
            'sonstiges': { bg: '#E0E0E0', color: 'black' }
        };

        themenbereiche.forEach((thema) => {
            const div = document.createElement("div");
            div.classList.add("legende-item");
            div.textContent = thema.name;

            const colors = colorMap[thema.klasse];
            if (colors) {
                div.style.backgroundColor = colors.bg;
                div.style.color = colors.color;
                div.style.padding = '8px';
                div.style.margin = '2px 0';
                div.style.borderRadius = '4px';
            }

            container.appendChild(div);
        });
    }

    /* ==== NEU: CONTROLS ERSTELLEN (CSE-BASIERT) ==== */
    addColoringModeControls() {
        // Nur wenn Modi konfiguriert sind
        if (Object.keys(this.availableModes).length <= 1) return;
        
        setTimeout(() => this.createControlsOnce(), 100);
    }

    createControlsOnce() {
        const legendContainer = document.querySelector(".farben-legende");
        if (!legendContainer || legendContainer.querySelector('[data-color-controls]')) return;

        const controls = document.createElement("div");
        controls.setAttribute('data-color-controls', 'true');
        controls.style.cssText = "margin-bottom:15px;padding:10px;background:#f0f0f0;border-radius:5px;";
        
        // Radio buttons aus Config generieren
        const radioButtons = Object.entries(this.availableModes)
            .map(([mode, label], index) => `
                <label style="display:block;margin-bottom:5px;cursor:pointer;">
                    <input type="radio" name="color-mode" value="${mode}" ${mode === this.coloringMode ? 'checked' : ''}> 
                    ${label}
                </label>
            `).join('');

        controls.innerHTML = `
            <div style="font-weight:bold;margin-bottom:8px;">Färbung nach:</div>
            <div>${radioButtons}</div>
        `;

        legendContainer.insertBefore(controls, legendContainer.firstChild);

        // Event Listener
        controls.addEventListener("change", (e) => {
            if (e.target.name === "color-mode") {
                this.setColoringMode(e.target.value);
            }
        });

        this.ensureCSS();
    }

    ensureCSS() {
        if (document.getElementById('colormanager-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'colormanager-styles';
        style.textContent = `
            /* Prüfungsblock-Farben */
            .modul.block-bpa { background-color: #FF6B6B !important; color: white !important; }
            .modul.block-bpb { background-color: #4ECDC4 !important; color: white !important; }
            .modul.block-p1 { background-color: #45B7D1 !important; color: white !important; }
            .modul.block-p2 { background-color: #96CEB4 !important; color: white !important; }
            .modul.block-p3 { background-color: #FFEAA7 !important; color: black !important; }
            .modul.no-pruefungsblock { background-color: #E0E0E0 !important; color: black !important; }
            
            /* Themenbereich-Farben */
            .modul.physik { background-color: #2196F3 !important; color: white !important; }
            .modul.informatik { background-color: #2600ff !important; color: white !important; }
            .modul.informationstechnologie { background-color: #2600ff !important; color: white !important; }
            .modul.mathematik { background-color: #00a99d !important; color: white !important; }
            .modul.elektrotechnik { background-color: #FF6B35 !important; color: white !important; }
            .modul.chemie { background-color: #9C27B0 !important; color: white !important; }
            .modul.sonstiges { background-color: #E0E0E0 !important; color: black !important; }
            
            /* Controls Styling */
            [data-color-controls] input[type="radio"] { margin-right: 8px; }
            [data-color-controls] label:hover { 
                background-color: rgba(0,0,0,0.05); 
                border-radius: 3px; 
                padding: 2px; 
            }
        `;
        document.head.appendChild(style);
    }
}

/* ==== INTEGRATION ==== */
StudienplanBase.prototype.initializeColorManager = function() {
    if (!this.config.enableColorManager || this.colorManager) return;
    
    this.colorManager = new StudienplanBaseColorManager(this);
    
    setTimeout(() => {
        if (this.colorManager.addColoringModeControls) {
            this.colorManager.addColoringModeControls();
        }
    }, 100);
};

// Auto-Integration (BESTEHEND)
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