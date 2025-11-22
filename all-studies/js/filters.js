// Filter Management
const Filters = {
  populateFilters() {
    const institutionFilter = document.getElementById('institutionFilter');
    const categoryFilter = document.getElementById('categoryFilter');
    const allData = State.getData();

    // Sammle alle Hochschulen (sortiert nach Typ und Name)
    const institutions = allData.map(inst => ({
      name: inst.name,
      type: inst.type
    }));

    institutions.forEach(inst => {
      const option = document.createElement('option');
      option.value = inst.name;
      const prefix = inst.type === 'uni' ? '[Uni] ' : '[FH] ';
      option.textContent = prefix + inst.name;
      institutionFilter.appendChild(option);
    });

    // Sammle alle Kategorien (einzigartig)
    const categories = new Set();
    allData.forEach(inst => {
      inst.kategorien.forEach(kat => {
        categories.add(kat.name);
      });
    });

    const sortedCategories = Array.from(categories).sort();
    sortedCategories.forEach(catName => {
      const option = document.createElement('option');
      option.value = catName;
      option.textContent = catName;
      categoryFilter.appendChild(option);
    });
  },

  updateFilterVisibility() {
    const categoryFilter = document.getElementById('categoryFilter');
    const currentView = State.getView();

    // Hide category filter when viewing by institution
    if (currentView === 'institution') {
      categoryFilter.style.display = 'none';
    } else {
      categoryFilter.style.display = '';
    }
  },

  filterData() {
    const allData = State.getData();
    const currentFilters = State.getFilters();
    let filtered = JSON.parse(JSON.stringify(allData)); // Deep copy

    // Filter nach Hochschultyp (Uni/FH)
    if (currentFilters.type) {
      filtered = filtered.filter(inst => inst.type === currentFilters.type);
    }

    // Filter nach Hochschule
    if (currentFilters.institution) {
      filtered = filtered.filter(inst => inst.name === currentFilters.institution);
    }

    // Filter nach Kategorie
    if (currentFilters.category) {
      filtered.forEach(inst => {
        inst.kategorien = inst.kategorien.filter(kat => kat.name === currentFilters.category);
      });
      filtered = filtered.filter(inst => inst.kategorien.length > 0);
    }

    return filtered;
  }
};
