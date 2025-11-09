/* Core - Main Entry Point */

const coreModules = [
    'StudienplanBase.js',
    'Initialization.js',
    'EventListeners.js',
    'GlobalInit.js'
];

coreModules.forEach(module => {
    const script = document.createElement('script');
    script.src = `js/functionality/core/${module}`;
    document.head.appendChild(script);
});
