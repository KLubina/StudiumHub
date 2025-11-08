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

StudienplanBase.prototype.createCategoryLayout = function(container) {
    const allModules = this.config.daten;
    
    const categories = [...new Set(allModules.map(m => m.kategorie).filter(k => k))];
    
    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('jahr');
        
        const categoryTitle = document.createElement('div');
        categoryTitle.classList.add('jahr-titel');
        categoryTitle.textContent = category;
        categoryDiv.appendChild(categoryTitle);
        
        const categoryModules = allModules.filter(m => m.kategorie === category);
        
        if (categoryModules.some(m => m.fachgebiet)) {
            const fachgebiete = [...new Set(categoryModules.map(m => m.fachgebiet).filter(f => f))];
            
            fachgebiete.forEach(fachgebiet => {
                const fachgebietLabel = document.createElement('div');
                fachgebietLabel.classList.add('fachgebiet');
                fachgebietLabel.textContent = fachgebiet;
                categoryDiv.appendChild(fachgebietLabel);
                
                const moduleContainer = document.createElement('div');
                moduleContainer.classList.add('module-container');
                
                const fachgebietModules = categoryModules.filter(m => m.fachgebiet === fachgebiet);
                fachgebietModules.forEach(m => this.createModule(m, moduleContainer));
                
                categoryDiv.appendChild(moduleContainer);
            });
            
            const ohneFachgebiet = categoryModules.filter(m => !m.fachgebiet);
            const moduleContainer = document.createElement('div');
            moduleContainer.classList.add('module-container');
            ohneFachgebiet.forEach(m => this.createModule(m, moduleContainer));
            categoryDiv.appendChild(moduleContainer);
        } else {
            const moduleContainer = document.createElement('div');
            moduleContainer.classList.add('module-container');
            categoryModules.forEach(m => this.createModule(m, moduleContainer));
            categoryDiv.appendChild(moduleContainer);
        }
        
        container.appendChild(categoryDiv);
    });
};

// Neues Layout: Erstes Jahr mit Semestern, danach Modulgruppen
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