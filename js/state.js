const State = {
  allData: [],
  currentView: "institution",
  currentFilters: {
    type: "",
    institution: "group_zurich",
    category: "",
  },
  showMinors: false,

  // Ersetze diese Methode innerhalb des State-Objekts:
  initializeData(rawUniversities = [], rawFachhochschulen = []) {
    function normalizeInstitution(raw, type) {
      return {
        name: raw.name,
        website: raw.website,
        type: type,
        // JSON nutzt "kategorien", die UI nutzt später ".categories"
        categories: (raw.kategorien || []).map((kat) => {
          const category = { name: kat.name };
          if (kat.unterkategorien) {
            category.subcategories = kat.unterkategorien.map((uk) => ({
              name: uk.name,
              // JSON nutzt "studiengaenge", die UI nutzt ".programs"
              programs: (uk.studiengaenge || []).map((p) => ({
                ...p,
                description: p.beschreibung,
                degree: p.grad,
              })),
            }));
          }
          if (kat.studiengaenge) {
            category.programs = kat.studiengaenge.map((p) => ({
              ...p,
              description: p.beschreibung,
              degree: p.grad,
            }));
          }
          return category;
        }),
      };
    }

    // Verarbeite die direkt übergebenen JSON-Daten anstatt window-Variablen
    const uniData = rawUniversities.map((uni) =>
      normalizeInstitution(uni, "uni"),
    );
    const fhData = rawFachhochschulen.map((fh) =>
      normalizeInstitution(fh, "fh"),
    );

    this.allData = [...uniData, ...fhData];
  },

  setView(view) {
    this.currentView = view;
  },

  setFilter(filterType, value) {
    this.currentFilters[filterType] = value;
  },

  getData() {
    return this.allData;
  },

  getView() {
    return this.currentView;
  },

  getFilters() {
    return this.currentFilters;
  },

  setShowMinors(value) {
    this.showMinors = value;
  },

  getShowMinors() {
    return this.showMinors;
  },
};
