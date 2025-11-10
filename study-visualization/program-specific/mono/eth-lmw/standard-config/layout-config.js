/* ==== LAYOUT CONFIGURATION ==== */
/* Visual layout and module sizing settings */

window.StudiengangLayoutConfig = {
    // Layout type
    layout: "years",

    // Module sizing
    moduleSizing: "proportional",
    basisArea: 2000,
    defaultAspectRatio: 1.5,
    layoutClass: "horizontal-modules",

    // Custom aspect ratios for specific modules
    aspectRatios: {
        longModuleName: 2.0,
        "Bachelor-Arbeit": 2.8,
        "Wissenschaft im Kontext": 2.0
    },

    // Layout für 3. Jahr
    thirdYearLayout: "category-based",
    thirdYearCategoryOrder: [
        "Fachgrundlage",
        "Lebensmittelwissenschaftliches Fach",
        "Laborpraktikum",
        "Exkursionen",
        "Wahlfächer",
        "Wissenschaft im Kontext",
        "Bachelor-Arbeit"
    ]
};
