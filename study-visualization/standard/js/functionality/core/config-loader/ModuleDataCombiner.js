/* Module Data Combination Logic */

class ModuleDataCombiner {
    static combineModuleData(studiengang) {
        if (studiengang === 'eth-itet') {
            this.combineITETData();
        } else if (studiengang === 'eth-msc-itet') {
            this.combineMSCITETData();
        } else if (studiengang.startsWith('uzh-')) {
            this.combineUZHData(studiengang);
        }
    }

    static combineITETData() {
        console.log('🔧 combineITETData called - checking data availability...');
        console.log('  - window.ITETModuleData exists:', !!window.ITETModuleData);
        console.log('  - window.ITETWahlfaecherData exists:', !!window.ITETWahlfaecherData);
        console.log('  - window.ITETWeitereWahlGrundlagenData exists:', !!window.ITETWeitereWahlGrundlagenData);
        console.log('  - window.ITETPraktikaSeminarProjektData exists:', !!window.ITETPraktikaSeminarProjektData);

        if (!window.ITETModuleData || !window.ITETModuleData.getAllWahlmoduleData) {
            const combinedData = {};

            if (window.ITETModuleData && window.ITETModuleData.kernfaecherSchwerpunkte) {
                combinedData.kernfaecherSchwerpunkte = window.ITETModuleData.kernfaecherSchwerpunkte;
                console.log('  ✓ Added kernfaecherSchwerpunkte');
            }

            if (window.ITETWahlfaecherData && window.ITETWahlfaecherData.wahlfaecherBereiche) {
                combinedData.wahlfaecherBereiche = window.ITETWahlfaecherData.wahlfaecherBereiche;
                console.log('  ✓ Added wahlfaecherBereiche');
            }

            if (window.ITETWeitereWahlGrundlagenData && window.ITETWeitereWahlGrundlagenData.weitereWahlGrundlagen) {
                combinedData.weitereWahlGrundlagen = window.ITETWeitereWahlGrundlagenData.weitereWahlGrundlagen;
                console.log('  ✓ Added weitereWahlGrundlagen');
            }

            if (window.ITETPraktikaSeminarProjektData && window.ITETPraktikaSeminarProjektData.praktikaSchwerpunkte) {
                combinedData.praktikaSchwerpunkte = window.ITETPraktikaSeminarProjektData.praktikaSchwerpunkte;
                console.log('  ✓ Added praktikaSchwerpunkte');
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
        } else {
            console.log('⏭️  ITET Moduldaten bereits kombiniert, überspringe Kombination');
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

    static combineUZHData(studiengang) {
        console.log('🔧 combineUZHData called for:', studiengang);
        
        // Map studiengang to variable prefix
        const prefixMap = {
            'uzh-polisci': 'Polisci',
            'uzh-geschichte': 'Geschichte',
            'uzh-ethnologie': 'Ethnologie',
            'uzh-kommunikation': 'Kommunikation',
            'uzh-pop-kultur': 'PopKultur',
            'uzh-soziologie': 'Soziologie'
        };
        
        const prefix = prefixMap[studiengang];
        if (!prefix) return;
        
        // Get the three data sources
        const pflichtData = window[`${prefix}PflichtmoduleData`];
        const wahlpflichtData = window[`${prefix}WahlpflichtmoduleData`];
        const wahlData = window[`${prefix}WahlmoduleData`];
        
        console.log(`📦 Daten gefunden:`, {
            pflicht: !!pflichtData,
            wahlpflicht: !!wahlpflichtData,
            wahl: !!wahlData
        });
        
        // Simple solution: collect all modules into one flat array
        const allModules = [];
        
        // Extract from nested structure (fs2026/hs2025)
        if (pflichtData) {
            if (pflichtData.fs2026?.pflichtmodule) allModules.push(...pflichtData.fs2026.pflichtmodule);
            if (pflichtData.hs2025?.pflichtmodule) allModules.push(...pflichtData.hs2025.pflichtmodule);
        }
        
        if (wahlpflichtData) {
            if (wahlpflichtData.fs2026?.wahlpflichtmodule) allModules.push(...wahlpflichtData.fs2026.wahlpflichtmodule);
            if (wahlpflichtData.hs2025?.wahlpflichtmodule) allModules.push(...wahlpflichtData.hs2025.wahlpflichtmodule);
        }
        
        if (wahlData) {
            if (wahlData.fs2026?.wahlmodule) allModules.push(...wahlData.fs2026.wahlmodule);
            if (wahlData.hs2025?.wahlmodule) allModules.push(...wahlData.hs2025.wahlmodule);
        }
        
        console.log(`✅ Total modules combined: ${allModules.length}`);
        
        // Store in window.studiengangConfig.daten
        if (!window.studiengangConfig) window.studiengangConfig = {};
        window.studiengangConfig.daten = allModules;
        
        console.log('✅ UZH Daten kombiniert in studiengangConfig.daten');
    }
}

window.ModuleDataCombiner = ModuleDataCombiner;
