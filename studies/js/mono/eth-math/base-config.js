/* ==== MATH BASE CONFIGURATION - STANDARDISIERT ==== */
/* Grundlegende Konfiguration für den Mathematik Studiengang */

window.StudiengangBaseConfig = {
    // === 1. BASIC INFO ===
    title: "BSc Mathematik",
    legendTitle: "Farben-Legende",
    creditUnit: "KP",
    
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
        "longModuleName": 2.0,
        "specialModule": 2.5
    },
    
    // === 6. KATEGORIEN ===
    kategorien: [
        { name: "Obligatorische Fächer", klasse: "obligatorisch" },
        { name: "Ergänzungsfächer", klasse: "ergaenzung" },
        { name: "Wahlfächer", klasse: "wahl" },
        { name: "Kernfächer", klasse: "kern" },
        { name: "Wahlpflichtfächer", klasse: "wahlpflicht" },
        { name: "Wissenschaftliche Arbeit", klasse: "wissenschaft" }
    ],
    
    kategorieZuKlasse: {
        "Obligatorische Fächer": "obligatorisch",
        "Ergänzungsfächer": "ergaenzung",
        "Wahlfächer": "wahl",
        "Kernfächer": "kern",
        "Wahlpflichtfächer": "wahlpflicht",
        "Wissenschaftliche Arbeit": "wissenschaft"
    }
};