/* ==== ZHAW CS BASE CONFIGURATION ==== */
/* Grundlegende Konfiguration für den Computer Science B.Sc. Studiengang an der ZHAW */

window.StudiengangBaseConfig = {
    // Grundlegende Informationen
    title: "BSc Computer Science - ZHAW",
    subtitle: "mind. 180 ECTS insgesamt - 6 Semester",
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
        "longName": 2.0,
        "Bachelorarbeit in Informatik": 2.8,
        "Projektarbeit in Informatik": 2.2
    },
    
    // Kategorien und ihre CSS-Klassen
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