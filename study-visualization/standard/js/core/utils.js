/**
 * UTILS - Hilfsfunktionen
 */

window.StudienplanUtils = {
    // Gruppiere Module nach Jahr und Semester
    groupModulesByYearAndSemester(modules) {
        const grouped = {};
        modules.forEach(module => {
            const year = module.year;
            const semester = module.semester;
            if (!grouped[year]) grouped[year] = {};
            if (!grouped[year][semester]) grouped[year][semester] = [];
            grouped[year][semester].push(module);
        });
        return grouped;
    },

    // Sammle einzigartige Kategorien
    getUniqueCategories(modules) {
        const categories = new Set();
        modules.forEach(module => {
            if (module.standardcategory) {
                categories.add(module.standardcategory);
            }
        });
        return Array.from(categories);
    },

    // Berechne Gesamt ECTS
    calculateTotalECTS(modules) {
        return modules.reduce((total, module) => total + (module.ects || 0), 0);
    },

    // Erstelle URL für Studiengang
    createStudiengangURL(studiengang) {
        return `?studiengang=${encodeURIComponent(studiengang)}`;
    }
};

// Markiere als geladen
window.subModulesReady.utils = Promise.resolve();