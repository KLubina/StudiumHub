/* ==== COMPUTER ENGINEERING BASE CONFIGURATION ==== */
/* Grundlegende Konfiguration für den Computer Engineering B.Sc. Studiengang (Aspira) */

window.StudiengangBaseConfig = {
    // Grundlegende Informationen
    title: "BSc Computer Engineering ",
    legendTitle: "Farben-Legende",
    creditUnit: "ECTS",
    
    // Layout-Konfiguration
    layout: "years",
    moduleSizing: "proportional",
    basisArea: 2000,
    defaultAspectRatio: 1.5,
    
    // Features
    enableTooltips: false,
    enableHover: true,
    
    // Aspekt-Verhältnisse für verschiedene Module
    aspectRatios: {
        "longName": 2.2,
        "Final Project": 2.8,
        "Web Development": 2.0,
        "Mobile Application Development": 2.0
    },
    
    // Kategorien und ihre CSS-Klassen
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