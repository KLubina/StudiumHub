/* KP Counter - Main Entry Point */

const kpCounterModules = [
    'KPCounter.js',
    'KPCalculator.js',
    'Integration.js'
];

kpCounterModules.forEach(module => {
    const script = document.createElement('script');
    script.src = `js/functionality/kp-counter/${module}`;
    document.head.appendChild(script);
});
