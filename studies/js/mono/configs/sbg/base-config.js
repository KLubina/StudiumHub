/* ==== SBG BASE CONFIGURATION ==== */
/* Grundlegende Konfiguration für den SBG Studiengang (Sport, Bewegung und Gesundheit) */

window.StudiengangBaseConfig = {
    // === 1. BASIC INFO ===
    title: "BSc Sport, Bewegung und Gesundheit",
    legendTitle: "Farben-Legende",
        // Optional HTML subtitle (renders clickable links when provided)
    subtitleHtml: `Herbstsemester: <a href="https://vorlesungsverzeichnis.unibas.ch/de/vorlesungsverzeichnis?periode=2025004&keyword=&hnode=169725&hid=&search=1#searchResults" target="_blank" rel="noopener">VVZ Herbst 2025</a>
        <br>
        Sommersemester: <a href="https://vorlesungsverzeichnis.unibas.ch/de/vorlesungsverzeichnis?periode=2024005&keyword=&hnode=169725&hid=&search=1#searchResults" target="_blank" rel="noopener">VVZ Sommer 2025</a>`,
    creditUnit: "ECTS",

    // === 2. LAYOUT CONFIG ===
    layout: "categories",
    moduleSizing: "proportional",
    basisArea: 2800,
    defaultAspectRatio: 2.0,
    layoutClass: "horizontal-fachgebiete",

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
    },
    defaultColoringMode: "kategorie",

    // KP-Counter Config
    kpCounterConfig: {
        requiredKP: 180,
        showDetailedBreakdown: true,
        enableCategoryTracking: true,
    },

    // === 5. LAYOUT-SPEZIFISCHE CONFIG ===
    aspectRatios: {
        longModuleName: 2.0,
    },

    // === 6. KATEGORIEN ===
    kategorien: [
        {
            name: "Grundlagenmodule",
            klasse: "grundlagen",
            description: "62 ECTS - Pflichtmodule"
        },
        {
            name: "Vertiefungsmodule",
            klasse: "vertiefung",
            description: "74 ECTS - Pflichtmodule"
        },
        {
            name: "Profilmodul",
            klasse: "profil",
            hasTooltip: true,
            info: "💡 Wähle dein Profilmodul!",
            description: "24 ECTS - Spezialisierung",
            minKp: 24,
        },
        {
            name: "Wahlbereich",
            klasse: "wahl",
            hasTooltip: true,
            info: "💡 Wähle deine Wahlfächer!",
            description: "20 ECTS - Frei wählbare Module",
            minKp: 20,
        },
    ],

    kategorieZuKlasse: {
        "Grundlagenmodule": "grundlagen",
        "Vertiefungsmodule": "vertiefung",
        "Profilmodul": "profil",
        "Wahlbereich": "wahl",
    },

    // === 7. CUSTOM FUNCTIONS ===
    customSizing: function (div, modul) {
        let width = 160;
        let height = 70;

        if (modul.kp >= 8) {
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
        if (name.length > 45) {
            return name.substring(0, 42) + "...";
        }
        return name;
    },
};
