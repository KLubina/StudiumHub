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
        // New unified structure for both mono and major-minor: program-specific/{studyModel}/{studiengang}/
        const basePath = `../program-specific/${this.studyModel}/${this.studiengang}`;

        // Load modular config files (new structure)
        await this.loadModularConfigs(basePath);

        // Check if this is a UZH studiengang
        const isUZH = ['uzh-polisci', 'uzh-geschichte', 'uzh-ethnologie', 'uzh-kommunikation', 'uzh-pop-kultur', 'uzh-soziologie'].includes(this.studiengang);

        // Load data files - now in data/ subdirectory
        // UZH studiengänge don't have basic-modules-data.js, they load their data in loadUZHData()
        if (!isUZH) {
            await this.loader.loadModule(`${basePath}/data/basic-modules-data.js`);
            await this.loader.loadOptionalModule(`${basePath}/data/basic-modules-details.js`);
        }

        await this.loadStudiengangSpecificData(basePath);
        await this.loadStudiengangSpecifics(basePath);

        ModuleDataCombiner.combineModuleData(this.studiengang);
        this.config = ConfigMerger.mergeConfigs();

        return this.config;
    }

    async loadModularConfigs(basePath) {
        // Core config files (always loaded) - now in standard-config/ subdirectory
        await this.loader.loadModule(`${basePath}/standard-config/general-config.js`);
        // Layout config is optional: absence means default layout values from ConfigMerger will be used
        await this.loader.loadOptionalModule(`${basePath}/standard-config/layout-config.js`);
        // Features config is optional: absence means all feature flags default to false
        await this.loader.loadOptionalModule(`${basePath}/standard-config/features-config.js`);
        await this.loader.loadModule(`${basePath}/standard-config/standardcategories-config.js`);

        // Feature-specific config files (loaded based on feature flags after features-config.js is loaded)
        // These are optional and only loaded if the corresponding feature is enabled
        // color-manager-config.js is no longer needed - modes are hardcoded in ColorManager
        await this.loader.loadOptionalModule(`${basePath}/standard-config/kp-counter-config.js`);
        await this.loader.loadOptionalModule(`${basePath}/standard-config/wahlmodule-config.js`);

        // Load color-config.js (can exist independently) - now in standard-config/ subdirectory
        await this.loader.loadOptionalModule(`${basePath}/standard-config/color-config.js`);

        // Load new colormanagement files if ColorManager is enabled
        if (window.StudiengangFeaturesConfig?.enableColorManager) {
            await this.loader.loadOptionalModule(`${basePath}/colormanagement/secondcategories-config.js`);
            await this.loader.loadOptionalModule(`${basePath}/colormanagement/thirdcategories-config.js`);
        }
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
        } else if (['uzh-polisci', 'uzh-geschichte', 'uzh-ethnologie', 'uzh-kommunikation', 'uzh-pop-kultur', 'uzh-soziologie'].includes(this.studiengang)) {
            await this.loadUZHData(basePath);
        } else {
            await this.loadDefaultWahlmoduleData(basePath);
        }
    }

    async loadBFHData(basePath) {
        await this.loader.loadOptionalModule(`${basePath}/data/vertiefungsrichtungen-data.js`);
        await this.loader.loadOptionalModule(`${basePath}/data/wahlmodule-data.js`);
    }

    async loadHSLUData(basePath) {
        await this.loader.loadOptionalModule(`${basePath}/data/vertiefungsrichtungen-data.js`);
        await this.loader.loadOptionalModule(`${basePath}/data/wahlmodule-data.js`);
    }

    async loadMSCITETData(basePath) {
        await this.loader.loadOptionalModule(`${basePath}/data/kernfacher-data.js`);
        await this.loader.loadOptionalModule(`${basePath}/data/vertiefungsfacher-data.js`);
    }

    async loadHSTData(basePath) {
        await this.loader.loadOptionalModule(`${basePath}/data/schwerpunkt-data.js`);
        await this.loader.loadOptionalModule(`${basePath}/data/wahlfacher-data.js`);
    }

    async loadUZHData(basePath) {
        // Load the new modular UZH data structure
        await this.loader.loadOptionalModule(`${basePath}/data/pflichtmodule-data.js`);
        await this.loader.loadOptionalModule(`${basePath}/data/wahlpflichtmodule-data.js`);
        await this.loader.loadOptionalModule(`${basePath}/data/wahlmodule-data.js`);
        await this.loader.loadOptionalModule(`../program-specific/${this.studyModel}/uzh-common/minor-data.js`);
        ModuleDataCombiner.setupUzhMinorDataAlias(this.studiengang);
    }

    async loadDefaultWahlmoduleData(basePath) {
        await this.loader.loadOptionalModule(`${basePath}/data/vertiefung-data.js`);
        await this.loader.loadOptionalModule(`${basePath}/data/wahlfacher-data.js`);
        await this.loader.loadOptionalModule(`${basePath}/data/cse-wahlmodule-data.js`);
        await this.loader.loadOptionalModule(`${basePath}/data/kernfacher-data.js`);
        await this.loader.loadOptionalModule(`${basePath}/data/weitere-wahl-grundlagenfacher-data.js`);
        await this.loader.loadOptionalModule(`${basePath}/data/praktika-seminar-projekt-data.js`);
    }

    async loadStudiengangSpecifics(basePath) {
        // Load studiengang-specific implementation/registration in correct order:
        // 1. class-definition.js - defines the custom class (e.g., window.ITETStudienplan)
        // 2. third-year-layout.js - extends the class with custom layout methods
        // 3. register-class.js - registers the class as window.StudiengangCustomClass

        await this.loader.loadOptionalModule(`${basePath}/individual/class-definition.js`);
        await this.loader.loadOptionalModule(`${basePath}/individual/third-year-layout.js`);
        await this.loader.loadOptionalModule(`${basePath}/individual/register-class.js`);
    }

    cleanup() {
        this.loader.cleanup();
    }
}

window.StudiengangConfigLoader = StudiengangConfigLoader;
