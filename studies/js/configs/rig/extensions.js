/* ==== RIG EXTENSIONS - VEREINFACHT MIT ZENTRALEM WAHLMODULE-SYSTEM ==== */
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
        // Spezielle Message-Funktion für RIG
        this.showMessage = function(message, type = "info") {
            this.showToastMessage(message, type);
        };
        // Rely on centralized Wahlmodule manager in base; no overrides here
    }

    /* Wahlmodule: rely on base centralized implementation (no overrides) */

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
};