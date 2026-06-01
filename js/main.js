(function () {
  document.addEventListener("DOMContentLoaded", function () {
    State.initializeData();
    Filters.populateFilters();
    EventHandlers.setupEventListeners();

    const typeFilter = document.getElementById("typeFilter");
    typeFilter.value = State.getFilters().type;

    const institutionFilter = document.getElementById("institutionFilter");
    institutionFilter.value = State.getFilters().institution;

    Filters.updateFilterVisibility();
    Rendering.renderStudiengaenge();
  });
})();
