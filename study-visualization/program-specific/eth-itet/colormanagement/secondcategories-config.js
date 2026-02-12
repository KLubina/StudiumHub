
window.ITETSecondCategoryConfig = {
  kategorien: [
    { name: "Basisprüfungsblock A", klasse: "basisprufungsblock-a" },
    { name: "Basisprüfungsblock B", klasse: "basisprufungsblock-b" },
    { name: "Prüfungsblock 1", klasse: "prufungsblock-1" },
    { name: "Prüfungsblock 2", klasse: "prufungsblock-2" },
    { name: "Prüfungsblock 3", klasse: "prufungsblock-3" },
  ],
};


window.StudiengangColorManagerModes = window.StudiengangColorManagerModes || {};
window.StudiengangColorManagerModes.prufungsbloecke = {
  label: "Prüfungsblöcke",
  categoryField: "secondcategory",
  valueType: "class",
  order: 1,
  css: {
    classes: "colormanagement/secondcategory-colors/classes.css",
    colors: "colormanagement/secondcategory-colors/colors.css",
  },
  getCategories() {
    return window.ITETSecondCategoryConfig?.kategorien || [];
  },
};
