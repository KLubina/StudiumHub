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
        // Mono uses new unified structure: js/mono/{studiengang}/
        // Major-minor still uses old structure: js/major-minor/configs/ and js/major-minor/data/
        let configPath, dataPath;

        if (this.studyModel === 'mono') {
            // New structure: everything in one folder
            configPath = dataPath = `js/${this.studyModel}/${this.studiengang}`;
        } else {
            // Old structure: separate configs and data folders
            configPath = `js/${this.studyModel}/configs/${this.studiengang}`;
            dataPath = `js/${this.studyModel}/data/${this.studiengang}`;
        }

        await this.loader.loadModule(`${configPath}/base-config.js`);
        await this.loader.loadOptionalModule(`${configPath}/color-config.js`);
        await this.loader.loadModule(`${dataPath}/basic-modules-data.js`);
        await this.loader.loadOptionalModule(`${dataPath}/extensions-data.js`);
        await this.loader.loadOptionalModule(`${dataPath}/basic-modules-details.js`);

        await this.loadStudiengangSpecificData(configPath, dataPath);
        await this.loadExtensions(configPath);

        ModuleDataCombiner.combineModuleData(this.studiengang);
        this.config = ConfigMerger.mergeConfigs();

        return this.config;
    }

    async loadStudiengangSpecificData(configPath, dataPath) {
        if (this.studiengang === 'fhbern-eit') {
            await this.loadBFHData(dataPath);
        } else if (this.studiengang === 'fhlu-eit') {
            await this.loadHSLUData(dataPath);
        } else if (this.studiengang === 'eth-msc-itet') {
            await this.loadMSCITETData(dataPath);
        } else if (this.studiengang === 'eth-hst') {
            await this.loadHSTData(dataPath);
        } else if (this.studiengang === 'sozwi') {
            await this.loadSozwiData(dataPath);
        } else if (['uzh-polisci', 'uzh-geschichte', 'uzh-ethnologie', 'uzh-kommunikation', 'uzh-pop-kultur', 'uzh-soziologie'].includes(this.studiengang)) {
            await this.loadUZHData(dataPath);
        } else {
            await this.loadDefaultWahlmoduleData(dataPath);
        }
    }

    async loadBFHData(dataPath) {
        await this.loader.loadOptionalModule(`${dataPath}/vertiefungsrichtungen-data.js`);
        await this.loader.loadOptionalModule(`${dataPath}/wahlmodule-data.js`);
    }

    async loadHSLUData(dataPath) {
        await this.loader.loadOptionalModule(`${dataPath}/vertiefungsrichtungen-data.js`);
        await this.loader.loadOptionalModule(`${dataPath}/wahlmodule-data.js`);
    }

    async loadMSCITETData(dataPath) {
        await this.loader.loadOptionalModule(`${dataPath}/kernfacher-data.js`);
        await this.loader.loadOptionalModule(`${dataPath}/vertiefungsfacher-data.js`);
    }

    async loadHSTData(dataPath) {
        await this.loader.loadOptionalModule(`${dataPath}/schwerpunkt-data.js`);
        await this.loader.loadOptionalModule(`${dataPath}/wahlfacher-data.js`);
    }

    async loadSozwiData(dataPath) {
        await this.loader.loadOptionalModule(`${dataPath}/ethnologie-modules-data.js`);
        await this.loader.loadOptionalModule(`${dataPath}/kommunikationswissenschaft-modules-data.js`);
        await this.loader.loadOptionalModule(`${dataPath}/politikwissenschaft-modules-data.js`);
        await this.loader.loadOptionalModule(`${dataPath}/major-data.js`);
        await this.loader.loadOptionalModule(`${dataPath}/minor-data.js`);
    }

    async loadUZHData(dataPath) {
        await this.loader.loadOptionalModule(`${dataPath}/major-data.js`);
        await this.loader.loadOptionalModule(`js/${this.studyModel}/data/uzh-common/minor-data.js`);
        ModuleDataCombiner.setupUzhMinorDataAlias(this.studiengang);
    }

    async loadDefaultWahlmoduleData(dataPath) {
        await this.loader.loadOptionalModule(`${dataPath}/vertiefung-data.js`);
        await this.loader.loadOptionalModule(`${dataPath}/wahlfacher-data.js`);
        await this.loader.loadOptionalModule(`${dataPath}/cse-wahlmodule-data.js`);
        await this.loader.loadOptionalModule(`${dataPath}/kernfacher-data.js`);
        await this.loader.loadOptionalModule(`${dataPath}/weitere-wahl-grundlagenfacher-data.js`);
        await this.loader.loadOptionalModule(`${dataPath}/praktika-seminar-projekt-data.js`);
    }

    async loadExtensions(configPath) {
        // Only load the main extensions file (ColorManager and other features are now handled by optional modules)
        await this.loader.loadOptionalModule(`${configPath}/extensions.js`);
    }

    async loadFallbackConfig() {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            // Mono: js/mono/{studiengang}/{studiengang}-config.js
            // Major-minor: js/major-minor/configs/{studiengang}-config.js
            const fallbackPath = this.studyModel === 'mono'
                ? `js/${this.studyModel}/${this.studiengang}/${this.studiengang}-config.js`
                : `js/${this.studyModel}/configs/${this.studiengang}-config.js`;

            script.src = fallbackPath;
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
