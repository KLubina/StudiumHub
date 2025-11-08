/* ==== UZH ETHNOLOGIE BASE CONFIGURATION ==== */
/* Grundlegende Konfiguration für den Bachelor Ethnologie (Major) an der UZH */

window.StudiengangBaseConfig = {
    // === 1. BASIC INFO ===
    title: "Bachelor of Arts - Ethnologie (Major)",
    legendTitle: "Farben-Legende",
    creditUnit: "ECTS",
    // Optional HTML subtitle (renders clickable links when provided)
    subtitleHtml: `Herbstsemester: <a href="https://studentservices.uzh.ch/uzh/anonym/vvz/index.html?sap-language=DE&sap-ui-language=DE#/details/2025/003/CGStudyProgramDetail/50891354/50000007/Philosophische%2520Fakult%25C3%25A4t/50890575/Bachelor%2520of%2520Arts%2520(RVO19)/true/50891354/Ethnologie/2025/003" target="_blank" rel="noopener">VVZ Herbst 2025</a>
        <br>
        Sommersemester: <a href="https://studentservices.uzh.ch/uzh/anonym/vvz/index.html?sap-language=DE&sap-ui-language=DE#/details/2024/004/CGStudyProgramDetail/50891354/50000007/Philosophische%2520Fakult%25C3%25A4t/50890575/Bachelor%2520of%2520Arts%2520(RVO19)/true/50891354/Ethnologie/2024/004" target="_blank" rel="noopener">VVZ Sommer 2024</a>
        <br>
        Studieninfo: <a href="https://www.ethno.uzh.ch/de/studium/ba.html" target="_blank" rel="noopener">Studium Bachelor</a> | <a href="https://www.phil.uzh.ch/static/rechtssammlung/bachelor/regulaer-nachfolger/mc/MC_06B-7270-120.pdf" target="_blank" rel="noopener">Studienplan & Reglement (PDF)</a>`,

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
        { name: "Ethnologie (Major)", klasse: "major-ethnologie" },
        { name: "Minor", klasse: "minor" },
        { name: "Pflichtmodule", klasse: "pflicht" },
        { name: "Kernbereiche", klasse: "kernbereiche" },
        { name: "Sprachen & Regionen", klasse: "sprachen" },
        { name: "Wahlmodule", klasse: "wahlmodule" },
        { name: "Bachelor-Arbeit", klasse: "ba-arbeit" }
    ],

    kategorieZuKlasse: {
        "major-ethnologie": "major-ethnologie",
        "minor": "minor",
        "pflicht": "pflicht",
        "kernbereiche": "kernbereiche",
        "sprachen": "sprachen",
        "wahlmodule": "wahlmodule",
        "ba-arbeit": "ba-arbeit",
        "methoden": "methoden",
        "vertiefung": "vertiefung",
    },

    // === 7. CUSTOM FUNCTIONS ===
    customSizing: function (div, modul) {
        let width = 160;
        let height = 70;

        // Major-Module (Ethnologie = 120 ECTS)
        if (modul.kategorie === "major-ethnologie") {
            width = 250;
            height = 100;
        }
        // Minor-Module (60 ECTS)
        else if (modul.kategorie === "minor") {
            width = 200;
            height = 80;
        }
        // Pflichtmodule
        else if (modul.kategorie === "pflicht") {
            width = Math.max(160, modul.kp * 20);
            height = Math.max(70, modul.kp * 10);
        }
        // Kernbereiche
        else if (modul.kategorie === "kernbereiche") {
            width = Math.max(140, modul.kp * 18);
            height = Math.max(65, modul.kp * 9);
        }
        // Sprachen & Regionen
        else if (modul.kategorie === "sprachen") {
            width = Math.max(170, modul.kp * 17);
            height = Math.max(75, modul.kp * 9);
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
        if (name.includes("Ethnologie")) {
            return name.replace("Ethnologie", "Ethno.");
        }
        if (name.includes("Bachelor-Arbeit")) {
            return name.replace("Bachelor-Arbeit", "BA-Arbeit");
        }
        if (name.includes("Einführung in die")) {
            return name.replace("Einführung in die ", "Einf. ");
        }
        if (name.length > 50) {
            return name.substring(0, 47) + "...";
        }
        return name;
    },
};
