/* ==== ITET EXTENSIONS - HAUPT-LOADER ==== */
/* Lädt und koordiniert alle ITET Extension Module */

(async function() {
    'use strict';
    
    console.log('🚀 Lade ITET Extension Module...');
    
    // Module in der korrekten Reihenfolge laden
    const modules = [
        'itet-main-class.js',      // Zuerst die Hauptklasse
        'ui-helpers.js',           // Dann UI Helpers
        'data-persistence.js',     // Data Persistence
        'kp-counter.js',          // KP-Counter System
        'praktika-system.js'       // Praktika System
    ];
    
    const basePath = 'configs/itet/extensions/';
    
    try {
        // Alle Module sequenziell laden (wichtig für Dependencies)
        for (const module of modules) {
            await loadScript(basePath + module);
            console.log(`✅ ${module} geladen`);
        }
        
        console.log('🎉 Alle ITET Extension Module erfolgreich geladen');
        
    } catch (error) {
        console.error('❌ Fehler beim Laden der ITET Extensions:', error);
        throw error;
    }
    
    // Helper function für Script loading
    function loadScript(src) {
        return new Promise((resolve, reject) => {
            // Prüfen ob bereits geladen
            if (document.querySelector(`script[src="${src}"]`)) {
                console.log(`ℹ️ ${src} bereits geladen`);
                resolve();
                return;
            }
            
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = () => reject(new Error(`Fehler beim Laden von ${src}`));
            document.head.appendChild(script);
        });
    }
})();