/* Legend - Main Entry Point */

const legendModules = [
    'LegendCreator.js',
    'LegendItem.js'
];

legendModules.forEach(module => {
    const script = document.createElement('script');
    script.src = `js/functionality/legend/${module}`;
    document.head.appendChild(script);
});
