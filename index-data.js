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
         * - features are auto-loaded from index-features.js (generated from features-config.js)
         */
        // Featured
        {
          key: "eth-itet",
          title: "BSc ITET",
          subtitle: "ETH Zürich",
          featured: true,
        },
        {
          key: "eth-msc-itet",
          title: "MSc ITET",
          subtitle: "ETH Zürich",
        },
        {
          key: "eth-mtec",
          title: "MSc MTEC",
          subtitle: "ETH Zürich",
        },
        // Unis
        {
          key: "eth-hst",
          title: "BSc Gesundheitswissenschaften und Technologie",
          subtitle: "ETH Zürich",
          category: "Unis",
        },
        {
          key: "eth-lmw",
          title: "BSc Lebensmittelwissenschaften und Ernährung",
          subtitle: "ETH Zürich",
          category: "Unis",

        },
        {
          key: "eth-math",
          title: "BSc Mathematik",
          subtitle: "ETH Zürich",
          category: "Unis",

        },
        {
          key: "eth-cse",
          title: "BSc CSE",
          subtitle: "ETH Zürich",
          category: "Unis",
          featured: true,

        },
        {
          key: "eth-cs",
          title: "BSc Informatik",
          subtitle: "ETH Zürich",
          category: "Unis",

        },
        {
          key: "eth-rig",
          title: "BSc Raumbezogene Ingenieurwissenschaften",
          subtitle: "ETH Zürich",
          category: "Unis",

        },
        {
          key: "eth-masch",
          title: "BSc Maschineningenieurwissenschaften",
          subtitle: "ETH Zürich",
          category: "Unis",

        },
        {
          key: "eth-matw",
          title: "BSc Materialwissenschaften",
          subtitle: "ETH Zürich",
          category: "Unis",

        },
        {
          key: "eth-physik",
          title: "BSc Physik",
          subtitle: "ETH Zürich",
          category: "Unis",

        },
        {
          key: "eth-chab",
          title: "BSc Chemieingenieurwissenschaften",
          subtitle: "ETH Zürich",
          category: "Unis",

        },
        {
          key: "uzh-geschichte",
          title: "Bachelor Geschichte",
          subtitle: "Universität Zürich",
          category: "Unis",
          studyModel: "major-minor",

        },
        {
          key: "uzh-polisci",
          title: "Bachelor Politikwissenschaft",
          subtitle: "Universität Zürich",
          category: "Unis",
          studyModel: "major-minor",
          featured: true,
        },
        {
          key: "uzh-ethnologie",
          title: "Bachelor Ethnologie",
          subtitle: "Universität Zürich",
          category: "Unis",
          studyModel: "major-minor",
        },
        {
          key: "uzh-kommunikation",
          title: "Bachelor Kommunikationswissenschaft",
          subtitle: "Universität Zürich",
          category: "Unis",
          studyModel: "major-minor",

        },
        {
          key: "uzh-pop-kultur",
          title: "Bachelor Populäre Kulturen",
          subtitle: "Universität Zürich",
          category: "Unis",
          studyModel: "major-minor",

        },
        {
          key: "uzh-soziologie",
          title: "Bachelor Soziologie",
          subtitle: "Universität Zürich",
          category: "Unis",
          studyModel: "major-minor",

        },
        {
          key: "uzh-humanmedizin",
          title: "Bachelor Humanmedizin",
          subtitle: "Universität Zürich",
          category: "Unis",

        },
        {
          key: "uzh-law",
          title: "Bachelor Rechtswissenschaften",
          subtitle: "Universität Zürich",
          category: "Unis",
          studyModel: "mono",

        },
        {
          key: "unibas-sbg",
          title: "BSc Sport, Bewegung und Gesundheit",
          subtitle: "Universität Basel",
          category: "Unis",

        },
                {
          key: "unisg-bwl",
          title: "BWL",
          subtitle: "Universität St.Gallen",
          category: "Unis",

        },
        // FH Unis
        {
          key: "fhzh-cs",
          title: "BSc Computer Science",
          subtitle: "ZHAW",
          category: "FH Unis",

        },
        {
          key: "fhgr-cds",
          title: "BSc Computational and Data Science",
          subtitle: "Fachhochschule Graubünden",
          category: "FH Unis",

        },
        {
          key: "fhbern-eit",
          title: "BSc Elektrotechnik und Informationstechnologie",
          subtitle: "Berner Fachhochschule",
          category: "FH Unis",

        },
        {
          key: "fhlu-eit",
          title: "BSc Elektrotechnik und Informationstechnologie",
          subtitle: "Hochschule Luzern",
          category: "FH Unis",

        },
        // Private Unis
        {
          key: "hssh-it",
          title: "BSc IT",
          subtitle: "Hochschulinstitut Schaffhausen",
          category: "Private Unis",

        },
        {
          key: "aspira-ce",
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
