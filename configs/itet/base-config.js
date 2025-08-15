/* ==== ITET BASE CONFIG - KATEGORIE FIX ==== */
/* Ersetze die kategorien Array in configs/itet/base-config.js */

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
    
    // GEÄNDERT: Kategorien als Objekte mit hasTooltip flag
    kategorien: [
        { name: "Obligatorische Fächer", klasse: "obligatorisch" },
        { name: "Obligatorische Praktikum", klasse: "obligatorisch-praktikum" },
        { 
            name: "Wahl Praktika-Projekte-Seminare", 
            klasse: "wahl-praktika-projekte",
            hasTooltip: true,  // WICHTIG: Aktiviert Drag & Drop Tooltip
            info: "Ziehe Module aus der Liste in deine Praktika-Boxen"
        },
        { name: "Kernfächer nach Schwerpunkt", klasse: "kern" },
        { name: "Wahlfächer", klasse: "wahl" },
        { name: "Wissenschaftliche Arbeit", klasse: "wissenschaft" },
        { name: "Weitere Wahl-Grundlagenfächer", klasse: "weitere-wahl-grundlagen" }
    ],
    
    kategorieZuKlasse: {
        "obligatorisch": "obligatorisch",
        "obligatorisch-praktikum": "obligatorisch-praktikum",
        "wahl-praktika-projekte": "wahl-praktika-projekte",
        "kern": "kern",
        "wahl": "wahl",
        "wissenschaft": "wissenschaft",
        "weitere-wahl-grundlagen": "weitere-wahl-grundlagen"
    }
};