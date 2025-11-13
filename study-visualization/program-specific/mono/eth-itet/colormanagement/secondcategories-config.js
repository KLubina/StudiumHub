/* ==== SECONDCATEGORIES CONFIGURATION ==== */
/* Modul-Kategorien Definition - wird in der Legende angezeigt */
/* KISS Principle: Nur Kategorien definieren, Farben kommen von thirdcategory */

window.ITETSecondCategoryConfig = {
  kategorien: [
    { name: "Basisprüfungsblock A", klasse: "basisprüfungsblock-A" },
    { name: "Basisprüfungsblock B", klasse: "basisprüfungsblock-B" },

    { name: "Prüfungsblock 1", klasse: "prüfungsblock-1" },
    { name: "Prüfungsblock 2", klasse: "prüfungsblock-2" },
    { name: "Prüfungsblock 3", klasse: "prüfungsblock-3" },
  ],
};

window.StudiengangColorManagerModes = window.StudiengangColorManagerModes || {};
window.StudiengangColorManagerModes.organisation = {
  label: "Prüfungsblöcke",
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
