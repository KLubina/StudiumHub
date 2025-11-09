/* ==== UZH ETHNOLOGIE MAJOR BASIC MODULES DATA ==== */
/* Grundlegende Modulstruktur für Ethnologie Major (120 ECTS) + Minor (60 ECTS) */

window.StudiengangModules = [
    // === 1. STUDIENJAHR (60 ECTS) ===
    // Herbstsemester (30 ECTS)
    {
        jahr: 1,
        semester: 1,
        name: "Einführung in die Ethnologie",
        kp: 6,
        kategorie: "major-ethnologie",
        typ: "pflicht"
    },
    {
        jahr: 1,
        semester: 1,
        name: "Einführung in die Arbeit mit ethnologischen Texten",
        kp: 9,
        kategorie: "major-ethnologie",
        typ: "pflicht"
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
        name: "Ethnologische Forschungsmethoden",
        kp: 6,
        kategorie: "major-ethnologie",
        typ: "pflicht"
    },
    {
        jahr: 1,
        semester: 2,
        name: "Fachgeschichte",
        kp: 9,
        kategorie: "major-ethnologie",
        typ: "pflicht"
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
        name: "Kernbereich (Wahlpflicht)",
        kp: 3,
        kategorie: "major-ethnologie",
        typ: "kernbereiche"
    },
    {
        jahr: 2,
        semester: 1,
        name: "Sprachen & Regionen (Wahlpflicht)",
        kp: 6,
        kategorie: "major-ethnologie",
        typ: "sprachen"
    },
    {
        jahr: 2,
        semester: 1,
        name: "Wahlmodule",
        kp: 6,
        kategorie: "major-ethnologie",
        typ: "wahlmodule"
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
        name: "Kernbereich (Wahlpflicht)",
        kp: 3,
        kategorie: "major-ethnologie",
        typ: "kernbereiche"
    },
    {
        jahr: 2,
        semester: 2,
        name: "Sprachen & Regionen (Wahlpflicht)",
        kp: 6,
        kategorie: "major-ethnologie",
        typ: "sprachen"
    },
    {
        jahr: 2,
        semester: 2,
        name: "Wahlmodule",
        kp: 6,
        kategorie: "major-ethnologie",
        typ: "wahlmodule"
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
        name: "Kernbereich (Wahlpflicht)",
        kp: 3,
        kategorie: "major-ethnologie",
        typ: "kernbereiche"
    },
    {
        jahr: 3,
        semester: 1,
        name: "Wahlmodule / Feldforschung",
        kp: 12,
        kategorie: "major-ethnologie",
        typ: "wahlmodule"
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
        name: "Bachelorarbeit Ethnologie",
        kp: 15,
        kategorie: "major-ethnologie",
        typ: "ba-arbeit"
    },
    {
        jahr: 3,
        semester: 2,
        name: "Ba-Kolloquium",
        kp: 3,
        kategorie: "major-ethnologie",
        typ: "pflicht"
    },
    {
        jahr: 3,
        semester: 2,
        name: "Wahlmodule / Vertiefung",
        kp: 12,
        kategorie: "major-ethnologie",
        typ: "wahlmodule"
    }
];

// Zusätzliche Informationen
window.StudiengangInfo = {
    totalECTS: 180,
    majorECTS: 120,
    minorECTS: 60,
    struktur: {
        pflichtmodule: 30, // Einführungen, Methoden, Fachgeschichte
        kernbereiche: 15, // 5 Kernbereiche à 3 ECTS
        sprachenRegionen: 18, // Sprachen und regionale Studien
        wahlmodule: 39, // Weitere Wahlmodule, Feldforschung, Praktikum
        kolloquium: 3,
        bachelorarbeit: 15
    },
    kernbereiche: [
        "Materielle Kultur, praktisches Wissen und Kunst",
        "Verwandtschaft und Gender",
        "Ökologie und Wirtschaft",
        "Politik und Recht",
        "Religion"
    ]
};
