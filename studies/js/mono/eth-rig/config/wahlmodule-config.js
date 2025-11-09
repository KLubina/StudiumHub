/* ==== WAHLMODULE CONFIGURATION ==== */
/* Settings and data for the Wahlmodule selection system */

window.StudiengangWahlmoduleConfig = {
    // Wahlmodule data - compatible with Wahlmodule system
    wahlmoduleData: {
        // Wahlmodule - loaded dynamically
        wahlmoduleBereiche: {},

        // Compatibility function for Wahlmodule system
        getAllWahlmoduleData: function () {
            const data = {
                wahlmoduleBereiche: {},
                vertiefungsgebiete: {},
                wahlfaecherBereiche: {}
            };

            // Load Wahlmodule from RIGModuleData
            if (window.RIGModuleData && window.RIGModuleData.wahlmoduleBereiche) {
                data.wahlmoduleBereiche = window.RIGModuleData.wahlmoduleBereiche;
            }

            return data;
        }
    }
};
