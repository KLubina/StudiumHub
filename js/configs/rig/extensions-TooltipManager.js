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
        // Attach hover handlers so tooltip doesn't immediately close when cursor moves into it
        this._attachTooltipHoverHandlers();

        // Ensure draggable handlers are attached; prefer central dragDrop manager, fallback to local
        setTimeout(() => {
            if (this.studienplan && this.studienplan.dragDrop && typeof this.studienplan.dragDrop.addDragEventsToTooltipModules === 'function') {
                this.studienplan.dragDrop.addDragEventsToTooltipModules();
            } else {
                this._addLocalDragEventsToTooltipModules();
            }
        }, 10);
    },

    createDraggableWahlmoduleTooltip() {
        let content = `
            <div class="wahlmodule-liste">
                <h3>🎯 Wahlmodule-Bereiche per Drag & Drop</h3>
                <p style="font-size: 11px; color: #666; margin-bottom: 15px;">
                    💡 <strong>Ziehe Module direkt in deine Wahlmodule-Boxen im Studienplan!</strong>
                </p>
        `;

    const bereiche = (this.studienplan && this.studienplan.wahlmoduleManager && this.studienplan.wahlmoduleManager.wahlmoduleBereiche) || {};
    Object.entries(bereiche).forEach(([bereich, module]) => {
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
            if (this.studienplan && this.studienplan.dragDrop && typeof this.studienplan.dragDrop.addDragEventsToTooltipModules === 'function') {
                this.studienplan.dragDrop.addDragEventsToTooltipModules();
            }
        }, 10);

        return content;
    },

    addLegendTooltipEvents(div, kategorie) {
        if (kategorie.klasse === "wahlmodule") {
            div.addEventListener("mouseenter", (event) => {
                this.showWahlmoduleTooltip(event);
            });

            div.addEventListener("mouseleave", (event) => {
                // Wenn der Mauswechsel in das Tooltip-Element geht, nicht sofort schließen
                const related = event.relatedTarget || event.toElement;
                const tooltipEl = this.studienplan.tooltipEl || document.getElementById('tooltip');
                if (tooltipEl && related && (tooltipEl === related || tooltipEl.contains(related))) {
                    // Cursor bewegt sich in das Tooltip — offen lassen
                    return;
                }

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

    // Damit Tooltip nicht verschwindet, wenn man von der Legende ins Tooltip hovert,
    // registrieren wir beim Anzeigen noch Hover-Listener am Tooltip-Element.
    _attachTooltipHoverHandlers() {
        const tooltipEl = this.studienplan.tooltipEl || document.getElementById('tooltip');
        if (!tooltipEl || tooltipEl._rigTooltipHandlersAttached) return;

        tooltipEl.addEventListener('mouseenter', () => {
            // Verhindere verstecken während Hover
            this._tooltipHovered = true;
        });

        tooltipEl.addEventListener('mouseleave', (event) => {
            this._tooltipHovered = false;
            // Falls Tooltip nicht gelocked ist und Maus weder in Legende noch im Tooltip ist, verstecken
            const related = event.relatedTarget || event.toElement;
            const legendEl = document.querySelector('.farben-legende');
            if (!this.isWahlmoduleTooltipLocked) {
                if (related && legendEl && (legendEl.contains(related) || tooltipEl.contains(related))) {
                    return;
                }
                this.studienplan.hideTooltip();
            }
        });

        tooltipEl._rigTooltipHandlersAttached = true;
    },

    _addLocalDragEventsToTooltipModules() {
        const tooltipEl = this.studienplan.tooltipEl || document.getElementById('tooltip');
        if (!tooltipEl) return;

        const draggableModules = tooltipEl.querySelectorAll('.draggable-wahlmodul[draggable="true"]');
        draggableModules.forEach(modulEl => {
            if (modulEl._rigLocalDragAttached) return;

            modulEl.addEventListener('dragstart', (e) => {
                try {
                    const modulData = JSON.parse(modulEl.dataset.modul);
                    e.dataTransfer.setData('text/plain', JSON.stringify(modulData));
                } catch (err) {
                    // ignore malformed data
                }
                modulEl.style.transform = 'scale(0.8)';
                modulEl.style.opacity = '0.5';
            });

            modulEl.addEventListener('dragend', (e) => {
                modulEl.style.transform = '';
                modulEl.style.opacity = '';
            });

            modulEl.addEventListener('mouseenter', () => {
                if (modulEl.draggable) modulEl.style.transform = 'scale(1.05)';
            });

            modulEl.addEventListener('mouseleave', () => {
                if (modulEl.draggable) modulEl.style.transform = '';
            });

            modulEl._rigLocalDragAttached = true;
        });
    },

    hideTooltip() {
        if (this.studienplan.tooltipEl) {
            this.studienplan.tooltipEl.style.display = 'none';
        }
        this.studienplan.aktivesModul = null;
        this.isWahlmoduleTooltipLocked = false;
    }
};