/* ==== CSE BASE CONFIGURATION - VEREINFACHT ==== */
/* Grundlegende Konfiguration für den CSE Studiengang */

window.StudiengangBaseConfig = {
    // Grundlegende Informationen
    title: "BSc Computational Science and Engineering",
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
    enableKPCounter: true,
    enableWahlmodule: true,
    enableColorManager: true, // NEU: ColorManager aktivieren
    
    // KP-Counter Konfiguration
    kpCounterConfig: {
        requiredKP: 180,
        showDetailedBreakdown: false,
        enableCategoryTracking: true
    },
    
    // Aspekt-Verhältnisse
    aspectRatios: {
        "longName": 2.0,
        "specialModule": 2.5
    },
    
    // Bereiche-Reihenfolge für 3. Jahr
    bereicheReihenfolge: ["Kernfächer", "Vertiefungsgebiet", "Wahlfächer", "Abschluss"],
    
    // Prüfungsblöcke (vereinfacht für CSE - ohne Moduldetails)
    pruefungsbloecke: [
        {
            name: "Basisprüfungsblock 1",
            module: [],
            cssClass: "basis1"
        },
        {
            name: "Basisprüfungsblock 2",
            module: [],
            cssClass: "basis2"
        },
        {
            name: "Prüfungsblock G1",
            module: [],
            cssClass: "block-g1"
        },
        {
            name: "Prüfungsblock G2", 
            module: [],
            cssClass: "block-g2"
        },
        {
            name: "Prüfungsblock G3",
            module: [],
            cssClass: "block-g3"
        },
        {
            name: "Prüfungsblock G4",
            module: [],
            cssClass: "block-g4"
        }
    ],
    
    // Kategorien
    kategorien: [
        { name: "Wissenschaftliche Arbeit", klasse: "wissenschaftliche-arbeit" },
        { 
            name: "Kernfächer", 
            klasse: "kern", 
            info: "3 von 4 möglichen auswählen", 
            hasTooltip: true 
        },
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
    
    // Wahlmodule-Daten - Kompatibel mit Wahlmodule-System
    wahlmoduleData: {
        // Kernfächer aus cse-wahlmodule-data.js
        kernfaecherSchwerpunkte: {
            "Alle Kernfächer": [
                {
                    name: "Design of High Performance Computing",
                    kp: 7,
                    kategorie: "kern",
                    themenbereich: "informatik",
                    jahr: 3,
                    semester: 0,
                    bereich: "Kernfächer"
                },
                {
                    name: "HPC Lab for CSE",
                    kp: 7,
                    kategorie: "kern",
                    themenbereich: "informatik",
                    jahr: 3,
                    semester: 0,
                    bereich: "Kernfächer"
                },
                {
                    name: "Software Engineering",
                    kp: 6,
                    kategorie: "kern",
                    themenbereich: "informatik",
                    jahr: 3,
                    semester: 0,
                    bereich: "Kernfächer"
                },
                {
                    name: "Introduction to Machine Learning",
                    kp: 8,
                    kategorie: "kern",
                    themenbereich: "informatik",
                    jahr: 3,
                    semester: 0,
                    bereich: "Kernfächer"
                }
            ]
        },
        // Vertiefungsgebiete - werden dynamisch geladen
        vertiefungsgebiete: {},
        // Wahlfächer - werden dynamisch geladen  
        wahlfaecherBereiche: {},

        // Kompatibilitätsfunktion für Wahlmodule-System
        getAllWahlmoduleData: function() {
            const data = {
                kernfaecherSchwerpunkte: this.kernfaecherSchwerpunkte,
                vertiefungsgebiete: {},
                wahlfaecherBereiche: {},
                wahlmoduleBereiche: {}
            };

            // Vertiefungsgebiete dynamisch aus separater Datei laden
            if (window.CSE_VertiefungsgebieteModules) {
                const kategorien = [...new Set(window.CSE_VertiefungsgebieteModules.map(m => m.kategorie_vertiefung))];
                kategorien.forEach(kategorie => {
                    data.vertiefungsgebiete[kategorie] = window.CSE_VertiefungsgebieteModules.filter(m => m.kategorie_vertiefung === kategorie);
                });
            }

            // Wahlfächer aus separater Datei laden
            if (window.CSE_WahlfaecherModules) {
                data.wahlfaecherBereiche["Alle Wahlfächer"] = window.CSE_WahlfaecherModules;
            }

            return data;
        }
    }
};