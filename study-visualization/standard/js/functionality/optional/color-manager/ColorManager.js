/* Color Manager - Runtime Implementation */

class StudiengangColorManager {
  constructor(studienplan) {
    this.studienplan = studienplan;
    this.config = studienplan.config || {};
    this.moduleMap = null;
    this.controlsContainer = null;
    this.cssLinks = new Map();

    this.studiengangKey =
      document.body.getAttribute("data-studiengang") || "unknown";
    const detector = new StudyModelDetector();
    this.studyModel = detector.getStudyModel(this.studiengangKey);
    this.basePath = `../program-specific/${this.studyModel}/${this.studiengangKey}`;

    this.modeDefinitions = this.buildModes();
    this.modeMap = new Map(this.modeDefinitions.map((mode) => [mode.key, mode]));
    this.currentModeKey = this.determineInitialMode();
  }

  init() {
    if (!this.modeDefinitions.length) {
      console.warn(
        "[ColorManager] Keine Farb-Modi definiert – überspringe Initialisierung."
      );
      return false;
    }

    this.createControls();
    this.applyMode(this.currentModeKey);
    return true;
  }

  buildModes() {
    const modes = [];

    // Default "Standard" mode based on the standard categories of the config
    modes.push({
      key: "standard",
      label: "Standard",
      categoryField: "standardcategory",
      valueType: "name",
      order: 0,
      css: null,
      getCategories: () => this.config.kategorien || [],
      default: true,
    });

    const customModes =
      window.StudiengangColorManagerModes ||
      window[this.studienplan.constructor.name + "ColorManagerModes"] ||
      {};

    Object.entries(customModes).forEach(([key, definition]) => {
      if (!definition) return;
      const mode = {
        key,
        label: definition.label || this.formatLabel(key),
        categoryField: definition.categoryField || "standardcategory",
        valueType: definition.valueType || "name",
        order:
          typeof definition.order === "number"
            ? definition.order
            : modes.length + 1,
        css: definition.css || null,
        getCategories:
          typeof definition.getCategories === "function"
            ? definition.getCategories
            : () => definition.categories || [],
        deriveClass:
          typeof definition.deriveClass === "function"
            ? definition.deriveClass
            : null,
        default: Boolean(definition.default),
      };

      modes.push(mode);
    });

    modes.forEach((mode) => {
      mode.label = mode.label || this.formatLabel(mode.key);
    });

    modes.sort((a, b) => {
      const orderA = typeof a.order === "number" ? a.order : 0;
      const orderB = typeof b.order === "number" ? b.order : 0;
      if (orderA !== orderB) return orderA - orderB;
      return (a.label || "").localeCompare(b.label || "", "de");
    });

    return modes;
  }

  determineInitialMode() {
    const preferred = this.modeDefinitions.find((mode) => mode.default);
    if (preferred) {
      return preferred.key;
    }

    const standard = this.modeDefinitions.find((mode) => mode.key === "standard");
    if (standard) {
      return standard.key;
    }

    return this.modeDefinitions[0]?.key || null;
  }

  formatLabel(key) {
    return key
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (match) => match.toUpperCase());
  }

  createControls() {
    const legendContainer = document.querySelector(".farben-legende");
    if (!legendContainer) return;

    const existing = legendContainer.querySelector(".color-manager-controls");
    if (existing) existing.remove();

    const controls = document.createElement("div");
    controls.className = "color-manager-controls";

    const label = document.createElement("div");
    label.className = "color-manager-label";
    label.textContent = "Farbmodus";
    controls.appendChild(label);

    const buttonsWrapper = document.createElement("div");
    buttonsWrapper.className = "color-manager-buttons";

    this.modeDefinitions.forEach((mode) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "color-manager-button";
      button.dataset.mode = mode.key;
      button.textContent = mode.label;
      if (mode.key === this.currentModeKey) {
        button.classList.add("is-active");
      }
      button.addEventListener("click", () => {
        if (this.currentModeKey !== mode.key) {
          this.applyMode(mode.key);
        }
      });
      buttonsWrapper.appendChild(button);
    });

    controls.appendChild(buttonsWrapper);
    legendContainer.insertBefore(controls, legendContainer.firstChild);
    this.controlsContainer = controls;
  }

  applyMode(modeKey) {
    const mode = this.modeMap.get(modeKey);
    if (!mode) {
      console.warn(`[ColorManager] Unbekannter Modus: ${modeKey}`);
      return;
    }

    this.currentModeKey = modeKey;
    this.ensureCssForMode(mode);
    this.toggleCssLinks();
    this.updateButtonState();
    this.applyColors(mode);
    this.renderLegend(mode);
  }

  refreshCurrentMode(options = {}) {
    const mode = this.modeMap.get(this.currentModeKey);
    if (!mode) return;

    const { updateLegend = true, updateButtons = false } = options;

    this.ensureCssForMode(mode);
    this.toggleCssLinks();
    this.applyColors(mode);
    if (updateLegend) {
      this.renderLegend(mode);
    }
    if (updateButtons) {
      this.updateButtonState();
    }
  }

  ensureCssForMode(mode) {
    if (!mode.css) return;

    Object.entries(mode.css).forEach(([type, relativePath]) => {
      if (!relativePath) return;
      const linkKey = `${mode.key}:${type}`;
      if (this.cssLinks.has(linkKey)) return;

      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = this.resolveProgramAsset(relativePath);
      link.dataset.colorManagerMode = mode.key;
      link.dataset.colorManagerType = type;
      link.disabled = true;
      document.head.appendChild(link);
      this.cssLinks.set(linkKey, link);
    });
  }

  toggleCssLinks() {
    this.cssLinks.forEach((link, key) => {
      const [modeKey] = key.split(":");
      link.disabled = modeKey !== this.currentModeKey;
    });
  }

  updateButtonState() {
    if (!this.controlsContainer) return;
    this.controlsContainer
      .querySelectorAll(".color-manager-button")
      .forEach((button) => {
        button.classList.toggle(
          "is-active",
          button.dataset.mode === this.currentModeKey
        );
      });
  }

  applyColors(mode) {
    const modules = document.querySelectorAll(".modul");
    modules.forEach((modulEl) => {
      const name =
        modulEl.dataset.originalName ||
        modulEl.querySelector(".modul-titel")?.textContent?.trim();
      if (!name) return;

      const modulData = this.getModuleByName(name);
      const previousClass = modulEl.dataset.colorManagerClass;
      if (previousClass) {
        modulEl.classList.remove(previousClass);
      }

      const cssClass = this.getCssClassForModule(modulData, mode);
      if (cssClass) {
        modulEl.classList.add(cssClass);
        modulEl.dataset.colorManagerClass = cssClass;
      } else {
        delete modulEl.dataset.colorManagerClass;
      }
    });
  }

  getModuleByName(name) {
    if (!this.moduleMap) {
      this.moduleMap = new Map();
      (this.config.daten || []).forEach((modul) => {
        if (modul?.name) {
          this.moduleMap.set(modul.name, modul);
        }
      });
    }
    return this.moduleMap.get(name);
  }

  getCssClassForModule(modul, mode) {
    if (!modul) return null;
    const field = mode.categoryField;
    if (!field) return null;

    const value = modul[field];
    if (!value) return null;

    if (typeof mode.deriveClass === "function") {
      return mode.deriveClass(modul, value);
    }

    if (mode.valueType === "class") {
      return value;
    }

    const categoryMap = this.getCategoryMap(mode);
    return categoryMap.get(value) || null;
  }

  getCategoryMap(mode) {
    if (!mode._categoryMap) {
      const map = new Map();
      this.getCategoriesForMode(mode).forEach((category) => {
        if (!category) return;

        if (category.value) {
          map.set(category.value, category.klasse || category.value);
        }

        if (category.name) {
          map.set(category.name, category.klasse || category.name);
        }

        if (!category.name && category.klasse) {
          map.set(category.klasse, category.klasse);
        }
      });
      mode._categoryMap = map;
    }
    return mode._categoryMap;
  }

  getCategoriesForMode(mode) {
    if (typeof mode.getCategories === "function") {
      try {
        const categories = mode.getCategories();
        return Array.isArray(categories) ? categories : [];
      } catch (error) {
        console.error(
          "[ColorManager] Fehler beim Lesen der Kategorien:",
          error
        );
        return [];
      }
    }

    return Array.isArray(mode.categories) ? mode.categories : [];
  }

  renderLegend(mode) {
    const container = document.getElementById("legende");
    if (!container) return;

    container.innerHTML = "";
    const categories = this.getCategoriesForMode(mode);
    if (!categories || categories.length === 0) return;

    categories.forEach((category) => {
      this.studienplan.createLegendItem(category, container);
    });
  }

  renderLegendForCurrentMode() {
    const mode = this.modeMap.get(this.currentModeKey);
    if (!mode) return;
    this.renderLegend(mode);
  }

  resolveProgramAsset(relativePath) {
    if (!relativePath) return "";
    const normalized = relativePath.replace(/^\.?\//, "");
    return `${this.basePath}/${normalized}`;
  }
}

window.StudiengangColorManager = StudiengangColorManager;
/* Color Manager - Main Class - NEUE IMPLEMENTATION */

class StudienplanBaseColorManager {
    constructor(studienplan) {
        this.studienplan = studienplan;
        this.config = studienplan.config;

        // Neue Configs laden
        this.thirdCategoryConfig = window.ITETThirdCategoryConfig;
        this.secondCategoryConfig = window.StudiengangCategoriesConfig;

        // Modi für das neue ColorManagement-System
        this.modes = {
            kategorie: "Organisation",
            themenbereich: "Themenbereiche"
        };
        this.currentMode = "kategorie";
        this.currentLegend = "standard";
        this.activeFilterClass = null;
    }

    setMode(mode) {
        if (!this.modes[mode]) return;
        this.currentMode = mode;
        this.activeFilterClass = null;
        this.applyColors();
        this.updateLegend();
        this.syncRadioButtons();
    }

    setLegend(legend) {
        this.currentLegend = legend;
        this.applyColors();
        this.updateLegend();
    }

    applyColors() {
        document.querySelectorAll(".modul").forEach(modulEl => {
            const modulName = modulEl.dataset.originalName || modulEl.querySelector('.modul-titel')?.textContent.trim();
            if (!modulName) return;

            // Reset classes
            modulEl.className = 'modul';

            const cssClass = this.getCssClass(modulName);
            if (cssClass) modulEl.classList.add(cssClass);

            // Dimming nach Filter anwenden
            if (this.activeFilterClass && !modulEl.classList.contains(this.activeFilterClass)) {
                modulEl.classList.add('dimmed');
            } else {
                modulEl.classList.remove('dimmed');
            }
        });
    }

    getCssClass(modulName) {
        const modul = this.config.daten?.find(m => m.name === modulName);
        if (!modul) return null;

        if (this.currentMode === "themenbereich") {
            // Verwende thirdcategory direkt
            return modul.thirdcategory || null;
        }

        if (this.currentMode === "kategorie") {
            // Verwende secondcategory oder standardcategory
            const categoryKey = this.currentLegend + "category";
            const categoryName = modul[categoryKey] || modul.standardcategory || modul.secondcategory;

            // Finde die klasse aus der secondCategoryConfig
            if (categoryName && this.secondCategoryConfig?.kategorien) {
                const category = this.secondCategoryConfig.kategorien.find(k => k.name === categoryName);
                return category?.klasse || null;
            }

            return null;
        }

        return null;
    }

    updateLegend() {
        const legendContainer = document.querySelector('.legende');
        if (!legendContainer) return;

        legendContainer.innerHTML = '';

        let legendItems = [];

        if (this.currentMode === "themenbereich" && this.thirdCategoryConfig?.kategorien) {
            legendItems = this.thirdCategoryConfig.kategorien;
        } else if (this.currentMode === "kategorie") {
            if (this.currentLegend === 'standard' && Array.isArray(this.config?.kategorien)) {
                legendItems = this.config.kategorien;
            } else if (this.currentLegend === 'second' && this.secondCategoryConfig?.kategorien) {
                legendItems = this.secondCategoryConfig.kategorien;
            }
        }

        legendItems.forEach(item => {
            const legendItem = document.createElement('div');
            const itemClass = (typeof item === 'string')
                ? (this.studienplan.getCssClassForCategory ? this.studienplan.getCssClassForCategory(item) : null)
                : item.klasse;

            legendItem.className = `legende-item ${itemClass || ''}`.trim();
            legendItem.textContent = (typeof item === 'string') ? item : item.name;
            legendItem.style.cursor = 'pointer';

            // Aktiven Zustand setzen
            if (itemClass && this.activeFilterClass === itemClass) {
                legendItem.classList.add('is-active');
            }

            legendItem.addEventListener('click', () => {
                // Toggle des Filters
                if (!itemClass) return;
                this.activeFilterClass = (this.activeFilterClass === itemClass) ? null : itemClass;
                this.applyColors(); // Re-applizieren inkludiert Dimming
                // Aktiven Zustand in der Legende aktualisieren
                legendContainer.querySelectorAll('.legende-item').forEach(el => el.classList.remove('is-active'));
                if (this.activeFilterClass) {
                    legendItem.classList.add('is-active');
                }
            });

            legendContainer.appendChild(legendItem);
        });
    }

    syncRadioButtons() {
        document.querySelectorAll('input[name="color-mode"]').forEach(radio => {
            radio.checked = radio.value === this.currentMode;
        });
    }
}

window.StudienplanBaseColorManager = StudienplanBaseColorManager;
