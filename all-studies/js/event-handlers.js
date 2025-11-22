// Event Handler Setup
const EventHandlers = {
  setupEventListeners() {
    const typeFilter = document.getElementById('typeFilter');
    const institutionFilter = document.getElementById('institutionFilter');
    const categoryFilter = document.getElementById('categoryFilter');
    const showMinorsCheckbox = document.getElementById('showMinors');
    const viewByInstitution = document.getElementById('viewByInstitution');
    const viewByCategory = document.getElementById('viewByCategory');

    // View Toggle
    viewByInstitution.addEventListener('click', function () {
      State.setView('institution');
      viewByInstitution.classList.add('active');
      viewByCategory.classList.remove('active');
      Filters.updateFilterVisibility();
      Rendering.renderStudiengaenge();
    });

    viewByCategory.addEventListener('click', function () {
      State.setView('category');
      viewByCategory.classList.add('active');
      viewByInstitution.classList.remove('active');
      Filters.updateFilterVisibility();
      Rendering.renderStudiengaenge();
    });

    typeFilter.addEventListener('change', function (e) {
      State.setFilter('type', e.target.value);
      Rendering.renderStudiengaenge();
    });

    institutionFilter.addEventListener('change', function (e) {
      State.setFilter('institution', e.target.value);
      Rendering.renderStudiengaenge();
    });

    categoryFilter.addEventListener('change', function (e) {
      State.setFilter('category', e.target.value);
      Rendering.renderStudiengaenge();
    });

    showMinorsCheckbox.addEventListener('change', function (e) {
      State.setShowMinors(e.target.checked);
      Rendering.renderStudiengaenge();
    });
  }
};
