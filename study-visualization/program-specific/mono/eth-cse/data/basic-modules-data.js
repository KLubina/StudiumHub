/* ==== CSE MODULE DATA - BEREINIGT ==== */
/* Alle Moduldaten für den CSE Studiengang - ohne hardcodierte 3. Jahr Module */

window.StudiengangModules = [
  // #region 1. Semester
  // HINWEIS: Farb-Zuordnungen (Themenbereiche & Prüfungsblöcke) befinden sich in color-config.js
  {
    // PFLICHTFELDER
    name: "Physik I",
    kp: 4,
    // KONTEXT
    jahr: 1,
    semester: 1,
  },
  {
    name: "Informatik",
    kp: 4,
    jahr: 1,
    semester: 1,
  },
  {
    name: "Lineare Algebra",
    kp: 5,
    jahr: 1,
    semester: 1,
  },
  {
    name: "Diskrete Mathematik",
    kp: 7,
    jahr: 1,
    semester: 1,
  },
  {
    name: "Analysis I",
    kp: 8,
    jahr: 1,
    semester: 1,
  },
  // #endregion 1. Semester

  // #region 2. Semester
  {
    name: "Physik II",
    kp: 4,
    jahr: 1,
    semester: 2,
  },
  {
    name: "Mathematische Methoden (ehem. Komplexe Analysis)",
    kp: 4,
    jahr: 1,
    semester: 2,
  },
  {
    name: "Chemie",
    kp: 4,
    jahr: 1,
    semester: 2,
  },
  {
    name: "Analysis II",
    kp: 8,
    jahr: 1,
    semester: 2,
  },
  {
    name: "Datenstrukturen und Algorithmen",
    kp: 8,
    jahr: 1,
    semester: 2,
  },
  // #endregion 2. Semester

  // #region 3.-4. Semester (ohne Semesterunterscheidung)
  {
    name: "Analysis III",
    kp: 4,
    jahr: 2,
  },
  {
    name: "Introduction to Mathematical Optimization",
    kp: 5,
    jahr: 2,
  },
  {
    name: "Numerische Methoden für CSE",
    kp: 9,
    jahr: 2,
  },
  {
    name: "Wahrscheinlichkeitstheorie und Statistik (ehem. Stochastik)",
    kp: 4,
    jahr: 2,
  },
  {
    name: "Numerical Methods for Partial Differential Equations",
    kp: 10,
    jahr: 2,
  },
  {
    name: "Programmiertechniken für physikalische Simulationen",
    kp: 5,
    jahr: 2,
  },
  {
    name: "Systems Programming and Computer Architecture",
    kp: 7,
    jahr: 2,
  },
  {
    name: "Wissenschaft im Kontext",
    kp: 6,
    kategorie: "wissenschaftliche-arbeit",
    jahr: 2,
  },
  {
    name: "Fluid Dynamics I",
    kp: 8,
    jahr: 2,
  },
  {
    name: "Statistische Physik und Computer Simulation",
    kp: 5,
    jahr: 2,
  },
  // #endregion 3.-4. Semester

  // #region 5.-6. Semester - Platzhalter
  {
    name: "Kernfächer",
    kp: 0,
    kategorie: "Kernfächer",
    jahr: 3,
    semester: 0,

    // ============================================
    // STUDIENGANGSPEZIFISCH
    // ============================================
    isPlaceholder: true,
  },
  {
    name: "Vertiefungsgebiet",
    kp: 0,
    kategorie: "Vertiefungsgebiet",
    jahr: 3,
    semester: 0,
    isPlaceholder: true,
  },
  {
    name: "Wahlfächer",
    kp: 0,
    kategorie: "Wahlfächer",
    jahr: 3,
    semester: 0,
    isPlaceholder: true,
  },
  // #endregion 5.-6. Semester - Platzhalter

  // #region 5.-6. Semester - Abschluss
  {
    name: "Fallstudien",
    kp: 6,
    kategorie: "wissenschaftliche-arbeit",
    jahr: 3,
    semester: 0,

    // ============================================
    // STUDIENGANGSPEZIFISCH
    // ============================================
    bereich: "Abschluss",
  },
  {
    name: "Bachelorarbeit",
    kp: 14,
    kategorie: "wissenschaftliche-arbeit",
    jahr: 3,
    semester: 0,
    bereich: "Abschluss",
  },
  // #endregion 5.-6. Semester - Abschluss
];
