/* ==== UZH SOZIOLOGIE MAJOR BASIC MODULES DATA ==== */
/* Grundlegende Modulstruktur für Soziologie Major (120 ECTS) + Minor (60 ECTS) */

window.StudiengangModules = [
    // === 1. STUDIENJAHR (60 ECTS) ===
    // Herbstsemester (30 ECTS)
    {
        jahr: 1,
        semester: 1,
        name: "Einführung in die Soziologie",
        kp: 6,
        kategorie: "major-soziologie",
        typ: "pflicht"
    },
    {
        jahr: 1,
        semester: 1,
        name: "Sozialstruktur und sozialer Wandel",
        kp: 6,
        kategorie: "major-soziologie",
        typ: "pflicht"
    },
    {
        jahr: 1,
        semester: 1,
        name: "Quantitative Methoden I",
        kp: 3,
        kategorie: "major-soziologie",
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
        name: "Soziologische Theorien",
        kp: 6,
        kategorie: "major-soziologie",
        typ: "pflicht"
    },
    {
        jahr: 1,
        semester: 2,
        name: "Quantitative Methoden II",
        kp: 6,
        kategorie: "major-soziologie",
        typ: "methoden"
    },
    {
        jahr: 1,
        semester: 2,
        name: "Qualitative Methoden",
        kp: 3,
        kategorie: "major-soziologie",
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
        name: "Forschungsseminar (Wahlpflicht)",
        kp: 9,
        kategorie: "major-soziologie",
        typ: "methoden"
    },
    {
        jahr: 2,
        semester: 1,
        name: "Vertiefungsmodul (Wahlpflicht)",
        kp: 6,
        kategorie: "major-soziologie",
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
        name: "Forschungsseminar (Wahlpflicht)",
        kp: 9,
        kategorie: "major-soziologie",
        typ: "methoden"
    },
    {
        jahr: 2,
        semester: 2,
        name: "Vertiefungsmodul (Wahlpflicht)",
        kp: 6,
        kategorie: "major-soziologie",
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
        name: "Vertiefungsmodul (Wahlpflicht)",
        kp: 6,
        kategorie: "major-soziologie",
        typ: "wahlpflicht"
    },
    {
        jahr: 3,
        semester: 1,
        name: "Wahlmodule / Praktikum",
        kp: 9,
        kategorie: "major-soziologie",
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
        name: "Bachelorarbeit Soziologie",
        kp: 15,
        kategorie: "major-soziologie",
        typ: "ba-arbeit"
    },
    {
        jahr: 3,
        semester: 2,
        name: "Kolloquium",
        kp: 3,
        kategorie: "major-soziologie",
        typ: "pflicht"
    },
    {
        jahr: 3,
        semester: 2,
        name: "Wahlmodule / Vertiefung",
        kp: 12,
        kategorie: "major-soziologie",
        typ: "wahlpflicht"
    }
];

// Zusätzliche Informationen
window.StudiengangInfo = {
    totalECTS: 180,
    majorECTS: 120,
    minorECTS: 60,
    struktur: {
        pflichtmodule: 21, // Einführung, Sozialstruktur, Theorien, Kolloquium
        methodenmodule: 30, // Quant. Methoden, Qual. Methoden, Forschungsseminare
        vertiefungsmodule: 18, // 3 Vertiefungsmodule à 6 ECTS
        wahlmodule: 36, // Weitere Wahlmodule, Praktikum
        bachelorarbeit: 15
    },
    vertiefungsbereiche: [
        "Soziale Ungleichheit",
        "Kultur und Lebensstile",
        "Arbeits- und Organisationssoziologie",
        "Familiensoziologie",
        "Stadtsoziologie",
        "Bildungssoziologie",
        "Wirtschaftssoziologie",
        "Politische Soziologie"
    ]
};
