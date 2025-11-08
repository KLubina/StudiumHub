/* ==== PHYSIK BASE CONFIGURATION ==== */
/* Grundlegende Konfiguration für den Physik Studiengang */

window.StudiengangBaseConfig = {
    // === 1. BASIC INFO ===
    title: "BSc Physik",
    legendTitle: "Farben-Legende",
    creditUnit: "KP",

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
        "Mathematische Methoden der Physik I": 2.0,
        "Mathematische Methoden der Physik II": 2.0,
        "Experimentelle oder theoretische Arbeit": 2.5,
        "Kernfach II (experimentell oder theoretisch)": 2.5,
        "GESS: Wissenschaft im Kontext": 2.0,
        "Kernfach I (experimentell)": 2.0
    },

    // === 6. KATEGORIEN ===
    kategorien: [
        { name: "Basisprüfungsblock 1", klasse: "basis1" },
        { name: "Basisprüfungsblock 2", klasse: "basis2" },
        { name: "Prüfungsblock I", klasse: "pruefung1" },
        { name: "Prüfungsblock IIa", klasse: "pruefung2a" },
        { name: "Prüfungsblock IIb", klasse: "pruefung2b" },
        { name: "Obligatorische Fächer", klasse: "obligatorisch" },
        { name: "Praktika", klasse: "praktikum" },
        {
            name: "Kernfächer",
            klasse: "kernfach",
            info: "Experimentalphysikalische und theoretische Kernfächer",
            hasTooltip: true
        },
        {
            name: "Wahlfächer",
            klasse: "wahl",
            info: "Wahlfächer aus dem Physik- oder verwandten Bereichen",
            hasTooltip: true
        },
        { name: "Wissenschaft im Kontext", klasse: "gess" },
        { name: "Wissenschaftliche Arbeit", klasse: "wissenschaft" }
    ],

    kategorieZuKlasse: {
        "Basisprüfungsblock 1": "basis1",
        "Basisprüfungsblock 2": "basis2",
        "Prüfungsblock I": "pruefung1",
        "Prüfungsblock IIa": "pruefung2a",
        "Prüfungsblock IIb": "pruefung2b",
        "Obligatorische Fächer": "obligatorisch",
        "Praktika": "praktikum",
        "Kernfächer": "kernfach",
        "Wahlfächer": "wahl",
        "Wissenschaft im Kontext": "gess",
        "Wissenschaftliche Arbeit": "wissenschaft"
    }
};
