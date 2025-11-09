/* ==== ITET THIRD YEAR LAYOUT ==== */
/* Spezifisches Layout für das 3. Jahr - Kategorie-basiert */

if (window.ITETStudienplan) {
  /* ==== 3. JAHR LAYOUT - KATEGORIE-BASIERT ==== */
  window.ITETStudienplan.prototype.createYearSection = function(year) {
    if (year === 3) {
      return this.createThirdYearSection();
    }
    return StudienplanBase.prototype.createYearSection.call(this, year);
  };

  window.ITETStudienplan.prototype.createThirdYearSection = function() {
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
  };

  window.ITETStudienplan.prototype.createCategoryBasedThirdYear = function(container) {
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
  };
}
