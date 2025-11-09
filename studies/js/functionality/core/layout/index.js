/* Layout - Main Entry Point */

const layoutModules = [
    'LayoutSelector.js',
    'YearLayout.js',
    'CategoryLayout.js',
    'FirstYearThenGroupsLayout.js'
];

window.subModulesReady.layout = Promise.all(
    layoutModules.map(module => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = `js/functionality/core/layout/${module}`;
            script.onload = () => resolve();
            script.onerror = () => resolve();
            document.head.appendChild(script);
        });
    })
);
