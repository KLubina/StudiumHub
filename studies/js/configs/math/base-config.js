/* ==== MATH BASE CONFIGURATION ==== */
/* Grundlegende Konfiguration für den Mathematik Studiengang */

window.StudiengangBaseConfig = {
    // Grundlegende Informationen
    title: "BSc Mathematik",
    legendTitle: "Farben-Legende",
    creditUnit: "KP",
    
    // Layout-Konfiguration
    layout: "years",
    moduleSizing: "proportional",
    basisArea: 2500,
    defaultAspectRatio: 1.5,
    
    // Features
    enableTooltips: false,
    enableHover: true,
    
    // Aspekt-Verhältnisse für verschiedene Module
    aspectRatios: {
        "longModuleName": 2.0,
        "specialModule": 2.5
    },
    
    // Kategorien und ihre CSS-Klassen
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