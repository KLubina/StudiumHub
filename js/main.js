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

      // Daten an den umgebauten State übergeben
      State.initializeData(universitaeten, fachhochschulen);

      // UI Initialisierung
      Filters.populateFilters();
      EventHandlers.setupEventListeners();

      const typeFilter = document.getElementById("typeFilter");
      if (typeFilter) typeFilter.value = State.getFilters().type;

      const institutionFilter = document.getElementById("institutionFilter");
      if (institutionFilter)
        institutionFilter.value = State.getFilters().institution;

      Filters.updateFilterVisibility();
      Rendering.renderStudiengaenge();
    } catch (error) {
      console.error(
        "Kritischer Fehler beim Laden der Studiengangsdaten:",
        error,
      );
    }
  });
})();
