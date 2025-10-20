/* ==== SOZIALWISSENSCHAFTEN EXTENSIONS ==== */
/* Spezifische Anpassungen für BA Sozialwissenschaften */

window.StudiengangCustomClass = class SozwiStudienplan extends StudienplanBase {
    constructor(config) {
        super(config);
    }

    initialize() {
        // Basis-Initialisierung (aktiviert automatisch das zentrale Wahlmodule-System)
        super.initialize();

        // Sozialwissenschaften Module-Daten kombinieren
        this.combineModuleData();

        // Sozialwissenschaften-spezifische Initialisierung
        this.setupSozwiSpecifics();
    }

    combineModuleData() {
        // Kombiniere separate Datendateien zu window.SozwiModuleData
        if (!window.SozwiModuleData) {
            window.SozwiModuleData = {};
        }

        // Major-Daten
        if (window.SozwiMajorData && window.SozwiMajorData.majorBereiche) {
            window.SozwiModuleData.majorBereiche = window.SozwiMajorData.majorBereiche;
        }

        // Minor-Daten
        if (window.SozwiMinorData && window.SozwiMinorData.minorBereiche) {
            window.SozwiModuleData.minorBereiche = window.SozwiMinorData.minorBereiche;
        }

        // Politikwissenschaft-Modul-Daten
        if (window.PolwiModulesData) {
            window.SozwiModuleData.polwiModules = window.PolwiModulesData;
        }

        // Füge die erwartete getAllWahlmoduleData Funktion hinzu
        window.SozwiModuleData.getAllWahlmoduleData = function() {
            return {
                majorBereiche: this.majorBereiche || {},
                minorBereiche: this.minorBereiche || {}
            };
        };

        console.log('✅ Sozialwissenschaften Moduldaten kombiniert:', window.SozwiModuleData);
    }

    setupSozwiSpecifics() {
        // Spezielle Message-Funktion für Sozialwissenschaften
        this.showMessage = function(message, type = "info") {
            this.showToastMessage(message, type);
        };

        // ECTS-Kalkulator hinzufügen
        if (this.config.enableKPCounter) {
            this.addECTSCalculatorButton();
        }
    }

    addECTSCalculatorButton() {
        const legendContainer = document.querySelector(".farben-legende");
        if (!legendContainer || document.getElementById("ects-calculator-btn")) return;

        const calculatorButton = document.createElement("div");
        calculatorButton.id = "ects-calculator-btn";
        calculatorButton.style.marginTop = "15px";
        calculatorButton.style.padding = "10px";
        calculatorButton.style.backgroundColor = "#007bff";
        calculatorButton.style.color = "white";
        calculatorButton.style.borderRadius = "5px";
        calculatorButton.style.cursor = "pointer";
        calculatorButton.style.textAlign = "center";
        calculatorButton.style.fontWeight = "bold";
        calculatorButton.innerHTML = "📊 ECTS-Übersicht";

        calculatorButton.addEventListener("click", () => {
            this.showECTSCalculator();
        });

        legendContainer.appendChild(calculatorButton);
    }

    showECTSCalculator() {
        const content = this.createECTSCalculatorContent();
        this.showCustomTooltip(content, { clientX: 100, clientY: 100 });
    }

    createECTSCalculatorContent() {
        const breakdown = this.calculateDetailedECTSBreakdown();

        let content = `
            <div class="ects-calculator">
                <h3>📊 ECTS-Übersicht Sozialwissenschaften</h3>

                <div style="margin-bottom: 20px; padding: 15px; background-color: #e7f3ff; border-radius: 8px;">
                    <h4 style="margin-top: 0; color: #004085;">Aktueller Stand</h4>
                    <div style="font-size: 18px; font-weight: bold;">
                        Gesamt: ${breakdown.total} / 180 ECTS
                    </div>
                    <div style="margin-top: 5px; color: ${breakdown.total >= 180 ? '#155724' : '#856404'};">
                        ${breakdown.total >= 180 ? '✅ Studienabschluss erreicht!' : `⚠️ Noch ${180 - breakdown.total} ECTS erforderlich`}
                    </div>
                </div>

                <div style="max-height: 300px; overflow-y: auto;">
                    <h4>Aufschlüsselung:</h4>
        `;

        // Kategorien-Aufschlüsselung
        const kategorieBreakdown = this.getKategorieBreakdown();
        Object.entries(kategorieBreakdown).forEach(([kategorie, ects]) => {
            const percentage = Math.round((ects / 180) * 100);
            const required = kategorie === "Major" ? 120 : (kategorie === "Minor" ? 60 : 0);
            const color = ects >= required ? '#28a745' : '#ffc107';

            content += `
                <div style="margin-bottom: 10px; padding: 8px; background-color: #f8f9fa; border-radius: 4px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-weight: bold;">${kategorie}</span>
                        <span style="color: ${color};">${ects} / ${required} ECTS (${percentage}%)</span>
                    </div>
                    <div style="background-color: #e9ecef; height: 6px; border-radius: 3px; margin-top: 4px;">
                        <div style="background-color: ${color}; height: 100%; width: ${Math.min(100, percentage)}%; border-radius: 3px;"></div>
                    </div>
                </div>
            `;
        });

        content += `
                </div>

                <div style="margin-top: 20px; padding: 15px; background-color: #fff3cd; border-radius: 8px; border: 1px solid #ffeaa7;">
                    <h4 style="margin-top: 0; color: #856404;">Empfehlungen:</h4>
                    <ul style="margin: 0; padding-left: 20px; color: #856404;">
        `;

        // Empfehlungen
        if (breakdown.kategorien['Major'] < 120) {
            content += `<li>Wähle deinen Major und absolviere die erforderlichen 120 ECTS</li>`;
        }
        if (breakdown.kategorien['Minor'] < 60) {
            content += `<li>Wähle deinen Minor und absolviere die erforderlichen 60 ECTS</li>`;
        }
        if (breakdown.total >= 170 && breakdown.total < 180) {
            content += `<li>Nur noch wenige ECTS bis zum Abschluss!</li>`;
        }

        content += `
                    </ul>
                </div>
            </div>
        `;

        return content;
    }

    calculateDetailedECTSBreakdown() {
        let total = 0;
        const kategorien = {};

        this.config.daten.forEach(modul => {
            if (modul.kp && !modul.isPlaceholder) {
                total += modul.kp;
                const kategorie = modul.kategorie || 'Unbekannt';
                kategorien[kategorie] = (kategorien[kategorie] || 0) + modul.kp;
            }
        });

        return { total, kategorien };
    }

    getKategorieBreakdown() {
        const breakdown = this.calculateDetailedECTSBreakdown();
        return breakdown.kategorien;
    }

    /* ==== MESSAGE SYSTEM ==== */
    showToastMessage(message, type = "info") {
        const toast = document.createElement('div');
        toast.style.position = 'fixed';
        toast.style.top = '20px';
        toast.style.right = '20px';
        toast.style.padding = '10px 15px';
        toast.style.borderRadius = '5px';
        toast.style.zIndex = '9999';
        toast.style.fontSize = '12px';
        toast.style.fontWeight = 'bold';
        toast.textContent = message;

        const colors = {
            success: { bg: '#28a745', color: 'white' },
            warning: { bg: '#ffc107', color: 'black' },
            info: { bg: '#17a2b8', color: 'white' },
            error: { bg: '#dc3545', color: 'white' }
        };

        const style = colors[type] || colors.info;
        toast.style.backgroundColor = style.bg;
        toast.style.color = style.color;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    /* ==== ERWEITERTE ECTS-ANZEIGE FÜR KATEGORIEN ==== */
    updateECTSDisplayWithCategories() {
        // Basis ECTS-Counter aktualisieren
        const breakdown = this.updateKPDisplay();

        // Kategorie-spezifische ECTS-Anzeigen aktualisieren
        if (this.wahlmoduleManager && this.config.kpCounterConfig?.enableCategoryTracking) {
            this.updateCategoryECTSDisplays();
        }

        return breakdown;
    }

    updateCategoryECTSDisplays() {
        if (!this.wahlmoduleManager) return;

        const categories = ['majorBereiche', 'minorBereiche'];
        const minEctsMap = { 'majorBereiche': 120, 'minorBereiche': 60 };

        categories.forEach(category => {
            const selectedModules = this.wahlmoduleManager.selectedModules[category] || [];
            const minEcts = minEctsMap[category] || 0;
            this.updateCategoryKPDisplay(category, { general: selectedModules }, minEcts);
        });
    }

    /* ==== OVERRIDE TOOLTIP HIDING ==== */
    hideTooltip() {
        super.hideTooltip();

        // Cleanup outside click handler if exists
        if (this.wahlmoduleManager && this.wahlmoduleManager._outsideClickHandler) {
            document.removeEventListener('click', this.wahlmoduleManager._outsideClickHandler, true);
            this.wahlmoduleManager._outsideClickHandler = null;
        }
    }
};
