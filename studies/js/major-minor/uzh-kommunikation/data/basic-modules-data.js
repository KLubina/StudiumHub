/* ==== UZH KOMMUNIKATIONSWISSENSCHAFT MAJOR BASIC MODULES DATA ==== */
/* Grundlegende Modulstruktur für Kommunikationswissenschaft Major (120 ECTS) + Minor (60 ECTS) */

window.StudiengangModules = [
    // === 1. STUDIENJAHR (60 ECTS) ===
    // Herbstsemester (30 ECTS)
    {
        jahr: 1,
        semester: 1,
        name: "Einführung in die Kommunikationswissenschaft",
        kp: 6,
        kategorie: "major-komm",
        typ: "pflicht"
    },
    {
        jahr: 1,
        semester: 1,
        name: "Quantitative Methoden I",
        kp: 6,
        kategorie: "major-komm",
        typ: "methoden"
    },
    {
        jahr: 1,
        semester: 1,
        name: "Medientheorie",
        kp: 3,
        kategorie: "major-komm",
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
        name: "Kommunikationstheorie",
        kp: 6,
        kategorie: "major-komm",
        typ: "pflicht"
    },
    {
        jahr: 1,
        semester: 2,
        name: "Quantitative Methoden II",
        kp: 6,
        kategorie: "major-komm",
        typ: "methoden"
    },
    {
        jahr: 1,
        semester: 2,
        name: "Qualitative Methoden",
        kp: 3,
        kategorie: "major-komm",
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
        name: "Vertiefungsmodul (Wahlpflicht)",
        kp: 6,
        kategorie: "major-komm",
        typ: "wahlpflicht"
    },
    {
        jahr: 2,
        semester: 1,
        name: "Forschungsseminar",
        kp: 6,
        kategorie: "major-komm",
        typ: "methoden"
    },
    {
        jahr: 2,
        semester: 1,
        name: "Wahlmodul",
        kp: 3,
        kategorie: "major-komm",
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
        name: "Vertiefungsmodul (Wahlpflicht)",
        kp: 6,
        kategorie: "major-komm",
        typ: "wahlpflicht"
    },
    {
        jahr: 2,
        semester: 2,
        name: "Forschungsseminar",
        kp: 6,
        kategorie: "major-komm",
        typ: "methoden"
    },
    {
        jahr: 2,
        semester: 2,
        name: "Wahlmodul",
        kp: 3,
        kategorie: "major-komm",
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
        kategorie: "major-komm",
        typ: "wahlpflicht"
    },
    {
        jahr: 3,
        semester: 1,
        name: "Forschungspraktikum / Wahlmodule",
        kp: 9,
        kategorie: "major-komm",
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
        name: "Bachelorarbeit Kommunikationswissenschaft",
        kp: 15,
        kategorie: "major-komm",
        typ: "ba-arbeit"
    },
    {
        jahr: 3,
        semester: 2,
        name: "Kolloquium",
        kp: 3,
        kategorie: "major-komm",
        typ: "pflicht"
    },
    {
        jahr: 3,
        semester: 2,
        name: "Wahlmodule / Vertiefung",
        kp: 12,
        kategorie: "major-komm",
        typ: "wahlpflicht"
    }
];

// Zusätzliche Informationen
window.StudiengangInfo = {
    totalECTS: 180,
    majorECTS: 120,
    minorECTS: 60,
    struktur: {
        pflichtmodule: 18, // Einführungen, Theorien, Kolloquium
        methodenmodule: 27, // Quantitative, Qualitative, Forschungsseminare
        vertiefungsmodule: 18, // 3 Vertiefungsmodule à 6 ECTS
        wahlmodule: 42, // Wahlmodule, Praktikum
        bachelorarbeit: 15
    },
    vertiefungsbereiche: [
        "Medienwandel und Innovation",
        "Öffentliche Kommunikation",
        "Organisationskommunikation",
        "Rezeption und Wirkung",
        "Journalismus und Medienproduktion"
    ]
};
