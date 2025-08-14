/* ==== ITET EXTENSIONS - VEREINFACHT ==== */
/* Lädt die modularen Extensions aus dem extensions/ Unterordner */

(function() {
    'use strict';
    
    console.log('🚀 Lade ITET Extensions (modular)...');
    
    // Pfad zu den modularen Extensions
    const extensionsPath = 'configs/itet/extensions/index.js';
    
    // Script dynamisch laden
    const script = document.createElement('script');
    script.src = extensionsPath;
    
    script.onload = function() {
        console.log('✅ ITET Extensions erfolgreich geladen');
        
        // Bestätige dass die Klasse verfügbar ist
        if (window.ITETStudienplan && window.StudiengangCustomClass) {
            console.log('✅ ITETStudienplan Klasse verfügbar');
        } else {
            console.warn('⚠️ ITETStudienplan Klasse nicht gefunden');
        }
    };
    
    script.onerror = function() {
        console.error('❌ Fehler beim Laden der ITET Extensions');
        
        // Fallback: Versuche alte extensions.js zu laden
        console.log('🔄 Versuche Fallback...');
        const fallbackScript = document.createElement('script');
        fallbackScript.src = 'configs/itet/extensions-backup.js';
        
        fallbackScript.onload = () => {
            console.log('✅ Fallback Extensions geladen');
        };
        
        fallbackScript.onerror = () => {
            console.error('❌ Auch Fallback fehlgeschlagen');
            console.error('💥 ITET Extensions komplett nicht verfügbar!');
        };
        
        document.head.appendChild(fallbackScript);
    };
    
    document.head.appendChild(script);
})();