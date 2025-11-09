/* Module Data Combination Logic */

class ModuleDataCombiner {
    static combineModuleData(studiengang) {
        if (studiengang === 'eth-itet') {
            this.combineITETData();
        } else if (studiengang === 'eth-msc-itet') {
            this.combineMSCITETData();
        }
    }

    static combineITETData() {
        if (!window.ITETModuleData || !window.ITETModuleData.getAllWahlmoduleData) {
            const combinedData = {};

            if (window.ITETModuleData && window.ITETModuleData.kernfaecherSchwerpunkte) {
                combinedData.kernfaecherSchwerpunkte = window.ITETModuleData.kernfaecherSchwerpunkte;
            }

            if (window.ITETWahlfaecherData && window.ITETWahlfaecherData.wahlfaecherBereiche) {
                combinedData.wahlfaecherBereiche = window.ITETWahlfaecherData.wahlfaecherBereiche;
            }

            if (window.ITETWeitereWahlGrundlagenData && window.ITETWeitereWahlGrundlagenData.weitereWahlGrundlagen) {
                combinedData.weitereWahlGrundlagen = window.ITETWeitereWahlGrundlagenData.weitereWahlGrundlagen;
            }

            if (window.ITETPraktikaSeminarProjektData && window.ITETPraktikaSeminarProjektData.praktikaSchwerpunkte) {
                combinedData.praktikaSchwerpunkte = window.ITETPraktikaSeminarProjektData.praktikaSchwerpunkte;
            }

            if (!window.ITETModuleData) {
                window.ITETModuleData = {};
            }

            Object.assign(window.ITETModuleData, combinedData);

            window.ITETModuleData.getAllWahlmoduleData = function() {
                return {
                    kernfaecherSchwerpunkte: this.kernfaecherSchwerpunkte || {},
                    wahlfaecherBereiche: this.wahlfaecherBereiche || {},
                    weitereWahlGrundlagen: this.weitereWahlGrundlagen || [],
                    praktikaSchwerpunkte: this.praktikaSchwerpunkte || {}
                };
            };

            console.log('✅ ITET Moduldaten kombiniert:', window.ITETModuleData);
        }
    }

    static combineMSCITETData() {
        if (!window.MSCITETModuleData || !window.MSCITETModuleData.getAllWahlmoduleData) {
            const combinedMSC = {};

            if (window.MSCITETKernfaecherData && window.MSCITETKernfaecherData.kernfaecherSchwerpunkte) {
                combinedMSC.kernfaecherSchwerpunkte = window.MSCITETKernfaecherData.kernfaecherSchwerpunkte;
            }
            if (window.MSCITETVertiefungsfaecherData && window.MSCITETVertiefungsfaecherData.vertiefungsfaecherBereiche) {
                combinedMSC.vertiefungsfaecherBereiche = window.MSCITETVertiefungsfaecherData.vertiefungsfaecherBereiche;
            }

            window.MSCITETModuleData = {
                ...(window.MSCITETModuleData || {}),
                ...combinedMSC,
            };
            window.MSCITETModuleData.getAllWahlmoduleData = function() {
                return {
                    kernfaecherSchwerpunkte: this.kernfaecherSchwerpunkte || {},
                    vertiefungsfaecherBereiche: this.vertiefungsfaecherBereiche || {}
                };
            };

            console.log('✅ MSc ITET Moduldaten kombiniert:', window.MSCITETModuleData);
        }
    }

    static setupUzhMinorDataAlias(studiengang) {
        if (!window.UzhCommonMinorData) {
            console.warn('UzhCommonMinorData nicht gefunden - Minor-Daten konnten nicht geladen werden');
            return;
        }

        const studiengangToVariableMap = {
            'uzh-polisci': 'UzhPolisciMinorData',
            'uzh-geschichte': 'UzhGeschichteMinorData',
            'uzh-ethnologie': 'UzhEthnologieMinorData',
            'uzh-kommunikation': 'UzhKommunikationMinorData',
            'uzh-pop-kultur': 'UzhPopKulturMinorData',
            'uzh-soziologie': 'UzhSoziologieMinorData'
        };

        const targetVariable = studiengangToVariableMap[studiengang];
        if (targetVariable) {
            window[targetVariable] = window.UzhCommonMinorData;
            console.log(`✅ UZH Minor-Daten aliasiert: UzhCommonMinorData → ${targetVariable}`);
        }
    }
}

window.ModuleDataCombiner = ModuleDataCombiner;
