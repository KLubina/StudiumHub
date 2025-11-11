/**
 * MODULE RENDERING - Modul-Darstellung
 */

window.StudienplanModule = {
    // Erstelle HTML für ein einzelnes Modul
    renderModule(module) {
        const ects = module.ects || 0;
        const category = module.standardcategory || 'unknown';
        const name = module.name || 'Unbekanntes Modul';

        return `
            <div class="modul ${category}" data-ects="${ects}">
                <div class="modul-titel">${name}</div>
                <div class="modul-kp">${ects} KP</div>
            </div>
        `;
    },

    // Erstelle HTML für eine Semester-Liste von Modulen
    renderSemesterModules(modules) {
        return modules.map(module => this.renderModule(module)).join('');
    }
};

// Markiere als geladen
window.subModulesReady.module = Promise.resolve();