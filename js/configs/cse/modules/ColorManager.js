/* ==== CSE COLOR MANAGER ==== */
/* Verwaltet die Modulfarben und Legenden für CSE */

class CSEColorManager {
  constructor(studienplan) {
    this.studienplan = studienplan;
    this.coloringMode = "pruefungsblock"; // 'pruefungsblock' oder 'themenbereich'
  }

  setColoringMode(mode) {
    this.coloringMode = mode;
    this.updateModuleColors();
    this.updateLegend();
  }

  updateModuleColors() {
    console.log("=== UPDATE MODULE COLORS ===");
    console.log("Coloring Mode:", this.coloringMode);
    
    // Alle Module neu färben basierend auf dem gewählten Modus
    const moduleElements = document.querySelectorAll(".modul");
    console.log("Gefundene Module Elemente:", moduleElements.length);
    
    moduleElements.forEach((modulEl, index) => {
      // Verschiedene Methoden zum Extrahieren des Modulnamens
      let modulName = "";
      
      // Methode 1: Suche nach dem aktuellen Titel-Element (StudienplanBase verwendet .modul-titel)
      const modulNameElement = modulEl.querySelector('.modul-titel') || modulEl.querySelector('.modul-name');
      if (modulNameElement) {
        modulName = modulNameElement.textContent.trim();
      } else {
        // Methode 2: Verwende den gesamten Text des Elements als Fallback
        modulName = modulEl.textContent.trim();
        // Entferne KP-Angaben (z.B. "7 KP") und mögliche Zeilenumbrüche oder zusätzliche Symbole
        modulName = modulName.replace(/^[0-9]+\s*(KP|ECTS)?\s*/i, '').split('\n')[0].trim();
        // Entferne Ellipsen, falls Titel gekürzt wurde
        modulName = modulName.replace(/\.\.\.$/, '').trim();
      }
      
      console.log(`Element ${index}: "${modulName}"`);
      
      // Entsprechendes Modul in den Daten finden
      const modul = this.studienplan.config.daten.find(m => m.name === modulName);
      
      if (!modul) {
        console.warn(`Modul nicht gefunden: "${modulName}"`);
        console.log("Verfügbare Module:", this.studienplan.config.daten.map(m => m.name));
        return;
      }

      console.log(`Gefundenes Modul:`, modul);

      // Alte CSS-Klassen entfernen
      this.removeColorClasses(modulEl);
      
      // WICHTIG: Inline-Styles auch entfernen!
      modulEl.style.backgroundColor = '';
      modulEl.style.color = '';

      // Neue CSS-Klasse hinzufügen
      const cssClass = this.getModuleCssClass(modul);
      if (cssClass) {
        modulEl.classList.add(cssClass);
        console.log(`✓ Angewendete Klasse für "${modulName}": ${cssClass}`);
        
        // Nur im Themenbereich-Modus Inline-Styles als Backup setzen
        if (this.coloringMode === "themenbereich") {
          const colorMap = {
            'physik': '#2196F3',
            'informatik': '#2600ff', 
            'mathematik': '#00a99d',
            'chemie': '#9C27B0',
            'sonstiges': '#795548'
          };
          
          if (colorMap[cssClass]) {
            modulEl.style.backgroundColor = colorMap[cssClass];
            modulEl.style.color = 'white';
            console.log(`✓ Inline style gesetzt: ${colorMap[cssClass]}`);
          }
        }
      } else {
        console.warn(`Keine CSS-Klasse für Modul: "${modulName}", Themenbereich: ${modul.themenbereich}, Kategorie: ${modul.kategorie}`);
      }
    });
    
    console.log("=== ENDE UPDATE MODULE COLORS ===");
  }

  removeColorClasses(element) {
    // Alle Farbklassen entfernen
    const colorClasses = [
      "basis1",
      "basis2", 
      "block-g1",
      "block-g2",
      "block-g3",
      "block-g4",
      "physik",
      "informatik",
      "mathematik",
      "chemie",
      "sonstiges",
      "wissenschaftliche-arbeit",
      "kern",
      "wahl",
      "vertiefung",
    ];

    colorClasses.forEach((cls) => element.classList.remove(cls));
  }

  getModuleCssClass(modul) {
    console.log(`getModuleCssClass für "${modul.name}"`);
    console.log(`- Coloring Mode: ${this.coloringMode}`);
    console.log(`- Themenbereich: ${modul.themenbereich}`);
    console.log(`- Kategorie: ${modul.kategorie}`);
    console.log(`- Prüfungsblock: ${modul.pruefungsblock}`);
    
    if (this.coloringMode === "themenbereich") {
      // Zuerst themenbereich prüfen, dann kategorie als Fallback
      let result = modul.themenbereich || modul.kategorie;
      
      // Spezielle Zuordnungen für Kategorien zu Themenbereichen
      if (!result || result === "wissenschaftliche-arbeit") {
        result = "sonstiges";
      }
      
      console.log(`- Ergebnis: ${result}`);
      return result;
    } else {
      // Standard Prüfungsblock-Logik
      if (modul.pruefungsblock && this.studienplan.config.pruefungsbloecke) {
        const block = this.studienplan.config.pruefungsbloecke.find(
          (b) => b.name === modul.pruefungsblock
        );
        const result = block ? block.cssClass : null;
        console.log(`- Prüfungsblock Ergebnis: ${result}`);
        return result;
      }

      if (modul.kategorie && this.studienplan.config.kategorieZuKlasse) {
        const result = this.studienplan.config.kategorieZuKlasse[modul.kategorie];
        console.log(`- Kategorie Ergebnis: ${result}`);
        return result;
      }

      console.log(`- Fallback Ergebnis: ${modul.kategorie}`);
      return modul.kategorie;
    }
  }

  updateLegend() {
    const legendElement = document.getElementById("legende");
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
