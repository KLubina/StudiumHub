/**
 * MODULE RENDERING - Modul-Darstellung
 */

window.StudienplanModule = {
    // Erstelle HTML für ein einzelnes Modul
    renderModule(module) {
        const ects = module.ects || 0;
        const category = module.standardcategory || 'unknown';
        const name = module.name || 'Unbekanntes Modul';

        // Berechne Größe basierend auf ECTS (4 ECTS = 100px)
        const baseSize = 100;
        const scale = Math.sqrt(ects / 4);
        const size = baseSize * scale;
        const style = `width: ${size}px; height: ${size}px;`;

        return `
            <div class="modul ${category}" data-ects="${ects}" style="${style}">
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