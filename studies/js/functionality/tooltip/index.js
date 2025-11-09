/* Tooltip - Main Entry Point */

const tooltipModules = [
    'Tooltip.js',
    'TooltipContent.js'
];

tooltipModules.forEach(module => {
    const script = document.createElement('script');
    script.src = `js/functionality/tooltip/${module}`;
    document.head.appendChild(script);
});
