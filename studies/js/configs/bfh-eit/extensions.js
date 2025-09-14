/* ==== BFH EIT EXTENSIONS - VEREINFACHT MIT ZENTRALEM WAHLMODULE-SYSTEM ==== */
/* Spezifische Anpassungen für BFH EIT, nutzt das zentrale Wahlmodule-System */

window.StudiengangCustomClass = class BFHEITStudienplan extends StudienplanBase {
    constructor(config) {
        super(config);
    }

    initialize() {
        // Basis-Initialisierung (aktiviert automatisch das zentrale Wahlmodule-System)
        super.initialize();
        
        // BFH EIT Module-Daten kombinieren
        this.combineModuleData();
        
        // EXPLIZIT: ColorManager für BFH EIT aktivieren
        this.config.enableColorManager = true;
        
        // BFH EIT-spezifische Initialisierung
        this.setupBFHEITSpecifics();
    }

    combineModuleData() {
        // Kombiniere separate Datendateien zu window.BFHEITModuleData
        if (!window.BFHEITModuleData) {
            window.BFHEITModuleData = {};
        }
        
        // Vertiefungsrichtungen
        if (window.BFHEITVertiefungsrichtungenData && window.BFHEITVertiefungsrichtungenData.vertiefungsrichtungen) {
            window.BFHEITModuleData.vertiefungsrichtungen = window.BFHEITVertiefungsrichtungenData.vertiefungsrichtungen;
        }
        
        // Wahlmodule
        if (window.BFHEITWahlmoduleData && window.BFHEITWahlmoduleData.wahlmoduleBereiche) {
            window.BFHEITModuleData.wahlmoduleBereiche = window.BFHEITWahlmoduleData.wahlmoduleBereiche;
        }
        
        // Füge die erwartete getAllWahlmoduleData Funktion hinzu
        window.BFHEITModuleData.getAllWahlmoduleData = function() {
            return {
                vertiefungsrichtungen: this.vertiefungsrichtungen || {},
                wahlmoduleBereiche: this.wahlmoduleBereiche || {}
            };
        };
        
        console.log('✅ BFH EIT Moduldaten kombiniert:', window.BFHEITModuleData);
    }

    setupBFHEITSpecifics() {
        // Spezielle Message-Funktion für BFH EIT
        this.showMessage = function(message, type = "info") {
            this.showToastMessage(message, type);
        };
        
        // KP-Kalkulator hinzufügen
        if (this.config.enableKPCounter) {
            this.addKPCalculatorButton();
        }
    }

    addKPCalculatorButton() {
        const legendContainer = document.querySelector(".farben-legende");
        if (!legendContainer || document.getElementById("kp-calculator-btn")) return;

        const calculatorButton = document.createElement("div");
        calculatorButton.id = "kp-calculator-btn";
        calculatorButton.style.marginTop = "15px";
        calculatorButton.style.padding = "10px";
        calculatorButton.style.backgroundColor = "#28a745";
        calculatorButton.style.color = "white";
        calculatorButton.style.borderRadius = "5px";
        calculatorButton.style.cursor = "pointer";
        calculatorButton.style.textAlign = "center";
        calculatorButton.style.fontWeight = "bold";
        calculatorButton.innerHTML = "📊 ECTS-Kalkulator";
        
        calculatorButton.addEventListener("click", () => {
            this.showKPCalculator();
        });

        legendContainer.appendChild(calculatorButton);
    }

    showKPCalculator() {
        const content = this.createKPCalculatorContent();
        this.showCustomTooltip(content, { clientX: 100, clientY: 100 });
    }

    createKPCalculatorContent() {
        const breakdown = this.calculateDetailedKPBreakdown();
        
        let content = `
            <div class="kp-calculator">
                <h3>📊 ECTS-Kalkulator BFH EIT</h3>
                
                <div style="margin-bottom: 20px; padding: 15px; background-color: #e8f5e8; border-radius: 8px;">
                    <h4 style="margin-top: 0; color: #2d5016;">Aktueller Stand</h4>
                    <div style="font-size: 18px; font-weight: bold;">
                        Gesamt: ${breakdown.total} / 180 ECTS
                    </div>
                    <div style="margin-top: 5px; color: ${breakdown.total >= 180 ? '#2d5016' : '#8b4513'};">
                        ${breakdown.total >= 180 ? '✅ Abschluss erreicht!' : `⚠️ Noch ${180 - breakdown.total} ECTS erforderlich`}
                    </div>
                </div>
                
                <div style="max-height: 300px; overflow-y: auto;">
                    <h4>Aufschlüsselung nach Kategorien:</h4>
        `;
        
        // Kategorien-Aufschlüsselung
        const kategorieBreakdown = this.getKategorieBreakdown();
        Object.entries(kategorieBreakdown).forEach(([kategorie, kp]) => {
            const percentage = Math.round((kp / 180) * 100);
            content += `
                <div style="margin-bottom: 10px; padding: 8px; background-color: #f8f9fa; border-radius: 4px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-weight: bold;">${kategorie}</span>
                        <span>${kp} ECTS (${percentage}%)</span>
                    </div>
                    <div style="background-color: #e9ecef; height: 6px; border-radius: 3px; margin-top: 4px;">
                        <div style="background-color: #007bff; height: 100%; width: ${percentage}%; border-radius: 3px;"></div>
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
        
        // Empfehlungen basierend auf aktuellen ECTS
        if (breakdown.total < 140) {
            content += `<li>Wähle deine Vertiefungsrichtung (min. 20 ECTS)</li>`;
        }
        if (breakdown.total < 160) {
            content += `<li>Füge fachliche Wahlmodule hinzu (min. 10 ECTS)</li>`;
        }
        if (breakdown.total >= 170 && breakdown.total < 180) {
            content += `<li>Nur noch wenige ECTS fehlen zum Abschluss!</li>`;
        }
        
        content += `
                    </ul>
                </div>
            </div>
        `;
        
        return content;
    }

    calculateDetailedKPBreakdown() {
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
        const breakdown = this.calculateDetailedKPBreakdown();
        return breakdown.kategorien;
    }

    /* ==== 3. JAHR LAYOUT - KATEGORIE-BASIERT ==== */
    createYearSection(year) {
        if (year === 3) {
            return this.createThirdYearSection();
        }
        return super.createYearSection(year);
    }

    createThirdYearSection() {
        const yearDiv = document.createElement("div");
        yearDiv.classList.add("jahr");

        const yearTitle = document.createElement("div");
        yearTitle.classList.add("jahr-titel");
        yearTitle.textContent = "3. Jahr (Wahlbereich)";
        yearDiv.appendChild(yearTitle);

        // Kategoriebasiertes Layout nach kurzer Verzögerung
        setTimeout(() => {
            this.createCategoryBasedThirdYear(yearDiv);
        }, 100);

        return yearDiv;
    }

    createCategoryBasedThirdYear(container) {
        const thirdYearModules = this.config.daten.filter((m) => m.jahr === 3);

        // Container leeren (außer Titel)
        const title = container.querySelector(".jahr-titel");
        container.innerHTML = "";
        if (title) {
            container.appendChild(title);
        }

        // Kategorien in definierter Reihenfolge
        const reihenfolge = [
            "Vertiefungsrichtungen",
            "Fachliche Wahlmodule",
            "Praktika und Projekte",
            "Sprachen und Soft Skills",
            "Abschlussarbeit"
        ];

        reihenfolge.forEach((kategorie) => {
            const kategorieModules = thirdYearModules.filter(
                (m) => m.kategorie === kategorie
            );
            if (kategorieModules.length === 0) return;

            const kategorieConfig = this.config.kategorien.find(
                (k) => k.name === kategorie
            );

            // Kategorie-Titel
            const kategorieTitle = document.createElement("div");
            kategorieTitle.classList.add("bereich-titel");
            if (kategorieConfig && kategorieConfig.minKp) {
                kategorieTitle.textContent = `${kategorie} (mind. ${kategorieConfig.minKp} ECTS)`;
            } else {
                kategorieTitle.textContent = kategorie;
            }
            container.appendChild(kategorieTitle);

            // Module-Container
            const moduleContainer = document.createElement("div");
            moduleContainer.classList.add("module-container");
            moduleContainer.style.display = "flex";
            moduleContainer.style.flexWrap = "wrap";
            moduleContainer.style.gap = "8px";
            moduleContainer.style.marginBottom = "20px";
            moduleContainer.style.alignItems = "flex-start";

            kategorieModules.forEach((modul) => {
                this.createModule(modul, moduleContainer);
            });

            container.appendChild(moduleContainer);
        });
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

    /* ==== ERWEITERTE KP-ANZEIGE FÜR KATEGORIEN ==== */
    updateKPDisplayWithCategories() {
        // Basis KP-Counter aktualisieren
        const breakdown = this.updateKPDisplay();

        // Kategorie-spezifische KP-Anzeigen aktualisieren (falls Wahlmodule-Manager aktiv)
        if (this.wahlmoduleManager && this.config.kpCounterConfig?.enableCategoryTracking) {
            this.updateCategoryKPDisplays();
        }

        return breakdown;
    }

    updateCategoryKPDisplays() {
        if (!this.wahlmoduleManager) return;

        const categories = ['vertiefungsrichtungen', 'wahlmoduleBereiche'];
        const minKpMap = { 'vertiefungsrichtungen': 20, 'wahlmoduleBereiche': 10 };

        categories.forEach(category => {
            const selectedModules = this.wahlmoduleManager.selectedModules[category] || [];
            const minKp = minKpMap[category] || 0;
            this.updateCategoryKPDisplay(category, { general: selectedModules }, minKp);
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