/* ==== RIG BASE CONFIGURATION - VEREINFACHT MIT ZENTRALEM WAHLMODULE-SYSTEM ==== */
/* Grundlegende Konfiguration für den Raumbezogene Ingenieurwissenschaften Studiengang */

window.StudiengangBaseConfig = {
    // Grundlegende Informationen
    title: "BSc Raumbezogene Ingenieurwissenschaften",
    legendTitle: "Farben-Legende",
    creditUnit: "KP",
    
    // Layout-Konfiguration
    layout: "years",
    moduleSizing: "proportional",
    basisArea: 2200,
    defaultAspectRatio: 1.4,
    
    // Features
    enableTooltips: true,
    enableHover: true,
    
    // NEU: Zentrales Wahlmodule-System aktivieren
    enableWahlmodule: true,
    
    // KP-Counter aktivieren
    enableKPCounter: true,
    kpCounterConfig: {
        requiredKP: 180,
        showDetailedBreakdown: false,
        enableCategoryTracking: true
    },
    
    // Aspekt-Verhältnisse für verschiedene Module
    aspectRatios: {
        "longName": 2.0,
        "Bachelor-Arbeit": 2.8,
        "Wahlmodule": 2.2
    },
    
    // Kategorien mit hasTooltip für Wahlmodule-Auswahl
    kategorien: [
        { name: "Grundlagenfächer Basisprüfung", klasse: "grundlagen" },
        { name: "Obligatorische Fächer, Prüfungsblöcke 1-3", klasse: "obligatorisch" },
        { 
            name: "Wahlmodule (3 aus 6)", 
            klasse: "wahlmodule", 
            hasTooltip: true,
            info: "💡 Wähle 3 aus 6 Bereichen!",
            description: "Drag & Drop Wahlmodule",
            minKp: 45
        },
        { name: "Freie Wahl + SIP", klasse: "freie-wahl" },
        { name: "Selbständige Arbeiten", klasse: "selbstaendig" }
    ],
    
    kategorieZuKlasse: {
        "Grundlagenfächer Basisprüfung": "grundlagen",
        "Obligatorische Fächer, Prüfungsblöcke 1-3": "obligatorisch",
        "Wahlmodule (3 aus 6)": "wahlmodule",
        "Freie Wahl + SIP": "freie-wahl",
        "Selbständige Arbeiten": "selbstaendig"
    }
};