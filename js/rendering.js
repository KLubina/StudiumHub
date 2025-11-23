// Rendering Logic
const Rendering = {
  renderStudiengaenge() {
    const container = document.getElementById('studiengaengeContainer');
    const filteredData = Filters.filterData();

    // Leere Container
    container.innerHTML = '';

    // Zeige "Keine Ergebnisse" wenn nichts gefunden
    if (filteredData.length === 0 || filteredData.every(uni => uni.kategorien.length === 0)) {
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
    if (currentView === 'category') {
      this.renderByCategory(filteredData, container);
    } else {
      this.renderByInstitution(filteredData, container);
    }

    // Aktualisiere schwebende Navigation
    Navigation.updateFloatingNav(filteredData);
  },

  renderByInstitution(filteredData, container) {
    // Rendere jede Universität
    filteredData.forEach(uni => {
      if (uni.kategorien.length > 0) {
        const uniSection = DOMBuilders.createUniSection(uni);
        container.appendChild(uniSection);
      }
    });
  },

  renderByCategory(filteredData, container) {
    // Gruppiere nach Kategorien
    const hierarchicalCategories = new Map();

    filteredData.forEach(inst => {
      inst.kategorien.forEach(kategorie => {
        // Check if category has subcategories (unterkategorien)
        if (kategorie.unterkategorien && kategorie.unterkategorien.length > 0) {
          // Category with subcategories - create hierarchical structure
          if (!hierarchicalCategories.has(kategorie.name)) {
            hierarchicalCategories.set(kategorie.name, {
              isParent: true,
              subcategories: new Map(),
              directPrograms: []
            });
          }

          // Add each subcategory
          kategorie.unterkategorien.forEach(unterkategorie => {
            if (!hierarchicalCategories.get(kategorie.name).subcategories.has(unterkategorie.name)) {
              hierarchicalCategories.get(kategorie.name).subcategories.set(unterkategorie.name, []);
            }
            hierarchicalCategories.get(kategorie.name).subcategories.get(unterkategorie.name).push({
              institution: inst.name,
              type: inst.type,
              website: inst.website,
              studiengaenge: unterkategorie.studiengaenge
            });
          });

          // Also add direct study programs if they exist (mixed structure)
          if (kategorie.studiengaenge && kategorie.studiengaenge.length > 0) {
            hierarchicalCategories.get(kategorie.name).directPrograms.push({
              institution: inst.name,
              type: inst.type,
              website: inst.website,
              studiengaenge: kategorie.studiengaenge
            });
          }
        } else {
          // Regular category without subcategories
          if (!hierarchicalCategories.has(kategorie.name)) {
            hierarchicalCategories.set(kategorie.name, {
              isParent: false,
              institutions: []
            });
          }
          const categoryEntry = hierarchicalCategories.get(kategorie.name);
          // If category was previously created as parent, add to directPrograms instead
          if (categoryEntry.isParent) {
            categoryEntry.directPrograms.push({
              institution: inst.name,
              type: inst.type,
              website: inst.website,
              studiengaenge: kategorie.studiengaenge
            });
          } else {
            categoryEntry.institutions.push({
              institution: inst.name,
              type: inst.type,
              website: inst.website,
              studiengaenge: kategorie.studiengaenge
            });
          }
        }
      });
    });

    // Sortiere und rendere
    const sortedMainCategories = Array.from(hierarchicalCategories.keys()).sort();

    sortedMainCategories.forEach(mainCategoryName => {
      const categoryData = hierarchicalCategories.get(mainCategoryName);

      if (categoryData.isParent) {
        // Rendere Obergruppe mit Unterkategorien
        const parentSection = DOMBuilders.createParentCategorySection(
          mainCategoryName,
          categoryData.subcategories,
          categoryData.directPrograms
        );
        container.appendChild(parentSection);
      } else {
        // Rendere normale Kategorie
        const categorySection = DOMBuilders.createCategorySectionGrouped(
          mainCategoryName,
          categoryData.institutions
        );
        container.appendChild(categorySection);
      }
    });
  }
};
