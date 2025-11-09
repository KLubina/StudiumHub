/* Legend - Main Entry Point */

const legendModules = [
    'LegendCreator.js',
    'LegendItem.js'
];

window.subModulesReady.legend = Promise.all(
    legendModules.map(module => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = `js/functionality/core/legend/${module}`;
            script.onload = () => resolve();
            script.onerror = () => resolve();
            document.head.appendChild(script);
        });
    })
);
