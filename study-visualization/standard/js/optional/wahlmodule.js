/**
 * WAHLMODULE - Optionale Wahlmodule-Verwaltung
 */

window.StudienplanWahlmodule = {
    initialize() {
        // Hier können Wahlmodule-Funktionen implementiert werden
        console.log('Wahlmodule initialisiert');
    }
};

// Initialisiere wenn DOM ready
document.addEventListener('DOMContentLoaded', () => {
    window.StudienplanWahlmodule.initialize();
});

// Markiere als geladen
window.subModulesReady['wahlmodule'] = Promise.resolve();