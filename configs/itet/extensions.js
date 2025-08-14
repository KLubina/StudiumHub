/* ==== ITET EXTENSIONS - DIREKTER FIX ==== */
/* Lädt die modularen Extensions direkt ohne Umwege */

(function() {
    'use strict';
    
    console.log('🚀 Lade ITET Extensions (direkt)...');
    
    // Module direkt laden - ohne index.js Umweg
    const modules = [
        'configs/itet/extensions/itet-main-class.js',
        'configs/itet/extensions/ui-helpers.js',
        'configs/itet/extensions/data-persistence.js',
        'configs/itet/extensions/kp-counter.js',
        'configs/itet/extensions/praktika-system.js'
    ];
    
    let loadedCount = 0;
    
    function loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => {
                loadedCount++;
                console.log(`✅ ${src.split('/').pop()} geladen`);
                resolve();
            };
            script.onerror = () => {
                console.error(`❌ Fehler: ${src}`);
                reject(new Error(src));
            };
            document.head.appendChild(script);
        });
    }
    
    // Sequenziell laden
    modules.reduce((promise, module) => {
        return promise.then(() => loadScript(module));
    }, Promise.resolve()).then(() => {
        console.log('🎉 Alle ITET Module geladen');
    }).catch(error => {
        console.error('❌ ITET Extensions Fehler:', error);
    });
    
})();