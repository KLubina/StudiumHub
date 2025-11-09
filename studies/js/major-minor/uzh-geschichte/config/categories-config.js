/* ==== CATEGORIES CONFIGURATION ==== */
/* Module categories and their CSS class mappings */

window.StudiengangCategoriesConfig = {
    // Category definitions
    kategorien: [
        { name: "Geschichte (Major)", klasse: "major-geschichte" },
        { name: "Minor", klasse: "minor" },
        { name: "Pflichtmodule", klasse: "pflicht" },
        { name: "Methodenmodule", klasse: "methoden" },
        { name: "Epochenmodule", klasse: "epochen" },
        { name: "Wahlpflichtmodule", klasse: "wahlpflicht" },
        { name: "Bachelor-Arbeit", klasse: "ba-arbeit" }
    ],

    // Category to CSS class mapping
    kategorieZuKlasse: {
        "major-geschichte": "major-geschichte",
        "minor": "minor",
        "pflicht": "pflicht",
        "methoden": "methoden",
        "epochen": "epochen",
        "wahlpflicht": "wahlpflicht",
        "ba-arbeit": "ba-arbeit",
        "propädeutikum": "propaedeutikum",
        "vertiefung": "vertiefung"
    }
};
