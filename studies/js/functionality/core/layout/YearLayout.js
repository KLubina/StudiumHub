/* Year-Based Layout */

StudienplanBase.prototype.createYearLayout = function(container) {
    const years = this.getUniqueYears();

    years.forEach(year => {
        const yearSection = this.createYearSection(year);
        container.appendChild(yearSection);
    });
};

StudienplanBase.prototype.createYearSection = function(year) {
    const yearDiv = document.createElement('div');
    yearDiv.classList.add('jahr');

    const yearTitle = document.createElement('div');
    yearTitle.classList.add('jahr-titel');

    if (this.config.assessmentJahr && year === 1) {
        yearTitle.textContent = 'Assessment Jahr';
    } else if (this.config.hauptstudium && year === 2) {
        yearTitle.textContent = 'Hauptstudium';
    } else {
        yearTitle.textContent = `${year}. Jahr`;
    }
    yearDiv.appendChild(yearTitle);

    const yearModules = this.config.daten.filter(m => m.jahr === year);

    if (yearModules.some(m => m.semester)) {
        const semesters = [...new Set(yearModules.map(m => m.semester))].sort();

        semesters.forEach(semester => {
            if (semester === 0) {
                const noSemesterModules = yearModules.filter(m => m.semester === 0);
                if (this.config.bereicheReihenfolge) {
                    this.config.bereicheReihenfolge.forEach(bereich => {
                        const bereichModules = noSemesterModules.filter(m => m.bereich === bereich);
                        if (bereichModules.length > 0) {
                            this.createBereichSection(yearDiv, bereich, bereichModules);
                        }
                    });
                } else {
                    const moduleContainer = document.createElement('div');
                    moduleContainer.classList.add('module-container');
                    noSemesterModules.forEach(m => this.createModule(m, moduleContainer));
                    yearDiv.appendChild(moduleContainer);
                }
            } else {
                const semesterModules = yearModules.filter(m => m.semester === semester);

                const semesterTitle = document.createElement('div');
                semesterTitle.classList.add('jahr-titel');
                semesterTitle.style.fontSize = '16px';
                semesterTitle.style.marginTop = '15px';
                semesterTitle.textContent = `${semester}. Semester`;
                yearDiv.appendChild(semesterTitle);

                const moduleContainer = document.createElement('div');
                moduleContainer.classList.add('module-container');
                semesterModules.forEach(m => this.createModule(m, moduleContainer));
                yearDiv.appendChild(moduleContainer);
            }
        });
    } else if (yearModules.some(m => m.bereich)) {
        const bereiche = [...new Set(yearModules.map(m => m.bereich).filter(b => b))];

        bereiche.forEach(bereich => {
            const bereichModules = yearModules.filter(m => m.bereich === bereich);
            this.createBereichSection(yearDiv, bereich, bereichModules);
        });

        const ohneBereich = yearModules.filter(m => !m.bereich);
        if (ohneBereich.length > 0) {
            const moduleContainer = document.createElement('div');
            moduleContainer.classList.add('module-container');
            ohneBereich.forEach(m => this.createModule(m, moduleContainer));
            yearDiv.appendChild(moduleContainer);
        }
    } else {
        const moduleContainer = document.createElement('div');
        moduleContainer.classList.add('module-container');
        yearModules.forEach(m => this.createModule(m, moduleContainer));
        yearDiv.appendChild(moduleContainer);
    }

    return yearDiv;
};

StudienplanBase.prototype.createBereichSection = function(container, bereich, modules) {
    const bereichTitle = document.createElement('div');
    bereichTitle.classList.add('bereich-titel');
    bereichTitle.textContent = bereich;
    container.appendChild(bereichTitle);

    const moduleContainer = document.createElement('div');
    moduleContainer.classList.add('module-container');
    modules.forEach(m => this.createModule(m, moduleContainer));
    container.appendChild(moduleContainer);
};
