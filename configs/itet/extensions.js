/* ==== ITET EXTENSIONS - DEBUG VERSION ==== */
/* Zeigt alle Fehler und Probleme an */

console.log('🚀 ITET Extensions - DEBUG MODE GESTARTET');
console.log('📍 Aktueller Pfad:', window.location.href);
console.log('📁 Base URL:', window.location.origin + window.location.pathname);

// Debug-Informationen sammeln
const debugInfo = {
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    currentURL: window.location.href,
    baseURL: window.location.origin + window.location.pathname,
    studienplanBase: typeof StudienplanBase,
    scripts: Array.from(document.scripts).map(s => s.src || s.innerHTML.substring(0, 50))
};

console.log('🔍 Debug Info:', debugInfo);

// Teste ob die Dateien existieren
const modulesToTest = [
    'configs/itet/extensions/itet-main-class.js',
    'configs/itet/extensions/ui-helpers.js', 
    'configs/itet/extensions/data-persistence.js',
    'configs/itet/extensions/kp-counter.js',
    'configs/itet/extensions/praktika-system.js'
];

console.log('📋 Module zum Testen:', modulesToTest);

function testFileExists(url) {
    return new Promise((resolve) => {
        const startTime = performance.now();
        
        fetch(url, { method: 'HEAD' })
            .then(response => {
                const endTime = performance.now();
                const result = {
                    url: url,
                    exists: response.ok,
                    status: response.status,
                    statusText: response.statusText,
                    loadTime: `${(endTime - startTime).toFixed(2)}ms`,
                    contentType: response.headers.get('content-type')
                };
                
                if (response.ok) {
                    console.log(`✅ Datei existiert: ${url.split('/').pop()}`, result);
                } else {
                    console.error(`❌ Datei nicht gefunden: ${url.split('/').pop()}`, result);
                }
                
                resolve(result);
            })
            .catch(error => {
                const endTime = performance.now();
                const result = {
                    url: url,
                    exists: false,
                    error: error.message,
                    loadTime: `${(endTime - startTime).toFixed(2)}ms`
                };
                
                console.error(`💥 Fehler beim Prüfen: ${url.split('/').pop()}`, result);
                resolve(result);
            });
    });
}

async function debugModules() {
    console.log('🔍 Teste Dateien...');
    
    const results = [];
    
    for (const module of modulesToTest) {
        const result = await testFileExists(module);
        results.push(result);
    }
    
    console.log('📊 Test-Ergebnisse:', results);
    
    // Zeige Zusammenfassung
    const existing = results.filter(r => r.exists);
    const missing = results.filter(r => !r.exists);
    
    console.log(`✅ Existierende Dateien: ${existing.length}/${results.length}`);
    console.log(`❌ Fehlende Dateien: ${missing.length}/${results.length}`);
    
    if (missing.length > 0) {
        console.error('💥 PROBLEM GEFUNDEN: Fehlende Dateien:', missing.map(m => m.url));
    }
    
    // Teste Script-Loading
    if (existing.length > 0) {
        console.log('🧪 Teste Script-Loading...');
        await testScriptLoading(existing[0].url);
    }
    
    // Teste StudienplanBase
    console.log('🧪 Teste StudienplanBase Verfügbarkeit...');
    console.log('StudienplanBase verfügbar:', typeof StudienplanBase !== 'undefined');
    
    if (typeof StudienplanBase !== 'undefined') {
        console.log('StudienplanBase Methoden:', Object.getOwnPropertyNames(StudienplanBase.prototype));
    }
    
    // Erstelle Debug-Report
    createDebugReport(results);
}

function testScriptLoading(url) {
    return new Promise((resolve) => {
        console.log(`🧪 Teste Script-Loading für: ${url}`);
        
        const script = document.createElement('script');
        script.src = url;
        
        const startTime = performance.now();
        
        script.onload = () => {
            const endTime = performance.now();
            console.log(`✅ Script erfolgreich geladen: ${url.split('/').pop()} (${(endTime - startTime).toFixed(2)}ms)`);
            
            // Prüfe was das Script erstellt hat
            setTimeout(() => {
                console.log('📦 Nach Script-Loading verfügbar:');
                console.log('- window.ITETStudienplan:', typeof window.ITETStudienplan);
                console.log('- window.StudiengangCustomClass:', typeof window.StudiengangCustomClass);
                resolve(true);
            }, 100);
        };
        
        script.onerror = (error) => {
            const endTime = performance.now();
            console.error(`❌ Script-Loading Fehler: ${url.split('/').pop()} (${(endTime - startTime).toFixed(2)}ms)`, error);
            resolve(false);
        };
        
        document.head.appendChild(script);
        
        // Timeout nach 5 Sekunden
        setTimeout(() => {
            console.warn(`⏰ Script-Loading Timeout: ${url.split('/').pop()}`);
            resolve(false);
        }, 5000);
    });
}

function createDebugReport(results) {
    const report = {
        timestamp: new Date().toISOString(),
        browser: navigator.userAgent,
        url: window.location.href,
        moduleTests: results,
        globals: {
            StudienplanBase: typeof StudienplanBase,
            ITETStudienplan: typeof window.ITETStudienplan,
            StudiengangCustomClass: typeof window.StudiengangCustomClass,
            StudiengangConfig: typeof window.StudiengangConfig
        },
        domState: {
            scripts: document.scripts.length,
            stylesheets: document.styleSheets.length,
            elements: document.getElementsByTagName('*').length
        }
    };
    
    console.log('📋 VOLLSTÄNDIGER DEBUG-REPORT:');
    console.log(JSON.stringify(report, null, 2));
    
    // Erstelle HTML Debug-Ausgabe
    const debugDiv = document.createElement('div');
    debugDiv.id = 'itet-debug-output';
    debugDiv.style.cssText = `
        position: fixed; top: 10px; left: 10px; width: 400px; max-height: 80vh;
        background: white; border: 2px solid red; padding: 10px; overflow-y: auto;
        z-index: 10000; font-family: monospace; font-size: 10px;
        box-shadow: 0 0 20px rgba(0,0,0,0.5);
    `;
    
    debugDiv.innerHTML = `
        <h3 style="color: red; margin: 0 0 10px 0;">🚨 ITET DEBUG REPORT</h3>
        <div><strong>Zeit:</strong> ${report.timestamp}</div>
        <div><strong>URL:</strong> ${report.url}</div>
        <hr>
        <h4>📁 Modul-Tests:</h4>
        ${results.map(r => `
            <div style="color: ${r.exists ? 'green' : 'red'};">
                ${r.exists ? '✅' : '❌'} ${r.url.split('/').pop()} 
                ${r.status ? `(${r.status})` : ''}
                ${r.error ? `- ${r.error}` : ''}
            </div>
        `).join('')}
        <hr>
        <h4>🌐 Globale Objekte:</h4>
        ${Object.entries(report.globals).map(([key, value]) => `
            <div style="color: ${value === 'undefined' ? 'red' : 'green'};">
                ${value === 'undefined' ? '❌' : '✅'} ${key}: ${value}
            </div>
        `).join('')}
        <hr>
        <button onclick="this.parentElement.remove()" style="background: red; color: white; border: none; padding: 5px 10px; cursor: pointer;">Schließen</button>
    `;
    
    document.body.appendChild(debugDiv);
}

// Starte Debug-Tests
debugModules().then(() => {
    console.log('🏁 Debug-Tests abgeschlossen');
}).catch(error => {
    console.error('💥 Debug-Test Fehler:', error);
});

console.log('✅ ITET Debug Mode aktiv - siehe Console und Debug-Fenster');