/* ==== CSE COLOR MANAGER (KORRIGIERT) ==== */
/* Verwaltet die Modulfarben und Legenden für CSE */

class CSEColorManager {
  constructor(studienplan) {
    this.studienplan = studienplan;
    this.coloringMode = "pruefungsblock"; // 'pruefungsblock' oder 'themenbereich'
    console.log('🎨 CSEColorManager initialisiert');
  }

  setColoringMode(mode) {
    console.log(`🎨 Setze Coloring Mode auf: ${mode}`);
    this.coloringMode = mode;
    this.updateModuleColors();
    this.updateLegend();
  }

  updateModuleColors() {
    console.log("=== 🎨 UPDATE MODULE COLORS START ===");
    console.log("Coloring Mode:", this.coloringMode);
    
    // Alle Module neu färben basierend auf dem gewählten Modus
    const moduleElements = document.querySelectorAll(".modul");
    console.log("Gefundene Module Elemente:", moduleElements.length);
    
    if (moduleElements.length === 0) {
      console.warn("⚠️ Keine Module gefunden! Möglicherweise zu früh aufgerufen.");
      return;
    }
    
    // Debug: Verfügbare Module in config.daten anzeigen
    if (this.studienplan.config.daten) {
      console.log("Verfügbare Module in config.daten:", this.studienplan.config.daten.length);
      console.log("Erste 3 Module:", this.studienplan.config.daten.slice(0, 3).map(m => ({name: m.name, kategorie: m.kategorie, pruefungsblock: m.pruefungsblock})));
    } else {
      console.error("❌ config.daten ist undefined!");
      return;
    }
    
    moduleElements.forEach((modulEl, index) => {
      // Debug: Element-Struktur analysieren
      console.log(`\n--- Element ${index} ---`);
      console.log("Element HTML:", modulEl.outerHTML.substring(0, 200));
      
      // Verschiedene Methoden zum Extrahieren des Modulnamens
      let modulName = this.extractModuleName(modulEl);
      console.log(`Extrahierter Modulname: "${modulName}"`);
      
      if (!modulName) {
        console.warn(`Kein Modulname für Element ${index} gefunden`);
        return;
      }
      
      // Entsprechendes Modul in den Daten finden
      const modul = this.studienplan.config.daten.find(m => {
        // Exakter Match oder Teilstring-Match für Flexibilität
        return m.name === modulName || 
               m.name.toLowerCase().includes(modulName.toLowerCase()) ||
               modulName.toLowerCase().includes(m.name.toLowerCase());
      });
      
      if (!modul) {
        console.warn(`❌ Modul nicht gefunden für: "${modulName}"`);
        // Zeige ähnliche Module für Debug
        const similarModules = this.studienplan.config.daten.filter(m => 
          m.name.toLowerCase().includes(modulName.toLowerCase().split(' ')[0])
        );
        if (similarModules.length > 0) {
          console.log("Ähnliche Module gefunden:", similarModules.map(m => m.name));
        }
        return;
      }

      console.log(`✅ Modul gefunden:`, {
        name: modul.name,
        kategorie: modul.kategorie,
        pruefungsblock: modul.pruefungsblock,
        themenbereich: modul.themenbereich
      });

      // Alte Farben entfernen
      this.removeColorClasses(modulEl);
      modulEl.style.backgroundColor = '';
      modulEl.style.color = '';

      // Neue CSS-Klasse bestimmen und anwenden
      const cssClass = this.getModuleCssClass(modul);
      if (cssClass) {
        modulEl.classList.add(cssClass);
        console.log(`✅ CSS-Klasse angewendet: ${cssClass}`);
        
        // Im Themenbereich-Modus zusätzlich Inline-Styles als Backup
        if (this.coloringMode === "themenbereich") {
          this.applyThemenfarbInlineStyle(modulEl, cssClass);
        }
      } else {
        console.warn(`❌ Keine CSS-Klasse für "${modulName}" bestimmt`);
      }
    });
    
    console.log("=== 🎨 UPDATE MODULE COLORS END ===\n");
  }

  extractModuleName(modulEl) {
    // Methode 1: Suche nach .modul-titel
    const titleElement = modulEl.querySelector('.modul-titel');
    if (titleElement) {
      return titleElement.textContent.trim();
    }
    
    // Methode 2: Suche nach anderen möglichen Selektoren
    const altSelectors = ['.modul-name', '.title', 'h3', 'h4'];
    for (const selector of altSelectors) {
      const element = modulEl.querySelector(selector);
      if (element) {
        return element.textContent.trim();
      }
    }
    
    // Methode 3: Text-Inhalt analysieren (ohne KP-Angaben)
    let text = modulEl.textContent.trim();
    // Entferne KP-Angaben am Anfang (z.B. "7 KP")
    text = text.replace(/^[0-9]+\s*(KP|ECTS)?\s*/i, '');
    // Nimm nur die erste Zeile
    text = text.split('\n')[0].trim();
    // Entferne Ellipsen
    text = text.replace(/\.\.\.$/, '').trim();
    
    return text;
  }

  applyThemenfarbInlineStyle(element, cssClass) {
    const colorMap = {
      'physik': '#2196F3',
      'informatik': '#2600ff', 
      'mathematik': '#00a99d',
      'chemie': '#9C27B0',
      'sonstiges': '#795548'
    };
    
    if (colorMap[cssClass]) {
      element.style.backgroundColor = colorMap[cssClass];
      element.style.color = 'white';
      console.log(`🎨 Inline-Style gesetzt: ${colorMap[cssClass]} für ${cssClass}`);
    }
  }

  removeColorClasses(element) {
    // Alle bekannten Farbklassen entfernen
    const colorClasses = [
      "basis1", "basis2", "block-g1", "block-g2", "block-g3", "block-g4",
      "physik", "informatik", "mathematik", "chemie", "sonstiges",
      "wissenschaftliche-arbeit", "kern", "wahl", "vertiefung"
    ];

    colorClasses.forEach(cls => element.classList.remove(cls));
  }

  getModuleCssClass(modul) {
    console.log(`🔍 getModuleCssClass für "${modul.name}"`);
    console.log(`- Mode: ${this.coloringMode}`);
    console.log(`- Themenbereich: ${modul.themenbereich}`);
    console.log(`- Kategorie: ${modul.kategorie}`);
    console.log(`- Prüfungsblock: ${modul.pruefungsblock}`);
    
    if (this.coloringMode === "themenbereich") {
      // Themenbereich-Modus
      let result = modul.themenbereich;
      
      // Fallbacks für fehlende Themenbereiche
      if (!result) {
        if (modul.kategorie === "wissenschaftliche-arbeit") {
          result = "sonstiges";
        } else if (modul.name.toLowerCase().includes('physik') || modul.name.toLowerCase().includes('fluid')) {
          result = "physik";
        } else if (modul.name.toLowerCase().includes('informatik') || modul.name.toLowerCase().includes('programm') || modul.name.toLowerCase().includes('computer')) {
          result = "informatik";
        } else if (modul.name.toLowerCase().includes('mathematik') || modul.name.toLowerCase().includes('analysis') || modul.name.toLowerCase().includes('algebra') || modul.name.toLowerCase().includes('numerical')) {
          result = "mathematik";
        } else if (modul.name.toLowerCase().includes('chemie')) {
          result = "chemie";
        } else {
          result = "sonstiges";
        }
      }
      
      console.log(`- Themenbereich Ergebnis: ${result}`);
      return result;
      
    } else {
      // Prüfungsblock-Modus (Standard)
      if (modul.pruefungsblock && this.studienplan.config.pruefungsbloecke) {
        const block = this.studienplan.config.pruefungsbloecke.find(b => b.name === modul.pruefungsblock);
        if (block) {
          console.log(`- Prüfungsblock gefunden: ${block.cssClass}`);
          return block.cssClass;
        }
      }

      // Fallback auf Kategorie
      if (modul.kategorie && this.studienplan.config.kategorieZuKlasse) {
        const result = this.studienplan.config.kategorieZuKlasse[modul.kategorie];
        console.log(`- Kategorie Mapping: ${result}`);
        return result;
      }

      console.log(`- Fallback: ${modul.kategorie}`);
      return modul.kategorie;
    }
  }

  updateLegend() {
    console.log('🏷️ Aktualisiere Legende...');
    const legendElement = document.getElementById("legende");
    if (!legendElement) {
      console.error('❌ Legende-Element nicht gefunden');
      return;
    }
    
    legendElement.innerHTML = "";

    if (this.coloringMode === "themenbereich") {
      this.createThemenbereichLegend(legendElement);
    } else {
      // Standard Prüfungsblock-Legende
      this.studienplan.createPruefungsbloeckeLegend(legendElement);

      // Standard Kategorien
      if (this.studienplan.config.kategorien) {
        this.studienplan.config.kategorien.forEach((kategorie) => {
          this.studienplan.createLegendItem(kategorie, legendElement);
        });
      }
    }
    
    console.log('✅ Legende aktualisiert');
  }

  createThemenbereichLegend(container) {
    const themenbereiche = [
      { name: "Physik", klasse: "physik" },
      { name: "Informatik", klasse: "informatik" },
      { name: "Mathematik", klasse: "mathematik" },
      { name: "Chemie", klasse: "chemie" },
      { name: "Sonstiges", klasse: "sonstiges" },
    ];

    themenbereiche.forEach((thema) => {
      const div = document.createElement("div");
      div.classList.add("legende-item");
      div.classList.add(thema.klasse);
      div.textContent = thema.name;
      container.appendChild(div);
    });
  }
}

// Export für modularen Import
window.CSEColorManager = CSEColorManager;