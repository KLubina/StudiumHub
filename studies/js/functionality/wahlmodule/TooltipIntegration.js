/* Wahlmodule - Tooltip Integration */

StudienplanWahlmoduleManager.prototype.addLegendTooltipEvents = function(div, kategorie) {
    if (!kategorie || !kategorie.hasTooltip) return;

    div.classList.add("tooltip-enabled");
    div.style.cursor = "pointer";
    div.title = "Klicken zum Module auswählen";

    const openTooltip = (e) => {
        if (!e.clientX || !e.clientY) {
            const rect = div.getBoundingClientRect();
            e.clientX = rect.left + rect.width / 2;
            e.clientY = rect.top + rect.height / 2;
        }

        this.showWahlmoduleTooltip(kategorie, e);
    };

    div.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        openTooltip(e);
    });

    div.tabIndex = 0;
    div.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openTooltip(e);
        }
    });
};

StudienplanWahlmoduleManager.prototype.showWahlmoduleTooltip = function(kategorie, event) {
    const categoryKey = this.getCategoryKey(kategorie.name);
    const content = this.createWahlmoduleTooltipContent(categoryKey, kategorie);

    this.studienplan.showCustomTooltip(content, event);

    setTimeout(() => {
        try {
            const tooltipEl = this.studienplan.tooltipEl || document.getElementById('tooltip');
            if (!tooltipEl) return;
            const buttons = tooltipEl.querySelectorAll('.wahlmodule-toggle');
            buttons.forEach(btn => {
                if (btn.__wahlAttached) return;
                btn.__wahlAttached = true;
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const modulName = btn.getAttribute('data-modul-name');
                    const catKey = btn.getAttribute('data-category') || categoryKey;
                    this.toggleModulFromTooltip(modulName, catKey);
                });
            });
        } catch (e) {
            console.warn('Fehler beim Anhängen der Wahlmodule-Button-Handler', e);
        }
    }, 20);

    if (!this._outsideClickHandler) {
        this._outsideClickHandler = (e) => {
            if (!this.studienplan.tooltipEl) {
                document.removeEventListener('click', this._outsideClickHandler, true);
                this._outsideClickHandler = null;
                return;
            }
            const insideTooltip = this.studienplan.tooltipEl.contains(e.target);
            const insideLegendInteractive = !!e.target.closest('.farben-legende .tooltip-enabled');
            if (!insideTooltip && !insideLegendInteractive) {
                this.studienplan.hideTooltip();
            }
        };
        document.addEventListener('click', this._outsideClickHandler, true);
    }
};

StudienplanWahlmoduleManager.prototype.createWahlmoduleTooltipContent = function(categoryKey, kategorie) {
    const moduleGroups = this.getModuleGroupsForCategory(categoryKey);

    console.log('🔍 Debug - categoryKey:', categoryKey);
    console.log('🔍 Debug - moduleGroups:', moduleGroups);
    console.log('🔍 Debug - wahlmoduleData:', this.wahlmoduleData);

    let content = `
        <div class="wahlmodule-liste">
            <h3>🎯 ${kategorie.name}</h3>
            <p style="font-size: 11px; color: #666; margin-bottom: 15px;">
                💡 <strong>Klicke auf Module um sie auszuwählen!</strong><br>
                📊 Gewählte Module werden dynamisch im Studienplan angezeigt.
            </p>
            <div style="max-height: 400px; overflow-y: auto;">
    `;

    if (!moduleGroups || Object.keys(moduleGroups).length === 0) {
        content += `
            <div style="padding: 20px; text-align: center; color: #666;">
                <p>⚠️ Keine Module für diese Kategorie gefunden.</p>
                <p><small>Kategorie-Key: ${categoryKey}</small></p>
                <p><small>Verfügbare Daten: ${Object.keys(this.wahlmoduleData || {}).join(', ')}</small></p>
            </div>
        `;
    } else {
        Object.entries(moduleGroups).forEach(([groupName, modules]) => {
            if (!modules || !Array.isArray(modules)) return;

            const groupColor = this.getGroupColor(categoryKey, groupName);

            content += `
                <div style="margin-bottom: 15px;">
                    <h4 style="margin: 10px 0 8px 0; padding: 3px 8px; background-color: ${groupColor}; color: ${this.getTextColor(groupColor)}; border-radius: 4px; font-size: 12px;">
                        ${groupName} (${modules.length} Module)
                    </h4>
                    <div style="display: grid; grid-template-columns: 1fr; gap: 2px;">
            `;

            modules.forEach((modul) => {
                const isSelected = this.isModulSelected(modul.name, categoryKey);
                const bgColor = isSelected ? "#d4edda" : "#f8f9fa";
                const textColor = isSelected ? "#155724" : "#333";
                const buttonText = isSelected ? "✓ Gewählt" : "Wählen";
                const buttonColor = isSelected ? "#28a745" : groupColor;

                const safeName = modul.name.replace(/'/g, "&#39;");
                content += `
                    <div style="padding: 6px; background: ${bgColor}; color: ${textColor}; border-radius: 4px; margin: 2px; border: 1px solid #ddd; display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <div style="font-weight: bold; font-size: 10px;">${modul.kp} KP</div>
                            <div style="font-size: 9px; line-height: 1.2;">${modul.name}</div>
                        </div>
                        <button class="wahlmodule-toggle" data-modul-name="${safeName}" data-category="${categoryKey}"
                                style="background: ${buttonColor}; color: ${this.getTextColor(buttonColor)}; border: none; padding: 3px 6px; border-radius: 3px; cursor: pointer; font-size: 8px;">
                            ${buttonText}
                        </button>
                    </div>
                `;
            });

            content += `</div></div>`;
        });
    }

    content += `
            </div>
            <div style="margin-top: 15px; padding: 10px; background-color: #e7f3ff; border-radius: 5px; border: 1px solid #b3d7ff;">
                <strong>💡 Hinweis:</strong> Nach der Auswahl klicke auf "🔄 Neu laden" um die Module im Studienplan zu sehen!
            </div>
        </div>
    `;

    return content;
};
