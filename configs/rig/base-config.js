/* ==== RIG BASE CONFIGURATION ==== */
/* Grundlegende Konfiguration für den Raumbezogene Ingenieurwissenschaften Studiengang */

window.StudiengangBaseConfig = {
    // Grundlegende Informationen
    title: "BSc Raumbezogene Ingenieurwissenschaften",
    subtitle: "mind. 180 KP insgesamt - ETH Zürich",
    legendTitle: "Farben-Legende",
    creditUnit: "KP",
    
    // Layout-Konfiguration
    layout: "years",
    moduleSizing: "proportional",
    basisArea: 2200,
    defaultAspectRatio: 1.4,
    
    // Features
    enableTooltips: false,
    enableHover: true,
    
    // Aspekt-Verhältnisse für verschiedene Module
    aspectRatios: {
        "longName": 2.0,
        "Bachelor-Arbeit": 2.8,
        "Wahlmodule": 2.2
    },
    
    // Kategorien basierend auf dem PDF
    kategorien: [
        { name: "Grundlagenfächer Basisprüfung", klasse: "grundlagen" },
        { name: "Obligatorische Fächer, Prüfungsblöcke 1-3", klasse: "obligatorisch" },
        { name: "Wahlmodule (3 aus 6)", klasse: "wahlmodule" },
        { name: "Freie Wahl + SIP", klasse: "freie-wahl" },
        { name: "Selbständige Arbeiten", klasse: "selbstaendig" }
    ],
    
    kategorieZuKlasse: {
        "grundlagen": "grundlagen",
        "obligatorisch": "obligatorisch",
        "wahlmodule": "wahlmodule",
        "freie-wahl": "freie-wahl",
        "selbstaendig": "selbstaendig"
    }
};