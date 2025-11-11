/* Configuration Merging Logic */

class ConfigMerger {
    static mergeConfigs() {
        let config = {};

        // Provide safe defaults for optional feature flags so that a missing
        // features-config.js does not break merging and implicitly means
        // "all features disabled".
        const defaultFeaturesConfig = {
            enableTooltips: false,
            enableHover: false,
            enableColorManager: false,
            enableWahlmodule: false,
            enableKPCounter: false
        };

        // Provide standard defaults for general display settings
        const defaultGeneralConfig = {
            legendTitle: "Legende",
            creditUnit: "ECTS"
        };

        // Provide standard defaults for layout settings
        // NOTE: Core only supports "years" layout. Custom layouts should be
        // implemented in program-specific/individual/ by overriding createStudienplan
        const defaultLayoutConfig = {
            layout: "years",
            moduleSizing: "proportional",
            basisArea: 2000,
            defaultAspectRatio: 1.5,
            aspectRatios: {}
        };

        // Merge modular config files
        config = {
            // Merge general defaults first, then study-specific configs to allow overrides
            ...defaultGeneralConfig,
            ...defaultLayoutConfig,
            ...window.StudiengangGeneralConfig,
            ...window.StudiengangLayoutConfig,
            // Merge defaults first, then study-specific to allow partial configs
            ...defaultFeaturesConfig,
            ...(window.StudiengangFeaturesConfig || {}),
            ...window.StudiengangCategoriesConfig,
            // StudiengangColorManagerConfig removed - modes are hardcoded in ColorManager
            ...window.StudiengangKPCounterConfig,
            ...window.StudiengangWahlmoduleConfig
        };

        // Add module data
        config.daten = window.StudiengangModules;

        // Add module details (if available)
        if (window.StudiengangModuleDetails) {
            config.modulDetails = window.StudiengangModuleDetails;
        } else {
            config.modulDetails = {};
        }

        // Set custom studiengang-specific class (if provided via specific.js)
        if (window.StudiengangCustomClass) {
            window.StudiengangClass = window.StudiengangCustomClass;
        }

        window.StudiengangConfig = config;
        return config;
    }
}

window.ConfigMerger = ConfigMerger;
