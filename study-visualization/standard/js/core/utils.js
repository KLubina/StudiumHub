/**
 * UTILS - Hilfsfunktionen
 */

window.SpecificprogramUtils = {
  // Gruppiere Module nach Jahr und Semester
  groupModulesByYearAndSemester(modules) {
    const grouped = {};
    const categoryOrder = window.StudiengangCategoriesConfig?.legendOrder;
    const orderedModules = Array.isArray(categoryOrder)
      ? [...modules].sort(
          (a, b) =>
            categoryOrder.indexOf(a.standardcategory) -
            categoryOrder.indexOf(b.standardcategory),
        )
      : modules;

    orderedModules.forEach((module) => {
      const year = module.year;
      const semester = module.semester;
      if (!grouped[year]) grouped[year] = {};
      if (!grouped[year][semester]) grouped[year][semester] = [];
      grouped[year][semester].push(module);
    });
    return grouped;
  },

  // Sammle einzigartige Kategorien
  getUniqueCategories(modules) {
    const categories = new Set();
    modules.forEach((module) => {
      if (module.standardcategory) {
        categories.add(module.standardcategory);
      }
    });

    const legendOrder = window.StudiengangCategoriesConfig?.legendOrder;
    if (!Array.isArray(legendOrder)) return Array.from(categories);

    const categoriesForLegend = window.StudiengangCategoriesConfig
      .includeEmptyLegendCategories
      ? new Set([...categories, ...legendOrder])
      : categories;

    return [
      ...legendOrder.filter((category) => categoriesForLegend.has(category)),
      ...Array.from(categories).filter(
        (category) => !legendOrder.includes(category),
      ),
    ];
  },

  // Berechne Gesamt ECTS
  calculateTotalECTS(modules) {
    return modules.reduce((total, module) => total + (module.ects || 0), 0);
  },

  // Erstelle URL für Studiengang
  createStudiengangURL(studiengang) {
    return `?studiengang=${encodeURIComponent(studiengang)}`;
  },
};

// Markiere als geladen
window.subModulesReady.utils = Promise.resolve();
