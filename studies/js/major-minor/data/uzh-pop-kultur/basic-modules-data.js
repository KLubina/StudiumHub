/* ==== UZH POPULÄRE KULTUREN MAJOR BASIC MODULES DATA ==== */
/* Grundlegende Modulstruktur für Populäre Kulturen Major (120 ECTS) + Minor (60 ECTS) */

window.StudiengangModules = [
    // === 1. STUDIENJAHR (60 ECTS) ===
    // Herbstsemester (30 ECTS)
    {
        jahr: 1,
        semester: 1,
        name: "Alltagskulturen: Geschichte, Theorien, Felder",
        kp: 6,
        kategorie: "major-popkultur",
        typ: "pflicht"
    },
    {
        jahr: 1,
        semester: 1,
        name: "Kulturtheorien lesen, verstehen, diskutieren",
        kp: 6,
        kategorie: "major-popkultur",
        typ: "pflicht"
    },
    {
        jahr: 1,
        semester: 1,
        name: "Qualitative Methoden: recherchieren, erheben, evaluieren",
        kp: 9,
        kategorie: "major-popkultur",
        typ: "methoden"
    },
    {
        jahr: 1,
        semester: 1,
        name: "Minor (HS)",
        kp: 15,
        kategorie: "minor",
        typ: "minor"
    },

    // Frühlingssemester (30 ECTS)
    {
        jahr: 1,
        semester: 2,
        name: "Populäre Literaturen und Medien: Geschichte, Theorien, Felder",
        kp: 6,
        kategorie: "major-popkultur",
        typ: "pflicht"
    },
    {
        jahr: 1,
        semester: 2,
        name: "Kulturtheorien lesen, verstehen, diskutieren",
        kp: 6,
        kategorie: "major-popkultur",
        typ: "pflicht"
    },
    {
        jahr: 1,
        semester: 2,
        name: "Qualitative Methoden: analysieren, interpretieren, formulieren",
        kp: 9,
        kategorie: "major-popkultur",
        typ: "methoden"
    },
    {
        jahr: 1,
        semester: 2,
        name: "Minor (FS)",
        kp: 15,
        kategorie: "minor",
        typ: "minor"
    },

    // === 2. STUDIENJAHR (60 ECTS) ===
    // Herbstsemester (30 ECTS)
    {
        jahr: 2,
        semester: 1,
        name: "Thematische Vertiefung (Wahlpflicht)",
        kp: 6,
        kategorie: "major-popkultur",
        typ: "wahlpflicht"
    },
    {
        jahr: 2,
        semester: 1,
        name: "Kulturwissenschaft explorativ / Wahlmodule",
        kp: 9,
        kategorie: "major-popkultur",
        typ: "wahlpflicht"
    },
    {
        jahr: 2,
        semester: 1,
        name: "Minor (HS)",
        kp: 15,
        kategorie: "minor",
        typ: "minor"
    },

    // Frühlingssemester (30 ECTS)
    {
        jahr: 2,
        semester: 2,
        name: "Thematische Vertiefung (Wahlpflicht)",
        kp: 6,
        kategorie: "major-popkultur",
        typ: "wahlpflicht"
    },
    {
        jahr: 2,
        semester: 2,
        name: "Kulturwissenschaft explorativ / Wahlmodule",
        kp: 9,
        kategorie: "major-popkultur",
        typ: "wahlpflicht"
    },
    {
        jahr: 2,
        semester: 2,
        name: "Minor (FS)",
        kp: 15,
        kategorie: "minor",
        typ: "minor"
    },

    // === 3. STUDIENJAHR (60 ECTS) ===
    // Herbstsemester (30 ECTS)
    {
        jahr: 3,
        semester: 1,
        name: "Thematische Vertiefung (Wahlpflicht)",
        kp: 6,
        kategorie: "major-popkultur",
        typ: "wahlpflicht"
    },
    {
        jahr: 3,
        semester: 1,
        name: "Wahlmodule / Praktikum",
        kp: 9,
        kategorie: "major-popkultur",
        typ: "wahlpflicht"
    },
    {
        jahr: 3,
        semester: 1,
        name: "Minor (HS) - Rest",
        kp: 15,
        kategorie: "minor",
        typ: "minor"
    },

    // Frühlingssemester (30 ECTS) - mit Bachelorarbeit
    {
        jahr: 3,
        semester: 2,
        name: "Bachelorarbeit Populäre Kulturen",
        kp: 15,
        kategorie: "major-popkultur",
        typ: "ba-arbeit"
    },
    {
        jahr: 3,
        semester: 2,
        name: "Bachelorkolloquium",
        kp: 3,
        kategorie: "major-popkultur",
        typ: "pflicht"
    },
    {
        jahr: 3,
        semester: 2,
        name: "Wahlmodule / Vertiefung",
        kp: 12,
        kategorie: "major-popkultur",
        typ: "wahlpflicht"
    }
];

// Zusätzliche Informationen
window.StudiengangInfo = {
    totalECTS: 180,
    majorECTS: 120,
    minorECTS: 60,
    struktur: {
        pflichtmodule: 27, // Alltagskulturen, Pop. Lit. & Medien, Kulturtheorien, Kolloquium
        methodenmodule: 18, // Qualitative Methoden (2x9 ECTS)
        thematischeVertiefung: 18, // 3 Vertiefungen à 6 ECTS
        explorativ: 27, // Kulturwissenschaft explorativ / forschendes Lernen
        wahlmodule: 15, // Weitere Wahlmodule, Praktika, Sprachkurse
        bachelorarbeit: 15
    },
    vertiefungsbereiche: [
        "Alltagskulturen",
        "Populäre Literaturen und Medien"
    ]
};
