// State Management
const State = {
  allData: [],
  currentView: 'category', // 'institution' oder 'category'
  currentFilters: {
    type: 'uni', // Standardmäßig nur Universitäten anzeigen
    institution: '',
    category: ''
  },
  showMinors: false, // Minors standardmäßig ausgeblendet
  showSonstige: false, // Sonstige Studiengänge standardmäßig ausgeblendet

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

    const sonstigeData = window.AlleSonstigeStudiengaenge.sonstige.map(sonstige => ({
      ...sonstige,
      type: 'sonstige'
    }));

    this.allData = [...uniData, ...fhData, ...sonstigeData];
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

  setShowSonstige(value) {
    this.showSonstige = value;
  },

  getShowSonstige() {
    return this.showSonstige;
  }
};
