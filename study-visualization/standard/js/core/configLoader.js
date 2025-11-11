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
        // Gruppiere Module
        const grouped = window.StudienplanUtils.groupModulesByYearAndSemester(modules);

        // Rendere Layout
        window.StudienplanLayout.renderLayout(grouped);

        // Rendere Legende
        const categories = window.StudienplanUtils.getUniqueCategories(modules);
        window.StudienplanLegend.renderLegend(categories);

        // Setze Titel
        this.setTitles(studiengang);

        console.log('Studienplan gerendert für:', studiengang);
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