/* Color Manager - Main Entry Point */

const colorManagerModules = [
    'ColorManager.js',
    'LegendUpdater.js',
    'Controls.js',
    'Integration.js'
];

colorManagerModules.forEach(module => {
    const script = document.createElement('script');
    script.src = `js/functionality/color-manager/${module}`;
    document.head.appendChild(script);
});
