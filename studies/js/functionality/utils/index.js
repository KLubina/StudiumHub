/* Utils - Main Entry Point */

const utilsModules = [
    'TextFitting.js',
    'Polyfills.js'
];

utilsModules.forEach(module => {
    const script = document.createElement('script');
    script.src = `js/functionality/utils/${module}`;
    document.head.appendChild(script);
});
