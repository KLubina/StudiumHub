/* ==== RIG SPECIFIC ==== */
/* Spezifische Anpassungen für RIG, nutzt das zentrale Wahlmodule-System */

window.StudiengangCustomClass = class RIGStudienplan extends StudienplanBase {
    constructor(config) {
        super(config);
    }

    initialize() {
        // Basis-Initialisierung (aktiviert automatisch das zentrale Wahlmodule-System)
        super.initialize();
        
        // RIG-spezifische Initialisierung
        this.setupRIGSpecifics();
    }

    setupRIGSpecifics() {
        // Basis-Klasse hat bereits showMessage und showToastMessage implementiert
    }
};