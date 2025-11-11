/* ==== THIRDCATEGORIES CONFIGURATION ==== */
/* Modul-Themenbereiche Definition - wird in der Legende angezeigt */
/* KISS Principle: Nur Themenbereiche definieren, Farben kommen von CSS */

window.ITETThirdCategoryConfig = {
  kategorien: [
    { name: "Mathematik", klasse: "mathematik" },
    { name: "Elektrotechnik", klasse: "elektrotechnik" },
    { name: "Informationstechnologie", klasse: "it" },
    { name: "Physik", klasse: "physik" },
  ],
};

window.StudiengangColorManagerModes = window.StudiengangColorManagerModes || {};
window.StudiengangColorManagerModes.themenbereiche = {
  label: "Themenbereiche",
  categoryField: "thirdcategory",
  valueType: "class",
  order: 2,
  css: {
    classes: "colormanagement/thirdcategory-colors/classes.css",
    colors: "colormanagement/thirdcategory-colors/colors.css",
  },
  getCategories() {
    return window.ITETThirdCategoryConfig?.kategorien || [];
  },
};