/* ==== CS MODULE DATA ==== */
/* Alle Moduldaten für den CS Studiengang */

window.StudiengangModules = [
  // #region 1. Semester
  {
    jahr: 1,
    semester: 1,
    name: "Einführung in die Programmierung",
    kp: 7,
    kategorie: "cs-pure",
  },
  { jahr: 1, semester: 1, name: "Lineare Algebra", kp: 7, kategorie: "math" },
  {
    jahr: 1,
    semester: 1,
    name: "Datenstrukturen und Algorithmen",
    kp: 7,
    kategorie: "cs-cse",
  },
  {
    jahr: 1,
    semester: 1,
    name: "Diskrete Mathematik",
    kp: 7,
    kategorie: "math",
  },
  // #endregion 1. Semester

  // #region 2. Semester
  { jahr: 1, semester: 2, name: "Analysis I", kp: 7, kategorie: "math" },
  {
    jahr: 1,
    semester: 2,
    name: "Parallele Programmierung",
    kp: 7,
    kategorie: "cs-cse",
  },
  {
    jahr: 1,
    semester: 2,
    name: "Digital Design and Computer Architecture",
    kp: 7,
    kategorie: "cs-pure",
  },
  {
    jahr: 1,
    semester: 2,
    name: "Algorithmen und Wahrscheinlichkeit",
    kp: 4,
    kategorie: "algo",
  },
  // #endregion 2. Semester

  // #region 3. Semester
  {
    jahr: 2,
    semester: 1,
    name: "Numerische Methoden für CSE",
    kp: 8,
    kategorie: "cs-cse",
  },
  { jahr: 2, semester: 1, name: "Analysis II", kp: 5, kategorie: "math" },
  {
    jahr: 2,
    semester: 1,
    name: "Theoretische Informatik",
    kp: 7,
    kategorie: "cs-pure",
  },
  {
    jahr: 2,
    semester: 1,
    name: "Systemnahe Programmierung und Rechnerarchitektur",
    kp: 7,
    kategorie: "cs-cse",
  },
  // #endregion 3. Semester

  // #region 4. Semester
  {
    jahr: 2,
    semester: 2,
    name: "Wahrscheinlichkeit und Statistik",
    kp: 5,
    kategorie: "math",
  },
  {
    jahr: 2,
    semester: 2,
    name: "Computernetzwerke",
    kp: 7,
    kategorie: "cs-cse-wahl",
  },
  {
    jahr: 2,
    semester: 2,
    name: "Datenmodellierung und Datenbanken",
    kp: 7,
    kategorie: "cs-cse-wahl",
  },
  {
    jahr: 2,
    semester: 2,
    name: "Formale Methoden und Funktionale Programmierung",
    kp: 7,
    kategorie: "cs-cse-wahl",
  },
  { jahr: 2, semester: 2, name: "Ergänzung", kp: 5, kategorie: "ergaenzung" },
  {
    jahr: 2,
    semester: 2,
    name: "Wissenschaft im Kontext",
    kp: 6,
    kategorie: "wissenschaft",
  },
  // #endregion 4. Semester

  // #region 5.-6. Semester - Abschluss und Wahl/Spezialisierung
  {
    jahr: 3,
    semester: 0,
    name: "Spezialisierung",
    kp: 32,
    kategorie: "spezialisierung",
    inhalt: [
      "Software & Systems Engineering",
      "Information & Data Processing",
      "Theoretical Computer Science",
    ],
  },
  {
    jahr: 3,
    semester: 0,
    name: "Wahlfächer",
    kp: 12,
    kategorie: "wahlfaecher",
  },
  {
    jahr: 3,
    semester: 0,
    name: "Bachelorarbeit",
    kp: 10,
    kategorie: "wissenschaft",
  },
  { jahr: 3, semester: 0, name: "Seminar", kp: 2, kategorie: "wissenschaft" },
  // #endregion 5.-6. Semester - Abschluss und Wahl/Spezialisierung
];
