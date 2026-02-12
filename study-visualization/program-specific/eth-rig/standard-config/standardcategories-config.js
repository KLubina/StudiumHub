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
    ]
};
