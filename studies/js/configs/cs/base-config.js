/* ==== CS BASE CONFIGURATION - STANDARDISIERT ==== */
/* Grundlegende Konfiguration für den CS Studiengang */

window.StudiengangBaseConfig = {
    // === 1. BASIC INFO ===
    title: "BSc Informatik",
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
        "longName": 2.0,
        "specialModule": 3.0,
        "category:spezialisierung": 3.0
    },
    
    // === 6. KATEGORIEN ===
    kategorien: [
        { name: "Pure CS-Module", klasse: "cs-pure" },
        { name: "CS und CSE-Module", klasse: "cs-cse" },
        { name: "CS und CSE-Module aufgrund von CSE-Wahlmodule", klasse: "cs-cse-wahl" },
        { name: "Gemeinsame Mathematik-Module", klasse: "math" }
    ],
    
    kategorieZuKlasse: {
        "cs-pure": "cs-pure",
        "cs-cse": "cs-cse", 
        "cs-cse-wahl": "cs-cse-wahl",
        "math": "math",
        "wahlpflicht": "wahlpflicht",
        "wahlfaecher": "wahlfaecher",
        "wissenschaft": "wissenschaft",
        "algo": "algo",
        "spezialisierung": "spezialisierung",
        "ergaenzung": "ergaenzung"
    }
};