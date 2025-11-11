/* ==== CS MODULE DATA ==== */
/* Alle Moduldaten für den CS Studiengang */

window.StudiengangModules = [
  // #region 1. Semester
  {
    // PFLICHTFELDER
    name: "Einführung in die Programmierung",
    ects: 7,
    standardcategory: "cs-pure",
    // KONTEXT
    jahr: 1,
    semester: 1,
  },
  {
    // PFLICHTFELDER
    name: "Lineare Algebra",
    ects: 7,
    standardcategory: "math",
    // KONTEXT
    jahr: 1,
    semester: 1,
  },
  {
    // PFLICHTFELDER
    name: "Datenstrukturen und Algorithmen",
    ects: 7,
    standardcategory: "cs-cse",
    // KONTEXT
    jahr: 1,
    semester: 1,
  },
  {
    // PFLICHTFELDER
    name: "Diskrete Mathematik",
    ects: 7,
    standardcategory: "math",
    // KONTEXT
    jahr: 1,
    semester: 1,
  },
  // #endregion 1. Semester

  // #region 2. Semester
  {
    // PFLICHTFELDER
    name: "Analysis I",
    ects: 7,
    standardcategory: "math",
    // KONTEXT
    jahr: 1,
    semester: 2,
  },
  {
    // PFLICHTFELDER
    name: "Parallele Programmierung",
    ects: 7,
    standardcategory: "cs-cse",
    // KONTEXT
    jahr: 1,
    semester: 2,
  },
  {
    // PFLICHTFELDER
    name: "Digital Design and Computer Architecture",
    ects: 7,
    standardcategory: "cs-pure",
    // KONTEXT
    jahr: 1,
    semester: 2,
  },
  {
    // PFLICHTFELDER
    name: "Algorithmen und Wahrscheinlichkeit",
    ects: 4,
    standardcategory: "algo",
    // KONTEXT
    jahr: 1,
    semester: 2,
  },
  // #endregion 2. Semester

  // #region 3. Semester
  {
    // PFLICHTFELDER
    name: "Numerische Methoden für CSE",
    ects: 8,
    standardcategory: "cs-cse",
    // KONTEXT
    jahr: 2,
    semester: 1,
  },
  {
    // PFLICHTFELDER
    name: "Analysis II",
    ects: 5,
    standardcategory: "math",
    // KONTEXT
    jahr: 2,
    semester: 1,
  },
  {
    // PFLICHTFELDER
    name: "Theoretische Informatik",
    ects: 7,
    standardcategory: "cs-pure",
    // KONTEXT
    jahr: 2,
    semester: 1,
  },
  {
    // PFLICHTFELDER
    name: "Systemnahe Programmierung und Rechnerarchitektur",
    ects: 7,
    standardcategory: "cs-cse",
    // KONTEXT
    jahr: 2,
    semester: 1,
  },
  // #endregion 3. Semester

  // #region 4. Semester
  {
    // PFLICHTFELDER
    name: "Wahrscheinlichkeit und Statistik",
    ects: 5,
    standardcategory: "math",
    // KONTEXT
    jahr: 2,
    semester: 2,
  },
  {
    // PFLICHTFELDER
    name: "Computernetzwerke",
    ects: 7,
    standardcategory: "cs-cse-wahl",
    // KONTEXT
    jahr: 2,
    semester: 2,
  },
  {
    // PFLICHTFELDER
    name: "Datenmodellierung und Datenbanken",
    ects: 7,
    standardcategory: "cs-cse-wahl",
    // KONTEXT
    jahr: 2,
    semester: 2,
  },
  {
    // PFLICHTFELDER
    name: "Formale Methoden und Funktionale Programmierung",
    ects: 7,
    standardcategory: "cs-cse-wahl",
    // KONTEXT
    jahr: 2,
    semester: 2,
  },
  {
    // PFLICHTFELDER
    name: "Ergänzung",
    ects: 5,
    standardcategory: "ergaenzung",
    // KONTEXT
    jahr: 2,
    semester: 2,
  },
  {
    // PFLICHTFELDER
    name: "Wissenschaft im Kontext",
    ects: 6,
    standardcategory: "wissenschaft",
    // KONTEXT
    jahr: 2,
    semester: 2,
  },
  // #endregion 4. Semester

  // #region 5.-6. Semester - Abschluss und Wahl/Spezialisierung
  {
    // PFLICHTFELDER
    name: "Spezialisierung",
    ects: 32,
    standardcategory: "spezialisierung",
    // KONTEXT
    jahr: 3,
    semester: 0,
    // STUDIENGANGSPEZIFISCH
    inhalt: [
      "Software & Systems Engineering",
      "Information & Data Processing",
      "Theoretical Computer Science",
    ],
  },
  {
    // PFLICHTFELDER
    name: "Wahlfächer",
    ects: 12,
    standardcategory: "wahlfaecher",
    // KONTEXT
    jahr: 3,
    semester: 0,
  },
  {
    // PFLICHTFELDER
    name: "Bachelorarbeit",
    ects: 10,
    standardcategory: "wissenschaft",
    // KONTEXT
    jahr: 3,
    semester: 0,
  },
  {
    // PFLICHTFELDER
    name: "Seminar",
    ects: 2,
    standardcategory: "wissenschaft",
    // KONTEXT
    jahr: 3,
    semester: 0,
  },
  // #endregion 5.-6. Semester - Abschluss und Wahl/Spezialisierung
];
