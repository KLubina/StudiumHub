// Rendering Logic
const Rendering = {
  renderStudiengaenge() {
    const container = document.getElementById("studyProgramsContainer");
    const filteredData = Filters.filterData();

    // Leere Container
    container.innerHTML = "";

    // Zeige "Keine Ergebnisse" wenn nichts gefunden
    if (
      filteredData.length === 0 ||
      filteredData.every((uni) => uni.categories.length === 0)
    ) {
      container.innerHTML = `
        <div class="no-results">
          <p>Keine Studiengänge gefunden.</p>
          <p>Bitte versuche es mit anderen Filterkriterien.</p>
        </div>
      `;
      Navigation.updateFloatingNav([]);
      return;
    }

    // Wähle Ansicht
    const currentView = State.getView();
    if (currentView === "category") {
      this.renderByCategory(filteredData, container);
    } else {
      this.renderByInstitution(filteredData, container);
    }

    // Aktualisiere schwebende Navigation
    Navigation.updateFloatingNav(filteredData);
  },

  renderByInstitution(filteredData, container) {
    // Rendere jede Universität
    filteredData.forEach((uni) => {
      if (uni.categories.length > 0) {
        const uniSection = DOMBuilders.createUniSection(uni);
        container.appendChild(uniSection);
      }
    });
  },

  renderByCategory(filteredData, container) {
    // Gruppiere nach Kategorien
    const hierarchicalCategories = new Map();

    filteredData.forEach((inst) => {
      inst.categories.forEach((category) => {
        // Check if category has subcategories
        if (category.subcategories && category.subcategories.length > 0) {
          if (!hierarchicalCategories.has(category.name)) {
            hierarchicalCategories.set(category.name, {
              isParent: true,
              subcategories: new Map(),
              directPrograms: [],
            });
          }

          category.subcategories.forEach((subcategory) => {
            if (
              !hierarchicalCategories
                .get(category.name)
                .subcategories.has(subcategory.name)
            ) {
              hierarchicalCategories
                .get(category.name)
                .subcategories.set(subcategory.name, []);
            }
            hierarchicalCategories
              .get(category.name)
              .subcategories.get(subcategory.name)
              .push({
                institution: inst.name,
                type: inst.type,
                website: inst.website,
                programs: subcategory.programs,
              });
          });

          if (category.programs && category.programs.length > 0) {
            hierarchicalCategories.get(category.name).directPrograms.push({
              institution: inst.name,
              type: inst.type,
              website: inst.website,
              programs: category.programs,
            });
          }
        } else {
          if (!hierarchicalCategories.has(category.name)) {
            hierarchicalCategories.set(category.name, {
              isParent: false,
              institutions: [],
            });
          }
          const categoryEntry = hierarchicalCategories.get(category.name);
          if (categoryEntry.isParent) {
            categoryEntry.directPrograms.push({
              institution: inst.name,
              type: inst.type,
              website: inst.website,
              programs: category.programs,
            });
          } else {
            categoryEntry.institutions.push({
              institution: inst.name,
              type: inst.type,
              website: inst.website,
              programs: category.programs,
            });
          }
        }
      });
    });

    // Sortiere und rendere
    const sortedMainCategories = Array.from(
      hierarchicalCategories.keys(),
    ).sort();

    sortedMainCategories.forEach((mainCategoryName) => {
      const categoryData = hierarchicalCategories.get(mainCategoryName);

      if (categoryData.isParent) {
        // Rendere Obergruppe mit Unterkategorien
        const parentSection = DOMBuilders.createParentCategorySection(
          mainCategoryName,
          categoryData.subcategories,
          categoryData.directPrograms,
        );
        container.appendChild(parentSection);
      } else {
        // Rendere normale Kategorie
        const categorySection = DOMBuilders.createCategorySectionGrouped(
          mainCategoryName,
          categoryData.institutions,
        );
        container.appendChild(categorySection);
      }
    });
  },
};
