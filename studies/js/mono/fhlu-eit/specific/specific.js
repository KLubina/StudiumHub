/* ==== HSLU EIT SPECIFIC ==== */
/* Spezifische Anpassungen für HSLU EIT, nutzt das zentrale Wahlmodule-System */

window.StudiengangCustomClass = class HSLUEITStudienplan extends StudienplanBase {
    constructor(config) {
        super(config);
    }

    initialize() {
        // Basis-Initialisierung (aktiviert automatisch das zentrale Wahlmodule-System)
        super.initialize();
        
        // HSLU EIT Module-Daten kombinieren
        this.combineModuleData();
        
        // EXPLIZIT: ColorManager für HSLU EIT aktivieren
        this.config.enableColorManager = true;
        
        // HSLU EIT-spezifische Initialisierung
        this.setupHSLUEITSpecifics();
    }

    combineModuleData() {
        // Kombiniere separate Datendateien zu window.HSLUEITModuleData
        if (!window.HSLUEITModuleData) {
            window.HSLUEITModuleData = {};
        }
        
        // Vertiefungsrichtungen
        if (window.HSLUEITVertiefungsrichtungenData && window.HSLUEITVertiefungsrichtungenData.vertiefungsrichtungen) {
            window.HSLUEITModuleData.vertiefungsrichtungen = window.HSLUEITVertiefungsrichtungenData.vertiefungsrichtungen;
        }
        
        // Erweiterungsmodule
        if (window.HSLUEITWahlmoduleData && window.HSLUEITWahlmoduleData.erweiterungsmoduleBereiche) {
            window.HSLUEITModuleData.erweiterungsmoduleBereiche = window.HSLUEITWahlmoduleData.erweiterungsmoduleBereiche;
        }
        
        // Zusatzmodule
        if (window.HSLUEITWahlmoduleData && window.HSLUEITWahlmoduleData.zusatzmoduleBereiche) {
            window.HSLUEITModuleData.zusatzmoduleBereiche = window.HSLUEITWahlmoduleData.zusatzmoduleBereiche;
        }
        
        // Füge die erwartete getAllWahlmoduleData Funktion hinzu
        window.HSLUEITModuleData.getAllWahlmoduleData = function() {
            return {
                vertiefungsrichtungen: this.vertiefungsrichtungen || {},
                erweiterungsmoduleBereiche: this.erweiterungsmoduleBereiche || {},
                zusatzmoduleBereiche: this.zusatzmoduleBereiche || {}
            };
        };
        
        console.log('✅ HSLU EIT Moduldaten kombiniert:', window.HSLUEITModuleData);
    }

    setupHSLUEITSpecifics() {
        // Spezielle Message-Funktion für HSLU EIT
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
        calculatorButton.style.backgroundColor = "#0066cc";
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
                <h3>📊 ECTS-Kalkulator HSLU EIT</h3>
                
                <div style="margin-bottom: 20px; padding: 15px; background-color: #e6f3ff; border-radius: 8px;">
                    <h4 style="margin-top: 0; color: #003d73;">Aktueller Stand</h4>
                    <div style="font-size: 18px; font-weight: bold;">
                        Gesamt: ${breakdown.total} / 180 ECTS
                    </div>
                    <div style="margin-top: 5px; color: ${breakdown.total >= 180 ? '#003d73' : '#cc6600'};">
                        ${breakdown.total >= 180 ? '✅ Abschluss erreicht!' : `⚠️ Noch ${180 - breakdown.total} ECTS erforderlich`}
                    </div>
                </div>
                
                <div style="max-height: 300px; overflow-y: auto;">
                    <h4>Detaillierte Aufschlüsselung:</h4>
        `;
        
        // Strukturierte Aufschlüsselung nach HSLU Schema
        const requirements = {
            "Basic + Intermediate Module": { needed: 102, color: "#e8f5e8" },
            "Vertiefungsrichtung": { needed: 9, color: "#fff3cd" },
            "Erweiterungsmodule": { needed: 15, color: "#e6f3ff" },
            "Zusatzmodule": { needed: 15, color: "#f8d7da" },
            "Abschlussarbeit": { needed: 18, color: "#d4edda" },
            "Projektarbeit": { needed: 21, color: "#f0f0f0" }
        };
        
        const kategorieBreakdown = this.getKategorieBreakdown();
        
        Object.entries(requirements).forEach(([bereich, info]) => {
            let currentKp = 0;
            
            // Mapping zu tatsächlichen Kategorien
            if (bereich === "Basic + Intermediate Module") {
                currentKp = (kategorieBreakdown["Grundlagenfächer"] || 0) + 
                           (kategorieBreakdown["Elektrotechnik und Elektronik"] || 0) + 
                           (kategorieBreakdown["Informatik und Programmierung"] || 0) + 
                           (kategorieBreakdown["Kontextstudium"] || 0);
            } else if (bereich === "Vertiefungsrichtung") {
                currentKp = kategorieBreakdown["Vertiefungsrichtungen"] || 0;
            } else if (bereich === "Erweiterungsmodule") {
                currentKp = kategorieBreakdown["Erweiterungsmodule"] || 0;
            } else if (bereich === "Zusatzmodule") {
                currentKp = kategorieBreakdown["Zusatzmodule"] || 0;
            } else if (bereich === "Abschlussarbeit") {
                currentKp = kategorieBreakdown["Abschlussarbeit"] || 0;
            } else if (bereich === "Projektarbeit") {
                currentKp = kategorieBreakdown["Produktentwicklung und Projekte"] || 0;
            }
            
            const percentage = info.needed > 0 ? Math.min(100, Math.round((currentKp / info.needed) * 100)) : 100;
            const status = currentKp >= info.needed ? "✅" : "⏳";
            
            content += `
                <div style="margin-bottom: 12px; padding: 10px; background-color: ${info.color}; border-radius: 6px; border: 1px solid #ddd;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                        <span style="font-weight: bold;">${status} ${bereich}</span>
                        <span style="font-weight: bold;">${currentKp} / ${info.needed} ECTS</span>
                    </div>
                    <div style="background-color: #e9ecef; height: 8px; border-radius: 4px;">
                        <div style="background-color: ${currentKp >= info.needed ? '#28a745' : '#007bff'}; height: 100%; width: ${percentage}%; border-radius: 4px; transition: width 0.3s;"></div>
                    </div>
                    ${currentKp < info.needed ? `<div style="font-size: 11px; color: #666; margin-top: 3px;">Noch ${info.needed - currentKp} ECTS erforderlich</div>` : ''}
                </div>
            `;
        });
        
        content += `
                </div>
                
                <div style="margin-top: 20px; padding: 15px; background-color: ${breakdown.total >= 180 ? '#d4edda' : '#fff3cd'}; border-radius: 8px; border: 1px solid ${breakdown.total >= 180 ? '#c3e6cb' : '#ffeaa7'};">
                    <h4 style="margin-top: 0; color: ${breakdown.total >= 180 ? '#155724' : '#856404'};">
                        ${breakdown.total >= 180 ? '🎉 Gratulation!' : '📝 Nächste Schritte:'}
                    </h4>
                    <ul style="margin: 0; padding-left: 20px; color: ${breakdown.total >= 180 ? '#155724' : '#856404'};">
        `;
        
        // Spezifische Empfehlungen für HSLU
        if (breakdown.total >= 180) {
            content += `<li>Alle Anforderungen erfüllt - bereit für den Abschluss!</li>`;
        } else {
            const vertiefungKp = kategorieBreakdown["Vertiefungsrichtungen"] || 0;
            const erweiterungKp = kategorieBreakdown["Erweiterungsmodule"] || 0;
            const zusatzKp = kategorieBreakdown["Zusatzmodule"] || 0;
            
            if (vertiefungKp < 9) {
                content += `<li>Wähle eine Vertiefungsrichtung (alle 3 Module = 9 ECTS)</li>`;
            }
            if (erweiterungKp < 15) {
                content += `<li>Wähle Erweiterungsmodule (mindestens 15 ECTS)</li>`;
            }
            if (zusatzKp < 15) {
                content += `<li>Wähle Zusatzmodule (mindestens 15 ECTS)</li>`;
            }
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
        yearTitle.textContent = "5./6. Semester (Wahlbereich)";
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
            "Erweiterungsmodule",
            "Zusatzmodule",
            "Produktentwicklung und Projekte",
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
            info: { bg: '#0066cc', color: 'white' },
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

        const categories = ['vertiefungsrichtungen', 'erweiterungsmoduleBereiche', 'zusatzmoduleBereiche'];
        const minKpMap = { 'vertiefungsrichtungen': 9, 'erweiterungsmoduleBereiche': 15, 'zusatzmoduleBereiche': 15 };

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