/* ==== COLOR MANAGER CONFIGURATION ==== */
/* Color mode settings for the color manager feature */

window.StudiengangColorManagerConfig = {
    // Available coloring modes
    coloringModes: {
        pruefungsblock: "Prüfungsblöcken",
        themenbereich: "Themenbereichen"
    },

    // Default coloring mode
    defaultColoringMode: "pruefungsblock"

    // NOTE: Color assignments (Themenbereiche & Prüfungsblöcke) are defined in color-config.js
    // The color-config.js is loaded automatically and available via window.CSEColorConfig
};
