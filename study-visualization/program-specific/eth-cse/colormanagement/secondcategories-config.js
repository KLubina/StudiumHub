/* ==== SECONDCATEGORIES CONFIGURATION ==== */
/* Modul-Prüfungsblöcke Definition - wird in der Legende angezeigt */
/* KISS Principle: Nur Prüfungsblöcke definieren, Farben kommen von CSS */

window.CSESecondCategoryConfig = {
  kategorien: [
    { name: "Basisprüfungsblock 1", klasse: "basis1" },
    { name: "Basisprüfungsblock 2", klasse: "basis2" },
    { name: "Prüfungsblock G1", klasse: "block-g1" },
    { name: "Prüfungsblock G2", klasse: "block-g2" },
    { name: "Prüfungsblock G3", klasse: "block-g3" },
    { name: "Prüfungsblock G4", klasse: "block-g4" },
  ],
};

window.StudiengangColorManagerModes = window.StudiengangColorManagerModes || {};
window.StudiengangColorManagerModes.pruefungsbloecke = {
  label: "Prüfungsblöcke",
  categoryField: "pruefungsblock",
  valueType: "name",
  order: 1,
  css: {
    classes: "colormanagement/secondcategory-colors/classes.css",
    colors: "colormanagement/secondcategory-colors/colors.css",
  },
  getCategories() {
    return window.CSESecondCategoryConfig?.kategorien || [];
  },
  deriveClass(modul, value) {
    // Prüfungsblock aus color-config.js ableiten
    if (window.CSEColorConfig && window.CSEColorConfig.getPruefungsblock) {
      const block = window.CSEColorConfig.getPruefungsblock(modul.name);
      return block ? block.cssClass : null;
    }
    return null;
  },
};

