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

    this.initializeNewModuleCategories();

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

  initializeNewModuleCategories() {
    // Prüfe ob die separate Datei geladen wurde
    if (window.ITETModuleData) {
      this.kernfaecherSchwerpunkte = window.ITETModuleData.kernfaecherSchwerpunkte;
      this.wahlfaecherBereiche = window.ITETModuleData.wahlfaecherBereiche;
      this.weitereWahlGrundlagen = window.ITETModuleData.weitereWahlGrundlagen;
      this.praktikaSchwerpunkte = window.ITETModuleData.praktikaSchwerpunkte;
    } else {
      // Fallback: Behalte die bestehenden Daten in der Hauptdatei
      console.warn('ITETModuleData nicht geladen, verwende Fallback-Daten');
    }
  }

  addPraktikaControls() {
    // Controls hinzufügen - NUR wenn sie nicht bereits existieren
    if (!document.getElementById("show-praktika-list")) {
      window.ITETUtils?.addPraktikaControls();
    }
    
    // Event Listeners - mit Null-Checks
    const praktikaBtn = document.getElementById("show-praktika-list");
    if (praktikaBtn && !praktikaBtn.onclick) {
      praktikaBtn.addEventListener("click", (e) => {
        this.showPraktikaTooltip(e);
      });
    }

    const kernfaecherBtn = document.getElementById("show-kernfaecher-list");
    if (kernfaecherBtn && !kernfaecherBtn.onclick) {
      kernfaecherBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.showKernfaecherTooltip(e);
      });
    }

    const wahlfaecherBtn = document.getElementById("show-wahlfaecher-list");
    if (wahlfaecherBtn && !wahlfaecherBtn.onclick) {
      wahlfaecherBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.showWahlfaecherTooltip(e);
      });
    }

    const weitereWahlBtn = document.getElementById("show-weitere-wahl-grundlagen-list");
    if (weitereWahlBtn && !weitereWahlBtn.onclick) {
      weitereWahlBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.showWeitereWahlGrundlagenTooltip(e);
      });
    }

    const saveBtn = document.getElementById("save-praktika");
    if (saveBtn && !saveBtn.onclick) {
      saveBtn.addEventListener("click", () => {
        this.exportPraktika();
      });
    }

    const refreshBtn = document.getElementById("refresh-studienplan");
    if (refreshBtn && !refreshBtn.onclick) {
      refreshBtn.addEventListener("click", () => {
        this.refreshStudienplan();
      });
    }

    const resetBtn = document.getElementById("reset-praktika");
    if (resetBtn && !resetBtn.onclick) {
      resetBtn.addEventListener("click", () => {
        this.resetPraktika();
      });
    }
  }

  /* ==== KP-COUNTER ==== */
  addKPCounter() {
    if (document.getElementById("kp-counter")) return; // Bereits vorhanden
    
    const legendContainer = document.querySelector(".farben-legende");
    if (legendContainer && this.kpCounter?.createKPCounter) {
      const kpCounterElement = this.kpCounter.createKPCounter();
      legendContainer.insertBefore(kpCounterElement, legendContainer.firstChild);
    }
  }

  updateKPDisplay() {
    if (this.kpCounter?.updateKPDisplay) {
      this.kpCounter.updateKPDisplay(this.config);
    }
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
    if (!this.moduleData) return;

    const moduleMap = {
      praktika: Object.values(this.moduleData.praktikaSchwerpunkte || {}).flat(),
      kernfaecher: Object.values(this.moduleData.kernfaecherSchwerpunkte || {}).flat(),
      wahlfaecher: Object.values(this.moduleData.wahlfaecherBereiche || {}).flat(),
      "weitere-wahl-grundlagen": this.moduleData.weitereWahlGrundlagen || []
    };

    const modul = moduleMap[category]?.find((m) => m.name === modulName);
    if (modul) {
      this.toggleModulSelection(modul, category);
      
      // Tooltip neu laden nach kurzer Verzögerung
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
    
    if (window.ITETUtils?.exportAllModules) {
      window.ITETUtils.exportAllModules(selectedModules);
    } else {
      console.log('Export-Funktionalität nicht verfügbar');
    }
  }
};

console.log('✅ ITET Extensions Hauptklasse geladen');