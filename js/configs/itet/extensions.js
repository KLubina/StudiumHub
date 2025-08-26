/* ==== ITET EXTENSIONS MAIN (VEREINFACHT) ==== */
/* Hauptklasse für ITET - nutzt die ausgelagerten Module */

window.StudiengangCustomClass = class ITETStudienplan extends StudienplanBase {
  constructor(config) {
    super(config);

    // Properties aus geladenen Modulen
    this.moduleData = window.ITETModuleData || {};
    this.kpCounter = window.ITETKPCounter || {};
    
    // State für ausgewählte Module
    this.selectedPraktika = this.loadSelectedModules("praktika");
    this.selectedKernfaecher = this.loadSelectedModules("kernfaecher");
    this.selectedWahlfaecher = this.loadSelectedModules("wahlfaecher");
    this.selectedWeitereWahlGrundlagen = this.loadSelectedModules("weitere-wahl-grundlagen");

    // Tooltip-Locks
    this.isPraktikaTooltipLocked = false;
    this.isKernfaecherTooltipLocked = false;
    this.isWahlfaecherTooltipLocked = false;
    this.isWeitereWahlGrundlagenTooltipLocked = false;

    // KP-Counter State
    this.showDetailedBreakdown = false;
    this.updateTimeout = null;
  }

  initialize() {
    // Globale Referenz für Tooltip-Buttons
    window.currentStudienplan = this;

    // Basis-Initialisierung
    super.initialize();

    // ITET-spezifische Initialisierung
    this.addKPCounter();
    this.addPraktikaControls();
    this.updateKPDisplay();
  }

  addPraktikaControls() {
    // Controls hinzufügen
    window.ITETUtils.addPraktikaControls();
    
    // Event Listeners
    document.getElementById("show-praktika-list").addEventListener("click", (e) => {
      this.showPraktikaTooltip(e);
    });

    document.getElementById("show-kernfaecher-list").addEventListener("click", (e) => {
      e.preventDefault();
      this.showKernfaecherTooltip(e);
    });

    document.getElementById("show-wahlfaecher-list").addEventListener("click", (e) => {
      e.preventDefault();
      this.showWahlfaecherTooltip(e);
    });

    document.getElementById("show-weitere-wahl-grundlagen-list").addEventListener("click", (e) => {
      e.preventDefault();
      this.showWeitereWahlGrundlagenTooltip(e);
    });

    document.getElementById("save-praktika").addEventListener("click", () => {
      this.exportPraktika();
    });

    document.getElementById("refresh-studienplan").addEventListener("click", () => {
      this.refreshStudienplan();
    });

    document.getElementById("reset-praktika").addEventListener("click", () => {
      this.resetPraktika();
    });
  }

  /* ==== KP-COUNTER ==== */
  addKPCounter() {
    const legendContainer = document.querySelector(".farben-legende");
    const kpCounterElement = this.kpCounter.createKPCounter();
    legendContainer.insertBefore(kpCounterElement, legendContainer.firstChild);
  }

  updateKPDisplay() {
    this.kpCounter.updateKPDisplay(this.config);
    this.updateModuleSelectionDisplays();
  }

  updateModuleSelectionDisplays() {
    // Update Praktika KP
    const praktikaKp = Object.values(this.selectedPraktika).flat().reduce((sum, m) => sum + m.kp, 0);
    const praktikaDisplay = document.getElementById("selected-praktika-kp");
    if (praktikaDisplay) {
      praktikaDisplay.textContent = praktikaKp;
      praktikaDisplay.style.color = praktikaKp > 0 ? "#28a745" : "#dc3545";
    }

    // Update Kernfächer KP
    const kernfaecherKp = Object.values(this.selectedKernfaecher).flat().reduce((sum, m) => sum + m.kp, 0);
    const kernfaecherDisplay = document.getElementById("selected-kernfaecher-kp");
    if (kernfaecherDisplay) {
      kernfaecherDisplay.textContent = kernfaecherKp;
      kernfaecherDisplay.style.color = kernfaecherKp >= 18 ? "#28a745" : "#dc3545";
    }

    // Update Wahlfächer KP
    const wahlfaecherKp = Object.values(this.selectedWahlfaecher).flat().reduce((sum, m) => sum + m.kp, 0);
    const wahlfaecherDisplay = document.getElementById("selected-wahlfaecher-kp");
    if (wahlfaecherDisplay) {
      wahlfaecherDisplay.textContent = wahlfaecherKp;
      wahlfaecherDisplay.style.color = wahlfaecherKp > 0 ? "#28a745" : "#dc3545";
    }

    // Update Weitere Wahl-Grundlagenfächer KP
    const weitereWahlGrundlagenKp = Object.values(this.selectedWeitereWahlGrundlagen).flat().reduce((sum, m) => sum + m.kp, 0);
    const weitereWahlGrundlagenDisplay = document.getElementById("selected-weitere-wahl-grundlagen-kp");
    if (weitereWahlGrundlagenDisplay) {
      weitereWahlGrundlagenDisplay.textContent = weitereWahlGrundlagenKp;
      weitereWahlGrundlagenDisplay.style.color = weitereWahlGrundlagenKp >= 8 ? "#28a745" : "#dc3545";
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
      "Wissenschaftliche Arbeit"
    ];

    reihenfolge.forEach((kategorie) => {
      const kategorieModules = thirdYearModules.filter(m => m.kategorie === kategorie);
      if (kategorieModules.length === 0) return;

      const kategorieConfig = this.config.kategorien.find(k => k.name === kategorie);

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

  /* ==== MODULE SELECTION ==== */
  toggleModulFromTooltip(modulName, category) {
    const moduleMap = {
      praktika: Object.values(this.moduleData.praktikaSchwerpunkte).flat(),
      kernfaecher: Object.values(this.moduleData.kernfaecherSchwerpunkte).flat(),
      wahlfaecher: Object.values(this.moduleData.wahlfaecherBereiche).flat(),
      "weitere-wahl-grundlagen": this.moduleData.weitereWahlGrundlagen
    };

    const modul = moduleMap[category]?.find((m) => m.name === modulName);
    if (modul) {
      this.toggleModulSelection(modul, category);
      
      // Tooltip neu laden
      setTimeout(() => {
        const event = { clientX: 100, clientY: 100 };
        if (category === "praktika") this.showPraktikaTooltip(event);
        else if (category === "kernfaecher") this.showKernfaecherTooltip(event);
        else if (category === "wahlfaecher") this.showWahlfaecherTooltip(event);
        else if (category === "weitere-wahl-grundlagen") this.showWeitereWahlGrundlagenTooltip(event);
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
      "weitere-wahl-grundlagen": this.selectedWeitereWahlGrundlagen
    };

    if (!selectedMap[category]["general"]) {
      selectedMap[category]["general"] = [];
    }

    selectedMap[category]["general"].push({ ...modul });
    this.saveSelectedModules(category);
    this.updateKPDisplay();
    this.showMessage(`✅ "${modul.name}" hinzugefügt`, "success");
  }

  removeModulSelection(modul, category) {
    const selectedMap = {
      praktika: this.selectedPraktika,
      kernfaecher: this.selectedKernfaecher,
      wahlfaecher: this.selectedWahlfaecher,
      "weitere-wahl-grundlagen": this.selectedWeitereWahlGrundlagen
    };

    if (selectedMap[category]["general"]) {
      selectedMap[category]["general"] = selectedMap[category]["general"].filter(m => m.name !== modul.name);
    }
    
    this.saveSelectedModules(category);
    this.updateKPDisplay();
    this.showMessage(`🗑️ "${modul.name}" entfernt`, "info");
  }

  isModulSelected(modulName, category) {
    const selectedMap = {
      praktika: this.selectedPraktika,
      kernfaecher: this.selectedKernfaecher,
      wahlfaecher: this.selectedWahlfaecher,
      "weitere-wahl-grundlagen": this.selectedWeitereWahlGrundlagen
    };

    return Object.values(selectedMap[category]).some(moduleList =>
      moduleList.some(m => m.name === modulName)
    );
  }

  /* ==== TOOLTIPS ==== */
  showPraktikaTooltip(event) {
    const content = window.ITETTooltips.createPraktikaTooltipContent(
      this.moduleData, 
      (name, cat) => this.isModulSelected(name, cat)
    );
    this.showCustomTooltip(content, event);
  }

  showKernfaecherTooltip(event) {
    const content = window.ITETTooltips.createKernfaecherTooltipContent(
      this.moduleData,
      (name, cat) => this.isModulSelected(name, cat)
    );
    this.showCustomTooltip(content, event);
  }

  showWahlfaecherTooltip(event) {
    const content = window.ITETTooltips.createWahlfaecherTooltipContent(
      this.moduleData,
      (name, cat) => this.isModulSelected(name, cat)
    );
    this.showCustomTooltip(content, event);
  }

  showWeitereWahlGrundlagenTooltip(event) {
    const content = window.ITETTooltips.createWeitereWahlGrundlagenTooltipContent(
      this.moduleData,
      (name, cat) => this.isModulSelected(name, cat)
    );
    this.showCustomTooltip(content, event);
  }

  /* ==== LEGEND TOOLTIP EVENTS ==== */
  addLegendTooltipEvents(div, kategorie) {
    const hasTooltip = kategorie.hasTooltip || false;
    if (!hasTooltip) return;
    
    div.style.cursor = "pointer";
    div.style.position = "relative";

    // Icon hinzufügen
    const icon = document.createElement("span");
    icon.innerHTML = " 🎯";
    icon.style.position = "absolute";
    icon.style.top = "5px";
    icon.style.right = "5px";
    icon.style.fontSize = "12px";
    icon.style.opacity = "0.7";
    div.appendChild(icon);

    // Event-Handler basierend auf Kategorie-Klasse
    const kategorieKlasse = kategorie.klasse;
    const eventMap = {
      "wahl-praktika-projekte": "Praktika",
      "kern": "Kernfaecher",
      "wahl": "Wahlfaecher",
      "weitere-wahl-grundlagen": "WeitereWahlGrundlagen"
    };

    const tooltipType = eventMap[kategorieKlasse];
    if (!tooltipType) return;

    div.addEventListener("mouseenter", (event) => {
      this[`show${tooltipType}Tooltip`](event);
    });

    div.addEventListener("mouseleave", () => {
      if (!this[`is${tooltipType}TooltipLocked`]) {
        this.hideTooltip();
      }
    });

    div.addEventListener("click", (event) => {
      this[`is${tooltipType}TooltipLocked`] = !this[`is${tooltipType}TooltipLocked`];
      if (this[`is${tooltipType}TooltipLocked`]) {
        this[`show${tooltipType}Tooltip`](event);
      } else {
        this.hideTooltip();
      }
    });
  }

  /* ==== UTILITY METHODS ==== */
  loadSelectedModules(category) {
    try {
      const storageKey = `itet-selected-${category}`;
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      console.error(`Fehler beim Laden von ${category}:`, error);
      return {};
    }
  }

  saveSelectedModules(category) {
    try {
      const storageKey = `itet-selected-${category}`;
      const selectedMap = {
        praktika: this.selectedPraktika,
        kernfaecher: this.selectedKernfaecher,
        wahlfaecher: this.selectedWahlfaecher,
        "weitere-wahl-grundlagen": this.selectedWeitereWahlGrundlagen
      };
      localStorage.setItem(storageKey, JSON.stringify(selectedMap[category]));
    } catch (error) {
      console.error(`Fehler beim Speichern von ${category}:`, error);
    }
  }

  showMessage(message, type = "info") {
    window.ITETUtils.showMessage(message, type);
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

    this.updateKPDisplay();
    this.showMessage("✅ Studienplan aktualisiert!", "success");
  }

  integrateSelectedPraktikaIntoConfig() {
    // Entferne ALLE dynamischen Module
    this.config.daten = this.config.daten.filter(m => !m.isDynamic && !m.isPlaceholder);

    // Entferne Module aus Jahr 3 die ersetzt werden
    this.config.daten = this.config.daten.filter(m => {
      if (m.jahr <= 2) return true;
      if (m.kategorie === "Kernfächer nach Schwerpunkt" || m.kategorie === "Wahlfächer") {
        return false;
      }
      return true;
    });

    // Füge alle ausgewählten Module hinzu
    const allSelectedModules = [
      ...Object.values(this.selectedPraktika).flat(),
      ...Object.values(this.selectedKernfaecher).flat(),
      ...Object.values(this.selectedWahlfaecher).flat(),
      ...Object.values(this.selectedWeitereWahlGrundlagen).flat()
    ];

    allSelectedModules.forEach((modul) => {
      const moduleCopy = {
        ...modul,
        jahr: 3,
        semester: 0,
        isDynamic: true
      };
      this.config.daten.push(moduleCopy);
    });
  }

  resetPraktika() {
    if (confirm("🔄 Wirklich ALLE ausgewählten Module zurücksetzen?")) {
      this.selectedPraktika = {};
      this.selectedKernfaecher = {};
      this.selectedWahlfaecher = {};
      this.selectedWeitereWahlGrundlagen = {};
      
      this.saveSelectedModules('praktika');
      this.saveSelectedModules('kernfaecher');
      this.saveSelectedModules('wahlfaecher');
      this.saveSelectedModules('weitere-wahl-grundlagen');
      
      this.refreshStudienplan();
      this.showMessage("✅ Alle Module zurückgesetzt!", "success");
    }
  }

  exportPraktika() {
    const selectedModules = {
      praktika: this.selectedPraktika,
      kernfaecher: this.selectedKernfaecher,
      wahlfaecher: this.selectedWahlfaecher,
      weitereWahlGrundlagen: this.selectedWeitereWahlGrundlagen
    };
    
    window.ITETUtils.exportAllModules(selectedModules);
  }
};

console.log('✅ ITET Extensions Hauptklasse geladen');