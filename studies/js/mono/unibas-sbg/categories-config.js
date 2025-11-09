/* ==== CATEGORIES CONFIGURATION ==== */
/* Module categories and their CSS class mappings */

window.StudiengangCategoriesConfig = {
    // Category definitions
    kategorien: [
        {
            name: "Grundlagenmodule",
            klasse: "grundlagen",
            description: "62 ECTS - Pflichtmodule"
        },
        {
            name: "Vertiefungsmodule",
            klasse: "vertiefung",
            description: "74 ECTS - Pflichtmodule"
        },
        {
            name: "Profilmodul",
            klasse: "profil",
            hasTooltip: true,
            info: "💡 Wähle dein Profilmodul!",
            description: "24 ECTS - Spezialisierung",
            minKp: 24
        },
        {
            name: "Wahlbereich",
            klasse: "wahl",
            hasTooltip: true,
            info: "💡 Wähle deine Wahlfächer!",
            description: "20 ECTS - Frei wählbare Module",
            minKp: 20
        }
    ],

    // Category to CSS class mapping
    kategorieZuKlasse: {
        "Grundlagenmodule": "grundlagen",
        "Vertiefungsmodule": "vertiefung",
        "Profilmodul": "profil",
        "Wahlbereich": "wahl"
    }
};
