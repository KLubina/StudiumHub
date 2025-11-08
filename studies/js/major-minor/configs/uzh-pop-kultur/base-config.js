/* ==== UZH POPULÄRE KULTUREN BASE CONFIGURATION ==== */
/* Grundlegende Konfiguration für den Bachelor Populäre Kulturen (Major) an der UZH */

window.StudiengangBaseConfig = {
    // === 1. BASIC INFO ===
    title: "Bachelor of Arts - Populäre Kulturen (Major)",
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
    enableMajorMinorSelector: true,

    // === 4. ERWEITERTE FEATURES ===
    // KP-Counter Config
    kpCounterConfig: {
        requiredKP: 180,
        showDetailedBreakdown: true,
        enableCategoryTracking: true,
    },

    // === 5. KATEGORIEN ===
    kategorien: [
        { name: "Populäre Kulturen (Major)", klasse: "major-popkultur" },
        { name: "Minor", klasse: "minor" },
        { name: "Pflichtmodule", klasse: "pflicht" },
        { name: "Qualitative Methoden", klasse: "methoden" },
        { name: "Wahlpflichtmodule", klasse: "wahlpflicht" },
        { name: "Bachelor-Arbeit", klasse: "ba-arbeit" }
    ],

    kategorieZuKlasse: {
        "major-popkultur": "major-popkultur",
        "minor": "minor",
        "pflicht": "pflicht",
        "methoden": "methoden",
        "wahlpflicht": "wahlpflicht",
        "ba-arbeit": "ba-arbeit",
        "vertiefung": "vertiefung",
    },

    // === 7. CUSTOM FUNCTIONS ===
    customSizing: function (div, modul) {
        let width = 160;
        let height = 70;

        // Major-Module (Populäre Kulturen = 120 ECTS)
        if (modul.kategorie === "major-popkultur") {
            width = 250;
            height = 100;
        }
        // Minor-Module (60 ECTS)
        else if (modul.kategorie === "minor") {
            width = 200;
            height = 80;
        }
        // Pflicht- und Methodenmodule
        else if (modul.kategorie === "pflicht" || modul.kategorie === "methoden") {
            width = Math.max(160, modul.kp * 20);
            height = Math.max(70, modul.kp * 10);
        }
        // Wahlpflichtmodule
        else if (modul.kategorie === "wahlpflicht") {
            width = Math.max(180, modul.kp * 18);
            height = Math.max(80, modul.kp * 9);
        }
        // Bachelor-Arbeit
        else if (modul.kategorie === "ba-arbeit") {
            width = 200;
            height = 90;
        }
        // Andere Module
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
        if (name.includes("Populäre Kulturen")) {
            return name.replace("Populäre Kulturen", "PopKult");
        }
        if (name.includes("Alltagskulturen")) {
            return name.replace("Alltagskulturen", "Alltagsk.");
        }
        if (name.includes("Bachelor-Arbeit")) {
            return name.replace("Bachelor-Arbeit", "BA-Arbeit");
        }
        if (name.length > 50) {
            return name.substring(0, 47) + "...";
        }
        return name;
    },
};
