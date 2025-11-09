/* Wahlmodule - Main Entry Point */

const wahlmoduleModules = [
    'WahlmoduleManager.js',
    'TooltipIntegration.js',
    'ModuleSelection.js',
    'Storage.js',
    'Utils.js',
    'Integration.js'
];

wahlmoduleModules.forEach(module => {
    const script = document.createElement('script');
    script.src = `js/functionality/wahlmodule/${module}`;
    document.head.appendChild(script);
});
