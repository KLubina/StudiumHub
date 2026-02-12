/* ==== THIRDCATEGORIES CONFIGURATION ==== */
/* Modul-Themenbereiche Definition - wird in der Legende angezeigt */
/* KISS Principle: Nur Themenbereiche definieren, Farben kommen von CSS */

window.CSEThirdCategoryConfig = {
  kategorien: [
    { name: "Mathematik", klasse: "mathematik" },
    { name: "Informatik", klasse: "informatik" },
    { name: "Physik", klasse: "physik" },
    { name: "Chemie", klasse: "chemie" },
    { name: "Sonstiges", klasse: "sonstiges" },
  ],
};

window.StudiengangColorManagerModes = window.StudiengangColorManagerModes || {};
window.StudiengangColorManagerModes.themenbereiche = {
  label: "Themenbereiche",
  categoryField: "themenbereich",
  valueType: "class",
  order: 2,
  css: {
    classes: "colormanagement/thirdcategory-colors/classes.css",
    colors: "colormanagement/thirdcategory-colors/colors.css",
  },
  getCategories() {
    return window.CSEThirdCategoryConfig?.kategorien || [];
  },
  deriveClass(modul, value) {
    // Themenbereich aus color-config.js ableiten
    if (window.CSEColorConfig && window.CSEColorConfig.getThemenbereich) {
      return window.CSEColorConfig.getThemenbereich(modul.name);
    }
    return null;
  },
};

