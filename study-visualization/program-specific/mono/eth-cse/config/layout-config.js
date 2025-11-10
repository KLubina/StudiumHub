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
        longName: 2.0,
        specialModule: 2.5
    },

    // 3rd year section order
    bereicheReihenfolge: [
        "Kernfächer",
        "Vertiefungsgebiet",
        "Wahlfächer",
        "Abschluss"
    ]
};
