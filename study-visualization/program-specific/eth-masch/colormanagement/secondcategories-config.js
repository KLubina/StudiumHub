/* ==== SECONDCATEGORIES CONFIGURATION ==== */
/* Kernmodule Maschinenbau als zusätzlicher Farbmodus */

window.ETHMaschSecondCategoryConfig = {
  kategorien: [
    { name: "Kernmodule Maschinenbau", klasse: "kernmodule-maschinenbau" },
  ],
};

window.StudiengangColorManagerModes = window.StudiengangColorManagerModes || {};
window.StudiengangColorManagerModes.kernmodule = {
  label: "Kernmodule Maschinenbau",
  categoryField: "secondcategory",
  valueType: "name",
  order: 1,
  css: {
    classes: "colormanagement/secondcategory-colors/classes.css",
    colors: "colormanagement/secondcategory-colors/colors.css",
  },
  getCategories() {
    return window.ETHMaschSecondCategoryConfig?.kategorien || [];
  },
};
