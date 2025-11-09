/* Module - Main Entry Point */

const moduleModules = [
    'ModuleCreator.js',
    'ModuleSizing.js',
    'ModuleContent.js'
];

moduleModules.forEach(module => {
    const script = document.createElement('script');
    script.src = `js/functionality/module/${module}`;
    document.head.appendChild(script);
});
