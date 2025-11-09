/* ==== WAHLMODULE CONFIGURATION ==== */
/* Settings and data for the Wahlmodule selection system */

window.StudiengangWahlmoduleConfig = {
    // Wahlmodule data - compatible with Wahlmodule system
    wahlmoduleData: {
        // Kernfächer - loaded dynamically
        kernfaecherSchwerpunkte: {},

        // Wahlfächer - loaded dynamically
        wahlfaecherBereiche: {},

        // Praktika/Seminare/Projekte - loaded dynamically
        praktikaSchwerpunkte: {},

        // Compatibility function for Wahlmodule system
        getAllWahlmoduleData: function () {
            const data = {
                kernfaecherSchwerpunkte: {},
                wahlfaecherBereiche: {},
                praktikaSchwerpunkte: {},
                wahlmoduleBereiche: {}
            };

            // Load Kernfächer from ITETModuleData
            if (window.ITETModuleData && window.ITETModuleData.kernfaecherSchwerpunkte) {
                data.kernfaecherSchwerpunkte = window.ITETModuleData.kernfaecherSchwerpunkte;
            }

            // Load Wahlfächer from ITETWahlfaecherData
            if (window.ITETWahlfaecherData && window.ITETWahlfaecherData.wahlfaecherBereiche) {
                data.wahlfaecherBereiche = window.ITETWahlfaecherData.wahlfaecherBereiche;
            }

            // Load Praktika/Seminare/Projekte from ITETPraktikaSeminarProjektData
            if (window.ITETPraktikaSeminarProjektData && window.ITETPraktikaSeminarProjektData.praktikaSchwerpunkte) {
                data.praktikaSchwerpunkte = window.ITETPraktikaSeminarProjektData.praktikaSchwerpunkte;
            }

            return data;
        }
    }
};
