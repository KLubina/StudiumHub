/* Color Manager - Main Entry Point */

const colorManagerModules = [
    'ColorManager.js',
    'LegendUpdater.js',
    'Controls.js',
    'Integration.js'
];

window.subModulesReady.colorManager = Promise.all(
    colorManagerModules.map(module => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = `js/functionality/optional/color-manager/${module}`;
            script.onload = () => resolve();
            script.onerror = () => resolve();
            document.head.appendChild(script);
        });
    })
);
