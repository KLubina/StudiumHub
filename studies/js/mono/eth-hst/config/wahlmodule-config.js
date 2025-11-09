/* ==== WAHLMODULE CONFIGURATION ==== */
/* Settings and data for the Wahlmodule selection system */

window.StudiengangWahlmoduleConfig = {
    // Wahlmodule data - compatible with Wahlmodule system
    wahlmoduleData: {
        // Schwerpunkte - loaded dynamically
        schwerpunktBereiche: {},

        // Wahlfächer - loaded dynamically
        wahlfaecherBereiche: {},

        // Compatibility function for Wahlmodule system
        getAllWahlmoduleData: function () {
            const data = {
                schwerpunktBereiche: {},
                wahlfaecherBereiche: {},
                vertiefungsgebiete: {},
                wahlmoduleBereiche: {}
            };

            // Load Schwerpunkte from HSTSchwerpunktData
            if (window.HSTSchwerpunktData && window.HSTSchwerpunktData.schwerpunktBereiche) {
                data.schwerpunktBereiche = window.HSTSchwerpunktData.schwerpunktBereiche;
            }

            // Load Wahlfächer from HSTWahlfaecherData
            if (window.HSTWahlfaecherData && window.HSTWahlfaecherData.wahlfaecherBereiche) {
                data.wahlfaecherBereiche = window.HSTWahlfaecherData.wahlfaecherBereiche;
            }

            return data;
        }
    }
};
