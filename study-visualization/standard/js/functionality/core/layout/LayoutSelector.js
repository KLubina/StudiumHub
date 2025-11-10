/* Layout Selector */

StudienplanBase.prototype.createStudienplan = function() {
    const container = document.getElementById('studienplan');
    container.innerHTML = '';

    // Core only supports years layout - custom layouts go in program-specific/individual/
    this.createYearLayout(container);
};
