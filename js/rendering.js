const Rendering = {
  renderStudiengaenge() {
    const container = document.getElementById("studyProgramsContainer");
    const filteredData = Filters.filterData();

    container.innerHTML = "";

    if (
      filteredData.length === 0 ||
      filteredData.every((uni) => uni.categories.length === 0)
    ) {
      this._renderNoResults(container);
      Navigation.updateFloatingNav([]);
      return;
    }

    if (State.getView() === "category") {
      this.renderByCategory(filteredData, container);
    } else {
      this.renderByInstitution(filteredData, container);
    }

    Navigation.updateFloatingNav(filteredData);
  },

  _renderNoResults(container) {
    container.innerHTML = `
      <div class="no-results">
        <p>Keine Studiengänge gefunden.</p>
        <p>Bitte versuche es mit anderen Filterkriterien.</p>
      </div>
    `;
  },

  renderByInstitution(filteredData, container) {
    filteredData.forEach((uni) => {
      if (uni.categories.length > 0) {
        container.appendChild(DOMBuilders.createUniSection(uni));
      }
    });
  },

  renderByCategory(filteredData, container) {
    const hierarchicalCategories = new Map();

    // Daten für Kategorie-Ansicht transformieren
    filteredData.forEach((inst) => {
      inst.categories.forEach((category) => {
        if (!hierarchicalCategories.has(category.name)) {
          hierarchicalCategories.set(category.name, {
            isParent: !!(category.subcategories?.length > 0),
            subcategories: new Map(),
            directPrograms: [],
          });
        }

        const catEntry = hierarchicalCategories.get(category.name);
        const instMeta = {
          institution: inst.name,
          type: inst.type,
          website: inst.website,
        };

        if (catEntry.isParent && category.subcategories) {
          category.subcategories.forEach((sub) => {
            if (!catEntry.subcategories.has(sub.name)) {
              catEntry.subcategories.set(sub.name, []);
            }
            catEntry.subcategories
              .get(sub.name)
              .push({ ...instMeta, programs: sub.programs });
          });
        }

        if (category.programs?.length > 0) {
          const programList = catEntry.isParent
            ? catEntry.directPrograms
            : catEntry.subcategories.get(category.name) || [];
          programList.push({ ...instMeta, programs: category.programs });
          if (!catEntry.isParent) catEntry.institutions = programList; // Für flache Kategorien
        }
      });
    });

    // Rendern der sortierten Kategorien
    Array.from(hierarchicalCategories.keys())
      .sort()
      .forEach((catName) => {
        const data = hierarchicalCategories.get(catName);
        const section = data.isParent
          ? DOMBuilders.createParentCategorySection(
              catName,
              data.subcategories,
              data.directPrograms,
            )
          : DOMBuilders.createCategorySectionGrouped(
              catName,
              data.institutions || [],
            );
        container.appendChild(section);
      });
  },
};
