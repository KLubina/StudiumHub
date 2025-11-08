/* ==== MASCHINENINGENIEURWISSENSCHAFTEN BASE CONFIGURATION ==== */
/* Grundlegende Konfiguration für den Maschineningenieurwissenschaften Studiengang */

window.StudiengangBaseConfig = {
    // === 1. BASIC INFO ===
    title: "BSc Maschineningenieurwissenschaften",
    legendTitle: "Farben-Legende",
    creditUnit: "ECTS",

    // === 2. LAYOUT CONFIG ===
    layout: "years",
    moduleSizing: "proportional",
    basisArea: 2500,
    defaultAspectRatio: 1.5,

    // === 3. FEATURE FLAGS ===
    enableTooltips: true,
    enableHover: true,
    enableColorManager: false,
    enableWahlmodule: true,
    enableKPCounter: true,

    // === 4. ERWEITERTE FEATURES ===
    // KP-Counter Config
    kpCounterConfig: {
        requiredKP: 180,
        showDetailedBreakdown: false,
        enableCategoryTracking: true,
    },

    // === 5. LAYOUT-SPEZIFISCHE CONFIG ===
    // Aspekt-Verhältnisse für verschiedene Module
    aspectRatios: {
        "Engineering Design and Material Selection": 2.0,
        "Stochastics and Machine Learning": 2.0,
        "Wissenschaft im Kontext": 2.0
    },

    // === 6. KATEGORIEN ===
    kategorien: [
        { name: "Obligatorische Fächer", klasse: "obligatorisch" },
        { name: "Obligatorische Praktikum", klasse: "praktikum" },
        {
            name: "Wahlfächer",
            klasse: "wahl",
            info: "24 ECTS aus Wahlfächern",
            hasTooltip: true
        },
        {
            name: "Fokus-Vertiefung",
            klasse: "vertiefung",
            info: "20 ECTS aus einem der 5 Fokus-Bereiche auswählen",
            hasTooltip: true
        },
        { name: "Wissenschaftliche Arbeit", klasse: "wissenschaft" }
    ],

    kategorieZuKlasse: {
        "Obligatorische Fächer": "obligatorisch",
        "Obligatorische Praktikum": "praktikum",
        "Wahlfächer": "wahl",
        "Fokus-Vertiefung": "vertiefung",
        "Wissenschaftliche Arbeit": "wissenschaft"
    },

    // === 7. WAHLMODULE DATA ===
    // Wahlmodule-Daten - Kompatibel mit Wahlmodule-System
    wahlmoduleData: {
        // Fokus-Vertiefungen aus masch/vertiefung-data.js
        vertiefungsgebiete: {},

        // Kompatibilitätsfunktion für Wahlmodule-System
        getAllWahlmoduleData: function() {
            const data = {
                vertiefungsgebiete: {},
                wahlfaecherBereiche: {},
                wahlmoduleBereiche: {}
            };

            // Fokus-Vertiefungen dynamisch aus separater Datei laden
            if (window.MASCH_VertiefungsgebieteModules) {
                const kategorien = [...new Set(
                    window.MASCH_VertiefungsgebieteModules.map(m => m.kategorie_vertiefung)
                )];
                kategorien.forEach(kategorie => {
                    data.vertiefungsgebiete[kategorie] =
                        window.MASCH_VertiefungsgebieteModules.filter(
                            m => m.kategorie_vertiefung === kategorie
                        );
                });
            }

            return data;
        }
    }
};
