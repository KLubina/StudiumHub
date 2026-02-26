// Maps study program names from alle-studiengaenge to their visualization keys
// Only includes programs that have visualizations implemented

(function (global) {
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
    Mathematik: {
      key: "eth-math",
      institution: "ETH Zürich",
    },
    "Rechnergestützte Wissenschaften": {
      key: "eth-cse",
      institution: "ETH Zürich",
    },
    Informatik: {
      key: "eth-cs",
      institution: "ETH Zürich",
    },
    "Raumbezogene Ingenieurwissenschaften": {
      key: "eth-rig",
      institution: "ETH Zürich",
    },
    Maschineningenieurwissenschaften: {
      key: "eth-masch",
      institution: "ETH Zürich",
    },
    Materialwissenschaft: {
      key: "eth-matw",
      institution: "ETH Zürich",
    },
    Physik: {
      key: "eth-physik",
      institution: "ETH Zürich",
    },
    Chemieingenieurwissenschaften: {
      key: "eth-chab",
      institution: "ETH Zürich",
    },

    // Universität Zürich
    Geschichte: {
      key: "uzh-geschichte",
      institution: "Universität Zürich",
    },
    Politikwissenschaft: {
      key: "uzh-polisci",
      institution: "Universität Zürich",
    },
    Ethnologie: {
      key: "uzh-ethnologie",
      institution: "Universität Zürich",
    },
    Kommunikationswissenschaft: {
      key: "uzh-kommunikation",
      institution: "Universität Zürich",
    },
    "Populäre Kulturen": {
      key: "uzh-pop-kultur",
      institution: "Universität Zürich",
    },
    Soziologie: {
      key: "uzh-soziologie",
      institution: "Universität Zürich",
    },
    Humanmedizin: {
      key: "uzh-humanmedizin",
      institution: "Universität Zürich",
    },
    Rechtswissenschaft: {
      key: "uzh-law",
      institution: "Universität Zürich",
    },
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
    Informatik: {
      key: "fhbern-cs",
      institution: "Berner Fachhochschule",
    },

    // FH - Fachhochschule Graubünden
    "Computational and Data Science": {
      key: "fhgr-cds",
      institution: "FH Graubünden",
    },

    // FH - ZHAW
    Informatik: {
      key: "fhzh-cs",
      institution: "ZHAW",
    },
    Elektrotechnik: {
      key: "fhzh-elektrotechnik",
      institution: "ZHAW",
    },
    Systemtechnik: {
      key: "fhzh-systemtechnik",
      institution: "ZHAW",
    },
    Medizininformatik: {
      key: "fhzh-medizininformatik",
      institution: "ZHAW",
    },

    // FH - Hochschule Luzern
    "Elektrotechnik und Informationstechnologie": {
      key: "fhlu-eit",
      institution: "Hochschule Luzern",
    },
    Informatik: {
      key: "hslu-cs",
      institution: "Hochschule Luzern",
    },

    // FH - OST Ostschweizer Fachhochschule
    "Electrical and Computer Engineering": {
      key: "ost-eit",
      institution: "OST Ostschweizer Fachhochschule",
    },
    Informatik: {
      key: "ost-cs",
      institution: "Ostschweizer Fachhochschule",
    },

    // FH - Fachhochschule Nordwestschweiz
    "Elektro- und Informationstechnik": {
      key: "fhnw-eit",
      institution: "Fachhochschule Nordwestschweiz",
    },
    Informatik: {
      key: "fhnw-cs",
      institution: "Fachhochschule Nordwestschweiz",
    },

    // FH - FFHS (Fernfachhochschule Schweiz)
    Informatik: {
      key: "ffhs-informatik",
      institution: "FFHS",
    },

    // Private - Hochschulinstitut Schaffhausen
    IT: {
      key: "hssh-it",
      institution: "Hochschulinstitut Schaffhausen",
    },

    // Private - Aspira College
    "Computer Engineering": {
      key: "aspira-ce",
      institution: "Aspira College Split",
    },

    // ZHAW
    Physiotherapie: {
      key: "zhaw-physio",
      institution: "ZHAW",
    },
  };

  // Helper function to check if a study program has a visualization
  StudiengangMapping.getVisualizationUrl = function (
    studiengangName,
    institutionName,
  ) {
    // Try exact match with study program name
    let mapping = this[studiengangName];

    if (
      mapping &&
      (!mapping.institution || mapping.institution === institutionName)
    ) {
      if (mapping.customUrl) {
        return mapping.customUrl;
      }
      // Simplified: always use mono model
      return `study-visualization/standard/studienplan-template.html?studiengang=${encodeURIComponent(mapping.key)}`;
    }

    // Special handling for EIT at different institutions
    if (
      studiengangName === "Elektrotechnik und Informationstechnologie" ||
      studiengangName === "Elektro- und Informationstechnik"
    ) {
      if (institutionName === "Berner Fachhochschule") {
        return `study-visualization/standard/studienplan-template.html?studiengang=fhbern-eit`;
      } else if (institutionName === "Hochschule Luzern") {
        return `study-visualization/standard/studienplan-template.html?studiengang=fhlu-eit`;
      } else if (institutionName === "OST Ostschweizer Fachhochschule") {
        return `study-visualization/standard/studienplan-template.html?studiengang=fhost-eit`;
      } else if (institutionName === "Fachhochschule Nordwestschweiz") {
        return `study-visualization/standard/studienplan-template.html?studiengang=fhnw-eit`;
      } else if (institutionName === "ETH Zürich") {
        return `study-visualization/standard/studienplan-template.html?studiengang=eth-itet`;
      }
    }

    // Special handling for Informatik at different institutions
    if (studiengangName === "Informatik") {
      if (institutionName === "ZHAW") {
        return `study-visualization/standard/studienplan-template.html?studiengang=fhzh-cs`;
      } else if (institutionName === "ETH Zürich") {
        return `study-visualization/standard/studienplan-template.html?studiengang=eth-cs`;
      } else if (institutionName === "Berner Fachhochschule") {
        return `study-visualization/standard/studienplan-template.html?studiengang=fhbern-cs`;
      } else if (institutionName === "Fachhochschule Nordwestschweiz") {
        return `study-visualization/standard/studienplan-template.html?studiengang=fhnw-cs`;
      } else if (
        institutionName === "Hochschule Luzern" ||
        institutionName === "HSLU"
      ) {
        return `study-visualization/standard/studienplan-template.html?studiengang=hslu-cs`;
      } else if (
        institutionName === "Ostschweizer Fachhochschule" ||
        institutionName === "OST"
      ) {
        return `study-visualization/standard/studienplan-template.html?studiengang=ost-cs`;
      } else if (institutionName === "FFHS") {
        return `study-visualization/standard/studienplan-template.html?studiengang=ffhs-informatik`;
      }
    }

    return null;
  };

  // Expose to global scope
  global.StudiengangMapping = StudiengangMapping;
})(window);
