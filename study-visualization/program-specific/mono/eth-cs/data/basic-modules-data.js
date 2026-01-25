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
    year: 1,
    semester: 1,
  },
  {
    // PFLICHTFELDER
    name: "Lineare Algebra",
    ects: 7,
    standardcategory: "math",
    // KONTEXT
    year: 1,
    semester: 1,
  },
  {
    // PFLICHTFELDER
    name: "Algorithmen und Datenstrukturen",
    ects: 7,
    standardcategory: "cs-cse",
    // KONTEXT
    year: 1,
    semester: 1,
  },
  {
    // PFLICHTFELDER
    name: "Diskrete Mathematik",
    ects: 7,
    standardcategory: "math",
    // KONTEXT
    year: 1,
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
    year: 1,
    semester: 2,
  },
  {
    // PFLICHTFELDER
    name: "Parallele Programmierung",
    ects: 7,
    standardcategory: "cs-cse",
    // KONTEXT
    year: 1,
    semester: 2,
  },
  {
    // PFLICHTFELDER
    name: "Digital Design and Computer Architecture",
    ects: 7,
    standardcategory: "cs-pure",
    // KONTEXT
    year: 1,
    semester: 2,
  },
  {
    // PFLICHTFELDER
    name: "Algorithmen und Wahrscheinlichkeit",
    ects: 4,
    standardcategory: "algo",
    // KONTEXT
    year: 1,
    semester: 2,
  },
  // #endregion 2. Semester

  // #region 3. Semester
  {
    // PFLICHTFELDER
    name: "Numerische Methoden für Informatik",
    ects: 8,
    standardcategory: "cs-cse",
    // KONTEXT
    year: 2,
    semester: 1,
  },
  {
    // PFLICHTFELDER
    name: "Analysis II",
    ects: 5,
    standardcategory: "math",
    // KONTEXT
    year: 2,
    semester: 1,
  },
  {
    // PFLICHTFELDER
    name: "Theoretische Informatik",
    ects: 7,
    standardcategory: "cs-pure",
    // KONTEXT
    year: 2,
    semester: 1,
  },
  {
    // PFLICHTFELDER
    name: "Systems Programming and Computer Architecture",
    ects: 7,
    standardcategory: "cs-cse",
    // KONTEXT
    year: 2,
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
    year: 2,
    semester: 2,
  },
  {
    // PFLICHTFELDER
    name: "Computer Networks",
    ects: 7,
    standardcategory: "cs-cse-wahl",
    // KONTEXT
    year: 2,
    semester: 2,
  },
  {
    // PFLICHTFELDER
    name: "Data Modelling and Databases",
    ects: 7,
    standardcategory: "cs-cse-wahl",
    // KONTEXT
    year: 2,
    semester: 2,
  },
  {
    // PFLICHTFELDER
    name: "Formal Methods and Functional Programming",
    ects: 7,
    standardcategory: "cs-cse-wahl",
    // KONTEXT
    year: 2,
    semester: 2,
  },
  {
    // PFLICHTFELDER
    name: "Ergänzung",
    ects: 5,
    standardcategory: "ergaenzung",
    // KONTEXT
    year: 2,
    semester: 2,
  },
  {
    // PFLICHTFELDER
    name: "Wissenschaft im Kontext",
    ects: 6,
    standardcategory: "wissenschaft",
    // KONTEXT
    year: 2,
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
    year: 3,
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
    year: 3,
    semester: 0,
  },
  {
    // PFLICHTFELDER
    name: "Bachelorarbeit",
    ects: 10,
    standardcategory: "wissenschaft",
    // KONTEXT
    year: 3,
    semester: 0,
  },
  {
    // PFLICHTFELDER
    name: "Seminar",
    ects: 2,
    standardcategory: "wissenschaft",
    // KONTEXT
    year: 3,
    semester: 0,
  },
  // #endregion 5.-6. Semester - Abschluss und Wahl/Spezialisierung
];
