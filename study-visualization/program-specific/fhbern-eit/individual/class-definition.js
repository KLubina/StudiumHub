/* ==== BFH EIT CLASS DEFINITION ==== */
/* Hauptklasse für den BFH EIT Studienplan */

window.BFHEITStudienplan = class BFHEITStudienplan extends StudienplanBase {
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

    setupBFHEITSpecifics() {
        // Basis-Klasse hat bereits showMessage und showToastMessage implementiert
    }
};
