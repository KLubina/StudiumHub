/* ==== CSE MODULE DATA - BEREINIGT ==== */
/* Alle Moduldaten für den CSE Studiengang - ohne hardcodierte 3. Jahr Module */

window.StudiengangModules = [
  // #region Jahr 1 - Semester 1
  // HINWEIS: Farb-Zuordnungen (Themenbereiche & Prüfungsblöcke) befinden sich in color-config.js

  { jahr: 1, semester: 1, name: "Physik I", kp: 4, ng: 2 },
  { jahr: 1, semester: 1, name: "Informatik", kp: 4, ng: 1 },
  { jahr: 1, semester: 1, name: "Lineare Algebra", kp: 5, ng: 1 },
  { jahr: 1, semester: 1, name: "Diskrete Mathematik", kp: 7, ng: 1 },
  { jahr: 1, semester: 1, name: "Analysis I", kp: 8, ng: 3 },

  // #endregion Jahr 1 - Semester 1

  // #region Jahr 1 - Semester 2
  { jahr: 1, semester: 2, name: "Physik II", kp: 4, ng: 2 },
  {
    jahr: 1,
    semester: 2,
    name: "Mathematische Methoden (ehem. Komplexe Analysis)",
    kp: 4,
    ng: 1,
  },
  { jahr: 1, semester: 2, name: "Chemie", kp: 4, ng: 1 },
  { jahr: 1, semester: 2, name: "Analysis II", kp: 8, ng: 3 },
  {
    jahr: 1,
    semester: 2,
    name: "Datenstrukturen und Algorithmen",
    kp: 8,
    ng: 2,
  },
  // #endregion Jahr 1 - Semester 2

  // #region Jahr 2 (ohne Semesterunterscheidung)
  { jahr: 2, name: "Analysis III", kp: 4, ng: 1 },
  { jahr: 2, name: "Introduction to Mathematical Optimization", kp: 5, ng: 1 },
  { jahr: 2, name: "Numerische Methoden für CSE", kp: 9, ng: 2 },
  {
    jahr: 2,
    name: "Wahrscheinlichkeitstheorie und Statistik (ehem. Stochastik)",
    kp: 4,
    ng: 1,
  },
  {
    jahr: 2,
    name: "Numerical Methods for Partial Differential Equations",
    kp: 10,
    ng: 2,
  },
  {
    jahr: 2,
    name: "Programmiertechniken für physikalische Simulationen",
    kp: 5,
    ng: 1,
  },
  {
    jahr: 2,
    name: "Systems Programming and Computer Architecture",
    kp: 7,
    ng: 1,
  },
  {
    jahr: 2,
    name: "Wissenschaft im Kontext",
    kp: 6,
    kategorie: "wissenschaftliche-arbeit",
  },
  { jahr: 2, name: "Fluid Dynamics I", kp: 8, ng: 1 },
  {
    jahr: 2,
    name: "Statistische Physik und Computer Simulation",
    kp: 5,
    ng: 1,
  },
  // #endregion Jahr 2

  // #region Jahr 3 - Platzhalter
  {
    jahr: 3,
    semester: 0,
    name: "Kernfächer",
    kp: 0,
    kategorie: "Kernfächer",
    isPlaceholder: true,
  },
  {
    jahr: 3,
    semester: 0,
    name: "Vertiefungsgebiet",
    kp: 0,
    kategorie: "Vertiefungsgebiet",
    isPlaceholder: true,
  },
  {
    jahr: 3,
    semester: 0,
    name: "Wahlfächer",
    kp: 0,
    kategorie: "Wahlfächer",
    isPlaceholder: true,
  },

  // #endregion Jahr 3 - Platzhalter

  // #region Jahr 3 - Abschluss
  {
    jahr: 3,
    semester: 0,
    bereich: "Abschluss",
    name: "Fallstudien",
    kp: 6,
    kategorie: "wissenschaftliche-arbeit",
  },
  {
    jahr: 3,
    semester: 0,
    bereich: "Abschluss",
    name: "Bachelorarbeit",
    kp: 14,
    kategorie: "wissenschaftliche-arbeit",
  },
  // #endregion Jahr 3 - Abschluss
];
