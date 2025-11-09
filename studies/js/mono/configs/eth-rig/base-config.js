/* ==== RIG BASE CONFIGURATION - STANDARDISIERT ==== */
/* Grundlegende Konfiguration für den Raumbezogene Ingenieurwissenschaften Studiengang */

window.StudiengangBaseConfig = {
    // === 1. BASIC INFO ===
    title: "BSc Raumbezogene Ingenieurwissenschaften",
    legendTitle: "Farben-Legende",
    creditUnit: "KP",
    
    // === 2. LAYOUT CONFIG ===
    layout: "years",
    moduleSizing: "proportional",
    basisArea: 2200,
    defaultAspectRatio: 1.4,
    
    // === 3. FEATURE FLAGS ===
    enableTooltips: true,
    enableHover: true,
    enableColorManager: false,
    enableWahlmodule: true,
    enableKPCounter: true,
    
    // === 4. ERWEITERTE FEATURES ===
    // KP-Counter Config
    kpCounterConfig: {
        requiredKP: 180,
        showDetailedBreakdown: false,
        enableCategoryTracking: true
    },
    
    // === 5. LAYOUT-SPEZIFISCHE CONFIG ===
    // Aspekt-Verhältnisse für verschiedene Module
    aspectRatios: {
        "longName": 2.0,
        "Bachelor-Arbeit": 2.8,
        "Wahlmodule": 2.2
    },
    
    // === 6. KATEGORIEN ===
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
        // Direkte Mappings (für Module mit kurzen Kategorie-Namen)
        "grundlagen": "grundlagen",
        "obligatorisch": "obligatorisch",
        "wahlmodule": "wahlmodule",
        "freie-wahl": "freie-wahl",
        "selbstaendig": "selbstaendig",

        // Lange Namen Mappings (für Legende)
        "Grundlagenfächer Basisprüfung": "grundlagen",
        "Obligatorische Fächer, Prüfungsblöcke 1-3": "obligatorisch",
        "Wahlmodule (3 aus 6)": "wahlmodule",
        "Freie Wahl + SIP": "freie-wahl",
        "Selbständige Arbeiten": "selbstaendig"
    }
};