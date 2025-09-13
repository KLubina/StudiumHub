/* ==== ITET EXTENSIONS - VEREINFACHT MIT ZENTRALEM KP-COUNTER ==== */
/* Hauptklasse für ITET - nutzt das zentrale KP-Counter System */

window.StudiengangCustomClass = class ITETStudienplan extends StudienplanBase {
  constructor(config) {
    super(config);

    // Properties aus geladenen Modulen
    this.moduleData = window.ITETModuleData || {};

    // State für ausgewählte Module
    this.selectedPraktika = this.loadSelectedModules("praktika");
    this.selectedKernfaecher = this.loadSelectedModules("kernfaecher");
    this.selectedWahlfaecher = this.loadSelectedModules("wahlfaecher");
    this.selectedWeitereWahlGrundlagen = this.loadSelectedModules(
      "weitere-wahl-grundlagen"
    );

    this.initializeNewModuleCategories();

    // Tooltip-Locks
    this.isPraktikaTooltipLocked = false;
    this.isKernfaecherTooltipLocked = false;
    this.isWahlfaecherTooltipLocked = false;
    this.isWeitereWahlGrundlagenTooltipLocked = false;
  }

  initialize() {
    // Globale Referenz für Tooltip-Buttons
    window.currentStudienplan = this;

    // Vor Initialisierung bereits ausgewählte Module integrieren (automatisches Laden)
    try {
      const selectionCounts = [
        this.selectedPraktika?.general?.length || 0,
        this.selectedKernfaecher?.general?.length || 0,
        this.selectedWahlfaecher?.general?.length || 0,
        this.selectedWeitereWahlGrundlagen?.general?.length || 0,
      ];
      const total = selectionCounts.reduce((a, b) => a + b, 0);
      if (total > 0 && typeof this.integrateSelectedPraktikaIntoConfig === 'function') {
        this.integrateSelectedPraktikaIntoConfig();
      }
    } catch (e) {
      console.warn('Auto-Integrate failed:', e);
    }

    // Basis-Initialisierung (rendert jetzt ggf. schon mit dynamischen Modulen)
    super.initialize();

    // KP-Counter über zentrale Basis-Klasse initialisieren (NEU!)
    this.initializeKPCounter();
    
    // ITET-spezifische Initialisierung
    this.addPraktikaControls();
    this.updateKPDisplayWithCategories(); // Erweiterte KP-Anzeige
  }

  initializeNewModuleCategories() {
    // Prüfe ob die separate Datei geladen wurde
    if (window.ITETModuleData) {
      this.kernfaecherSchwerpunkte =
        window.ITETModuleData.kernfaecherSchwerpunkte;
      this.wahlfaecherBereiche = window.ITETModuleData.wahlfaecherBereiche;
      this.weitereWahlGrundlagen = window.ITETModuleData.weitereWahlGrundlagen;
      this.praktikaSchwerpunkte = window.ITETModuleData.praktikaSchwerpunkte;
    } else {
      console.warn("ITETModuleData nicht geladen, verwende Fallback-Daten");
    }
  }

  /* ==== ERWEITERTE KP-ANZEIGE (nutzt zentrales System) ==== */
  updateKPDisplayWithCategories() {
    // Basis KP-Counter aktualisieren
    const breakdown = this.updateKPDisplay();

    // Kategorie-spezifische KP-Anzeigen aktualisieren (nur wenn Tracking aktiviert)
    if (this.config.kpCounterConfig?.enableCategoryTracking) {
      this.updateCategoryKPDisplays();
    }

    return breakdown;
  }

  updateCategoryKPDisplays() {
    // Nutze die zentrale Methode für Kategorie-KP-Anzeige
    this.updateCategoryKPDisplay("praktika", this.selectedPraktika);
    this.updateCategoryKPDisplay("kernfaecher", this.selectedKernfaecher, 18);
    this.updateCategoryKPDisplay("wahlfaecher", this.selectedWahlfaecher, 6);
    this.updateCategoryKPDisplay("weitere-wahl-grundlagen", this.selectedWeitereWahlGrundlagen, 8);
  }

  /* ==== LEGEND TOOLTIP EVENTS (OVERRIDE) ==== */
  addLegendTooltipEvents(div, kategorie) {
    if (!kategorie || !kategorie.hasTooltip) return;

    // Markiere visuell als interaktiv
    div.classList.add("tooltip-enabled");
    div.style.cursor = "pointer";
    div.title = "Klicken zum Module auswählen";

    const openTooltip = (e) => {
      // Sicherstellen, dass benötigte Tooltip-Funktionen geladen sind
      if (!window.ITETTooltips) {
        console.warn("ITETTooltips noch nicht geladen");
        return;
      }
      // Event anreichern falls von Keyboard / programmatisch
      if (!e.clientX || !e.clientY) {
        const rect = div.getBoundingClientRect();
        e.clientX = rect.left + rect.width / 2;
        e.clientY = rect.top + rect.height / 2;
      }

      const name = kategorie.name;
      if (name.startsWith("Kernfächer")) {
        this.showKernfaecherTooltip(e);
      } else if (name.startsWith("Weitere Wahl-Grundlagen")) {
        this.showWeitereWahlGrundlagenTooltip(e);
      } else if (name === "Wahlfächer") {
        this.showWahlfaecherTooltip(e);
      } else if (name.startsWith("Wahl Praktika")) {
        this.showPraktikaTooltip(e);
      }
    };

    div.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      openTooltip(e);
    });

    // Tastatur-Zugänglichkeit
    div.tabIndex = 0;
    div.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openTooltip(e);
      }
    });
  }

  addPraktikaControls() {
    // Controls hinzufügen - NUR wenn sie nicht bereits existieren
    if (!document.getElementById("show-praktika-list")) {
      window.ITETUtils?.addPraktikaControls();
    }

    // Event Listeners Setup
    this.setupPraktikaControlEvents();
  }

  setupPraktikaControlEvents() {
    const self = this;
    
    // Event Listeners - mit Null-Checks
    const eventMappings = [
      { id: "show-praktika-list", method: "showPraktikaTooltip" },
      { id: "show-kernfaecher-list", method: "showKernfaecherTooltip" },
      { id: "show-wahlfaecher-list", method: "showWahlfaecherTooltip" },
      { id: "show-weitere-wahl-grundlagen-list", method: "showWeitereWahlGrundlagenTooltip" }
    ];

    eventMappings.forEach(({ id, method }) => {
      const btn = document.getElementById(id);
      if (btn && !btn.onclick) {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          self[method](e);
        });
      }
    });

    // Weitere Control-Buttons
    const saveBtn = document.getElementById("save-praktika");
    if (saveBtn && !saveBtn.onclick) {
      saveBtn.addEventListener("click", () => self.exportPraktika());
    }

    const refreshBtn = document.getElementById("refresh-studienplan");
    if (refreshBtn && !refreshBtn.onclick) {
      refreshBtn.addEventListener("click", () => self.refreshStudienplan());
    }

    const resetBtn = document.getElementById("reset-praktika");
    if (resetBtn && !resetBtn.onclick) {
      resetBtn.addEventListener("click", () => self.resetPraktika());
    }
  }

  /* ==== 3. JAHR LAYOUT ==== */
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

  /* ==== MODUL AUSWAHL LOGIK (vereinfacht) ==== */
  toggleModulFromTooltip(modulName, category) {
    if (!this.moduleData) return;

    const moduleMap = {
      praktika: Object.values(this.moduleData.praktikaSchwerpunkte || {}).flat(),
      kernfaecher: Object.values(this.moduleData.kernfaecherSchwerpunkte || {}).flat(),
      wahlfaecher: Object.values(this.moduleData.wahlfaecherBereiche || {}).flat(),
      "weitere-wahl-grundlagen": this.moduleData.weitereWahlGrundlagen || [],
    };

    const modul = moduleMap[category]?.find((m) => m.name === modulName);
    if (modul) {
      this.toggleModulSelection(modul, category);
      this.updateStudienplanWithSelection();

      // Tooltip neu laden nach kurzer Verzögerung
      setTimeout(() => {
        const event = { clientX: 100, clientY: 100 };
        if (category === "praktika") this.showPraktikaTooltip(event);
        else if (category === "kernfaecher") this.showKernfaecherTooltip(event);
        else if (category === "wahlfaecher") this.showWahlfaecherTooltip(event);
        else if (category === "weitere-wahl-grundlagen")
          this.showWeitereWahlGrundlagenTooltip(event);
      }, 100);
    }
  }

  toggleModulSelection(modul, category) {
    if (this.isModulSelected(modul.name, category)) {
      this.removeModulSelection(modul, category);
    } else {
      this.addModulSelection(modul, category);
    }
  }

  addModulSelection(modul, category) {
    const selectedMap = {
      praktika: this.selectedPraktika,
      kernfaecher: this.selectedKernfaecher,
      wahlfaecher: this.selectedWahlfaecher,
      "weitere-wahl-grundlagen": this.selectedWeitereWahlGrundlagen,
    };

    if (!selectedMap[category]["general"]) {
      selectedMap[category]["general"] = [];
    }

    selectedMap[category]["general"].push({ ...modul });
    this.saveSelectedModules(category);
    
    // Zentrale KP-Anzeige aktualisieren
    this.updateKPDisplayWithCategories();
    
    this.showMessage(`✅ "${modul.name}" hinzugefügt`, "success");
    this.updateStudienplanWithSelection();
  }

  removeModulSelection(modul, category) {
    const selectedMap = {
      praktika: this.selectedPraktika,
      kernfaecher: this.selectedKernfaecher,
      wahlfaecher: this.selectedWahlfaecher,
      "weitere-wahl-grundlagen": this.selectedWeitereWahlGrundlagen,
    };

    if (selectedMap[category]["general"]) {
      selectedMap[category]["general"] = selectedMap[category]["general"].filter(
        (m) => m.name !== modul.name
      );
    }

    this.saveSelectedModules(category);
    
    // Zentrale KP-Anzeige aktualisieren
    this.updateKPDisplayWithCategories();
    
    this.showMessage(`🗑️ "${modul.name}" entfernt`, "info");
    this.updateStudienplanWithSelection();
  }

  isModulSelected(modulName, category) {
    const selectedMap = {
      praktika: this.selectedPraktika,
      kernfaecher: this.selectedKernfaecher,
      wahlfaecher: this.selectedWahlfaecher,
      "weitere-wahl-grundlagen": this.selectedWeitereWahlGrundlagen,
    };

    return Object.values(selectedMap[category]).some((moduleList) =>
      moduleList.some((m) => m.name === modulName)
    );
  }

  /* ==== TOOLTIPS ==== */
  showPraktikaTooltip(event) {
    if (!window.ITETTooltips?.createPraktikaTooltipContent) return;

    const content = window.ITETTooltips.createPraktikaTooltipContent(
      this.moduleData,
      (name, cat) => this.isModulSelected(name, cat)
    );
    this.showCustomTooltip(content, event);
  }

  showKernfaecherTooltip(event) {
    if (!window.ITETTooltips?.createKernfaecherTooltipContent) return;

    const content = window.ITETTooltips.createKernfaecherTooltipContent(
      this.moduleData,
      (name, cat) => this.isModulSelected(name, cat)
    );
    this.showCustomTooltip(content, event);
  }

  showWahlfaecherTooltip(event) {
    if (!window.ITETTooltips?.createWahlfaecherTooltipContent) return;

    const content = window.ITETTooltips.createWahlfaecherTooltipContent(
      this.moduleData,
      (name, cat) => this.isModulSelected(name, cat)
    );
    this.showCustomTooltip(content, event);
  }

  showWeitereWahlGrundlagenTooltip(event) {
    if (!window.ITETTooltips?.createWeitereWahlGrundlagenTooltipContent) return;

    const content = window.ITETTooltips.createWeitereWahlGrundlagenTooltipContent(
      this.moduleData,
      (name, cat) => this.isModulSelected(name, cat)
    );
    this.showCustomTooltip(content, event);
  }

  /* ==== STORAGE & UTILITY METHODS (vereinfacht) ==== */
  loadSelectedModules(category) {
    try {
      const storageKey = `itet-selected-${category}`;
      const saved = localStorage.getItem(storageKey);
      if (!saved) return { general: [] };
      
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? { general: parsed } : parsed;
    } catch (error) {
      console.error(`Fehler beim Laden von ${category}:`, error);
      return { general: [] };
    }
  }

  saveSelectedModules(category) {
    try {
      const storageKey = `itet-selected-${category}`;
      const selectedMap = {
        praktika: this.selectedPraktika,
        kernfaecher: this.selectedKernfaecher,
        wahlfaecher: this.selectedWahlfaecher,
        "weitere-wahl-grundlagen": this.selectedWeitereWahlGrundlagen,
      };

      localStorage.setItem(storageKey, JSON.stringify(selectedMap[category]));
    } catch (error) {
      console.error(`Fehler beim Speichern von ${category}:`, error);
    }
  }

  showMessage(message, type = "info") {
    if (window.ITETUtils?.showMessage) {
      window.ITETUtils.showMessage(message, type);
    } else {
      console.log(`${type}: ${message}`);
    }
  }

  refreshStudienplan() {
    this.showMessage("🔄 Lade Studienplan neu...", "info");

    // Entferne alte dynamische Module
    this.config.daten = this.config.daten.filter((m) => !m.isDynamic);

    // Füge aktuelle Auswahl hinzu
    this.integrateSelectedPraktikaIntoConfig();

    // Neuaufbau des Studienplans
    this.createStudienplan();

    // 3. Jahr Layout verbessern
    setTimeout(() => {
      const thirdYearContainer = document.querySelector(".jahr:last-child");
      if (thirdYearContainer) {
        this.createCategoryBasedThirdYear(thirdYearContainer);
      }
    }, 100);

    // Zentrale KP-Anzeige aktualisieren
    this.updateKPDisplayWithCategories();
    this.showMessage("✅ Studienplan aktualisiert!", "success");
  }

  integrateSelectedPraktikaIntoConfig() {
    // Entferne ALLE dynamischen Module
    this.config.daten = this.config.daten.filter((m) => !m.isDynamic);

    // Ermittele welche Kategorien tatsächlich ausgewählt wurden
    const selectedAll = [
      ...Object.values(this.selectedPraktika || {}).flat(),
      ...Object.values(this.selectedKernfaecher || {}).flat(),
      ...Object.values(this.selectedWahlfaecher || {}).flat(),
      ...Object.values(this.selectedWeitereWahlGrundlagen || {}).flat(),
    ];
    const selectedCategories = new Set(selectedAll.map((m) => m.kategorie));

    // Placeholder nur für Kategorien mit Auswahl entfernen
    this.config.daten = this.config.daten.filter((m) => {
      if (!m.isPlaceholder) return true;
      return selectedCategories.has(m.kategorie) ? false : true;
    });

    // Entferne Module aus Jahr 3 die ersetzt werden
    this.config.daten = this.config.daten.filter((m) => {
      if (m.jahr <= 2) return true;
      if (
        m.kategorie === "Kernfächer nach Schwerpunkt" ||
        m.kategorie === "Wahlfächer"
      ) {
        return false;
      }
      return true;
    });

    // Füge alle ausgewählten Module hinzu
    const allSelectedModules = [
      ...Object.values(this.selectedPraktika).flat(),
      ...Object.values(this.selectedKernfaecher).flat(),
      ...Object.values(this.selectedWahlfaecher).flat(),
      ...Object.values(this.selectedWeitereWahlGrundlagen).flat(),
    ];

    allSelectedModules.forEach((modul) => {
      const moduleCopy = {
        ...modul,
        jahr: 3,
        semester: 0,
        isDynamic: true,
      };
      this.config.daten.push(moduleCopy);
    });
  }

  updateStudienplanWithSelection() {
    // Aktuelle Auswahl integrieren
    this.integrateSelectedPraktikaIntoConfig();

    // Suche Container des 3. Jahres
    const yearContainers = Array.from(document.querySelectorAll('.jahr'));
    const thirdYearContainer = yearContainers.find(c => {
      const title = c.querySelector('.jahr-titel');
      return title && /3\.\s*Jahr/i.test(title.textContent.trim());
    });

    if (thirdYearContainer) {
      this.createCategoryBasedThirdYear(thirdYearContainer);
    } else {
      this.createStudienplan();
    }

    // Zentrale KP-Anzeige aktualisieren
    this.updateKPDisplayWithCategories();
  }

  /* ==== TOOLTIP BEHAVIOR (CLICK-ONLY + OUTSIDE CLICK CLOSE) ==== */
  showCustomTooltip(content, event) {
    // Auf Basisfunktion zurückgreifen
    if (typeof StudienplanBase !== 'undefined' && StudienplanBase.prototype.showCustomTooltip) {
      StudienplanBase.prototype.showCustomTooltip.call(this, content, event);
    }

    // Outside-Click Handler nur einmal registrieren
    if (!this._outsideClickHandler) {
      this._outsideClickHandler = (e) => {
        if (!this.tooltipEl) {
          document.removeEventListener('click', this._outsideClickHandler, true);
          this._outsideClickHandler = null;
          return;
        }
        const insideTooltip = this.tooltipEl.contains(e.target);
        const insideLegendInteractive = !!e.target.closest('.farben-legende .tooltip-enabled');
        if (!insideTooltip && !insideLegendInteractive) {
          this.hideTooltip();
        }
      };
      document.addEventListener('click', this._outsideClickHandler, true);
    }
  }

  hideTooltip() {
    if (typeof StudienplanBase !== 'undefined' && StudienplanBase.prototype.hideTooltip) {
      StudienplanBase.prototype.hideTooltip.call(this);
    }
    if (this._outsideClickHandler) {
      document.removeEventListener('click', this._outsideClickHandler, true);
      this._outsideClickHandler = null;
    }
  }
};