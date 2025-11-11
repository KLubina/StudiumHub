/**
 * CONFIG LOADER - Lädt Studiengang-Konfiguration und Daten
 */

window.StudienplanConfigLoader = {
    // Lade Konfiguration für einen Studiengang
    async loadStudiengangConfig(studiengang) {
        try {
            // Bestimme Modell (mono oder major-minor)
            const majorMinorPrograms = ['sozwi', 'uzh-geschichte', 'uzh-polisci', 'uzh-ethnologie',
                                        'uzh-kommunikation', 'uzh-pop-kultur', 'uzh-soziologie'];
            const studyModel = majorMinorPrograms.includes(studiengang) ? 'major-minor' : 'mono';

            // Lade Kategorien-Konfiguration
            const categoriesConfigPath = `../program-specific/${studyModel}/${studiengang}/standard-config/standardcategories-config.js`;
            await this.loadScript(categoriesConfigPath);

            // Lade Color-Config falls vorhanden (für CSE)
            const colorConfigPath = `../program-specific/${studyModel}/${studiengang}/standard-config/color-config.js`;
            try {
                await this.loadScript(colorConfigPath);
            } catch (e) {
                // Color-Config ist optional
            }

            // Lade Modul-Daten
            const dataPath = `../program-specific/${studyModel}/${studiengang}/data/basic-modules-data.js`;
            await this.loadScript(dataPath);

            // Wenn Daten geladen, rendere den Studienplan
            if (window.StudiengangModules) {
                this.renderStudiengang(window.StudiengangModules, studiengang);
            } else {
                console.error('Keine Modul-Daten gefunden für:', studiengang);
            }
        } catch (error) {
            console.error('Fehler beim Laden der Konfiguration:', error);
        }
    },

    // Lade ein Script dynamisch
    loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    },

    // Rendere den Studienplan
    renderStudiengang(modules, studiengang) {
        // Mappe Kategorien zu CSS-Klassen
        const mappedModules = this.mapCategoriesToClasses(modules);

        // Gruppiere Module
        const grouped = window.StudienplanUtils.groupModulesByYearAndSemester(mappedModules);

        // Rendere Layout
        window.StudienplanLayout.renderLayout(grouped);

        // Rendere Legende
        const categories = window.StudienplanUtils.getUniqueCategories(mappedModules);
        window.StudienplanLegend.renderLegend(categories);

        // Setze Titel
        this.setTitles(studiengang);

        console.log('Studienplan gerendert für:', studiengang);
    },

    // Mappe standardcategory zu CSS-Klasse
    mapCategoriesToClasses(modules) {
        if (!window.StudiengangCategoriesConfig || !window.StudiengangCategoriesConfig.kategorien) {
            // Fallback: verwende color-config falls vorhanden, sonst vereinfache
            return modules.map(module => ({
                ...module,
                standardcategory: this.getCategoryFromColorConfig(module) || this.simplifyCategory(module.standardcategory)
            }));
        }

        const categoryMap = {};
        window.StudiengangCategoriesConfig.kategorien.forEach(cat => {
            categoryMap[cat.name] = cat.klasse;
        });

        return modules.map(module => ({
            ...module,
            standardcategory: categoryMap[module.standardcategory] || this.getCategoryFromColorConfig(module) || this.simplifyCategory(module.standardcategory)
        }));
    },

    // Hole Kategorie aus color-config (für CSE)
    getCategoryFromColorConfig(module) {
        if (window.CSEColorConfig && window.CSEColorConfig.getThemenbereich) {
            const themenbereich = window.CSEColorConfig.getThemenbereich(module.name);
            return themenbereich;
        }
        return null;
    },

    // Vereinfache Kategorie-Name zu CSS-Klasse
    simplifyCategory(category) {
        if (!category) return 'unknown';
        return category.toLowerCase()
            .replace(/obligatorische\s+/g, '')
            .replace(/fächer/g, '')
            .replace(/praktikum/g, 'praktikum')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
    },

    // Setze Titel und Untertitel
    setTitles(studiengang) {
        const titleElement = document.getElementById('studienplan-title');
        const subtitleElement = document.getElementById('studienplan-subtitle');

        if (titleElement) titleElement.textContent = this.getStudiengangName(studiengang);
        if (subtitleElement) subtitleElement.textContent = 'mind. 180 KP insgesamt';
    },

    // Übersetze Studiengang-Namen
    getStudiengangName(studiengang) {
        const names = {
            'eth-cs': 'Informatik',
            'eth-cse': 'Computer Science and Engineering',
            // Füge weitere hinzu...
        };
        return names[studiengang] || studiengang.toUpperCase();
    }
};

// Mache Funktion global verfügbar
window.loadStudiengangConfig = window.StudienplanConfigLoader.loadStudiengangConfig.bind(window.StudienplanConfigLoader);

// Markiere als geladen
window.subModulesReady.configLoader = Promise.resolve();