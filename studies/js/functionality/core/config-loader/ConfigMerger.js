/* Configuration Merging Logic */

class ConfigMerger {
    static mergeConfigs() {
        let config = {};

        // NEW: Merge modular config files (if they exist)
        if (window.StudiengangGeneralConfig || window.StudiengangLayoutConfig) {
            // New modular structure detected
            config = {
                ...window.StudiengangGeneralConfig,
                ...window.StudiengangLayoutConfig,
                ...window.StudiengangFeaturesConfig,
                ...window.StudiengangCategoriesConfig,
                ...window.StudiengangColorManagerConfig,
                ...window.StudiengangKPCounterConfig,
                ...window.StudiengangWahlmoduleConfig
            };
        } else if (window.StudiengangBaseConfig) {
            // LEGACY: Fall back to old base-config.js structure
            config = { ...window.StudiengangBaseConfig };
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
