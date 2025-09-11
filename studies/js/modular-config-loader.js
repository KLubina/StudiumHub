class StudiengangConfigLoader {
    constructor(studiengang) {
        this.studiengang = studiengang;
        this.config = {};
        this.loadedModules = new Set();
    }

    async loadConfig() {
        const configPath = `js/configs/${this.studiengang}`;
        const dataPath = `js/data/${this.studiengang}`;
        
        await this.loadModule(`${configPath}/base-config.js`);
        
        await this.loadModule(`${dataPath}/modules.js`);
        
        await this.loadOptionalModule(`${dataPath}/extensions-data.js`);
        
        await this.loadOptionalModule(`${dataPath}/module-details.js`);
        
        await this.loadOptionalModule(`${configPath}/extensions.js`);
        
        this.mergeConfigs();
        
        return this.config;
    }

    async loadModule(url) {
        return new Promise((resolve, reject) => {
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
                reject(new Error(`Fehler beim Laden von ${url}`));
            };
            document.head.appendChild(script);
        });
    }

    async loadOptionalModule(url) {
        try {
            await this.loadModule(url);
        } catch (error) {
        }
    }

    mergeConfigs() {
        
        this.config = { ...window.StudiengangBaseConfig };

        this.config.daten = window.StudiengangModules;

        if (window.StudiengangModuleDetails) {
            this.config.modulDetails = window.StudiengangModuleDetails;
            const detailCount = Object.keys(window.StudiengangModuleDetails).length;
        } else {
            this.config.modulDetails = {};
        }

        if (window.StudiengangExtensions) {
            Object.assign(this.config, window.StudiengangExtensions);
        } 

        if (window.StudiengangCustomClass) {
            window.StudiengangClass = window.StudiengangCustomClass;
        }

        window.StudiengangConfig = this.config;
            }

    async loadFallbackConfig() {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = `js/configs/${this.studiengang}-config.js`;
            script.onload = () => {
                resolve(window.StudiengangConfig);
            };
            script.onerror = () => {
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
    const loader = new StudiengangConfigLoader(studiengang);
    
    const config = await loader.loadConfig();
    
    initializeStudienplan(config);
    
    return config;
};