/* Main Configuration Loader Class */

class StudiengangConfigLoader {
    constructor(studiengang) {
        this.studiengang = studiengang;
        this.config = {};
        this.detector = new StudyModelDetector();
        this.loader = new ModuleLoader();
        this.studyModel = this.detector.getStudyModel(studiengang);
    }

    async loadConfig() {
        // New unified structure for both mono and major-minor: js/{studyModel}/{studiengang}/
        const basePath = `js/${this.studyModel}/${this.studiengang}`;

        // Load modular config files (new structure)
        await this.loadModularConfigs(basePath);

        // Load data files
        await this.loader.loadModule(`${basePath}/basic-modules-data.js`);
        await this.loader.loadOptionalModule(`${basePath}/extensions-data.js`);
        await this.loader.loadOptionalModule(`${basePath}/basic-modules-details.js`);

        await this.loadStudiengangSpecificData(basePath);
        await this.loadExtensions(basePath);

        ModuleDataCombiner.combineModuleData(this.studiengang);
        this.config = ConfigMerger.mergeConfigs();

        return this.config;
    }

    async loadModularConfigs(basePath) {
        // Core config files (always loaded)
        await this.loader.loadModule(`${basePath}/general-config.js`);
        await this.loader.loadModule(`${basePath}/layout-config.js`);
        await this.loader.loadModule(`${basePath}/features-config.js`);
        await this.loader.loadModule(`${basePath}/categories-config.js`);

        // Feature-specific config files (loaded based on feature flags after features-config.js is loaded)
        // These are optional and only loaded if the corresponding feature is enabled
        await this.loader.loadOptionalModule(`${basePath}/color-manager-config.js`);
        await this.loader.loadOptionalModule(`${basePath}/kp-counter-config.js`);
        await this.loader.loadOptionalModule(`${basePath}/wahlmodule-config.js`);

        // Legacy fallback: try to load old base-config.js if modular configs don't exist
        await this.loader.loadOptionalModule(`${basePath}/base-config.js`);

        // Load color-config.js (can exist independently)
        await this.loader.loadOptionalModule(`${basePath}/color-config.js`);
    }

    async loadStudiengangSpecificData(basePath) {
        if (this.studiengang === 'fhbern-eit') {
            await this.loadBFHData(basePath);
        } else if (this.studiengang === 'fhlu-eit') {
            await this.loadHSLUData(basePath);
        } else if (this.studiengang === 'eth-msc-itet') {
            await this.loadMSCITETData(basePath);
        } else if (this.studiengang === 'eth-hst') {
            await this.loadHSTData(basePath);
        } else if (this.studiengang === 'sozwi') {
            await this.loadSozwiData(basePath);
        } else if (['uzh-polisci', 'uzh-geschichte', 'uzh-ethnologie', 'uzh-kommunikation', 'uzh-pop-kultur', 'uzh-soziologie'].includes(this.studiengang)) {
            await this.loadUZHData(basePath);
        } else {
            await this.loadDefaultWahlmoduleData(basePath);
        }
    }

    async loadBFHData(basePath) {
        await this.loader.loadOptionalModule(`${basePath}/vertiefungsrichtungen-data.js`);
        await this.loader.loadOptionalModule(`${basePath}/wahlmodule-data.js`);
    }

    async loadHSLUData(basePath) {
        await this.loader.loadOptionalModule(`${basePath}/vertiefungsrichtungen-data.js`);
        await this.loader.loadOptionalModule(`${basePath}/wahlmodule-data.js`);
    }

    async loadMSCITETData(basePath) {
        await this.loader.loadOptionalModule(`${basePath}/kernfacher-data.js`);
        await this.loader.loadOptionalModule(`${basePath}/vertiefungsfacher-data.js`);
    }

    async loadHSTData(basePath) {
        await this.loader.loadOptionalModule(`${basePath}/schwerpunkt-data.js`);
        await this.loader.loadOptionalModule(`${basePath}/wahlfacher-data.js`);
    }

    async loadSozwiData(basePath) {
        await this.loader.loadOptionalModule(`${basePath}/ethnologie-modules-data.js`);
        await this.loader.loadOptionalModule(`${basePath}/kommunikationswissenschaft-modules-data.js`);
        await this.loader.loadOptionalModule(`${basePath}/politikwissenschaft-modules-data.js`);
        await this.loader.loadOptionalModule(`${basePath}/major-data.js`);
        await this.loader.loadOptionalModule(`${basePath}/minor-data.js`);
    }

    async loadUZHData(basePath) {
        await this.loader.loadOptionalModule(`${basePath}/major-data.js`);
        await this.loader.loadOptionalModule(`js/${this.studyModel}/uzh-common/minor-data.js`);
        ModuleDataCombiner.setupUzhMinorDataAlias(this.studiengang);
    }

    async loadDefaultWahlmoduleData(basePath) {
        await this.loader.loadOptionalModule(`${basePath}/vertiefung-data.js`);
        await this.loader.loadOptionalModule(`${basePath}/wahlfacher-data.js`);
        await this.loader.loadOptionalModule(`${basePath}/cse-wahlmodule-data.js`);
        await this.loader.loadOptionalModule(`${basePath}/kernfacher-data.js`);
        await this.loader.loadOptionalModule(`${basePath}/weitere-wahl-grundlagenfacher-data.js`);
        await this.loader.loadOptionalModule(`${basePath}/praktika-seminar-projekt-data.js`);
    }

    async loadExtensions(basePath) {
        // Only load the main extensions file (ColorManager and other features are now handled by optional modules)
        await this.loader.loadOptionalModule(`${basePath}/extensions.js`);
    }

    async loadFallbackConfig() {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            // New unified structure: js/{studyModel}/{studiengang}/{studiengang}-config.js
            script.src = `js/${this.studyModel}/${this.studiengang}/${this.studiengang}-config.js`;
            script.onload = () => {
                resolve(window.StudiengangConfig);
            };
            script.onerror = () => {
                reject(new Error(`Fallback-Konfiguration für ${this.studiengang} nicht gefunden`));
            };
            document.head.appendChild(script);
        });
    }

    cleanup() {
        this.loader.cleanup();
    }
}

window.StudiengangConfigLoader = StudiengangConfigLoader;
