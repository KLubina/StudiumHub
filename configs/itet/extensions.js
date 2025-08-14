/* ==== ITET SICHTBARER DEBUG ==== */
/* Erstellt garantiert sichtbare Debug-Ausgaben */

console.log('🚀 ITET DEBUG - START');
alert('ITET Debug gestartet!'); // Popup um sicherzustellen dass es läuft

// Erstelle sofort ein sichtbares Debug-Panel
function createDebugPanel() {
    const panel = document.createElement('div');
    panel.id = 'itet-debug-panel';
    panel.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        width: 350px;
        max-height: 90vh;
        background: red;
        color: white;
        padding: 10px;
        border: 5px solid yellow;
        z-index: 999999;
        font-family: monospace;
        font-size: 12px;
        overflow-y: auto;
        box-shadow: 0 0 30px black;
    `;
    
    panel.innerHTML = '<h2>🚨 ITET DEBUG</h2><div id="debug-log">Initialisiere...</div>';
    document.body.appendChild(panel);
    
    return panel;
}

// Log-Funktion die sowohl Console als auch Panel updated
function debugLog(message) {
    console.log(message);
    
    const logDiv = document.getElementById('debug-log');
    if (logDiv) {
        logDiv.innerHTML += '<div>' + message + '</div>';
        logDiv.scrollTop = logDiv.scrollHeight;
    }
}

// Panel sofort erstellen
const debugPanel = createDebugPanel();
debugLog('✅ Debug Panel erstellt');

// Teste Basis-Funktionalität
debugLog('🔍 Teste StudienplanBase: ' + (typeof StudienplanBase));
debugLog('🔍 Teste ITETStudienplan: ' + (typeof window.ITETStudienplan));
debugLog('🔍 Teste CustomClass: ' + (typeof window.StudiengangCustomClass));

// Warte auf DOM Ready
if (document.readyState === 'loading') {
    debugLog('⏳ Warte auf DOM...');
    document.addEventListener('DOMContentLoaded', startTests);
} else {
    debugLog('✅ DOM bereits bereit');
    startTests();
}

function startTests() {
    debugLog('🧪 Starte Tests...');
    
    // Test 1: Prüfe ob Config geladen wird
    setTimeout(() => {
        debugLog('🔍 Config: ' + (window.StudiengangConfig ? 'Vorhanden' : 'FEHLT'));
        debugLog('🔍 Studienplan-Instanz: ' + (window.currentStudienplan ? 'Vorhanden' : 'FEHLT'));
        
        // Test 2: Prüfe DOM
        const legende = document.querySelector('.farben-legende');
        debugLog('🔍 Legende gefunden: ' + (legende ? 'JA' : 'NEIN'));
        
        const studienplan = document.querySelector('#studienplan');
        debugLog('🔍 Studienplan gefunden: ' + (studienplan ? 'JA' : 'NEIN'));
        
        const module = document.querySelectorAll('.modul');
        debugLog('🔍 Module gefunden: ' + module.length);
        
        // Test 3: Versuche ITET Features manuell zu erstellen
        if (legende) {
            debugLog('🛠️ Versuche KP-Counter manuell zu erstellen...');
            createManualKPCounter(legende);
        }
        
    }, 2000);
}

function createManualKPCounter(legende) {
    try {
        const kpDiv = document.createElement('div');
        kpDiv.style.cssText = `
            background: green;
            color: white;
            padding: 10px;
            margin: 10px 0;
            border-radius: 5px;
        `;
        kpDiv.innerHTML = '<h3>📊 MANUELLER KP-COUNTER</h3><p>Test erfolgreich!</p>';
        
        legende.insertBefore(kpDiv, legende.firstChild);
        debugLog('✅ Manueller KP-Counter erstellt!');
        
    } catch (error) {
        debugLog('❌ Fehler beim manuellen KP-Counter: ' + error.message);
    }
}

// Überwache alle wichtigen Funktionen
const originalInit = window.initializeStudienplan;
if (originalInit) {
    window.initializeStudienplan = function(config) {
        debugLog('🚀 initializeStudienplan aufgerufen!');
        debugLog('📋 Config: ' + JSON.stringify(config).substring(0, 100) + '...');
        
        try {
            const result = originalInit.call(this, config);
            debugLog('✅ Initialisierung erfolgreich');
            
            // Nach Initialisierung prüfen
            setTimeout(() => {
                const instanz = window.currentStudienplan;
                if (instanz) {
                    debugLog('✅ Instanz erstellt: ' + instanz.constructor.name);
                    
                    if (instanz instanceof window.ITETStudienplan) {
                        debugLog('✅ Ist ITET Instanz!');
                        
                        // Prüfe ob ITET Methoden aufgerufen werden
                        if (typeof instanz.initializeKPCounter === 'function') {
                            debugLog('🧪 Teste KP-Counter...');
                            try {
                                instanz.initializeKPCounter();
                                debugLog('✅ KP-Counter initialisiert');
                            } catch (error) {
                                debugLog('❌ KP-Counter Fehler: ' + error.message);
                            }
                        }
                        
                    } else {
                        debugLog('❌ NICHT ITET Instanz: ' + instanz.constructor.name);
                    }
                } else {
                    debugLog('❌ Keine Instanz gefunden');
                }
            }, 500);
            
            return result;
        } catch (error) {
            debugLog('❌ Initialisierung fehlgeschlagen: ' + error.message);
            throw error;
        }
    };
} else {
    debugLog('❌ initializeStudienplan nicht gefunden');
}

// Close Button für Debug Panel
setTimeout(() => {
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '❌ Schließen';
    closeBtn.style.cssText = 'position: absolute; top: 5px; right: 5px; background: black; color: white; border: none; padding: 5px; cursor: pointer;';
    closeBtn.onclick = () => debugPanel.remove();
    debugPanel.appendChild(closeBtn);
}, 1000);

debugLog('✅ ITET Sichtbarer Debug aktiv');
console.log('🏁 ITET Debug Setup abgeschlossen');