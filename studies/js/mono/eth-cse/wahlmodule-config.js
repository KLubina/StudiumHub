/* ==== WAHLMODULE CONFIGURATION ==== */
/* Settings and data for the Wahlmodule selection system */

window.StudiengangWahlmoduleConfig = {
    // Wahlmodule data - compatible with Wahlmodule system
    wahlmoduleData: {
        // Kernfächer from cse-wahlmodule-data.js
        kernfaecherSchwerpunkte: {
            Kernfächer: window.CSE_KernfaecherModules || []
        },

        // Vertiefungsgebiete - loaded dynamically
        vertiefungsgebiete: {},

        // Wahlfächer - loaded dynamically
        wahlfaecherBereiche: {},

        // Compatibility function for Wahlmodule system
        getAllWahlmoduleData: function () {
            const data = {
                kernfaecherSchwerpunkte: this.kernfaecherSchwerpunkte,
                vertiefungsgebiete: {},
                wahlfaecherBereiche: {},
                wahlmoduleBereiche: {}
            };

            // Dynamically load Vertiefungsgebiete from separate file
            if (window.CSE_VertiefungsgebieteModules) {
                const kategorien = [
                    ...new Set(
                        window.CSE_VertiefungsgebieteModules.map(
                            (m) => m.kategorie_vertiefung
                        )
                    )
                ];
                kategorien.forEach((kategorie) => {
                    data.vertiefungsgebiete[kategorie] =
                        window.CSE_VertiefungsgebieteModules.filter(
                            (m) => m.kategorie_vertiefung === kategorie
                        );
                });
            }

            // Load Wahlfächer from separate file
            if (window.CSE_WahlfaecherModules) {
                data.wahlfaecherBereiche["Alle Wahlfächer"] =
                    window.CSE_WahlfaecherModules;
            }

            return data;
        }
    }
};
