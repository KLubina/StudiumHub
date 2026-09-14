window.StudiengangColorManagerModes = window.StudiengangColorManagerModes || {};

const zhawChemieMathematikModule = new Set([
  "Mathematik 1",
  "Informatik 1",
  "Physik 1",
  "Mathematik 2",
  "Informatik 2",
  "Physik 2",
]);

const zhawChemieFachModule = new Set([
  "Allgemeine Chemie 1",
  "Analytische Chemie 1",
  "Biologie",
  "Allgemeine Chemie 2",
  "Analytische Chemie 2",
  "Organische Chemie 1",
  "Mikrobiologie",
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
      { name: "Chemie- und Fachmodule", klasse: "fach" },
      { name: "Praktikumsmodule", klasse: "projekt" },
      { name: "Kontextmodule", klasse: "kontext" },
    ];
  },
  deriveClass(modul) {
    if (zhawChemieMathematikModule.has(modul.name)) return "mathematik";
    if (zhawChemieFachModule.has(modul.name)) return "fach";
    return modul.standardcategory;
  },
};
