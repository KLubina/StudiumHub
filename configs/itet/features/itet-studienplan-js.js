// itet-studienplan.js - Hauptklasse die alle Module zusammenführt

window.ITETStudienplan = class ITETStudienplan extends StudienplanBase {
  constructor(config) {
    super(config);

    // Properties
    this.isPraktikaTooltipLocked = false;
    this.isKernfaecherTooltipLocked = false;
    this.isWahlfaecherTooltipLocked = false;
    this.updateTimeout = null;

    // Module-Daten laden (von window Objekten)
    this.initializeModuleData();

    // Gespeicherte Auswahl laden
    this.selectedPraktika = this.loadSelectedPraktika();
    this.selectedKernfaecher = this.loadSelectedModules("kernfaecher");
    this.selectedWahlfaecher = this.loadSelectedModules("wahlfaecher");

    // Manager initialisieren (verwende window Klassen mit Fallback)
    this.kpCounter = window.ITETKPCounter ? new window.ITETKPCounter(this) : null;
    this.moduleSelector = window.ITETModuleSelector ? new window.ITETModuleSelector(this) : null;
    this.layoutManager = window.ITETLayoutManager ? new window.ITETLayoutManager(this) : null;
    this.tooltipManager = window.ITETTooltipManager ? new window.ITETTooltipManager(this) : null;

    // Utilities verfügbar machen
    this.utils = window.ITETUtilities;
  }

  // Module-Daten Initialisierung
  initializeModuleData() {
    // Verwende geladene Daten oder Fallback
    if (window.ITETModuleData) {
      Object.assign(this, window.ITETModuleData);
      console.log('✅ ITETModuleData geladen');
    } else {
      console.log('⚠️ ITETModuleData nicht gefunden, verwende Fallback');
      // Fallback-Daten direkt hier definieren
      this.praktikaModule = [
        { name: "Laboratory Course in Computer Engineering", kp: 14, kategorie: "Wahl Praktika-Projekte-Seminare" },
        { name: "Laboratory Course in Communication Technology", kp: 14, kategorie: "Wahl Praktika-Projekte-Seminare" },
        { name: "Innovation Project", kp: 8, kategorie: "Wahl Praktika-Projekte-Seminare" },
        { name: "Semester Project", kp: 8, kategorie: "Wahl Praktika-Projekte-Seminare" }
      ];
      
      this.kernfaecherSchwerpunkte = {
        "Computer und Netzwerk": [
          { name: "Eingebettete Systeme", kp: 6, kategorie: "Kernfächer nach Schwerpunkt" },
          { name: "Communication Networks", kp: 6, kategorie: "Kernfächer nach Schwerpunkt" },
          { name: "Introduction to Machine Learning", kp: 8, kategorie: "Kernfächer nach Schwerpunkt" }
        ]
      };
      
      this.wahlfaecherBereiche = {
        "Wirtschaft": [
          { name: "Managerial Economics", kp: 4, kategorie: "Wahlfächer" },
          { name: "Entrepreneurship", kp: 4, kategorie: "Wahlfächer" }
        ]
      };
    }
  }

  initialize() {
    console.log('🚀 ITET Studienplan wird initialisiert...');
    
    // Zuerst ausgewählte Module in Config integrieren
    this.integrateSelectedModulesIntoConfig();

    // Base initialize
    super.initialize();

    // ITET-spezifische UI - mit Null-Checks
    if (this.kpCounter) {
      this.kpCounter.addKPCounter();
    } else {
      console.warn('⚠️ KPCounter nicht verfügbar');
    }
    
    this.addPraktikaControls();
    this.updateKPDisplay();
    this.updatePraktikaDisplay();

    // Layout verbessern
    if (this.layoutManager) {
      this.layoutManager.improveThirdYearLayout();
    } else {
      console.warn('⚠️ LayoutManager nicht verfügbar');
    }

    console.log("✅ ITET Studienplan modularisiert initialisiert");
  }

  // Aktualisierte Methode: Alle ausgewählten Module in Config integrieren
  integrateSelectedModulesIntoConfig() {
    console.log('📦 Integriere ausgewählte Module in Config...');
    
    // Zähle Module vor Integration
    const beforeCount = this.config.daten.length;

    // Alle ausgewählten Module sammeln
    const allSelectedModules = [
      ...Object.values(this.selectedPraktika).flat(),
      ...Object.values(this.selectedKernfaecher).flat(), 
      ...Object.values(this.selectedWahlfaecher).flat()
    ];

    console.log(`Found ${allSelectedModules.length} selected modules:`, allSelectedModules);

    // Module zum dritten Jahr hinzufügen
    allSelectedModules.forEach((modul, index) => {
      const moduleCopy = {
        ...modul,
        jahr: 3, // Drittes Jahr
        semester: (index % 2) + 1, // Abwechselnd Semester 1 und 2
        isDynamic: true // Markiere als dynamisch hinzugefügtes Modul
      };
      this.config.daten.push(moduleCopy);
    });

    const afterCount = this.config.daten.length;
    console.log(`✅ Module integriert: ${beforeCount} -> ${afterCount} (${allSelectedModules.length} hinzugefügt)`);
  }

  // Integration der Module (aktualisierte Version)
  integrateSelectedModulesIntoConfig() {
    console.log('� Integriere ausgewählte Module in Config...');
    
    // Zähle Module vor Integration
    const beforeCount = this.config.daten.length;

    // Alle ausgewählten Module sammeln
    const allSelectedModules = [
      ...Object.values(this.selectedPraktika).flat(),
      ...Object.values(this.selectedKernfaecher).flat(), 
      ...Object.values(this.selectedWahlfaecher).flat()
    ];

    console.log(`Found ${allSelectedModules.length} selected modules:`, allSelectedModules);

    // Module zum dritten Jahr hinzufügen
    allSelectedModules.forEach((modul, index) => {
      const moduleCopy = {
        ...modul,
        jahr: 3, // Drittes Jahr
        semester: (index % 2) + 1, // Abwechselnd Semester 1 und 2
        isDynamic: true // Markiere als dynamisch hinzugefügtes Modul
      };
      this.config.daten.push(moduleCopy);
    });

    const afterCount = this.config.daten.length;
    console.log(`✅ Module integriert: ${beforeCount} -> ${afterCount} (${allSelectedModules.length} hinzugefügt)`);
  }

  // UI Controls
  addPraktikaControls() {
    const legendContainer = document.querySelector(".farben-legende");

    const praktikaControls = document.createElement("div");
    praktikaControls.style.cssText = `
      margin-bottom: 15px; padding: 10px; background-color: #fff8f8;
      border-radius: 5px; border: 2px solid #4CA64C;
    `;

    praktikaControls.innerHTML = `
      <div style="text-align: center; margin-bottom: 10px;">
        <h4 style="margin: 0 0 8px 0; color: #4CA64C;">🎯 ITET Modul Designer</h4>
        <div style="font-size: 12px; color: #666;">
          💡 <strong>Wähle deine Module für alle Kategorien!</strong><br>
          📚 <span style="color: #4CA64C;">Praktika:</span> <span id="selected-praktika-kp">0</span> KP |
          📚 <span style="color: #DD98DD;">Kernfächer:</span> <span id="selected-kernfaecher-kp">0</span> KP |
          📚 <span style="color: #F2B48F;">Wahlfächer:</span> <span id="selected-wahlfaecher-kp">0</span> KP
        </div>
        <div style="margin-top: 8px;">
          <button id="show-praktika-list" style="background: #4CA64C; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer; margin-right: 3px; font-size: 11px;">📋 Praktika</button>
          <button id="show-kernfaecher-list" style="background: #DD98DD; color: black; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer; margin-right: 3px; font-size: 11px;">📚 Kernfächer</button>
          <button id="show-wahlfaecher-list" style="background: #F2B48F; color: black; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer; margin-right: 3px; font-size: 11px;">🎓 Wahlfächer</button>
          <button id="save-praktika" style="background: #28a745; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer; margin-right: 3px; font-size: 11px;">💾 Speichern</button>
          <button id="refresh-studienplan" style="background: #007bff; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer; margin-right: 3px; font-size: 11px;">🔄 Neu laden</button>
          <button id="reset-praktika" style="background: #dc3545; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer; font-size: 11px;">🗑️ Reset</button>
        </div>
      </div>
    `;

    legendContainer.insertBefore(praktikaControls, document.getElementById("kp-counter").nextSibling);

    // Event Listeners
    document.getElementById("show-praktika-list").addEventListener("click", e => this.showPraktikaTooltip(e));
    document.getElementById("show-kernfaecher-list").addEventListener("click", e => this.showKernfaecherTooltip(e));
    document.getElementById("show-wahlfaecher-list").addEventListener("click", e => this.showWahlfaecherTooltip(e));
    document.getElementById("save-praktika").addEventListener("click", () => this.exportPraktika());
    document.getElementById("refresh-studienplan").addEventListener("click", () => this.refreshStudienplan());
    document.getElementById("reset-praktika").addEventListener("click", () => this.resetPraktika());
  }

  // Update Methods
  updateKPDisplay() {
    const breakdown = this.kpCounter.calculateKPBreakdown();
    
    const totalKpEl = document.getElementById("total-kp");
    if (totalKpEl) {
      totalKpEl.textContent = breakdown.total;
    }

    this.kpCounter.updateKPStatus(breakdown);
    this.kpCounter.updateKPBreakdown(breakdown);
  }

  updatePraktikaDisplay() {
    // Praktika KP
    const praktikaKp = Object.values(this.selectedPraktika).flat().reduce((sum, m) => sum + m.kp, 0);
    const praktikaDisplay = document.getElementById("selected-praktika-kp");
    if (praktikaDisplay) {
      praktikaDisplay.textContent = praktikaKp;
      praktikaDisplay.style.color = praktikaKp > 0 ? "#28a745" : "#dc3545";
    }

    // Kernfächer KP
    const kernfaecherKp = Object.values(this.selectedKernfaecher).flat().reduce((sum, m) => sum + m.kp, 0);
    const kernfaecherDisplay = document.getElementById("selected-kernfaecher-kp");
    if (kernfaecherDisplay) {
      kernfaecherDisplay.textContent = kernfaecherKp;
      kernfaecherDisplay.style.color = kernfaecherKp >= 18 ? "#28a745" : "#dc3545";
    }

    // Wahlfächer KP
    const wahlfaecherKp = Object.values(this.selectedWahlfaecher).flat().reduce((sum, m) => sum + m.kp, 0);
    const wahlfaecherDisplay = document.getElementById("selected-wahlfaecher-kp");
    if (wahlfaecherDisplay) {
      wahlfaecherDisplay.textContent = wahlfaecherKp;
      wahlfaecherDisplay.style.color = wahlfaecherKp > 0 ? "#28a745" : "#dc3545";
    }
  }

  // Tooltip Methods
  showPraktikaTooltip(event) {
    const content = this.tooltipManager.createPraktikaTooltip();
    this.showCustomTooltip(content, event);
  }

  showKernfaecherTooltip(event) {
    const content = this.tooltipManager.createKernfaecherTooltip();
    this.showCustomTooltip(content, event);
  }

  showWahlfaecherTooltip(event) {
    const content = this.tooltipManager.createWahlfaecherTooltip();
    this.showCustomTooltip(content, event);
  }

  // Delegate methods for backwards compatibility
  togglePraktikaFromTooltip(modulName) {
    const modul = this.praktikaModule.find(m => m.name === modulName);
    if (modul) {
      this.moduleSelector.togglePraktikaSelection(modul);
      setTimeout(() => {
        const event = { clientX: 100, clientY: 100 };
        this.showPraktikaTooltip(event);
      }, 100);
    }
  }

  toggleModulFromTooltip(modulName, category) {
    this.moduleSelector.toggleModulFromTooltip(modulName, category);
  }

  isModulSelected(modulName, category) {
    return this.moduleSelector.isModulSelected(modulName, category);
  }

  // Actions

  resetPraktika() {
    if (confirm("Alle ausgewählten Module zurücksetzen? Diese Aktion kann nicht rückgängig gemacht werden.")) {
      this.selectedPraktika = {};
      this.selectedKernfaecher = {};
      this.selectedWahlfaecher = {};
      
      // Storage löschen
      localStorage.removeItem("itet-selected-praktika");
      localStorage.removeItem("itet-selected-kernfaecher");
      localStorage.removeItem("itet-selected-wahlfaecher");
      
      // UI aktualisieren
      this.updatePraktikaDisplay();
      this.updateKPDisplay();
      this.refreshStudienplan();
      
      this.utils.showMessage("🗑️ Alle Module zurückgesetzt!", "success");
    }
  }

  // WICHTIGE METHODE: Studienplan mit ausgewählten Modulen neu laden
  refreshStudienplan() {
    console.log('🔄 Refreshing Studienplan...');
    
    // Entferne alle dynamisch hinzugefügten Module
    this.config.daten = this.config.daten.filter(modul => !modul.isDynamic);
    
    // Alle ausgewählten Module hinzufügen
    const allSelectedModules = [
      ...Object.values(this.selectedPraktika).flat(),
      ...Object.values(this.selectedKernfaecher).flat(),
      ...Object.values(this.selectedWahlfaecher).flat()
    ];

    console.log(`📦 Füge ${allSelectedModules.length} Module hinzu:`, allSelectedModules);

    // Module zum dritten Jahr hinzufügen (Jahr 3, verschiedene Semester)
    allSelectedModules.forEach((modul, index) => {
      const moduleCopy = {
        ...modul,
        jahr: 3, // Drittes Jahr
        semester: (index % 2) + 1, // Verteile zwischen Semester 1 und 2
        isDynamic: true // Markiere als dynamisch hinzugefügtes Modul
      };
      this.config.daten.push(moduleCopy);
    });

    // UI neu rendern
    if (this.layoutManager && this.layoutManager.rerenderStudienplan) {
      this.layoutManager.rerenderStudienplan();
    } else {
      // Fallback: Seite neu laden
      console.log('⚠️ LayoutManager nicht verfügbar, verwende Fallback');
      this.renderStudienplan();
    }

    // KP-Counter und Display aktualisieren
    this.updateKPDisplay();
    
    console.log('✅ Studienplan aktualisiert');
    this.utils.showMessage(`🔄 Studienplan aktualisiert - ${allSelectedModules.length} Module angezeigt`, "success");
  }

  exportPraktika() {
    const data = {
      praktika: this.selectedPraktika,
      kernfaecher: this.selectedKernfaecher,
      wahlfaecher: this.selectedWahlfaecher,
      generatedOn: new Date().toISOString()
    };
    
    this.utils.downloadJSON(data, "itet-module-auswahl.json");
    this.utils.showMessage("📁 Modulauswahl exportiert!", "success");
  }

  exportKPBreakdown() {
    const breakdown = this.kpCounter.calculateKPBreakdown();
    this.utils.downloadJSON(breakdown, "itet-kp-breakdown.json");
    this.utils.showMessage("📁 KP-Aufschlüsselung exportiert!", "success");
  }

  exportPraktika() {
    const exportData = {
      studiengang: "BSc ITET - ETH Zürich",
      selectedPraktika: this.selectedPraktika,
      timestamp: new Date().toISOString(),
      totalKp: Object.values(this.selectedPraktika).flat().reduce((sum, m) => sum + m.kp, 0),
      version: "2.0"
    };

    this.utils.downloadJSON(exportData, "itet-praktika.json");
    this.utils.showMessage("📁 Praktika als JSON-Datei gespeichert!", "success");
  }

  exportKPBreakdown() {
    const breakdown = this.kpCounter.calculateKPBreakdown();

    const exportData = {
      studiengang: "BSc ITET - ETH Zürich",
      timestamp: new Date().toISOString(),
      summary: {
        totalKP: breakdown.total,
        moduleCount: breakdown.moduleCount,
        dynamicKP: breakdown.dynamicKP,
        targetKP: 180,
        status: breakdown.total >= 180 ? "Erfüllt" : `${180 - breakdown.total} KP fehlen`
      },
      byCategory: breakdown.byCategory,
      byYear: breakdown.byYear,
      selectedPraktika: this.selectedPraktika,
      version: "2.0"
    };

    const filename = `itet-kp-breakdown-${new Date().toISOString().split("T")[0]}.json`;
    this.utils.downloadJSON(exportData, filename);
    this.utils.showMessage("📁 KP-Aufschlüsselung exportiert!", "success");
  }

  // Storage Methods
  saveSelectedPraktika() {
    try {
      localStorage.setItem("itet-selected-praktika", JSON.stringify(this.selectedPraktika));
    } catch (error) {
      console.error("Fehler beim Speichern:", error);
    }
  }

  loadSelectedPraktika() {
    try {
      const saved = localStorage.getItem("itet-selected-praktika");
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      console.error("Fehler beim Laden:", error);
      return {};
    }
  }

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
        wahlfaecher: this.selectedWahlfaecher
      };
      localStorage.setItem(storageKey, JSON.stringify(selectedMap[category]));
    } catch (error) {
      console.error(`Fehler beim Speichern von ${category}:`, error);
    }
  }

  // Message helper
  showMessage(message, type) {
    this.utils.showMessage(message, type);
  }

  // Override year section creation for third year
  createYearSection(year) {
    return this.layoutManager.createYearSection(year);
  }

  // Legend tooltip events
  addLegendTooltipEvents(div, kategorie) {
    if (kategorie.klasse === "wahl-praktika-projekte") {
      div.style.cursor = "pointer";
      div.style.position = "relative";

      const icon = document.createElement("span");
      icon.innerHTML = " 🎯";
      icon.style.cssText = `
        position: absolute; top: 5px; right: 5px;
        font-size: 12px; opacity: 0.7;
      `;
      div.appendChild(icon);

      div.addEventListener("mouseenter", event => this.showPraktikaTooltip(event));
      div.addEventListener("mouseleave", () => {
        if (!this.isPraktikaTooltipLocked) {
          this.hideTooltip();
        }
      });
      div.addEventListener("click", event => {
        this.isPraktikaTooltipLocked = !this.isPraktikaTooltipLocked;
        if (this.isPraktikaTooltipLocked) {
          this.showPraktikaTooltip(event);
        } else {
          this.hideTooltip();
        }
      });
    }
  }
};

// Export als window.StudiengangCustomClass für Kompatibilität
window.StudiengangCustomClass = window.ITETStudienplan;

console.log("✅ ITET Studienplan - Modularisierte Version - geladen");