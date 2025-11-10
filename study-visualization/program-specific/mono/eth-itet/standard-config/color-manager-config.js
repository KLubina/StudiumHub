/* ==== COLOR MANAGER CONFIGURATION ==== */
/* Color mode settings for the color manager feature */

window.StudiengangColorManagerConfig = {
    // Available coloring modes
    coloringModes: {
        kategorie: "Kategorien",
        pruefungsblock: "Prüfungsblöcken",
        themenbereich: "Thema"
    },

    // Default coloring mode
    defaultColoringMode: "kategorie"

    // NOTE: Farb-Zuordnungen (Themenbereiche & Prüfungsblöcke) sind in color-config.js definiert
    // Die color-config.js wird automatisch geladen und ist über window.ITETColorConfig verfügbar
};
