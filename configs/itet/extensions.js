/* ==== ITET EXTENSIONS - ROBUSTER MODULARER LOADER ==== */
/* Lädt die modularen Extensions zuverlässig */

console.log('🚀 ITET Extensions - Robuster Loader startet...');

(function() {
    'use strict';
    
    // Absolute Pfade konstruieren basierend auf aktueller URL
    const basePath = window.location.href.split('/').slice(0, -1).join('/') + '/';
    
    const modules = [
        'configs/itet/extensions/itet-main-class.js',
        'configs/itet/extensions/ui-helpers.js',
        'configs/itet/extensions/data-persistence.js', 
        'configs/itet/extensions/kp-counter.js',
        'configs/itet/extensions/praktika-system.js'
    ];
    
    let loadedModules = 0;
    const totalModules = modules.length;
    
    function loadModuleSync(url) {
        return new Promise((resolve, reject) => {
            console.log(`📦 Lade Modul: ${url}`);
            
            const script = document.createElement('script');
            script.src = basePath + url;
            script.async = false; // Synchron laden
            
            script.onload = () => {
                loadedModules++;
                console.log(`✅ Modul geladen (${loadedModules}/${totalModules}): ${url.split('/').pop()}`);
                resolve();
            };
            
            script.onerror = (error) => {
                console.error(`❌ Modul-Fehler: ${url.split('/').pop()}`, error);
                console.log(`🔍 Versuchte URL: ${script.src}`);
                reject(new Error(`Failed to load ${url}`));
            };
            
            // Script zum DOM hinzufügen
            document.head.appendChild(script);
            
            // Backup: Timeout nach 5 Sekunden
            setTimeout(() => {
                if (loadedModules < totalModules) {
                    console.warn(`⏰ Timeout für Modul: ${url.split('/').pop()}`);
                    reject(new Error(`Timeout loading ${url}`));
                }
            }, 5000);
        });
    }
    
    async function loadAllModules() {
        console.log(`📋 Lade ${modules.length} ITET Module...`);
        
        try {
            // Module sequenziell laden (wichtig für Abhängigkeiten)
            for (const module of modules) {
                await loadModuleSync(module);
                
                // Kurze Pause zwischen Modulen
                await new Promise(resolve => setTimeout(resolve, 50));
            }
            
            console.log('🎉 Alle Module erfolgreich geladen!');
            
            // Prüfe ob alles verfügbar ist
            setTimeout(verifyModules, 100);
            
        } catch (error) {
            console.error('❌ Fehler beim Laden der Module:', error);
            console.log('🔄 Versuche Fallback...');
            
            // Fallback: Lade über XMLHttpRequest und eval
            tryFallbackLoading();
        }
    }
    
    function verifyModules() {
        console.log('🔍 Verifiziere geladene Module...');
        
        const checks = {
            ITETStudienplan: typeof window.ITETStudienplan,
            StudiengangCustomClass: typeof window.StudiengangCustomClass,
            // Prüfe ob Methoden existieren
            showMessage: window.ITETStudienplan && typeof window.ITETStudienplan.prototype.showMessage,
            initializeKPCounter: window.ITETStudienplan && typeof window.ITETStudienplan.prototype.initializeKPCounter
        };
        
        console.log('📊 Verification Results:', checks);
        
        // Setze Custom Class falls nicht bereits gesetzt
        if (window.ITETStudienplan && !window.StudiengangCustomClass) {
            window.StudiengangCustomClass = window.ITETStudienplan;
            console.log('✅ StudiengangCustomClass manuell gesetzt');
        }
        
        if (checks.ITETStudienplan === 'function') {
            console.log('🎉 ITET Extensions erfolgreich verfügbar!');
        } else {
            console.error('❌ ITET Extensions nicht vollständig geladen');
        }
    }
    
    function tryFallbackLoading() {
        console.log('🔄 Starte Fallback-Loading...');
        
        // Versuche Module per fetch + eval zu laden
        modules.forEach((moduleUrl, index) => {
            fetch(basePath + moduleUrl)
                .then(response => {
                    if (response.ok) {
                        return response.text();
                    }
                    throw new Error(`HTTP ${response.status}`);
                })
                .then(code => {
                    console.log(`📦 Fallback-Loading: ${moduleUrl.split('/').pop()}`);
                    
                    // Code ausführen
                    try {
                        eval(code);
                        console.log(`✅ Fallback erfolgreich: ${moduleUrl.split('/').pop()}`);
                    } catch (error) {
                        console.error(`❌ Fallback-Eval Fehler: ${moduleUrl.split('/').pop()}`, error);
                    }
                    
                    // Nach dem letzten Modul verifizieren
                    if (index === modules.length - 1) {
                        setTimeout(verifyModules, 500);
                    }
                })
                .catch(error => {
                    console.error(`❌ Fallback-Fetch Fehler: ${moduleUrl.split('/').pop()}`, error);
                });
        });
    }
    
    // Starte das Laden
    loadAllModules();
    
})();

console.log('✅ ITET Robuster Loader initialisiert');