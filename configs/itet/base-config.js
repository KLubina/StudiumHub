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
    enableTooltips: true,  // WICHTIG: Muss true sein für Drag & Drop
    enableHover: true,
    
    // Aspekt-Verhältnisse für verschiedene Module
    aspectRatios: {
        "longModuleName": 2.0
    },
    
    // Kategorien und ihre CSS-Klassen - OBJEKT FORMAT für Drag & Drop
    kategorien: [
        { name: "Obligatorische Fächer", klasse: "obligatorisch" },
        { name: "Obligatorische Praktikum", klasse: "obligatorisch-praktikum" },
        { 
            name: "Wahl Praktika-Projekte-Seminare", 
            klasse: "wahl-praktika-projekte",
            hasTooltip: true,  // WICHTIG: Aktiviert Drag & Drop
            info: "💡 Ziehe Module aus der Liste!"
        },
        { name: "Kernfächer nach Schwerpunkt", klasse: "kern" },
        { name: "Wahlfächer", klasse: "wahl" },
        { name: "Wissenschaftliche Arbeit", klasse: "wissenschaft" },
        { name: "Weitere Wahl-Grundlagenfächer", klasse: "weitere-wahl-grundlagen" }
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