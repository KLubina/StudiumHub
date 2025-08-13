/* ==== ITET BASE CONFIGURATION ==== */
/* Grundlegende Konfiguration für den ITET Studiengang */

window.StudiengangBaseConfig = {
    // Grundlegende Informationen
    title: "BSc Informationstechnologie und Elektrotechnik",
    subtitle: "mind. 180 KP insgesamt",
    legendTitle: "Farben-Legende",
    creditUnit: "KP",
    
    // Layout-Konfiguration
    layout: "years",
    moduleSizing: "proportional",
    basisArea: 2000,
    defaultAspectRatio: 1.5,
    
    // Features
    enableTooltips: true,
    enableHover: true,
    
    // Aspekt-Verhältnisse für verschiedene Module
    aspectRatios: {
        "longModuleName": 2.0
    },
    
    // Kategorien und ihre CSS-Klassen
    kategorien: [
        "Obligatorische Fächer",
        "Obligatorische Praktikum",
        "Wahl Praktika-Projekte-Seminare",
        "Kernfächer nach Schwerpunkt",
        "Wahlfächer",
        "Wissenschaftliche Arbeit",
        "Weitere Wahl-Grundlagenfächer"
    ],
    
    kategorieZuKlasse: {
        "Obligatorische Fächer": "obligatorisch",
        "Obligatorische Praktikum": "obligatorisch-praktikum",
        "Wahl Praktika-Projekte-Seminare": "wahl-praktika-projekte",
        "Kernfächer nach Schwerpunkt": "kern",
        "Wahlfächer": "wahl",
        "Wissenschaftliche Arbeit": "wissenschaft",
        "Weitere Wahl-Grundlagenfächer": "weitere-wahl-grundlagen"
    }
};