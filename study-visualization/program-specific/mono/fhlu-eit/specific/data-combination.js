/* ==== HSLU EIT DATA COMBINATION ==== */
/* Kombiniert separate Wahlmodul-Datendateien */

if (window.HSLUEITStudienplan) {
    window.HSLUEITStudienplan.prototype.combineModuleData = function() {
        // Kombiniere separate Datendateien zu window.HSLUEITModuleData
        if (!window.HSLUEITModuleData) {
            window.HSLUEITModuleData = {};
        }
        
        // Vertiefungsrichtungen
        if (window.HSLUEITVertiefungsrichtungenData && window.HSLUEITVertiefungsrichtungenData.vertiefungsrichtungen) {
            window.HSLUEITModuleData.vertiefungsrichtungen = window.HSLUEITVertiefungsrichtungenData.vertiefungsrichtungen;
        }
        
        // Erweiterungsmodule
        if (window.HSLUEITWahlmoduleData && window.HSLUEITWahlmoduleData.erweiterungsmoduleBereiche) {
            window.HSLUEITModuleData.erweiterungsmoduleBereiche = window.HSLUEITWahlmoduleData.erweiterungsmoduleBereiche;
        }
        
        // Zusatzmodule
        if (window.HSLUEITWahlmoduleData && window.HSLUEITWahlmoduleData.zusatzmoduleBereiche) {
            window.HSLUEITModuleData.zusatzmoduleBereiche = window.HSLUEITWahlmoduleData.zusatzmoduleBereiche;
        }
        
        // Füge die erwartete getAllWahlmoduleData Funktion hinzu
        window.HSLUEITModuleData.getAllWahlmoduleData = function() {
            return {
                vertiefungsrichtungen: this.vertiefungsrichtungen || {},
                erweiterungsmoduleBereiche: this.erweiterungsmoduleBereiche || {},
                zusatzmoduleBereiche: this.zusatzmoduleBereiche || {}
            };
        };
        
        console.log('✅ HSLU EIT Moduldaten kombiniert:', window.HSLUEITModuleData);
    };
}
