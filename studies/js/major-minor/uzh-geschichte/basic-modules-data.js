/* ==== UZH GESCHICHTE MAJOR BASIC MODULES DATA ==== */
/* Grundlegende Modulstruktur für Geschichte Major (120 ECTS) + Minor (60 ECTS) */

window.StudiengangModules = [
    // === 1. STUDIENJAHR - Modulgruppe: Einführung in die Geschichte ===
    // 1. Semester
    {
        jahr: 1,
        semester: 1,
        name: "Basismodul I",
        kp: 9,
        kategorie: "major-geschichte",
        typ: "pflicht"
    },
    {
        jahr: 1,
        semester: 1,
        name: "Einführungsvorlesung Herbst",
        kp: 3,
        kategorie: "major-geschichte",
        typ: "pflicht"
    },
    {
        jahr: 1,
        semester: 1,
        name: "Grundlagen Latein",
        kp: 6,
        kategorie: "major-geschichte",
        typ: "pflicht"
    },

    // 2. Semester
    {
        jahr: 1,
        semester: 2,
        name: "Basismodul II",
        kp: 9,
        kategorie: "major-geschichte",
        typ: "pflicht"
    },
    {
        jahr: 1,
        semester: 2,
        name: "Einführungsvorlesung Frühling",
        kp: 3,
        kategorie: "major-geschichte",
        typ: "pflicht"
    },
    {
        jahr: 1,
        semester: 2,
        name: "Grundlagen Latein",
        kp: 6,
        kategorie: "major-geschichte",
        typ: "pflicht"
    },

    // === MODULGRUPPE: ALTERTUM ===
    {
        jahr: 2,
        bereich: "Modulgruppe: Altertum",
        name: "Seminar Alte Geschichte, zweisemestrig",
        kp: 9,
        kategorie: "major-geschichte",
        typ: "wahlpflicht"
    },
    {
        jahr: 2,
        bereich: "Modulgruppe: Altertum",
        name: "Kolloquium oder Vorlesung Alte Geschichte",
        kp: 3,
        kategorie: "major-geschichte",
        typ: "wahlpflicht"
    },

    // === MODULGRUPPE: MITTELALTER ===
    {
        jahr: 2,
        bereich: "Modulgruppe: Mittelalter",
        name: "Kolloquium oder Vorlesung Geschichte des Mittelalters",
        kp: 3,
        kategorie: "major-geschichte",
        typ: "wahlpflicht"
    },
    {
        jahr: 2,
        bereich: "Modulgruppe: Mittelalter",
        name: "Seminar Geschichte des Mittelalters, zweisemestrig",
        kp: 9,
        kategorie: "major-geschichte",
        typ: "wahlpflicht"
    },

    // === MODULGRUPPE: NEUZEIT ===
    {
        jahr: 2,
        bereich: "Modulgruppe: Neuzeit",
        name: "Kolloquium oder Vorlesung Geschichte der Neuzeit",
        kp: 3,
        kategorie: "major-geschichte",
        typ: "wahlpflicht"
    },
    {
        jahr: 2,
        bereich: "Modulgruppe: Neuzeit",
        name: "Seminar Geschichte der Neuzeit, zweisemestrig",
        kp: 9,
        kategorie: "major-geschichte",
        typ: "wahlpflicht"
    },

    // === MODULGRUPPE: ABSCHLUSS ===
    {
        jahr: 3,
        bereich: "Modulgruppe: Abschluss",
        name: "Mündliche Prüfung, einsemestrig",
        kp: 9,
        kategorie: "major-geschichte",
        typ: "pflicht"
    },
    {
        jahr: 3,
        bereich: "Modulgruppe: Abschluss",
        name: "Methoden und Theorie, zweisemestrig",
        kp: 9,
        kategorie: "major-geschichte",
        typ: "pflicht"
    },
    {
        jahr: 3,
        bereich: "Modulgruppe: Abschluss",
        name: "Bachelorarbeit",
        kp: 15,
        kategorie: "major-geschichte",
        typ: "ba-arbeit"
    },

    // === MINOR (über alle Jahre) ===
    {
        jahr: 2,
        name: "Minor",
        kp: 60,
        kategorie: "minor",
        typ: "minor"
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
