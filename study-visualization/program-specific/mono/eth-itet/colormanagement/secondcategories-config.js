/* ==== SECONDCATEGORIES CONFIGURATION ==== */
/* Modul-Kategorien Definition - wird in der Legende angezeigt */
/* KISS Principle: Nur Kategorien definieren, Farben kommen von thirdcategory */

window.ITETSecondCategoryConfig = {
  kategorien: [
    { name: "Obligatorisch", klasse: "obligatorisch" },
    { name: "Obligatorisch Praktikum", klasse: "obligatorisch-praktikum" },
    { name: "Kern", klasse: "kern" },
    { name: "Wahl", klasse: "wahl" },
    { name: "Praktika & Projekte", klasse: "wahl-praktika-projekte" },
    { name: "Weitere Grundlagen", klasse: "weitere-wahl-grundlagen" },
    { name: "Wissenschaftliche Arbeit", klasse: "wissenschaft" },
  ],
};

window.StudiengangColorManagerModes = window.StudiengangColorManagerModes || {};
window.StudiengangColorManagerModes.organisation = {
  label: "Organisation",
  categoryField: "secondcategory",
  valueType: "name",
  order: 1,
  css: {
    classes: "colormanagement/secondcategory-colors/classes.css",
    colors: "colormanagement/secondcategory-colors/colors.css",
  },
  getCategories() {
    return window.ITETSecondCategoryConfig?.kategorien || [];
  },
};
