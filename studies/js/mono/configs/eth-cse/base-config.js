/* ==== CSE BASE CONFIGURATION - STANDARDISIERT ==== */
/* Grundlegende Konfiguration für den CSE Studiengang */

window.StudiengangBaseConfig = {
    // === 1. BASIC INFO ===
    title: "BSc Computational Science and Engineering",
    legendTitle: "Farben-Legende",
    creditUnit: "KP",

    // === 2. LAYOUT CONFIG ===
    layout: "years",
    moduleSizing: "proportional",
    basisArea: 2000,
    defaultAspectRatio: 1.5,

    // === 3. FEATURE FLAGS ===
    enableTooltips: true,
    enableHover: true,
    enableColorManager: true,
    enableWahlmodule: true,
    enableKPCounter: true,

    // === 4. ERWEITERTE FEATURES ===
    // ColorManager Config
    coloringModes: {
        pruefungsblock: "Prüfungsblöcken",
        themenbereich: "Themenbereichen",
    },
    defaultColoringMode: "pruefungsblock",

    // HINWEIS: Farb-Zuordnungen (Themenbereiche & Prüfungsblöcke) sind in color-config.js definiert
    // Die color-config.js wird automatisch geladen und ist über window.CSEColorConfig verfügbar

    // KP-Counter Config
    kpCounterConfig: {
        requiredKP: 180,
        showDetailedBreakdown: false,
        enableCategoryTracking: true,
    },

    // === 5. LAYOUT-SPEZIFISCHE CONFIG ===
    // Aspekt-Verhältnisse
    aspectRatios: {
        longName: 2.0,
        specialModule: 2.5,
    },

    // Bereiche-Reihenfolge für 3. Jahr
    bereicheReihenfolge: [
        "Kernfächer",
        "Vertiefungsgebiet",
        "Wahlfächer",
        "Abschluss",
    ],

    // === 6. KATEGORIEN ===
    kategorien: [
        { name: "Wissenschaftliche Arbeit", klasse: "wissenschaftliche-arbeit" },
        {
            name: "Kernfächer",
            klasse: "kern",
            info: "3 von 4 möglichen auswählen",
            hasTooltip: true,
        },
        {
            name: "Wahlfächer",
            klasse: "wahl",
            info: "mind. zwei Module",
            hasTooltip: true,
        },
        {
            name: "Vertiefungsgebiet",
            klasse: "vertiefung",
            info: "2 Module aus einem Gebiet auswählen",
            hasTooltip: true,
        },
    ],

    kategorieZuKlasse: {
        "wissenschaftliche-arbeit": "wissenschaftliche-arbeit",
        kern: "kern",
        wahl: "wahl",
        vertiefung: "vertiefung",
    },

    // === 7. WAHLMODULE DATA ===
    // Wahlmodule-Daten - Kompatibel mit Wahlmodule-System
    wahlmoduleData: {
        // Kernfächer aus cse-wahlmodule-data.js
        kernfaecherSchwerpunkte: {
            Kernfächer: window.CSE_KernfaecherModules || [],
        },
        // Vertiefungsgebiete - werden dynamisch geladen
        vertiefungsgebiete: {},
        // Wahlfächer - werden dynamisch geladen
        wahlfaecherBereiche: {},

        // Kompatibilitätsfunktion für Wahlmodule-System
        getAllWahlmoduleData: function () {
            const data = {
                kernfaecherSchwerpunkte: this.kernfaecherSchwerpunkte,
                vertiefungsgebiete: {},
                wahlfaecherBereiche: {},
                wahlmoduleBereiche: {},
            };

            // Vertiefungsgebiete dynamisch aus separater Datei laden
            if (window.CSE_VertiefungsgebieteModules) {
                const kategorien = [
                    ...new Set(
                        window.CSE_VertiefungsgebieteModules.map(
                            (m) => m.kategorie_vertiefung
                        )
                    ),
                ];
                kategorien.forEach((kategorie) => {
                    data.vertiefungsgebiete[kategorie] =
                        window.CSE_VertiefungsgebieteModules.filter(
                            (m) => m.kategorie_vertiefung === kategorie
                        );
                });
            }

            // Wahlfächer aus separater Datei laden
            if (window.CSE_WahlfaecherModules) {
                data.wahlfaecherBereiche["Alle Wahlfächer"] =
                    window.CSE_WahlfaecherModules;
            }

            return data;
        },
    },
};