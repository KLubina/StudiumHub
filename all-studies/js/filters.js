// Filter Management
const Filters = {
  // Helper function to check if a studiengang is a minor (<= 60 ECTS)
  // A minor is defined as a program where the MAXIMUM ECTS value is <= 60
  // Example: 60/30/15 ECTS → max 60 → is a minor
  // Example: 180/90/60 ECTS → max 180 → is NOT a minor
  isMinor(studiengang) {
    const ectsText = studiengang.ects || studiengang.grad || '';

    // Extract ECTS numbers from text (e.g., "60 ECTS", "120/60 ECTS", "75 KP")
    const numbers = ectsText.match(/\d+/g);

    if (!numbers || numbers.length === 0) {
      return false; // No ECTS info, assume it's not a minor
    }

    // Check if the MAXIMUM ECTS value is <= 60
    const maxValue = Math.max(...numbers.map(n => parseInt(n)));
    return maxValue <= 60;
  },

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
    const showMinors = State.getShowMinors();
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

    // Filter Minors (wenn nicht angezeigt werden sollen)
    if (!showMinors) {
      filtered.forEach(inst => {
        inst.kategorien.forEach(kat => {
          // Filter direkte Studiengänge
          if (kat.studiengaenge) {
            kat.studiengaenge = kat.studiengaenge.filter(sg => !this.isMinor(sg));
          }
          // Filter Studiengänge in Unterkategorien
          if (kat.unterkategorien) {
            kat.unterkategorien.forEach(unterkat => {
              if (unterkat.studiengaenge) {
                unterkat.studiengaenge = unterkat.studiengaenge.filter(sg => !this.isMinor(sg));
              }
            });
            // Entferne leere Unterkategorien
            kat.unterkategorien = kat.unterkategorien.filter(unterkat =>
              unterkat.studiengaenge && unterkat.studiengaenge.length > 0
            );
          }
        });
        // Entferne leere Kategorien
        inst.kategorien = inst.kategorien.filter(kat =>
          (kat.studiengaenge && kat.studiengaenge.length > 0) ||
          (kat.unterkategorien && kat.unterkategorien.length > 0)
        );
      });
      // Entferne leere Institutionen
      filtered = filtered.filter(inst => inst.kategorien.length > 0);
    }

    return filtered;
  }
};
