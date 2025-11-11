/**
 * KP COUNTER - Optionale KP-Zähl-Funktionalität
 */

window.StudienplanKPCounter = {
    initialize() {
        // Berechne und zeige Gesamt-KP
        this.updateTotalKP();
    },

    updateTotalKP() {
        const modules = document.querySelectorAll('.modul');
        let total = 0;

        modules.forEach(module => {
            const ects = parseInt(module.dataset.ects) || 0;
            total += ects;
        });

        // Zeige in Subtitle oder erstelle neues Element
        const subtitle = document.getElementById('studienplan-subtitle');
        if (subtitle) {
            subtitle.textContent = `Gesamt: ${total} KP (mind. 180 KP erforderlich)`;
        }
    }
};

// Initialisiere wenn DOM ready
document.addEventListener('DOMContentLoaded', () => {
    window.StudienplanKPCounter.initialize();
});