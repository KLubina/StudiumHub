/* ==== CATEGORIES CONFIGURATION ==== */
/* Module categories and their CSS class mappings */

window.StudiengangCategoriesConfig = {
    // Category definitions
    kategorien: [
        { name: "Obligatorische Fächer", klasse: "obligatorisch" },
        { name: "Obligatorische Praktikum", klasse: "obligatorisch-praktikum" },
        {
            name: "Kernfächer nach Schwerpunkt",
            klasse: "kern",
            hasTooltip: true,
            info: "💡 Wähle deine Kernfächer!",
            description: "Computer und Netzwerk Schwerpunkt",
            minKp: 18
        },
        {
            name: "Weitere Wahl-Grundlagenfächer",
            klasse: "weitere-wahl-grundlagen",
            hasTooltip: true,
            info: "💡 Wähle zusätzliche Grundlagen!",
            description: "Zusätzliche Grundlagenfächer",
            minKp: 8
        },
        {
            name: "Wahlfächer",
            klasse: "wahl",
            hasTooltip: true,
            info: "💡 Wähle deine Wahlfächer!",
            description: "Frei wählbare Module",
            minKp: 6
        },
        {
            name: "Wahl Praktika-Projekte-Seminare",
            klasse: "wahl-praktika-projekte",
            hasTooltip: true,
            info: "💡 Ziehe Module aus der Liste!",
            description: "Wählbare Praktika und Projekte"
        },
        {
            name: "Wissenschaftliche Arbeit",
            klasse: "wissenschaft",
            description: "Bachelorarbeit und SIP"
        }
    ],

    // Category to CSS class mapping
    kategorieZuKlasse: {
        "Obligatorische Fächer": "obligatorisch",
        "Obligatorische Praktikum": "obligatorisch-praktikum",
        "Wahl Praktika-Projekte-Seminare": "wahl-praktika-projekte",
        "Kernfächer nach Schwerpunkt": "kern",
        "Wahlfächer": "wahl",
        "Wissenschaftliche Arbeit": "wissenschaft",
        "Weitere Wahl-Grundlagenfächer": "weitere-wahl-grundlagen"
    }
};
