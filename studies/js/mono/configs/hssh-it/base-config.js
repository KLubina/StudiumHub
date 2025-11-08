/* ==== IT BASE CONFIGURATION - STANDARDISIERT ==== */
/* Grundlegende Konfiguration für den Information Technology B.Sc. Studiengang */

window.StudiengangBaseConfig = {
    // === 1. BASIC INFO ===
    title: "BSc Information Technology",
    legendTitle: "Farben-Legende",
    creditUnit: "ECTS",
    
    // === 2. LAYOUT CONFIG ===
    layout: "years",
    moduleSizing: "proportional",
    basisArea: 2200,
    defaultAspectRatio: 1.4,
    
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
        "longName": 2.0,
        "Transfer Project": 1.8,
        "Action Learning and Action Research": 2.5,
        "Bachelorarbeit": 3.0
    },
    
    // === 6. KATEGORIEN ===
    kategorien: [
        { name: "Grundlagen & Cornerstone", klasse: "grundlagen" },
        { name: "Programmierung & Software Engineering", klasse: "programmierung" },
        { name: "Kommunikation & Persönlichkeitsentwicklung", klasse: "kommunikation" },
        { name: "Transfer Projects", klasse: "transfer" },
        { name: "Spezialisierung & Schwerpunkt", klasse: "spezialisierung" },
        { name: "Wahlpflichtfächer", klasse: "wahlpflicht" },
        { name: "Abschluss & Forschung", klasse: "abschluss" }
    ],
    
    kategorieZuKlasse: {
        "grundlagen": "grundlagen",
        "programmierung": "programmierung", 
        "kommunikation": "kommunikation",
        "transfer": "transfer",
        "spezialisierung": "spezialisierung",
        "wahlpflicht": "wahlpflicht",
        "abschluss": "abschluss"
    }
};