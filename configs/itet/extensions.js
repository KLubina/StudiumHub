/* ==== ITET RUNTIME DEBUG ==== */
/* Da die Module geladen sind, debuggen wir die Laufzeit-Probleme */

console.log('🔍 ITET Runtime Debug - Module sind geladen, prüfe Funktionalität...');

// 1. Prüfe ob die Klasse richtig funktioniert
function testITETClass() {
    console.log('🧪 Teste ITET Klasse...');
    
    if (typeof window.ITETStudienplan !== 'function') {
        console.error('❌ ITETStudienplan ist keine Funktion:', typeof window.ITETStudienplan);
        return false;
    }
    
    // Teste ob wir eine Instanz erstellen können
    try {
        const testConfig = { title: 'Test', daten: [] };
        const testInstance = new window.ITETStudienplan(testConfig);
        console.log('✅ ITET Instanz erstellt:', testInstance);
        
        // Teste verfügbare Methoden
        const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(testInstance));
        console.log('📋 Verfügbare Methoden:', methods);
        
        // Teste spezifische ITET Methoden
        const itetMethods = ['initializeKPCounter', 'initializePraktikaSystem', 'showMessage'];
        itetMethods.forEach(method => {
            if (typeof testInstance[method] === 'function') {
                console.log(`✅ ${method} verfügbar`);
            } else {
                console.error(`❌ ${method} fehlt`);
            }
        });
        
        return true;
    } catch (error) {
        console.error('❌ Fehler beim Erstellen der ITET Instanz:', error);
        return false;
    }
}

// 2. Prüfe die aktuelle Studienplan-Instanz
function checkCurrentStudienplan() {
    console.log('🧪 Prüfe aktuelle Studienplan-Instanz...');
    
    if (window.currentStudienplan) {
        console.log('✅ Aktuelle Instanz vorhanden:', window.currentStudienplan);
        console.log('📋 Instanz-Typ:', window.currentStudienplan.constructor.name);
        
        // Prüfe ob es eine ITET Instanz ist
        if (window.currentStudienplan instanceof window.ITETStudienplan) {
            console.log('✅ Ist ITET Instanz');
            
            // Prüfe ITET-spezifische Properties
            const properties = ['kpCounter', 'selectedPraktika', 'praktikaModule'];
            properties.forEach(prop => {
                if (prop in window.currentStudienplan) {
                    console.log(`✅ ${prop}:`, window.currentStudienplan[prop]);
                } else {
                    console.error(`❌ ${prop} fehlt`);
                }
            });
            
        } else {
            console.error('❌ Ist KEINE ITET Instanz, sondern:', window.currentStudienplan.constructor.name);
        }
    } else {
        console.error('❌ Keine aktuelle Studienplan-Instanz gefunden');
    }
}

// 3. Prüfe DOM-Elemente
function checkDOMElements() {
    console.log('🧪 Prüfe DOM-Elemente...');
    
    const elementsToCheck = [
        '#kp-counter',
        '.praktika-dropzone', 
        '.farben-legende',
        '#studienplan',
        '.modul'
    ];
    
    elementsToCheck.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
            console.log(`✅ ${selector}: ${elements.length} Elemente gefunden`);
        } else {
            console.error(`❌ ${selector}: Keine Elemente gefunden`);
        }
    });
}

// 4. Prüfe Initialisierung
function checkInitialization() {
    console.log('🧪 Prüfe Initialisierung...');
    
    // Überwache initializeStudienplan Funktion
    if (typeof window.initializeStudienplan === 'function') {
        console.log('✅ initializeStudienplan Funktion verfügbar');
        
        // Wrap die Funktion um sie zu überwachen
        const originalInit = window.initializeStudienplan;
        window.initializeStudienplan = function(config) {
            console.log('🚀 initializeStudienplan aufgerufen mit:', config);
            
            try {
                const result = originalInit.call(this, config);
                console.log('✅ initializeStudienplan erfolgreich');
                
                // Prüfe was erstellt wurde
                setTimeout(() => {
                    console.log('🔍 Nach Initialisierung:');
                    checkCurrentStudienplan();
                    checkDOMElements();
                }, 500);
                
                return result;
            } catch (error) {
                console.error('❌ Fehler in initializeStudienplan:', error);
                throw error;
            }
        };
    } else {
        console.error('❌ initializeStudienplan Funktion nicht verfügbar');
    }
}

// 5. Prüfe Config Loading
function checkConfigLoading() {
    console.log('🧪 Prüfe Config Loading...');
    
    if (typeof window.loadStudiengangConfig === 'function') {
        console.log('✅ loadStudiengangConfig verfügbar');
        
        // Überwache auch diese Funktion
        const originalLoad = window.loadStudiengangConfig;
        window.loadStudiengangConfig = function(studiengang) {
            console.log('🚀 loadStudiengangConfig aufgerufen für:', studiengang);
            
            return originalLoad.call(this, studiengang).then(config => {
                console.log('✅ Config geladen:', config);
                
                // Prüfe ob die richtige Klasse verwendet wird
                if (window.StudiengangCustomClass === window.ITETStudienplan) {
                    console.log('✅ ITET Custom Class ist gesetzt');
                } else {
                    console.error('❌ Falsche Custom Class:', window.StudiengangCustomClass);
                }
                
                return config;
            }).catch(error => {
                console.error('❌ Fehler beim Config laden:', error);
                throw error;
            });
        };
    } else {
        console.error('❌ loadStudiengangConfig nicht verfügbar');
    }
}

// 6. Console Fehler abfangen
function setupErrorHandling() {
    console.log('🧪 Setup Error Handling...');
    
    // Original console.error überschreiben
    const originalError = console.error;
    console.error = function(...args) {
        // Prüfe auf ITET-relevante Fehler
        const message = args.join(' ');
        if (message.includes('ITET') || message.includes('praktika') || message.includes('kp-counter')) {
            console.log('🚨 ITET-relevanter Fehler gefunden:', args);
        }
        
        return originalError.apply(console, args);
    };
    
    // Unhandled errors abfangen
    window.addEventListener('error', (event) => {
        console.log('🚨 JavaScript Fehler:', event.error);
        console.log('🚨 Stack:', event.error?.stack);
    });
}

// Alle Tests ausführen
function runAllTests() {
    console.log('🔬 Starte vollständige ITET Runtime Diagnose...');
    
    setupErrorHandling();
    
    const results = {
        classTest: testITETClass(),
        currentStudienplan: checkCurrentStudienplan(),
        initialization: checkInitialization(),
        configLoading: checkConfigLoading()
    };
    
    console.log('📊 Test-Ergebnisse:', results);
    
    // DOM Tests nach einer kurzen Verzögerung
    setTimeout(() => {
        checkDOMElements();
        
        // Final-Report nach 2 Sekunden
        setTimeout(() => {
            console.log('🏁 ITET Runtime Diagnose abgeschlossen');
            console.log('🔍 Wenn noch Probleme bestehen, prüfe die Console auf Fehler');
        }, 2000);
    }, 1000);
}

// Tests starten
runAllTests();

console.log('✅ ITET Runtime Debug aktiv');