/* Core - Main Entry Point */

const coreModules = [
    'StudienplanBase.js',
    'Initialization.js',
    'EventListeners.js',
    'GlobalInit.js'
];

window.subModulesReady.core = Promise.all(
    coreModules.map(module => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = `js/functionality/core/${module}`;
            script.onload = () => resolve();
            script.onerror = () => resolve();
            document.head.appendChild(script);
        });
    })
);
