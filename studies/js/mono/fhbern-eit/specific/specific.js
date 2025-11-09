/* ==== BFH EIT SPECIFIC ==== */
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