/* ==== HST BASE CONFIGURATION ==== */
/* Grundlegende Konfiguration für den HST Studiengang */

window.StudiengangBaseConfig = {
    // === 1. BASIC INFO ===
    title: "BSc Gesundheitswissenschaften und Technologie",
    legendTitle: "Farben-Legende",
    creditUnit: "ECTS",

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
            name: "Basisprüfungsblock 1",
            shortName: "BPb-1",
            cssClass: "block-bp1",
            color: "#FF6B6B",
            module: [
                "Molekulare Genetik und Zellbiologie",
                "Allgemeine Chemie (für HST)",
                "Grundlagen der Informatik",
                "Einführung Gesundheitswissenschaften und Technologie I",
            ],
        },
        {
            name: "Basisprüfungsblock 2",
            shortName: "BPb-2",
            cssClass: "block-bp2",
            color: "#4ECDC4",
            module: [
                "Infektion",
                "Biochemie",
                "Organische Chemie II (für Biol./Pharm.Wiss./HST)",
                "Biomechanik I",
                "Mathematik II",
                "Statistik I",
                "Einführung Gesundheitswissenschaften und Technologie II",
                "Praktikum Chemie",
                "Praktikum Gesundheitswissenschaften und Technologie",
                "Organische Chemie I (für Biol./Pharm.Wiss./HST)",
                "Mathematik I",
            ],
        },
        {
            name: "Kernfächer Block A",
            shortName: "Kern-A",
            cssClass: "block-ka",
            color: "#45B7D1",
            module: [
                "Molekular- und Zellbiologie in Gesundheit und Krankheit",
                "Histologie",
                "Physik II",
                "Humanphysiologie I",
                "Mathematik III",
                "Statistik II",
                "Physik I",
            ],
        },
        {
            name: "Kernfächer Block B",
            shortName: "Kern-B",
            cssClass: "block-kb",
            color: "#96CEB4",
            module: [
                "Laboratory Course in Medical Technology",
                "Produktentwicklung in der Medizintechnik",
            ],
        },
        {
            name: "Kernfächer Block C",
            shortName: "Kern-C",
            cssClass: "block-kc",
            color: "#FFEAA7",
            module: [
                "Humanphysiologie II",
                "Biomechanik II",
                "Biomedizinische Grenzflächen",
                "Praktikum Physiologie (HST)",
            ],
        },
    ],

    // === 5. LAYOUT-SPEZIFISCHE CONFIG ===
    aspectRatios: {
        longModuleName: 2.0,
        Bachelorarbeit: 2.8,
    },

    // Layout für 3. Jahr
    thirdYearLayout: "category-based",
    thirdYearCategoryOrder: [
        "Schwerpunktfächer",
        "Wahlfächer",
        "Wissenschaftliche Arbeit",
    ],

    // === 6. KATEGORIEN ===
    // Die Module im HST-Base Data verwenden spezifische kategorie-Werte wie
    // "Basisprüfungsblock 1", "Basisprüfungsblock 2" oder "Praktikum des Basisjahres".
    // Diese müssen hier als Legenden-Einträge erscheinen und auf CSS-Klassen gemappt werden.
    kategorien: [
        { name: "Basisprüfungsblock 1", klasse: "basispruefung-bp1" },
        { name: "Basisprüfungsblock 2", klasse: "basispruefung-bp2" },
        { name: "Praktikum des Basisjahres", klasse: "praktikum-basisjahr" },
        { name: "Kernfach", klasse: "kernfach" },
        {
            name: "Schwerpunktfächer",
            klasse: "schwerpunkt",
            hasTooltip: true,
            info: "💡 Wähle deinen Schwerpunkt!",
            description: "Vertiefungen: Neurosciences, Medical Technology, Molecular Health Sciences, Human Movement Science and Sport",
        },
        {
            name: "Wahlfächer",
            klasse: "wahl",
            hasTooltip: true,
            info: "💡 Wähle deine Wahlfächer!",
            description: "Frei wählbare Module",
            minKp: 15,
        },
        {
            name: "Wissenschaftliche Arbeit",
            klasse: "wissenschaft",
            description: "Bachelorarbeit",
        },
    ],

    kategorieZuKlasse: {
        "Basisprüfungsblock 1": "basispruefung-bp1",
        "Basisprüfungsblock 2": "basispruefung-bp2",
        "Praktikum des Basisjahres": "praktikum-basisjahr",
        "Kernfach": "kernfach",
        "Schwerpunktfächer": "schwerpunkt",
        "Wahlfächer": "wahl",
        "Wissenschaftliche Arbeit": "wissenschaft",
    },

    // === 7. CUSTOM FUNCTIONS ===
    customSizing: function (div, modul) {
        let width = 160;
        let height = 70;

        if (modul.name === "Bachelorarbeit") {
            width = 200;
            height = 120;
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

    shortenModuleName: function (name) {
        if (name.includes("Gesundheitswissenschaften und Technologie")) {
            return name.replace("Gesundheitswissenschaften und Technologie", "HST");
        }
        if (name.includes("Organische Chemie")) {
            return name.replace("(für Biol./Pharm.Wiss./HST)", "");
        }
        if (name.includes("Molekular- und Zellbiologie")) {
            return "Molekular-/Zellbiologie";
        }
        if (name.length > 45) {
            return name.substring(0, 42) + "...";
        }
        return name;
    },
};
