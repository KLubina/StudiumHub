/**
 * LEGEND - Farben-Legende
 */

window.StudienplanLegend = {
    // Erstelle Legende basierend auf Kategorien
    renderLegend(categories) {
        const legendContainer = document.getElementById('legende');
        if (!legendContainer) return;

        const legendHTML = categories.map(category => `
            <div class="legende-item">
                <div class="legende-color ${category}"></div>
                <div class="legende-text">${this.getCategoryName(category)}</div>
            </div>
        `).join('');

        legendContainer.innerHTML = legendHTML;
    },

    // Übersetze Kategorie-Namen
    getCategoryName(category) {
        const names = {
            'cs-pure': 'Reine Informatik',
            'cs-cse': 'Informatik & CSE',
            'math': 'Mathematik',
            'physics': 'Physik',
            'unknown': 'Unbekannt'
        };
        return names[category] || category;
    }
};

// Markiere als geladen
window.subModulesReady.legend = Promise.resolve();