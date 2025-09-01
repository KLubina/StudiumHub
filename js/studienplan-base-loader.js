/* ==== STUDIENPLAN BASE LOADER ==== */
/* Lädt alle Module in der richtigen Reihenfolge */

// Liste der Module
const baseModules = [
    'studienplan-base-core.js',
    'studienplan-base-legend.js',
    'studienplan-base-layout.js',
    'studienplan-base-module.js',
    'studienplan-base-tooltip.js',
    'studienplan-base-utils.js'
];

// Module laden
baseModules.forEach(module => {
    const script = document.createElement('script');
    script.src = `js/base/${module}`;
    document.head.appendChild(script);
});