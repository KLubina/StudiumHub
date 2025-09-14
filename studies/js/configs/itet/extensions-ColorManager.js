/* ==== ITET COLOR MANAGER - VERBESSERTE VERSION ==== */
/* Orientiert sich eng an der CSE-Version für geschmeidige Funktionalität */

if (!window.ITETColorManager) {
    class ITETColorManager extends StudienplanBaseColorManager {
        constructor(studienplan) {
            super(studienplan);
            this.coloringMode = "kategorie"; // ITET Standard
        }

        /* ==== ITET-SPEZIFISCHE COLORING MODI ==== */
        getModuleCssClass(modul) {
            if (this.coloringMode === "pruefungsblock") {
                return this.getPruefungsblockClass(modul);
            }
            
            // Standard: Kategorie-basiert
            return super.getModuleCssClass(modul);
        }

        getPruefungsblockClass(modul) {
            // Suche Prüfungsblock basierend auf Modulname
            if (this.studienplan.config.pruefungsbloecke) {
                for (const block of this.studienplan.config.pruefungsbloecke) {
                    if (block.module && block.module.includes(modul.name)) {
                        return block.cssClass;
                    }
                }
            }
            return "no-pruefungsblock";
        }

        /* ==== CONTROLS - NUR EINMAL ERSTELLEN ==== */
        addColoringModeControls() {
            // Kleine Verzögerung um sicherzustellen dass DOM bereit ist
            setTimeout(() => this.createControlsOnce(), 100);
        }

        createControlsOnce() {
            const legendContainer = document.querySelector(".farben-legende");
            if (!legendContainer || legendContainer.querySelector('[data-itet-controls]')) {
                return; // Controls bereits vorhanden
            }

            const controls = document.createElement("div");
            controls.setAttribute('data-itet-controls', 'true');
            controls.style.cssText = "margin-bottom:15px;padding:10px;background:#f0f0f0;border-radius:5px;";
            controls.innerHTML = `
                <div style="font-weight:bold;margin-bottom:8px;">Färbung nach:</div>
                <div>
                    <label style="display:block;margin-bottom:5px;">
                        <input type="radio" name="itet-coloring-mode" value="kategorie" checked> 
                        Kategorien
                    </label>
                    <label style="display:block;">
                        <input type="radio" name="itet-coloring-mode" value="pruefungsblock"> 
                        Prüfungsblöcken
                    </label>
                </div>
            `;

            // Einfügen am Anfang der Legende
            legendContainer.insertBefore(controls, legendContainer.firstChild);

            // Event Listener hinzufügen
            controls.addEventListener("change", (e) => {
                if (e.target.name === "itet-coloring-mode") {
                    this.setColoringMode(e.target.value);
                }
            });

            // CSS sofort laden
            this.ensureCSS();
        }

        /* ==== LEGEND UPDATE - ALLE ITEMS ENTFERNEN, CONTROLS BEHALTEN ==== */
        updateLegend() {
            const legendElement = document.getElementById("legende");
            if (!legendElement) return;

            // ALLE Legend-Items löschen, aber Controls-Container behalten
            const allItems = legendElement.querySelectorAll('.legende-item');
            allItems.forEach(item => {
                // Nur Items löschen die nicht die Controls enthalten
                if (!item.hasAttribute('data-itet-controls')) {
                    item.remove();
                }
            });

            if (this.coloringMode === "pruefungsblock") {
                this.createPruefungsbloeckeLegend(legendElement);
            } else {
                // Standard-Kategorien-Legende
                if (this.studienplan.config.kategorien) {
                    this.studienplan.config.kategorien.forEach((kategorie) => {
                        this.studienplan.createLegendItem(kategorie, legendElement);
                    });
                }
            }
        }

        createPruefungsbloeckeLegend(container) {
            if (!this.studienplan.config.pruefungsbloecke) return;

            this.studienplan.config.pruefungsbloecke.forEach(block => {
                const item = document.createElement("div");
                item.className = "legende-item";
                item.style.backgroundColor = block.color || '#E0E0E0';
                // Bessere Textfarbe je nach Hintergrund
                const textColor = this.getTextColorForBackground(block.color || '#E0E0E0');
                item.style.color = textColor;
                item.style.padding = '8px';
                item.style.margin = '2px 0';
                item.style.borderRadius = '4px';
                
                item.innerHTML = `<span>${block.shortName || block.name}</span>`;
                container.appendChild(item);
            });
            
            // "Sonstige" Kategorie hinzufügen
            const otherItem = document.createElement("div");
            otherItem.className = "legende-item";
            otherItem.style.backgroundColor = '#E0E0E0';
            otherItem.style.color = 'black';
            otherItem.style.padding = '8px';
            otherItem.style.margin = '2px 0';
            otherItem.style.borderRadius = '4px';
            otherItem.innerHTML = '<span>Sonstige</span>';
            container.appendChild(otherItem);
        }

        /* ==== TEXTFARBE BESTIMMEN ==== */
        getTextColorForBackground(backgroundColor) {
            // Helle Hintergründe -> dunkler Text, dunkle Hintergründe -> weißer Text
            const lightColors = ['#FFEAA7', '#E0E0E0', '#96CEB4'];
            return lightColors.includes(backgroundColor) ? 'black' : 'white';
        }

        /* ==== CSS - ROBUST LADEN ==== */
        ensureCSS() {
            if (document.getElementById('itet-colormanager-styles')) return;
            
            const style = document.createElement('style');
            style.id = 'itet-colormanager-styles';
            style.textContent = `
                /* Prüfungsblock-Farben */
                .modul.block-bpa { background-color: #FF6B6B !important; color: white !important; }
                .modul.block-bpb { background-color: #4ECDC4 !important; color: white !important; }
                .modul.block-p1 { background-color: #45B7D1 !important; color: white !important; }
                .modul.block-p2 { background-color: #96CEB4 !important; color: white !important; }
                .modul.block-p3 { background-color: #FFEAA7 !important; color: black !important; }
                .modul.no-pruefungsblock { background-color: #E0E0E0 !important; color: black !important; }
                
                /* Controls Styling */
                [data-itet-controls] input[type="radio"] {
                    margin-right: 8px;
                }
                
                [data-itet-controls] label {
                    cursor: pointer;
                    font-size: 14px;
                }
                
                [data-itet-controls] label:hover {
                    background-color: rgba(0,0,0,0.05);
                    border-radius: 3px;
                    padding: 2px;
                }
            `;
            document.head.appendChild(style);
        }

        /* ==== MODE SWITCHING - GESCHMEIDIG ==== */
        setColoringMode(mode) {
            console.log(`🎨 ITET ColorManager: Wechsle zu ${mode}-Modus`);
            
            this.coloringMode = mode;
            this.updateModuleColors();
            this.updateLegend();
            
            // Radio-Buttons synchronisieren
            const radios = document.querySelectorAll('input[name="itet-coloring-mode"]');
            radios.forEach(radio => {
                radio.checked = radio.value === mode;
            });
        }

        /* ==== MODULE FARBEN AKTUALISIEREN ==== */
        updateModuleColors() {
            document.querySelectorAll(".modul").forEach(modulEl => {
                const modul = this.getModulFromElement(modulEl);
                if (modul) {
                    this.applyColorToModule(modulEl, modul);
                }
            });
        }

        applyColorToModule(modulEl, modul) {
            // Entferne alle möglichen Farb-Klassen
            const classesToRemove = [
                'block-bpa', 'block-bpb', 'block-p1', 'block-p2', 'block-p3', 'no-pruefungsblock',
                'obligatorisch', 'obligatorisch-praktikum', 'kern', 'weitere-wahl-grundlagen', 
                'wahl', 'wahl-praktika-projekte', 'wissenschaft'
            ];
            
            classesToRemove.forEach(cls => modulEl.classList.remove(cls));
            
            // Neue Klasse anwenden
            const cssClass = this.getModuleCssClass(modul);
            if (cssClass) {
                modulEl.classList.add(cssClass);
            }
        }
    }

    // Export für ITET
    window.ITETColorManager = ITETColorManager;
    window.StudiengangColorManager = ITETColorManager;
}