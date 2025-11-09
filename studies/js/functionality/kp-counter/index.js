/* KP Counter - Main Entry Point */

const kpCounterModules = [
    'KPCounter.js',
    'KPCalculator.js',
    'Integration.js'
];

window.subModulesReady.kpCounter = Promise.all(
    kpCounterModules.map(module => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = `js/functionality/kp-counter/${module}`;
            script.onload = () => resolve();
            script.onerror = () => resolve();
            document.head.appendChild(script);
        });
    })
);
