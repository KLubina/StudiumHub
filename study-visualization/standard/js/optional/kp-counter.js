/**
 * KP COUNTER - Optionale KP-Zähl-Funktionalität
 */

window.StudienplanKPCounter = {
    initialize() {
        // Verhindere doppelte Initialisierung
        if (this._initialized) return;
        this._initialized = true;

        // Erstelle KP-Counter Box wenn sie noch nicht existiert
        this.createCounterBox();

        // Berechne und zeige Gesamt-KP
        this.updateTotalKP();
    },

    createCounterBox() {
        // Schaue ob Counter-Box bereits existiert
        if (document.getElementById('kp-counter')) {
            return;
        }

        // Erstelle Container für KP-Counter
        const counterBox = document.createElement('div');
        counterBox.id = 'kp-counter';
        counterBox.className = 'kp-counter-box';

        // Füge IN die Farben-Legende ein (am Ende)
        const legendeContainer = document.querySelector('.farben-legende');
        if (legendeContainer) {
            legendeContainer.appendChild(counterBox);
        }
    },

    updateTotalKP() {
        const modules = document.querySelectorAll('.modul');
        let total = 0;

        modules.forEach(module => {
            const ects = parseInt(module.dataset.ects) || 0;
            total += ects;
        });

        // Zeige in KP-Counter Box
        const counterBox = document.getElementById('kp-counter');
        if (counterBox) {
            counterBox.innerHTML = `<div id="kp-total">Gesamt: <strong>${total} KP</strong> (mind. 180 KP erforderlich)</div>`;
        }
    }
};

// Initialisiere wenn DOM ready
document.addEventListener('DOMContentLoaded', () => {
    window.StudienplanKPCounter.initialize();
});

// Falls das Script nach dem DOMContentLoaded geladen wird, sofort initialisieren
if (document.readyState === 'interactive' || document.readyState === 'complete') {
    // Kleiner Timeout, damit andere Module (z.B. Layout) zuerst ihre Arbeit beenden können
    setTimeout(() => window.StudienplanKPCounter.initialize(), 0);
}

// Markiere als geladen
window.subModulesReady['kp-counter'] = Promise.resolve();