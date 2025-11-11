/* ==== MSC ITET MODULE DATA ==== */
/* Alle fixen Moduldaten für den MSc ITET Studiengang */

window.StudiengangModules = [
    // #region 1.-2. Semester (Kern-/Vertiefungsfächer als Wahlmodule)
    // 1. Jahr - Kernfächer und Vertiefungsfächer sind Wahlmodule
    {
        // PFLICHTFELDER
        name: "Kernfächer",
        kp: 0,
        kategorie: "Kernfächer",
        // KONTEXT
        jahr: 1,
        semester: 0,
        // STUDIENGANGSPEZIFISCH
        isPlaceholder: true,
    },
    {
        // PFLICHTFELDER
        name: "Vertiefungsfächer",
        kp: 0,
        kategorie: "Vertiefungsfächer",
        // KONTEXT
        jahr: 1,
        semester: 0,
        // STUDIENGANGSPEZIFISCH
        isPlaceholder: true,
    },

    // 1. Jahr - Fixe Module
    {
        // PFLICHTFELDER
        name: "Semesterprojekt",
        kp: 12,
        kategorie: "Fixe Module",
        // KONTEXT
        jahr: 1,
        semester: 1,
    },
    // #endregion 1.-2. Semester (Kern-/Vertiefungsfächer als Wahlmodule)

    // #region 3. Semester (Fixe Module)
    // 2. Jahr - Fixe Module
    {
        // PFLICHTFELDER
        name: "Eines der folgenden",
        kp: 12,
        kategorie: "Fixe Module",
        // KONTEXT
        jahr: 2,
        semester: 1,
        // STUDIENGANGSPEZIFISCH
        inhalt: [
            "Weitere Fächer (Kern-/Vertiefungs-/Wahl-)",
            "2. Semesterprojekt",
            "Industriepraktikum"
        ]
    },
    {
        // PFLICHTFELDER
        name: "Wissenschaft im Kontext",
        kp: 2,
        kategorie: "Fixe Module",
        // KONTEXT
        jahr: 2,
        semester: 1,
    },
    // #endregion 3. Semester
    {
        // PFLICHTFELDER
        name: "Master-Arbeit",
        kp: 30,
        kategorie: "Fixe Module",
        // KONTEXT
        jahr: 2,
        semester: 2,
    }
    // #region 4. Semester
    // (Master-Arbeit)
    // #endregion 4. Semester
];
