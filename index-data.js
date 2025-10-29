// Provides study programs as a reusable class to avoid duplication and centralize data.
(function (global) {
  class StudiesData {
    static getPrograms() {
      return [
        /**
         * Contract:
         * - programs: array of objects
         *   { key, title, subtitle, degree, school, featured }
         * - key: used for CSS class and query param studiengang
         * - title: headline text (e.g., "BSc ITET")
         * - subtitle: smaller line under title (e.g., "ETH Zürich")
         * - featured: boolean to place card in the featured row
         */
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
        {
          key: "math",
          title: "BSc Mathematik",
          subtitle: "ETH Zürich",
        },
        {
          key: "cse",
          title: "BSc CSE",
          subtitle: "ETH Zürich",
        },
        {
          key: "bwl",
          title: "BA BWL",
          subtitle: "HSG",
        },
        {
          key: "cs",
          title: "BSc Informatik",
          subtitle: "ETH Zürich",
        },
        {
          key: "zhaw-cs",
          title: "BSc Computer Science",
          subtitle: "ZHAW",
        },
        {
          key: "cds",
          title: "BSc Computational and Data Science",
          subtitle: "Fachhochschule Graubünden",
        },
        {
          key: "it",
          title: "BSc IT",
          subtitle: "Hochschulinstitut Schaffhausen",
        },
        {
          key: "ce",
          title: "BSc Computer Engineering",
          subtitle: "Aspira College Split",
        },
        {
          key: "rig",
          title: "BSc Raumbezogene Ingenieurwissenschaften",
          subtitle: "ETH Zürich",
        },
        {
          key: "bfh-eit",
          title: "BSc Elektrotechnik und Informationstechnologie",
          subtitle: "Berner Fachhochschule",
        },
        {
          key: "hslu-eit",
          title: "BSc Elektrotechnik und Informationstechnologie",
          subtitle: "Hochschule Luzern",
        },
        {
          key: "hst",
          title: "BSc Gesundheitswissenschaften und Technologie",
          subtitle: "ETH Zürich",
          featured: true,
        },
        {
          key: "lmw",
          title: "BSc Lebensmittelwissenschaften und Ernährung",
          subtitle: "ETH Zürich",
          featured: true,
        },
        {
          key: "sozwi",
          title: "BA Sozialwissenschaften",
          subtitle: "Universität Zürich",
          featured: true,
        },
        {
          key: "masch",
          title: "BSc Maschineningenieurwissenschaften",
          subtitle: "ETH Zürich",
        },
        {
          key: "matw",
          title: "BSc Materialwissenschaften",
          subtitle: "ETH Zürich",
        },
        {
          key: "physik",
          title: "BSc Physik",
          subtitle: "ETH Zürich",
        },
        {
          key: "sbg",
          title: "BSc Sport, Bewegung und Gesundheit",
          subtitle: "Universität Basel",
        },
      ];
    }
  }

  // Expose to global scope
  global.StudiesData = StudiesData;
})(window);
