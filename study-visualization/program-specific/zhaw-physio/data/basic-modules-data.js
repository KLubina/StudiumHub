/* ==== ZHAW PHYSIOTHERAPIE MODULE DATA ==== */
/* Alle Moduldaten für den Physiotherapie B.Sc. Studiengang an der ZHAW */

window.StudiengangModules = [
  // #region 1. Semester
  {
    name: "Anatomie und Biomechanik 1",
    ects: 4,
    standardcategory: "grundlagen",
    semester: 1,
  },
  {
    name: "Haltung und Bewegung 1",
    ects: 3,
    standardcategory: "grundlagen",
    semester: 1,
  },
  {
    name: "Untere Extremitäten 1",
    ects: 3,
    standardcategory: "fach",
    semester: 1,
  },
  {
    name: "Untere Extremitäten 2",
    ects: 6,
    standardcategory: "fach",
    semester: 1,
  },
  { name: "Lumbale Region", ects: 4, standardcategory: "fach", semester: 1 },
  {
    name: "Physiologie und Klinisches Basiswissen 1",
    ects: 4,
    standardcategory: "grundlagen",
    semester: 1,
  },
  {
    name: "Wissenschaftliches Arbeiten und qualitative Forschungsmethoden",
    ects: 3,
    standardcategory: "wissenschaft",
    semester: 1,
  },
  {
    name: "PEP 1 (Patientenbasierte Erfahrung und Praxis)",
    ects: 3,
    standardcategory: "praxis",
    semester: 1,
  },
  // #endregion

  // #region 2. Semester
  {
    name: "Anatomie und Biomechanik 2",
    ects: 3,
    standardcategory: "grundlagen",
    semester: 2,
  },
  {
    name: "Klient:innenzentrierte Kommunikation",
    ects: 3,
    standardcategory: "kommunikation",
    semester: 2,
  },
  {
    name: "Physiologie und Klinisches Basiswissen 2",
    ects: 3,
    standardcategory: "grundlagen",
    semester: 2,
  },
  {
    name: "PEP 2 (Patientenbasierte Erfahrung und Praxis)",
    ects: 3,
    standardcategory: "praxis",
    semester: 2,
  },
  {
    name: "Haltung und Bewegung 2",
    ects: 3,
    standardcategory: "grundlagen",
    semester: 2,
  },
  { name: "Innere Medizin 1", ects: 3, standardcategory: "fach", semester: 2 },
  {
    name: "Thorakale / cervicale Region",
    ects: 3,
    standardcategory: "fach",
    semester: 2,
  },
  {
    name: "Obere Extremitäten",
    ects: 6,
    standardcategory: "fach",
    semester: 2,
  },
  {
    name: "Wissenschaftliches Arbeiten und quantitative Forschungsmethoden",
    ects: 3,
    standardcategory: "wissenschaft",
    semester: 2,
  },
  // #endregion

  // #region 3. Semester
  {
    name: "Gesundheitsförderung in der Physiotherapie",
    ects: 3,
    standardcategory: "fach",
    semester: 3,
  },
  {
    name: "Haltung und Bewegung 3",
    ects: 3,
    standardcategory: "grundlagen",
    semester: 3,
  },
  {
    name: "Lebensphasen und Gesundheitsversorgung",
    ects: 6,
    standardcategory: "kontext",
    semester: 3,
  },
  { name: "Innere Medizin 2", ects: 4, standardcategory: "fach", semester: 3 },
  {
    name: "PEP 3 (Patientenbasierte Erfahrung und Praxis)",
    ects: 3,
    standardcategory: "praxis",
    semester: 3,
  },
  {
    name: "Wissenschaftskommunikation",
    ects: 3,
    standardcategory: "wissenschaft",
    semester: 3,
  },
  {
    name: "Gesellschaft, Kultur und Gesundheit 1",
    ects: 3,
    standardcategory: "kontext",
    semester: 3,
  },
  // #endregion

  // #region 4. Semester
  {
    name: "Praktikum 1 (16 Wochen)",
    ects: 23,
    standardcategory: "praxis",
    semester: 4,
  },
  {
    name: "Bachelorarbeit 1*",
    ects: 9,
    standardcategory: "wissenschaft",
    semester: 4,
  }, // *Kann im 4. oder 5. Semester sein, als 4. gelistet
  // #endregion

  // #region 5. Semester
  {
    name: "Herausfordernde Berufspraxis und Kooperation",
    ects: 6,
    standardcategory: "kontext",
    semester: 5,
  },
  {
    name: "Bachelorarbeit 1*",
    ects: 4,
    standardcategory: "wissenschaft",
    semester: 5,
  }, // Note: PDF says 4 ECTS for BA1 here? Wait.
  // The PDF list says:
  // Sem 5: Herausfordern... (6), Bachelorarbeit 1* (4), Praktikum 2 (23). Total 33?
  // Wait, Praktikum 2 is 23.
  // Sem 4: Praktikum 1 (23), Bachelorarbeit 1* (9). Total 32?
  // The asterisks says "*Das Modul kann im 4. oder im 5. Semester durchgeführt werden."
  // In Sem 5 column it says "Bachelorarbeit 1* 4 ECTS". In Sem 4 column "Bachelorarbeit 1* 9 ECTS".
  // This is confusing. Or maybe it's split?
  // Let's look closely at the text:
  // "Bachelorarbeit 1* 9 ECTS" in Sem 4.
  // "Bachelorarbeit 1* 4 ECTS" in Sem 5.
  // Are they parts? Or alternatives?
  // Usually BA is one big thing.
  // However, if I look at ECTS sums:
  // Sem 4: 23 + 9 = 32.
  // Sem 5: 6 + 4 + 23 = 33.
  // Sem 6: 5+5+3+3+4+3+5+3+3 = 34? No way.
  // Let's re-read carefully.
  // Sem 6:
  // Anat... 5
  // Neuro... 5
  // Interprof... 3
  // PEP 4 ... 3
  // Transfer ... 4
  // Gesellschaft ... 3
  // Neuro (1) ... 5
  // Vertiefung ... 3
  // BA 2 ... 3
  // Sum: 5+5+3+3+4+3+5+3+3 = 34.
  // That's > 30.
  // Maybe some are electives?
  // The user just said "und das sind die module".
  // I will stick to what is written.
  // For BA1, I will put it in 4 and 5 as separate modules if the names differ, or just "Bachelorarbeit 1 (Teil X)".
  // But wait, the asterisk note says "Das Modul kann im 4. oder im 5. Semester durchgeführt werden."
  // This usually means either/or.
  // Why are the ECTS different? 9 vs 4?
  // Maybe it's a typo in my reading or the user's text.
  // User text:
  // Semester 5: ... Bachelorarbeit 1* 4 ECTS ...
  // Semester 4: ... Bachelorarbeit 1* 9 ECTS ...
  // This is strange.
  // I will implement it as "Bachelorarbeit 1" in Semester 4 with 9 ECTS (maybe mainly execution) and "Bachelorarbeit 1 (Abschluss)" in Sem 5? No.
  // If it can be done in either, usually you choose.
  // But 9 vs 4 is huge difference.
  // Let's just list them as they are in the columns.
  {
    name: "Praktikum 2 (16 Wochen)",
    ects: 23,
    standardcategory: "praxis",
    semester: 5,
  },
  // #endregion

  // #region 6. Semester
  {
    name: "Anatomie, Physiologie und Klinisches Basiswissen",
    ects: 5,
    standardcategory: "grundlagen",
    semester: 6,
  },
  {
    name: "Neuromotorik und Sensorik 2",
    ects: 5,
    standardcategory: "fach",
    semester: 6,
  },
  {
    name: "Interprofessionelle Zusammenarbeit",
    ects: 3,
    standardcategory: "kontext",
    semester: 6,
  },
  {
    name: "PEP 4 (Patientenbasierte Erfahrung und Praxis)",
    ects: 3,
    standardcategory: "praxis",
    semester: 6,
  },
  {
    name: "Transfer, Trends und Perspektiven",
    ects: 4,
    standardcategory: "fach",
    semester: 6,
  },
  {
    name: "Gesellschaft, Kultur und Gesundheit 2",
    ects: 3,
    standardcategory: "kontext",
    semester: 6,
  },
  {
    name: "Neuromotorik und Sensorik 1",
    ects: 5,
    standardcategory: "fach",
    semester: 6,
  },
  {
    name: "Vertiefung wissenschaftliches Arbeiten",
    ects: 3,
    standardcategory: "wissenschaft",
    semester: 6,
  },
  {
    name: "Bachelorarbeit 2",
    ects: 3,
    standardcategory: "wissenschaft",
    semester: 6,
  },
  // #endregion
];
