/* Config Loader - Main Entry Point */

// Load all config-loader modules
const configLoaderModules = [
    'StudyModelDetector.js',
    'ModuleDataCombiner.js',
    'ConfigMerger.js',
    'ModuleLoader.js',
    'ConfigLoader.js'
];

configLoaderModules.forEach(module => {
    const script = document.createElement('script');
    script.src = `js/functionality/config-loader/${module}`;
    document.head.appendChild(script);
});

// Global initialization function
window.loadStudiengangConfig = async function(studiengang) {
    const loader = new StudiengangConfigLoader(studiengang);

    if (document.readyState === 'loading') {
        await new Promise(resolve => document.addEventListener('DOMContentLoaded', resolve, { once: true }));
    }

    try {
        const config = await loader.loadConfig();
        initializeStudienplan(config);
        return config;
    } catch (error) {
        console.warn('Fehler beim Laden der modularen Config, versuche Fallback...', error);
        try {
            const fallback = await loader.loadFallbackConfig();
            initializeStudienplan(fallback);
            return fallback;
        } catch (fallbackErr) {
            console.error('Fallback-Konfiguration ebenfalls fehlgeschlagen', fallbackErr);
            throw fallbackErr;
        }
    }
};
