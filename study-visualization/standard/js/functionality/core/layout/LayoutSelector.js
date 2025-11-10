/* Layout Selector */

StudienplanBase.prototype.createStudienplan = function() {
    const container = document.getElementById('studienplan');
    container.innerHTML = '';

    const layout = this.config.layout || 'years';

    if (layout === 'years') {
        this.createYearLayout(container);
    } else if (layout === 'categories') {
        this.createCategoryLayout(container);
    } else if (layout === 'first-year-then-groups') {
        this.createFirstYearThenGroupsLayout(container);
    }
};
