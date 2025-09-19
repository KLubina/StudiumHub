/* ==== MSC ITET BASE CONFIGURATION ==== */
/* Grundlegende Konfiguration für den MSc ITET Studiengang */

window.StudiengangBaseConfig = {
    // === 1. BASIC INFO ===
    title: "MSc Informationstechnologie und Elektrotechnik",
    subtitle: "mind. 120 KP insgesamt",
    legendTitle: "Farben-Legende",
    creditUnit: "KP",

    // === 2. LAYOUT CONFIG ===
    layout: "categories",
    moduleSizing: "proportional", 
    basisArea: 2000,
    defaultAspectRatio: 1.5,
    layoutClass: "horizontal-modules",

    // === 3. FEATURE FLAGS ===
    enableTooltips: true,
    enableHover: true,
    enableColorManager: false, // Simple version
    enableWahlmodule: true,
    enableKPCounter: true,

    // === 4. KP-Counter Config ===
    kpCounterConfig: {
        requiredKP: 120,
        showDetailedBreakdown: false,
        enableCategoryTracking: true,
    },

    // === 5. KATEGORIEN ===
    kategorien: [
        { name: "Fixe Module", klasse: "obligatorisch" },
        { 
            name: "Kernfächer", 
            klasse: "kern",
            hasTooltip: true,
            info: "💡 Wähle deine Kernfächer!",
            description: "Mind. 24 KP",
            minKp: 24,
        },
        { 
            name: "Vertiefungsfächer", 
            klasse: "vertiefung",
            hasTooltip: true,
            info: "💡 Wähle deine Vertiefungsfächer!",
            description: "Mind. 40 KP",
            minKp: 40,
        },
    ],

    kategorieZuKlasse: {
        "Fixe Module": "obligatorisch",
        "Kernfächer": "kern", 
        "Vertiefungsfächer": "vertiefung",
    },

    // === 6. CUSTOM FUNCTIONS ===
    customSizing: function (div, modul) {
        let width = 180;
        let height = 80;

        // Größere Module für wichtige Sachen
        if (modul.name === "Master-Arbeit") {
            width = 250;
            height = 120;
        } else if (modul.kp >= 12) {
            width = Math.max(180, modul.kp * 10);
            height = Math.max(80, modul.kp * 5);
        } else if (modul.kp <= 2) {
            width = 120;
            height = 60;
        }

        div.style.width = `${width}px`;
        div.style.height = `${height}px`;
        div.style.minWidth = `${Math.min(120, width)}px`;
        div.style.maxWidth = `${Math.max(250, width)}px`;
    },
};