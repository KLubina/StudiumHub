/* ==== CATEGORIES CONFIGURATION ==== */
/* Module categories and their CSS class mappings */

window.StudiengangCategoriesConfig = {
    // Category definitions
    kategorien: [
        { name: "Fixe Module", klasse: "obligatorisch" },
        { 
            name: "Kernfächer", 
            klasse: "kern",
            hasTooltip: true,
            info: "💡 Wähle deine Kernfächer!",
            description: "Mind. 24 KP",
            minKp: 24
        },
        { 
            name: "Vertiefungsfächer", 
            klasse: "vertiefung",
            hasTooltip: true,
            info: "💡 Wähle deine Vertiefungsfächer!",
            description: "Mind. 40 KP",
            minKp: 40
        }
    ],

    // Category to CSS class mapping
    kategorieZuKlasse: {
        "Fixe Module": "obligatorisch",
        "Kernfächer": "kern",
        "Vertiefungsfächer": "vertiefung"
    }
};
