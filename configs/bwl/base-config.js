/* ==== BWL BASE CONFIGURATION ==== */
/* Grundlegende Konfiguration für den BWL HSG Studiengang */

window.StudiengangBaseConfig = {
    // Grundlegende Informationen
    title: "BA BWL Studium an der HSG",
    subtitle: "mind. 180 ECTS insgesamt",
    legendTitle: "Farben-Legende",
    creditUnit: "ECTS",
    
    // Layout-Konfiguration
    layout: "years",
    moduleSizing: "fixed",
    useEctsBasedSizing: true,
    baseWidth: 160,
    baseHeight: 80,
    
    // Spezielle Flags
    assessmentJahr: true,
    hauptstudium: true,
    
    // Features
    enableTooltips: false,
    enableHover: true,
    
    // Bereiche-Reihenfolge für 2. Jahr
    bereicheReihenfolge: ["Pflichtbereich", "Pflichtwahlbereich", "Kontextstudium", "Bachelor"],
    
    // Kategorien und ihre CSS-Klassen
    kategorien: [
        { name: "BWL & Management Kernfächer", klasse: "kernfach" },
        { name: "Methodenfächer (Mathe, Statistik, Informatik)", klasse: "methoden" },
        { name: "Grundlagenfächer (VWL, Recht)", klasse: "grundlagen" },
        { name: "Kontextstudium", klasse: "kontext" },
        { name: "Bachelor-Arbeit", klasse: "bachelor" }
    ],
    
    kategorieZuKlasse: {
        "kernfach": "kernfach",
        "methoden": "methoden",
        "grundlagen": "grundlagen",
        "kontext": "kontext",
        "bachelor": "bachelor"
    }
};