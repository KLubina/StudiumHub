/* ==== FOURTHCATEGORIES CONFIGURATION ==== */
/* Modul-Praktisch/Theoretisch Definition - wird in der Legende angezeigt */
/* KISS Principle: Nur Kategorien definieren, Farben kommen von CSS */

window.ITETFourthCategoryConfig = {
  kategorien: [
    { name: "Praktisch", klasse: "praktisch" },
    { name: "Theoretisch", klasse: "theoretisch" },
  ],
};

window.StudiengangColorManagerModes = window.StudiengangColorManagerModes || {};
window.StudiengangColorManagerModes.praktischTheoretisch = {
  label: "Praktisch/Theoretisch",
  categoryField: "fourthcategory",
  valueType: "class",
  order: 3,
  css: {
    classes: "colormanagement/fourthcategory-colors/classes.css",
    colors: "colormanagement/fourthcategory-colors/colors.css",
  },
  getCategories() {
    return window.ITETFourthCategoryConfig?.kategorien || [];
  },
};