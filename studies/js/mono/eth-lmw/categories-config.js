/* ==== CATEGORIES CONFIGURATION ==== */
/* Module categories and their CSS class mappings */

window.StudiengangCategoriesConfig = {
    // Category definitions
    kategorien: [
        { name: "Basisprüfung", klasse: "basispruefung" },
        { name: "Zusatzfach Basisjahr", klasse: "zusatzfach" },
        { name: "Obligatorisches Fach", klasse: "obligatorisch" },
        { name: "Grundlagenfach II", klasse: "grundlagenfach" },
        { name: "Weitere Fächer", klasse: "weitere" },
        { name: "Kernfach", klasse: "kernfach" },
        { name: "Fachgrundlage", klasse: "fachgrundlage" },
        {
            name: "Lebensmittelwissenschaftliches Fach",
            klasse: "lmw-fach",
            hasTooltip: true,
            info: "💡 Wählbare Vertiefungsfächer",
            description: "Fachspezifische Module in Lebensmittelchemie, -mikrobiologie, -technologie, -verfahrenstechnik, Ernährung und mehr"
        },
        {
            name: "Laborpraktikum",
            klasse: "praktikum",
            description: "Praktische Laborarbeiten"
        },
        {
            name: "Exkursionen",
            klasse: "exkursion",
            description: "Pflichtexkursionen"
        },
        {
            name: "Wahlfächer",
            klasse: "wahl",
            hasTooltip: true,
            info: "💡 Wähle deine Wahlfächer!",
            description: "Frei wählbare Module aus dem ETH-Angebot"
        },
        {
            name: "Wissenschaft im Kontext",
            klasse: "wik",
            hasTooltip: true,
            info: "ℹ️ 6 KP erforderlich",
            description: "Typ A: Förderung allgemeiner Reflexionsfähigkeiten",
            minKp: 6
        },
        {
            name: "Bachelor-Arbeit",
            klasse: "bachelor-arbeit",
            description: "Abschlussarbeit (15 KP)"
        }
    ],

    // Category to CSS class mapping
    kategorieZuKlasse: {
        "Basisprüfung": "basispruefung",
        "Zusatzfach Basisjahr": "zusatzfach",
        "Obligatorisches Fach": "obligatorisch",
        "Grundlagenfach II": "grundlagenfach",
        "Weitere Fächer": "weitere",
        "Kernfach": "kernfach",
        "Fachgrundlage": "fachgrundlage",
        "Lebensmittelwissenschaftliches Fach": "lmw-fach",
        "Laborpraktikum": "praktikum",
        "Exkursionen": "exkursion",
        "Wahlfächer": "wahl",
        "Wissenschaft im Kontext": "wik",
        "Bachelor-Arbeit": "bachelor-arbeit"
    }
};
