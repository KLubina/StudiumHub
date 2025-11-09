/* First Year Then Groups Layout */

StudienplanBase.prototype.createFirstYearThenGroupsLayout = function(container) {
    // 1. Erstes Jahr mit Semestern
    const firstYearModules = this.config.daten.filter(m => m.jahr === 1);
    if (firstYearModules.length > 0) {
        const yearSection = this.createYearSection(1);
        container.appendChild(yearSection);
    }

    // 2. Restliche Module nach Modulgruppen (bereich)
    const otherModules = this.config.daten.filter(m => m.jahr !== 1);
    if (otherModules.length > 0) {
        const bereiche = this.config.bereicheReihenfolge ||
                        [...new Set(otherModules.map(m => m.bereich).filter(b => b))];

        bereiche.forEach(bereich => {
            const bereichModules = otherModules.filter(m => m.bereich === bereich);
            if (bereichModules.length > 0) {
                const bereichDiv = document.createElement('div');
                bereichDiv.classList.add('jahr');

                const bereichTitle = document.createElement('div');
                bereichTitle.classList.add('jahr-titel');
                bereichTitle.textContent = bereich;
                bereichDiv.appendChild(bereichTitle);

                const moduleContainer = document.createElement('div');
                moduleContainer.classList.add('module-container');
                bereichModules.forEach(m => this.createModule(m, moduleContainer));
                bereichDiv.appendChild(moduleContainer);

                container.appendChild(bereichDiv);
            }
        });
    }
};
