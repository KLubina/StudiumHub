/**
 * COLOR MANAGER - Optionale Farbverwaltung
 */

window.StudienplanColorManager = {
    initialize() {
        // Hier können Farbanpassungen gemacht werden
        console.log('Color Manager initialisiert');
    }
};

// Initialisiere wenn DOM ready
document.addEventListener('DOMContentLoaded', () => {
    window.StudienplanColorManager.initialize();
});