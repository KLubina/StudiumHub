/* ==== MSC ITET EXTENSIONS ==== */
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
        console.log('🔍 kernfaecherSchwerpunkte:', combinedData.kernfaecherSchwerpunkte);
        console.log('🔍 vertiefungsfaecherBereiche:', combinedData.vertiefungsfaecherBereiche);
    }

    /* ==== LAYOUT - Überschreibt Jahr-basierte Methoden ==== */
    // Layout ist jetzt kategorie-basiert, keine speziellen Jahr-Methoden nötig
};