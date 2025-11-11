/**
 * LEGEND - Farben-Legende
 */

window.StudienplanLegend = {
    // Erstelle Legende basierend auf Kategorien
    renderLegend(categories) {
        const legendContainer = document.getElementById('legende');
        if (!legendContainer) return;

        const legendHTML = categories.map(category => `
            <div class="legende-item ${category}">
                <div class="legende-text">${this.getCategoryName(category)}</div>
            </div>
        `).join('');

        legendContainer.innerHTML = legendHTML;
    },

    // Übersetze Kategorie-Namen
    getCategoryName(category) {
        if (window.StudiengangCategoriesConfig && window.StudiengangCategoriesConfig.kategorien) {
            const cat = window.StudiengangCategoriesConfig.kategorien.find(c => c.klasse === category);
            if (cat) return cat.name;
        }

        // Fallback für CSE themenbereiche
        if (window.CSEColorConfig && window.CSEColorConfig.colors && window.CSEColorConfig.colors.themenbereiche[category]) {
            return window.CSEColorConfig.colors.themenbereiche[category].label;
        }

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