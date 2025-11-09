/* Wahlmodule - Main Entry Point */

// Load modules sequentially due to dependencies
window.subModulesReady.wahlmodule = (async () => {
    const loadScript = (src) => new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve();
        script.onerror = () => resolve();
        document.head.appendChild(script);
    });

    // Load WahlmoduleManager first, then others that extend it
    await loadScript('js/functionality/optional/wahlmodule/WahlmoduleManager.js');
    await loadScript('js/functionality/optional/wahlmodule/Storage.js');
    await loadScript('js/functionality/optional/wahlmodule/Utils.js');
    await loadScript('js/functionality/optional/wahlmodule/TooltipIntegration.js');
    await loadScript('js/functionality/optional/wahlmodule/ModuleSelection.js');
    await loadScript('js/functionality/optional/wahlmodule/Integration.js');
})();
