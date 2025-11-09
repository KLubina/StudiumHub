/* Major/Minor Selector - Main Entry Point */

const majorMinorSelectorModules = [
    'SelectorCore.js',
    'SelectorUI.js',
    'EventHandlers.js',
    'DataHandler.js'
];

window.subModulesReady.majorMinorSelector = Promise.all(
    majorMinorSelectorModules.map(module => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = `js/functionality/major-minor-selector/${module}`;
            script.onload = () => resolve();
            script.onerror = () => resolve();
            document.head.appendChild(script);
        });
    })
);
