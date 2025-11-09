/* Configuration Merging Logic */

class ConfigMerger {
    static mergeConfigs() {
        const config = { ...window.StudiengangBaseConfig };

        config.daten = window.StudiengangModules;

        if (window.StudiengangModuleDetails) {
            config.modulDetails = window.StudiengangModuleDetails;
        } else {
            config.modulDetails = {};
        }

        if (window.StudiengangExtensions) {
            Object.assign(config, window.StudiengangExtensions);
        }

        if (window.StudiengangCustomClass) {
            window.StudiengangClass = window.StudiengangCustomClass;
        }

        window.StudiengangConfig = config;
        return config;
    }
}

window.ConfigMerger = ConfigMerger;
