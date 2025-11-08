class StudiengangConfigLoader {
    constructor(studiengang) {
        this.studiengang = studiengang;
        this.config = {};
        this.loadedModules = new Set();
        // Bestimme ob major-minor oder mono Modell
        this.studyModel = this.getStudyModel(studiengang);
    }

    getStudyModel(studiengang) {
        // Studiengänge mit major-minor System
        const majorMinorPrograms = [
            'sozwi',
            'uzh-polisci',
            'uzh-geschichte',
            'uzh-ethnologie',
            'uzh-kommunikation',
            'uzh-pop-kultur',
            'uzh-soziologie'
        ];
        return majorMinorPrograms.includes(studiengang) ? 'major-minor' : 'mono';
    }

    async loadConfig() {
        const configPath = `js/${this.studyModel}/configs/${this.studiengang}`;
        const dataPath = `js/${this.studyModel}/data/${this.studiengang}`;
        
        await this.loadModule(`${configPath}/base-config.js`);
        
        await this.loadModule(`${dataPath}/basic-modules-data.js`);
        
        await this.loadOptionalModule(`${dataPath}/extensions-data.js`);
        
        await this.loadOptionalModule(`${dataPath}/basic-modules-details.js`);
        
        // FIXED: BFH and HSLU specific data files
        if (this.studiengang === 'fhbern-eit') {
            await this.loadOptionalModule(`${dataPath}/vertiefungsrichtungen-data.js`);
            await this.loadOptionalModule(`${dataPath}/wahlmodule-data.js`);
        } else if (this.studiengang === 'fhlu-eit') {
            await this.loadOptionalModule(`${dataPath}/vertiefungsrichtungen-data.js`);
            await this.loadOptionalModule(`${dataPath}/wahlmodule-data.js`);
        } else if (this.studiengang === 'eth-msc-itet') {
            // MSc ITET uses kernfächer and vertiefungsfächer data files
            await this.loadOptionalModule(`${dataPath}/kernfacher-data.js`);
            await this.loadOptionalModule(`${dataPath}/vertiefungsfacher-data.js`);
        } else if (this.studiengang === 'eth-hst') {
            // HST uses schwerpunkt and wahlfächer data files
            await this.loadOptionalModule(`${dataPath}/schwerpunkt-data.js`);
            await this.loadOptionalModule(`${dataPath}/wahlfacher-data.js`);
        } else if (this.studiengang === 'sozwi') {
            // Sozialwissenschaften uses major and minor data files
            // Load major-specific modules first (vor major-data.js)
            await this.loadOptionalModule(`${dataPath}/ethnologie-modules-data.js`);
            await this.loadOptionalModule(`${dataPath}/kommunikationswissenschaft-modules-data.js`);
            await this.loadOptionalModule(`${dataPath}/politikwissenschaft-modules-data.js`);
            await this.loadOptionalModule(`${dataPath}/major-data.js`);
            await this.loadOptionalModule(`${dataPath}/minor-data.js`);
        } else if (['uzh-polisci', 'uzh-geschichte', 'uzh-ethnologie', 'uzh-kommunikation', 'uzh-pop-kultur', 'uzh-soziologie'].includes(this.studiengang)) {
            // UZH Major/Minor programs: Load major and minor data files
            await this.loadOptionalModule(`${dataPath}/major-data.js`);

            // Load common UZH minor data (shared across all UZH programs)
            await this.loadOptionalModule(`js/${this.studyModel}/data/uzh-common/minor-data.js`);

            // Create program-specific alias for the common minor data
            this.setupUzhMinorDataAlias();
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
            // Do a quick fetch to avoid injecting an HTML 404 page as a script
            // which causes the browser to block it with a MIME-type nosniff error.
            // We only inject the <script> tag if the resource exists and looks like JS.
            let okToLoad = false;
            try {
                const resp = await fetch(url, { method: 'GET' });
                if (resp.ok) {
                    const ct = resp.headers.get('content-type') || '';
                    if (/javascript|application\/ecmascript|text\/javascript/.test(ct) || url.endsWith('.js')) {
                        okToLoad = true;
                    } else {
                        console.warn(`Optionales Modul übersprungen (ungültiger Content-Type): ${url} (${ct})`);
                    }
                } else {
                    console.warn(`Optionales Modul nicht gefunden (HTTP ${resp.status}): ${url}`);
                }
            } catch (fetchErr) {
                // If fetch fails (CORS/server), fallback to attempting to load the script tag
                // but still handle errors gracefully in loadModule.
                console.warn(`Konnte Modul vorab nicht prüfen, versuche zu laden: ${url}`, fetchErr);
                okToLoad = true;
            }

            if (okToLoad) {
                await this.loadModule(url);
            }
        } catch (error) {
            // Optionales Modul fehlt oder konnte nicht ausgeführt werden — nur warnen, nicht unterbrechen
            console.warn(`Optionales Modul konnte nicht geladen werden: ${url}`, error);
        }
    }

    combineModuleData() {
        // Für ITET: Kombiniere separate Datendateien zu window.ITETModuleData falls es noch nicht existiert
        if (this.studiengang === 'eth-itet') {
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
        } else if (this.studiengang === 'eth-msc-itet') {
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

    setupUzhMinorDataAlias() {
        // Kopiere die gemeinsame UzhCommonMinorData in die programm-spezifische Variable
        // Mapping: 'uzh-geschichte' -> 'UzhGeschichteMinorData'
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

        const targetVariable = studiengangToVariableMap[this.studiengang];
        if (targetVariable) {
            window[targetVariable] = window.UzhCommonMinorData;
            console.log(`✅ UZH Minor-Daten aliasiert: UzhCommonMinorData → ${targetVariable}`);
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
            script.src = `js/${this.studyModel}/configs/${this.studiengang}-config.js`;
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