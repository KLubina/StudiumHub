/* ==== CSE COLOR MANAGER (VEREINFACHT) ==== */
/* CSE-spezifische Erweiterung des Base ColorManagers */

// Verhindere doppeltes Laden
if (!window.CSEColorManager) {
    class CSEColorManager extends StudienplanBaseColorManager {
        constructor(studienplan) {
            super(studienplan);
            this.coloringMode = "pruefungsblock"; // CSE Standard
        }

        /* ==== CSE-SPEZIFISCHE COLORING MODI ==== */
        getModuleCssClass(modul) {
            if (this.coloringMode === "themenbereich") {
                return this.getThemenbereichClass(modul);
            }
            
            // Standard: Prüfungsblock oder Kategorie
            return super.getModuleCssClass(modul);
        }

    getThemenbereichClass(modul) {
        let result = modul.themenbereich;
        
        // Fallbacks basierend auf Modulnamen
        if (!result) {
            const name = modul.name.toLowerCase();
            if (name.includes('physik') || name.includes('fluid')) {
                result = "physik";
            } else if (name.includes('informatik') || name.includes('programm') || name.includes('computer')) {
                result = "informatik";
            } else if (name.includes('mathematik') || name.includes('analysis') || name.includes('algebra') || name.includes('numerical')) {
                result = "mathematik";
            } else if (name.includes('chemie')) {
                result = "chemie";
            } else {
                result = "sonstiges";
            }
        }
        
        return result;
    }

    /* ==== LEGEND UPDATES ==== */
    updateLegend() {
        const legendElement = document.getElementById("legende");
        if (!legendElement) return;
        
        legendElement.innerHTML = "";

        if (this.coloringMode === "themenbereich") {
            this.createThemenbereichLegend(legendElement);
        } else {
            // Standard-Legende
            if (this.studienplan.config.pruefungsbloecke) {
                this.studienplan.createPruefungsbloeckeLegend(legendElement);
            }
            if (this.studienplan.config.kategorien) {
                this.studienplan.config.kategorien.forEach((kategorie) => {
                    this.studienplan.createLegendItem(kategorie, legendElement);
                });
            }
        }
    }

    createThemenbereichLegend(container) {
        const themenbereiche = [
            { name: "Physik", klasse: "physik" },
            { name: "Informatik", klasse: "informatik" },
            { name: "Mathematik", klasse: "mathematik" },
            { name: "Chemie", klasse: "chemie" },
            { name: "Sonstiges", klasse: "sonstiges" },
        ];

        themenbereiche.forEach((thema) => {
            const div = document.createElement("div");
            div.classList.add("legende-item");
            div.classList.add(thema.klasse);
            div.textContent = thema.name;
            container.appendChild(div);
        });
    }

    /* ==== UI CONTROLS ==== */
    addColoringModeControls() {
        const legendContainer = document.querySelector(".farben-legende");
        if (!legendContainer) return;

        // Verhindere doppelte Controls
        const existingControls = legendContainer.querySelector('[data-cse-coloring-controls]');
        if (existingControls) return;

        const coloringControls = document.createElement("div");
        coloringControls.setAttribute('data-cse-coloring-controls', 'true');
        coloringControls.style.marginBottom = "20px";
        coloringControls.style.padding = "10px";
        coloringControls.style.backgroundColor = "#f0f0f0";
        coloringControls.style.borderRadius = "5px";
        coloringControls.innerHTML = `
            <div style="font-weight: bold; margin-bottom: 8px;">Färbung nach:</div>
            <div>
                <label style="display: block; margin-bottom: 5px;">
                    <input type="radio" name="coloring-mode" value="pruefungsblock" checked> 
                    Prüfungsblöcken
                </label>
                <label style="display: block;">
                    <input type="radio" name="coloring-mode" value="themenbereich"> 
                    Themenbereichen
                </label>
            </div>
        `;

        // Insert at top of legend
        legendContainer.insertBefore(coloringControls, legendContainer.firstChild);

        // Event listeners
        const radioButtons = coloringControls.querySelectorAll('input[name="coloring-mode"]');
        radioButtons.forEach((radio) => {
            radio.addEventListener("change", (e) => {
                this.setColoringMode(e.target.value);
            });
        });
    }
}

// Export für CSE
window.CSEColorManager = CSEColorManager;
window.StudiengangColorManager = CSEColorManager;
}