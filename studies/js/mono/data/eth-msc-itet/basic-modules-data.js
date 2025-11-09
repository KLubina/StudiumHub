/* ==== MSC ITET MODULE DATA ==== */
/* Alle fixen Moduldaten für den MSc ITET Studiengang */

window.StudiengangModules = [
    // #region 1.-2. Semester (Kern-/Vertiefungsfächer als Wahlmodule)
    // 1. Jahr - Kernfächer und Vertiefungsfächer sind Wahlmodule
    { 
        jahr: 1, 
        semester: 0, 
        name: "Kernfächer", 
        kp: 0, 
        kategorie: "Kernfächer", 
        isPlaceholder: true 
    },
    { 
        jahr: 1, 
        semester: 0, 
        name: "Vertiefungsfächer", 
        kp: 0, 
        kategorie: "Vertiefungsfächer", 
        isPlaceholder: true 
    },

    // 1. Jahr - Fixe Module
    { 
        jahr: 1, 
        semester: 1, 
        name: "Semesterprojekt", 
        kp: 12, 
        kategorie: "Fixe Module" 
    },
    // #endregion 1.-2. Semester (Kern-/Vertiefungsfächer als Wahlmodule)

    // #region 3. Semester (Fixe Module)
    // 2. Jahr - Fixe Module  
    { 
        jahr: 2, 
        semester: 1, 
        name: "Eines der folgenden", 
        kp: 12, 
        kategorie: "Fixe Module",
        inhalt: [
            "Weitere Fächer (Kern-/Vertiefungs-/Wahl-)",
            "2. Semesterprojekt", 
            "Industriepraktikum"
        ]
    },
    { 
        jahr: 2, 
        semester: 1, 
        name: "Wissenschaft im Kontext", 
        kp: 2, 
        kategorie: "Fixe Module" 
    },
    // #endregion 3. Semester
    { 
        jahr: 2, 
        semester: 2, 
        name: "Master-Arbeit", 
        kp: 30, 
        kategorie: "Fixe Module" 
    }
    // #region 4. Semester
    // (Master-Arbeit)
    // #endregion 4. Semester
];