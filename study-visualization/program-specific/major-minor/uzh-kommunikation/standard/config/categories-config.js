/* ==== CATEGORIES CONFIGURATION ==== */
/* Module categories and their CSS class mappings */

window.StudiengangCategoriesConfig = {
    // Category definitions
    kategorien: [
        { name: "Kommunikationswissenschaft (Major)", klasse: "major-komm" },
        { name: "Minor", klasse: "minor" },
        { name: "Pflichtmodule", klasse: "pflicht" },
        { name: "Methodenmodule", klasse: "methoden" },
        { name: "Wahlpflichtmodule", klasse: "wahlpflicht" },
        { name: "Bachelor-Arbeit", klasse: "ba-arbeit" }
    ],

    // Category to CSS class mapping
    kategorieZuKlasse: {
        "major-komm": "major-komm",
        "minor": "minor",
        "pflicht": "pflicht",
        "methoden": "methoden",
        "wahlpflicht": "wahlpflicht",
        "ba-arbeit": "ba-arbeit",
        "vertiefung": "vertiefung"
    }
};
