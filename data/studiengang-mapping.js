// Maps study program names from alle-studiengaenge to their visualization keys
// Only includes programs that have visualizations implemented

(function (global) {
  const StudiengangMapping = {
    // ETH Zürich
    "Elektrotechnik und Informationstechnologie": {
      key: "eth-itet",
      institution: "ETH Zürich"
    },
    "Gesundheitswissenschaften und Technologie": {
      key: "eth-hst",
      institution: "ETH Zürich"
    },
    "Lebensmittelwissenschaften und Ernährung": {
      key: "eth-lmw",
      institution: "ETH Zürich"
    },
    "Mathematik": {
      key: "eth-math",
      institution: "ETH Zürich"
    },
    "Rechnergestützte Wissenschaften": {
      key: "eth-cse",
      institution: "ETH Zürich"
    },
    "Informatik": {
      key: "eth-cs",
      institution: "ETH Zürich"
    },
    "Raumbezogene Ingenieurwissenschaften": {
      key: "eth-rig",
      institution: "ETH Zürich"
    },
    "Maschineningenieurwissenschaften": {
      key: "eth-masch",
      institution: "ETH Zürich"
    },
    "Materialwissenschaft": {
      key: "eth-matw",
      institution: "ETH Zürich"
    },
    "Physik": {
      key: "eth-physik",
      institution: "ETH Zürich"
    },
    "Chemieingenieurwissenschaften": {
      key: "eth-chab",
      institution: "ETH Zürich"
    },

    // Universität Zürich
    "Geschichte": {
      key: "uzh-geschichte",
      institution: "Universität Zürich",
      studyModel: "major-minor"
    },
    "Politikwissenschaft": {
      key: "uzh-polisci",
      institution: "Universität Zürich",
      studyModel: "major-minor"
    },
    "Ethnologie": {
      key: "uzh-ethnologie",
      institution: "Universität Zürich",
      studyModel: "major-minor"
    },
    "Kommunikationswissenschaft": {
      key: "uzh-kommunikation",
      institution: "Universität Zürich",
      studyModel: "major-minor"
    },
    "Populäre Kulturen": {
      key: "uzh-pop-kultur",
      institution: "Universität Zürich",
      studyModel: "major-minor"
    },
    "Soziologie": {
      key: "uzh-soziologie",
      institution: "Universität Zürich",
      studyModel: "major-minor"
    },
    "Humanmedizin": {
      key: "uzh-humanmedizin",
      institution: "Universität Zürich"
    },
    "Rechtswissenschaft": {
      key: "uzh-law",
      institution: "Universität Zürich"
    },

    // Universität Basel
    "Sport, Bewegung und Gesundheit": {
      key: "unibas-sbg",
      institution: "Universität Basel"
    },
    "Sport, Bewegung & Gesundheit": {
      key: "unibas-sbg",
      institution: "Universität Basel"
    },

    // Universität St.Gallen
    "Betriebswirtschaftslehre": {
      key: "unisg-bwl",
      institution: "Universität St.Gallen"
    },

    // FH - Berner Fachhochschule
    "Elektrotechnik und Informationstechnologie (FH)": {
      key: "fhbern-eit",
      institution: "Berner Fachhochschule"
    },

    // FH - Fachhochschule Graubünden
    "Computational and Data Science": {
      key: "fhgr-cds",
      institution: "FH Graubünden"
    },

    // FH - ZHAW
    "Computer Science": {
      key: "fhzh-cs",
      institution: "ZHAW"
    },

    // FH - Hochschule Luzern
    "Elektrotechnik und Informationstechnologie (HSLU)": {
      key: "fhlu-eit",
      institution: "Hochschule Luzern"
    },

    // FH - OST Ostschweizer Fachhochschule
    "Electrical and Computer Engineering": {
      key: "ost-eit",
      institution: "OST Ostschweizer Fachhochschule"
    },

    // FH - Fachhochschule Nordwestschweiz
    "Elektro- und Informationstechnik": {
      key: "fhnw-eit",
      institution: "Fachhochschule Nordwestschweiz"
    },

    // Private - Hochschulinstitut Schaffhausen
    "IT": {
      key: "hssh-it",
      institution: "Hochschulinstitut Schaffhausen"
    },

    // Private - Aspira College
    "Computer Engineering": {
      key: "aspira-ce",
      institution: "Aspira College Split"
    }
  };

  // Helper function to check if a study program has a visualization
  StudiengangMapping.getVisualizationUrl = function(studiengangName, institutionName) {
    // Try exact match with study program name
    let mapping = this[studiengangName];

    if (mapping && (!mapping.institution || mapping.institution === institutionName)) {
      const studyModel = mapping.studyModel || 'mono';
      const folder = studyModel === 'major-minor' ? 'major-minor' : 'mono';
      return `study-visualization/standard/studienplan-template.html?studiengang=${encodeURIComponent(mapping.key)}`;
    }

    // Special handling for EIT at different institutions
    if (studiengangName === "Elektrotechnik und Informationstechnologie" ||
        studiengangName === "Elektro- und Informationstechnik") {
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
      }
    }

    return null;
  };

  // Expose to global scope
  global.StudiengangMapping = StudiengangMapping;
})(window);
