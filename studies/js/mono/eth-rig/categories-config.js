/* ==== CATEGORIES CONFIGURATION ==== */
/* Module categories and their CSS class mappings */

window.StudiengangCategoriesConfig = {
    // Category definitions
    kategorien: [
        { name: "Grundlagenfächer Basisprüfung", klasse: "grundlagen" },
        { name: "Obligatorische Fächer, Prüfungsblöcke 1-3", klasse: "obligatorisch" },
        { 
            name: "Wahlmodule (3 aus 6)", 
            klasse: "wahlmodule", 
            hasTooltip: true,
            info: "💡 Wähle 3 aus 6 Bereichen!",
            description: "Drag & Drop Wahlmodule",
            minKp: 45
        },
        { name: "Freie Wahl + SIP", klasse: "freie-wahl" },
        { name: "Selbständige Arbeiten", klasse: "selbstaendig" }
    ],

    // Category to CSS class mapping
    kategorieZuKlasse: {
        "grundlagen": "grundlagen",
        "obligatorisch": "obligatorisch",
        "wahlmodule": "wahlmodule",
        "freie-wahl": "freie-wahl",
        "selbstaendig": "selbstaendig",
        "Grundlagenfächer Basisprüfung": "grundlagen",
        "Obligatorische Fächer, Prüfungsblöcke 1-3": "obligatorisch",
        "Wahlmodule (3 aus 6)": "wahlmodule",
        "Freie Wahl + SIP": "freie-wahl",
        "Selbständige Arbeiten": "selbstaendig"
    }
};
