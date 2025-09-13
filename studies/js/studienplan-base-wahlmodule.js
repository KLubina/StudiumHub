/* ==== STUDIENPLAN BASE WAHLMODULE SYSTEM ==== */
/* Zentrales System für Wahlmodule-Auswahl via Tooltip-Clicks */

class StudienplanWahlmoduleManager {
    constructor(studienplan) {
        this.studienplan = studienplan;
        this.config = studienplan.config;
        
        // Initialize wahlmodule data
        this.wahlmoduleData = this.getWahlmoduleData();
        // Normalize known wrapper objects (e.g. window.CSEModuleData)
        if (this.wahlmoduleData && typeof this.wahlmoduleData.getAllWahlmoduleData === 'function') {
            try {
                this.wahlmoduleData = this.wahlmoduleData.getAllWahlmoduleData();
                console.log('ℹ️ wahlmoduleData normalized from wrapper via getAllWahlmoduleData()');
            } catch (e) {
                console.warn('⚠️ Failed to normalize wahlmoduleData:', e);
            }
        }
        this.selectedModules = this.loadSelectedModules();
        
        // Setup global reference for tooltip buttons
        window.currentStudienplan = studienplan;
    }

    /* ==== DATA ACCESS ==== */
    getWahlmoduleData() {
        // Merge multiple possible sources for wahlmodule data.
        // Priority: explicit config.wahlmoduleData > window.CSEModuleData (wrapper) > others
        const result = {};

        try {
            // Start with config-provided data (if any)
            if (this.config && this.config.wahlmoduleData && typeof this.config.wahlmoduleData === 'object') {
                Object.assign(result, this.config.wahlmoduleData);
            }

            // If a global wrapper exists (like window.CSEModuleData) prefer its normalized form for missing keys
            const wrappers = [window.CSEModuleData, window.ITETModuleData, window.RIGModuleData];
            for (const w of wrappers) {
                if (!w) continue;
                if (typeof w.getAllWahlmoduleData === 'function') {
                    try {
                        const data = w.getAllWahlmoduleData();
                        // Copy missing keys only
                        for (const k of Object.keys(data || {})) {
                            if (result[k] === undefined) result[k] = data[k];
                        }
                    } catch (e) {
                        console.warn('Fehler beim Lesen von wrapper wahlmoduleData', e);
                    }
                } else if (typeof w === 'object') {
                    for (const k of Object.keys(w)) {
                        if (result[k] === undefined) result[k] = w[k];
                    }
                }
            }
        } catch (e) {
            console.error('Fehler beim Zusammenführen der wahlmoduleData:', e);
        }

        // Ensure commonly expected keys exist to avoid undefined access
        if (!result.kernfaecherSchwerpunkte && result.kernfaecher) result.kernfaecherSchwerpunkte = result.kernfaecher;
        if (!result.kernfaecherSchwerpunkte) result.kernfaecherSchwerpunkte = {};

        return result;
    }

    /* ==== TOOLTIP INTEGRATION ==== */
    addLegendTooltipEvents(div, kategorie) {
        if (!kategorie || !kategorie.hasTooltip) return;
        
        // Mark as interactive
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

        // Keyboard accessibility
        div.tabIndex = 0;
        div.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openTooltip(e);
            }
        });
    }

    /* ==== TOOLTIP CREATION ==== */
    showWahlmoduleTooltip(kategorie, event) {
        const categoryKey = this.getCategoryKey(kategorie.name);
        const content = this.createWahlmoduleTooltipContent(categoryKey, kategorie);
        
        this.studienplan.showCustomTooltip(content, event);

        // After tooltip HTML inserted, attach event listeners to the buttons (no inline onclicks)
        setTimeout(() => {
            try {
                const tooltipEl = this.studienplan.tooltipEl || document.getElementById('tooltip');
                if (!tooltipEl) return;
                const buttons = tooltipEl.querySelectorAll('.wahlmodule-toggle');
                buttons.forEach(btn => {
                    // avoid attaching multiple listeners
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
        
        // Setup outside click handler
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
    }

    createWahlmoduleTooltipContent(categoryKey, kategorie) {
        const moduleGroups = this.getModuleGroupsForCategory(categoryKey);
        
        let content = `
            <div class="wahlmodule-liste">
                <h3>🎯 ${kategorie.name}</h3>
                <p style="font-size: 11px; color: #666; margin-bottom: 15px;">
                    💡 <strong>Klicke auf Module um sie auszuwählen!</strong><br>
                    📊 Gewählte Module werden dynamisch im Studienplan angezeigt.
                </p>
                <div style="max-height: 400px; overflow-y: auto;">
        `;

        Object.entries(moduleGroups).forEach(([groupName, modules]) => {
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

                // Render button without inline onclick; attach handler after tooltip insertion
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

        content += `
                </div>
                <div style="margin-top: 15px; padding: 10px; background-color: #e7f3ff; border-radius: 5px; border: 1px solid #b3d7ff;">
                    <strong>💡 Hinweis:</strong> Nach der Auswahl klicke auf "🔄 Neu laden" um die Module im Studienplan zu sehen!
                </div>
            </div>
        `;
        
        return content;
    }

    /* ==== MODULE SELECTION LOGIC ==== */
    toggleModulFromTooltip(modulName, categoryKey) {
        const moduleGroups = this.getModuleGroupsForCategory(categoryKey);
        const allModules = Object.values(moduleGroups).flat();
        const modul = allModules.find(m => m.name === modulName);
        
        if (modul) {
            this.toggleModulSelection(modul, categoryKey);
            this.updateStudienplanWithSelection();

            // Reload tooltip after short delay
            setTimeout(() => {
                const kategorie = this.getCategoryFromKey(categoryKey);
                const event = { clientX: 100, clientY: 100 };
                this.showWahlmoduleTooltip(kategorie, event);
            }, 100);
        }
    }

    toggleModulSelection(modul, categoryKey) {
        if (this.isModulSelected(modul.name, categoryKey)) {
            this.removeModulSelection(modul, categoryKey);
        } else {
            this.addModulSelection(modul, categoryKey);
        }
    }

    addModulSelection(modul, categoryKey) {
        if (!this.selectedModules[categoryKey]) {
            this.selectedModules[categoryKey] = [];
        }
        
        this.selectedModules[categoryKey].push({ ...modul, categoryKey });
        this.saveSelectedModules();
        
        // Update KP display if available
        if (this.studienplan.updateKPDisplayWithCategories) {
            this.studienplan.updateKPDisplayWithCategories();
        } else if (this.studienplan.updateKPDisplay) {
            this.studienplan.updateKPDisplay();
        }
        
        this.showMessage(`✅ "${modul.name}" hinzugefügt`, "success");
    }

    removeModulSelection(modul, categoryKey) {
        if (this.selectedModules[categoryKey]) {
            this.selectedModules[categoryKey] = this.selectedModules[categoryKey].filter(
                m => m.name !== modul.name
            );
        }
        
        this.saveSelectedModules();
        
        // Update KP display if available
        if (this.studienplan.updateKPDisplayWithCategories) {
            this.studienplan.updateKPDisplayWithCategories();
        } else if (this.studienplan.updateKPDisplay) {
            this.studienplan.updateKPDisplay();
        }
        
        this.showMessage(`🗑️ "${modul.name}" entfernt`, "info");
    }

    isModulSelected(modulName, categoryKey) {
        return (this.selectedModules[categoryKey] || []).some(m => m.name === modulName);
    }

    /* ==== STUDIENPLAN INTEGRATION ==== */
    updateStudienplanWithSelection() {
        // Remove old dynamic modules
        this.config.daten = this.config.daten.filter(m => !m.isDynamic);
        
        // Add all selected modules
        const allSelectedModules = Object.values(this.selectedModules).flat();
        
        allSelectedModules.forEach(modul => {
            const moduleCopy = {
                ...modul,
                jahr: 3, // Default to 3rd year
                semester: 0,
                isDynamic: true
            };
            this.config.daten.push(moduleCopy);
        });
        
        // Rebuild studienplan
        this.studienplan.createStudienplan();
        
        // Update KP display
        if (this.studienplan.updateKPDisplayWithCategories) {
            this.studienplan.updateKPDisplayWithCategories();
        } else if (this.studienplan.updateKPDisplay) {
            this.studienplan.updateKPDisplay();
        }
    }

    /* ==== STORAGE ==== */
    loadSelectedModules() {
        try {
            const storageKey = `${this.getStudiengangKey()}-selected-wahlmodule`;
            const saved = localStorage.getItem(storageKey);
            return saved ? JSON.parse(saved) : {};
        } catch (error) {
            console.error('Fehler beim Laden der Wahlmodule:', error);
            return {};
        }
    }

    saveSelectedModules() {
        try {
            const storageKey = `${this.getStudiengangKey()}-selected-wahlmodule`;
            localStorage.setItem(storageKey, JSON.stringify(this.selectedModules));
        } catch (error) {
            console.error('Fehler beim Speichern der Wahlmodule:', error);
        }
    }

    /* ==== UTILITY METHODS ==== */
    getCategoryKey(categoryName) {
        const keyMappings = {
            'Kernfächer nach Schwerpunkt': 'kernfaecher',
            'Weitere Wahl-Grundlagenfächer': 'weitere-wahl-grundlagen',
            'Wahlfächer': 'wahlfaecher',
            'Wahlfächer (Semester)': 'wahlfaecher',
            'Wahl Praktika-Projekte-Seminare': 'praktika',
            'Wahlmodule (3 aus 6)': 'wahlmodule',
            'Wahlmodule': 'wahlmodule'
        };
        // Accept common German variants used by specific configs (e.g. CSE)
        if (categoryName === 'Vertiefungsgebiet' || categoryName === 'Vertiefungsgebiete') return 'vertiefungsgebiete';
        if (categoryName === 'Wahlfächer (Bereiche)' || categoryName === 'Wahlfächer - Bereiche') return 'wahlfaecher';

        // Handle plain "Kernfächer" and variants (normalize umlaut)
        if (!categoryName) return '';
        const normalized = categoryName.trim().toLowerCase();
        if (normalized === 'kernfächer' || normalized.indexOf('kern') === 0) return 'kernfaecher';

        return keyMappings[categoryName] || categoryName.toLowerCase().replace(/\s+/g, '-');
    }

    getCategoryFromKey(categoryKey) {
        const keyMappings = {
            'kernfaecher': { name: 'Kernfächer nach Schwerpunkt' },
            'weitere-wahl-grundlagen': { name: 'Weitere Wahl-Grundlagenfächer' },
            'wahlfaecher': { name: 'Wahlfächer' },
            'praktika': { name: 'Wahl Praktika-Projekte-Seminare' },
            'wahlmodule': { name: 'Wahlmodule' }
        };
        
        return keyMappings[categoryKey] || { name: categoryKey };
    }

    getModuleGroupsForCategory(categoryKey) {
        const dataMap = {
            'kernfaecher': this.wahlmoduleData.kernfaecherSchwerpunkte,
            'weitere-wahl-grundlagen': { 'Grundlagenfächer': this.wahlmoduleData.weitereWahlGrundlagen },
            // Accept both the normalized key and some config-specific keys
            'wahlfaecher': this.wahlmoduleData.wahlfaecherBereiche,
            'wahlfaecherBereiche': this.wahlmoduleData.wahlfaecherBereiche,
            'wahlfaecher-bereiche': this.wahlmoduleData.wahlfaecherBereiche,
            // Vertiefungsgebiete (CSE uses this key)
            'vertiefungsgebiete': this.wahlmoduleData.vertiefungsgebiete,
            'praktika': this.wahlmoduleData.praktikaSchwerpunkte,
            'wahlmodule': this.wahlmoduleData.wahlmoduleBereiche
        };
        
        return dataMap[categoryKey] || {};
    }

    getGroupColor(categoryKey, groupName) {
        const colorMap = {
            'kernfaecher': '#DD98DD',
            'weitere-wahl-grundlagen': '#FFD700',
            'wahlfaecher': '#F2B48F',
            'praktika': '#4CA64C',
            'wahlmodule': '#FF6B6B'
        };
        // special color for vertiefungsgebiete
        if (categoryKey === 'vertiefungsgebiete' || categoryKey === 'vertiefungsgebiete') return '#A4C8FF';
        
        return colorMap[categoryKey] || '#6c757d';
    }

    getTextColor(backgroundColor) {
        // Simple logic for text color based on background
        const darkColors = ['#4CA64C', '#FF6B6B', '#DD98DD'];
        return darkColors.includes(backgroundColor) ? 'white' : 'black';
    }

    getStudiengangKey() {
        return document.body.getAttribute('data-studiengang') || 'default';
    }

    showMessage(message, type = "info") {
        // Use existing message system if available
        if (this.studienplan.showMessage) {
            this.studienplan.showMessage(message, type);
        } else {
            // Simple fallback
            console.log(`${type}: ${message}`);
        }
    }

    /* ==== REFRESH FUNCTIONALITY ==== */
    refreshStudienplan() {
        this.showMessage("🔄 Lade Studienplan neu...", "info");
        this.updateStudienplanWithSelection();
        this.showMessage("✅ Studienplan aktualisiert!", "success");
    }

    resetWahlmodule() {
        if (confirm('🔄 Wirklich alle Wahlmodule zurücksetzen?')) {
            this.selectedModules = {};
            this.saveSelectedModules();
            this.updateStudienplanWithSelection();
            this.showMessage('✅ Alle Wahlmodule zurückgesetzt!', 'success');
        }
    }
}

/* ==== STUDIENPLAN BASE INTEGRATION ==== */
StudienplanBase.prototype.initializeWahlmoduleSystem = function() {
    if (!this.config.enableWahlmodule) return;
    
    this.wahlmoduleManager = new StudienplanWahlmoduleManager(this);
    // Re-attach legend tooltip events now that the manager exists.
    try {
        const legendContainer = document.querySelector('.farben-legende');
        if (legendContainer && Array.isArray(this.config.kategorien)) {
            this.config.kategorien.forEach(kategorie => {
                if (!kategorie || !kategorie.hasTooltip) return;

                // Prefer selecting by provided klasse, fallback to text match
                let div = null;
                if (kategorie.klasse) {
                    div = legendContainer.querySelector(`.${kategorie.klasse}`);
                }
                if (!div) {
                    const items = Array.from(legendContainer.querySelectorAll('.legende-item'));
                    div = items.find(el => el.textContent && el.textContent.indexOf(kategorie.name) !== -1);
                }

                if (div && !div.classList.contains('tooltip-enabled')) {
                    this.addLegendTooltipEvents(div, kategorie);
                }
            });
        }
    } catch (err) {
        console.error('Fehler beim Anhängen der Legenden-Tooltip-Events:', err);
    }

    this.addWahlmoduleControls();
    
    // Auto-load previously selected modules
    this.wahlmoduleManager.updateStudienplanWithSelection();
};

StudienplanBase.prototype.addWahlmoduleControls = function() {
    const legendContainer = document.querySelector(".farben-legende");
    if (!legendContainer || document.getElementById("wahlmodule-controls")) return;
    // Intentionally do not inject any Wahlmodule controls UI here.
    // Wahlmodule are selected via legend tooltips; controls (refresh/reset) are intentionally omitted.
};

// Override addLegendTooltipEvents in base class
StudienplanBase.prototype.addLegendTooltipEvents = function(div, kategorie) {
    if (this.wahlmoduleManager && kategorie && kategorie.hasTooltip) {
        this.wahlmoduleManager.addLegendTooltipEvents(div, kategorie);
    }
};

// Add to initialization
const originalInitialize = StudienplanBase.prototype.initialize;
StudienplanBase.prototype.initialize = function() {
    originalInitialize.call(this);
    this.initializeWahlmoduleSystem();
};