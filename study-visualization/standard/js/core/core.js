/**
 * CORE - Haupteintrittspunkt für die Core-Funktionalität
 */

window.SpecificprogramCore = {
  // Initialisiere die Core-Funktionalität
  initialize() {
    console.log("Core initialisiert");
    // Hier können globale Initialisierungen gemacht werden
  },
};

// Initialisiere sofort
window.SpecificprogramCore.initialize();

// Markiere als geladen
window.subModulesReady.core = Promise.resolve();
