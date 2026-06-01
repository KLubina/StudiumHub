// Filter Management
const Filters = {
  // Helper function to check if a studiengang is a minor (<= 60 ECTS)
  // A minor is defined as a program where the MAXIMUM ECTS value is <= 60
  // Example: 60/30/15 ECTS → max 60 → is a minor
  // Example: 180/90/60 ECTS → max 180 → is NOT a minor
  isMinor(program) {
    const ectsText = program.ects || program.degree || "";

    // Extract ECTS numbers from text (e.g., "60 ECTS", "120/60 ECTS", "75 KP")
    const numbers = ectsText.match(/\d+/g);

    if (!numbers || numbers.length === 0) {
      return false; // No ECTS info, assume it's not a minor
    }

    // Check if the MAXIMUM ECTS value is <= 60
    const maxValue = Math.max(...numbers.map((n) => parseInt(n)));
    return maxValue <= 60;
  },

  populateFilters() {
    const institutionFilter = document.getElementById("institutionFilter");
    const categoryFilter = document.getElementById("categoryFilter");
    const allData = State.getData();

    // Option für Zürich hinzufügen
    const zurichOption = document.createElement("option");
    zurichOption.value = "group_zurich";
    zurichOption.textContent = "📍 Zürich (ETH, UZH, ZHAW, FHNW)";
    institutionFilter.appendChild(zurichOption);

    // Sammle alle Hochschulen (sortiert nach Typ und Name)
    const institutions = allData.map((inst) => ({
      name: inst.name,
      type: inst.type,
    }));

    institutions.forEach((inst) => {
      const option = document.createElement("option");
      option.value = inst.name;
      const prefix = inst.type === "uni" ? "[Uni] " : "[FH] ";
      option.textContent = prefix + inst.name;
      institutionFilter.appendChild(option);
    });

    // Sammle alle Kategorien (einzigartig)
    const categories = new Set();
    allData.forEach((inst) => {
      inst.categories.forEach((cat) => {
        categories.add(cat.name);
      });
    });

    const sortedCategories = Array.from(categories).sort();
    sortedCategories.forEach((catName) => {
      const option = document.createElement("option");
      option.value = catName;
      option.textContent = catName;
      categoryFilter.appendChild(option);
    });
  },

  updateFilterVisibility() {
    const categoryFilter = document.getElementById("categoryFilter");
    const currentView = State.getView();

    // Hide category filter when viewing by institution
    if (currentView === "institution") {
      categoryFilter.style.display = "none";
    } else {
      categoryFilter.style.display = "";
    }
  },

  filterData() {
    const allData = State.getData();
    const currentFilters = State.getFilters();
    const showMinors = State.getShowMinors();
    let filtered = JSON.parse(JSON.stringify(allData)); // Deep copy

    // Filter nach Hochschultyp (Uni/FH)
    if (currentFilters.type) {
      filtered = filtered.filter((inst) => inst.type === currentFilters.type);
    }

    // Filter nach Hochschule
    if (currentFilters.institution) {
      if (currentFilters.institution === "group_zurich") {
        const zurichInsts = [
          "ETH Zürich",
          "Universität Zürich",
          "ZHAW",
          "Fachhochschule Nordwestschweiz",
        ];
        filtered = filtered.filter((inst) => zurichInsts.includes(inst.name));
      } else {
        filtered = filtered.filter(
          (inst) => inst.name === currentFilters.institution,
        );
      }
    }

    // Filter nach Kategorie
    if (currentFilters.category) {
      filtered.forEach((inst) => {
        inst.categories = inst.categories.filter(
          (cat) => cat.name === currentFilters.category,
        );
      });
      filtered = filtered.filter((inst) => inst.categories.length > 0);
    }

    // Filter Minors (wenn nicht angezeigt werden sollen)
    if (!showMinors) {
      filtered.forEach((inst) => {
        inst.categories.forEach((cat) => {
          // Filter direkte programmes
          if (cat.programs) {
            cat.programs = cat.programs.filter((p) => !this.isMinor(p));
          }
          // Filter programmes in subcategories
          if (cat.subcategories) {
            cat.subcategories.forEach((subcat) => {
              if (subcat.programs) {
                subcat.programs = subcat.programs.filter(
                  (p) => !this.isMinor(p),
                );
              }
            });
            // Entferne leere Unterkategorien
            cat.subcategories = cat.subcategories.filter(
              (subcat) => subcat.programs && subcat.programs.length > 0,
            );
          }
        });
        // Entferne leere Kategorien
        inst.categories = inst.categories.filter(
          (cat) =>
            (cat.programs && cat.programs.length > 0) ||
            (cat.subcategories && cat.subcategories.length > 0),
        );
      });
      // Entferne leere Institutionen
      filtered = filtered.filter((inst) => inst.categories.length > 0);
    }

    return filtered;
  },
};
