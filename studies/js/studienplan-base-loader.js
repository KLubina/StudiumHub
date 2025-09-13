const baseModules = [
    'studienplan-base-core.js',
    'studienplan-base-legend.js',
    'studienplan-base-layout.js',
    'studienplan-base-module.js',
    'studienplan-base-tooltip.js',
    'studienplan-base-utils.js',
    'studienplan-base-kp-counter.js',
    'studienplan-base-wahlmodule.js',
    'studienplan-base-colormanager.js' 
];

baseModules.forEach(module => {
    const script = document.createElement('script');
    script.src = `js/${module}`;
    document.head.appendChild(script);
});