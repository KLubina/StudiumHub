/* ==== CSE MODULES MANIFEST ==== */
/* Übersicht und Beschreibung der CSE-Module */

/**
 * CSE Extensions Modulstruktur
 * 
 * Die CSE Extensions wurden in folgende Module aufgeteilt:
 * 
 * 1. ColorManager.js
 *    - Verwaltet die Modulfarben basierend auf Prüfungsblöcken oder Themenbereichen
 *    - Aktualisiert die Legenden dynamisch
 *    - Entfernt und setzt CSS-Klassen für Module
 * 
 * 2. GradeCalculator.js
 *    - Implementiert den Block-Prüfungen-Rechner
 *    - Berechnet Noten für alle Prüfungsblöcke (BP1, BP2, PB-G1 bis PB-G4)
 *    - Verwaltet das Calculator-Modal mit Event-Handling
 * 
 * 3. TooltipManager.js
 *    - Verwaltet Tooltips für Vertiefungsgebiete und Wahlfächer
 *    - Behandelt Tooltip-Locking-Funktionalität
 *    - Zeigt detaillierte Listen für verschiedene Studienbereiche
 * 
 * 4. UIControlsManager.js
 *    - Verwaltet UI-Steuerelemente (Radio-Buttons, Buttons)
 *    - Koordiniert die Interaktion zwischen verschiedenen Modulen
 *    - Behandelt Event-Listener für UI-Elemente
 * 
 * Die Hauptklasse (CSEStudienplan) fungiert als Koordinator und stellt
 * Delegate-Methoden zur Verfügung, um die Kompatibilität zu gewährleisten.
 * 
 * Alle ursprünglichen Funktionalitäten bleiben erhalten, aber die
 * Codestruktur ist jetzt modularer und wartungsfreundlicher.
 */

export const CSE_MODULE_INFO = {
  version: '2.0.0',
  modules: {
    ColorManager: {
      file: 'ColorManager.js',
      description: 'Modul- und Legendenfarben-Verwaltung',
      dependencies: []
    },
    GradeCalculator: {
      file: 'GradeCalculator.js', 
      description: 'Block-Prüfungen-Rechner',
      dependencies: []
    },
    TooltipManager: {
      file: 'TooltipManager.js',
      description: 'Tooltip-Verwaltung für Vertiefungsgebiete und Wahlfächer',
      dependencies: []
    },
    UIControlsManager: {
      file: 'UIControlsManager.js',
      description: 'UI-Steuerelemente und Event-Handling',
      dependencies: ['ColorManager', 'GradeCalculator']
    }
  }
};
