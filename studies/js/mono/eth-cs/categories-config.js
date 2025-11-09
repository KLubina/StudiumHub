/* ==== CATEGORIES CONFIGURATION ==== */
/* Module categories and their CSS class mappings */

window.StudiengangCategoriesConfig = {
    // Category definitions
    kategorien: [
        { name: "Pure CS-Module", klasse: "cs-pure" },
        { name: "CS und CSE-Module", klasse: "cs-cse" },
        { name: "CS und CSE-Module aufgrund von CSE-Wahlmodule", klasse: "cs-cse-wahl" },
        { name: "Gemeinsame Mathematik-Module", klasse: "math" }
    ],

    // Category to CSS class mapping
    kategorieZuKlasse: {
        "cs-pure": "cs-pure",
        "cs-cse": "cs-cse",
        "cs-cse-wahl": "cs-cse-wahl",
        "math": "math",
        "wahlpflicht": "wahlpflicht",
        "wahlfaecher": "wahlfaecher",
        "wissenschaft": "wissenschaft",
        "algo": "algo",
        "spezialisierung": "spezialisierung",
        "ergaenzung": "ergaenzung"
    }
};
