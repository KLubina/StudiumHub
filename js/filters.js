const Filters = {
  isMinor(program) {
    const ectsText = program.ects || program.degree || "";

    const numbers = ectsText.match(/\d+/g);

    if (!numbers || numbers.length === 0) {
      return false;
    }

    const maxValue = Math.max(...numbers.map((n) => parseInt(n)));
    return maxValue <= 60;
  },

  populateFilters() {
    const institutionFilter = document.getElementById("institutionFilter");
    const categoryFilter = document.getElementById("categoryFilter");
    const allData = State.getData();

    const zurichOption = document.createElement("option");
    zurichOption.value = "group_zurich";
    zurichOption.textContent = "📍 Zürich (ETH, UZH, ZHAW, FHNW)";
    institutionFilter.appendChild(zurichOption);

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
    let filtered = JSON.parse(JSON.stringify(allData));

    if (currentFilters.type) {
      filtered = filtered.filter((inst) => inst.type === currentFilters.type);
    }

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

    if (currentFilters.category) {
      filtered.forEach((inst) => {
        inst.categories = inst.categories.filter(
          (cat) => cat.name === currentFilters.category,
        );
      });
      filtered = filtered.filter((inst) => inst.categories.length > 0);
    }

    if (!showMinors) {
      filtered.forEach((inst) => {
        inst.categories.forEach((cat) => {
          if (cat.programs) {
            cat.programs = cat.programs.filter((p) => !this.isMinor(p));
          }
          if (cat.subcategories) {
            cat.subcategories.forEach((subcat) => {
              if (subcat.programs) {
                subcat.programs = subcat.programs.filter(
                  (p) => !this.isMinor(p),
                );
              }
            });
            cat.subcategories = cat.subcategories.filter(
              (subcat) => subcat.programs && subcat.programs.length > 0,
            );
          }
        });
        inst.categories = inst.categories.filter(
          (cat) =>
            (cat.programs && cat.programs.length > 0) ||
            (cat.subcategories && cat.subcategories.length > 0),
        );
      });
      filtered = filtered.filter((inst) => inst.categories.length > 0);
    }

    return filtered;
  },
};
