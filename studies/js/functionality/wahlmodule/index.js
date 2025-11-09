/* Wahlmodule - Main Entry Point */

const wahlmoduleModules = [
    'WahlmoduleManager.js',
    'TooltipIntegration.js',
    'ModuleSelection.js',
    'Storage.js',
    'Utils.js',
    'Integration.js'
];

window.subModulesReady.wahlmodule = Promise.all(
    wahlmoduleModules.map(module => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = `js/functionality/wahlmodule/${module}`;
            script.onload = () => resolve();
            script.onerror = () => resolve();
            document.head.appendChild(script);
        });
    })
);
