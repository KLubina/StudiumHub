/* ==== LAYOUT CONFIGURATION ==== */
/* Visual layout and module sizing settings */

window.StudiengangLayoutConfig = {
    // Layout type
    layout: "years",

    // Module sizing
    moduleSizing: "proportional",
    basisArea: 2000,
    defaultAspectRatio: 1.4,
    layoutClass: "horizontal-modules",

    // Custom aspect ratios for specific modules
    aspectRatios: {
        "Bachelor-Thesis": 2.8,
        "Projektarbeit": 2.2,
        "Wahrscheinlichkeit, Statistik und dynamische Systeme": 2.5,
        "Mathematik der Signalverarbeitung": 2.0,
        "longName": 2.0
    },

    // Layout für 3. Jahr (Semester 5-6)
    thirdYearLayout: "category-based",
    thirdYearCategoryOrder: [
        "Vertiefungsrichtungen",
        "Fachliche Wahlmodule",
        "Projektarbeiten",
        "Abschlussarbeit"
    ]
};
