/* ==== SOZIALWISSENSCHAFTEN BASE CONFIGURATION ==== */
/* Grundlegende Konfiguration für den Bachelor in Sozialwissenschaften */

window.StudiengangBaseConfig = {
    // === 1. BASIC INFO ===
    title: "Bachelor of Arts in Sozialwissenschaften",
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
    enableColorManager: false,
    enableWahlmodule: true,
    enableKPCounter: true,

    // === 4. ERWEITERTE FEATURES ===
    // KP-Counter Config
    kpCounterConfig: {
        requiredKP: 180,
        showDetailedBreakdown: true,
        enableCategoryTracking: true,
    },

    // === 5. KATEGORIEN ===
    kategorien: [
        {
            name: "Major",
            klasse: "major",
            hasTooltip: true,
            info: "💡 Wähle deinen Major (120 ECTS)!",
            description: "Majors: Ethnologie, Kommunikationswissenschaft und Medienforschung, Politikwissenschaft, Populäre Kulturen, Soziologie",
            minKp: 120,
        },
        {
            name: "Minor",
            klasse: "minor",
            hasTooltip: true,
            info: "💡 Wähle deinen Minor (60 ECTS)!",
            description: "Frei wählbarer Minor aus dem breiten Angebot der Universität",
            minKp: 60,
        },
    ],

    kategorieZuKlasse: {
        "Major": "major",
        "Minor": "minor",
    },

    // === 6. CUSTOM FUNCTIONS ===
    customSizing: function (div, modul) {
        let width = 160;
        let height = 70;

        // Major-Module sind größer (120 ECTS)
        if (modul.kategorie === "Major") {
            width = 250;
            height = 100;
        }
        // Minor-Module sind mittelgroß (60 ECTS)
        else if (modul.kategorie === "Minor") {
            width = 200;
            height = 80;
        }
        // Platzhalter für detaillierte Module
        else if (modul.kp >= 6) {
            width = Math.max(160, modul.kp * 15);
            height = Math.max(70, modul.kp * 8);
        } else if (modul.kp <= 3) {
            width = 120;
            height = 60;
        }

        // Namen kürzen wenn zu lang
        if (modul.name && modul.name.length > 50) {
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
        div.style.maxWidth = `${Math.max(250, width)}px`;
    },

    shortenModuleName: function (name) {
        if (name.includes("Kommunikationswissenschaft und Medienforschung")) {
            return name.replace("Kommunikationswissenschaft und Medienforschung", "Komm.wiss. & Medienf.");
        }
        if (name.includes("Vergleichende")) {
            return name.replace("Vergleichende ", "Vgl. ");
        }
        if (name.length > 50) {
            return name.substring(0, 47) + "...";
        }
        return name;
    },
};
