/* ==== ITET COLOR MANAGER (KISS VERSION) ==== */
/* Einfachste Lösung - funktioniert immer */

if (!window.ITETColorManager) {
    class ITETColorManager extends StudienplanBaseColorManager {
        constructor(studienplan) {
            super(studienplan);
            this.coloringMode = "kategorie";
        }

        // EINFACHSTE LÖSUNG: Nie die Controls löschen
        getModuleCssClass(modul) {
            if (this.coloringMode === "pruefungsblock") {
                // Suche Prüfungsblock
                if (this.studienplan.config.pruefungsbloecke) {
                    for (const block of this.studienplan.config.pruefungsbloecke) {
                        if (block.module && block.module.includes(modul.name)) {
                            return block.cssClass;
                        }
                    }
                }
                return "no-pruefungsblock";
            }
            
            // Standard-Verhalten
            return super.getModuleCssClass(modul);
        }

        // CONTROLS: Nur einmal erstellen
        addColoringModeControls() {
            setTimeout(() => this.createControlsOnce(), 200);
        }

        createControlsOnce() {
            const legendContainer = document.querySelector(".farben-legende");
            if (!legendContainer || legendContainer.querySelector('[data-itet-controls]')) return;

            const controls = document.createElement("div");
            controls.setAttribute('data-itet-controls', 'true');
            controls.style.cssText = "margin-bottom:15px;padding:8px;background:#f0f0f0;border-radius:4px;";
            controls.innerHTML = `
                <div style="font-weight:bold;margin-bottom:5px;">Färbung:</div>
                <label><input type="radio" name="itet-mode" value="kategorie" checked> Kategorien</label><br>
                <label><input type="radio" name="itet-mode" value="pruefungsblock"> Prüfungsblöcke</label>
            `;

            legendContainer.insertBefore(controls, legendContainer.firstChild);

            // Event Listener
            controls.addEventListener("change", (e) => {
                if (e.target.name === "itet-mode") {
                    this.setColoringMode(e.target.value);
                }
            });

            // CSS sofort laden
            this.addCSS();
        }

        // LEGEND: Nie Controls löschen
        updateLegend() {
            const legendElement = document.getElementById("legende");
            if (!legendElement) return;

            // Remove only previously added legend items but keep controls inserted by ITET
            const items = Array.from(legendElement.children).filter(el => !el.closest('[data-itet-controls]'));
            items.forEach(item => item.remove());

            if (this.coloringMode === "pruefungsblock") {
                // Build Prüfungsblock-only legend (no undefined entries)
                if (this.studienplan.config.pruefungsbloecke && Array.isArray(this.studienplan.config.pruefungsbloecke)) {
                    this.studienplan.config.pruefungsbloecke.forEach(block => {
                        const item = document.createElement("div");
                        item.className = "legende-item";
                        const color = block.color || '#E0E0E0';
                        const label = block.name || block.shortName || 'Unnamed Block';
                        item.innerHTML = `<div class="farb-box" style="background:${color}"></div><span>${label}</span>`;
                        legendElement.appendChild(item);
                    });
                }
            } else {
                // Standard-Legende
                this.studienplan.createLegend();
            }
        }

        // CSS: Einmal laden
        addCSS() {
            if (document.getElementById('itet-styles')) return;
            const style = document.createElement('style');
            style.id = 'itet-styles';
            style.textContent = `
                .modul.block-bpa { background:#FF6B6B !important; }
                .modul.block-bpb { background:#4ECDC4 !important; }
                .modul.block-p1 { background:#45B7D1 !important; }
                .modul.block-p2 { background:#96CEB4 !important; }
                .modul.block-p3 { background:#FFEAA7 !important; }
                .modul.no-pruefungsblock { background:#E0E0E0 !important; }
            `;
            document.head.appendChild(style);
        }

        // MODE SWITCHING: Einfach
        setColoringMode(mode) {
            this.coloringMode = mode;
            this.updateModuleColors();
            this.updateLegend();
        }
    }

    window.ITETColorManager = ITETColorManager;
    window.StudiengangColorManager = ITETColorManager;
}