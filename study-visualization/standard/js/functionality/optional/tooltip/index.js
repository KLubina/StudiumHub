/* Tooltip - Main Entry Point */

const tooltipModules = [
    'Tooltip.js',
    'TooltipContent.js',
    // Zentralisierte Overrides (räumt Outside-Click Handler auf)
    'TooltipOverrides.js'
];

window.subModulesReady.tooltip = Promise.all(
    tooltipModules.map(module => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = `js/functionality/optional/tooltip/${module}`;
            script.onload = () => resolve();
            script.onerror = () => resolve();
            document.head.appendChild(script);
        });
    })
);
