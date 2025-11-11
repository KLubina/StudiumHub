/**
 * MAJOR MINOR SELECTOR - Optionale Major/Minor Auswahl
 */

window.StudienplanMajorMinorSelector = {
    initialize() {
        const selector = document.getElementById('major-minor-selector');
        if (selector) {
            // Hier würde die Major/Minor Logik implementiert werden
            console.log('Major/Minor Selector initialisiert');
        }
    }
};

// Initialisiere wenn DOM ready
document.addEventListener('DOMContentLoaded', () => {
    window.StudienplanMajorMinorSelector.initialize();
});