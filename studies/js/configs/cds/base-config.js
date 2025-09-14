/* ==== CDS BASE CONFIGURATION ==== */
/* Grundlegende Konfiguration für den Computational and Data Science Studiengang */

window.StudiengangBaseConfig = {
    // Grundlegende Informationen
    title: "BSc Computational and Data Science",
    legendTitle: "Farben-Legende",
    creditUnit: "ECTS",
    
    // Layout-Konfiguration
    layout: "years",
    moduleSizing: "proportional",
    basisArea: 1800,
    defaultAspectRatio: 1.4,
    
    // Features
    enableTooltips: false,
    enableHover: true,
    
    // Aspekt-Verhältnisse für verschiedene Module
    aspectRatios: {
        "Bachelor Thesis": 2.5,
        "Projektarbeit Computational and Data Science": 2.2,
        "Wissenschaftliches Arbeiten und Exposé zur Bachelorarbeit": 2.8,
        "Fachpraktikum": 2.0
    },
    
    // Kategorien und ihre CSS-Klassen
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