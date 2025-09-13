/* ==== ITET COLOR MANAGER (BASIC) ==== */
/* Einfache ColorManager-Extension für ITET */

// Verhindere doppeltes Laden
if (!window.ITETColorManager) {
    class ITETColorManager extends StudienplanBaseColorManager {
        constructor(studienplan) {
            super(studienplan);
            this.coloringMode = "kategorie"; // ITET Standard: Nach Kategorie färben
        }

        /* ==== UI CONTROLS ==== */
        addColoringModeControls() {
            const legendContainer = document.querySelector(".farben-legende");
            if (!legendContainer) return;

            // Verhindere doppelte Controls
            const existingControls = legendContainer.querySelector('[data-itet-coloring-controls]');
            if (existingControls) return;

            const coloringControls = document.createElement("div");
            coloringControls.setAttribute('data-itet-coloring-controls', 'true');
            coloringControls.style.marginBottom = "20px";
            coloringControls.style.padding = "10px";
            coloringControls.style.backgroundColor = "#f0f0f0";
            coloringControls.style.borderRadius = "5px";
            coloringControls.innerHTML = `
                <div style="font-weight: bold; margin-bottom: 8px;">Färbung nach:</div>
                <div>
                    <label style="display: block;">
                        <input type="radio" name="itet-coloring-mode" value="kategorie" checked> 
                        Kategorien
                    </label>
                </div>
            `;

            // Insert at top of legend
            legendContainer.insertBefore(coloringControls, legendContainer.firstChild);

            // Event listeners
            const radioButtons = coloringControls.querySelectorAll('input[name="itet-coloring-mode"]');
            radioButtons.forEach((radio) => {
                radio.addEventListener("change", (e) => {
                    this.setColoringMode(e.target.value);
                });
            });
        }
    }

    // Export für ITET
    window.ITETColorManager = ITETColorManager;
    window.StudiengangColorManager = ITETColorManager;
}