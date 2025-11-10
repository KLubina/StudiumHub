/* ==== CATEGORIES CONFIGURATION ==== */
/* Module categories and their CSS class mappings */

window.StudiengangCategoriesConfig = {
    // Category definitions
    kategorien: [
        { name: "Grundlagenfächer", klasse: "grundlagen" },
        { name: "Elektrotechnik und Elektronik", klasse: "elektrotechnik" },
        { name: "Informatik und Programmierung", klasse: "informatik" },
        { name: "Produktentwicklung und Projekte", klasse: "projekte" },
        { name: "Kontextstudium", klasse: "kontext" },
        { 
            name: "Vertiefungsrichtungen", 
            klasse: "vertiefung",
            hasTooltip: true,
            info: "💡 Wähle deine Vertiefungsrichtung!",
            description: "Eine Vertiefungsrichtung auswählen (9 ECTS)",
            minKp: 9
        },
        { 
            name: "Erweiterungsmodule", 
            klasse: "erweiterung",
            hasTooltip: true,
            info: "💡 Wähle deine Erweiterungsmodule!",
            description: "Mindestens 15 ECTS",
            minKp: 15
        },
        { 
            name: "Zusatzmodule", 
            klasse: "zusatz",
            hasTooltip: true,
            info: "💡 Wähle deine Zusatzmodule!",
            description: "Mindestens 15 ECTS",
            minKp: 15
        },
        { name: "Abschlussarbeit", klasse: "abschluss" }
    ]
};
