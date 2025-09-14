/* ==== CS BASE CONFIGURATION ==== */
/* Grundlegende Konfiguration für den CS Studiengang */

window.StudiengangBaseConfig = {
    // Grundlegende Informationen
    title: "BSc Informatik",
    legendTitle: "Farben-Legende",
    creditUnit: "KP",
    
    // Layout-Konfiguration
    layout: "years", 
    moduleSizing: "proportional",
    basisArea: 2500,
    defaultAspectRatio: 1.5,
    
    // Features
    enableTooltips: false,
    enableHover: true,
    
    // Aspekt-Verhältnisse für verschiedene Module
    aspectRatios: {
        "longName": 2.0,
        "specialModule": 3.0,
        "category:spezialisierung": 3.0
    },
    
    // Kategorien und ihre CSS-Klassen
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