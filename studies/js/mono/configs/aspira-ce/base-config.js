/* ==== CE BASE CONFIGURATION - STANDARDISIERT ==== */
/* Grundlegende Konfiguration für den Computer Engineering B.Sc. Studiengang (Aspira) */

window.StudiengangBaseConfig = {
    // === 1. BASIC INFO ===
    title: "BSc Computer Engineering",
    legendTitle: "Farben-Legende",
    creditUnit: "ECTS",
    
    // === 2. LAYOUT CONFIG ===
    layout: "years",
    moduleSizing: "proportional",
    basisArea: 2000,
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
        "longName": 2.2,
        "Final Project": 2.8,
        "Web Development": 2.0,
        "Mobile Application Development": 2.0
    },
    
    // === 6. KATEGORIEN ===
    kategorien: [
        { name: "Mathematics & Foundations", klasse: "foundations" },
        { name: "Programming & Software Development", klasse: "programming" },
        { name: "Systems & Networks", klasse: "systems" },
        { name: "Web & Mobile Development", klasse: "webmobile" },
        { name: "Security & Analysis", klasse: "security" },
        { name: "Professional Skills", klasse: "professional" },
        { name: "Final Project", klasse: "project" }
    ],
    
    kategorieZuKlasse: {
        "foundations": "foundations",
        "programming": "programming",
        "systems": "systems", 
        "webmobile": "webmobile",
        "security": "security",
        "professional": "professional",
        "project": "project"
    }
};