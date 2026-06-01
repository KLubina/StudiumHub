const State = {
  allData: [],
  currentView: "institution",
  currentFilters: {
    type: "",
    institution: "group_zurich",
    category: "",
  },
  showMinors: false,

  initializeData() {
    function normalizeInstitution(raw, type) {
      return {
        name: raw.name,
        website: raw.website,
        type: type,
        categories: (raw.kategorien || []).map((kat) => {
          const category = { name: kat.name };
          if (kat.unterkategorien) {
            category.subcategories = kat.unterkategorien.map((uk) => ({
              name: uk.name,
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

    const uniData = (
      window.AlleSchweizerStudiengaenge &&
      window.AlleSchweizerStudiengaenge.universitaeten
        ? window.AlleSchweizerStudiengaenge.universitaeten
        : []
    ).map((uni) => normalizeInstitution(uni, "uni"));

    const fhData = (
      window.AlleFHStudiengaenge && window.AlleFHStudiengaenge.fachhochschulen
        ? window.AlleFHStudiengaenge.fachhochschulen
        : []
    ).map((fh) => normalizeInstitution(fh, "fh"));

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
