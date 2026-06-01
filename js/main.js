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
      const uniPromises = uniFiles.map((file) =>
        fetchJson(`all-swiss-studies-listed/uni/${file}`),
      );
      const fhPromises = fhFiles.map((file) =>
        fetchJson(`all-swiss-studies-listed/fh/${file}`),
      );

      const universitaeten = await Promise.all(uniPromises);
      const fachhochschulen = await Promise.all(fhPromises);

      State.initializeData(universitaeten, fachhochschulen);

      FilterUI.populateFilters();

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

      FilterUI.updateFilterVisibility();
      Rendering.renderStudiengaenge();

      setupEventListeners();
    } catch (error) {
      console.error(
        "Kritischer Fehler beim Laden der Studiengangsdaten:",
        error,
      );
    }
  });

  function setupEventListeners() {
    document
      .getElementById("typeFilter")
      ?.addEventListener("change", function (e) {
        State.setFilter("type", e.target.value);
        Rendering.renderStudiengaenge();
      });

    document
      .getElementById("institutionFilter")
      ?.addEventListener("change", function (e) {
        State.setFilter("institution", e.target.value);
        Rendering.renderStudiengaenge();
      });

    document
      .getElementById("categoryFilter")
      ?.addEventListener("change", function (e) {
        State.setFilter("category", e.target.value);
        Rendering.renderStudiengaenge();
      });

    document
      .getElementById("showMinors")
      ?.addEventListener("change", function (e) {
        State.setShowMinors(e.target.checked);
        Rendering.renderStudiengaenge();
      });

    document
      .getElementById("viewByInstitution")
      ?.addEventListener("click", function (e) {
        setActiveButton(e.target);
        toggleSections(false);

        State.setView("institution");
        FilterUI.updateFilterVisibility();
        Rendering.renderStudiengaenge();
      });

    document
      .getElementById("viewByCategory")
      ?.addEventListener("click", function (e) {
        setActiveButton(e.target);
        toggleSections(false);

        State.setView("category");
        FilterUI.updateFilterVisibility();
        Rendering.renderStudiengaenge();
      });

    document
      .getElementById("viewAllVisualizations")
      ?.addEventListener("click", function (e) {
        setActiveButton(e.target);
        toggleSections(true);
      });
  }

  function setActiveButton(activeButton) {
    document.querySelectorAll(".view-btn").forEach((btn) => {
      btn.classList.remove("active");
    });
    activeButton.classList.add("active");
  }

  function toggleSections(showVisualizations) {
    const studyContainer = document.getElementById("studyProgramsContainer");
    const vizSection = document.getElementById("visualizationsSection");
    const filterContainer = document.querySelector(".filter-container");

    if (showVisualizations) {
      if (studyContainer) studyContainer.style.display = "none";
      if (filterContainer) filterContainer.style.display = "none";
      if (vizSection) vizSection.style.display = "block";
    } else {
      if (studyContainer) studyContainer.style.display = "block";
      if (filterContainer) filterContainer.style.display = "flex";
      if (vizSection) vizSection.style.display = "none";
    }
  }
})();
