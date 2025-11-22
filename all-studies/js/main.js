// Main Initialization
(function () {
  // Initialisierung beim Laden der Seite
  document.addEventListener('DOMContentLoaded', function () {
    State.initializeData();
    Filters.populateFilters();
    EventHandlers.setupEventListeners();
    Filters.updateFilterVisibility();
    Rendering.renderStudiengaenge();
  });
})();
