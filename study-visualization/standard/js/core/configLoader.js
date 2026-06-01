window.SpecificprogramConfigLoader = {
  async loadStudiengangConfig(studiengang) {
    try {
      await this.loadScript(
        `../program-specific/${studiengang}/standard-config/general-config.js`,
      );
      await this.loadScript(
        `../program-specific/${studiengang}/standard-config/standardcategories-config.js`,
      );
      await this.loadScript(
        `../program-specific/${studiengang}/standard-config/color-config.js`,
      );
      await this.loadScript(
        `../program-specific/${studiengang}/colormanagement/secondcategories-config.js`,
      );
      await this.loadScript(
        `../program-specific/${studiengang}/colormanagement/thirdcategories-config.js`,
      );
      await this.loadScript(
        `../program-specific/${studiengang}/colormanagement/fourthcategories-config.js`,
      );
      await this.loadScript(
        `../program-specific/${studiengang}/data/basic-modules-data.js`,
      );

      if (!window.StudiengangModules) {
        const anyKey = Object.keys(window).find((k) =>
          /PflichtmoduleData$/.test(k),
        );
        if (anyKey) window.StudiengangModules = window[anyKey];
      }

      await this.loadScript(
        `../program-specific/${studiengang}/data/basic-modules-details.js`,
      );

      if (window.StudiengangModules) {
        this.renderStudiengang(window.StudiengangModules, studiengang);
      }
    } catch (error) {
      console.error(error);
    }
  },

  async loadScript(src) {
    try {
      const response = await fetch(src, { method: "HEAD" });
      if (!response.ok) return;
      const script = document.createElement("script");
      script.src = src;
      document.head.appendChild(script);
      await new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
      });
    } catch (error) {}
  },

  renderStudiengang(modules, studiengang) {
    const mappedModules = this.mapCategoriesToClasses(modules);
    const grouped =
      window.SpecificprogramUtils.groupModulesByYearAndSemester(mappedModules);

    window.SpecificprogramLayout.renderLayout(grouped);

    const categories =
      window.SpecificprogramUtils.getUniqueCategories(mappedModules);
    window.SpecificprogramLegend.renderLegend(categories);

    this.setTitles(studiengang);

    try {
      if (
        window.SpecificprogramKPCounter &&
        typeof window.SpecificprogramKPCounter.updateTotalKP === "function"
      ) {
        window.SpecificprogramKPCounter.updateTotalKP();
      }
      if (
        window.SpecificprogramColorManager &&
        typeof window.SpecificprogramColorManager.initialize === "function"
      ) {
        window.SpecificprogramColorManager.initialize();
      }
    } catch (e) {}
  },

  mapCategoriesToClasses(modules) {
    if (!window.StudiengangCategoriesConfig?.kategorien) {
      return modules.map((module) => ({
        ...module,
        standardcategory:
          this.getCategoryFromColorConfig(module) ||
          this.simplifyCategory(module.standardcategory),
      }));
    }

    const categoryMap = {};
    window.StudiengangCategoriesConfig.kategorien.forEach((cat) => {
      categoryMap[cat.name] = cat.klasse;
    });

    return modules.map((module) => ({
      ...module,
      standardcategory:
        categoryMap[module.standardcategory] ||
        this.getCategoryFromColorConfig(module) ||
        this.simplifyCategory(module.standardcategory),
    }));
  },

  getCategoryFromColorConfig(module) {
    if (window.CSEColorConfig?.getThemenbereich) {
      return window.CSEColorConfig.getThemenbereich(module.name);
    }
    return null;
  },

  simplifyCategory(category) {
    if (!category) return "unknown";
    return category
      .toLowerCase()
      .replace(/obligatorische\s+/g, "")
      .replace(/fächer/g, "")
      .replace(/praktikum/g, "praktikum")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  },

  setTitles(studiengang) {
    const titleElement = document.getElementById("specificprogram-title");
    const subtitleElement = document.getElementById("specificprogram-subtitle");

    if (titleElement) {
      titleElement.textContent =
        window.StudiengangGeneralConfig?.title ||
        this.getStudiengangName(studiengang);
    }

    if (subtitleElement) {
      subtitleElement.innerHTML =
        window.StudiengangGeneralConfig?.subtitleHtml ||
        "mind. 180 KP insgesamt";
    }
  },

  getStudiengangName(studiengang) {
    const names = {
      "eth-cs": "Informatik",
      "eth-cse": "Computer Science and Engineering",
    };
    return names[studiengang] || studiengang.toUpperCase();
  },
};

window.loadStudiengangConfig =
  window.SpecificprogramConfigLoader.loadStudiengangConfig.bind(
    window.SpecificprogramConfigLoader,
  );
window.subModulesReady.configLoader = Promise.resolve();
