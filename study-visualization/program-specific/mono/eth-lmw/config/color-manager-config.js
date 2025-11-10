/* ==== COLOR MANAGER CONFIGURATION ==== */
/* Color mode settings for the color manager feature */

window.StudiengangColorManagerConfig = {
    // Available coloring modes
    coloringModes: {
        kategorie: "Kategorien",
        bereich: "Bereichen"
    },

    // Default coloring mode
    defaultColoringMode: "bereich",

    // Bereiche für ColorManager
    bereiche: [
        {
            name: "Natur- und Ingenieurwissenschaften",
            shortName: "Natur/Ing.",
            cssClass: "bereich-natwig",
            color: "#4A90E2",
            requiredKP: 71
        },
        {
            name: "Sozialwissenschaften",
            shortName: "Sozwi",
            cssClass: "bereich-sozwi",
            color: "#F5A623",
            requiredKP: 5
        },
        {
            name: "Lebensmittelwissenschaften",
            shortName: "LMW",
            cssClass: "bereich-lmw",
            color: "#7ED321",
            requiredKP: 83
        }
    ]
};
