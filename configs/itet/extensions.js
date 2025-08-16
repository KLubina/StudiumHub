/* ==== ITET EXTENSIONS - VERBESSERT MIT 3. JAHR LAYOUT ==== */

window.StudiengangCustomClass = class ITETStudienplan extends StudienplanBase {
  constructor(config) {
    super(config);

    // Praktika-System Properties
    this.isPraktikaTooltipLocked = false;
    this.selectedPraktika = this.loadSelectedPraktika();

    // KP-Counter Properties
    this.showDetailedBreakdown = false;
    this.updateTimeout = null;

    // *** NEUE PROPERTIES HINZUFÜGEN ***
    this.isKernfaecherTooltipLocked = false;
    this.isWahlfaecherTooltipLocked = false;
    this.isWeitereWahlGrundlagenTooltipLocked = false;
    this.selectedKernfaecher = this.loadSelectedModules("kernfaecher");
    this.selectedWahlfaecher = this.loadSelectedModules("wahlfaecher");
    this.selectedWeitereWahlGrundlagen = this.loadSelectedModules("weitere-wahl-grundlagen");

    // Neue Module-Kategorien initialisieren
    this.initializeNewModuleCategories();

    // Verfügbare Praktika, Projekte und Seminare
    this.praktikaModule = [
      {
        name: "Amateurfunk-Kurs",
        kp: 1.5,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "COMSOL Design Tool – Design of Optical Components",
        kp: 3,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "Microcontrollers for Sensors and the Internet of Things",
        kp: 4,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "FPGA in Quantum Computing with Superconducting Qubits",
        kp: 3,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "Neural Network on Low Power FPGA",
        kp: 2,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "Bluetooth Low Energy Programming for IoT Sensing System",
        kp: 3,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "Spiking Neural Network on Neuromorphic Processors",
        kp: 3,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "Electronic Circuits & Signals Exploration Laboratory",
        kp: 2,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "Assembling and Controlling a Tuning-Fork AFM",
        kp: 3,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "Technical and Economic Aspects of Renewable Energy Supply",
        kp: 3,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "Python for Engineers",
        kp: 3,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "Machine Learning for Brain-Computer Interfaces",
        kp: 3,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "Bau eines drahtlosen Infrarot-Kopfhörers",
        kp: 2,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "Bits on Air",
        kp: 2,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "Software Defined Radio",
        kp: 3,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "Quad-Rotors: Control and Estimation",
        kp: 2,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "RoboCup: Learning and Control",
        kp: 3,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "Magnetresonanz: Vom Spektrum zum Bild",
        kp: 1,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "Biosignal Acquisition and Processing for IoT Wearable Devices",
        kp: 3,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "Android Application Development (AAD)",
        kp: 4,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "iCEBreaker FPGA For IoT Sensing Systems",
        kp: 3,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "Embedded Deep Learning with Huawei Atlas 200 AI Dev Kit",
        kp: 3,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "Vision Goes Vegas",
        kp: 2,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "Magnetische Felder im Alltag",
        kp: 3,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "Accelerating Genome Analysis with FPGAs, GPUs",
        kp: 3,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "Exploration of Emerging Memory Systems",
        kp: 3,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "FPGA-based Exploration of DRAM and RowHammer",
        kp: 3,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "Genome Sequencing on Mobile Devices",
        kp: 3,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "Memory-Centric Computing",
        kp: 3,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "Controlling Biological Neuronal Networks Using Machine Learning",
        kp: 4,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "Python for Science & Machine Learning",
        kp: 3,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "Memory Design: From Architecture down to Basic Cells",
        kp: 3,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "Building a receive coil for MRI",
        kp: 1.5,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "Clean Room Technology – Fabrication and Characterization",
        kp: 3,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "Understanding and Designing Modern SSDs",
        kp: 3,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "Robotic Maze Solving with a TI-RSLK Robot",
        kp: 3,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "Embedded Systems With Drones",
        kp: 4,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "Machine Learning on Smart Phone",
        kp: 3,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "Introduction to Program Nao Robots for Robocup",
        kp: 3,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "Smart Patch Projects",
        kp: 4,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "Programming Heterogeneous Computing Systems",
        kp: 3,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "Optics and Spectroscopy Lab",
        kp: 3,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "Our Daily Exposure to Electromagnetic Radiation",
        kp: 3,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "Intelligent Architectures via Hardware/Software Cooperation",
        kp: 3,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "Wearable Ultrasound: Tools and Technologies",
        kp: 3,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "Autonomous Cars and Robots",
        kp: 4,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "Erneuerbare Energien und Netto-Null-Emissions-Ziel",
        kp: 2,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "Enabling Smart and Low Power IoT Sensor Nodes",
        kp: 4,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "Gibbs? Clifford!",
        kp: 2,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "Image-guided digital twinning of cardiac anatomy",
        kp: 2,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "Coding Algorithms for a Scavenger Hunt",
        kp: 1,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "Clinical Genomics",
        kp: 4,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "Digital Audio",
        kp: 4,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "Let's make ITET green!",
        kp: 3,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "Echoes in Action: Designing Piezoelectric Transducers",
        kp: 2,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "Radio Frequency Electromagnetic Fields",
        kp: 3,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "Capture the Flag – Introduction to Cybersecurity",
        kp: 3,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "Exploration Project",
        kp: 3,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "Mission impossible: CartPole4.0",
        kp: 2,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "Audio Electronics and Music Production Technology",
        kp: 1,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "From Software Applications to FPGA Designs",
        kp: 3,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "Practical Antenna Design, Implementation, and Measurement",
        kp: 3,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "Hands-On Deep Learning",
        kp: 2,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
      {
        name: "Applied Circuit and PCB-Design",
        kp: 2,
        kategorie: "Wahl Praktika-Projekte-Seminare",
      },
    ];
  }

  initialize() {
    // WICHTIG: Globale Referenz für Tooltip-Buttons setzen
    window.currentStudienplan = this;
    
    // WICHTIG: Zuerst die Moduldaten um ausgewählte Praktika erweitern
    this.integrateSelectedPraktikaIntoConfig();

    // Dann normales Initialize aufrufen
    super.initialize();

    // ITET-spezifische UI hinzufügen
    this.addKPCounter();
    this.addPraktikaControls();
    this.updateKPDisplay();
    this.updatePraktikaDisplay();

    // Spezielle Behandlung für 3. Jahr Layout
    this.improveThirdYearLayout();

    console.log(
      "✅ ITET Studienplan mit verbessertem 3. Jahr Layout initialisiert"
    );
  }

  /* ==== VERBESSERTES 3. JAHR LAYOUT ==== */
  improveThirdYearLayout() {
    console.log("🎨 Verbessere 3. Jahr Layout...");

    // Finde das 3. Jahr Container
    const thirdYearContainer = document.querySelector(".jahr:last-child");
    if (!thirdYearContainer) {
      console.log("⚠️ 3. Jahr Container nicht gefunden");
      return;
    }

    // Gruppiere Module nach Kategorien im 3. Jahr
    this.createCategoryBasedThirdYear(thirdYearContainer);
  }

  createCategoryBasedThirdYear(container) {
    // Alle Module des 3. Jahres finden
    const thirdYearModules = this.config.daten.filter((m) => m.jahr === 3);

    // Nach Kategorien gruppieren
    const kategorien = [...new Set(thirdYearModules.map((m) => m.kategorie))];

    // Container leeren (außer Titel)
    const title = container.querySelector(".jahr-titel");
    container.innerHTML = "";
    if (title) {
      container.appendChild(title);
    }

    // Kategorien in definierter Reihenfolge
    const reihenfolge = [
      "Kernfächer nach Schwerpunkt",
      "Wahl Praktika-Projekte-Seminare",
      "Wissenschaftliche Arbeit",
      "Wahlfächer",
      "Weitere Wahl-Grundlagenfächer",
    ];

    reihenfolge.forEach((kategorie) => {
      const kategorieModules = thirdYearModules.filter(
        (m) => m.kategorie === kategorie
      );
      if (kategorieModules.length === 0) return;

      // Finde die Kategorie-Konfiguration
      const kategorieConfig = this.config.kategorien.find(
        (k) => k.name === kategorie
      );

      // Kategorie-Titel erstellen (wie bei MTEC)
      const kategorieTitle = document.createElement("div");
      kategorieTitle.classList.add("bereich-titel");

      // Füge die Mindestanzahl an KP hinzu, wenn verfügbar
      if (kategorieConfig && kategorieConfig.minKp) {
        kategorieTitle.textContent = `${kategorie} (mind. ${kategorieConfig.minKp} KP)`;
      } else {
        kategorieTitle.textContent = kategorie;
      }

      container.appendChild(kategorieTitle);

      // Module-Container für diese Kategorie
      const moduleContainer = document.createElement("div");
      moduleContainer.classList.add("module-container");
      moduleContainer.style.display = "flex";
      moduleContainer.style.flexWrap = "wrap";
      moduleContainer.style.gap = "8px";
      moduleContainer.style.marginBottom = "20px";
      moduleContainer.style.alignItems = "flex-start";

      // Module zu diesem Container hinzufügen
      kategorieModules.forEach((modul) => {
        this.createModule(modul, moduleContainer);
      });

      container.appendChild(moduleContainer);
    });

    console.log("✅ 3. Jahr Layout verbessert - kategoriebasiert wie MTEC");
  }

  /* ==== ÜBERSCHREIBE JAHR-SECTION ERSTELLUNG FÜR 3. JAHR ==== */
  createYearSection(year) {
    if (year === 3) {
      // Spezielle Behandlung für 3. Jahr
      return this.createThirdYearSection();
    }

    // Standard Verhalten für andere Jahre
    return super.createYearSection(year);
  }

  createThirdYearSection() {
    const yearDiv = document.createElement("div");
    yearDiv.classList.add("jahr");

    const yearTitle = document.createElement("div");
    yearTitle.classList.add("jahr-titel");
    yearTitle.textContent = "3. Jahr";
    yearDiv.appendChild(yearTitle);

    // Direkt kategoriebasiertes Layout anwenden
    setTimeout(() => {
      this.createCategoryBasedThirdYear(yearDiv);
    }, 100);

    return yearDiv;
  }

  /* ==== DYNAMISCHE PRAKTIKA-INTEGRATION ==== */
  integrateSelectedPraktikaIntoConfig() {
    console.log("🔄 Integriere alle ausgewählten Module in Konfiguration...");

    // *** WICHTIG: Erst ALLE dynamischen Module entfernen ***
    this.config.daten = this.config.daten.filter(m => !m.isDynamic);

    // Finde und entferne ALLE Platzhalter
    this.config.daten = this.config.daten.filter(m => {
      if (m.isPlaceholder) {
        console.log(`✅ Platzhalter entfernt: ${m.name}`);
        return false;
      }
      return true;
    });

    // *** ENTFERNE AUCH STATISCHE MODULE DIE DURCH DYNAMISCHE ERSETZT WERDEN SOLLEN ***
    // Entferne vorhandene Kernfächer, Wahlfächer die ersetzt werden sollen
    this.config.daten = this.config.daten.filter(m => {
      // Behalte obligatorische Module aus Jahr 1 und 2
      if (m.jahr <= 2) return true;
      
      // Entferne Kernfächer und Wahlfächer aus Jahr 3 (werden durch Auswahl ersetzt)
      if (m.kategorie === "Kernfächer nach Schwerpunkt" || 
          m.kategorie === "Wahlfächer") {
        console.log(`⚠️ Entferne statisches Modul: ${m.name}`);
        return false;
      }
      
      // Behalte alle anderen Module
      return true;
    });

    let totalAdded = 0;
    
    // Praktika hinzufügen
    Object.values(this.selectedPraktika).flat().forEach((modul) => {
      const moduleCopy = {
        ...modul,
        jahr: 3,
        semester: 0,
        isDynamic: true,
      };
      this.config.daten.push(moduleCopy);
      totalAdded++;
    });

    // Kernfächer hinzufügen
    Object.values(this.selectedKernfaecher).flat().forEach((modul) => {
      const moduleCopy = {
        ...modul,
        jahr: 3,
        semester: 0,
        isDynamic: true,
      };
      this.config.daten.push(moduleCopy);
      totalAdded++;
    });

    // Wahlfächer hinzufügen
    Object.values(this.selectedWahlfaecher).flat().forEach((modul) => {
      const moduleCopy = {
        ...modul,
        jahr: 3,
        semester: 0,
        isDynamic: true,
      };
      this.config.daten.push(moduleCopy);
      totalAdded++;
    });

    // Weitere Wahl-Grundlagenfächer hinzufügen
    Object.values(this.selectedWeitereWahlGrundlagen).flat().forEach((modul) => {
      const moduleCopy = {
        ...modul,
        jahr: 3,
        semester: 0,
        isDynamic: true,
      };
      this.config.daten.push(moduleCopy);
      totalAdded++;
    });

    console.log(`✅ ${totalAdded} ausgewählte Module hinzugefügt`);
    console.log(`📊 Gesamt Module nach Integration: ${this.config.daten.length}`);
  }

  /* ==== KP-COUNTER SYSTEM ==== */
  addKPCounter() {
    const legendContainer = document.querySelector(".farben-legende");

    const kpCounterContainer = document.createElement("div");
    kpCounterContainer.id = "kp-counter";
    kpCounterContainer.style.marginBottom = "20px";
    kpCounterContainer.style.padding = "15px";
    kpCounterContainer.style.backgroundColor = "#f8f9fa";
    kpCounterContainer.style.borderRadius = "8px";
    kpCounterContainer.style.border = "2px solid #0D5B8C";
    kpCounterContainer.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";

    kpCounterContainer.innerHTML = `
            <div style="text-align: center; margin-bottom: 15px;">
                <h3 style="margin: 0 0 5px 0; color: #0D5B8C; font-size: 18px;">📊 KP-Übersicht</h3>
                <div style="font-size: 12px; color: #666;">
                    Automatische Zählung aller Module
                </div>
            </div>
            
            <div id="kp-total" style="text-align: center; margin-bottom: 15px; padding: 10px; background: linear-gradient(135deg, #0D5B8C, #00A0E3); color: white; border-radius: 5px; font-weight: bold;">
                <div style="font-size: 24px; margin-bottom: 5px;">
                    <span id="total-kp">0</span> KP
                </div>
                <div style="font-size: 12px; opacity: 0.9;">
                    von mindestens 180 KP erforderlich
                </div>
                <div id="kp-status" style="margin-top: 5px; font-size: 11px;">
                    <div id="kp-progress-bar" style="width: 100%; height: 4px; background-color: rgba(255,255,255,0.3); border-radius: 2px; margin-top: 5px;">
                        <div id="kp-progress-fill" style="height: 100%; background-color: white; border-radius: 2px; transition: width 0.5s ease; width: 0%;"></div>
                    </div>
                </div>
            </div>
            
            <div id="kp-breakdown" style="font-size: 11px; line-height: 1.4;">
                <!-- Aufschlüsselung wird hier eingefügt -->
            </div>
            
            <div style="margin-top: 12px; text-align: center;">
                <button id="refresh-kp" style="background: #28a745; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 11px; margin-right: 5px;">
                    🔄 Aktualisieren
                </button>
                <button id="export-kp" style="background: #17a2b8; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 11px; margin-right: 5px;">
                    📊 Export
                </button>
                <button id="toggle-breakdown" style="background: #6c757d; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 11px;">
                    👁️ Details
                </button>
            </div>
        `;

    legendContainer.insertBefore(
      kpCounterContainer,
      legendContainer.firstChild
    );

    // Event Listeners
    document.getElementById("refresh-kp").addEventListener("click", () => {
      this.updateKPDisplay();
      this.showMessage("✅ KP-Zählung aktualisiert!", "success");
    });

    document.getElementById("export-kp").addEventListener("click", () => {
      this.exportKPBreakdown();
    });

    document
      .getElementById("toggle-breakdown")
      .addEventListener("click", () => {
        this.toggleBreakdownDetails();
      });
  }

  updateKPDisplay() {
    const breakdown = this.calculateKPBreakdown();

    // Gesamtsumme aktualisieren
    const totalKpEl = document.getElementById("total-kp");
    if (totalKpEl) {
      totalKpEl.textContent = breakdown.total;
    }

    // Status und Progress Bar aktualisieren
    this.updateKPStatus(breakdown);

    // Aufschlüsselung aktualisieren
    this.updateKPBreakdown(breakdown);
  }

  updateKPStatus(breakdown) {
    const statusEl = document.getElementById("kp-status");
    const progressFill = document.getElementById("kp-progress-fill");
    const requiredKP = 180;
    const remaining = Math.max(0, requiredKP - breakdown.total);
    const progress = Math.min(100, (breakdown.total / requiredKP) * 100);

    if (breakdown.total >= requiredKP) {
      statusEl.innerHTML = `✅ <span style="color: #28a745;">Mindestanforderung erfüllt!</span>`;
    } else {
      statusEl.innerHTML = `⚠️ <span style="color: #ffc107;">Noch ${remaining} KP benötigt</span>`;
    }

    if (progressFill) {
      progressFill.style.width = progress + "%";
    }
  }

  calculateKPBreakdown() {
    const breakdown = {
      total: 0,
      byCategory: {},
      byYear: {},
      moduleCount: 0,
      praktikaKP: 0,
      dynamicKP: 0,
    };

    // Alle Module analysieren (inkl. dynamische)
    this.config.daten.forEach((modul) => {
      breakdown.total += modul.kp;
      breakdown.moduleCount++;

      // Markiere dynamische Module
      if (modul.isDynamic) {
        breakdown.dynamicKP += modul.kp;
      }

      const kategorie = modul.kategorie || "Unbekannt";
      if (!breakdown.byCategory[kategorie]) {
        breakdown.byCategory[kategorie] = { kp: 0, count: 0 };
      }
      breakdown.byCategory[kategorie].kp += modul.kp;
      breakdown.byCategory[kategorie].count++;

      const jahr = modul.jahr || "Unbekannt";
      if (!breakdown.byYear[jahr]) {
        breakdown.byYear[jahr] = { kp: 0, count: 0 };
      }
      breakdown.byYear[jahr].kp += modul.kp;
      breakdown.byYear[jahr].count++;
    });

    breakdown.praktikaKP = breakdown.dynamicKP;

    return breakdown;
  }

  updateKPBreakdown(breakdown) {
    const breakdownEl = document.getElementById("kp-breakdown");

    let html = `
            <div style="border-bottom: 1px solid #ddd; padding-bottom: 8px; margin-bottom: 8px;">
                <strong>📋 Zusammenfassung:</strong><br>
                <span style="color: #0D5B8C;">▶ ${
                  breakdown.moduleCount
                } Module insgesamt</span><br>
                <span style="color: #00A0E3;">▶ ${
                  breakdown.total
                } KP Gesamtsumme</span>
                ${
                  breakdown.dynamicKP > 0
                    ? `<br><span style="color: #4CA64C;">▶ ${breakdown.dynamicKP} KP aus gewählten Praktika</span>`
                    : ""
                }
            </div>
        `;

    if (!this.showDetailedBreakdown) {
      const topCategories = Object.entries(breakdown.byCategory)
        .sort(([, a], [, b]) => b.kp - a.kp)
        .slice(0, 3);

      html += `<div style="margin-bottom: 10px;"><strong>📚 Top Kategorien:</strong>`;

      topCategories.forEach(([kategorie, data]) => {
        const color = this.getCategoryColor(kategorie);
        const percentage = ((data.kp / breakdown.total) * 100).toFixed(1);

        html += `
                    <div style="margin: 3px 0; padding: 2px 4px; border-left: 3px solid ${color}; background-color: rgba(13, 91, 140, 0.05);">
                        <span style="font-weight: 500;">${kategorie}:</span> 
                        <span style="color: ${color}; font-weight: bold;">${data.kp} KP</span> 
                        <span style="color: #666; font-size: 10px;">(${percentage}%)</span>
                    </div>
                `;
      });

      html += `</div>`;
    }

    breakdownEl.innerHTML = html;
  }

  toggleBreakdownDetails() {
    this.showDetailedBreakdown = !this.showDetailedBreakdown;
    const btn = document.getElementById("toggle-breakdown");

    if (this.showDetailedBreakdown) {
      btn.textContent = "👁️ Weniger";
      btn.style.backgroundColor = "#28a745";
    } else {
      btn.textContent = "👁️ Details";
      btn.style.backgroundColor = "#6c757d";
    }

    this.updateKPDisplay();
  }

  getCategoryColor(kategorie) {
    const colorMap = {
      "Obligatorische Fächer": "#0D5B8C",
      "Obligatorische Praktikum": "#00A0E3",
      "Wahl Praktika-Projekte-Seminare": "#4CA64C",
      "Kernfächer nach Schwerpunkt": "#DD98DD",
      Wahlfächer: "#F2B48F",
      "Wissenschaftliche Arbeit": "#888888",
      "Weitere Wahl-Grundlagenfächer": "#FFD700",
    };

    return colorMap[kategorie] || "#666666";
  }

  exportKPBreakdown() {
    const breakdown = this.calculateKPBreakdown();

    const exportData = {
      studiengang: "BSc ITET - ETH Zürich",
      timestamp: new Date().toISOString(),
      summary: {
        totalKP: breakdown.total,
        moduleCount: breakdown.moduleCount,
        dynamicKP: breakdown.dynamicKP,
        targetKP: 180,
        status:
          breakdown.total >= 180
            ? "Erfüllt"
            : `${180 - breakdown.total} KP fehlen`,
      },
      byCategory: breakdown.byCategory,
      byYear: breakdown.byYear,
      selectedPraktika: this.selectedPraktika,
      version: "2.0",
    };

    const filename = `itet-kp-breakdown-${
      new Date().toISOString().split("T")[0]
    }.json`;
    this.downloadJSON(exportData, filename);
    this.showMessage("📁 KP-Aufschlüsselung exportiert!", "success");
  }

  /* ==== PRAKTIKA SYSTEM ==== */
  addPraktikaControls() {
    const legendContainer = document.querySelector(".farben-legende");

    const praktikaControls = document.createElement("div");
    praktikaControls.style.marginBottom = "15px";
    praktikaControls.style.padding = "10px";
    praktikaControls.style.backgroundColor = "#fff8f8";
    praktikaControls.style.borderRadius = "5px";
    praktikaControls.style.border = "2px solid #4CA64C";

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

    legendContainer.insertBefore(
      praktikaControls,
      document.getElementById("kp-counter").nextSibling
    );

    // *** ERWEITERTE EVENT LISTENERS MIT DEBUG ***
    document
      .getElementById("show-praktika-list")
      .addEventListener("click", (e) => {
        console.log('🎯 Praktika Button geklickt');
        this.showPraktikaTooltip(e);
      });

    // *** NEUE EVENT LISTENERS MIT DEBUG ***
    document
      .getElementById("show-kernfaecher-list")
      .addEventListener("click", (e) => {
        e.preventDefault();
        console.log('🎯 Kernfächer Button geklickt');
        this.showKernfaecherTooltip(e);
      });

    document
      .getElementById("show-wahlfaecher-list")
      .addEventListener("click", (e) => {
        e.preventDefault();
        console.log('🎯 Wahlfächer Button geklickt');
        this.showWahlfaecherTooltip(e);
      });

    document.getElementById("save-praktika").addEventListener("click", () => {
      this.exportPraktika();
    });

    document
      .getElementById("refresh-studienplan")
      .addEventListener("click", () => {
        this.refreshStudienplan();
      });

    document.getElementById("reset-praktika").addEventListener("click", () => {
      this.resetPraktika();
    });
  }

  showKernfaecherTooltip(event) {
    const content = this.createKernfaecherTooltip();
    this.showCustomTooltip(content, event);
  }

  createKernfaecherTooltip() {
    let content = `
        <div class="kernfaecher-liste">
            <h3>📚 Kernfächer nach Schwerpunkt</h3>
            <p style="font-size: 11px; color: #666; margin-bottom: 15px;">
                💡 <strong>Klicke auf Module um sie auszuwählen!</strong><br>
                ⚠️ Du musst mindestens 18 KP aus Kernfächern wählen.
            </p>
    `;

    Object.entries(this.kernfaecherSchwerpunkte).forEach(
      ([schwerpunkt, module]) => {
        content += `
            <div style="margin-bottom: 15px;">
                <h4 style="margin: 10px 0 8px 0; padding: 3px 8px; background-color: #DD98DD; color: black; border-radius: 4px; font-size: 12px;">
                    ${schwerpunkt}
                </h4>
                <div style="display: grid; grid-template-columns: 1fr; gap: 2px;">
        `;

        module.forEach((modul) => {
          const isSelected = this.isModulSelected(modul.name, "kernfaecher");
          const bgColor = isSelected ? "#d4edda" : "#f8f9fa";
          const textColor = isSelected ? "#155724" : "#333";
          const buttonText = isSelected ? "✓ Gewählt" : "Wählen";
          const buttonColor = isSelected ? "#28a745" : "#DD98DD";

          content += `
                <div style="padding: 6px; background: ${bgColor}; color: ${textColor}; border-radius: 4px; margin: 2px; border: 1px solid #ddd; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <div style="font-weight: bold; font-size: 10px;">${
                          modul.kp
                        } KP</div>
                        <div style="font-size: 9px; line-height: 1.2;">${
                          modul.name
                        }</div>
                    </div>
                    <button onclick="window.currentStudienplan.toggleModulFromTooltip('${
                      modul.name
                    }', 'kernfaecher')" 
                            style="background: ${buttonColor}; color: ${
            isSelected ? "white" : "black"
          }; border: none; padding: 3px 6px; border-radius: 3px; cursor: pointer; font-size: 8px;">
                        ${buttonText}
                    </button>
                </div>
            `;
        });

        content += `</div></div>`;
      }
    );

    content += `</div>`;
    return content;
  }

  showWahlfaecherTooltip(event) {
    const content = this.createWahlfaecherTooltip();
    this.showCustomTooltip(content, event);
  }

  createWahlfaecherTooltip() {
    let content = `
        <div class="wahlfaecher-liste">
            <h3>🎓 Wahlfächer</h3>
            <p style="font-size: 11px; color: #666; margin-bottom: 15px;">
                💡 <strong>Klicke auf Module um sie auszuwählen!</strong><br>
                ℹ️ Freie Auswahl zusätzlicher Module.
            </p>
    `;

    Object.entries(this.wahlfaecherBereiche).forEach(([bereich, module]) => {
      content += `
            <div style="margin-bottom: 15px;">
                <h4 style="margin: 10px 0 8px 0; padding: 3px 8px; background-color: #F2B48F; color: black; border-radius: 4px; font-size: 12px;">
                    ${bereich}
                </h4>
                <div style="display: grid; grid-template-columns: 1fr; gap: 2px;">
        `;

      module.forEach((modul) => {
        const isSelected = this.isModulSelected(modul.name, "wahlfaecher");
        const bgColor = isSelected ? "#d4edda" : "#f8f9fa";
        const textColor = isSelected ? "#155724" : "#333";
        const buttonText = isSelected ? "✓ Gewählt" : "Wählen";
        const buttonColor = isSelected ? "#28a745" : "#F2B48F";

        content += `
                <div style="padding: 6px; background: ${bgColor}; color: ${textColor}; border-radius: 4px; margin: 2px; border: 1px solid #ddd; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <div style="font-weight: bold; font-size: 10px;">${modul.kp} KP</div>
                        <div style="font-size: 9px; line-height: 1.2;">${modul.name}</div>
                    </div>
                    <button onclick="window.currentStudienplan.toggleModulFromTooltip('${modul.name}', 'wahlfaecher')" 
                            style="background: ${buttonColor}; color: black; border: none; padding: 3px 6px; border-radius: 3px; cursor: pointer; font-size: 8px;">
                        ${buttonText}
                    </button>
                </div>
            `;
      });

      content += `</div></div>`;
    });

    content += `</div>`;
    return content;
  }

  showWeitereWahlGrundlagenTooltip(event) {
    console.log('🎯 Zeige Wahl-Grundlagen Tooltip');
    const content = this.createWeitereWahlGrundlagenTooltip();
    this.showCustomTooltip(content, event);
  }

  createWeitereWahlGrundlagenTooltip() {
    let content = `
        <div class="weitere-wahl-grundlagen-liste">
            <h3>⚡ Weitere Wahl-Grundlagenfächer</h3>
            <p style="font-size: 11px; color: #666; margin-bottom: 15px;">
                💡 <strong>Klicke auf Module um sie auszuwählen!</strong><br>
                ⚠️ Du musst mindestens 8 KP aus diesen Grundlagenfächern wählen.
            </p>
            <div style="display: grid; grid-template-columns: 1fr; gap: 2px;">
    `;

    this.weitereWahlGrundlagen.forEach((modul) => {
      const isSelected = this.isModulSelected(modul.name, "weitere-wahl-grundlagen");
      const bgColor = isSelected ? "#d4edda" : "#f8f9fa";
      const textColor = isSelected ? "#155724" : "#333";
      const buttonText = isSelected ? "✓ Gewählt" : "Wählen";
      const buttonColor = isSelected ? "#28a745" : "#FFD700";

      content += `
            <div style="padding: 8px; background: ${bgColor}; color: ${textColor}; border-radius: 4px; margin: 2px; border: 1px solid #ddd; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <div style="font-weight: bold; font-size: 10px;">${modul.kp} KP</div>
                    <div style="font-size: 10px; line-height: 1.3;">${modul.name}</div>
                </div>
                <button onclick="window.currentStudienplan.toggleModulFromTooltip('${modul.name}', 'weitere-wahl-grundlagen')" 
                        style="background: ${buttonColor}; color: black; border: none; padding: 4px 8px; border-radius: 3px; cursor: pointer; font-size: 9px;">
                    ${buttonText}
                </button>
            </div>
        `;
    });

    content += `
            </div>
            <div style="margin-top: 15px; padding: 10px; background-color: #fff8dc; border-radius: 5px; border: 1px solid #ffd700;">
                <strong>⚠️ Wichtig:</strong> Du musst mindestens 8 KP aus diesen Grundlagenfächern wählen!
            </div>
        </div>
    `;
    return content;
  }

  // ============================================================================
  // SCHRITT 6: Neue Utility-Methoden hinzufügen
  // ============================================================================
  // Füge diese NEUEN Methoden zu deiner Klasse hinzu:

  toggleModulFromTooltip(modulName, category) {
    const moduleMap = {
      praktika: this.praktikaModule,
      kernfaecher: Object.values(this.kernfaecherSchwerpunkte).flat(),
      wahlfaecher: Object.values(this.wahlfaecherBereiche).flat(),
      "weitere-wahl-grundlagen": this.weitereWahlGrundlagen,
    };

    const modul = moduleMap[category].find((m) => m.name === modulName);
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
      "weitere-wahl-grundlagen": this.selectedWeitereWahlGrundlagen,
    };

    if (!selectedMap[category]["general"]) {
      selectedMap[category]["general"] = [];
    }

    selectedMap[category]["general"].push({ ...modul });
    this.saveSelectedModules(category);
    this.updatePraktikaDisplay(); // Diese Methode erweitern wir im nächsten Schritt
    this.showMessage(
      `✅ "${modul.name}" zu ${category} hinzugefügt`,
      "success"
    );
  }

  removeModulSelection(modul, category) {
    const selectedMap = {
      praktika: this.selectedPraktika,
      kernfaecher: this.selectedKernfaecher,
      wahlfaecher: this.selectedWahlfaecher,
      "weitere-wahl-grundlagen": this.selectedWeitereWahlGrundlagen,
    };

    if (selectedMap[category]["general"]) {
      selectedMap[category]["general"] = selectedMap[category][
        "general"
      ].filter((m) => m.name !== modul.name);
    }
    this.saveSelectedModules(category);
    this.updatePraktikaDisplay();
    this.showMessage(`🗑️ "${modul.name}" aus ${category} entfernt`, "info");
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
        "weitere-wahl-grundlagen": this.selectedWeitereWahlGrundlagen,
      };
      localStorage.setItem(storageKey, JSON.stringify(selectedMap[category]));
    } catch (error) {
      console.error(`Fehler beim Speichern von ${category}:`, error);
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
      this.improveThirdYearLayout();
    }, 100);

    this.updateKPDisplay();
    this.updatePraktikaDisplay();

    this.showMessage("✅ Studienplan aktualisiert!", "success");
  }

  updatePraktikaDisplay() {
    // Update Praktika KP
    const praktikaKp = Object.values(this.selectedPraktika)
      .flat()
      .reduce((sum, m) => sum + m.kp, 0);
    const praktikaDisplay = document.getElementById("selected-praktika-kp");
    if (praktikaDisplay) {
      praktikaDisplay.textContent = praktikaKp;
      praktikaDisplay.style.color = praktikaKp > 0 ? "#28a745" : "#dc3545";
    }

    // *** NEUE: Update Kernfächer KP ***
    const kernfaecherKp = Object.values(this.selectedKernfaecher)
      .flat()
      .reduce((sum, m) => sum + m.kp, 0);
    const kernfaecherDisplay = document.getElementById(
      "selected-kernfaecher-kp"
    );
    if (kernfaecherDisplay) {
      kernfaecherDisplay.textContent = kernfaecherKp;
      kernfaecherDisplay.style.color =
        kernfaecherKp >= 18 ? "#28a745" : "#dc3545";
    }

    // *** NEUE: Update Wahlfächer KP ***
    const wahlfaecherKp = Object.values(this.selectedWahlfaecher)
      .flat()
      .reduce((sum, m) => sum + m.kp, 0);
    const wahlfaecherDisplay = document.getElementById(
      "selected-wahlfaecher-kp"
    );
    if (wahlfaecherDisplay) {
      wahlfaecherDisplay.textContent = wahlfaecherKp;
      wahlfaecherDisplay.style.color =
        wahlfaecherKp > 0 ? "#28a745" : "#dc3545";
    }
    
    // KP-Counter auch aktualisieren
    this.updateKPDisplay();
  }

  showPraktikaTooltip(event) {
    const content = this.createPraktikaTooltip();
    this.showCustomTooltip(content, event);
  }

  createPraktikaTooltip() {
    let content = `
            <div class="praktika-liste">
                <h3>🎯 Verfügbare Praktika, Projekte & Seminare</h3>
                <p style="font-size: 11px; color: #666; margin-bottom: 15px;">
                    💡 <strong>Klicke auf Module um sie auszuwählen!</strong><br>
                    📊 Gewählte Module werden dynamisch im Studienplan angezeigt.
                </p>
                <div style="max-height: 400px; overflow-y: auto; display: grid; grid-template-columns: 1fr; gap: 2px;">
        `;

    this.praktikaModule.forEach((modul) => {
      const isSelected = this.isPraktikaSelected(modul.name);
      const bgColor = isSelected ? "#d4edda" : "#f8f9fa";
      const textColor = isSelected ? "#155724" : "#333";
      const buttonText = isSelected ? "✓ Gewählt" : "Wählen";
      const buttonColor = isSelected ? "#28a745" : "#4CA64C";

      content += `
                <div style="padding: 8px; background: ${bgColor}; color: ${textColor}; border-radius: 4px; margin: 2px; border: 1px solid #ddd; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <div style="font-weight: bold; font-size: 10px;">${modul.kp} KP</div>
                        <div style="font-size: 9px; line-height: 1.2;">${modul.name}</div>
                    </div>
                    <button onclick="window.currentStudienplan.togglePraktikaFromTooltip('${modul.name}')" 
                            style="background: ${buttonColor}; color: white; border: none; padding: 3px 6px; border-radius: 3px; cursor: pointer; font-size: 8px;">
                        ${buttonText}
                    </button>
                </div>
            `;
    });

    content += `
                </div>
                <div style="margin-top: 15px; padding: 10px; background-color: #e7f3ff; border-radius: 5px; border: 1px solid #b3d7ff;">
                    <strong>💡 Hinweis:</strong> Nach der Auswahl klicke auf "🔄 Neu laden" um die Module im Studienplan zu sehen!
                </div>
            </div>
        `;
    return content;
  }

  togglePraktikaFromTooltip(modulName) {
    const modul = this.praktikaModule.find((m) => m.name === modulName);
    if (modul) {
      this.togglePraktikaSelection(modul);
      // Tooltip neu laden
      setTimeout(() => {
        const event = { clientX: 100, clientY: 100 };
        this.showPraktikaTooltip(event);
      }, 100);
    }
  }

  togglePraktikaSelection(modul) {
    if (this.isPraktikaSelected(modul.name)) {
      this.removePraktikaSelection(modul);
    } else {
      this.addPraktikaSelection(modul);
    }
  }

  addPraktikaSelection(modul) {
    if (!this.selectedPraktika["general"]) {
      this.selectedPraktika["general"] = [];
    }

    this.selectedPraktika["general"].push({ ...modul });
    this.saveSelectedPraktika();
    this.updatePraktikaDisplay();
    this.updateKPDisplay();
    this.showMessage(`✅ "${modul.name}" hinzugefügt`, "success");
  }

  removePraktikaSelection(modul) {
    if (this.selectedPraktika["general"]) {
      this.selectedPraktika["general"] = this.selectedPraktika[
        "general"
      ].filter((m) => m.name !== modul.name);
    }
    this.saveSelectedPraktika();
    this.updatePraktikaDisplay();
    this.updateKPDisplay();
    this.showMessage(`🗑️ "${modul.name}" entfernt`, "info");
  }

  isPraktikaSelected(modulName) {
    return Object.values(this.selectedPraktika).some((moduleList) =>
      moduleList.some((m) => m.name === modulName)
    );
  }

  resetPraktika() {
    if (confirm("🔄 Wirklich ALLE ausgewählten Module (Praktika, Kernfächer, Wahlfächer, Weitere Wahl-Grundlagenfächer) zurücksetzen?")) {
      // Alle Kategorien zurücksetzen
      this.selectedPraktika = {};
      this.selectedKernfaecher = {};
      this.selectedWahlfaecher = {};
      this.selectedWeitereWahlGrundlagen = {};
      
      // Alle speichern
      this.saveSelectedPraktika();
      this.saveSelectedModules('kernfaecher');
      this.saveSelectedModules('wahlfaecher');
      this.saveSelectedModules('weitere-wahl-grundlagen');
      
      // Anzeige aktualisieren
      this.updatePraktikaDisplay();
      this.refreshStudienplan();
      
      this.showMessage("✅ Alle Module zurückgesetzt!", "success");
    }
  }

  exportPraktika() {
    const praktikaKp = Object.values(this.selectedPraktika).flat().reduce((sum, m) => sum + m.kp, 0);
    const kernfaecherKp = Object.values(this.selectedKernfaecher).flat().reduce((sum, m) => sum + m.kp, 0);
    const wahlfaecherKp = Object.values(this.selectedWahlfaecher).flat().reduce((sum, m) => sum + m.kp, 0);
    
    const exportData = {
      studiengang: "BSc ITET - ETH Zürich",
      selectedPraktika: this.selectedPraktika,
      selectedKernfaecher: this.selectedKernfaecher,
      selectedWahlfaecher: this.selectedWahlfaecher,
      summary: {
        praktikaKp: praktikaKp,
        kernfaecherKp: kernfaecherKp,
        wahlfaecherKp: wahlfaecherKp,
        totalSelectedKp: praktikaKp + kernfaecherKp + wahlfaecherKp
      },
      timestamp: new Date().toISOString(),
      version: "2.0",
    };

    this.downloadJSON(exportData, "itet-alle-module.json");
    this.showMessage("📁 Alle ausgewählten Module als JSON-Datei gespeichert!", "success");
  }

  /* ==== LEGENDE TOOLTIP EVENTS ==== */
  addLegendTooltipEvents(div, kategorie) {
    // Prüfe ob Kategorie Tooltips aktiviert hat
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
    
    if (kategorieKlasse === "wahl-praktika-projekte") {
      // Praktika-Events
      div.addEventListener("mouseenter", (event) => {
        this.showPraktikaTooltip(event);
      });

      div.addEventListener("mouseleave", () => {
        if (!this.isPraktikaTooltipLocked) {
          this.hideTooltip();
        }
      });

      div.addEventListener("click", (event) => {
        this.isPraktikaTooltipLocked = !this.isPraktikaTooltipLocked;
        if (this.isPraktikaTooltipLocked) {
          this.showPraktikaTooltip(event);
        } else {
          this.hideTooltip();
        }
      });
      
    } else if (kategorieKlasse === "kern") {
      // Kernfächer-Events
      div.addEventListener("mouseenter", (event) => {
        this.showKernfaecherTooltip(event);
      });

      div.addEventListener("mouseleave", () => {
        if (!this.isKernfaecherTooltipLocked) {
          this.hideTooltip();
        }
      });

      div.addEventListener("click", (event) => {
        this.isKernfaecherTooltipLocked = !this.isKernfaecherTooltipLocked;
        if (this.isKernfaecherTooltipLocked) {
          this.showKernfaecherTooltip(event);
        } else {
          this.hideTooltip();
        }
      });
      
    } else if (kategorieKlasse === "wahl") {
      // Wahlfächer-Events
      div.addEventListener("mouseenter", (event) => {
        this.showWahlfaecherTooltip(event);
      });

      div.addEventListener("mouseleave", () => {
        if (!this.isWahlfaecherTooltipLocked) {
          this.hideTooltip();
        }
      });

      div.addEventListener("click", (event) => {
        this.isWahlfaecherTooltipLocked = !this.isWahlfaecherTooltipLocked;
        if (this.isWahlfaecherTooltipLocked) {
          this.showWahlfaecherTooltip(event);
        } else {
          this.hideTooltip();
        }
      });
      
    } else if (kategorieKlasse === "weitere-wahl-grundlagen") {
      // Weitere Wahl-Grundlagenfächer-Events
      div.addEventListener("mouseenter", (event) => {
        this.showWeitereWahlGrundlagenTooltip(event);
      });

      div.addEventListener("mouseleave", () => {
        if (!this.isWeitereWahlGrundlagenTooltipLocked) {
          this.hideTooltip();
        }
      });

      div.addEventListener("click", (event) => {
        this.isWeitereWahlGrundlagenTooltipLocked = !this.isWeitereWahlGrundlagenTooltipLocked;
        if (this.isWeitereWahlGrundlagenTooltipLocked) {
          this.showWeitereWahlGrundlagenTooltip(event);
        } else {
          this.hideTooltip();
        }
      });
    }
  }

  /* ==== UTILITY METHODS ==== */
  showMessage(message, type = "info") {
    const toast = document.createElement("div");
    toast.style.position = "fixed";
    toast.style.top = "20px";
    toast.style.right = "20px";
    toast.style.padding = "10px 15px";
    toast.style.borderRadius = "5px";
    toast.style.zIndex = "9999";
    toast.style.fontSize = "12px";
    toast.style.fontWeight = "bold";
    toast.textContent = message;

    const colors = {
      success: { bg: "#28a745", color: "white" },
      warning: { bg: "#ffc107", color: "black" },
      info: { bg: "#17a2b8", color: "white" },
      error: { bg: "#dc3545", color: "white" },
    };

    const style = colors[type] || colors.info;
    toast.style.backgroundColor = style.bg;
    toast.style.color = style.color;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  }

  downloadJSON(data, filename) {
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.style.display = "none";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }

  saveSelectedPraktika() {
    try {
      localStorage.setItem(
        "itet-selected-praktika",
        JSON.stringify(this.selectedPraktika)
      );
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

  // ============================================================================
  // SCHRITT 2: Neue Methode für Module-Kategorien
  // ============================================================================
  // Füge diese NEUE Methode zu deiner Klasse hinzu:

  initializeNewModuleCategories() {
    // KERNFÄCHER NACH SCHWERPUNKT
    this.kernfaecherSchwerpunkte = {
      "Biomedizinische Technik": [
        {
          name: "Introduction to Estimation and Machine Learning",
          kp: 6,
          kategorie: "Kernfächer nach Schwerpunkt",
        },
        {
          name: "Biomedical Imaging",
          kp: 6,
          kategorie: "Kernfächer nach Schwerpunkt",
        },
        {
          name: "Biomedical Engineering",
          kp: 4,
          kategorie: "Kernfächer nach Schwerpunkt",
        },
        {
          name: "Bioelectronics and Biosensors",
          kp: 6,
          kategorie: "Kernfächer nach Schwerpunkt",
        },
        {
          name: "Introduction to Neuroinformatics",
          kp: 6,
          kategorie: "Kernfächer nach Schwerpunkt",
        },
      ],
      "Computer und Netzwerke": [
        {
          name: "Communication Systems",
          kp: 6,
          kategorie: "Kernfächer nach Schwerpunkt",
        },
        {
          name: "Embedded Systems",
          kp: 6,
          kategorie: "Kernfächer nach Schwerpunkt",
        },
        {
          name: "Fundamentals of Computer Architecture",
          kp: 6,
          kategorie: "Kernfächer nach Schwerpunkt",
        },
      ],
      "Elektrische Energietechnik": [
        {
          name: "Control Systems",
          kp: 6,
          kategorie: "Kernfächer nach Schwerpunkt",
        },
        {
          name: "Leistungselektronik",
          kp: 6,
          kategorie: "Kernfächer nach Schwerpunkt",
        },
      ],
      "Elektronik und Photonik": [
        {
          name: "VLSI 1: HDL Based Design for FPGAs",
          kp: 6,
          kategorie: "Kernfächer nach Schwerpunkt",
        },
        {
          name: "Embedded Systems",
          kp: 6,
          kategorie: "Kernfächer nach Schwerpunkt",
        },
        {
          name: "Solid State Electronics and Optics",
          kp: 6,
          kategorie: "Kernfächer nach Schwerpunkt",
        },
        {
          name: "Analog Integrated Circuits",
          kp: 6,
          kategorie: "Kernfächer nach Schwerpunkt",
        },
      ],
      "Kommunikation, Regelung und Signalverarbeitung": [
        {
          name: "Discrete-Time and Statistical Signal Processing",
          kp: 6,
          kategorie: "Kernfächer nach Schwerpunkt",
        },
        {
          name: "Control Systems",
          kp: 6,
          kategorie: "Kernfächer nach Schwerpunkt",
        },
        {
          name: "Introduction to Estimation and Machine Learning",
          kp: 6,
          kategorie: "Kernfächer nach Schwerpunkt",
        },
        {
          name: "Communication Systems",
          kp: 6,
          kategorie: "Kernfächer nach Schwerpunkt",
        },
      ],
    };

    // WAHLFÄCHER
    this.wahlfaecherBereiche = {
      "Ingenieurswissenschaftliche Wahlfächer": [
        {
          name: "Electromagnetic Waves: Materials, Effects, and Antennas",
          kp: 6,
          kategorie: "Wahlfächer",
        },
        { name: "Mechatronik", kp: 6, kategorie: "Wahlfächer" },
        {
          name: "VLSI 2: From Netlist to Complete System on Chip",
          kp: 6,
          kategorie: "Wahlfächer",
        },
        {
          name: "Introduction to Machine Learning",
          kp: 8,
          kategorie: "Wahlfächer",
        },
        { name: "Computer Security", kp: 4, kategorie: "Wahlfächer" },
        {
          name: "Manufacturing of Electronic Devices",
          kp: 4,
          kategorie: "Wahlfächer",
        },
      ],
      "Wirtschafts-, Rechts- und Managementwissenschaftliche Wahlfächer": [
        { name: "Managerial Economics", kp: 4, kategorie: "Wahlfächer" },
        {
          name: "Einführung in die Mikroökonomie",
          kp: 3,
          kategorie: "Wahlfächer",
        },
        { name: "Grundzüge des Rechts", kp: 2, kategorie: "Wahlfächer" },
        { name: "Startups und Recht", kp: 2, kategorie: "Wahlfächer" },
      ],
    };

    // WEITERE WAHL-GRUNDLAGENFÄCHER
    this.weitereWahlGrundlagen = [
      {
        name: "Computational Thinking",
        kp: 4,
        kategorie: "Weitere Wahl-Grundlagenfächer",
      },
      {
        name: "High-Frequency Design Techniques",
        kp: 4,
        kategorie: "Weitere Wahl-Grundlagenfächer",
      },
      {
        name: "Introduction to Electric Power Transmission: System & Technology",
        kp: 4,
        kategorie: "Weitere Wahl-Grundlagenfächer",
      },
    ];
  }
};

console.log("✅ ITET Extensions - Mit verbessertem 3. Jahr Layout - geladen");
