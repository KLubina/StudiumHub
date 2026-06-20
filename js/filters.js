// Zentrale Definition der gewünschten Reihenfolge (wird von beiden Objekten genutzt)
const INSTITUTION_ORDER = {
  "Fachhochschule Nordwestschweiz": 1, // FHNW
  ZHAW: 2,
  "Universität Zürich": 3, // UZH
  "ETH Zürich": 4,
};

// Hilfsfunktion für die Sortierung
function sortInstitutions(a, b) {
  const orderA = INSTITUTION_ORDER[a.name] || 99; // 99, falls eine unbekannte Institution auftaucht
  const orderB = INSTITUTION_ORDER[b.name] || 99;
  return orderA - orderB;
}

const Filters = {
  isMinor(program) {
    const ectsText = program.ects || program.degree || "";
    const numbers = ectsText.match(/\d+/g);
    if (!numbers) return false;

    const maxValue = Math.max(...numbers.map((n) => parseInt(n, 10)));
    return maxValue <= 60;
  },

  filterData() {
    const currentFilters = State.getFilters();
    const showMinors = State.getShowMinors();

    let filtered = JSON.parse(JSON.stringify(State.getData()));

    if (currentFilters.type) {
      filtered = filtered.filter((inst) => inst.type === currentFilters.type);
    }

    if (currentFilters.institution) {
      if (currentFilters.institution === "group_zurich") {
        const zurichInsts = [
          "ETH Zürich",
          "Universität Zürich",
          "ZHAW",
          "Fachhochschule Nordwestschweiz",
        ];
        filtered = filtered.filter((inst) => zurichInsts.includes(inst.name));
      } else {
        filtered = filtered.filter(
          (inst) => inst.name === currentFilters.institution,
        );
      }
    }

    if (currentFilters.category) {
      filtered.forEach((inst) => {
        inst.categories = inst.categories.filter(
          (cat) => cat.name === currentFilters.category,
        );
      });
      filtered = filtered.filter((inst) => inst.categories.length > 0);
    }

    if (!showMinors) {
      filtered = this._removeMinorsFromData(filtered);
    }

    // --- ALLES NACH DER NEUEN ORDNUNG SORTIEREN ---
    filtered.sort(sortInstitutions);

    return filtered;
  },

  _removeMinorsFromData(data) {
    data.forEach((inst) => {
      inst.categories.forEach((cat) => {
        if (cat.programs) {
          cat.programs = cat.programs.filter((p) => !this.isMinor(p));
        }
        if (cat.subcategories) {
          cat.subcategories.forEach((sub) => {
            if (sub.programs)
              sub.programs = sub.programs.filter((p) => !this.isMinor(p));
          });
          cat.subcategories = cat.subcategories.filter(
            (sub) => sub.programs?.length > 0,
          );
        }
      });

      inst.categories = inst.categories.filter(
        (cat) => cat.programs?.length > 0 || cat.subcategories?.length > 0,
      );
    });

    return data.filter((inst) => inst.categories.length > 0);
  },
};

const FilterUI = {
  populateFilters() {
    const institutionFilter = document.getElementById("institutionFilter");
    const categoryFilter = document.getElementById("categoryFilter");
    const allData = State.getData();

    // Text für die Gruppe angepasst, damit es zur neuen Ordnung passt
    institutionFilter.innerHTML =
      '<option value="group_zurich">📍 Zürich (FHNW, ZHAW, UZH, ETH)</option>';

    // --- DROPDOWN NACH DER NEUEN ORDNUNG SORTIEREN ---
    // Wir kopieren das Array mit [...allData], um die Originaldaten im State nicht zu verändern
    const sortedData = [...allData].sort(sortInstitutions);

    sortedData.forEach((inst) => {
      const prefix = inst.type === "uni" ? "[Uni] " : "[FH] ";
      this._addOption(institutionFilter, inst.name, prefix + inst.name);
    });

    const categories = new Set();
    allData.forEach((inst) =>
      inst.categories.forEach((cat) => categories.add(cat.name)),
    );

    categoryFilter.innerHTML =
      '<option value="">-- Alle Kategorien --</option>';
    Array.from(categories)
      .sort() // Kategorien bleiben alphabetisch sortiert
      .forEach((catName) => {
        this._addOption(categoryFilter, catName, catName);
      });
  },

  updateFilterVisibility() {
    const categoryFilter = document.getElementById("categoryFilter");
    categoryFilter.style.display =
      State.getView() === "institution" ? "none" : "";
  },

  _addOption(selectElement, value, text) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = text;
    selectElement.appendChild(option);
  },
};
