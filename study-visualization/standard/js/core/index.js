/**
 * CORE MODULES INDEX
 * Lädt alle unverzichtbaren Basismodule für den Studienplan
 */

// Lade alle Core-Module
const coreModules = [
    'utils.js',
    'module.js',
    'legend.js',
    'layout.js',
    'configLoader.js',
    'core.js'
];

// Lade jedes Modul und setze ready Promise
coreModules.forEach(moduleName => {
    const script = document.createElement('script');
    script.src = `js/core/${moduleName}`;
    script.onload = () => {
        console.log(`✅ Core module loaded: ${moduleName}`);
        window.subModulesReady[moduleName.replace('.js', '')] = Promise.resolve();
    };
    script.onerror = () => {
        console.error(`❌ Failed to load core module: ${moduleName}`);
    };
    document.head.appendChild(script);
});