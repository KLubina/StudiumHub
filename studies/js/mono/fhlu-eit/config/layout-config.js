/* ==== LAYOUT CONFIGURATION ==== */
/* Visual layout and module sizing settings */

window.StudiengangLayoutConfig = {
    // Layout type
    layout: "years",

    // Module sizing
    moduleSizing: "proportional",
    basisArea: 1800,
    defaultAspectRatio: 1.4,
    layoutClass: "horizontal-modules",

    // Custom aspect ratios for specific modules
    aspectRatios: {
        "Bachelor-Thesis": 2.8,
        "Industrieprojekt": 2.2,
        "Produktentwicklung 1": 2.0,
        "Produktentwicklung 2": 2.0,
        "Grundlagen elektrischer Antriebssysteme": 2.2,
        "Advanced Embedded Systems": 2.0,
        "longName": 2.0
    },

    // Layout für 3. Jahr (Semester 5-6)
    thirdYearLayout: "category-based",
    thirdYearCategoryOrder: [
        "Vertiefungsrichtungen",
        "Erweiterungsmodule",
        "Zusatzmodule",
        "Abschlussarbeit"
    ]
};
