/* ==== UZH GESCHICHTE BASE CONFIGURATION ==== */
/* Grundlegende Konfiguration für den Bachelor Geschichte (Major) an der UZH */

window.StudiengangBaseConfig = {
    // === 1. BASIC INFO ===
    title: "Bachelor of Arts - Geschichte (Major)",
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
        { name: "Geschichte (Major)", klasse: "major-geschichte" },
        { name: "Minor", klasse: "minor" },
        { name: "Pflichtmodule", klasse: "pflicht" },
        { name: "Methodenmodule", klasse: "methoden" },
        { name: "Epochenmodule", klasse: "epochen" },
        { name: "Wahlpflichtmodule", klasse: "wahlpflicht" },
        { name: "Bachelor-Arbeit", klasse: "ba-arbeit" }
    ],

    kategorieZuKlasse: {
        "major-geschichte": "major-geschichte",
        "minor": "minor",
        "pflicht": "pflicht",
        "methoden": "methoden",
        "epochen": "epochen",
        "wahlpflicht": "wahlpflicht",
        "ba-arbeit": "ba-arbeit",
        "propädeutikum": "propaedeutikum",
        "vertiefung": "vertiefung",
    },

    // === 6. ZUSÄTZLICHE INFOS ===
    studienLinks: {
        studieninfo: "https://www.hist.uzh.ch/de/studium/studienstufen/bachelor.html",
        struktur: "https://www.phil.uzh.ch/static/rechtssammlung/bachelor/regulaer-nachfolger/mc/MC_06B-7600-120.pdf",
        vvzHerbst: "https://studentservices.uzh.ch/uzh/anonym/vvz/index.html?sap-language=DE&sap-ui-language=DE#/details/2025/003/CGStudyProgramDetail/50891442/50000007/Philosophische%2520Fakult%25C3%25A4t/50890575/Bachelor%2520of%2520Arts%2520(RVO19)/true/50891442/Geschichte/2025/003",
        vvzSommer: "https://studentservices.uzh.ch/uzh/anonym/vvz/index.html?sap-language=DE&sap-ui-language=DE#/details/2024/004/CGStudyProgramDetail/50891442/50000007/Philosophische%2520Fakult%25C3%25A4t/50890575/Bachelor%2520of%2520Arts%2520(RVO19)/true/50891442/Geschichte/2024/004"
    },

    // === 7. CUSTOM FUNCTIONS ===
    customSizing: function (div, modul) {
        let width = 160;
        let height = 70;

        // Major-Module (Geschichte = 120 ECTS)
        if (modul.kategorie === "major-geschichte") {
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
        // Epochenmodule
        else if (modul.kategorie === "epochen") {
            width = Math.max(170, modul.kp * 18);
            height = Math.max(75, modul.kp * 9);
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
        if (name.includes("Geschichte")) {
            return name.replace("Geschichte", "Gesch.");
        }
        if (name.includes("Bachelor-Arbeit")) {
            return name.replace("Bachelor-Arbeit", "BA-Arbeit");
        }
        if (name.includes("Mittelalter")) {
            return name.replace("Mittelalter", "MA");
        }
        if (name.includes("Neuzeit")) {
            return name.replace("Neuzeit", "NZ");
        }
        if (name.includes("Zeitgeschichte")) {
            return name.replace("Zeitgeschichte", "ZG");
        }
        if (name.length > 50) {
            return name.substring(0, 47) + "...";
        }
        return name;
    },
};
