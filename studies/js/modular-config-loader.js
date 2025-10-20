class StudiengangConfigLoader {
    constructor(studiengang) {
        this.studiengang = studiengang;
        this.config = {};
        this.loadedModules = new Set();
    }

    async loadConfig() {
        const configPath = `js/configs/${this.studiengang}`;
        const dataPath = `js/data/${this.studiengang}`;
        
        await this.loadModule(`${configPath}/base-config.js`);
        
        await this.loadModule(`${dataPath}/basic-modules-data.js`);
        
        await this.loadOptionalModule(`${dataPath}/extensions-data.js`);
        
        await this.loadOptionalModule(`${dataPath}/basic-modules-details.js`);
        
        // FIXED: BFH and HSLU specific data files
        if (this.studiengang === 'bfh-eit') {
            await this.loadOptionalModule(`${dataPath}/vertiefungsrichtungen-data.js`);
            await this.loadOptionalModule(`${dataPath}/wahlmodule-data.js`);
        } else if (this.studiengang === 'hslu-eit') {
            await this.loadOptionalModule(`${dataPath}/vertiefungsrichtungen-data.js`);
            await this.loadOptionalModule(`${dataPath}/wahlmodule-data.js`);
        } else if (this.studiengang === 'msc-itet') {
            // MSc ITET uses kernfächer and vertiefungsfächer data files
            await this.loadOptionalModule(`${dataPath}/kernfacher-data.js`);
            await this.loadOptionalModule(`${dataPath}/vertiefungsfacher-data.js`);
        } else if (this.studiengang === 'hst') {
            // HST uses schwerpunkt and wahlfächer data files
            await this.loadOptionalModule(`${dataPath}/schwerpunkt-data.js`);
            await this.loadOptionalModule(`${dataPath}/wahlfacher-data.js`);
        } else {
            // CSE Wahlmodule-Dateien
            await this.loadOptionalModule(`${dataPath}/vertiefung-data.js`);
            await this.loadOptionalModule(`${dataPath}/wahlfacher-data.js`);
            await this.loadOptionalModule(`${dataPath}/cse-wahlmodule-data.js`);
            
            // ITET Wahlmodule-Dateien
            await this.loadOptionalModule(`${dataPath}/kernfacher-data.js`);
            await this.loadOptionalModule(`${dataPath}/wahlfacher-data.js`);
            await this.loadOptionalModule(`${dataPath}/weitere-wahl-grundlagenfacher-data.js`);
            await this.loadOptionalModule(`${dataPath}/praktika-seminar-projekt-data.js`);
        }
        
        // ColorManager vor extensions.js laden
        await this.loadOptionalModule(`${configPath}/extensions-ColorManager.js`);
        
        // Weitere CSE-spezifische Extensions
        await this.loadOptionalModule(`${configPath}/extensions-GradeCalculator.js`);
        
        await this.loadOptionalModule(`${configPath}/extensions.js`);
        
    // Nach dem Laden aller Module, kombiniere ITET Moduldaten zu einem konsistenten Format
    this.combineModuleData();
        
        this.mergeConfigs();
        
        return this.config;
    }

    async loadModule(url) {
        return new Promise((resolve, reject) => {
            if (this.loadedModules.has(url)) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = url;
            // Sicherstellen, dass dynamisch eingefügte Skripte in Reihenfolge ausgeführt werden
            script.async = false;
            script.onload = () => {
                this.loadedModules.add(url);
                console.log(`✅ Geladen: ${url}`);
                resolve();
            };
            script.onerror = () => {
                reject(new Error(`Fehler beim Laden von ${url}`));
            };
            document.head.appendChild(script);
        });
    }

    async loadOptionalModule(url) {
        try {
            await this.loadModule(url);
        } catch (error) {
            // Optionales Modul fehlt — nur warnen, nicht unterbrechen
            console.warn(`Optionales Modul konnte nicht geladen werden: ${url}`);
        }
    }

    combineModuleData() {
        // Für ITET: Kombiniere separate Datendateien zu window.ITETModuleData falls es noch nicht existiert
        if (this.studiengang === 'itet') {
            if (!window.ITETModuleData || !window.ITETModuleData.getAllWahlmoduleData) {
                // Sammle alle separaten ITET-Daten
                const combinedData = {};
                
                // Kernfächer (bereits in kernfacher-data.js definiert)
                if (window.ITETModuleData && window.ITETModuleData.kernfaecherSchwerpunkte) {
                    combinedData.kernfaecherSchwerpunkte = window.ITETModuleData.kernfaecherSchwerpunkte;
                }
                
                // Wahlfächer von wahlfacher-data.js
                if (window.ITETWahlfaecherData && window.ITETWahlfaecherData.wahlfaecherBereiche) {
                    combinedData.wahlfaecherBereiche = window.ITETWahlfaecherData.wahlfaecherBereiche;
                }
                
                // Weitere Wahl-Grundlagenfächer
                if (window.ITETWeitereWahlGrundlagenData && window.ITETWeitereWahlGrundlagenData.weitereWahlGrundlagen) {
                    combinedData.weitereWahlGrundlagen = window.ITETWeitereWahlGrundlagenData.weitereWahlGrundlagen;
                }
                
                // Praktika-Seminare-Projekte
                if (window.ITETPraktikaSeminarProjektData && window.ITETPraktikaSeminarProjektData.praktikaSchwerpunkte) {
                    combinedData.praktikaSchwerpunkte = window.ITETPraktikaSeminarProjektData.praktikaSchwerpunkte;
                }
                
                // Erstelle oder erweitere window.ITETModuleData mit einer getAllWahlmoduleData Funktion
                if (!window.ITETModuleData) {
                    window.ITETModuleData = {};
                }
                
                // Übertrage alle kombinierten Daten
                Object.assign(window.ITETModuleData, combinedData);
                
                // Füge die erwartete getAllWahlmoduleData Funktion hinzu
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
        } else if (this.studiengang === 'msc-itet') {
            // Für MSc ITET: Kombiniere Kernfächer- und Vertiefungsfächer-Daten in ein konsistentes Wrapper-Objekt
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
    }

    mergeConfigs() {
        
        this.config = { ...window.StudiengangBaseConfig };

        this.config.daten = window.StudiengangModules;

        if (window.StudiengangModuleDetails) {
            this.config.modulDetails = window.StudiengangModuleDetails;
            const detailCount = Object.keys(window.StudiengangModuleDetails).length;
        } else {
            this.config.modulDetails = {};
        }

        if (window.StudiengangExtensions) {
            Object.assign(this.config, window.StudiengangExtensions);
        } 

        if (window.StudiengangCustomClass) {
            window.StudiengangClass = window.StudiengangCustomClass;
        }

        window.StudiengangConfig = this.config;
            }

    async loadFallbackConfig() {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = `js/configs/${this.studiengang}-config.js`;
            script.onload = () => {
                resolve(window.StudiengangConfig);
            };
            script.onerror = () => {
                reject(new Error(`Fallback-Konfiguration für ${this.studiengang} nicht gefunden`));
            };
            document.head.appendChild(script);
        });
    }

    // Hilfsfunktion zum Aufräumen geladener Scripts
    cleanup() {
        this.loadedModules.forEach(url => {
            const scripts = document.querySelectorAll(`script[src="${url}"]`);
            scripts.forEach(script => script.remove());
        });
    }
}

// Globale Funktion für einfache Nutzung
window.loadStudiengangConfig = async function(studiengang) {
	const loader = new StudiengangConfigLoader(studiengang);

	// Sicherstellen, dass DOM bereit ist (z.B. Container existiert)
	if (document.readyState === 'loading') {
		await new Promise(resolve => document.addEventListener('DOMContentLoaded', resolve, { once: true }));
	}

	try {
		const config = await loader.loadConfig();
		initializeStudienplan(config);
		return config;
	} catch (error) {
		console.warn('Fehler beim Laden der modularen Config, versuche Fallback...', error);
		// Versuche Fallback-Konfiguration
		try {
			const fallback = await loader.loadFallbackConfig();
			initializeStudienplan(fallback);
			return fallback;
		} catch (fallbackErr) {
			console.error('Fallback-Konfiguration ebenfalls fehlgeschlagen', fallbackErr);
			throw fallbackErr;
		}
	}
};