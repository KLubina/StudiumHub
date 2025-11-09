/* Major/Minor Selector - Main Entry Point */

const majorMinorSelectorModules = [
    'SelectorCore.js',
    'SelectorUI.js',
    'EventHandlers.js',
    'DataHandler.js'
];

majorMinorSelectorModules.forEach(module => {
    const script = document.createElement('script');
    script.src = `js/functionality/major-minor-selector/${module}`;
    document.head.appendChild(script);
});
