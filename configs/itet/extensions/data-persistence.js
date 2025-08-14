/* ==== ITET DATA PERSISTENCE ==== */
/* Save/Load Funktionalitäten für ITET Studienplan */

// Data Persistence Methoden zur ITETStudienplan Klasse hinzufügen
Object.assign(window.ITETStudienplan.prototype, {
    
    /**
     * Speichert ausgewählte Praktika in localStorage
     */
    saveSelectedPraktika() {
        try {
            const data = {
                selectedPraktika: this.selectedPraktika,
                timestamp: new Date().toISOString(),
                version: '1.0'
            };
            localStorage.setItem('itet-selected-praktika', JSON.stringify(data));
            console.log('💾 Praktika gespeichert');
        } catch (error) {
            console.error('❌ Fehler beim Speichern der Praktika:', error);
            this.showMessage('Fehler beim Speichern!', 'error');
        }
    },

    /**
     * Lädt ausgewählte Praktika aus localStorage
     */
    loadSelectedPraktika() {
        try {
            const saved = localStorage.getItem('itet-selected-praktika');
            if (saved) {
                const data = JSON.parse(saved);
                console.log('📂 Praktika geladen vom:', data.timestamp);
                return data.selectedPraktika || {};
            }
        } catch (error) {
            console.error('❌ Fehler beim Laden der Praktika:', error);
        }
        return {};
    },

    /**
     * Exportiert Praktika als JSON-Datei
     */
    exportPraktika() {
        const exportData = {
            studiengang: 'BSc ITET - ETH Zürich',
            selectedPraktika: this.selectedPraktika,
            timestamp: new Date().toISOString(),
            totalKp: Object.values(this.selectedPraktika).flat().reduce((sum, m) => sum + m.kp, 0),
            version: '1.0',
            metadata: {
                exportType: 'praktika',
                moduleCount: Object.values(this.selectedPraktika).flat().length
            }
        };

        this.downloadJSON(exportData, 'itet-praktika.json');
        this.showMessage('📁 Praktika als JSON-Datei gespeichert!', 'success');
    },

    /**
     * Exportiert vollständige KP-Aufschlüsselung
     */
    exportKPBreakdown() {
        const breakdown = this.calculateKPBreakdown();
        
        const exportData = {
            studiengang: 'BSc ITET - ETH Zürich',
            timestamp: new Date().toISOString(),
            summary: {
                totalKP: breakdown.total,
                moduleCount: breakdown.moduleCount,
                targetKP: 180,
                status: breakdown.total >= 180 ? 'Erfüllt' : `${180 - breakdown.total} KP fehlen`
            },
            byCategory: breakdown.byCategory,
            byYear: breakdown.byYear,
            selectedPraktika: this.selectedPraktika,
            modules: [],
            version: '1.0'
        };
        
        // Alle Module hinzufügen
        this.config.daten.forEach(modul => {
            const moduleEl = Array.from(document.querySelectorAll('.modul')).find(el => 
                this.getModuleName(el) === modul.name
            );
            
            if (moduleEl) {
                exportData.modules.push({
                    name: modul.name,
                    kp: modul.kp,
                    kategorie: modul.kategorie,
                    jahr: modul.jahr,
                    semester: modul.semester
                });
            }
        });
        
        const filename = `itet-complete-breakdown-${new Date().toISOString().split('T')[0]}.json`;
        this.downloadJSON(exportData, filename);
        this.showMessage('📁 Vollständige Aufschlüsselung exportiert!', 'success');
    },

    /**
     * Exportiert alle Daten (Praktika + KP-Breakdown)
     */
    exportCompleteData() {
        const breakdown = this.calculateKPBreakdown();
        
        const completeData = {
            studiengang: 'BSc ITET - ETH Zürich',
            timestamp: new Date().toISOString(),
            selectedPraktika: this.selectedPraktika,
            kpBreakdown: breakdown,
            modules: this.config.daten,
            settings: {
                enableTooltips: this.config.enableTooltips,
                enableHover: this.config.enableHover
            },
            version: '1.0',
            metadata: {
                exportType: 'complete',
                totalModules: this.config.daten.length,
                selectedPraktikaCount: Object.values(this.selectedPraktika).flat().length
            }
        };

        const filename = `itet-complete-data-${new Date().toISOString().split('T')[0]}.json`;
        this.downloadJSON(completeData, filename);
        this.showMessage('📁 Vollständige Daten exportiert!', 'success');
    },

    /**
     * Importiert Daten aus Datei
     */
    importCompleteData(file) {
        if (!file) {
            this.showMessage('Keine Datei ausgewählt!', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                
                // Validierung
                if (!this.validateImportData(data)) {
                    this.showMessage('❌ Ungültiges Datenformat!', 'error');
                    return;
                }
                
                // Daten importieren
                if (data.selectedPraktika) {
                    this.selectedPraktika = data.selectedPraktika;
                    this.saveSelectedPraktika();
                    
                    // UI aktualisieren
                    document.querySelectorAll('.praktika-dropzone').forEach(box => {
                        this.updatePraktikaBoxContent(box);
                    });
                    
                    this.updatePraktikaDisplay();
                    this.updateKPDisplay();
                    
                    this.showMessage('✅ Daten erfolgreich importiert!', 'success');
                    console.log('📥 Import erfolgreich:', data.metadata);
                } else {
                    this.showMessage('❌ Keine Praktika-Daten gefunden!', 'warning');
                }
            } catch (error) {
                console.error('Import error:', error);
                this.showMessage('❌ Fehler beim Importieren!', 'error');
            }
        };
        
        reader.onerror = () => {
            this.showMessage('❌ Fehler beim Lesen der Datei!', 'error');
        };
        
        reader.readAsText(file);
    },

    /**
     * Validiert Import-Daten
     */
    validateImportData(data) {
        // Basis-Validierung
        if (!data || typeof data !== 'object') {
            return false;
        }
        
        // Prüfe erforderliche Felder
        const requiredFields = ['studiengang', 'timestamp'];
        for (const field of requiredFields) {
            if (!data[field]) {
                console.warn(`Fehlendes Feld: ${field}`);
                return false;
            }
        }
        
        // Prüfe Studiengang
        if (!data.studiengang.includes('ITET')) {
            console.warn('Falscher Studiengang:', data.studiengang);
            return false;
        }
        
        // Prüfe Praktika-Format
        if (data.selectedPraktika) {
            if (typeof data.selectedPraktika !== 'object') {
                return false;
            }
        }
        
        return true;
    },

    /**
     * Setzt alle Daten zurück
     */
    resetAllData() {
        this.showConfirmDialog(
            '🔄 Wirklich alle Daten zurücksetzen?\n\nDies löscht:\n• Alle ausgewählten Praktika\n• Alle gespeicherten Einstellungen',
            () => {
                // Reset durchführen
                this.selectedPraktika = {};
                this.saveSelectedPraktika();
                
                // UI aktualisieren
                document.querySelectorAll('.praktika-dropzone').forEach(box => {
                    this.updatePraktikaBoxContent(box);
                });
                
                this.updatePraktikaDisplay();
                this.updateKPDisplay();
                
                this.showMessage('✅ Alle Daten zurückgesetzt!', 'success');
                console.log('🔄 Kompletter Reset durchgeführt');
            },
            () => {
                this.showMessage('Reset abgebrochen', 'info');
            }
        );
    },

    /**
     * Erstellt File-Input für Import
     */
    createFileImporter() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.style.display = 'none';
        
        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                this.importCompleteData(file);
            }
        });
        
        document.body.appendChild(input);
        input.click();
        document.body.removeChild(input);
    },

    /**
     * Helper: Download JSON als Datei
     */
    downloadJSON(data, filename) {
        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.style.display = 'none';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        URL.revokeObjectURL(url);
    },

    /**
     * Auto-Save Funktionalität
     */
    enableAutoSave(intervalMinutes = 5) {
        if (this.autoSaveInterval) {
            clearInterval(this.autoSaveInterval);
        }
        
        this.autoSaveInterval = setInterval(() => {
            this.saveSelectedPraktika();
            console.log('💾 Auto-Save durchgeführt');
        }, intervalMinutes * 60 * 1000);
        
        console.log(`✅ Auto-Save aktiviert (alle ${intervalMinutes} Minuten)`);
    },

    /**
     * Deaktiviert Auto-Save
     */
    disableAutoSave() {
        if (this.autoSaveInterval) {
            clearInterval(this.autoSaveInterval);
            this.autoSaveInterval = null;
            console.log('⏹️ Auto-Save deaktiviert');
        }
    }
});

console.log('✅ Data Persistence geladen');