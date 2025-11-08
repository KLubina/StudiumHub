/* ==== UZH POLITIKWISSENSCHAFT MAJOR BASIC MODULES DATA ==== */
/* Grundlegende Modulstruktur für Politikwissenschaft Major (120 ECTS) + Minor (60 ECTS) */

window.StudiengangModules = [
    // === 1. STUDIENJAHR (60 ECTS) ===
    // Herbstsemester (30 ECTS)
    {
        jahr: 1,
        semester: 1,
        name: "Politische Systeme und Theorien I",
        kp: 9,
        kategorie: "major-polisci",
        typ: "pflicht"
    },
    {
        jahr: 1,
        semester: 1,
        name: "Einführung in die Schweizer Politik",
        kp: 3,
        kategorie: "major-polisci",
        typ: "pflicht"
    },
    {
        jahr: 1,
        semester: 1,
        name: "Einführung Methoden und Statistik",
        kp: 3,
        kategorie: "major-polisci",
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
        name: "Politische Systeme und Theorien II",
        kp: 9,
        kategorie: "major-polisci",
        typ: "pflicht"
    },
    {
        jahr: 1,
        semester: 2,
        name: "Aufbaukurs Methoden und Statistik",
        kp: 6,
        kategorie: "major-polisci",
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
        name: "Fortgeschrittene Methoden und Statistik",
        kp: 6,
        kategorie: "major-polisci",
        typ: "methoden"
    },
    {
        jahr: 2,
        semester: 1,
        name: "Vorlesung (Wahlpflicht)",
        kp: 3,
        kategorie: "major-polisci",
        typ: "wahlpflicht"
    },
    {
        jahr: 2,
        semester: 1,
        name: "Seminar (Wahlpflicht)",
        kp: 6,
        kategorie: "major-polisci",
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
        name: "Einführung in die qualitativen Methoden",
        kp: 6,
        kategorie: "major-polisci",
        typ: "methoden"
    },
    {
        jahr: 2,
        semester: 2,
        name: "Vorlesung (Wahlpflicht)",
        kp: 3,
        kategorie: "major-polisci",
        typ: "wahlpflicht"
    },
    {
        jahr: 2,
        semester: 2,
        name: "Seminar (Wahlpflicht)",
        kp: 6,
        kategorie: "major-polisci",
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
        name: "Vorlesung (Wahlpflicht)",
        kp: 3,
        kategorie: "major-polisci",
        typ: "wahlpflicht"
    },
    {
        jahr: 3,
        semester: 1,
        name: "Seminar (Wahlpflicht)",
        kp: 6,
        kategorie: "major-polisci",
        typ: "wahlpflicht"
    },
    {
        jahr: 3,
        semester: 1,
        name: "Spezialisierung / Wahlmodule",
        kp: 6,
        kategorie: "major-polisci",
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
        name: "Bachelorarbeit Politikwissenschaft",
        kp: 15,
        kategorie: "major-polisci",
        typ: "ba-arbeit"
    },
    {
        jahr: 3,
        semester: 2,
        name: "Spezialisierung / Wahlmodule",
        kp: 15,
        kategorie: "major-polisci",
        typ: "wahlpflicht"
    }
];

// Zusätzliche Informationen
window.StudiengangInfo = {
    totalECTS: 180,
    majorECTS: 120,
    minorECTS: 60,
    struktur: {
        pflichtmodule: 30,
        methodenmodule: 21,
        wahlpflichtmodule: 54,
        bachelorarbeit: 15
    },
    links: {
        studieninfo: "https://www.ipz.uzh.ch/de/studium/bachelor.html",
        struktur: "https://www.ipz.uzh.ch/dam/jcr:3ce2fb20-6387-49ce-93d6-bf3c0eede695/Struktur_BA_Politikwissenschaft_Major_2024_SA_HD.pdf",
        vvzHerbst: "https://studentservices.uzh.ch/uzh/anonym/vvz/index.html?sap-language=DE&sap-ui-language=DE#/details/2025/003/CGStudyProgramDetail/50893129/50000007/Philosophische%2520Fakult%25C3%25A4t/50890576/Bachelor%2520of%2520Arts%2520in%2520Sozialwissenschaften%2520(RVO19)/true/50893129/Politikwissenschaft/2025/003",
        vvzSommer: "https://studentservices.uzh.ch/uzh/anonym/vvz/index.html?sap-language=DE&sap-ui-language=DE#/details/2024/004/CGStudyProgramDetail/50893129/50000007/Philosophische%2520Fakult%25C3%25A4t/50890576/Bachelor%2520of%2520Arts%2520in%2520Sozialwissenschaften%2520(RVO19)/true/50893129/Politikwissenschaft/2024/004"
    }
};
