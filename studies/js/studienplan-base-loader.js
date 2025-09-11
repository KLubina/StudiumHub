const baseModules = [
    'studienplan-base-core.js',
    'studienplan-base-legend.js',
    'studienplan-base-layout.js',
    'studienplan-base-module.js',
    'studienplan-base-tooltip.js',
    'studienplan-base-utils.js'
];

baseModules.forEach(module => {
    const script = document.createElement('script');
    script.src = `js/${module}`;
    document.head.appendChild(script);
});