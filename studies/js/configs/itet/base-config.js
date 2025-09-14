/* ==== ITET BASE CONFIGURATION - STANDARDISIERT ==== */
/* Grundlegende Konfiguration für den ITET Studiengang */

window.StudiengangBaseConfig = {
    // === 1. BASIC INFO ===
    title: "BSc Informationstechnologie und Elektrotechnik",
    legendTitle: "Farben-Legende",
    creditUnit: "KP",

    // === 2. LAYOUT CONFIG ===
    layout: "years",
    moduleSizing: "proportional",
    basisArea: 2000,
    defaultAspectRatio: 1.5,
    layoutClass: "horizontal-modules",

    // === 3. FEATURE FLAGS ===
    enableTooltips: true,
    enableHover: true,
    enableColorManager: true,
    enableWahlmodule: true,
    enableKPCounter: true,

    // === 4. ERWEITERTE FEATURES ===
    // ColorManager Config
    coloringModes: {
        kategorie: "Kategorien",
        pruefungsblock: "Prüfungsblöcken",
    },
    defaultColoringMode: "kategorie",

    // KP-Counter Config
    kpCounterConfig: {
        requiredKP: 180,
        showDetailedBreakdown: true,
        enableCategoryTracking: true,
    },

    // Prüfungsblöcke für ColorManager
    pruefungsbloecke: [
        {
            name: "Basisprüfungsblock A",
            shortName: "BPb-A",
            cssClass: "block-bpa",
            color: "#FF6B6B",
            module: [
                "Digitaltechnik",
                "Lineare Algebra",
                "Netzwerke und Schaltungen I",
                "Technische Mechanik",
            ],
        },
        {
            name: "Basisprüfungsblock B",
            shortName: "BPb-B",
            cssClass: "block-bpb",
            color: "#4ECDC4",
            module: [
                "Analysis 1",
                "Analysis 2",
                "Informatik I",
                "Mathematische Methoden",
                "Netzwerke und Schaltungen II",
                "Physik I",
            ],
        },
        {
            name: "Prüfungsblock 1",
            shortName: "Pb-1",
            cssClass: "block-p1",
            color: "#45B7D1",
            module: [
                "Analysis 3",
                "Physik II",
                "Signal- und Systemtheorie I",
                "Informatik II",
            ],
        },
        {
            name: "Prüfungsblock 2",
            shortName: "Pb-2",
            cssClass: "block-p2",
            color: "#96CEB4",
            module: [
                "Halbleiter-Schaltungstechnik",
                "Diskrete Mathematik",
                "Technische Informatik",
                "Signal- und Systemtheorie II",
            ],
        },
        {
            name: "Prüfungsblock 3",
            shortName: "Pb-3",
            cssClass: "block-p3",
            color: "#FFEAA7",
            module: [
                "Numerische Methoden",
                "Elektromagnetische Felder und Wellen",
                "Halbleiterbauelemente",
                "Wahrscheinlichkeitstheorie und Statistik",
            ],
        },
    ],

    // === 5. LAYOUT-SPEZIFISCHE CONFIG ===
    // Aspekt-Verhältnisse für verschiedene Module
    aspectRatios: {
        longModuleName: 2.0,
        Bachelorarbeit: 2.8,
        "Science in Perspective": 2.2,
    },

    // Layout für 3. Jahr
    thirdYearLayout: "category-based",
    thirdYearCategoryOrder: [
        "Kernfächer nach Schwerpunkt",
        "Weitere Wahl-Grundlagenfächer",
        "Wahlfächer",
        "Wahl Praktika-Projekte-Seminare",
        "Wissenschaftliche Arbeit",
    ],

    // === 6. KATEGORIEN ===
    kategorien: [
        { name: "Obligatorische Fächer", klasse: "obligatorisch" },
        { name: "Obligatorische Praktikum", klasse: "obligatorisch-praktikum" },
        {
            name: "Kernfächer nach Schwerpunkt",
            klasse: "kern",
            hasTooltip: true,
            info: "💡 Wähle deine Kernfächer!",
            description: "Computer und Netzwerk Schwerpunkt",
            minKp: 18,
        },
        {
            name: "Weitere Wahl-Grundlagenfächer",
            klasse: "weitere-wahl-grundlagen",
            hasTooltip: true,
            info: "💡 Wähle zusätzliche Grundlagen!",
            description: "Zusätzliche Grundlagenfächer",
            minKp: 8,
        },
        {
            name: "Wahlfächer",
            klasse: "wahl",
            hasTooltip: true,
            info: "💡 Wähle deine Wahlfächer!",
            description: "Frei wählbare Module",
            minKp: 6,
        },
        {
            name: "Wahl Praktika-Projekte-Seminare",
            klasse: "wahl-praktika-projekte",
            hasTooltip: true,
            info: "💡 Ziehe Module aus der Liste!",
            description: "Wählbare Praktika und Projekte",
        },
        {
            name: "Wissenschaftliche Arbeit",
            klasse: "wissenschaft",
            description: "Bachelorarbeit und SIP",
        },
    ],

    kategorieZuKlasse: {
        "Obligatorische Fächer": "obligatorisch",
        "Obligatorische Praktikum": "obligatorisch-praktikum",
        "Wahl Praktika-Projekte-Seminare": "wahl-praktika-projekte",
        "Kernfächer nach Schwerpunkt": "kern",
        Wahlfächer: "wahl",
        "Wissenschaftliche Arbeit": "wissenschaft",
        "Weitere Wahl-Grundlagenfächer": "weitere-wahl-grundlagen",
    },

    // === 7. CUSTOM FUNCTIONS ===
    // Custom Sizing für bessere Kompaktheit
    customSizing: function (div, modul) {
        let width = 160;
        let height = 70;

        // Spezielle Größen für besondere Module
        if (modul.name === "Bachelorarbeit") {
            width = 200;
            height = 120;
        } else if (modul.name === "Science in Perspective") {
            width = 180;
            height = 90;
        } else if (modul.kp >= 8) {
            width = Math.max(160, modul.kp * 12);
            height = Math.max(70, modul.kp * 6);
        } else if (modul.kp <= 2) {
            width = 120;
            height = 60;
        }

        // Namen kürzen wenn zu lang
        if (modul.name && modul.name.length > 45) {
            const shortName = this.shortenModuleName(modul.name);
            div.title = modul.name;
            const titleEl = div.querySelector(".modul-titel");
            if (titleEl) {
                titleEl.textContent = shortName;
            }
        }

        div.style.width = `${width}px`;
        div.style.height = `${height}px`;
        div.style.minWidth = `${Math.min(120, width)}px`;
        div.style.maxWidth = `${Math.max(200, width)}px`;
    },

    // Hilfsfunktion zum Kürzen von Modulnamen
    shortenModuleName: function (name) {
        if (name.includes("Halbleiter-Schaltungstechnik")) {
            return "Halbleiter-Schaltungstechnik";
        }
        if (name.includes("Netzwerke und Schaltungen")) {
            return "Netzwerke & Schaltungen";
        }
        if (name.includes("Elektromagnetische Felder")) {
            return "EM-Felder & Wellen";
        }
        if (name.includes("Wahrscheinlichkeitstheorie")) {
            return "Wahrscheinlichkeit & Statistik";
        }
        if (name.includes("Informationstechnologie")) {
            return "IT & Elektrotechnik";
        }
        if (name.includes("Signal- und Systemtheorie")) {
            return name.replace(
                "Signal- und Systemtheorie",
                "Signal & Systemtheorie"
            );
        }
        if (name.includes("Mathematische Methoden")) {
            return "Math. Methoden";
        }
        if (name.length > 45) {
            return name.substring(0, 42) + "...";
        }
        return name;
    },
};