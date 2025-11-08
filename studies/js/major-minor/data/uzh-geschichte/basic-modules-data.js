/* ==== UZH GESCHICHTE MAJOR BASIC MODULES DATA ==== */
/* Grundlegende Modulstruktur für Geschichte Major (120 ECTS) + Minor (60 ECTS) */

window.StudiengangModules = [
    // === 1. STUDIENJAHR (60 ECTS) ===
    // Herbstsemester (30 ECTS)
    {
        jahr: 1,
        semester: 1,
        name: "Einführung in die Geschichtswissenschaft",
        kp: 6,
        kategorie: "major-geschichte",
        typ: "pflicht"
    },
    {
        jahr: 1,
        semester: 1,
        name: "Überblicksvorlesung Epoche 1",
        kp: 3,
        kategorie: "major-geschichte",
        typ: "epochen"
    },
    {
        jahr: 1,
        semester: 1,
        name: "Proseminar Epoche 1",
        kp: 6,
        kategorie: "major-geschichte",
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
        name: "Überblicksvorlesung Epoche 2",
        kp: 3,
        kategorie: "major-geschichte",
        typ: "epochen"
    },
    {
        jahr: 1,
        semester: 2,
        name: "Proseminar Epoche 2",
        kp: 6,
        kategorie: "major-geschichte",
        typ: "pflicht"
    },
    {
        jahr: 1,
        semester: 2,
        name: "Überblicksvorlesung Epoche 3",
        kp: 3,
        kategorie: "major-geschichte",
        typ: "epochen"
    },
    {
        jahr: 1,
        semester: 2,
        name: "Quellenübung",
        kp: 3,
        kategorie: "major-geschichte",
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
        name: "Vertiefungsvorlesung",
        kp: 3,
        kategorie: "major-geschichte",
        typ: "wahlpflicht"
    },
    {
        jahr: 2,
        semester: 1,
        name: "Kolloquium",
        kp: 3,
        kategorie: "major-geschichte",
        typ: "methoden"
    },
    {
        jahr: 2,
        semester: 1,
        name: "Hauptseminar",
        kp: 9,
        kategorie: "major-geschichte",
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
        name: "Vertiefungsvorlesung",
        kp: 3,
        kategorie: "major-geschichte",
        typ: "wahlpflicht"
    },
    {
        jahr: 2,
        semester: 2,
        name: "Kolloquium",
        kp: 3,
        kategorie: "major-geschichte",
        typ: "methoden"
    },
    {
        jahr: 2,
        semester: 2,
        name: "Hauptseminar",
        kp: 9,
        kategorie: "major-geschichte",
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
        name: "Vertiefungsvorlesung",
        kp: 3,
        kategorie: "major-geschichte",
        typ: "wahlpflicht"
    },
    {
        jahr: 3,
        semester: 1,
        name: "Hauptseminar",
        kp: 9,
        kategorie: "major-geschichte",
        typ: "wahlpflicht"
    },
    {
        jahr: 3,
        semester: 1,
        name: "Wahlmodule / Vertiefung",
        kp: 3,
        kategorie: "major-geschichte",
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
        name: "Bachelorarbeit Geschichte",
        kp: 15,
        kategorie: "major-geschichte",
        typ: "ba-arbeit"
    },
    {
        jahr: 3,
        semester: 2,
        name: "Vertiefungsvorlesung",
        kp: 3,
        kategorie: "major-geschichte",
        typ: "wahlpflicht"
    },
    {
        jahr: 3,
        semester: 2,
        name: "Wahlmodule / Vertiefung",
        kp: 12,
        kategorie: "major-geschichte",
        typ: "wahlpflicht"
    }
];

// Zusätzliche Informationen
window.StudiengangInfo = {
    totalECTS: 180,
    majorECTS: 120,
    minorECTS: 60,
    struktur: {
        pflichtmodule: 21, // Einführung + 2 Proseminare + Quellenübungen
        methodenmodule: 6, // Kolloquien
        epochenmodule: 9, // 3 Überblicksvorlesungen
        hauptseminare: 27, // 3 Hauptseminare à 9 ECTS
        vertiefungsvorlesungen: 12, // 4 Vertiefungsvorlesungen à 3 ECTS
        wahlmodule: 30, // Weitere Wahlmodule und Vertiefungen
        bachelorarbeit: 15
    },
    epochen: [
        "Alte Geschichte",
        "Geschichte des Mittelalters",
        "Geschichte der Neuzeit",
        "Osteuropäische Geschichte",
        "Schweizer Geschichte",
        "Zeitgeschichte"
    ],
    links: {
        studieninfo: "https://www.hist.uzh.ch/de/studium/studienstufen/bachelor.html",
        struktur: "https://www.phil.uzh.ch/static/rechtssammlung/bachelor/regulaer-nachfolger/mc/MC_06B-7600-120.pdf",
        vvzHerbst: "https://studentservices.uzh.ch/uzh/anonym/vvz/index.html?sap-language=DE&sap-ui-language=DE#/details/2025/003/CGStudyProgramDetail/50891442/50000007/Philosophische%2520Fakult%25C3%25A4t/50890575/Bachelor%2520of%2520Arts%2520(RVO19)/true/50891442/Geschichte/2025/003",
        vvzSommer: "https://studentservices.uzh.ch/uzh/anonym/vvz/index.html?sap-language=DE&sap-ui-language=DE#/details/2024/004/CGStudyProgramDetail/50891442/50000007/Philosophische%2520Fakult%25C3%25A4t/50890575/Bachelor%2520of%2520Arts%2520(RVO19)/true/50891442/Geschichte/2024/004"
    },
    hinweise: {
        proseminare: "In den ersten beiden Semestern müssen Proseminare in zwei verschiedenen Epochen absolviert werden.",
        hauptseminare: "Die drei Hauptseminare müssen in drei verschiedenen Epochen absolviert werden.",
        epochenabdeckung: "Insgesamt müssen mindestens drei verschiedene Epochen im Studienverlauf abgedeckt werden."
    }
};
