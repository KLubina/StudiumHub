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
    // PFLICHTFELDER
    name: "Informatik",
    kp: 4,
    // KONTEXT
    jahr: 1,
    semester: 1,
  },
  {
    // PFLICHTFELDER
    name: "Lineare Algebra",
    kp: 5,
    // KONTEXT
    jahr: 1,
    semester: 1,
  },
  {
    // PFLICHTFELDER
    name: "Diskrete Mathematik",
    kp: 7,
    // KONTEXT
    jahr: 1,
    semester: 1,
  },
  {
    // PFLICHTFELDER
    name: "Analysis I",
    kp: 8,
    // KONTEXT
    jahr: 1,
    semester: 1,
  },
  // #endregion 1. Semester

  // #region 2. Semester
  {
    // PFLICHTFELDER
    name: "Physik II",
    kp: 4,
    // KONTEXT
    jahr: 1,
    semester: 2,
  },
  {
    // PFLICHTFELDER
    name: "Mathematische Methoden (ehem. Komplexe Analysis)",
    kp: 4,
    // KONTEXT
    jahr: 1,
    semester: 2,
  },
  {
    // PFLICHTFELDER
    name: "Chemie",
    kp: 4,
    // KONTEXT
    jahr: 1,
    semester: 2,
  },
  {
    // PFLICHTFELDER
    name: "Analysis II",
    kp: 8,
    // KONTEXT
    jahr: 1,
    semester: 2,
  },
  {
    // PFLICHTFELDER
    name: "Datenstrukturen und Algorithmen",
    kp: 8,
    // KONTEXT
    jahr: 1,
    semester: 2,
  },
  // #endregion 2. Semester

  // #region 3.-4. Semester (ohne Semesterunterscheidung)
  {
    // PFLICHTFELDER
    name: "Analysis III",
    kp: 4,
    // KONTEXT
    jahr: 2,
  },
  {
    // PFLICHTFELDER
    name: "Introduction to Mathematical Optimization",
    kp: 5,
    // KONTEXT
    jahr: 2,
  },
  {
    // PFLICHTFELDER
    name: "Numerische Methoden für CSE",
    kp: 9,
    // KONTEXT
    jahr: 2,
  },
  {
    // PFLICHTFELDER
    name: "Wahrscheinlichkeitstheorie und Statistik (ehem. Stochastik)",
    kp: 4,
    // KONTEXT
    jahr: 2,
  },
  {
    // PFLICHTFELDER
    name: "Numerical Methods for Partial Differential Equations",
    kp: 10,
    // KONTEXT
    jahr: 2,
  },
  {
    // PFLICHTFELDER
    name: "Programmiertechniken für physikalische Simulationen",
    kp: 5,
    // KONTEXT
    jahr: 2,
  },
  {
    // PFLICHTFELDER
    name: "Systems Programming and Computer Architecture",
    kp: 7,
    // KONTEXT
    jahr: 2,
  },
  {
    // PFLICHTFELDER
    name: "Wissenschaft im Kontext",
    kp: 6,
    kategorie: "wissenschaftliche-arbeit",
    // KONTEXT
    jahr: 2,
  },
  {
    // PFLICHTFELDER
    name: "Fluid Dynamics I",
    kp: 8,
    // KONTEXT
    jahr: 2,
  },
  {
    // PFLICHTFELDER
    name: "Statistische Physik und Computer Simulation",
    kp: 5,
    // KONTEXT
    jahr: 2,
  },
  // #endregion 3.-4. Semester

  // #region 5.-6. Semester - Platzhalter
  {
    // PFLICHTFELDER
    name: "Kernfächer",
    kp: 0,
    kategorie: "Kernfächer",
    // KONTEXT
    jahr: 3,
    semester: 0,
    // STUDIENGANGSPEZIFISCH
    isPlaceholder: true,
  },
  {
    // PFLICHTFELDER
    name: "Vertiefungsgebiet",
    kp: 0,
    kategorie: "Vertiefungsgebiet",
    // KONTEXT
    jahr: 3,
    semester: 0,
    // STUDIENGANGSPEZIFISCH
    isPlaceholder: true,
  },
  {
    // PFLICHTFELDER
    name: "Wahlfächer",
    kp: 0,
    kategorie: "Wahlfächer",
    // KONTEXT
    jahr: 3,
    semester: 0,
    // STUDIENGANGSPEZIFISCH
    isPlaceholder: true,
  },
  // #endregion 5.-6. Semester - Platzhalter

  // #region 5.-6. Semester - Abschluss
  {
    // PFLICHTFELDER
    name: "Fallstudien",
    kp: 6,
    kategorie: "wissenschaftliche-arbeit",
    // KONTEXT
    jahr: 3,
    semester: 0,
    // STUDIENGANGSPEZIFISCH
    bereich: "Abschluss",
  },
  {
    // PFLICHTFELDER
    name: "Bachelorarbeit",
    kp: 14,
    kategorie: "wissenschaftliche-arbeit",
    // KONTEXT
    jahr: 3,
    semester: 0,
    // STUDIENGANGSPEZIFISCH
    bereich: "Abschluss",
  },
  // #endregion 5.-6. Semester - Abschluss
];
