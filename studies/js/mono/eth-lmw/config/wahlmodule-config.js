/* ==== WAHLMODULE CONFIGURATION ==== */
/* Settings and data for the Wahlmodule selection system */

window.StudiengangWahlmoduleConfig = {
    // Wahlmodule data - compatible with Wahlmodule system
    wahlmoduleData: {
        // Wahlfächer - to be populated when data is available
        wahlfaecherBereiche: {},

        // Compatibility function for Wahlmodule system
        getAllWahlmoduleData: function () {
            const data = {
                wahlfaecherBereiche: {},
                vertiefungsgebiete: {},
                wahlmoduleBereiche: {}
            };

            // Load Wahlfächer from LMWModuleData when available
            if (window.LMWModuleData && window.LMWModuleData.wahlfaecherBereiche) {
                data.wahlfaecherBereiche = window.LMWModuleData.wahlfaecherBereiche;
            }

            return data;
        }
    }
};
