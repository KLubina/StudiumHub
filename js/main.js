(function () {
  document.addEventListener("DOMContentLoaded", async function () {
    const uniFiles = [
      "universitaet-basel.json",
      "universitaet-luzern.json",
      "universitaet-st-gallen.json",
      "universitaet-bern.json",
      "universitaet-freiburg.json",
      "eth-zuerich.json",
      "universitaet-zuerich.json",
    ];

    const fhFiles = [
      "berner-fachhochschule.json",
      "fh-graubuenden.json",
      "fhnw.json",
      "ostschweizer-fachhochschule.json",
      "zhaw.json",
      "zhdk.json",
      "hslu.json",
      "ffhs.json",
    ];

    // Helper-Funktion um Fehler pro Datei sauber abzufangen
    async function fetchJson(path) {
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(
          `Datei nicht gefunden oder Server-Fehler (Status ${response.status}): ${path}`,
        );
      }
      return response.json();
    }

    try {
      // Parallel alle Uni und FH Daten laden
      const uniPromises = uniFiles.map((file) =>
        fetchJson(`all-swiss-studies-listed/uni/${file}`),
      );
      const fhPromises = fhFiles.map((file) =>
        fetchJson(`all-swiss-studies-listed/fh/${file}`),
      );

      const universitaeten = await Promise.all(uniPromises);
      const fachhochschulen = await Promise.all(fhPromises);

      // 1. Daten im State initialisieren
      State.initializeData(universitaeten, fachhochschulen);

      // 2. UI-Filterelemente (Dropdowns) befüllen
      FilterUI.populateFilters();

      // 3. Initiale Filter-Werte aus dem State im DOM setzen
      const typeFilter = document.getElementById("typeFilter");
      if (typeFilter) typeFilter.value = State.getFilters().type;

      const institutionFilter = document.getElementById("institutionFilter");
      if (institutionFilter)
        institutionFilter.value = State.getFilters().institution;

      const categoryFilter = document.getElementById("categoryFilter");
      if (categoryFilter) categoryFilter.value = State.getFilters().category;

      const showMinorsCheckbox = document.getElementById("showMinors");
      if (showMinorsCheckbox)
        showMinorsCheckbox.checked = State.getShowMinors();

      // 4. Sichtbarkeit der Filter anpassen & Studiengänge rendern
      FilterUI.updateFilterVisibility();
      Rendering.renderStudiengaenge();

      // 5. EVENT LISTENERS REGISTRIEREN
      setupEventListeners();
    } catch (error) {
      console.error(
        "Kritischer Fehler beim Laden der Studiengangsdaten:",
        error,
      );
    }
  });

  // Funktion zur Koppelung aller UI-Interaktionen mit Logik und Rendering
  function setupEventListeners() {
    // Typ-Filter (Alle / Uni / FH)
    document
      .getElementById("typeFilter")
      ?.addEventListener("change", function (e) {
        State.setFilter("type", e.target.value);
        Rendering.renderStudiengaenge();
      });

    // Institutionen-Filter
    document
      .getElementById("institutionFilter")
      ?.addEventListener("change", function (e) {
        State.setFilter("institution", e.target.value);
        Rendering.renderStudiengaenge();
      });

    // Kategorien-Filter (wird nur in der Kategorie-Ansicht angezeigt)
    document
      .getElementById("categoryFilter")
      ?.addEventListener("change", function (e) {
        State.setFilter("category", e.target.value);
        Rendering.renderStudiengaenge();
      });

    // Minors/Nebenfach-Checkbox (ID im HTML ist "showMinors")
    document
      .getElementById("showMinors")
      ?.addEventListener("change", function (e) {
        State.setShowMinors(e.target.checked);
        Rendering.renderStudiengaenge();
      });

    // ==========================================
    // ANSICHTS-UMSCHALTER (EXAKT FÜR DEIN HTML)
    // ==========================================

    // 1. Nach Hochschule wechseln
    document
      .getElementById("viewByInstitution")
      ?.addEventListener("click", function (e) {
        setActiveButton(e.target);
        toggleSections(false); // Versteckt die statischen Visualisierungen

        State.setView("institution");
        FilterUI.updateFilterVisibility();
        Rendering.renderStudiengaenge();
      });

    // 2. Nach Kategorie wechseln
    document
      .getElementById("viewByCategory")
      ?.addEventListener("click", function (e) {
        setActiveButton(e.target);
        toggleSections(false); // Versteckt die statischen Visualisierungen

        State.setView("category");
        FilterUI.updateFilterVisibility();
        Rendering.renderStudiengaenge();
      });

    // 3. Alle Visualisierungen (Statische Sektion aus dem HTML einblenden)
    document
      .getElementById("viewAllVisualizations")
      ?.addEventListener("click", function (e) {
        setActiveButton(e.target);
        toggleSections(true); // Blendet die Visualisierungen ein, versteckt dynamischen Content
      });
  }

  // Hilfsfunktion: Setzt die CSS-Klasse "active" auf den geklickten Navigations-Button
  function setActiveButton(activeButton) {
    document.querySelectorAll(".view-btn").forEach((btn) => {
      btn.classList.remove("active");
    });
    activeButton.classList.add("active");
  }

  // Hilfsfunktion: Schaltet zwischen dynamischem Container und statischen Visualisierungen um
  function toggleSections(showVisualizations) {
    const studyContainer = document.getElementById("studyProgramsContainer");
    const vizSection = document.getElementById("visualizationsSection");
    const filterContainer = document.querySelector(".filter-container");

    if (showVisualizations) {
      if (studyContainer) studyContainer.style.display = "none";
      if (filterContainer) filterContainer.style.display = "none"; // Filter ausblenden, da eh inaktiv
      if (vizSection) vizSection.style.display = "block";
    } else {
      if (studyContainer) studyContainer.style.display = "block";
      if (filterContainer) filterContainer.style.display = "flex"; // Filter wieder einblenden
      if (vizSection) vizSection.style.display = "none";
    }
  }
})();
