/* ==== MSC ITET MODULE DATA ==== */
/* Alle fixen Moduldaten für den MSc ITET Studiengang */

window.StudiengangModules = [
    // #region 1.-2. Semester (Kern-/Vertiefungsfächer als Wahlmodule)
    // 1. Jahr - Kernfächer und Vertiefungsfächer sind Wahlmodule
    {
        // PFLICHTFELDER
        name: "Kernfächer",
        ects: 0,
        standardcategory: "Kernfächer",
        // KONTEXT
        year: 1,
        semester: 0,
        // STUDIENGANGSPEZIFISCH
        isPlaceholder: true,
    },
    {
        // PFLICHTFELDER
        name: "Vertiefungsfächer",
        ects: 0,
        standardcategory: "Vertiefungsfächer",
        // KONTEXT
        year: 1,
        semester: 0,
        // STUDIENGANGSPEZIFISCH
        isPlaceholder: true,
    },

    // 1. Jahr - Fixe Module
    {
        // PFLICHTFELDER
        name: "Semesterprojekt",
        ects: 12,
        standardcategory: "Fixe Module",
        // KONTEXT
        year: 1,
        semester: 1,
    },
    // #endregion 1.-2. Semester (Kern-/Vertiefungsfächer als Wahlmodule)

    // #region 3. Semester (Fixe Module)
    // 2. Jahr - Fixe Module
    {
        // PFLICHTFELDER
        name: "Eines der folgenden",
        ects: 12,
        standardcategory: "Fixe Module",
        // KONTEXT
        year: 2,
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
        ects: 2,
        standardcategory: "Fixe Module",
        // KONTEXT
        year: 2,
        semester: 1,
    },
    // #endregion 3. Semester
    {
        // PFLICHTFELDER
        name: "Master-Arbeit",
        ects: 30,
        standardcategory: "Fixe Module",
        // KONTEXT
        year: 2,
        semester: 2,
    }
    // #region 4. Semester
    // (Master-Arbeit)
    // #endregion 4. Semester
];
