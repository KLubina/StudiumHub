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

    // Tiefen-Kopie, um das Original-Datenmodell nicht zu korrumpieren
    let filtered = JSON.parse(JSON.stringify(State.getData()));

    // 1. Nach Typ filtern (Uni / FH)
    if (currentFilters.type) {
      filtered = filtered.filter((inst) => inst.type === currentFilters.type);
    }

    // 2. Nach Institution / Region filtern
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

    // 3. Nach Kategorie filtern
    if (currentFilters.category) {
      filtered.forEach((inst) => {
        inst.categories = inst.categories.filter(
          (cat) => cat.name === currentFilters.category,
        );
      });
      filtered = filtered.filter((inst) => inst.categories.length > 0);
    }

    // 4. Minors ausschließen, falls nicht gewünscht
    if (!showMinors) {
      filtered = this._removeMinorsFromData(filtered);
    }

    return filtered;
  },

  // Interne Hilfsfunktion, um die tiefe Verschachtelung lesbar zu machen
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

// =========================================================================
// 2. FORMULAR-ELEMENTE (Dropdowns befüllen und steuern)
// =========================================================================
const FilterUI = {
  populateFilters() {
    const institutionFilter = document.getElementById("institutionFilter");
    const categoryFilter = document.getElementById("categoryFilter");
    const allData = State.getData();

    // Institutionen-Dropdown zurücksetzen & Standard-Option setzen
    institutionFilter.innerHTML =
      '<option value="group_zurich">📍 Zürich (ETH, UZH, ZHAW, FHNW)</option>';

    // Hochschulen hinzufügen
    allData.forEach((inst) => {
      const prefix = inst.type === "uni" ? "[Uni] " : "[FH] ";
      this._addOption(institutionFilter, inst.name, prefix + inst.name);
    });

    // Einzigartige Kategorien sammeln und sortieren
    const categories = new Set();
    allData.forEach((inst) =>
      inst.categories.forEach((cat) => categories.add(cat.name)),
    );

    // Kategorien-Dropdown befüllen
    categoryFilter.innerHTML =
      '<option value="">-- Alle Kategorien --</option>'; // Falls Standardwert gewünscht
    Array.from(categories)
      .sort()
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
