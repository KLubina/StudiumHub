/* Module - Main Entry Point */

const moduleModules = [
    'ModuleCreator.js',
    'ModuleSizing.js',
    'ModuleContent.js'
];

window.subModulesReady.module = Promise.all(
    moduleModules.map(module => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = `js/functionality/module/${module}`;
            script.onload = () => resolve();
            script.onerror = () => resolve();
            document.head.appendChild(script);
        });
    })
);
