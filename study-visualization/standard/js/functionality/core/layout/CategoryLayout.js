/* Category-Based Layout */

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
