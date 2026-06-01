// Only maps study program names to their visualization keys
const StudiengangMapping = {
  // ETH Zürich
  "Elektrotechnik und Informationstechnologie": {
    key: "eth-itet",
    institution: "ETH Zürich",
  },
  "Gesundheitswissenschaften und Technologie": {
    key: "eth-hst",
    institution: "ETH Zürich",
  },
  "Lebensmittelwissenschaften und Ernährung": {
    key: "eth-lmw",
    institution: "ETH Zürich",
  },
  Mathematik: { key: "eth-math", institution: "ETH Zürich" },
  "Rechnergestützte Wissenschaften": {
    key: "eth-cse",
    institution: "ETH Zürich",
  },
  Informatik: { key: "eth-cs", institution: "ETH Zürich" },
  "Raumbezogene Ingenieurwissenschaften": {
    key: "eth-rig",
    institution: "ETH Zürich",
  },
  Maschineningenieurwissenschaften: {
    key: "eth-masch",
    institution: "ETH Zürich",
  },
  Materialwissenschaft: { key: "eth-matw", institution: "ETH Zürich" },
  Physik: { key: "eth-physik", institution: "ETH Zürich" },
  Chemieingenieurwissenschaften: { key: "eth-chab", institution: "ETH Zürich" },

  // Universität Zürich
  Geschichte: { key: "uzh-geschichte", institution: "Universität Zürich" },
  Politikwissenschaft: {
    key: "uzh-polisci",
    institution: "Universität Zürich",
  },
  Ethnologie: { key: "uzh-ethnologie", institution: "Universität Zürich" },
  Kommunikationswissenschaft: {
    key: "uzh-kommunikation",
    institution: "Universität Zürich",
  },
  "Populäre Kulturen": {
    key: "uzh-pop-kultur",
    institution: "Universität Zürich",
  },
  Soziologie: { key: "uzh-soziologie", institution: "Universität Zürich" },
  Rechtswissenschaft: { key: "uzh-law", institution: "Universität Zürich" },
  Psychologie: {
    key: "uzh-psychologie",
    institution: "Universität Zürich",
    customUrl:
      "study-visualization/program-specific/uzh-psychologie/index.html",
  },

  // Universität Basel
  "Sport, Bewegung und Gesundheit": {
    key: "unibas-sbg",
    institution: "Universität Basel",
  },
  "Sport, Bewegung & Gesundheit": {
    key: "unibas-sbg",
    institution: "Universität Basel",
  },

  // Universität St.Gallen
  Betriebswirtschaftslehre: {
    key: "unisg-bwl",
    institution: "Universität St.Gallen",
  },

  // FH - Berner Fachhochschule
  "Elektrotechnik und Informationstechnologie": {
    key: "fhbern-eit",
    institution: "Berner Fachhochschule",
  },
  "Informatik - Teilzeit": {
    key: "fhbern-cs-tz",
    institution: "Berner Fachhochschule",
  },
  Informatik: { key: "fhbern-cs", institution: "Berner Fachhochschule" },

  // FH - Fachhochschule Graubünden
  "Artificial Intelligence in Software Engineering": {
    key: "fhgr-aise",
    institution: "FH Graubünden",
  },
  "Computational and Data Science": {
    key: "fhgr-cds",
    institution: "FH Graubünden",
  },

  // FH - ZHAW
  "Data Science": { key: "zhaw-data-science", institution: "ZHAW" },
  "Food Science": { key: "zhaw-food-science", institution: "ZHAW" },
  "Applied Digital Life Sciences": {
    key: "zhaw-applied-digital-life-sciences",
    institution: "ZHAW",
  },
  "Applied Digital Life Science": {
    key: "zhaw-applied-digital-life-sciences",
    institution: "ZHAW",
  },
  "Wirtschaftsinformatik - Business Information Systems - Teilzeit": {
    key: "zhaw-win-bis-tz",
    institution: "ZHAW",
  },
  "Wirtschaftsinformatik - Data Science - Teilzeit": {
    key: "zhaw-win-bis-tz",
    institution: "ZHAW",
  },
  Betriebsökonomie: { key: "zhaw-betriebsoekonomie", institution: "ZHAW" },
  Betriebsoekonomie: { key: "zhaw-betriebsoekonomie", institution: "ZHAW" },
  Informatik: { key: "fhzh-cs", institution: "ZHAW" },
  "Informatik (Teilzeit)": { key: "fhzh-cs-tz", institution: "ZHAW" },
  Elektrotechnik: { key: "fhzh-elektrotechnik", institution: "ZHAW" },
  Systemtechnik: { key: "fhzh-systemtechnik", institution: "ZHAW" },
  Medizininformatik: { key: "fhzh-medizininformatik", institution: "ZHAW" },

  // FH - Hochschule Luzern
  "Elektrotechnik und Informationstechnologie": {
    key: "fhlu-eit",
    institution: "Hochschule Luzern",
  },
  Informatik: { key: "hslu-cs", institution: "Hochschule Luzern" },
  "Informatik - Teilzeit - Assessment": { key: "hslu-cs-tz" },

  // FH - OST Ostschweizer Fachhochschule
  "Electrical and Computer Engineering": {
    key: "ost-eit",
    institution: "OST Ostschweizer Fachhochschule",
  },
  "Informatik - Assessment": {
    key: "ost-cs-assessment",
    institution: "Ostschweizer Fachhochschule",
  },
  Informatik: { key: "ost-cs", institution: "Ostschweizer Fachhochschule" },

  // FH - Fachhochschule Nordwestschweiz
  "Elektro- und Informationstechnik": {
    key: "fhnw-eit",
    institution: "Fachhochschule Nordwestschweiz",
  },
  Informatik: { key: "fhnw-cs", institution: "Fachhochschule Nordwestschweiz" },
  Wirtschaftsinformatik: {
    key: "fhnw-wirtschaftsinformatik",
    institution: "Fachhochschule Nordwestschweiz",
  },
  Betriebsökonomie: {
    key: "fhnw-betriebsoekonomie",
    institution: "Fachhochschule Nordwestschweiz",
  },
  Betriebsoekonomie: {
    key: "fhnw-betriebsoekonomie",
    institution: "Fachhochschule Nordwestschweiz",
  },

  // FH - FFHS (Fernfachhochschule Schweiz)
  Informatik: { key: "ffhs-informatik", institution: "FFHS" },

  // Private - Hochschulinstitut Schaffhausen
  IT: { key: "hssh-it", institution: "Hochschulinstitut Schaffhausen" },

  // Private - Aspira College
  "Computer Engineering": {
    key: "aspira-ce",
    institution: "Aspira College Split",
  },

  // ZHAW
  Ergotherapie: { key: "zhaw-ergotherapie", institution: "ZHAW" },
  "Gesundheitsförderung und Prävention": {
    key: "zhaw-gesundheitsfoerderung",
    institution: "ZHAW",
  },
  Pflege: { key: "zhaw-pflege", institution: "ZHAW" },
  Physiotherapie: { key: "zhaw-physio", institution: "ZHAW" },

  getVisualizationUrl(studiengangName, institutionName) {
    let mapping = this[studiengangName];

    if (
      mapping &&
      (!mapping.institution || mapping.institution === institutionName)
    ) {
      if (mapping.customUrl) return mapping.customUrl;
      return `study-visualization/standard/specificprogram-template.html?studiengang=${encodeURIComponent(mapping.key)}`;
    }

    // Special handling for EIT
    if (
      studiengangName === "Elektrotechnik und Informationstechnologie" ||
      studiengangName === "Elektro- und Informationstechnik"
    ) {
      if (institutionName === "Berner Fachhochschule")
        return `study-visualization/standard/specificprogram-template.html?studiengang=fhbern-eit`;
      if (institutionName === "Hochschule Luzern")
        return `study-visualization/standard/specificprogram-template.html?studiengang=fhlu-eit`;
      if (institutionName === "OST Ostschweizer Fachhochschule")
        return `study-visualization/standard/specificprogram-template.html?studiengang=fhost-eit`;
      if (institutionName === "Fachhochschule Nordwestschweiz")
        return `study-visualization/standard/specificprogram-template.html?studiengang=fhnw-eit`;
      if (institutionName === "ETH Zürich")
        return `study-visualization/standard/specificprogram-template.html?studiengang=eth-itet`;
    }

    // Special handling for Informatik
    if (studiengangName === "Informatik") {
      if (institutionName === "ZHAW")
        return `study-visualization/standard/specificprogram-template.html?studiengang=fhzh-cs`;
      if (institutionName === "ETH Zürich")
        return `study-visualization/standard/specificprogram-template.html?studiengang=eth-cs`;
      if (institutionName === "Universität Zürich")
        return `study-visualization/standard/specificprogram-template.html?studiengang=uzh-informatik`;
      if (institutionName === "Berner Fachhochschule")
        return `study-visualization/standard/specificprogram-template.html?studiengang=fhbern-cs`;
      if (institutionName === "Fachhochschule Nordwestschweiz")
        return `study-visualization/standard/specificprogram-template.html?studiengang=fhnw-cs`;
      if (institutionName === "Hochschule Luzern" || institutionName === "HSLU")
        return `study-visualization/standard/specificprogram-template.html?studiengang=hslu-cs`;
      if (
        institutionName === "Ostschweizer Fachhochschule" ||
        institutionName === "OST"
      )
        return `study-visualization/standard/specificprogram-template.html?studiengang=ost-cs`;
      if (institutionName === "FFHS")
        return `study-visualization/standard/specificprogram-template.html?studiengang=ffhs-informatik`;
      if (
        institutionName === "FernUniversität in Hagen" ||
        institutionName === "FernUni Hagen"
      )
        return `study-visualization/standard/specificprogram-template.html?studiengang=fernuni-hagen-cs`;
    }

    // Special handling for Wirtschaftsinformatik
    if (studiengangName === "Wirtschaftsinformatik") {
      if (institutionName === "ZHAW")
        return `study-visualization/standard/specificprogram-template.html?studiengang=zhaw-win-bis-tz`;
      if (institutionName === "Fachhochschule Nordwestschweiz")
        return `study-visualization/standard/specificprogram-template.html?studiengang=fhnw-wirtschaftsinformatik`;
    }

    // Special handling for Betriebsökonomie
    if (studiengangName === "Betriebsökonomie") {
      if (institutionName === "ZHAW")
        return `study-visualization/standard/specificprogram-template.html?studiengang=zhaw-betriebsoekonomie`;
      if (institutionName === "Fachhochschule Nordwestschweiz")
        return `study-visualization/standard/specificprogram-template.html?studiengang=fhnw-betriebsoekonomie`;
    }

    // Special handling for Betriebswirtschaftslehre
    if (studiengangName === "Betriebswirtschaftslehre") {
      if (institutionName === "Universität Zürich")
        return `study-visualization/standard/specificprogram-template.html?studiengang=uzh-bwl`;
    }

    // Special handling for Humanmedizin
    if (studiengangName === "Humanmedizin") {
      if (institutionName === "ETH Zürich")
        return `study-visualization/standard/specificprogram-template.html?studiengang=eth-humanmedizin`;
      if (institutionName === "Universität Zürich")
        return `study-visualization/standard/specificprogram-template.html?studiengang=uzh-humanmedizin`;
    }

    return null;
  },
};

// Aliases for backwards compatibility with dom-builders.js
window.StudiengangMapping = StudiengangMapping;
window.studyProgramMapping = StudiengangMapping;
