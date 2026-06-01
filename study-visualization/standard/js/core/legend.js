window.SpecificprogramLegend = {
  renderLegend(categories) {
    const legendContainer = document.getElementById("legende");
    if (!legendContainer) return;

    legendContainer.innerHTML = categories
      .map(
        (category) => `
        <div class="legende-item ${category}">
          <div class="legende-text">${this.getCategoryName(category)}</div>
        </div>
      `,
      )
      .join("");
  },

  getCategoryName(category) {
    if (window.StudiengangCategoriesConfig?.kategorien) {
      const cat = window.StudiengangCategoriesConfig.kategorien.find(
        (c) => c.klasse === category,
      );
      if (cat) return cat.name;
    }

    if (window.CSEColorConfig?.colors?.themenbereiche[category]) {
      return window.CSEColorConfig.colors.themenbereiche[category].label;
    }
    return category;
  },
};
window.subModulesReady.legend = Promise.resolve();
