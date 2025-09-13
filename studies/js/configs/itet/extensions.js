/* ==== ITET EXTENSIONS - VEREINFACHT MIT ZENTRALEM WAHLMODULE-SYSTEM ==== */
/* Spezifische Anpassungen für ITET, nutzt das zentrale Wahlmodule-System */

window.StudiengangCustomClass = class ITETStudienplan extends StudienplanBase {
  constructor(config) {
    super(config);
  }

  initialize() {
    // Basis-Initialisierung (aktiviert automatisch das zentrale Wahlmodule-System)
    super.initialize();
    
    // ITET-spezifische Initialisierung
    this.setupITETSpecifics();
  }

  setupITETSpecifics() {
    // Spezielle Message-Funktion für ITET falls benötigt
    this.showMessage = function(message, type = "info") {
      this.showToastMessage(message, type);
    };
  }

  /* ==== 3. JAHR LAYOUT - KATEGORIE-BASIERT ==== */
  createYearSection(year) {
    if (year === 3) {
      return this.createThirdYearSection();
    }
    return super.createYearSection(year);
  }

  createThirdYearSection() {
    const yearDiv = document.createElement("div");
    yearDiv.classList.add("jahr");

    const yearTitle = document.createElement("div");
    yearTitle.classList.add("jahr-titel");
    yearTitle.textContent = "3. Jahr";
    yearDiv.appendChild(yearTitle);

    // Kategoriebasiertes Layout nach kurzer Verzögerung
    setTimeout(() => {
      this.createCategoryBasedThirdYear(yearDiv);
    }, 100);

    return yearDiv;
  }

  createCategoryBasedThirdYear(container) {
    const thirdYearModules = this.config.daten.filter((m) => m.jahr === 3);

    // Container leeren (außer Titel)
    const title = container.querySelector(".jahr-titel");
    container.innerHTML = "";
    if (title) {
      container.appendChild(title);
    }

    // Kategorien in definierter Reihenfolge
    const reihenfolge = [
      "Kernfächer nach Schwerpunkt",
      "Weitere Wahl-Grundlagenfächer",
      "Wahlfächer",
      "Wahl Praktika-Projekte-Seminare",
      "Wissenschaftliche Arbeit",
    ];

    reihenfolge.forEach((kategorie) => {
      const kategorieModules = thirdYearModules.filter(
        (m) => m.kategorie === kategorie
      );
      if (kategorieModules.length === 0) return;

      const kategorieConfig = this.config.kategorien.find(
        (k) => k.name === kategorie
      );

      // Kategorie-Titel
      const kategorieTitle = document.createElement("div");
      kategorieTitle.classList.add("bereich-titel");
      if (kategorieConfig && kategorieConfig.minKp) {
        kategorieTitle.textContent = `${kategorie} (mind. ${kategorieConfig.minKp} KP)`;
      } else {
        kategorieTitle.textContent = kategorie;
      }
      container.appendChild(kategorieTitle);

      // Module-Container
      const moduleContainer = document.createElement("div");
      moduleContainer.classList.add("module-container");
      moduleContainer.style.display = "flex";
      moduleContainer.style.flexWrap = "wrap";
      moduleContainer.style.gap = "8px";
      moduleContainer.style.marginBottom = "20px";
      moduleContainer.style.alignItems = "flex-start";

      kategorieModules.forEach((modul) => {
        this.createModule(modul, moduleContainer);
      });

      container.appendChild(moduleContainer);
    });
  }

  /* ==== ERWEITERTE KP-ANZEIGE FÜR KATEGORIEN ==== */
  updateKPDisplayWithCategories() {
    // Basis KP-Counter aktualisieren
    const breakdown = this.updateKPDisplay();

    // Kategorie-spezifische KP-Anzeigen aktualisieren (falls Wahlmodule-Manager aktiv)
    if (this.wahlmoduleManager && this.config.kpCounterConfig?.enableCategoryTracking) {
      this.updateCategoryKPDisplays();
    }

    return breakdown;
  }

  updateCategoryKPDisplays() {
    if (!this.wahlmoduleManager) return;

    const categories = ['praktika', 'kernfaecher', 'wahlfaecher', 'weitere-wahl-grundlagen'];
    const minKpMap = { 'kernfaecher': 18, 'weitere-wahl-grundlagen': 8, 'wahlfaecher': 6 };

    categories.forEach(category => {
      const selectedModules = this.wahlmoduleManager.selectedModules[category] || [];
      const minKp = minKpMap[category] || 0;
      this.updateCategoryKPDisplay(category, { general: selectedModules }, minKp);
    });
  }

  /* ==== MESSAGE SYSTEM ==== */
  showToastMessage(message, type = "info") {
    const toast = document.createElement('div');
    toast.style.position = 'fixed';
    toast.style.top = '20px';
    toast.style.right = '20px';
    toast.style.padding = '10px 15px';
    toast.style.borderRadius = '5px';
    toast.style.zIndex = '9999';
    toast.style.fontSize = '12px';
    toast.style.fontWeight = 'bold';
    toast.textContent = message;

    const colors = {
        success: { bg: '#28a745', color: 'white' },
        warning: { bg: '#ffc107', color: 'black' },
        info: { bg: '#17a2b8', color: 'white' },
        error: { bg: '#dc3545', color: 'white' }
    };

    const style = colors[type] || colors.info;
    toast.style.backgroundColor = style.bg;
    toast.style.color = style.color;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
  }

  /* ==== OVERRIDE TOOLTIP HIDING ==== */
  hideTooltip() {
    super.hideTooltip();
    
    // Cleanup outside click handler if exists
    if (this.wahlmoduleManager && this.wahlmoduleManager._outsideClickHandler) {
      document.removeEventListener('click', this.wahlmoduleManager._outsideClickHandler, true);
      this.wahlmoduleManager._outsideClickHandler = null;
    }
  }
};