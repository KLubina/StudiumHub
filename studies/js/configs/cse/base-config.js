/* ==== CSE BASE CONFIGURATION ==== */
/* Grundlegende Konfiguration für den CSE Studiengang */

window.StudiengangBaseConfig = {
    // Grundlegende Informationen
    title: "BSc Computational Science and Engineering (CSE)",
    subtitle: "mind. 180 KP insgesamt",
    legendTitle: "Farben-Legende",
    creditUnit: "KP",
    
    // Layout-Konfiguration
    layout: "years",
    moduleSizing: "proportional",
    basisArea: 2000,
    defaultAspectRatio: 1.5,
    layoutClass: "layout-bereich",
    
    // Features
    enableTooltips: true,
    enableHover: true,
    
    // KP-Counter zentral aktivieren
    enableKPCounter: true,
    kpCounterConfig: {
        requiredKP: 180,
        showDetailedBreakdown: false,
        enableCategoryTracking: true
    },
    
    // NEU: Wahlmodul-System aktivieren
    enableWahlmodule: true,
    
    // Aspekt-Verhältnisse
    aspectRatios: {
        "longName": 2.0,
        "specialModule": 2.5
    },
    
    // Bereiche-Reihenfolge für 3. Jahr
    bereicheReihenfolge: ["Kernfächer", "Vertiefungsgebiet", "Wahlfächer", "Abschluss"],
    
    // Prüfungsblöcke (spezifisch für CSE)
    pruefungsbloecke: [
        {
            name: "Basisprüfungsblock 1",
            module: [
                { name: "Lineare Algebra", ng: 1 },
                { name: "Informatik", ng: 1 },
                { name: "Diskrete Mathematik", ng: 1 }
            ],
            cssClass: "basis1"
        },
        {
            name: "Basisprüfungsblock 2",
            module: [
                { name: "Analysis I und II", ng: 3 },
                { name: "Physik I und II", ng: 2 },
                { name: "Mathematische Methoden (ehem. Komplexe Analysis)", ng: 1 },
                { name: "Datenstrukturen und Algorithmen", ng: 2 },
                { name: "Chemie", ng: 1 }
            ],
            cssClass: "basis2"
        },
        {
            name: "Prüfungsblock G1",
            module: [
                { name: "Analysis III", ng: 1 },
                { name: "Introduction to Mathematical Optimization", ng: 1 },
                { name: "Numerische Methoden für CSE", ng: 2 }
            ],
            cssClass: "block-g1"
        },
        {
            name: "Prüfungsblock G2", 
            module: [
                { name: "Programmiertechniken für physikalische Simulationen", ng: 1 },
                { name: "Systems Programming and Computer Architecture", ng: 1 }
            ],
            cssClass: "block-g2"
        },
        {
            name: "Prüfungsblock G3",
            module: [
                { name: "Numerical Methods for Partial Differential Equations", ng: 2 },
                { name: "Wahrscheinlichkeitstheorie und Statistik (ehem. Stochastik)", ng: 1 }
            ],
            cssClass: "block-g3"
        },
        {
            name: "Prüfungsblock G4",
            module: [
                { name: "Fluid Dynamics I", ng: 1 },
                { name: "Statistische Physik und Computer Simulation", ng: 1 }
            ],
            cssClass: "block-g4"
        }
    ],
    
    // Standard Kategorien (zusätzlich zu Prüfungsblöcken)
    kategorien: [
        { name: "Wissenschaftliche Arbeit", klasse: "wissenschaftliche-arbeit" },
        { name: "Kernfächer", klasse: "kern", info: "3 von 4 möglichen auswählen" },
        { 
            name: "Wahlfächer", 
            klasse: "wahl", 
            info: "mind. zwei Module", 
            hasTooltip: true 
        },
        { 
            name: "Vertiefungsgebiet", 
            klasse: "vertiefung", 
            info: "2 Module aus einem Gebiet auswählen", 
            hasTooltip: true 
        }
    ],
    
    kategorieZuKlasse: {
        "wissenschaftliche-arbeit": "wissenschaftliche-arbeit",
        "kern": "kern",
        "wahl": "wahl", 
        "vertiefung": "vertiefung"
    },
    
    // NEU: Wahlmodule-Daten für das zentrale System
    wahlmoduleData: {
        // Vertiefungsgebiete als Wahlmodule-Bereiche
        vertiefungsgebiete: {
            "Robotik": [],
            "Astrophysik": [],
            "Atmosphärenphysik": [],
            "Chemie": [],
            "Fluiddynamik": [],
            "Systems and Control": [],
            "Physik": [],
            "Computational Finance": [],
            "Electromagnetics": [],
            "Geophysik": [],
            "Biologie": []
        },
        
        // Wahlfächer nach Semester
        wahlfaecherBereiche: {
            "Frühlingssemester 2025": [],
            "Herbstsemester 2024": []
        }
    }
};