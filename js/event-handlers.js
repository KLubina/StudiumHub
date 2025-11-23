// Event Handler Setup
const EventHandlers = {
  setupEventListeners() {
    const typeFilter = document.getElementById('typeFilter');
    const institutionFilter = document.getElementById('institutionFilter');
    const categoryFilter = document.getElementById('categoryFilter');
    const showMinorsCheckbox = document.getElementById('showMinors');
    const viewByInstitution = document.getElementById('viewByInstitution');
    const viewByCategory = document.getElementById('viewByCategory');
    const viewAllVisualizations = document.getElementById('viewAllVisualizations');

    // View Toggle
    viewByInstitution.addEventListener('click', function () {
      State.setView('institution');
      viewByInstitution.classList.add('active');
      viewByCategory.classList.remove('active');
      viewAllVisualizations.classList.remove('active');
      document.getElementById('studiengaengeContainer').style.display = 'block';
      document.getElementById('visualizationsSection').style.display = 'none';
      Filters.updateFilterVisibility();
      Rendering.renderStudiengaenge();
    });

    viewByCategory.addEventListener('click', function () {
      State.setView('category');
      viewByCategory.classList.add('active');
      viewByInstitution.classList.remove('active');
      viewAllVisualizations.classList.remove('active');
      document.getElementById('studiengaengeContainer').style.display = 'block';
      document.getElementById('visualizationsSection').style.display = 'none';
      Filters.updateFilterVisibility();
      Rendering.renderStudiengaenge();
    });

    viewAllVisualizations.addEventListener('click', function () {
      viewAllVisualizations.classList.add('active');
      viewByInstitution.classList.remove('active');
      viewByCategory.classList.remove('active');
      document.getElementById('studiengaengeContainer').style.display = 'none';
      document.getElementById('visualizationsSection').style.display = 'block';
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
