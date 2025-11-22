// State Management
const State = {
  allData: [],
  currentView: 'category', // 'institution' oder 'category'
  currentFilters: {
    type: '',
    institution: '',
    category: ''
  },
  showMinors: false, // Minors standardmäßig ausgeblendet

  initializeData() {
    // Kombiniere Uni und FH Daten
    const uniData = window.AlleSchweizerStudiengaenge.universitaeten.map(uni => ({
      ...uni,
      type: 'uni'
    }));

    const fhData = window.AlleFHStudiengaenge.fachhochschulen.map(fh => ({
      ...fh,
      type: 'fh'
    }));

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
  }
};
