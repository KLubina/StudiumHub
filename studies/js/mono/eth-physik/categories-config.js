/* ==== CATEGORIES CONFIGURATION ==== */
/* Module categories and their CSS class mappings */

window.StudiengangCategoriesConfig = {
    // Category definitions
    kategorien: [
        { name: "Basisprüfungsblock 1", klasse: "basis1" },
        { name: "Basisprüfungsblock 2", klasse: "basis2" },
        { name: "Prüfungsblock I", klasse: "pruefung1" },
        { name: "Prüfungsblock IIa", klasse: "pruefung2a" },
        { name: "Prüfungsblock IIb", klasse: "pruefung2b" },
        { name: "Obligatorische Fächer", klasse: "obligatorisch" },
        { name: "Praktika", klasse: "praktikum" },
        {
            name: "Kernfächer",
            klasse: "kernfach",
            info: "Experimentalphysikalische und theoretische Kernfächer",
            hasTooltip: true
        },
        {
            name: "Wahlfächer",
            klasse: "wahl",
            info: "Wahlfächer aus dem Physik- oder verwandten Bereichen",
            hasTooltip: true
        },
        { name: "Wissenschaft im Kontext", klasse: "gess" },
        { name: "Wissenschaftliche Arbeit", klasse: "wissenschaft" }
    ],

    // Category to CSS class mapping
    kategorieZuKlasse: {
        "Basisprüfungsblock 1": "basis1",
        "Basisprüfungsblock 2": "basis2",
        "Prüfungsblock I": "pruefung1",
        "Prüfungsblock IIa": "pruefung2a",
        "Prüfungsblock IIb": "pruefung2b",
        "Obligatorische Fächer": "obligatorisch",
        "Praktika": "praktikum",
        "Kernfächer": "kernfach",
        "Wahlfächer": "wahl",
        "Wissenschaft im Kontext": "gess",
        "Wissenschaftliche Arbeit": "wissenschaft"
    }
};
