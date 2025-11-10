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

        // NEW: Merge modular config files (if they exist)
        if (window.StudiengangGeneralConfig || window.StudiengangLayoutConfig) {
            // New modular structure detected
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
                ...window.StudiengangColorManagerConfig,
                ...window.StudiengangKPCounterConfig,
                ...window.StudiengangWahlmoduleConfig
            };
        } else if (window.StudiengangBaseConfig) {
            // LEGACY: Fall back to old base-config.js structure
            config = { ...window.StudiengangBaseConfig };
            // In legacy mode also ensure default values exist so downstream code
            // can rely on them consistently.
            for (const [k, v] of Object.entries(defaultGeneralConfig)) {
                if (!(k in config)) config[k] = v;
            }
            for (const [k, v] of Object.entries(defaultFeaturesConfig)) {
                if (!(k in config)) config[k] = v;
            }
        }

        // Add module data
        config.daten = window.StudiengangModules;

        // Add module details (if available)
        if (window.StudiengangModuleDetails) {
            config.modulDetails = window.StudiengangModuleDetails;
        } else {
            config.modulDetails = {};
        }

        // Merge additional module data (legacy compatibility - some data files use StudiengangExtensions)
        if (window.StudiengangExtensions) {
            Object.assign(config, window.StudiengangExtensions);
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
