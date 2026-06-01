const State = {
  allData: [],
  currentView: "institution",
  currentFilters: {
    type: "",
    institution: "group_zurich",
    category: "",
  },
  showMinors: false,

  initializeData(rawUniversities = [], rawFachhochschulen = []) {
    const uniData = rawUniversities.map((uni) =>
      this._normalizeInstitution(uni, "uni"),
    );
    const fhData = rawFachhochschulen.map((fh) =>
      this._normalizeInstitution(fh, "fh"),
    );

    this.allData = [...uniData, ...fhData];
  },

  _normalizeInstitution(raw, type) {
    const rawCategories = raw.kategorien || [];

    return {
      name: raw.name,
      website: raw.website,
      type: type,
      categories: rawCategories.map((kat) => this._normalizeCategory(kat)),
    };
  },

  _normalizeCategory(kat) {
    const category = { name: kat.name };

    if (kat.unterkategorien) {
      category.subcategories = kat.unterkategorien.map((uk) => ({
        name: uk.name,
        programs: this._normalizePrograms(uk.studiengaenge),
      }));
    }

    if (kat.studiengaenge) {
      category.programs = this._normalizePrograms(kat.studiengaenge);
    }

    return category;
  },

  _normalizePrograms(studiengaenge = []) {
    return studiengaenge.map((p) => ({
      ...p,
      description: p.beschreibung,
      degree: p.grad,
    }));
  },

  setView(view) {
    this.currentView = view;
  },
  getView() {
    return this.currentView;
  },

  setFilter(filterType, value) {
    this.currentFilters[filterType] = value;
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

  getData() {
    return this.allData;
  },
};
