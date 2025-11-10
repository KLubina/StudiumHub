/* Config Loader - Main Entry Point */

// Load all config-loader modules
const configLoaderModules = [
    'StudyModelDetector.js',
    'ModuleDataCombiner.js',
    'ConfigMerger.js',
    'ModuleLoader.js',
    'ConfigLoader.js'
];

// Wait for all sub-modules to load
window.subModulesReady.configLoader = Promise.all(
    configLoaderModules.map(module => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = `js/functionality/core/config-loader/${module}`;
            script.onload = () => resolve();
            script.onerror = () => resolve(); // Continue even if one fails
            document.head.appendChild(script);
        });
    })
).then(() => {
    // Global initialization function - only define after all modules loaded
    window.loadStudiengangConfig = async function(studiengang) {
        const loader = new StudiengangConfigLoader(studiengang);

        if (document.readyState === 'loading') {
            await new Promise(resolve => document.addEventListener('DOMContentLoaded', resolve, { once: true }));
        }

        const config = await loader.loadConfig();
        initializeStudienplan(config);
        return config;
    };
});
