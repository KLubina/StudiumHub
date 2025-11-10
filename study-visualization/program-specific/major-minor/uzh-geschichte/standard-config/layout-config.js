/* ==== LAYOUT CONFIGURATION ==== */
/* Visual layout and module sizing settings */

window.StudiengangLayoutConfig = {
    // Layout type
    layout: "first-year-then-groups",

    // Module sizing
    moduleSizing: "proportional",
    basisArea: 2000,
    defaultAspectRatio: 1.5,
    layoutClass: "horizontal-modules",
    
    // Bereiche-Reihenfolge
    bereicheReihenfolge: [
        "Modulgruppe: Altertum",
        "Modulgruppe: Mittelalter",
        "Modulgruppe: Neuzeit",
        "Modulgruppe: Abschluss"
    ],

    // Custom aspect ratios for specific modules
    aspectRatios: {}
};
