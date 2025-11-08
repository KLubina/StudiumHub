/* ==== CDS BASE CONFIGURATION - STANDARDISIERT ==== */
/* Grundlegende Konfiguration für den Computational and Data Science Studiengang */

window.StudiengangBaseConfig = {
    // === 1. BASIC INFO ===
    title: "BSc Computational and Data Science",
    legendTitle: "Farben-Legende",
    creditUnit: "ECTS",
    
    // === 2. LAYOUT CONFIG ===
    layout: "years",
    moduleSizing: "proportional",
    basisArea: 1800,
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
        "Bachelor Thesis": 2.5,
        "Projektarbeit Computational and Data Science": 2.2,
        "Wissenschaftliches Arbeiten und Exposé zur Bachelorarbeit": 2.8,
        "Fachpraktikum": 2.0
    },
    
    // === 6. KATEGORIEN ===
    kategorien: [
        { name: "Computational and Data Science-Grundlagen", klasse: "grundlagen" },
        { name: "Computational and Data Science-Schwerpunkte", klasse: "schwerpunkte" },
        { name: "Wahlmodul", klasse: "wahlmodul" },
        { name: "Labor", klasse: "labor" },
        { name: "Projektarbeit", klasse: "projektarbeit" }
    ],
    
    kategorieZuKlasse: {
        "grundlagen": "grundlagen",
        "schwerpunkte": "schwerpunkte",
        "wahlmodul": "wahlmodul", 
        "labor": "labor",
        "projektarbeit": "projektarbeit"
    }
};