/* ==== SECONDCATEGORIES CONFIGURATION ==== */
/* Modul-Bereiche Definition - wird in der Legende angezeigt */
/* KISS Principle: Nur Bereiche definieren, Farben kommen von CSS */

window.LMWSecondCategoryConfig = {
  kategorien: [
    { name: "Natur- und Ingenieurwissenschaften", klasse: "bereich-natwig" },
    { name: "Sozialwissenschaften", klasse: "bereich-sozwi" },
    { name: "Lebensmittelwissenschaften", klasse: "bereich-lmw" },
  ],
};

window.StudiengangColorManagerModes = window.StudiengangColorManagerModes || {};
window.StudiengangColorManagerModes.bereiche = {
  label: "Bereiche",
  categoryField: "bereich",
  valueType: "name",
  order: 1,
  css: {
    classes: "colormanagement/secondcategory-colors/classes.css",
    colors: "colormanagement/secondcategory-colors/colors.css",
  },
  getCategories() {
    return window.LMWSecondCategoryConfig?.kategorien || [];
  },
};

