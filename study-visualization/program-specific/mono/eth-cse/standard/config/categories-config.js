/* ==== CATEGORIES CONFIGURATION ==== */
/* Module categories and their CSS class mappings */

window.StudiengangCategoriesConfig = {
    // Category definitions
    kategorien: [
        { name: "Wissenschaftliche Arbeit", klasse: "wissenschaftliche-arbeit" },
        {
            name: "Kernfächer",
            klasse: "kern",
            info: "3 von 4 möglichen auswählen",
            hasTooltip: true
        },
        {
            name: "Wahlfächer",
            klasse: "wahl",
            info: "mind. zwei Module",
            hasTooltip: true
        },
        {
            name: "Vertiefungsgebiet",
            klasse: "vertiefung",
            info: "2 Module aus einem Gebiet auswählen",
            hasTooltip: true
        }
    ],

    // Category to CSS class mapping
    kategorieZuKlasse: {
        "wissenschaftliche-arbeit": "wissenschaftliche-arbeit",
        kern: "kern",
        wahl: "wahl",
        vertiefung: "vertiefung"
    }
};
