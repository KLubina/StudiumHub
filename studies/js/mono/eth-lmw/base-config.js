/* ==== LMW BASE CONFIGURATION ==== */
/* Grundlegende Konfiguration für den Lebensmittelwissenschaften Studiengang */

window.StudiengangBaseConfig = {
    // === 1. BASIC INFO ===
    title: "BSc Lebensmittelwissenschaften und Ernährung",
    legendTitle: "Farben-Legende",
    // Optional HTML subtitle (renders clickable links when provided)
    subtitleHtml: `Herbstsemester: <a href="https://www.vvz.ethz.ch/Vorlesungsverzeichnis/sucheLehrangebot.view?lerneinheitscode=&deptId=24&famname=&unterbereichAbschnittId=&seite=0&lerneinheitstitel=&rufname=&kpRange=0,999&lehrsprache=&bereichAbschnittId=&semkez=2025W&studiengangAbschnittId=117362&studiengangTyp=BSC&ansicht=1&lang=de&katalogdaten=&wahlinfo=" target="_blank" rel="noopener">VVZ Herbst 2025</a>
        <br>
        Sommersemester: <a href="https://www.vvz.ethz.ch/Vorlesungsverzeichnis/sucheLehrangebot.view?lerneinheitscode=&deptId=24&famname=&unterbereichAbschnittId=&seite=0&lerneinheitstitel=&rufname=&kpRange=0,999&lehrsprache=&bereichAbschnittId=&semkez=2025S&studiengangAbschnittId=114357&studiengangTyp=BSC&ansicht=1&lang=de&katalogdaten=&wahlinfo=" target="_blank" rel="noopener">VVZ Sommer 2025</a>
        <br>
        Studieninfo: <a href="https://hest.ethz.ch/studium/lebensmittelwissenschaften/bachelor/bachelor-reglement-2024/aufbau-bachelor.html" target="_blank" rel="noopener">Aufbau Bachelor</a> | <a href="https://ethz.ch/content/dam/ethz/main/eth-zurich/organisation/rechtssammlung/323.1.0700.24.pdf" target="_blank" rel="noopener">Reglement (PDF)</a>`,
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
        bereich: "Bereichen",
    },
    defaultColoringMode: "bereich",

    // KP-Counter Config
    kpCounterConfig: {
        requiredKP: 180,
        showDetailedBreakdown: true,
        enableCategoryTracking: true,
    },

    // Bereiche für ColorManager
    bereiche: [
        {
            name: "Natur- und Ingenieurwissenschaften",
            shortName: "Natur/Ing.",
            cssClass: "bereich-natwig",
            color: "#4A90E2",
            requiredKP: 71,
        },
        {
            name: "Sozialwissenschaften",
            shortName: "Sozwi",
            cssClass: "bereich-sozwi",
            color: "#F5A623",
            requiredKP: 5,
        },
        {
            name: "Lebensmittelwissenschaften",
            shortName: "LMW",
            cssClass: "bereich-lmw",
            color: "#7ED321",
            requiredKP: 83,
        },
    ],

    // === 5. LAYOUT-SPEZIFISCHE CONFIG ===
    aspectRatios: {
        longModuleName: 2.0,
        "Bachelor-Arbeit": 2.8,
        "Wissenschaft im Kontext": 2.0,
    },

    // Layout für 3. Jahr
    thirdYearLayout: "category-based",
    thirdYearCategoryOrder: [
        "Fachgrundlage",
        "Lebensmittelwissenschaftliches Fach",
        "Laborpraktikum",
        "Exkursionen",
        "Wahlfächer",
        "Wissenschaft im Kontext",
        "Bachelor-Arbeit",
    ],

    // === 6. KATEGORIEN ===
    kategorien: [
        { name: "Basisprüfung", klasse: "basispruefung" },
        { name: "Zusatzfach Basisjahr", klasse: "zusatzfach" },
        { name: "Obligatorisches Fach", klasse: "obligatorisch" },
        { name: "Grundlagenfach II", klasse: "grundlagenfach" },
        { name: "Weitere Fächer", klasse: "weitere" },
        { name: "Kernfach", klasse: "kernfach" },
        { name: "Fachgrundlage", klasse: "fachgrundlage" },
        {
            name: "Lebensmittelwissenschaftliches Fach",
            klasse: "lmw-fach",
            hasTooltip: true,
            info: "💡 Wählbare Vertiefungsfächer",
            description: "Fachspezifische Module in Lebensmittelchemie, -mikrobiologie, -technologie, -verfahrenstechnik, Ernährung und mehr",
        },
        {
            name: "Laborpraktikum",
            klasse: "praktikum",
            description: "Praktische Laborarbeiten",
        },
        {
            name: "Exkursionen",
            klasse: "exkursion",
            description: "Pflichtexkursionen",
        },
        {
            name: "Wahlfächer",
            klasse: "wahl",
            hasTooltip: true,
            info: "💡 Wähle deine Wahlfächer!",
            description: "Frei wählbare Module aus dem ETH-Angebot",
        },
        {
            name: "Wissenschaft im Kontext",
            klasse: "wik",
            hasTooltip: true,
            info: "ℹ️ 6 KP erforderlich",
            description: "Typ A: Förderung allgemeiner Reflexionsfähigkeiten",
            minKp: 6,
        },
        {
            name: "Bachelor-Arbeit",
            klasse: "bachelor-arbeit",
            description: "Abschlussarbeit (15 KP)",
        },
    ],

    kategorieZuKlasse: {
        "Basisprüfung": "basispruefung",
        "Zusatzfach Basisjahr": "zusatzfach",
        "Obligatorisches Fach": "obligatorisch",
        "Grundlagenfach II": "grundlagenfach",
        "Weitere Fächer": "weitere",
        "Kernfach": "kernfach",
        "Fachgrundlage": "fachgrundlage",
        "Lebensmittelwissenschaftliches Fach": "lmw-fach",
        "Laborpraktikum": "praktikum",
        "Exkursionen": "exkursion",
        "Wahlfächer": "wahl",
        "Wissenschaft im Kontext": "wik",
        "Bachelor-Arbeit": "bachelor-arbeit",
    },

    // === 7. CUSTOM FUNCTIONS ===
    customSizing: function (div, modul) {
        let width = 160;
        let height = 70;

        if (modul.name === "Bachelor-Arbeit") {
            width = 200;
            height = 120;
        } else if (modul.name === "Wissenschaft im Kontext") {
            width = 180;
            height = 90;
        } else if (modul.kp >= 5) {
            width = Math.max(160, modul.kp * 15);
            height = Math.max(70, modul.kp * 8);
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
        div.style.maxWidth = `${Math.max(220, width)}px`;
    },

    shortenModuleName: function (name) {
        // Kürzel für lange Modulnamen
        const replacements = {
            "Lebensmittelwissenschaften": "LMW",
            "Lebensmittel-": "LM-",
            "Mathematics IV: Statistics": "Math IV: Statistik",
            "Welternährungssystem (World Food System)": "World Food System",
            "Grundlagen der Mikroskopie und Pflanzenbiologie": "Mikroskopie & Pflanzenbiologie",
            "Kulturpflanzen im World Food System": "Kulturpflanzen WFS",
            "Nutztierwissenschaften im World Food System": "Nutztierwissenschaften WFS",
            "Ausgewählte Kapitel der Physikalischen Chemie": "Phys. Chemie (Ausgewählt)",
            "Biochemie und Molekulare Biologie": "Biochemie & Mol. Biologie",
            "Physiology and Anatomy II": "Physiologie & Anatomie II",
            "Wissenschaftliches Arbeiten in den Lebensmittelwissenschaften": "Wiss. Arbeiten LMW",
            "Experimentelle Lebensmittel-Mikrobiologie": "Exp. LM-Mikrobiologie",
            "Advanced Topics in Nutritional Science": "Advanced Nutritional Science",
        };

        for (const [long, short] of Object.entries(replacements)) {
            if (name.includes(long)) {
                return name.replace(long, short);
            }
        }

        if (name.length > 45) {
            return name.substring(0, 42) + "...";
        }

        return name;
    },

    // Custom info text
    getInfoText: function () {
        return `
            <h3>Studienaufbau</h3>
            <ul>
                <li><strong>Natur- und Ingenieurwissenschaften:</strong> 71 KP (Mathematik, Biologie, Chemie, Physik, Informatik)</li>
                <li><strong>Sozialwissenschaften:</strong> 5 KP (Ökonomie, Recht)</li>
                <li><strong>Lebensmittelwissenschaften:</strong> 83 KP (Welternährungssystem, Fachmodule, Exkursionen)</li>
                <li><strong>Wissenschaft im Kontext:</strong> 6 KP</li>
                <li><strong>Bachelor-Arbeit:</strong> 15 KP</li>
            </ul>
            <p><strong>Total:</strong> 180 KP</p>
        `;
    },
};
