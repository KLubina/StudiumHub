/* Wahlmodule Manager - Main Class */

class StudienplanWahlmoduleManager {
    constructor(studienplan) {
        this.studienplan = studienplan;
        this.config = studienplan.config;

        this.wahlmoduleData = this.getWahlmoduleData();
        if (this.wahlmoduleData && typeof this.wahlmoduleData.getAllWahlmoduleData === 'function') {
            try {
                this.wahlmoduleData = this.wahlmoduleData.getAllWahlmoduleData();
                console.log('ℹ️ wahlmoduleData normalized from wrapper via getAllWahlmoduleData()');
            } catch (e) {
                console.warn('⚠️ Failed to normalize wahlmoduleData:', e);
            }
        }
        this.selectedModules = this.loadSelectedModules();

        window.currentStudienplan = studienplan;
    }

    getWahlmoduleData() {
        const result = {};

        try {
            if (this.config && this.config.wahlmoduleData && typeof this.config.wahlmoduleData === 'object') {
                Object.assign(result, this.config.wahlmoduleData);
            }

            const wrappers = [
                window.CSEModuleData,
                window.ITETModuleData,
                window.MSCITETModuleData,
                window.RIGModuleData,
                window.BFHEITModuleData,
                window.HSLUEITModuleData,
                window.HSTModuleData,
                window.SozwiModuleData
            ];
            for (const w of wrappers) {
                if (!w) continue;
                if (typeof w.getAllWahlmoduleData === 'function') {
                    try {
                        const data = w.getAllWahlmoduleData();
                        for (const k of Object.keys(data || {})) {
                            if (result[k] === undefined) result[k] = data[k];
                        }
                    } catch (e) {
                        console.warn('Fehler beim Lesen von wrapper wahlmoduleData', e);
                    }
                } else if (typeof w === 'object') {
                    for (const k of Object.keys(w)) {
                        if (result[k] === undefined) result[k] = w[k];
                    }
                }
            }

            if (window.BFHEITVertiefungsrichtungenData && window.BFHEITVertiefungsrichtungenData.vertiefungsrichtungen) {
                result.vertiefungsrichtungen = window.BFHEITVertiefungsrichtungenData.vertiefungsrichtungen;
            }
            if (window.BFHEITWahlmoduleData && window.BFHEITWahlmoduleData.wahlmoduleBereiche) {
                result.wahlmoduleBereiche = window.BFHEITWahlmoduleData.wahlmoduleBereiche;
            }
            if (window.HSLUEITVertiefungsrichtungenData && window.HSLUEITVertiefungsrichtungenData.vertiefungsrichtungen) {
                result.vertiefungsrichtungen = window.HSLUEITVertiefungsrichtungenData.vertiefungsrichtungen;
            }
            if (window.HSLUEITWahlmoduleData) {
                if (window.HSLUEITWahlmoduleData.erweiterungsmoduleBereiche) {
                    result.erweiterungsmoduleBereiche = window.HSLUEITWahlmoduleData.erweiterungsmoduleBereiche;
                }
                if (window.HSLUEITWahlmoduleData.zusatzmoduleBereiche) {
                    result.zusatzmoduleBereiche = window.HSLUEITWahlmoduleData.zusatzmoduleBereiche;
                }
            }

            if (window.HSTSchwerpunktData && window.HSTSchwerpunktData.schwerpunktBereiche) {
                result.schwerpunktBereiche = window.HSTSchwerpunktData.schwerpunktBereiche;
                if (!result.kernfaecherSchwerpunkte) result.kernfaecherSchwerpunkte = window.HSTSchwerpunktData.schwerpunktBereiche;
            }
            if (window.HSTWahlfaecherData && window.HSTWahlfaecherData.wahlfaecherBereiche) {
                result.wahlfaecherBereiche = window.HSTWahlfaecherData.wahlfaecherBereiche;
            }

        } catch (e) {
            console.error('Fehler beim Zusammenführen der wahlmoduleData:', e);
        }

        if (!result.kernfaecherSchwerpunkte && result.kernfaecher) result.kernfaecherSchwerpunkte = result.kernfaecher;
        if (!result.kernfaecherSchwerpunkte) result.kernfaecherSchwerpunkte = {};

        console.log('🔍 Final wahlmoduleData:', result);
        return result;
    }

    showMessage(message, type = "info") {
        if (this.studienplan.showMessage) {
            this.studienplan.showMessage(message, type);
        } else {
            console.log(`${type}: ${message}`);
        }
    }

    refreshStudienplan() {
        this.showMessage("🔄 Lade Studienplan neu...", "info");
        this.updateStudienplanWithSelection();
        this.showMessage("✅ Studienplan aktualisiert!", "success");
    }

    resetWahlmodule() {
        if (confirm('🔄 Wirklich alle Wahlmodule zurücksetzen?')) {
            this.selectedModules = {};
            this.saveSelectedModules();
            this.updateStudienplanWithSelection();
            this.showMessage('✅ Alle Wahlmodule zurückgesetzt!', 'success');
        }
    }
}

window.StudienplanWahlmoduleManager = StudienplanWahlmoduleManager;
