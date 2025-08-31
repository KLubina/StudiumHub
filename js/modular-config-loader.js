/* ==== MODULARER CONFIG LOADER - ANGEPASST FÜR NEUE STRUKTUR ==== */
/* Lädt und kombiniert alle Konfigurationsteile für einen Studiengang */

class StudiengangConfigLoader {
    constructor(studiengang) {
        this.studiengang = studiengang;
        this.config = {};
        this.loadedModules = new Set();
    }

    async loadConfig() {
        const configPath = `js/configs/${this.studiengang}`;
        const dataPath = `js/data/${this.studiengang}`;
        
        try {
            // 1. Basis-Konfiguration laden
            await this.loadModule(`${configPath}/base-config.js`);
            
            // 2. Module-Daten laden (NEUER PFAD!)
            await this.loadModule(`${dataPath}/modules.js`);
            
                // 2b. Erweiterte Auswahl-/Kategoriedaten (optional, z.B. ITET spezielle Listen)
                await this.loadOptionalModule(`${dataPath}/extensions-data.js`);
            
            // 3. Module-Details laden (NEUER PFAD!) - falls vorhanden
            await this.loadOptionalModule(`${dataPath}/module-details.js`);
            
            // 4. Erweiterungen laden (falls vorhanden)
            await this.loadOptionalModule(`${configPath}/extensions.js`);
            
            // 5. Alles zusammenfügen
            this.mergeConfigs();
            
            return this.config;
        } catch (error) {
            console.error(`Fehler beim Laden der modularen Konfiguration für ${this.studiengang}:`, error);
            // Fallback: Versuche alte monolithische Config zu laden
            return this.loadFallbackConfig();
        }
    }

    async loadModule(url) {
        return new Promise((resolve, reject) => {
            // Prüfe ob bereits geladen
            if (this.loadedModules.has(url)) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = url;
            script.onload = () => {
                this.loadedModules.add(url);
                console.log(`✅ Geladen: ${url}`);
                resolve();
            };
            script.onerror = () => {
                console.error(`❌ Fehler beim Laden: ${url}`);
                reject(new Error(`Fehler beim Laden von ${url}`));
            };
            document.head.appendChild(script);
        });
    }

    async loadOptionalModule(url) {
        try {
            await this.loadModule(url);
        } catch (error) {
            console.log(`ℹ️ Optionales Modul ${url} nicht gefunden - wird übersprungen`);
        }
    }

    mergeConfigs() {
        console.log('🔄 Füge Konfiguration zusammen...');
        
        // Basis-Konfiguration als Grundlage
        if (window.StudiengangBaseConfig) {
            this.config = { ...window.StudiengangBaseConfig };
            console.log('✅ Base Config geladen');
        } else {
            console.error('❌ StudiengangBaseConfig fehlt!');
        }

        // Module-Daten hinzufügen
        if (window.StudiengangModules) {
            this.config.daten = window.StudiengangModules;
            console.log(`✅ ${window.StudiengangModules.length} Module geladen`);
        } else {
            console.error('❌ StudiengangModules fehlt!');
        }

        // Module-Details hinzufügen
        if (window.StudiengangModuleDetails) {
            this.config.modulDetails = window.StudiengangModuleDetails;
            const detailCount = Object.keys(window.StudiengangModuleDetails).length;
            console.log(`✅ ${detailCount} Modul-Details geladen`);
        }

        // Erweiterungen hinzufügen
        if (window.StudiengangExtensions) {
            Object.assign(this.config, window.StudiengangExtensions);
            console.log('✅ Extensions geladen');
        }

        // Spezielle Klasse hinzufügen (falls definiert)
        if (window.StudiengangCustomClass) {
            window.StudiengangClass = window.StudiengangCustomClass;
            console.log('✅ Custom Class gesetzt');
        }

        // Für Kompatibilität: Globale Variable setzen
        window.StudiengangConfig = this.config;
        
        console.log('✅ Konfiguration zusammengeführt:', this.config);
    }

    async loadFallbackConfig() {
        console.log(`🔄 Lade Fallback-Konfiguration für ${this.studiengang}`);
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = `js/configs/${this.studiengang}-config.js`; // Auch hier angepasst!
            script.onload = () => {
                console.log('✅ Fallback-Konfiguration geladen');
                resolve(window.StudiengangConfig);
            };
            script.onerror = () => {
                console.error('❌ Auch Fallback-Konfiguration nicht gefunden');
                reject(new Error(`Fallback-Konfiguration für ${this.studiengang} nicht gefunden`));
            };
            document.head.appendChild(script);
        });
    }

    // Hilfsfunktion zum Aufräumen geladener Scripts
    cleanup() {
        this.loadedModules.forEach(url => {
            const scripts = document.querySelectorAll(`script[src="${url}"]`);
            scripts.forEach(script => script.remove());
        });
    }
}

// Globale Funktion für einfache Nutzung
window.loadStudiengangConfig = async function(studiengang) {
    console.log(`🚀 Lade Konfiguration für Studiengang: ${studiengang}`);
    
    const loader = new StudiengangConfigLoader(studiengang);
    
    try {
        const config = await loader.loadConfig();
        
        if (config && typeof initializeStudienplan === 'function') {
            console.log('🎯 Initialisiere Studienplan...');
            initializeStudienplan(config);
        } else {
            console.error('❌ Konfiguration konnte nicht geladen werden oder initializeStudienplan ist nicht verfügbar');
        }
        
        return config;
    } catch (error) {
        console.error('💥 Fehler beim Laden der Konfiguration:', error);
        return null;
    }
};