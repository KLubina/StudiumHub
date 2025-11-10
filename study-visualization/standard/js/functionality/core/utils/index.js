/* Utils - Main Entry Point */

const utilsModules = [
    'TextFitting.js'
];

window.subModulesReady.utils = Promise.all(
    utilsModules.map(module => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = `js/functionality/core/utils/${module}`;
            script.onload = () => resolve();
            script.onerror = () => resolve();
            document.head.appendChild(script);
        });
    })
);
