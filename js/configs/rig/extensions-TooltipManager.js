/* ==== RIG TOOLTIP MANAGER ==== */
/* Verwaltet das Tooltip-System für Wahlmodule */

window.RIGTooltipManager = {
    init(studienplan) {
        this.studienplan = studienplan;
        this.isWahlmoduleTooltipLocked = false;
    },

    showWahlmoduleTooltip(event) {
        const content = this.createDraggableWahlmoduleTooltip();
        this.studienplan.showCustomTooltip(content, event);
    },

    createDraggableWahlmoduleTooltip() {
        let content = `
            <div class="wahlmodule-liste">
                <h3>🎯 Wahlmodule-Bereiche per Drag & Drop</h3>
                <p style="font-size: 11px; color: #666; margin-bottom: 15px;">
                    💡 <strong>Ziehe Module direkt in deine Wahlmodule-Boxen im Studienplan!</strong>
                </p>
        `;

        Object.entries(this.studienplan.wahlmoduleManager.wahlmoduleBereiche).forEach(([bereich, module]) => {
            content += `
                <div class="wahlbereich-section" style="margin-bottom: 15px;">
                    <h4 style="margin: 10px 0 8px 0; padding: 3px 8px; background-color: #FF6B6B; color: white; border-radius: 4px; font-size: 12px;">
                        ${bereich}
                    </h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 4px;">
            `;

            module.forEach(modul => {
                const isSelected = this.studienplan.wahlmoduleManager.isWahlmodulSelected(modul.name);
                const opacity = isSelected ? '0.5' : '1';
                const cursor = isSelected ? 'not-allowed' : 'grab';
                const title = isSelected ? 'Bereits ausgewählt' : 'Ziehe mich in eine Wahlmodule-Box';

                content += `
                    <div class="draggable-wahlmodul" 
                         draggable="${!isSelected}" 
                         data-modul='${JSON.stringify(modul)}'
                         style="
                            padding: 4px 8px; 
                            background: linear-gradient(135deg, #FF6B6B, #FF8E8E);
                            color: white; 
                            border-radius: 12px; 
                            font-size: 9px; 
                            cursor: ${cursor};
                            opacity: ${opacity};
                            margin: 2px;
                            border: 1px solid rgba(255,255,255,0.3);
                            transition: transform 0.2s ease;
                            user-select: none;
                         "
                         title="${title}">
                        <div style="font-weight: bold;">${modul.kp} KP</div>
                        <div style="font-size: 8px; line-height: 1;">${modul.name}</div>
                    </div>
                `;
            });

            content += `
                    </div>
                </div>
            `;
        });

        content += `</div>`;

        setTimeout(() => {
            this.studienplan.dragDrop.addDragEventsToTooltipModules();
        }, 10);

        return content;
    },

    addLegendTooltipEvents(div, kategorie) {
        if (kategorie.klasse === "wahlmodule") {
            div.addEventListener("mouseenter", (event) => {
                this.showWahlmoduleTooltip(event);
            });

            div.addEventListener("mouseleave", () => {
                if (!this.isWahlmoduleTooltipLocked) {
                    this.studienplan.hideTooltip();
                }
            });

            div.addEventListener("click", (event) => {
                this.isWahlmoduleTooltipLocked = !this.isWahlmoduleTooltipLocked;
                if (this.isWahlmoduleTooltipLocked) {
                    this.showWahlmoduleTooltip(event);
                } else {
                    this.studienplan.hideTooltip();
                }
            });
        }
    },

    hideTooltip() {
        if (this.studienplan.tooltipEl) {
            this.studienplan.tooltipEl.style.display = 'none';
        }
        this.studienplan.aktivesModul = null;
        this.isWahlmoduleTooltipLocked = false;
    }
};