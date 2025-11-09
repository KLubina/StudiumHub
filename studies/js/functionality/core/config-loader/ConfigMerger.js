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

        // NEW: Merge modular config files (if they exist)
        if (window.StudiengangGeneralConfig || window.StudiengangLayoutConfig) {
            // New modular structure detected
            config = {
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
            // In legacy mode also ensure features flags exist so downstream code
            // can rely on them consistently.
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
