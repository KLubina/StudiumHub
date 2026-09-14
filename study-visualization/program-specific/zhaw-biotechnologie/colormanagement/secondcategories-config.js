window.StudiengangColorManagerModes = window.StudiengangColorManagerModes || {};

const zhawBiotechnologieMathematikModule = new Set([
  "Mathematik 1",
  "Informatik 1",
  "Mathematik 2",
  "Informatik 2",
  "Physik 1",
  "Physik 2",
]);

window.StudiengangColorManagerModes.neueEinteilung = {
  label: "Neue Einteilung",
  categoryField: "standardcategory",
  valueType: "class",
  order: 1,
  css: {},
  getCategories() {
    return [
      { name: "Mathematik", klasse: "mathematik" },
      { name: "Technologiemodule", klasse: "fach" },
      { name: "Praktika", klasse: "projekt" },
      { name: "Kontextmodule", klasse: "kontext" },
    ];
  },
  deriveClass(modul) {
    if (zhawBiotechnologieMathematikModule.has(modul.name)) {
      return "mathematik";
    }
    if (modul.standardcategory === "mathe-nawi") {
      return "fach";
    }
    return modul.standardcategory;
  },
};
