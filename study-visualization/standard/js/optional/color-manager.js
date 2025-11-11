/**
 * COLOR MANAGER - Optionale Farbverwaltung
 */

window.StudienplanColorManager = {
    currentMode: 'standard',

    initialize() {
        // Wenn bereits erfolgreich initialisiert, nichts tun
        if (this._initialized) return;

        // Versuche, den Selector zu erstellen; wenn keine Modi definiert sind,
        // gibt createColorModeSelector false zurück und wir markieren nicht als init.
    // Erfasse die ursprünglichen Klassen der Module, damit wir später zu 'standard' zurückkehren können
    this.captureOriginalModuleClasses();

    const created = this.createColorModeSelector();

    // Setze Default-Mode (auch wenn kein Selector erstellt wurde, aktualisieren wir die Legende)
    this.setMode('standard'); // Default mode

        if (created) {
            this._initialized = true;
        }
    },

    createColorModeSelector() {
        if (!window.StudiengangColorManagerModes) return false;

        const selectorContainer = document.createElement('div');
        selectorContainer.id = 'color-mode-selector';
        selectorContainer.style.marginBottom = '20px';
        selectorContainer.style.textAlign = 'center';
        selectorContainer.innerHTML = `
            <label for="color-mode-select" style="margin-right: 10px; font-weight: bold;">Farbmodus:</label>
            <select id="color-mode-select" style="padding: 5px; border-radius: 4px;">
                <option value="standard">Standard</option>
            </select>
        `;

        // Füge Modi hinzu
        const select = selectorContainer.querySelector('#color-mode-select');
        const modes = Object.keys(window.StudiengangColorManagerModes).sort((a, b) => 
            (window.StudiengangColorManagerModes[a].order || 0) - (window.StudiengangColorManagerModes[b].order || 0)
        );

        modes.forEach(modeKey => {
            const mode = window.StudiengangColorManagerModes[modeKey];
            const option = document.createElement('option');
            option.value = modeKey;
            option.textContent = mode.label;
            select.appendChild(option);
        });

        // Event listener
        select.addEventListener('change', (e) => {
            this.setMode(e.target.value);
        });

        // Platziere den Selector IN der farben-legende oben (prepend),
        // damit er nicht als zusätzliches Flex-Kind im übergeordneten .container
        // den gesamten Platz einnehmen kann.
        const farbenLegende = document.querySelector('.farben-legende');
        if (farbenLegende) {
            // bevorzugt: prepend, kompatibel mit älteren Browsern via insertAdjacentElement
            if (typeof farbenLegende.prepend === 'function') {
                farbenLegende.prepend(selectorContainer);
            } else {
                farbenLegende.insertAdjacentElement('afterbegin', selectorContainer);
            }
        }

        return true;
    },

    setMode(modeKey) {
        this.currentMode = modeKey;

        if (modeKey === 'standard') {
            // Entferne vorherige color management CSS
            const existing = document.querySelectorAll('link[data-color-mode]');
            existing.forEach(link => link.remove());

            // Stelle ursprüngliche Klassen wieder her und entferne mode-spezifische Markierung
            const modules = document.querySelectorAll('.modul');
            modules.forEach(modul => {
                const prev = modul.dataset.currentColorClass;
                if (prev) modul.classList.remove(prev);

                if (modul.dataset.originalClasses) {
                    modul.dataset.originalClasses.split(' ').forEach(c => modul.classList.add(c));
                }

                delete modul.dataset.currentColorClass;
            });

            // Aktualisiere Legende
            this.updateLegend('standard');
            return;
        }

        const mode = window.StudiengangColorManagerModes[modeKey];
        if (!mode) return;

        // Lade die CSS für den Modus
        this.loadModeCSS(mode);

        // Update die Module-Kategorien
        this.updateModuleCategories(mode);

        // Update die Legende
        this.updateLegend(modeKey);
    },

    loadModeCSS(mode) {
        // Entferne vorherige color management CSS
        const existing = document.querySelectorAll('link[data-color-mode]');
        existing.forEach(link => link.remove());

        // Lade neue CSS
        if (mode.css.classes) {
            this.loadCSS(`../program-specific/mono/${this.getCurrentStudiengang()}/${mode.css.classes}`, 'color-mode');
        }
        if (mode.css.colors) {
            this.loadCSS(`../program-specific/mono/${this.getCurrentStudiengang()}/${mode.css.colors}`, 'color-mode');
        }
    },

    // Speichere die originalen Klassen (alles ausser 'modul') pro Modul, damit wir später zu Standard zurückkehren können
    captureOriginalModuleClasses() {
        const modules = document.querySelectorAll('.modul');
        modules.forEach(modul => {
            const orig = Array.from(modul.classList).filter(c => c !== 'modul').join(' ');
            if (orig) modul.dataset.originalClasses = orig;
        });
    },

    loadCSS(href, dataAttr) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        link.setAttribute(`data-${dataAttr}`, 'true');
        document.head.appendChild(link);
    },

    updateModuleCategories(mode) {
        const modules = document.querySelectorAll('.modul');
        modules.forEach(modul => {
            const moduleData = this.findModuleData(modul);
            if (moduleData) {
                let newCategory = moduleData[mode.categoryField];
                
                if (mode.deriveClass) {
                    newCategory = mode.deriveClass(moduleData, newCategory);
                }
                
                if (mode.valueType === 'class') {
                    // newCategory ist bereits die Klasse
                } else {
                    // Mappe name zu klasse
                    const cat = mode.getCategories().find(c => c.name === newCategory);
                    newCategory = cat ? cat.klasse : newCategory;
                }
                // Entferne vorherige color-mode Klasse falls gesetzt
                const prev = modul.dataset.currentColorClass;
                if (prev) modul.classList.remove(prev);

                // Entferne auch die originalClasses, damit wir nur die neue Klasse haben (wenn original vorhanden)
                if (modul.dataset.originalClasses) {
                    modul.dataset.originalClasses.split(' ').forEach(c => modul.classList.remove(c));
                }

                // Füge neue Kategorie-Klasse hinzu und merke sie als aktuell
                if (newCategory) {
                    modul.classList.add(newCategory);
                    modul.dataset.currentColorClass = newCategory;
                }
            }
        });
    },

    findModuleData(modulElement) {
        // Finde die Modul-Daten basierend auf dem Namen oder so
        // Einfach: verwende den Titel
        const title = modulElement.querySelector('.modul-titel').textContent;
        return window.StudiengangModules.find(m => m.name === title);
    },

    updateLegend(modeKey) {
        const legendContainer = document.getElementById('legende');
        if (!legendContainer) return;

        let categories = [];
        
        if (modeKey === 'standard') {
            // Verwende die standard Kategorien
            const modules = document.querySelectorAll('.modul');
            const cats = new Set();
            modules.forEach(m => {
                const category = Array.from(m.classList).find(c => !['modul'].includes(c));
                if (category) cats.add(category);
            });
            categories = Array.from(cats);
        } else {
            const mode = window.StudiengangColorManagerModes[modeKey];
            categories = mode.getCategories().map(c => c.klasse);
        }

        const legendHTML = categories.map(category => `
            <div class="legende-item ${category}">
                <div class="legende-text">${this.getCategoryName(category, modeKey)}</div>
            </div>
        `).join('');

        legendContainer.innerHTML = legendHTML;
    },

    getCategoryName(category, modeKey) {
        if (modeKey === 'standard') {
            return window.StudienplanLegend.getCategoryName(category);
        }
        
        const mode = window.StudiengangColorManagerModes[modeKey];
        const cat = mode.getCategories().find(c => c.klasse === category);
        return cat ? cat.name : category;
    },

    getCurrentStudiengang() {
        return document.body.getAttribute('data-studiengang') || 'eth-cs';
    }
};

// Initialisiere wenn DOM ready
document.addEventListener('DOMContentLoaded', () => {
    window.StudienplanColorManager.initialize();
});

// Falls das Script nach dem DOMContentLoaded geladen wird, sofort initialisieren
if (document.readyState === 'interactive' || document.readyState === 'complete') {
    // Kleiner Timeout damit DOM-abhängige Elemente sicher vorhanden sind
    setTimeout(() => window.StudienplanColorManager.initialize(), 0);
}

// Markiere als geladen
window.subModulesReady['color-manager'] = Promise.resolve();