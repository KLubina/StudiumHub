// Datenquellen: HEST ETH Zürich
/* ==== ETH HUMANMEDIZIN MODULE DATA ==== */
/* Alle Moduldaten für den Humanmedizin B.Sc. Studiengang an der ETH Zürich */

window.StudiengangModules = [
  // #region 1. Semester
  {
    name: "Grundbausteine Mensch",
    ects: 2,
    standardcategory: "medizin-bio",
    year: 1,
    semester: 1,
  },
  {
    name: "Ärztliche Anamnesetechnik",
    ects: 2,
    standardcategory: "klinik",
    year: 1,
    semester: 1,
  },
  {
    name: "Bewegungsapparat",
    ects: 5,
    standardcategory: "medizin-bio",
    year: 1,
    semester: 1,
  },
  {
    name: "Nervensystem",
    ects: 5,
    standardcategory: "medizin-bio",
    year: 1,
    semester: 1,
  },
  {
    name: "Molekulare Genetik und Zellbiologie",
    ects: 5,
    standardcategory: "medizin-bio",
    year: 1,
    semester: 1,
  },
  {
    name: "Chemie (für Mediziner)",
    ects: 4,
    standardcategory: "mathe-nawi",
    year: 1,
    semester: 1,
  },
  {
    name: "Mathematik I",
    ects: 4,
    standardcategory: "mathe-nawi",
    year: 1,
    semester: 1,
  },
  // #endregion

  // #region 2. Semester
  {
    name: "Herz-Kreislauf-System",
    ects: 5,
    standardcategory: "medizin-bio",
    year: 1,
    semester: 2,
  },
  {
    name: "Atmungssystem",
    ects: 5,
    standardcategory: "medizin-bio",
    year: 1,
    semester: 2,
  },
  {
    name: "Nieren und Homöostase",
    ects: 5,
    standardcategory: "medizin-bio",
    year: 1,
    semester: 2,
  },
  {
    name: "Infektion",
    ects: 2,
    standardcategory: "medizin-bio",
    year: 1,
    semester: 2,
  },
  {
    name: "Biochemie",
    ects: 3,
    standardcategory: "mathe-nawi",
    year: 1,
    semester: 2,
  },
  {
    name: "Pathobiochemie",
    ects: 2,
    standardcategory: "medizin-bio",
    year: 1,
    semester: 2,
  },
  {
    name: "Pharmakologie",
    ects: 2,
    standardcategory: "medizin-bio",
    year: 1,
    semester: 2,
  },
  {
    name: "Statistik I",
    ects: 3,
    standardcategory: "mathe-nawi",
    year: 1,
    semester: 2,
  },
  {
    name: "Mathematik II",
    ects: 4,
    standardcategory: "mathe-nawi",
    year: 1,
    semester: 2,
  },
  {
    name: "Körperliche Untersuchung",
    ects: 2,
    standardcategory: "klinik",
    year: 1,
    semester: 2,
  },
  {
    name: "Praktikum Physiologie",
    ects: 3,
    standardcategory: "klinik",
    year: 1,
    semester: 2,
  },
  // #endregion

  // #region 3. Semester (Vom Screenshot)
  // Block A (Blut, Ernährung, Endokrinologie) hat Total 14 KP
  {
    name: "Blut, Immunsystem",
    ects: 5, // ~33% von 14
    standardcategory: "medizin-bio",
    year: 2,
    semester: 3,
  },
  {
    name: "Ernährung, Verdauung",
    ects: 5, // ~33% von 14
    standardcategory: "medizin-bio",
    year: 2,
    semester: 3,
  },
  {
    name: "Endokrinologie, Stoffwechsel",
    ects: 4, // ~33% von 14, abgerundet für Total 14
    standardcategory: "medizin-bio",
    year: 2,
    semester: 3,
  },
  {
    name: "Praktikum klinische Anatomie",
    ects: 5,
    standardcategory: "klinik",
    year: 2,
    semester: 3,
  },
  {
    name: "Statistik II",
    ects: 3,
    standardcategory: "mathe-nawi",
    year: 2,
    semester: 3,
  },
  // Physik I ist Jahreskurs in Block B, erscheint oft erst am Ende oder als Teil
  // Im Bild steht "Physik I -> Prüfung als Jahreskurs in Prüfungsblock B"
  // Ich nehme es als Platzhalter oder weise ihm KPs zu wenn möglich.
  // Es gehört zum 3. Sem, hat aber keine KPs im Bild direkt?
  // Das Bild zeigt Total 14 (Block A) + 5 + 3 = 22 KP.
  // Physik I/II und Block B sind im 4. Semester mit 16 KP gelistet.
  // Wahrscheinlich ist Physik I hier Unterricht, aber KP erst später.
  // Ich setze Physik I hier mit 0 ECTS oder lasse es weg und packe alles in Sem 4 Physik II?
  // User says "nutze noch für 2te jahr und 3te jahr den screenshot".
  // Ich werde Physik I als Modul anzeigen, aber mit Vermerk.

  // #endregion

  // #region 4. Semester (Vom Screenshot)
  // Block B (Sinnes-, Haut-, Infekt, Physik II) hat Total 16 KP
  // Physik I+II zählen hier rein (20% von 16KP = 3.2).
  {
    name: "Sinnesorgane",
    ects: 6, // 40% von 16
    standardcategory: "medizin-bio",
    year: 2,
    semester: 4,
  },
  {
    name: "Haut und Anhangsorgane",
    ects: 3, // 20% von 16
    standardcategory: "medizin-bio",
    year: 2,
    semester: 4,
  },
  {
    name: "Infektiologie",
    ects: 3, // 20% von 16
    standardcategory: "medizin-bio",
    year: 2,
    semester: 4,
  },
  {
    name: "Physik I + II",
    ects: 4, // 20% von 16 (Physik I+II zusammen)
    standardcategory: "mathe-nawi",
    year: 2,
    semester: 4,
  },
  {
    name: "Internistische Untersuchung",
    ects: 2,
    standardcategory: "klinik",
    year: 2,
    semester: 4,
  },
  {
    name: "Vom Symptom zur Diagnose",
    ects: 5,
    standardcategory: "klinik",
    year: 2,
    semester: 4,
  },
  {
    name: "Medizinische Bildgebung I",
    ects: 3,
    standardcategory: "klinik",
    year: 2,
    semester: 4,
  },
  {
    name: "Klinische Forschung",
    ects: 3,
    standardcategory: "wissenschaft",
    year: 2,
    semester: 4,
  },
  {
    name: "Ethik in Medizin und Gesundheitswesen",
    ects: 2,
    standardcategory: "kontext",
    year: 2,
    semester: 4,
  },
  {
    name: "Precision Medicine: Theorie und praktische Übungen",
    ects: 5,
    standardcategory: "klinik",
    year: 2,
    semester: 4,
  },
  // #endregion

  // #region 5. Semester (Vom Screenshot)
  {
    name: "Notfallmedizin",
    ects: 2,
    standardcategory: "klinik",
    year: 3,
    semester: 5,
  },
  {
    name: "Pathologie",
    ects: 6,
    standardcategory: "medizin-bio",
    year: 3,
    semester: 5,
  },
  {
    name: "Onkologie",
    ects: 2,
    standardcategory: "medizin-bio",
    year: 3,
    semester: 5,
  },
  {
    name: "Reproduktion",
    ects: 4,
    standardcategory: "medizin-bio",
    year: 3,
    semester: 5,
  },
  {
    name: "Früher Lebenszyklus",
    ects: 2,
    standardcategory: "medizin-bio",
    year: 3,
    semester: 5,
  },
  {
    name: "Später Lebenszyklus",
    ects: 1,
    standardcategory: "medizin-bio",
    year: 3,
    semester: 5,
  },
  {
    name: "Rheumatologie",
    ects: 2,
    standardcategory: "medizin-bio",
    year: 3,
    semester: 5,
  },
  {
    name: "Ethik & Recht und Kommunikation",
    ects: 4,
    standardcategory: "kontext",
    year: 3,
    semester: 5,
  },
  {
    name: "Interprofessionelle Versorgungsketten",
    ects: 3,
    standardcategory: "kontext",
    year: 3,
    semester: 5,
  },
  {
    name: "Ultraschall-Grundkurs",
    ects: 1,
    standardcategory: "klinik",
    year: 3,
    semester: 5,
  },
  {
    name: "Medizintechnik I",
    ects: 3,
    standardcategory: "technology", // New category maybe? Or Fach?
    year: 3,
    semester: 5,
  },
  {
    name: "Informatikgrundlagen für Humanmedizin",
    ects: 2,
    standardcategory: "technology",
    year: 3,
    semester: 5,
  },
  // #endregion

  // #region 6. Semester (Vom Screenshot)
  {
    name: "Psychiatrie & Computational Psychiatry",
    ects: 2,
    standardcategory: "klinik",
    year: 3,
    semester: 6,
  },
  {
    name: "Psychosomatische & psychosoziale Medizin",
    ects: 2,
    standardcategory: "klinik",
    year: 3,
    semester: 6,
  },
  {
    name: "Teamarbeit, Interprofessionalität, Karriere",
    ects: 2,
    standardcategory: "kontext",
    year: 3,
    semester: 6,
  },
  {
    name: "Krankenbett",
    ects: 2,
    standardcategory: "klinik",
    year: 3,
    semester: 6,
  },
  {
    name: "Differentialdiagnostik",
    ects: 2,
    standardcategory: "klinik",
    year: 3,
    semester: 6,
  },
  {
    name: "Medizinische Bildgebung II",
    ects: 2,
    standardcategory: "klinik",
    year: 3,
    semester: 6,
  },
  {
    name: "Data Science for Medicine",
    ects: 4,
    standardcategory: "technology",
    year: 3,
    semester: 6,
  },
  {
    name: "Medizintechnik II",
    ects: 2,
    standardcategory: "technology",
    year: 3,
    semester: 6,
  },
  {
    name: "Translationale Tiermodelle",
    ects: 1,
    standardcategory: "wissenschaft",
    year: 3,
    semester: 6,
  },
  {
    name: "Translationales Forschungspraktikum",
    ects: 8,
    standardcategory: "wissenschaft",
    year: 3,
    semester: 6,
  },
  // #endregion
];
