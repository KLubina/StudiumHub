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
        // Basis-Klasse hat bereits showMessage und showToastMessage implementiert
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