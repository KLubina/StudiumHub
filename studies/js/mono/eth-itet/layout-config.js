/* ==== LAYOUT CONFIGURATION ==== */
/* Visual layout and module sizing settings */

window.StudiengangLayoutConfig = {
    // Layout type
    layout: "years",

    // Module sizing
    moduleSizing: "proportional",
    basisArea: 2000,
    defaultAspectRatio: 1.5,

    // Custom aspect ratios for specific modules
    aspectRatios: {
        longModuleName: 2.0,
        Bachelorarbeit: 2.8,
        "Science in Perspective": 2.2
    },

    // Layout für 3. Jahr
    thirdYearLayout: "category-based",
    thirdYearCategoryOrder: [
        "Kernfächer nach Schwerpunkt",
        "Weitere Wahl-Grundlagenfächer",
        "Wahlfächer",
        "Wahl Praktika-Projekte-Seminare",
        "Wissenschaftliche Arbeit"
    ]
};
