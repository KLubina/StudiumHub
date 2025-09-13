/* ==== CSE WAHLMODULE DATA ==== */
/* Zentrale Daten für Wahlmodule/Kernfächer für CSE (wird vom Wahlmodule-Manager gelesen) */

// Provide a wrapper similar to other module-data objects used by the manager
window.CSEModuleData = {
    getAllWahlmoduleData: function() {
        return {
            // Key expected by the Wahlmodule manager
            kernfaecherSchwerpunkte: {
                "Alle Kernfächer": [
                    {
                        name: "Design of High Performance Computing",
                        kp: 7,
                        kategorie: "kern",
                        themenbereich: "informatik",
                        jahr: 3,
                        semester: 0,
                        bereich: "Kernfächer"
                    },
                    {
                        name: "HPC Lab for CSE",
                        kp: 7,
                        kategorie: "kern",
                        themenbereich: "informatik",
                        jahr: 3,
                        semester: 0,
                        bereich: "Kernfächer"
                    },
                    {
                        name: "Software Engineering",
                        kp: 6,
                        kategorie: "kern",
                        themenbereich: "informatik",
                        jahr: 3,
                        semester: 0,
                        bereich: "Kernfächer"
                    },
                    {
                        name: "Introduction to Machine Learning",
                        kp: 8,
                        kategorie: "kern",
                        themenbereich: "informatik",
                        jahr: 3,
                        semester: 0,
                        bereich: "Kernfächer"
                    }
                ]
            },
            // Keep other expected keys empty for now (can be filled later)
            vertiefungsgebiete: {},
            wahlfaecherBereiche: {},
            wahlmoduleBereiche: {}
        };
    }
};
