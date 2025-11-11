/* ==== CATEGORIES CONFIGURATION ==== */
/* Module categories and their CSS class mappings */

window.StudiengangCategoriesConfig = {
    // Category definitions
    kategorien: [
        { name: "Basisprüfungsblock 1", klasse: "basispruefung-bp1" },
        { name: "Basisprüfungsblock 2", klasse: "basispruefung-bp2" },
        { name: "Praktikum des Basisjahres", klasse: "praktikum-basisjahr" },
        { 
            name: "Einzelfächer und Praktika", 
            klasse: "einzelfaecher-praktika", 
            description: "Laborpraktika und einzelne praktische Veranstaltungen" 
        },
        { name: "Kernfächer Block A", klasse: "block-ka" },
        { name: "Kernfächer Block B", klasse: "block-kb" },
        { name: "Kernfächer Block C", klasse: "block-kc" },
        {
            name: "Schwerpunktfächer",
            klasse: "schwerpunkt",
            hasTooltip: true,
            info: "💡 Wähle deinen Schwerpunkt!",
            description: "Vertiefungen: Neurosciences, Medical Technology, Molecular Health Sciences, Human Movement Science and Sport"
        },
        {
            name: "Wahlfächer",
            klasse: "wahl",
            hasTooltip: true,
            info: "💡 Wähle deine Wahlfächer!",
            description: "Frei wählbare Module",
            minKp: 15
        },
        {
            name: "Wissenschaftliche Arbeit",
            klasse: "wissenschaft",
            description: "Bachelorarbeit"
        }
    ]
};
