/* ==== ITET EXTENSIONS - MIT FEHLERBEHANDLUNG ==== */
/* Versucht modulare Extensions zu laden, mit Fallback */

console.log('🚀 Starte ITET Extensions...');

(function() {
    'use strict';
    
    const modules = [
        'configs/itet/extensions/itet-main-class.js',
        'configs/itet/extensions/ui-helpers.js',
        'configs/itet/extensions/data-persistence.js',
        'configs/itet/extensions/kp-counter.js',
        'configs/itet/extensions/praktika-system.js'
    ];
    
    let loadedCount = 0;
    let hasError = false;
    
    function tryLoadModule(src) {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = src;
            
            script.onload = () => {
                loadedCount++;
                console.log(`✅ Geladen: ${src.split('/').pop()}`);
                resolve(true);
            };
            
            script.onerror = () => {
                console.warn(`⚠️ Konnte nicht laden: ${src.split('/').pop()}`);
                hasError = true;
                resolve(false);
            };
            
            // Timeout nach 2 Sekunden
            setTimeout(() => {
                if (!script.onload.called && !script.onerror.called) {
                    console.warn(`⏰ Timeout: ${src.split('/').pop()}`);
                    hasError = true;
                    resolve(false);
                }
            }, 2000);
            
            document.head.appendChild(script);
        });
    }
    
    async function loadModules() {
        console.log('📦 Lade ITET Module...');
        
        for (const module of modules) {
            await tryLoadModule(module);
        }
        
        // Prüfe Ergebnis
        if (window.ITETStudienplan && window.StudiengangCustomClass) {
            console.log('🎉 ITET Extensions erfolgreich geladen!');
        } else if (hasError) {
            console.log('🔄 Verwende Fallback...');
            createFallback();
        } else {
            console.log('⏳ Warte auf Module...');
            setTimeout(() => {
                if (!window.ITETStudienplan) {
                    createFallback();
                }
            }, 1000);
        }
    }
    
    function createFallback() {
        console.log('🛠️ Erstelle ITET Fallback-Klasse');
        
        window.ITETStudienplan = class ITETStudienplan extends StudienplanBase {
            constructor(config) {
                super(config);
                console.log('✅ ITET Fallback aktiv');
            }
        };
        
        window.StudiengangCustomClass = window.ITETStudienplan;
    }
    
    // Starte das Laden
    loadModules();
    
})();