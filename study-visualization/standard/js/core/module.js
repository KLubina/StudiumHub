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

        // Platzhalter-Module speziell markieren
        let placeholderClass = '';
        let wahlmodulSourceAttr = '';
        if (module.isPlaceholder && module.wahlmodulSource) {
            placeholderClass = 'modul-platzhalter';
            wahlmodulSourceAttr = `data-wahlmodul-source="${module.wahlmodulSource}"`;
        }

        return `
            <div class="modul ${category} ${placeholderClass}" data-ects="${ects}" style="${style}" ${wahlmodulSourceAttr}>
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