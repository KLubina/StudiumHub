/**
 * LAYOUT - Layout-Rendering für Jahre und Semester
 */

window.StudienplanLayout = {
    // Rendere das gesamte Studienplan-Layout
    renderLayout(groupedModules) {
        const container = document.getElementById('studienplan');
        if (!container) return;

        const years = Object.keys(groupedModules).sort((a, b) => a - b);
        const layoutHTML = years.map(year => this.renderYear(year, groupedModules[year])).join('');

        container.innerHTML = layoutHTML;
    },

    // Rendere ein Jahr
    renderYear(year, semesters) {
        const semesterKeys = Object.keys(semesters).sort((a, b) => a - b);
        const yearHTML = semesterKeys.map(semester => this.renderSemester(year, semester, semesters[semester])).join('');

        return `
            <div class="jahr" data-year="${year}">
                <h3 class="year-title">${year}. Jahr</h3>
                ${yearHTML}
            </div>
        `;
    },

    // Rendere ein Semester
    renderSemester(year, semester, modules) {
        const semesterName = semester % 2 === 1 ? 'Herbstsemester' : 'Frühlingssemester';
        const modulesHTML = window.StudienplanModule.renderSemesterModules(modules);

        return `
            <div class="semester" data-year="${year}" data-semester="${semester}">
                <h4 class="semester-title">${semesterName}</h4>
                <div class="module-container">
                    ${modulesHTML}
                </div>
            </div>
        `;
    }
};

// Markiere als geladen
window.subModulesReady.layout = Promise.resolve();