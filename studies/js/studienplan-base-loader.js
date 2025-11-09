/**
 * STUDIENPLAN BASE LOADER - MODULARIZED VERSION
 *
 * All base functionality modules have been moved under the new
 * `functionality/` top-level directory. Each module remains organized
 * in its own subdirectory with an `index.js` entry point.
 *
 * Load Order (functionality/...):
 * 1. core - Base classes and initialization
 * 2. utils - Utility functions (text fitting, polyfills)
 * 3. module - Module creation and rendering
 * 4. tooltip - Tooltip functionality
 * 5. layout - Layout engines (year, category, etc.)
 * 6. legend - Legend creation
 * 7. kp-counter - Credit point counter
 * 8. color-manager - Color mode management
 * 9. major-minor-selector - Major/Minor selection system
 * 10. wahlmodule - Elective module selection system
 * 11. config-loader - Configuration loading system
 */

const baseModules = [
    'core/index.js',
    'utils/index.js',
    'module/index.js',
    'tooltip/index.js',
    'layout/index.js',
    'legend/index.js',
    'kp-counter/index.js',
    'color-manager/index.js',
    'major-minor-selector/index.js',
    'wahlmodule/index.js',
    'config-loader/index.js'
];

// New base path reflecting the moved modules
const basePath = 'js/functionality';

console.log('📦 Loading modularized Studienplan base components from functionality/...');

baseModules.forEach(module => {
    const script = document.createElement('script');
    script.src = `${basePath}/${module}`;
    script.onerror = () => {
        console.error(`❌ Failed to load module: ${basePath}/${module}`);
    };
    script.onload = () => {
        console.log(`✅ Loaded: ${basePath}/${module}`);
    };
    document.head.appendChild(script);
});

console.log('📦 All base modules queued for loading (functionality)');
