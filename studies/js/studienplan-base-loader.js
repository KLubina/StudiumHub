/**
 * STUDIENPLAN BASE LOADER - MODULARIZED VERSION
 *
 * All base functionality modules have been moved under the new
 * `functionality/` top-level directory. Each module remains organized
 * in its own subdirectory with an `index.js` entry point.
 *
 * New structure (functionality/...):
 * - core/      → unverzichtbare Basismodule (Rendering, Layout, Legend, Config, Utils, etc.)
 * - optional/  → optionale Erweiterungen (Tooltip, KP-Counter, Color-Mode, Major/Minor, Wahlmodule)
 *
 * Lade-Reihenfolge:
 * 1) Zuerst core/index.js (dies initialisiert und lädt seine eigenen Submodule)
 * 2) Danach optionale Module (fehlende optionale Module dürfen das Laden NICHT abbrechen)
 */

// New base paths reflecting the moved modules into core/ and optional/
const corePath = 'js/functionality/core';
const optionalPath = 'js/functionality/optional';

console.log('📦 Loading Studienplan components (core first, then optional)...');

// Initialize global object to track sub-module loading
window.subModulesReady = {};

// Small helper to load a single script and return a promise
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onerror = () => {
            console.error(`❌ Failed to load: ${src}`);
            reject(new Error(`Failed to load ${src}`));
        };
        script.onload = () => {
            console.log(`✅ Loaded: ${src}`);
            resolve();
        };
        document.head.appendChild(script);
    });
}

// Promise that resolves when core and optional modules are loaded (lenient for optional)
window.baseModulesReady = (async () => {
    // 1) Load core entrypoint first
    console.log('📥 Loading core/index.js ...');
    await loadScript(`${corePath}/index.js`);

    // 2) Then load optional modules (do not fail the whole init if one is missing)
    const optionalModules = [
        'tooltip/index.js',
        'kp-counter/index.js',
        'color-manager/index.js',
        'major-minor-selector/index.js',
        'wahlmodule/index.js'
    ];

    console.log('📥 Loading optional modules ...');
    const settled = await Promise.allSettled(
        optionalModules.map(m => loadScript(`${optionalPath}/${m}`))
    );
    const failed = settled.filter(r => r.status === 'rejected').length;
    if (failed > 0) {
        console.warn(`⚠️ Optional modules failed to load: ${failed}. Core continues.`);
    }

    console.log('⏳ Waiting for all registered sub-modules to finish loading ...');
    await Promise.all(Object.values(window.subModulesReady));
    console.log('✅ Core and available optional modules (incl. sub-modules) loaded successfully');
})();

console.log('📦 Module loading initiated (core + optional)');
