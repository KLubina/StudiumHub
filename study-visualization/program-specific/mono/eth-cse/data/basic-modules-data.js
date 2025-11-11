/* ==== CSE MODULE DATA - BEREINIGT ==== */
/* Alle Moduldaten für den CSE Studiengang - ohne hardcodierte 3. Jahr Module */

window.StudiengangModules = [
  // #region 1. Semester
  // HINWEIS: Farb-Zuordnungen (Themenbereiche & Prüfungsblöcke) befinden sich in color-config.js
  {
    // PFLICHTFELDER
    name: "Physik I",
    ects: 4,
    // KONTEXT
    year: 1,
    semester: 1,
  },
  {
    // PFLICHTFELDER
    name: "Informatik",
    ects: 4,
    // KONTEXT
    year: 1,
    semester: 1,
  },
  {
    // PFLICHTFELDER
    name: "Lineare Algebra",
    ects: 5,
    // KONTEXT
    year: 1,
    semester: 1,
  },
  {
    // PFLICHTFELDER
    name: "Diskrete Mathematik",
    ects: 7,
    // KONTEXT
    year: 1,
    semester: 1,
  },
  {
    // PFLICHTFELDER
    name: "Analysis I",
    ects: 8,
    // KONTEXT
    year: 1,
    semester: 1,
  },
  // #endregion 1. Semester

  // #region 2. Semester
  {
    // PFLICHTFELDER
    name: "Physik II",
    ects: 4,
    // KONTEXT
    year: 1,
    semester: 2,
  },
  {
    // PFLICHTFELDER
    name: "Mathematische Methoden (ehem. Komplexe Analysis)",
    ects: 4,
    // KONTEXT
    year: 1,
    semester: 2,
  },
  {
    // PFLICHTFELDER
    name: "Chemie",
    ects: 4,
    // KONTEXT
    year: 1,
    semester: 2,
  },
  {
    // PFLICHTFELDER
    name: "Analysis II",
    ects: 8,
    // KONTEXT
    year: 1,
    semester: 2,
  },
  {
    // PFLICHTFELDER
    name: "Datenstrukturen und Algorithmen",
    ects: 8,
    // KONTEXT
    year: 1,
    semester: 2,
  },
  // #endregion 2. Semester

  // #region 3.-4. Semester (ohne Semesterunterscheidung)
  {
    // PFLICHTFELDER
    name: "Analysis III",
    ects: 4,
    // KONTEXT
    year: 2,
  },
  {
    // PFLICHTFELDER
    name: "Introduction to Mathematical Optimization",
    ects: 5,
    // KONTEXT
    year: 2,
  },
  {
    // PFLICHTFELDER
    name: "Numerische Methoden für CSE",
    ects: 9,
    // KONTEXT
    year: 2,
  },
  {
    // PFLICHTFELDER
    name: "Wahrscheinlichkeitstheorie und Statistik (ehem. Stochastik)",
    ects: 4,
    // KONTEXT
    year: 2,
  },
  {
    // PFLICHTFELDER
    name: "Numerical Methods for Partial Differential Equations",
    ects: 10,
    // KONTEXT
    year: 2,
  },
  {
    // PFLICHTFELDER
    name: "Programmiertechniken für physikalische Simulationen",
    ects: 5,
    // KONTEXT
    year: 2,
  },
  {
    // PFLICHTFELDER
    name: "Systems Programming and Computer Architecture",
    ects: 7,
    // KONTEXT
    year: 2,
  },
  {
    // PFLICHTFELDER
    name: "Wissenschaft im Kontext",
    ects: 6,
    standardcategory: "wissenschaftliche-arbeit",
    // KONTEXT
    year: 2,
  },
  {
    // PFLICHTFELDER
    name: "Fluid Dynamics I",
    ects: 8,
    // KONTEXT
    year: 2,
  },
  {
    // PFLICHTFELDER
    name: "Statistische Physik und Computer Simulation",
    ects: 5,
    // KONTEXT
    year: 2,
  },
  // #endregion 3.-4. Semester

  // #region 5.-6. Semester - Platzhalter
  {
    // PFLICHTFELDER
    name: "Kernfächer",
    ects: 0,
    standardcategory: "Kernfächer",
    // KONTEXT
    year: 3,
    semester: 0,
    // STUDIENGANGSPEZIFISCH
    isPlaceholder: true,
  },
  {
    // PFLICHTFELDER
    name: "Vertiefungsgebiet",
    ects: 0,
    standardcategory: "Vertiefungsgebiet",
    // KONTEXT
    year: 3,
    semester: 0,
    // STUDIENGANGSPEZIFISCH
    isPlaceholder: true,
  },
  {
    // PFLICHTFELDER
    name: "Wahlfächer",
    ects: 0,
    standardcategory: "Wahlfächer",
    // KONTEXT
    year: 3,
    semester: 0,
    // STUDIENGANGSPEZIFISCH
    isPlaceholder: true,
  },
  // #endregion 5.-6. Semester - Platzhalter

  // #region 5.-6. Semester - Abschluss
  {
    // PFLICHTFELDER
    name: "Fallstudien",
    ects: 6,
    standardcategory: "wissenschaftliche-arbeit",
    // KONTEXT
    year: 3,
    semester: 0,
    // STUDIENGANGSPEZIFISCH
    bereich: "Abschluss",
  },
  {
    // PFLICHTFELDER
    name: "Bachelorarbeit",
    ects: 14,
    standardcategory: "wissenschaftliche-arbeit",
    // KONTEXT
    year: 3,
    semester: 0,
    // STUDIENGANGSPEZIFISCH
    bereich: "Abschluss",
  },
  // #endregion 5.-6. Semester - Abschluss
];
