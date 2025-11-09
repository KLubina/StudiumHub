/* Layout - Main Entry Point */

const layoutModules = [
    'LayoutSelector.js',
    'YearLayout.js',
    'CategoryLayout.js',
    'FirstYearThenGroupsLayout.js'
];

layoutModules.forEach(module => {
    const script = document.createElement('script');
    script.src = `js/functionality/layout/${module}`;
    document.head.appendChild(script);
});
