/* ==== MSC ITET MODULE DATA ==== */
/* Alle fixen Moduldaten für den MSc ITET Studiengang */

window.StudiengangModules = [
    // #region 1.-2. Semester (Kern-/Vertiefungsfächer als Wahlmodule)
    // 1. Jahr - Kernfächer und Vertiefungsfächer sind Wahlmodule
    {
        // ============================================
        // PFLICHTFELDER
        // ============================================
        name: "Kernfächer",
        kp: 0,
        kategorie: "Kernfächer",

        // ============================================
        // KONTEXT (wenn vorhanden)
        // ============================================
        jahr: 1,
        semester: 0,

        // ============================================
        // STUDIENGANGSPEZIFISCH (optional)
        // ============================================
        isPlaceholder: true,
    },
    {
        name: "Vertiefungsfächer",
        kp: 0,
        kategorie: "Vertiefungsfächer",
        jahr: 1,
        semester: 0,
        isPlaceholder: true,
    },

    // 1. Jahr - Fixe Module
    {
        name: "Semesterprojekt",
        kp: 12,
        kategorie: "Fixe Module",
        jahr: 1,
        semester: 1,
    },
    // #endregion 1.-2. Semester (Kern-/Vertiefungsfächer als Wahlmodule)

    // #region 3. Semester (Fixe Module)
    // 2. Jahr - Fixe Module
    {
        name: "Eines der folgenden",
        kp: 12,
        kategorie: "Fixe Module",
        jahr: 2,
        semester: 1,
        inhalt: [
            "Weitere Fächer (Kern-/Vertiefungs-/Wahl-)",
            "2. Semesterprojekt",
            "Industriepraktikum"
        ]
    },
    {
        name: "Wissenschaft im Kontext",
        kp: 2,
        kategorie: "Fixe Module",
        jahr: 2,
        semester: 1,
    },
    // #endregion 3. Semester
    {
        name: "Master-Arbeit",
        kp: 30,
        kategorie: "Fixe Module",
        jahr: 2,
        semester: 2,
    }
    // #region 4. Semester
    // (Master-Arbeit)
    // #endregion 4. Semester
];
