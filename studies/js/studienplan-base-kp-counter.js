/* ==== STUDIENPLAN BASE KP-COUNTER ==== */
/* Zentrales KP-Counter System für alle Studiengänge */

class StudienplanKPCounter {
    constructor(config) {
        this.config = config;
        this.requiredKP = config.requiredKP || 180;
        this.creditUnit = config.creditUnit || 'KP';
        this.counterConfig = config.kpCounterConfig || {};
    }

    /* ==== KP-COUNTER HTML ERSTELLEN ==== */
    createKPCounter() {
        const kpCounterContainer = document.createElement("div");
        kpCounterContainer.id = "kp-counter";
        kpCounterContainer.style.marginBottom = "20px";
        kpCounterContainer.style.padding = "15px";
        kpCounterContainer.style.backgroundColor = "#f8f9fa";
        kpCounterContainer.style.borderRadius = "8px";
        kpCounterContainer.style.border = "2px solid var(--primary-color, #0D5B8C)";
        kpCounterContainer.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";

        const primaryColor = this.getPrimaryColor();
        const gradientColor = this.getGradientColor();

        kpCounterContainer.innerHTML = `
            <div style="text-align: center; margin-bottom: 15px;">
                <h3 style="margin: 0 0 5px 0; color: ${primaryColor}; font-size: 18px;">📊 ${this.creditUnit}-Übersicht</h3>
            </div>
            
            <div id="kp-total" style="text-align: center; margin-bottom: 15px; padding: 10px; background: linear-gradient(135deg, ${primaryColor}, ${gradientColor}); color: white; border-radius: 5px; font-weight: bold;">
                <div style="font-size: 24px; margin-bottom: 5px;">
                    <span id="total-kp">0</span> ${this.creditUnit}
                </div>
                <div style="font-size: 12px; opacity: 0.9;">
                    von mindestens ${this.requiredKP} ${this.creditUnit} erforderlich
                </div>
                <div id="kp-status" style="margin-top: 5px; font-size: 11px;">
                    <div id="kp-progress-bar" style="width: 100%; height: 4px; background-color: rgba(255,255,255,0.3); border-radius: 2px; margin-top: 5px;">
                        <div id="kp-progress-fill" style="height: 100%; background-color: white; border-radius: 2px; transition: width 0.5s ease; width: 0%;"></div>
                    </div>
                </div>
            </div>
            
            <div id="kp-breakdown" style="font-size: 11px; line-height: 1.4;">
                <!-- Aufschlüsselung wird hier eingefügt -->
            </div>
            
            <!-- detailed breakdown rendered directly when enabled -->
        `;

        return kpCounterContainer;
    }

    /* ==== FARBEN ERMITTELN ==== */
    getPrimaryColor() {
        const style = getComputedStyle(document.documentElement);
        return style.getPropertyValue('--primary-color') || '#0D5B8C';
    }

    getGradientColor() {
        const style = getComputedStyle(document.documentElement);
        return style.getPropertyValue('--secondary-color') || '#00A0E3';
    }

    /* ==== DETAILLIERTE AUFSCHLÜSSELUNG TOGGLE ==== */
    createDetailedBreakdownToggle() {
        return `
            <div style="text-align: center; margin-top: 10px;">
                <button id="toggle-breakdown" style="background: none; border: 1px solid #ddd; border-radius: 4px; padding: 5px 10px; cursor: pointer; font-size: 11px;">
                    📊 Details anzeigen
                </button>
            </div>
        `;
    }

    // The toggle is deprecated; keep function for backwards-compatibility but not used.

    /* ==== KP BERECHNEN ==== */
    calculateKPBreakdown(config) {
        const breakdown = {
            total: 0,
            byCategory: {},
            byYear: {},
            moduleCount: 0,
            dynamicKP: 0,
            placeholderKP: 0
        };

        // Alle Module analysieren
        config.daten.forEach((modul) => {
            breakdown.total += modul.kp;
            breakdown.moduleCount++;

            // Markiere dynamische Module
            if (modul.isDynamic) {
                breakdown.dynamicKP += modul.kp;
            }

            // Markiere Placeholder Module
            if (modul.isPlaceholder) {
                breakdown.placeholderKP += modul.kp;
            }

            const kategorie = modul.kategorie || "Unbekannt";
            if (!breakdown.byCategory[kategorie]) {
                breakdown.byCategory[kategorie] = { kp: 0, count: 0 };
            }
            breakdown.byCategory[kategorie].kp += modul.kp;
            breakdown.byCategory[kategorie].count++;

            const jahr = modul.jahr || "Unbekannt";
            if (!breakdown.byYear[jahr]) {
                breakdown.byYear[jahr] = { kp: 0, count: 0 };
            }
            breakdown.byYear[jahr].kp += modul.kp;
            breakdown.byYear[jahr].count++;
        });

        return breakdown;
    }

    /* ==== KP-STATUS UPDATEN ==== */
    updateKPStatus(breakdown) {
        const statusEl = document.getElementById("kp-status");
        const progressFill = document.getElementById("kp-progress-fill");
        const remaining = Math.max(0, this.requiredKP - breakdown.total);
        const progress = Math.min(100, (breakdown.total / this.requiredKP) * 100);

        if (statusEl) {
            if (breakdown.total >= this.requiredKP) {
                statusEl.innerHTML = `✅ <span style="color: #28a745;">Mindestanforderung erfüllt!</span>`;
            } else {
                statusEl.innerHTML = `⚠️ <span style="color: #ffc107;">Noch ${remaining} ${this.creditUnit} benötigt</span>`;
            }
        }

        if (progressFill) {
            progressFill.style.width = progress + "%";
        }
    }

    /* ==== DETAILLIERTE AUFSCHLÜSSELUNG ==== */
    createDetailedBreakdown(breakdown) {
        // Detailed breakdown is intentionally disabled for a more compact UI.
        // Keep the function for compatibility, but return empty content.
        return '';
    }

    /* ==== VOLLSTÄNDIGE KP-ANZEIGE AKTUALISIEREN ==== */
    updateKPDisplay(config) {
        const breakdown = this.calculateKPBreakdown(config);

        // Gesamtsumme aktualisieren
        const totalKpEl = document.getElementById("total-kp");
        if (totalKpEl) {
            totalKpEl.textContent = breakdown.total;
        }

        // Status und Progress Bar aktualisieren
        this.updateKPStatus(breakdown);

        // Detaillierte Aufschlüsselung (falls aktiviert): direkt rendern (kein Toggle)
        const breakdownEl = document.getElementById("kp-breakdown");
        if (breakdownEl && this.counterConfig.showDetailedBreakdown) {
            breakdownEl.innerHTML = this.createDetailedBreakdown(breakdown);
        } else if (breakdownEl) {
            breakdownEl.innerHTML = "";
        }

        return breakdown;
    }

    /* ==== KATEGORIE-SPEZIFISCHE KP ANZEIGEN ==== */
    updateCategoryKPDisplay(categoryName, selectedModules, minKP = 0) {
        const totalKP = Object.values(selectedModules || {})
            .flat()
            .reduce((sum, m) => sum + (m.kp || 0), 0);

        const displayId = `selected-${categoryName.toLowerCase().replace(/\s+/g, '-')}-kp`;
        const display = document.getElementById(displayId);
        
        if (display) {
            display.textContent = totalKP;
            display.style.color = totalKP >= minKP ? "#28a745" : "#dc3545";
        }

        return totalKP;
    }
}

/* ==== STUDIENPLAN BASE INTEGRATION ==== */
StudienplanBase.prototype.initializeKPCounter = function() {
    if (!this.config.enableKPCounter) return;

    this.kpCounter = new StudienplanKPCounter(this.config);
    this.addKPCounter();
    this.updateKPDisplay();
};

StudienplanBase.prototype.addKPCounter = function() {
    if (!this.config.enableKPCounter || document.getElementById("kp-counter")) return;

    const legendContainer = document.querySelector(".farben-legende");
    if (legendContainer && this.kpCounter) {
        const kpCounterElement = this.kpCounter.createKPCounter();
        legendContainer.insertBefore(kpCounterElement, legendContainer.firstChild);
    }
};

StudienplanBase.prototype.updateKPDisplay = function() {
    if (!this.config.enableKPCounter || !this.kpCounter) return;
    
    return this.kpCounter.updateKPDisplay(this.config);
};

StudienplanBase.prototype.updateCategoryKPDisplay = function(categoryName, selectedModules, minKP = 0) {
    if (!this.config.enableKPCounter || !this.kpCounter) return 0;
    
    return this.kpCounter.updateCategoryKPDisplay(categoryName, selectedModules, minKP);
};