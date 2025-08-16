// layout-manager.js - Layout-Verbesserungen für 3. Jahr

window.ITETLayoutManager = class ITETLayoutManager {
  constructor(parent) {
    this.parent = parent;
  }

  improveThirdYearLayout() {
    console.log("🎨 Verbessere 3. Jahr Layout...");

    const thirdYearContainer = document.querySelector(".jahr:last-child");
    if (!thirdYearContainer) {
      console.log("⚠️ 3. Jahr Container nicht gefunden");
      return;
    }

    this.createCategoryBasedThirdYear(thirdYearContainer);
  }

  createCategoryBasedThirdYear(container) {
    const thirdYearModules = this.parent.config.daten.filter(m => m.jahr === 3);
    const kategorien = [...new Set(thirdYearModules.map(m => m.kategorie))];

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
      "Weitere Wahl-Grundlagenfächer"
    ];

    reihenfolge.forEach(kategorie => {
      const kategorieModules = thirdYearModules.filter(m => m.kategorie === kategorie);
      if (kategorieModules.length === 0) return;

      const kategorieConfig = this.parent.config.kategorien.find(k => k.name === kategorie);

      // Kategorie-Titel erstellen
      const kategorieTitle = document.createElement("div");
      kategorieTitle.classList.add("bereich-titel");

      if (kategorieConfig && kategorieConfig.minKp) {
        kategorieTitle.textContent = `${kategorie} (mind. ${kategorieConfig.minKp} KP)`;
      } else {
        kategorieTitle.textContent = kategorie;
      }

      container.appendChild(kategorieTitle);

      // Module-Container für diese Kategorie
      const moduleContainer = document.createElement("div");
      moduleContainer.classList.add("module-container");
      moduleContainer.style.cssText = `
        display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; align-items: flex-start;
      `;

      kategorieModules.forEach(modul => {
        this.parent.createModule(modul, moduleContainer);
      });

      container.appendChild(moduleContainer);
    });

    console.log("✅ 3. Jahr Layout verbessert - kategoriebasiert wie MTEC");
  }

  createYearSection(year) {
    if (year === 3) {
      return this.createThirdYearSection();
    }
    // Fallback zur Parent-Methode
    return this.parent.constructor.prototype.createYearSection.call(this.parent, year);
  }

  createThirdYearSection() {
    const yearDiv = document.createElement("div");
    yearDiv.classList.add("jahr");

    const yearTitle = document.createElement("div");
    yearTitle.classList.add("jahr-titel");
    yearTitle.textContent = "3. Jahr";
    yearDiv.appendChild(yearTitle);

    setTimeout(() => {
      this.createCategoryBasedThirdYear(yearDiv);
    }, 100);

    return yearDiv;
  }
};

console.log("✅ ITET Layout Manager geladen");