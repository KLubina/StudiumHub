/* ==== CSE MODULE LOADER ==== */
/* Lädt alle CSE-Module für modulare Erweiterungen */

// Dynamisches Laden der Module
const cseModulePaths = [
  './modules/ColorManager.js',
  './modules/GradeCalculator.js',
  './modules/TooltipManager.js',
  './modules/UIControlsManager.js'
];

// Sequenzielles Laden der Module
async function loadCSEModules() {
  try {
    for (const modulePath of cseModulePaths) {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = modulePath;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }
    console.log('✓ Alle CSE-Module erfolgreich geladen');
  } catch (error) {
    console.error('✗ Fehler beim Laden der CSE-Module:', error);
  }
}

// Module beim Laden dieser Datei laden
loadCSEModules();
