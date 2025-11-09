/* ==== HSLU EIT CLASS DEFINITION ==== */
/* Hauptklasse für den HSLU EIT Studienplan */

window.HSLUEITStudienplan = class HSLUEITStudienplan extends StudienplanBase {
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

    setupHSLUEITSpecifics() {
        // Basis-Klasse hat bereits showMessage und showToastMessage implementiert
    }
};
