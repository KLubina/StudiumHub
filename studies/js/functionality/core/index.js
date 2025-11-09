/* Core - Main Entry Point */

// Helper function to load a script
function loadCoreScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve();
        script.onerror = () => resolve();
        document.head.appendChild(script);
    });
}

// Load core modules sequentially
window.subModulesReady.core = (async () => {
    // 1. FIRST: Load StudienplanBase - this is the base class that all modules extend!
    await loadCoreScript('js/functionality/core/StudienplanBase.js');

    // 2. Then load core submodules (they extend StudienplanBase.prototype)
    await loadCoreScript('js/functionality/core/utils/index.js');
    await loadCoreScript('js/functionality/core/module/index.js');
    await loadCoreScript('js/functionality/core/legend/index.js');
    await loadCoreScript('js/functionality/core/layout/index.js');
    await loadCoreScript('js/functionality/core/config-loader/index.js');

    // 3. Wait for all submodules to finish loading their dependencies
    await Promise.all([
        window.subModulesReady.utils,
        window.subModulesReady.module,
        window.subModulesReady.legend,
        window.subModulesReady.layout,
        window.subModulesReady.configLoader
    ]);

    // 4. Finally load remaining core files
    await loadCoreScript('js/functionality/core/Initialization.js');
    await loadCoreScript('js/functionality/core/EventListeners.js');
    await loadCoreScript('js/functionality/core/GlobalInit.js');
})();
