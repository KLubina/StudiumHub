/* KP Counter - Main Entry Point */

// Load modules sequentially due to dependencies
window.subModulesReady.kpCounter = (async () => {
    const loadScript = (src) => new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve();
        script.onerror = () => resolve();
        document.head.appendChild(script);
    });

    // Load in order: KPCounter must be loaded before KPCalculator
    await loadScript('js/functionality/optional/kp-counter/KPCounter.js');
    await loadScript('js/functionality/optional/kp-counter/KPCalculator.js');
    await loadScript('js/functionality/optional/kp-counter/Integration.js');
})();
