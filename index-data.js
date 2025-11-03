// Provides study programs as a reusable class to avoid duplication and centralize data.
(function (global) {
  class StudiesData {
    static getPrograms() {
      return [
        /**
         * Contract:
         * - programs: array of objects
         *   { key, title, subtitle, degree, school, featured, studyModel }
         * - key: used for CSS class and query param studiengang
         * - title: headline text (e.g., "BSc ITET")
         * - subtitle: smaller line under title (e.g., "ETH Zürich")
         * - featured: boolean to place card in the featured row
         * - studyModel: "mono" (default) or "major-minor" to indicate program type
         */
        // Featured
        {
          key: "itet",
          title: "BSc ITET",
          subtitle: "ETH Zürich",
          featured: true,
        },
        {
          key: "msc-itet",
          title: "MSc ITET",
          subtitle: "ETH Zürich",
          featured: true,
        },
        {
          key: "mtec",
          title: "MSc MTEC",
          subtitle: "ETH Zürich",
          featured: true,
        },
        // Unis
        {
          key: "hst",
          title: "BSc Gesundheitswissenschaften und Technologie",
          subtitle: "ETH Zürich",
          category: "Unis",
        },
        {
          key: "lmw",
          title: "BSc Lebensmittelwissenschaften und Ernährung",
          subtitle: "ETH Zürich",
          category: "Unis",
        },
        {
          key: "math",
          title: "BSc Mathematik",
          subtitle: "ETH Zürich",
          category: "Unis",
        },
        {
          key: "cse",
          title: "BSc CSE",
          subtitle: "ETH Zürich",
          category: "Unis",
        },
        {
          key: "cs",
          title: "BSc Informatik",
          subtitle: "ETH Zürich",
          category: "Unis",
        },
        {
          key: "rig",
          title: "BSc Raumbezogene Ingenieurwissenschaften",
          subtitle: "ETH Zürich",
          category: "Unis",
        },
        {
          key: "masch",
          title: "BSc Maschineningenieurwissenschaften",
          subtitle: "ETH Zürich",
          category: "Unis",
        },
        {
          key: "matw",
          title: "BSc Materialwissenschaften",
          subtitle: "ETH Zürich",
          category: "Unis",
        },
        {
          key: "physik",
          title: "BSc Physik",
          subtitle: "ETH Zürich",
          category: "Unis",
        },
        {
          key: "sozwi",
          title: "BA Sozialwissenschaften",
          subtitle: "Universität Zürich",
          category: "Unis",
          studyModel: "major-minor",
        },
        {
          key: "sbg",
          title: "BSc Sport, Bewegung und Gesundheit",
          subtitle: "Universität Basel",
          category: "Unis",
        },
        // FH Unis
        {
          key: "zhaw-cs",
          title: "BSc Computer Science",
          subtitle: "ZHAW",
          category: "FH Unis",
        },
        {
          key: "cds",
          title: "BSc Computational and Data Science",
          subtitle: "Fachhochschule Graubünden",
          category: "FH Unis",
        },
        {
          key: "bfh-eit",
          title: "BSc Elektrotechnik und Informationstechnologie",
          subtitle: "Berner Fachhochschule",
          category: "FH Unis",
        },
        {
          key: "hslu-eit",
          title: "BSc Elektrotechnik und Informationstechnologie",
          subtitle: "Hochschule Luzern",
          category: "FH Unis",
        },
        // Private Unis
        {
          key: "it",
          title: "BSc IT",
          subtitle: "Hochschulinstitut Schaffhausen",
          category: "Private Unis",
        },
        {
          key: "ce",
          title: "BSc Computer Engineering",
          subtitle: "Aspira College Split",
          category: "Private Unis",
        },
      ];
    }
  }

  // Expose to global scope
  global.StudiesData = StudiesData;
})(window);
