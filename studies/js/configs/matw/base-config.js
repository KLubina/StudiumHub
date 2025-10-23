/* ==== MATERIALWISSENSCHAFTEN BASE CONFIGURATION ==== */
/* Grundlegende Konfiguration für den Materialwissenschaften Studiengang */

window.StudiengangBaseConfig = {
    // === 1. BASIC INFO ===
    title: "BSc Materialwissenschaften",
    legendTitle: "Farben-Legende",
    creditUnit: "ECTS",

    // === 2. LAYOUT CONFIG ===
    layout: "years",
    moduleSizing: "proportional",
    basisArea: 2500,
    defaultAspectRatio: 1.5,

    // === 3. FEATURE FLAGS ===
    enableTooltips: true,
    enableHover: true,
    enableColorManager: false,
    enableWahlmodule: false,
    enableKPCounter: true,

    // === 4. ERWEITERTE FEATURES ===
    // KP-Counter Config
    kpCounterConfig: {
        requiredKP: 180,
        showDetailedBreakdown: false,
        enableCategoryTracking: true,
    },

    // === 5. LAYOUT-SPEZIFISCHE CONFIG ===
    // Aspekt-Verhältnisse für verschiedene Module
    aspectRatios: {
        "Optische, Elektronische & Magnetische Eigenschaften": 2.5,
        "Quantenmechanik & Festkörperphysik I": 2.0,
        "Quantenmechanik & Festkörperphysik II": 2.0,
        "Thermodynamik & Phasenumwandlung": 2.0,
        "Materialwissenschaftliche Grundlagen I": 2.0,
        "Materialwissenschaftliche Grundlagen II": 2.0,
        "Thermische & Transporteigenschaften": 2.0,
        "GESS: Wissenschaft im Kontext": 2.0
    },

    // === 6. KATEGORIEN ===
    kategorien: [
        { name: "Obligatorische Fächer", klasse: "obligatorisch" },
        { name: "Obligatorische Praktikum", klasse: "praktikum" },
        { name: "Wissenschaftliche Arbeit", klasse: "wissenschaft" }
    ],

    kategorieZuKlasse: {
        "Obligatorische Fächer": "obligatorisch",
        "Obligatorische Praktikum": "praktikum",
        "Wissenschaftliche Arbeit": "wissenschaft"
    }
};
