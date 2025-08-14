/* ==== ITET EXTENSIONS - MINIMAL FIX ==== */
/* Minimale Änderung für modulare Extensions */

(function() {
    'use strict';
    
    console.log('🚀 Lade ITET Extensions (modular)...');
    
    // Module in der korrekten Reihenfolge laden
    const modules = [
        'configs/itet/extensions/itet-main-class.js',
        'configs/itet/extensions/ui-helpers.js', 
        'configs/itet/extensions/data-persistence.js',
        'configs/itet/extensions/kp-counter.js',
        'configs/itet/extensions/praktika-system.js'
    ];
    
    let loadedCount = 0;
    const totalModules = modules.length;
    
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
            script.onload = () => {
                loadedCount++;
                console.log(`✅ ${src} geladen (${loadedCount}/${totalModules})`);
                resolve();
            };
            script.onerror = () => {
                console.error(`❌ Fehler beim Laden: ${src}`);
                reject(new Error(`Fehler beim Laden von ${src}`));
            };
            document.head.appendChild(script);
        });
    }
    
    // Alle Module sequenziell laden
    async function loadAllModules() {
        try {
            for (const module of modules) {
                await loadScript(module);
            }
            
            console.log('🎉 Alle ITET Extension Module erfolgreich geladen');
            
            // Bestätige dass die Klasse verfügbar ist
            if (window.ITETStudienplan && window.StudiengangCustomClass) {
                console.log('✅ ITETStudienplan Klasse verfügbar');
            } else {
                console.warn('⚠️ ITETStudienplan Klasse nicht gefunden');
            }
            
        } catch (error) {
            console.error('❌ Fehler beim Laden der ITET Extensions:', error);
            
            // Fallback Log
            console.log('🔄 Modulare Extensions fehlgeschlagen, prüfe Pfade...');
        }
    }
    
    // Starte das Laden
    loadAllModules();
    
})();