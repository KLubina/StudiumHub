/* ==== CATEGORIES CONFIGURATION ==== */
/* Module categories and their CSS class mappings */

window.StudiengangCategoriesConfig = {
    // Category definitions
    kategorien: [
        { name: "Obligatorische Fächer", klasse: "obligatorisch" },
        { name: "Obligatorische Praktikum", klasse: "praktikum" },
        {
            name: "Wahlfächer",
            klasse: "wahl",
            info: "24 ECTS aus Wahlfächern",
            hasTooltip: true
        },
        {
            name: "Fokus-Vertiefung",
            klasse: "vertiefung",
            info: "20 ECTS aus einem der 5 Fokus-Bereiche auswählen",
            hasTooltip: true
        },
        { name: "Wissenschaftliche Arbeit", klasse: "wissenschaft" }
    ]
};
