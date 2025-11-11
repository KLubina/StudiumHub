/**
 * WAHLMODULE - Optionale Wahlmodule-Verwaltung
 */

window.StudienplanWahlmodule = {
    loadedSources: {}, // Cache für geladene Modul-Daten

    initialize() {
        // Klick-Listener für Platzhalter-Module
        document.addEventListener('click', (e) => {
            const modul = e.target.closest('.modul-platzhalter');
            if (modul) {
                const source = modul.getAttribute('data-wahlmodul-source');
                if (source) {
                    window.StudienplanWahlmodule.openWahlmodulDialog(source, modul);
                }
            }
        });
        console.log('Wahlmodule initialisiert');
    },

    // Öffnet Dialog zur Modulauswahl
    async openWahlmodulDialog(source, modulElement) {
        try {
            // Lade Modul-Daten
            const modules = await this.loadWahlmodulData(source);
            if (!modules || modules.length === 0) {
                alert('Keine Wahlmodule gefunden für: ' + source);
                return;
            }

            // Zeige Dialog
            this.showModulSelectionDialog(modules, modulElement);
        } catch (error) {
            console.error('Fehler beim Laden der Wahlmodule:', error);
            alert('Fehler beim Laden der Wahlmodule: ' + error.message);
        }
    },

    // Lädt Wahlmodul-Daten aus der angegebenen Quelle
    async loadWahlmodulData(source) {
        // Prüfe Cache
        if (this.loadedSources[source]) {
            return this.loadedSources[source];
        }

        // Bestimme den Basis-Pfad (relativ zum aktuellen Studiengang)
        const urlParams = new URLSearchParams(window.location.search);
        const studiengang = urlParams.get('studiengang') || 'eth-cs';
        const majorMinorPrograms = ['sozwi', 'uzh-geschichte', 'uzh-polisci', 'uzh-ethnologie',
                                    'uzh-kommunikation', 'uzh-pop-kultur', 'uzh-soziologie'];
        const studyModel = majorMinorPrograms.includes(studiengang) ? 'major-minor' : 'mono';
        
        // Konstruiere vollständigen Pfad
        const basePath = `../program-specific/${studyModel}/${studiengang}/data/`;
        const fullPath = basePath + source.replace('./', '');

        // Lade Datei dynamisch
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = fullPath;
            script.onload = () => {
                // Versuche verschiedene globale Variablen zu finden
                const possibleVars = [
                    'ITETWahlfaecherData',
                    'ITETModuleData', // Kernfächer
                    'ITETWeitereWahlGrundlagenData',
                    'ITETPraktikaSeminarProjektData',
                    'WahlmoduleData'
                ];

                let modules = null;
                for (const varName of possibleVars) {
                    if (window[varName]) {
                        modules = window[varName];
                        break;
                    }
                }

                if (modules) {
                    this.loadedSources[source] = modules;
                    resolve(modules);
                } else {
                    reject(new Error('Keine Modul-Daten gefunden in: ' + fullPath));
                }
            };
            script.onerror = () => reject(new Error('Fehler beim Laden von: ' + fullPath));
            document.head.appendChild(script);
        });
    },

    // Zeigt den Auswahl-Dialog an
    showModulSelectionDialog(modules, placeholderElement) {
        // Erstelle Modal-Overlay
        const overlay = document.createElement('div');
        overlay.className = 'wahlmodul-overlay';
        overlay.innerHTML = `
            <div class="wahlmodul-dialog">
                <div class="wahlmodul-header">
                    <h3>Wahlmodule auswählen</h3>
                    <button class="wahlmodul-close" title="Schließen">×</button>
                </div>
                <div class="wahlmodul-body">
                    <div class="wahlmodul-filter">
                        <input type="text" id="wahlmodul-search" placeholder="Module durchsuchen...">
                    </div>
                    <div class="wahlmodul-list" id="wahlmodul-list">
                        ${this.renderModulList(modules)}
                    </div>
                </div>
                <div class="wahlmodul-footer">
                    <div class="wahlmodul-selected-info">
                        <span id="selected-count">0</span> Module ausgewählt
                        (<span id="selected-ects">0</span> ECTS)
                    </div>
                    <button class="wahlmodul-cancel">Abbrechen</button>
                    <button class="wahlmodul-confirm">Bestätigen</button>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        // Event Listener
        this.attachDialogListeners(overlay, modules, placeholderElement);
    },

    // Rendert die Modulliste
    renderModulList(modules) {
        return modules.map((module, index) => `
            <div class="wahlmodul-item" data-index="${index}">
                <input type="checkbox" id="wahlmodul-${index}" class="wahlmodul-checkbox">
                <label for="wahlmodul-${index}">
                    <span class="wahlmodul-name">${module.name}</span>
                    <span class="wahlmodul-ects">${module.ects || 0} ECTS</span>
                </label>
            </div>
        `).join('');
    },

    // Fügt Event Listener zum Dialog hinzu
    attachDialogListeners(overlay, modules, placeholderElement) {
        const closeBtn = overlay.querySelector('.wahlmodul-close');
        const cancelBtn = overlay.querySelector('.wahlmodul-cancel');
        const confirmBtn = overlay.querySelector('.wahlmodul-confirm');
        const searchInput = overlay.querySelector('#wahlmodul-search');
        const checkboxes = overlay.querySelectorAll('.wahlmodul-checkbox');
        const selectedCount = overlay.querySelector('#selected-count');
        const selectedEcts = overlay.querySelector('#selected-ects');

        // Schließen-Handler
        const closeDialog = () => overlay.remove();
        closeBtn.addEventListener('click', closeDialog);
        cancelBtn.addEventListener('click', closeDialog);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeDialog();
        });

        // Auswahl-Tracking
        const updateSelection = () => {
            const selected = Array.from(checkboxes).filter(cb => cb.checked);
            const totalEcts = selected.reduce((sum, cb) => {
                const index = parseInt(cb.id.split('-')[1]);
                return sum + (modules[index].ects || 0);
            }, 0);
            selectedCount.textContent = selected.length;
            selectedEcts.textContent = totalEcts;
        };

        checkboxes.forEach(cb => cb.addEventListener('change', updateSelection));

        // Such-Funktion
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const items = overlay.querySelectorAll('.wahlmodul-item');
            items.forEach(item => {
                const name = item.querySelector('.wahlmodul-name').textContent.toLowerCase();
                item.style.display = name.includes(searchTerm) ? 'flex' : 'none';
            });
        });

        // Bestätigen-Handler
        confirmBtn.addEventListener('click', () => {
            const selected = Array.from(checkboxes)
                .filter(cb => cb.checked)
                .map(cb => {
                    const index = parseInt(cb.id.split('-')[1]);
                    return modules[index];
                });

            if (selected.length > 0) {
                this.addSelectedModules(selected, placeholderElement);
                closeDialog();
            } else {
                alert('Bitte wählen Sie mindestens ein Modul aus.');
            }
        });
    },

    // Fügt ausgewählte Module zum Studienplan hinzu
    addSelectedModules(selectedModules, placeholderElement) {
        const container = placeholderElement.parentElement;
        
        // Entferne Platzhalter
        placeholderElement.remove();

        // Füge ausgewählte Module hinzu
        selectedModules.forEach(module => {
            const moduleHTML = window.StudienplanModule.renderModule(module);
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = moduleHTML;
            const moduleElement = tempDiv.firstElementChild;
            container.appendChild(moduleElement);
        });

        // Aktualisiere KP-Counter falls vorhanden
        if (window.StudienplanKPCounter) {
            window.StudienplanKPCounter.updateCounter();
        }

        console.log('Module hinzugefügt:', selectedModules.map(m => m.name).join(', '));
    }
};

// Initialisiere wenn DOM ready
document.addEventListener('DOMContentLoaded', () => {
    window.StudienplanWahlmodule.initialize();
});

// Markiere als geladen
window.subModulesReady['wahlmodule'] = Promise.resolve();