/**
 * CONFIG LOADER - Lädt Studiengang-Konfiguration und Daten
 */

window.StudienplanConfigLoader = {
    // Lade Konfiguration für einen Studiengang
    async loadStudiengangConfig(studiengang) {
        try {
            // Alle Programme verwenden das mono-Modell
            const studyModel = 'mono';

            // Lade General-Konfiguration
            const generalConfigPath = `../program-specific/${studyModel}/${studiengang}/standard-config/general-config.js`;
            await this.loadScript(generalConfigPath);

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

            // Lade Color Management Configs falls vorhanden
            const secondCategoriesPath = `../program-specific/${studyModel}/${studiengang}/colormanagement/secondcategories-config.js`;
            try {
                await this.loadScript(secondCategoriesPath);
            } catch (e) {
                // Optional
            }
            const thirdCategoriesPath = `../program-specific/${studyModel}/${studiengang}/colormanagement/thirdcategories-config.js`;
            try {
                await this.loadScript(thirdCategoriesPath);
            } catch (e) {
                // Optional
            }

            // Lade Modul-Daten - versuche zuerst basic-modules-data.js, dann pflichtmodule-data.js als Fallback
            const basicDataPath = `../program-specific/${studyModel}/${studiengang}/data/basic-modules-data.js`;
            try {
                await this.loadScript(basicDataPath);
            } catch (e) {
                // Fallback für ehemalige major-minor Programme: versuche pflichtmodule-data.js zu laden
                const pflichtPath = `../program-specific/${studyModel}/${studiengang}/data/pflichtmodule-data.js`;
                await this.loadScript(pflichtPath);

                // Versuche die Daten zu finden
                if (!window.StudiengangModules) {
                    const base = studiengang.replace(/^.*?-/, '');
                    const candidateKey = base.charAt(0).toUpperCase() + base.slice(1) + 'PflichtmoduleData';
                    if (window[candidateKey]) {
                        window.StudiengangModules = window[candidateKey];
                    } else {
                        const anyKey = Object.keys(window).find(k => /PflichtmoduleData$/.test(k));
                        if (anyKey) {
                            window.StudiengangModules = window[anyKey];
                        }
                    }
                }
            }

            // Lade Modul-Details falls vorhanden (für Module Details Modal)
            // Versuche zuerst basic-modules-details.js, dann pflichtmodule-details.js als Fallback
            try {
                const basicDetailsPath = `../program-specific/${studyModel}/${studiengang}/data/basic-modules-details.js`;
                await this.loadScript(basicDetailsPath);
            } catch (e) {
                // Fallback für ehemalige major-minor Programme
                try {
                    const pflichtDetailsPath = `../program-specific/${studyModel}/${studiengang}/data/pflichtmodule-details.js`;
                    await this.loadScript(pflichtDetailsPath);
                } catch (e2) {
                    // Details sind optional
                }
            }

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

    // Lade ein Script dynamisch (mit Fetch für bessere Fehlerbehandlung)
    async loadScript(src) {
        try {
            const response = await fetch(src, { method: 'HEAD' });
            if (!response.ok) {
                // Datei existiert nicht - ignoriere
                return;
            }
            
            // Lade das Script
            const script = document.createElement('script');
            script.src = src;
            document.head.appendChild(script);
            
            // Warte auf Laden
            await new Promise((resolve, reject) => {
                script.onload = resolve;
                script.onerror = reject;
            });
        } catch (error) {
            // Ignoriere Fehler bei optionalen Scripts
        }
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

        // Initialisiere optionale Module, falls vorhanden (z.B. wenn sie nach DOMContentLoaded geladen wurden)
        try {
            if (window.StudienplanKPCounter && typeof window.StudienplanKPCounter.updateTotalKP === 'function') {
                // KP Counter aktualisieren (berechnet aus gerenderten Modulen)
                window.StudienplanKPCounter.updateTotalKP();
            }

            if (window.StudienplanColorManager && typeof window.StudienplanColorManager.initialize === 'function') {
                // Color Manager initialisieren (erzeugt Selector / Legendeneinträge)
                window.StudienplanColorManager.initialize();
            }
        } catch (e) {
            console.warn('Fehler beim Initialisieren optionaler Module:', e);
        }

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

        if (titleElement) {
            const title = window.StudiengangGeneralConfig?.title || this.getStudiengangName(studiengang);
            titleElement.textContent = title;
        }

        if (subtitleElement) {
            if (window.StudiengangGeneralConfig?.subtitleHtml) {
                subtitleElement.innerHTML = window.StudiengangGeneralConfig.subtitleHtml;
            } else {
                subtitleElement.textContent = 'mind. 180 KP insgesamt';
            }
        }
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