/* ==== BFH EIT DATA COMBINATION ==== */
/* Kombiniert separate Wahlmodul-Datendateien */

if (window.BFHEITStudienplan) {
    window.BFHEITStudienplan.prototype.combineModuleData = function() {
        // Kombiniere separate Datendateien zu window.BFHEITModuleData
        if (!window.BFHEITModuleData) {
            window.BFHEITModuleData = {};
        }
        
        // Vertiefungsrichtungen
        if (window.BFHEITVertiefungsrichtungenData && window.BFHEITVertiefungsrichtungenData.vertiefungsrichtungen) {
            window.BFHEITModuleData.vertiefungsrichtungen = window.BFHEITVertiefungsrichtungenData.vertiefungsrichtungen;
        }
        
        // Wahlmodule
        if (window.BFHEITWahlmoduleData && window.BFHEITWahlmoduleData.wahlmoduleBereiche) {
            window.BFHEITModuleData.wahlmoduleBereiche = window.BFHEITWahlmoduleData.wahlmoduleBereiche;
        }
        
        // Füge die erwartete getAllWahlmoduleData Funktion hinzu
        window.BFHEITModuleData.getAllWahlmoduleData = function() {
            return {
                vertiefungsrichtungen: this.vertiefungsrichtungen || {},
                wahlmoduleBereiche: this.wahlmoduleBereiche || {}
            };
        };
        
        console.log('✅ BFH EIT Moduldaten kombiniert:', window.BFHEITModuleData);
    };
}
