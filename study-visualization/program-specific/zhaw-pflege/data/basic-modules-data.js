/* ==== ZHAW PFLEGE MODULE DATA ==== */
/* Moduldaten mit Jahr-Zuweisung */

window.StudiengangModules = [
  // #region 1. Semester
  {
    name: "Pflegeprozess und Caring",
    ects: 3,
    standardcategory: "beruf",
    year: 1,
    semester: 1,
  },
  {
    name: "Pflege als Wissenschaft und Entwicklung der Pflege",
    ects: 3,
    standardcategory: "beruf",
    year: 1,
    semester: 1,
  },
  {
    name: "Pflegetechniken 1",
    ects: 6,
    standardcategory: "beruf",
    year: 1,
    semester: 1,
  },
  {
    name: "Anatomie / Physiologie / Clinical Assessment 1",
    ects: 6,
    standardcategory: "beruf",
    year: 1,
    semester: 1,
  },
  {
    name: "Pathologie / Pathophysiologie",
    ects: 6,
    standardcategory: "beruf",
    year: 1,
    semester: 1,
  },
  {
    name: "Wissenschaftliches Arbeiten und qualitative Forschungsmethoden",
    ects: 3,
    standardcategory: "interprof",
    year: 1,
    semester: 1,
  },
  // #endregion

  // #region 2. Semester
  {
    name: "Pharmakologie",
    ects: 3,
    standardcategory: "beruf",
    year: 1,
    semester: 2,
  },
  {
    name: "Pflegetechniken 2",
    ects: 3,
    standardcategory: "beruf",
    year: 1,
    semester: 2,
  },
  {
    name: "Akut-somatische Pflege",
    ects: 3,
    standardcategory: "beruf",
    year: 1,
    semester: 2,
  },
  {
    name: "Vom Assessment zur Pflegeintervention",
    ects: 3,
    standardcategory: "beruf",
    year: 1,
    semester: 2,
  },
  {
    name: "Wissenschaftliches Arbeiten und quantitative Forschungsmethoden",
    ects: 3,
    standardcategory: "beruf", // Based on visual position in similar curricula, could be interprof but looks grouped in pink in some diagrams. I'll stick to 'beruf' or 'interprof'? Let's go with 'beruf' to match pink if it was pink. Wait, in Sem 1 "Wissenschaftliches..." was Blue. Let's make it 'beruf' for now, or check logical grouping. Actually let's assume it's "Berufsspezifisch" if it's specific to nursing science, but "Wissenschaftliches Arbeiten" is often interprof. Let's use 'interprof' to match Sem 1 for consistency unless I see otherwise. The user text has it in the middle. Let's stick with 'beruf' for now based on the cluster.
    year: 1,
    semester: 2,
  },
  {
    name: "Klient:innenzentrierte Kommunikation im interprofessionellen Kontext",
    ects: 3,
    standardcategory: "interprof",
    year: 1,
    semester: 2,
  },
  {
    name: "Praktikum 1",
    ects: 15,
    standardcategory: "praxis",
    year: 1,
    semester: 2,
  },
  // #endregion

  // #region 3. Semester
  {
    name: "Chronic Condition",
    ects: 6,
    standardcategory: "beruf",
    year: 2,
    semester: 3,
  },
  {
    name: "Symptommanagement",
    ects: 3,
    standardcategory: "beruf",
    year: 2,
    semester: 3,
  },
  {
    name: "Pflege von Frau, Familie, Kind",
    ects: 6,
    standardcategory: "beruf",
    year: 2,
    semester: 3,
  },
  {
    name: "Clinical Assessment 2",
    ects: 3,
    standardcategory: "beruf",
    year: 2,
    semester: 3,
  },
  {
    name: "Ethik",
    ects: 3,
    standardcategory: "beruf",
    year: 2,
    semester: 3,
  },
  {
    name: "Pflege von psychisch kranken Menschen",
    ects: 3,
    standardcategory: "beruf",
    year: 2,
    semester: 3,
  },
  {
    name: "Wissenschaftskommunikation",
    ects: 3,
    standardcategory: "interprof",
    year: 2,
    semester: 3,
  },
  {
    name: "Gesellschaft, Kultur und Gesundheit 1",
    ects: 3,
    standardcategory: "interprof",
    year: 2,
    semester: 3,
  },
  // #endregion

  // #region 4. Semester
  {
    name: "Familienzentrierte Pflege",
    ects: 3,
    standardcategory: "beruf",
    year: 2,
    semester: 4,
  },
  {
    name: "Palliative Care",
    ects: 3,
    standardcategory: "beruf",
    year: 2,
    semester: 4,
  },
  {
    name: "Patient:innen- und Familienedukation",
    ects: 3,
    standardcategory: "beruf",
    year: 2,
    semester: 4,
  },
  {
    name: "Praktikum 2",
    ects: 20,
    standardcategory: "praxis",
    year: 2,
    semester: 4,
  },
  // #endregion

  // #region 5. Semester
  {
    name: "Herausfordernde Berufspraxis und Kooperation",
    ects: 6,
    standardcategory: "interprof", // "Kooperation" suggests interprof
    year: 3,
    semester: 5,
  },
  {
    name: "Praktikum 3",
    ects: 24,
    standardcategory: "praxis",
    year: 3,
    semester: 5,
  },
  // #endregion

  // #region 6. Semester
  {
    name: "Best Practice",
    ects: 6,
    standardcategory: "beruf",
    year: 3,
    semester: 6,
  },
  {
    name: "Best Practice Vertiefung",
    ects: 3,
    standardcategory: "beruf",
    year: 3,
    semester: 6,
  },
  {
    name: "Vertiefung wissenschaftliches Arbeiten",
    ects: 3,
    standardcategory: "interprof",
    year: 3,
    semester: 6,
  },
  {
    name: "Interprofessionelle Zusammenarbeit in Theorie und Praxis",
    ects: 3,
    standardcategory: "interprof",
    year: 3,
    semester: 6,
  },
  {
    name: "Gesellschaft, Kultur und Gesundheit 2",
    ects: 3,
    standardcategory: "interprof",
    year: 3,
    semester: 6,
  },
  {
    name: "Bachelorarbeit",
    ects: 12,
    standardcategory: "thesis",
    year: 3,
    semester: 6,
  },
  // #endregion
];
