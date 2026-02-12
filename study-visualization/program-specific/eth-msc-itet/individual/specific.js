/* ==== MSC ITET SPECIFIC ==== */
/* Einfache Implementierung für MSc ITET */

window.StudiengangCustomClass = class MSCITETStudienplan extends StudienplanBase {
    constructor(config) {
        super(config);
    }

    initialize() {
        // Basis-Initialisierung
        super.initialize();
        
        // MSc ITET spezifische Initialisierung
        this.setupMSCITETSpecifics();
    }

    setupMSCITETSpecifics() {
        // Kombiniere alle Wahlmodule-Daten
        this.combineWahlmoduleData();
        
        // Message-Funktion
        this.showMessage = function(message, type = "info") {
            console.log(`${type}: ${message}`);
        };
    }

    combineWahlmoduleData() {
        // Kombiniere Kernfächer und Vertiefungsfächer für das Wahlmodule-System
        const combinedData = {};
        
        // Kernfächer
        if (window.MSCITETKernfaecherData && window.MSCITETKernfaecherData.kernfaecherSchwerpunkte) {
            combinedData.kernfaecherSchwerpunkte = window.MSCITETKernfaecherData.kernfaecherSchwerpunkte;
        }
        
        // Vertiefungsfächer  
        if (window.MSCITETVertiefungsfaecherData && window.MSCITETVertiefungsfaecherData.vertiefungsfaecherBereiche) {
            combinedData.vertiefungsfaecherBereiche = window.MSCITETVertiefungsfaecherData.vertiefungsfaecherBereiche;
        }
        
        // Erstelle window.MSCITETModuleData mit getAllWahlmoduleData Funktion
        window.MSCITETModuleData = {
            ...combinedData,
            getAllWahlmoduleData: function() {
                return {
                    kernfaecherSchwerpunkte: this.kernfaecherSchwerpunkte || {},
                    vertiefungsfaecherBereiche: this.vertiefungsfaecherBereiche || {}
                };
            }
        };
        
        console.log('✅ MSc ITET Moduldaten kombiniert:', window.MSCITETModuleData);
    }

    /* ==== LAYOUT ==== */
    createYearSection(year) {
        if (year === 2) {
            return this.createSecondYearSection();
        }
        return super.createYearSection(year);
    }

    createSecondYearSection() {
        const yearDiv = document.createElement("div");
        yearDiv.classList.add("jahr");

        const yearTitle = document.createElement("div");
        yearTitle.classList.add("jahr-titel");
        yearTitle.textContent = "2. Jahr";
        yearDiv.appendChild(yearTitle);

        // Kategoriebasiertes Layout für 2. Jahr
        setTimeout(() => {
            this.createCategoryBasedSecondYear(yearDiv);
        }, 100);

        return yearDiv;
    }

    createCategoryBasedSecondYear(container) {
        const secondYearModules = this.config.daten.filter((m) => m.jahr === 2);

        // Container leeren (außer Titel)
        const title = container.querySelector(".jahr-titel");
        container.innerHTML = "";
        if (title) {
            container.appendChild(title);
        }

        // Module direkt hinzufügen ohne weitere Kategorisierung
        const moduleContainer = document.createElement("div");
        moduleContainer.classList.add("module-container");
        moduleContainer.style.display = "flex";
        moduleContainer.style.flexWrap = "wrap";
        moduleContainer.style.gap = "8px";
        moduleContainer.style.marginBottom = "20px";
        moduleContainer.style.alignItems = "flex-start";

        secondYearModules.forEach((modul) => {
            this.createModule(modul, moduleContainer);
        });

        container.appendChild(moduleContainer);
    }
};