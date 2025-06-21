/* ==== CSE MODULE DATA ==== */
/* Alle Moduldaten für den CSE Studiengang */

window.StudiengangModules = [
    // 1. Jahr
    { jahr: 1, semester: 1, name: "Physik I", kp: 4, pruefungsblock: "Basisprüfungsblock 2", ng: 2 },
    { jahr: 1, semester: 1, name: "Informatik", kp: 4, pruefungsblock: "Basisprüfungsblock 1", ng: 1 },
    { jahr: 1, semester: 1, name: "Lineare Algebra", kp: 5, pruefungsblock: "Basisprüfungsblock 1", ng: 1 },
    { jahr: 1, semester: 1, name: "Diskrete Mathematik", kp: 7, pruefungsblock: "Basisprüfungsblock 1", ng: 1 },
    { jahr: 1, semester: 1, name: "Analysis I", kp: 8, pruefungsblock: "Basisprüfungsblock 2", ng: 3 },

    { jahr: 1, semester: 2, name: "Physik II", kp: 4, pruefungsblock: "Basisprüfungsblock 2", ng: 2 },
    { jahr: 1, semester: 2, name: "Komplexe Analysis", kp: 4, pruefungsblock: "Basisprüfungsblock 2", ng: 1 },
    { jahr: 1, semester: 2, name: "Chemie", kp: 4, pruefungsblock: "Basisprüfungsblock 2", ng: 1 },
    { jahr: 1, semester: 2, name: "Analysis II", kp: 8, pruefungsblock: "Basisprüfungsblock 2", ng: 3 },
    { jahr: 1, semester: 2, name: "Datenstrukturen und Algorithmen", kp: 8, pruefungsblock: "Basisprüfungsblock 2", ng: 2 },

    // 2. Jahr - ohne Semesterunterscheidung
    { jahr: 2, name: "Analysis III", kp: 4, pruefungsblock: "Prüfungsblock G1", ng: 1 },
    { jahr: 2, name: "Introduction to Mathematical Optimization", kp: 5, pruefungsblock: "Prüfungsblock G1", ng: 1 },
    { jahr: 2, name: "Numerische Methoden für CSE", kp: 9, pruefungsblock: "Prüfungsblock G1", ng: 2 },
    { jahr: 2, name: "Stochastik", kp: 4, pruefungsblock: "Prüfungsblock G3", ng: 1 },
    { jahr: 2, name: "Numerical Methods for Partial Differential Equations", kp: 10, pruefungsblock: "Prüfungsblock G3", ng: 2 },
    { jahr: 2, name: "Programmiertechniken für physikalische Simulationen", kp: 5, pruefungsblock: "Prüfungsblock G2", ng: 1 },
    { jahr: 2, name: "Systems Programming and Computer Architecture", kp: 7, pruefungsblock: "Prüfungsblock G2", ng: 1 },
    { jahr: 2, name: "Wissenschaft im Kontext", kp: 6, kategorie: "wissenschaftliche-arbeit" },
    { jahr: 2, name: "Fluiddynamik I", kp: 6, pruefungsblock: "Prüfungsblock G4", ng: 1 },
    { jahr: 2, name: "Molekulare Quantenmechanik", kp: 4, pruefungsblock: "Prüfungsblock G4", ng: 1 },
    { jahr: 2, name: "Physikalische Chemie III", kp: 4, pruefungsblock: "Prüfungsblock G4", ng: 1 },
    { jahr: 2, name: "Statistische Physik und Computer Simulation", kp: 5, pruefungsblock: "Prüfungsblock G4", ng: 1 },

    // 3. Jahr - Kernfächer
    { jahr: 3, semester: 0, bereich: "Kernfächer", name: "Software Engineering", kp: 6, kategorie: "kern" },
    { jahr: 3, semester: 0, bereich: "Kernfächer", name: "Design of High Performance Computing", kp: 6, kategorie: "kern" },
    { jahr: 3, semester: 0, bereich: "Kernfächer", name: "Introduction into Machine Learning", kp: 8, kategorie: "kern" },

    // 3. Jahr - Vertiefungsgebiet
    { jahr: 3, semester: 0, bereich: "Vertiefungsgebiet", name: "3D Vision", kp: 4, kategorie: "vertiefung" },
    { jahr: 3, semester: 0, bereich: "Vertiefungsgebiet", name: "Image Analysis and Computer Vision", kp: 6, kategorie: "vertiefung" },

    // 3. Jahr - Wahlfächer
    { jahr: 3, semester: 0, bereich: "Wahlfächer", name: "Information Systems for Engineers", kp: 5, kategorie: "wahl" },
    { jahr: 3, semester: 0, bereich: "Wahlfächer", name: "Communication Networks", kp: 6, kategorie: "wahl" },

    // 3. Jahr - Abschluss
    { jahr: 3, semester: 0, bereich: "Abschluss", name: "Fallstudien", kp: 6, kategorie: "wissenschaftliche-arbeit" },
    { jahr: 3, semester: 0, bereich: "Abschluss", name: "Bachelorarbeit", kp: 14, kategorie: "wissenschaftliche-arbeit" }
];