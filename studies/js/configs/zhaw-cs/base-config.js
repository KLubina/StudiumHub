/* ==== ZHAW-CS BASE CONFIGURATION - STANDARDISIERT ==== */
/* Grundlegende Konfiguration für den Computer Science B.Sc. Studiengang an der ZHAW */

window.StudiengangBaseConfig = {
    // === 1. BASIC INFO ===
    title: "BSc Computer Science",
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
        "longName": 2.0,
        "Bachelorarbeit in Informatik": 2.8,
        "Projektarbeit in Informatik": 2.2
    },
    
    // === 6. KATEGORIEN ===
    kategorien: [
        { name: "Kontextmodule", klasse: "kontext" },
        { name: "Projektmodule", klasse: "projekt" },
        { name: "Fachmodule", klasse: "fach" },
        { name: "Mathematisch-Naturwiss. Module", klasse: "mathe-nawi" }
    ],
    
    kategorieZuKlasse: {
        "kontext": "kontext",
        "projekt": "projekt", 
        "fach": "fach",
        "mathe-nawi": "mathe-nawi"
    }
};