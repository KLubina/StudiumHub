// Main Initialization
(function () {
  // Initialisierung beim Laden der Seite
  document.addEventListener('DOMContentLoaded', function () {
    State.initializeData();
    Filters.populateFilters();
    EventHandlers.setupEventListeners();

    // Setze den Typ-Filter auf den Standardwert (Universitäten)
    const typeFilter = document.getElementById('typeFilter');
    typeFilter.value = State.getFilters().type;

    Filters.updateFilterVisibility();
    Rendering.renderStudiengaenge();
  });
})();
