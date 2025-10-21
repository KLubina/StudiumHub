/* ==== MASCHINENINGENIEURWISSENSCHAFTEN BASE CONFIGURATION ==== */
/* Grundlegende Konfiguration für den Maschineningenieurwissenschaften Studiengang */

window.StudiengangBaseConfig = {
    // === 1. BASIC INFO ===
    title: "BSc Maschineningenieurwissenschaften",
    legendTitle: "Farben-Legende",
    creditUnit: "ECTS",

    // === 2. LAYOUT CONFIG ===
    layout: "years",
    moduleSizing: "proportional",
    basisArea: 2500,
    defaultAspectRatio: 1.5,

    // === 3. FEATURE FLAGS ===
    enableTooltips: false,
    enableHover: true,
    enableColorManager: false,
    enableWahlmodule: false,
    enableKPCounter: false,

    // === 4. ERWEITERTE FEATURES ===
    // (keine, da alle Flags false sind)

    // === 5. LAYOUT-SPEZIFISCHE CONFIG ===
    // Aspekt-Verhältnisse für verschiedene Module
    aspectRatios: {
        "Engineering Design and Material Selection": 2.0,
        "Stochastics and Machine Learning": 2.0,
        "Wissenschaft im Kontext": 2.0
    },

    // === 6. KATEGORIEN ===
    kategorien: [
        { name: "Obligatorische Fächer", klasse: "obligatorisch" },
        { name: "Obligatorische Praktikum", klasse: "praktikum" },
        { name: "Wahlfächer", klasse: "wahl" },
        { name: "Fokus-Vertiefung", klasse: "vertiefung" },
        { name: "Wissenschaftliche Arbeit", klasse: "wissenschaft" }
    ],

    kategorieZuKlasse: {
        "Obligatorische Fächer": "obligatorisch",
        "Obligatorische Praktikum": "praktikum",
        "Wahlfächer": "wahl",
        "Fokus-Vertiefung": "vertiefung",
        "Wissenschaftliche Arbeit": "wissenschaft"
    }
};
