/* ==== MODULARER CONFIG LOADER - ERWEITERT FÜR UNTERORDNER ==== */
/* Lädt und kombiniert alle Konfigurationsteile für einen Studiengang */

class StudiengangConfigLoader {
  constructor(studiengang) {
    this.studiengang = studiengang;
    this.config = {};
    this.loadedModules = new Set();
  }

  async loadConfig() {
    const configPath = `configs/${this.studiengang}`;

    try {
      // 1. Basis-Konfiguration laden
      await this.loadModule(`${configPath}/base-config.js`);

      // 2. Module-Daten laden
      await this.loadModule(`${configPath}/modules.js`);

      // 3. Module-Details laden (falls vorhanden)
      await this.loadOptionalModule(`${configPath}/module-details.js`);

      // 4. Erweiterungen laden (falls vorhanden)
      await this.loadOptionalModule(`${configPath}/extensions.js`);

      // 5. SPEZIELLE BEHANDLUNG FÜR ITET EXTENSIONS UNTERORDNER
      if (this.studiengang === "itet") {
        await this.loadITETExtensions();
      }

      // 6. Alles zusammenfügen
      this.mergeConfigs();

      return this.config;
    } catch (error) {
      console.error(
        `Fehler beim Laden der modularen Konfiguration für ${this.studiengang}:`,
        error
      );
      // Fallback: Versuche alte monolithische Config zu laden
      return this.loadFallbackConfig();
    }
  }

  // NEUE METHODE: Spezielle ITET Extensions Laden
  async loadITETExtensions() {
    console.log("🔧 Lade ITET Extensions Module...");

    const extensionModules = [
      "configs/itet/extensions/itet-main-class.js",
      "configs/itet/extensions/ui-helpers.js",
      "configs/itet/extensions/data-persistence.js",
      "configs/itet/extensions/kp-counter.js",
      "configs/itet/extensions/praktika-system.js",
    ];

    for (const module of extensionModules) {
      try {
        await this.loadModule(module);
        console.log(`✅ ITET Extension geladen: ${module.split("/").pop()}`);
      } catch (error) {
        console.warn(
          `⚠️ ITET Extension nicht gefunden: ${module.split("/").pop()}`
        );
      }
    }
  }

  async loadModule(url) {
    return new Promise((resolve, reject) => {
      // Prüfe ob bereits geladen
      if (this.loadedModules.has(url)) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = url;
      script.onload = () => {
        this.loadedModules.add(url);
        console.log(`✅ Geladen: ${url}`);
        resolve();
      };
      script.onerror = () => {
        console.error(`❌ Fehler beim Laden: ${url}`);
        reject(new Error(`Fehler beim Laden von ${url}`));
      };
      document.head.appendChild(script);
    });
  }

  async loadOptionalModule(url) {
    try {
      await this.loadModule(url);
    } catch (error) {
      console.log(
        `ℹ️ Optionales Modul ${url} nicht gefunden - wird übersprungen`
      );
    }
  }

  mergeConfigs() {
    console.log("🔄 Füge Konfiguration zusammen...");

    // Basis-Konfiguration als Grundlage
    if (window.StudiengangBaseConfig) {
      this.config = { ...window.StudiengangBaseConfig };
      console.log("✅ Base Config geladen");
    } else {
      console.error("❌ StudiengangBaseConfig fehlt!");
    }

    // Module-Daten hinzufügen
    if (window.StudiengangModules) {
      this.config.daten = window.StudiengangModules;
      console.log(`✅ ${window.StudiengangModules.length} Module geladen`);
    } else {
      console.error("❌ StudiengangModules fehlt!");
    }

    // Module-Details hinzufügen
    if (window.StudiengangModuleDetails) {
      this.config.modulDetails = window.StudiengangModuleDetails;
      const detailCount = Object.keys(window.StudiengangModuleDetails).length;
      console.log(`✅ ${detailCount} Modul-Details geladen`);
    }

    // Erweiterungen hinzufügen
    if (window.StudiengangExtensions) {
      Object.assign(this.config, window.StudiengangExtensions);
      console.log("✅ Extensions geladen");
    }

    // WICHTIG: Spezielle Klasse hinzufügen (falls definiert)
    if (window.StudiengangCustomClass) {
      window.StudiengangClass = window.StudiengangCustomClass;
      console.log(
        "✅ Custom Class gesetzt:",
        window.StudiengangCustomClass.name
      );
    } else if (window.ITETStudienplan) {
      // Fallback für ITET
      window.StudiengangClass = window.ITETStudienplan;
      window.StudiengangCustomClass = window.ITETStudienplan;
      console.log("✅ ITET Class als Custom Class gesetzt");
    }

    // Für Kompatibilität: Globale Variable setzen
    window.StudiengangConfig = this.config;

    console.log("✅ Konfiguration zusammengeführt:", this.config);

    // DEBUG für ITET
    if (this.studiengang === "itet") {
      console.log("🔍 ITET Debug - Verfügbare Klassen:");
      console.log("- StudienplanBase:", typeof StudienplanBase);
      console.log("- ITETStudienplan:", typeof window.ITETStudienplan);
      console.log(
        "- StudiengangCustomClass:",
        typeof window.StudiengangCustomClass
      );
      console.log("- StudiengangClass:", typeof window.StudiengangClass);
    }
  }

  async loadFallbackConfig() {
    console.log(`🔄 Lade Fallback-Konfiguration für ${this.studiengang}`);
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = `configs/${this.studiengang}-config.js`;
      script.onload = () => {
        console.log("✅ Fallback-Konfiguration geladen");
        resolve(window.StudiengangConfig);
      };
      script.onerror = () => {
        console.error("❌ Auch Fallback-Konfiguration nicht gefunden");
        reject(
          new Error(
            `Fallback-Konfiguration für ${this.studiengang} nicht gefunden`
          )
        );
      };
      document.head.appendChild(script);
    });
  }

  // Hilfsfunktion zum Aufräumen geladener Scripts
  cleanup() {
    this.loadedModules.forEach((url) => {
      const scripts = document.querySelectorAll(`script[src="${url}"]`);
      scripts.forEach((script) => script.remove());
    });
  }
}

// Globale Funktion für einfache Nutzung
window.loadStudiengangConfig = async function (studiengang) {
  console.log(`🚀 Lade Konfiguration für Studiengang: ${studiengang}`);

  const loader = new StudiengangConfigLoader(studiengang);

  try {
    const config = await loader.loadConfig();

    if (config && typeof initializeStudienplan === "function") {
      console.log("🎯 Initialisiere Studienplan...");
      initializeStudienplan(config);
    } else {
      console.error(
        "❌ Konfiguration konnte nicht geladen werden oder initializeStudienplan ist nicht verfügbar"
      );
    }

    return config;
  } catch (error) {
    console.error("💥 Fehler beim Laden der Konfiguration:", error);
    return null;
  }

  /* ==== ITET EXTENSIONS - DRAG & DROP FIX ==== */
  /* Erweitere die bestehende ITETStudienplan Klasse um die fehlende Legende-Verbindung */

  // Diese Funktion zur bestehenden ITETStudienplan Klasse hinzufügen
  Object.assign(window.ITETStudienplan.prototype, {
    /**
     * WICHTIG: Diese Methode überschreibt die Base-Methode
     * Sie wird automatisch aufgerufen wenn die Legende erstellt wird
     */
    addLegendTooltipEvents(div, kategorie) {
      console.log("🎯 Checking legend tooltip for:", kategorie);

      // Prüfe ob es die "Wahl Praktika-Projekte-Seminare" Kategorie ist
      if (
        kategorie.klasse === "wahl-praktika-projekte" ||
        (typeof kategorie === "string" && kategorie.includes("Praktika"))
      ) {
        console.log("✅ Praktika-Kategorie erkannt, füge Events hinzu");

        // Visueller Hinweis dass diese Kategorie interaktiv ist
        div.style.cursor = "pointer";
        div.style.position = "relative";

        // Füge ein kleines Icon hinzu um zu zeigen dass es clickbar ist
        const icon = document.createElement("span");
        icon.innerHTML = " 🎯";
        icon.style.position = "absolute";
        icon.style.top = "5px";
        icon.style.right = "5px";
        icon.style.fontSize = "12px";
        icon.style.opacity = "0.7";
        div.appendChild(icon);

        // Hover Event - zeigt den Tooltip
        div.addEventListener("mouseenter", (event) => {
          console.log("🖱️ Mouse enter auf Praktika-Legende");
          this.showPraktikaTooltip(event);
        });

        // Mouse leave - versteckt Tooltip (außer wenn locked)
        div.addEventListener("mouseleave", () => {
          if (!this.isPraktikaTooltipLocked) {
            this.hideTooltip();
          }
        });

        // Click Event - togglet lock state
        div.addEventListener("click", (event) => {
          console.log("🖱️ Click auf Praktika-Legende");
          this.isPraktikaTooltipLocked = !this.isPraktikaTooltipLocked;
          if (this.isPraktikaTooltipLocked) {
            this.showPraktikaTooltip(event);
          } else {
            this.hideTooltip();
          }
        });

        // Visueller Feedback für Hover
        div.addEventListener("mouseenter", () => {
          div.style.transform = "scale(1.02)";
          div.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)";
        });

        div.addEventListener("mouseleave", () => {
          if (!this.isPraktikaTooltipLocked) {
            div.style.transform = "";
            div.style.boxShadow = "";
          }
        });
      }
    },

    /**
     * Verbesserte Praktika-Tooltip Anzeige
     */
    showPraktikaTooltip(event) {
      console.log("📋 Zeige Praktika Tooltip");
      const content = this.createDraggablePraktikaTooltip();
      this.showCustomTooltip(content, event);
    },

    /**
     * Überarbeite die Tooltip-Erstellung um sicherzustellen dass Drag Events funktionieren
     */
    createDraggablePraktikaTooltip() {
      let content = `
            <div class="praktika-liste">
                <h3>🎯 Praktika, Projekte & Seminare per Drag & Drop</h3>
                <p style="font-size: 11px; color: #666; margin-bottom: 15px;">
                    💡 <strong>Ziehe Module direkt in deine Praktika-Boxen im Studienplan!</strong><br>
                    📚 Verfügbare Module: ${this.praktikaModule.length}
                </p>
                <div style="max-height: 400px; overflow-y: auto; display: grid; grid-template-columns: 1fr 1fr; gap: 4px;">
        `;

      this.praktikaModule.forEach((modul, index) => {
        const isSelected = this.isPraktikaSelected(modul.name);
        const opacity = isSelected ? "0.5" : "1";
        const cursor = isSelected ? "not-allowed" : "grab";
        const title = isSelected
          ? "Bereits ausgewählt"
          : "Ziehe mich in eine Praktika-Box";

        content += `
                <div class="draggable-praktika-modul" 
                     draggable="${!isSelected}" 
                     data-modul='${JSON.stringify(modul)}'
                     data-index="${index}"
                     style="
                        padding: 4px 6px; 
                        background: linear-gradient(135deg, #4CA64C, #5db563);
                        color: white; 
                        border-radius: 8px; 
                        font-size: 8px; 
                        cursor: ${cursor};
                        opacity: ${opacity};
                        margin: 1px;
                        border: 1px solid rgba(255,255,255,0.3);
                        transition: transform 0.2s ease;
                        user-select: none;
                        position: relative;
                     "
                     title="${title}">
                    <div style="font-weight: bold; margin-bottom: 2px;">${
                      modul.kp
                    } KP</div>
                    <div style="line-height: 1; overflow: hidden; text-overflow: ellipsis;">
                        ${
                          modul.name.length > 35
                            ? modul.name.substring(0, 32) + "..."
                            : modul.name
                        }
                    </div>
                    ${
                      !isSelected
                        ? '<div style="position: absolute; top: 2px; right: 2px; font-size: 10px;">↗</div>'
                        : ""
                    }
                </div>
            `;
      });

      content += `
                </div>
                <div style="margin-top: 10px; font-size: 10px; color: #666; text-align: center;">
                    🖱️ Ziehe Module in die Praktika-Boxen im Studienplan
                </div>
            </div>
        `;

      // WICHTIG: Nach dem Erstellen des Tooltips, füge Drag-Events hinzu
      setTimeout(() => {
        this.addDragEventsToPraktikaModules();
      }, 50);

      return content;
    },

    /**
     * Verbesserte Drag Events mit besserer Fehlerbehandlung
     */
    addDragEventsToPraktikaModules() {
      const draggableModules = document.querySelectorAll(
        '.draggable-praktika-modul[draggable="true"]'
      );

      console.log(
        `🎯 Füge Drag Events zu ${draggableModules.length} Modulen hinzu`
      );

      draggableModules.forEach((modulEl, index) => {
        console.log(`📦 Setup Module ${index}:`, modulEl.dataset.modul);

        modulEl.addEventListener("dragstart", (e) => {
          console.log("🚀 Drag Start:", e.target);
          try {
            const modulData = JSON.parse(modulEl.dataset.modul);
            e.dataTransfer.setData("text/plain", JSON.stringify(modulData));
            e.dataTransfer.effectAllowed = "copy";

            // Visueller Feedback
            modulEl.style.transform = "scale(0.8)";
            modulEl.style.opacity = "0.5";

            console.log("✅ Drag Data gesetzt:", modulData);
          } catch (error) {
            console.error("❌ Fehler beim Drag Start:", error);
          }
        });

        modulEl.addEventListener("dragend", (e) => {
          console.log("🏁 Drag End");
          modulEl.style.transform = "";
          modulEl.style.opacity = "";
        });

        modulEl.addEventListener("mouseenter", () => {
          if (modulEl.draggable) {
            modulEl.style.transform = "scale(1.05)";
            modulEl.style.boxShadow = "0 2px 8px rgba(0,0,0,0.3)";
          }
        });

        modulEl.addEventListener("mouseleave", () => {
          if (modulEl.draggable) {
            modulEl.style.transform = "";
            modulEl.style.boxShadow = "";
          }
        });

        // Debug: Click Event für Debugging
        modulEl.addEventListener("click", (e) => {
          e.preventDefault();
          const modulData = JSON.parse(modulEl.dataset.modul);
          console.log("🖱️ Modul geklickt:", modulData);
          this.showMessage(
            `📋 ${modulData.name} (${modulData.kp} KP) - zum Ziehen verfügbar`,
            "info"
          );
        });
      });
    },

    /**
     * Debug-Funktion um zu testen ob Dropzones funktionieren
     */
    debugDropZones() {
      const dropzones = document.querySelectorAll(".praktika-dropzone");
      console.log(`🎯 Gefundene Dropzones: ${dropzones.length}`);

      dropzones.forEach((zone, index) => {
        console.log(`📦 Dropzone ${index}:`, zone);
        zone.style.border = "2px dashed #4CA64C";
        zone.style.backgroundColor = "rgba(76, 166, 76, 0.1)";

        // Temporärer Text zur Identifikation
        const debugText = document.createElement("div");
        debugText.textContent = `Drop Zone ${index}`;
        debugText.style.position = "absolute";
        debugText.style.top = "0";
        debugText.style.left = "0";
        debugText.style.fontSize = "10px";
        debugText.style.color = "#4CA64C";
        debugText.style.zIndex = "1000";
        zone.appendChild(debugText);

        // Entferne Debug-Styling nach 5 Sekunden
        setTimeout(() => {
          zone.style.border = "";
          zone.style.backgroundColor = "";
          if (debugText.parentNode) {
            debugText.remove();
          }
        }, 5000);
      });
    },
  });

  // Debug-Funktion global verfügbar machen
  window.debugITETPraktika = function () {
    if (window.currentStudienplan && window.currentStudienplan.debugDropZones) {
      window.currentStudienplan.debugDropZones();
      console.log(
        "🔍 Debug-Modus aktiviert - Dropzones sind 5 Sekunden lang sichtbar"
      );
    } else {
      console.log("❌ Kein ITET Studienplan gefunden");
    }
  };

  console.log(
    "✅ ITET Drag & Drop Fix geladen - Teste mit debugITETPraktika() in der Konsole"
  );
};
