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

        // Platziere den Selector vor der farben-legende
        const farbenLegende = document.querySelector('.farben-legende');
        if (farbenLegende) {
            farbenLegende.parentNode.insertBefore(selectorContainer, farbenLegende);
        }

        return true;
    },

    setMode(modeKey) {
        this.currentMode = modeKey;
        
        if (modeKey === 'standard') {
            // Standard CSS verwenden
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
                
                // Entferne alte Kategorien und füge neue hinzu
                modul.className = modul.className.replace(/modul\s+/, 'modul ');
                modul.classList.add(newCategory);
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