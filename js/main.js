// Main Initialization
(function () {
  // Initialisierung beim Laden der Seite
  document.addEventListener("DOMContentLoaded", function () {
    State.initializeData();
    Filters.populateFilters();
    EventHandlers.setupEventListeners();

    // Setze den Typ-Filter auf den Standardwert
    const typeFilter = document.getElementById("typeFilter");
    typeFilter.value = State.getFilters().type;

    // Setze den Institution-Filter auf den Standardwert
    const institutionFilter = document.getElementById("institutionFilter");
    institutionFilter.value = State.getFilters().institution;

    Filters.updateFilterVisibility();
    Rendering.renderStudiengaenge();
  });
})();
