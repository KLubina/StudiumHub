/* ==== WAHLMODULE CONFIGURATION ==== */
/* Settings and data for the Wahlmodule selection system */

window.StudiengangWahlmoduleConfig = {
    // Wahlmodule data - compatible with Wahlmodule system
    wahlmoduleData: {
        // Fokus-Vertiefungen from masch/vertiefung-data.js
        vertiefungsgebiete: {},

        // Compatibility function for Wahlmodule system
        getAllWahlmoduleData: function() {
            const data = {
                vertiefungsgebiete: {},
                wahlfaecherBereiche: {},
                wahlmoduleBereiche: {}
            };

            // Fokus-Vertiefungen dynamically loaded from separate file
            if (window.MASCH_VertiefungsgebieteModules) {
                const kategorien = [...new Set(
                    window.MASCH_VertiefungsgebieteModules.map(m => m.kategorie_vertiefung)
                )];
                kategorien.forEach(kategorie => {
                    data.vertiefungsgebiete[kategorie] =
                        window.MASCH_VertiefungsgebieteModules.filter(
                            m => m.kategorie_vertiefung === kategorie
                        );
                });
            }

            return data;
        }
    }
};
