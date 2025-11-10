/* ==== CATEGORIES CONFIGURATION ==== */
/* Module categories and their CSS class mappings */

window.StudiengangCategoriesConfig = {
    // Category definitions
    kategorien: [
        { name: "Grundlagenfächer", klasse: "grundlagen" },
        { name: "Praktika und Projekte", klasse: "praktika" },
        { name: "Sprachen und Soft Skills", klasse: "sprachen" },
        { 
            name: "Vertiefungsrichtungen", 
            klasse: "vertiefung",
            hasTooltip: true,
            info: "💡 Wähle deine Vertiefungsrichtung!",
            description: "Eine Vertiefungsrichtung auswählen (min. 20 ECTS)",
            minKp: 20
        },
        { 
            name: "Fachliche Wahlmodule", 
            klasse: "wahlmodule",
            hasTooltip: true,
            info: "💡 Wähle deine Wahlmodule!",
            description: "Frei wählbare Module (min. 10, max. 22 ECTS)",
            minKp: 10
        },
        { name: "Abschlussarbeit", klasse: "abschluss" }
    ],

    // Category to CSS class mapping
    kategorieZuKlasse: {
        "Grundlagenfächer": "grundlagen",
        "Praktika und Projekte": "praktika",
        "Sprachen und Soft Skills": "sprachen",
        "Vertiefungsrichtungen": "vertiefung",
        "Fachliche Wahlmodule": "wahlmodule",
        "Abschlussarbeit": "abschluss"
    }
};
