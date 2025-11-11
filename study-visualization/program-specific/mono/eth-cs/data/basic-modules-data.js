/* ==== CS MODULE DATA ==== */
/* Alle Moduldaten für den CS Studiengang */

window.StudiengangModules = [
  // #region 1. Semester
  {
    // PFLICHTFELDER
    name: "Einführung in die Programmierung",
    kp: 7,
    kategorie: "cs-pure",
    // KONTEXT
    jahr: 1,
    semester: 1,
  },
  {
    name: "Lineare Algebra",
    kp: 7,
    kategorie: "math",
    jahr: 1,
    semester: 1,
  },
  {
    name: "Datenstrukturen und Algorithmen",
    kp: 7,
    kategorie: "cs-cse",
    jahr: 1,
    semester: 1,
  },
  {
    name: "Diskrete Mathematik",
    kp: 7,
    kategorie: "math",
    jahr: 1,
    semester: 1,
  },
  // #endregion 1. Semester

  // #region 2. Semester
  {
    name: "Analysis I",
    kp: 7,
    kategorie: "math",
    jahr: 1,
    semester: 2,
  },
  {
    name: "Parallele Programmierung",
    kp: 7,
    kategorie: "cs-cse",
    jahr: 1,
    semester: 2,
  },
  {
    name: "Digital Design and Computer Architecture",
    kp: 7,
    kategorie: "cs-pure",
    jahr: 1,
    semester: 2,
  },
  {
    name: "Algorithmen und Wahrscheinlichkeit",
    kp: 4,
    kategorie: "algo",
    jahr: 1,
    semester: 2,
  },
  // #endregion 2. Semester

  // #region 3. Semester
  {
    name: "Numerische Methoden für CSE",
    kp: 8,
    kategorie: "cs-cse",
    jahr: 2,
    semester: 1,
  },
  {
    name: "Analysis II",
    kp: 5,
    kategorie: "math",
    jahr: 2,
    semester: 1,
  },
  {
    name: "Theoretische Informatik",
    kp: 7,
    kategorie: "cs-pure",
    jahr: 2,
    semester: 1,
  },
  {
    name: "Systemnahe Programmierung und Rechnerarchitektur",
    kp: 7,
    kategorie: "cs-cse",
    jahr: 2,
    semester: 1,
  },
  // #endregion 3. Semester

  // #region 4. Semester
  {
    name: "Wahrscheinlichkeit und Statistik",
    kp: 5,
    kategorie: "math",
    jahr: 2,
    semester: 2,
  },
  {
    name: "Computernetzwerke",
    kp: 7,
    kategorie: "cs-cse-wahl",
    jahr: 2,
    semester: 2,
  },
  {
    name: "Datenmodellierung und Datenbanken",
    kp: 7,
    kategorie: "cs-cse-wahl",
    jahr: 2,
    semester: 2,
  },
  {
    name: "Formale Methoden und Funktionale Programmierung",
    kp: 7,
    kategorie: "cs-cse-wahl",
    jahr: 2,
    semester: 2,
  },
  {
    name: "Ergänzung",
    kp: 5,
    kategorie: "ergaenzung",
    jahr: 2,
    semester: 2,
  },
  {
    name: "Wissenschaft im Kontext",
    kp: 6,
    kategorie: "wissenschaft",
    jahr: 2,
    semester: 2,
  },
  // #endregion 4. Semester

  // #region 5.-6. Semester - Abschluss und Wahl/Spezialisierung
  {
    name: "Spezialisierung",
    kp: 32,
    kategorie: "spezialisierung",
    jahr: 3,
    semester: 0,

    // ============================================
    // STUDIENGANGSPEZIFISCH
    // ============================================
    inhalt: [
      "Software & Systems Engineering",
      "Information & Data Processing",
      "Theoretical Computer Science",
    ],
  },
  {
    name: "Wahlfächer",
    kp: 12,
    kategorie: "wahlfaecher",
    jahr: 3,
    semester: 0,
  },
  {
    name: "Bachelorarbeit",
    kp: 10,
    kategorie: "wissenschaft",
    jahr: 3,
    semester: 0,
  },
  {
    name: "Seminar",
    kp: 2,
    kategorie: "wissenschaft",
    jahr: 3,
    semester: 0,
  },
  // #endregion 5.-6. Semester - Abschluss und Wahl/Spezialisierung
];
