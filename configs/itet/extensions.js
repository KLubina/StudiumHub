/* ==== ITET EXTENSIONS - KOMPLETT IN EINER DATEI ==== */
/* Alle ITET Extension Module konsolidiert aber modular organisiert */

console.log('🚀 ITET Extensions - Einzeldatei-Version startet...');

// ============================================================================
// ==== ITET HAUPTKLASSE ====
// ============================================================================

window.ITETStudienplan = class ITETStudienplan extends StudienplanBase {
    constructor(config) {
        super(config);
        
        // KP-Counter Properties
        this.kpCounter = null;
        
        // Praktika Properties
        this.isPraktikaTooltipLocked = false;
        this.selectedPraktika = this.loadSelectedPraktika();
        
        // Verfügbare Praktika, Projekte und Seminare
        this.praktikaModule = [
            { name: "Amateurfunk-Kurs", kp: 1.5, kategorie: "wahl-praktika-projekte" },
            { name: "COMSOL Design Tool – Design of Optical Components", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Microcontrollers for Sensors and the Internet of Things", kp: 4, kategorie: "wahl-praktika-projekte" },
            { name: "FPGA in Quantum Computing with Superconducting Qubits", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Neural Network on Low Power FPGA", kp: 2, kategorie: "wahl-praktika-projekte" },
            { name: "Bluetooth Low Energy Programming for IoT Sensing System", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Python for Engineers", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Machine Learning for Brain-Computer Interfaces", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Android Application Development (AAD)", kp: 4, kategorie: "wahl-praktika-projekte" },
            { name: "Software Defined Radio", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Capture the Flag – Intro to Cybersecurity", kp: 3, kategorie: "wahl-praktika-projekte" }
        ];
    }

    initialize() {
        super.initialize();
        
        // Initialisiere alle ITET-Systeme
        this.initializeKPCounter();
        this.initializePraktikaSystem();
        this.updateKPDisplay();
        this.updatePraktikaDisplay();
        
        console.log('✅ ITETStudienplan initialisiert');
    }

    // ========================================================================
    // ==== UI HELPERS ====
    // ========================================================================

    showMessage(message, type = 'info') {
        const toast = document.createElement('div');
        toast.style.position = 'fixed';
        toast.style.top = '20px';
        toast.style.right = '20px';
        toast.style.padding = '10px 15px';
        toast.style.borderRadius = '5px';
        toast.style.zIndex = '9999';
        toast.style.fontSize = '12px';
        toast.style.fontWeight = 'bold';
        toast.style.animation = 'slideInRight 0.3s ease-out';
        toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        toast.textContent = message;

        const colors = {
            success: { bg: '#28a745', color: 'white' },
            warning: { bg: '#ffc107', color: 'black' },
            info: { bg: '#17a2b8', color: 'white' },
            error: { bg: '#dc3545', color: 'white' }
        };

        const style = colors[type] || colors.info;
        toast.style.backgroundColor = style.bg;
        toast.style.color = style.color;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    getModuleName(modulEl) {
        const nameEl = modulEl.querySelector('.modul-titel');
        return nameEl ? nameEl.textContent.trim() : '';
    }

    showConfirmDialog(message, onConfirm, onCancel = null) {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 10000;
            display: flex;
            justify-content: center;
            align-items: center;
        `;

        const dialog = document.createElement('div');
        dialog.style.cssText = `
            background: white;
            border-radius: 8px;
            padding: 20px;
            max-width: 400px;
            text-align: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `;

        dialog.innerHTML = `
            <div style="margin-bottom: 20px; font-size: 16px;">${message}</div>
            <div>
                <button id="confirm-yes" style="background: #28a745; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; margin-right: 10px;">Ja</button>
                <button id="confirm-no" style="background: #dc3545; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer;">Nein</button>
            </div>
        `;

        modal.appendChild(dialog);
        document.body.appendChild(modal);

        dialog.querySelector('#confirm-yes').addEventListener('click', () => {
            modal.remove();
            if (onConfirm) onConfirm();
        });

        dialog.querySelector('#confirm-no').addEventListener('click', () => {
            modal.remove();
            if (onCancel) onCancel();
        });

        return modal;
    }

    // ========================================================================
    // ==== DATA PERSISTENCE ====
    // ========================================================================

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
    }

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
    }

    exportPraktika() {
        const exportData = {
            studiengang: 'BSc ITET - ETH Zürich',
            selectedPraktika: this.selectedPraktika,
            timestamp: new Date().toISOString(),
            totalKp: Object.values(this.selectedPraktika).flat().reduce((sum, m) => sum + m.kp, 0)
        };

        this.downloadJSON(exportData, 'itet-praktika.json');
        this.showMessage('📁 Praktika als JSON-Datei gespeichert!', 'success');
    }

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
    }

    // ========================================================================
    // ==== KP-COUNTER SYSTEM ====
    // ========================================================================

    initializeKPCounter() {
        this.addKPCounter();
        this.updateKPDisplay();
        console.log('✅ KP-Counter System initialisiert');
    }

    addKPCounter() {
        const legendContainer = document.querySelector(".farben-legende");
        
        const kpCounterContainer = document.createElement("div");
        kpCounterContainer.id = "kp-counter";
        kpCounterContainer.style.marginBottom = "20px";
        kpCounterContainer.style.padding = "15px";
        kpCounterContainer.style.backgroundColor = "#f8f9fa";
        kpCounterContainer.style.borderRadius = "8px";
        kpCounterContainer.style.border = "2px solid #0D5B8C";
        kpCounterContainer.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
        
        kpCounterContainer.innerHTML = `
            <div style="text-align: center; margin-bottom: 15px;">
                <h3 style="margin: 0 0 5px 0; color: #0D5B8C; font-size: 18px;">📊 KP-Übersicht</h3>
                <div style="font-size: 12px; color: #666;">
                    Automatische Zählung aller angezeigten Module
                </div>
            </div>
            
            <div id="kp-total" style="text-align: center; margin-bottom: 15px; padding: 10px; background: linear-gradient(135deg, #0D5B8C, #00A0E3); color: white; border-radius: 5px; font-weight: bold;">
                <div style="font-size: 24px; margin-bottom: 5px;">
                    <span id="total-kp">0</span> KP
                </div>
                <div style="font-size: 12px; opacity: 0.9;">
                    von mindestens 180 KP erforderlich
                </div>
                <div id="kp-status" style="margin-top: 5px; font-size: 11px;">
                    <div id="kp-progress-bar" style="width: 100%; height: 4px; background-color: rgba(255,255,255,0.3); border-radius: 2px; margin-top: 5px;">
                        <div id="kp-progress-fill" style="height: 100%; background-color: white; border-radius: 2px; transition: width 0.5s ease; width: 0%;"></div>
                    </div>
                </div>
            </div>
            
            <div style="margin-top: 12px; text-align: center;">
                <button id="refresh-kp" style="background: #28a745; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 11px; margin-right: 5px;">
                    🔄 Aktualisieren
                </button>
                <button id="export-kp" style="background: #17a2b8; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 11px;">
                    📊 Export
                </button>
            </div>
        `;

        legendContainer.insertBefore(kpCounterContainer, legendContainer.firstChild);
        
        // Event Listeners
        document.getElementById('refresh-kp').addEventListener('click', () => {
            this.updateKPDisplay();
            this.showMessage('✅ KP-Zählung aktualisiert!', 'success');
        });
        
        document.getElementById('export-kp').addEventListener('click', () => {
            this.exportKPBreakdown();
        });
        
        this.kpCounter = kpCounterContainer;
    }

    updateKPDisplay() {
        const breakdown = this.calculateKPBreakdown();
        
        const totalKpEl = document.getElementById('total-kp');
        if (totalKpEl) {
            totalKpEl.textContent = breakdown.total;
        }
        
        this.updateKPStatus(breakdown);
    }

    updateKPStatus(breakdown) {
        const statusEl = document.getElementById('kp-status');
        const progressFill = document.getElementById('kp-progress-fill');
        const requiredKP = 180;
        const remaining = Math.max(0, requiredKP - breakdown.total);
        const progress = Math.min(100, (breakdown.total / requiredKP) * 100);
        
        if (breakdown.total >= requiredKP) {
            statusEl.style.color = '#28a745';
            if (progressFill) {
                progressFill.style.backgroundColor = '#28a745';
            }
        } else {
            statusEl.style.color = remaining <= 30 ? '#ffc107' : '#dc3545';
            if (progressFill) {
                progressFill.style.backgroundColor = remaining <= 30 ? '#ffc107' : '#dc3545';
            }
        }
        
        if (progressFill) {
            progressFill.style.width = progress + '%';
        }
    }

    calculateKPBreakdown() {
        const breakdown = {
            total: 0,
            byCategory: {},
            moduleCount: 0,
            praktikaKP: 0
        };
        
        // Standard Module analysieren
        const moduleElements = document.querySelectorAll('.modul');
        
        moduleElements.forEach(moduleEl => {
            const modulName = this.getModuleName(moduleEl);
            const modul = this.config.daten.find(m => m.name === modulName);
            
            if (modul) {
                breakdown.total += modul.kp;
                breakdown.moduleCount++;
                
                const kategorie = modul.kategorie || 'Unbekannt';
                if (!breakdown.byCategory[kategorie]) {
                    breakdown.byCategory[kategorie] = { kp: 0, count: 0 };
                }
                breakdown.byCategory[kategorie].kp += modul.kp;
                breakdown.byCategory[kategorie].count++;
            }
        });
        
        // Praktika hinzufügen
        const praktikaModules = Object.values(this.selectedPraktika).flat();
        praktikaModules.forEach(modul => {
            breakdown.total += modul.kp;
            breakdown.moduleCount++;
            breakdown.praktikaKP += modul.kp;
        });
        
        return breakdown;
    }

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
            selectedPraktika: this.selectedPraktika
        };
        
        const filename = `itet-kp-breakdown-${new Date().toISOString().split('T')[0]}.json`;
        this.downloadJSON(exportData, filename);
        this.showMessage('📁 KP-Aufschlüsselung exportiert!', 'success');
    }

    // ========================================================================
    // ==== PRAKTIKA SYSTEM ====
    // ========================================================================

    initializePraktikaSystem() {
        this.addPraktikaControls();
        this.makePraktikaDroppable();
        this.updatePraktikaDisplay();
        console.log('✅ Praktika System initialisiert');
    }

    addPraktikaControls() {
        const legendContainer = document.querySelector(".farben-legende");
        
        const praktikaControls = document.createElement("div");
        praktikaControls.style.marginBottom = "15px";
        praktikaControls.style.padding = "10px";
        praktikaControls.style.backgroundColor = "#fff8f8";
        praktikaControls.style.borderRadius = "5px";
        praktikaControls.style.border = "2px solid #4CA64C";
        
        praktikaControls.innerHTML = `
            <div style="text-align: center; margin-bottom: 10px;">
                <h4 style="margin: 0 0 8px 0; color: #4CA64C;">🎯 Praktika Designer</h4>
                <div style="font-size: 12px; color: #666;">
                    💡 <strong>Ziehe Module aus der Liste in deine Praktika-Boxen!</strong><br>
                    📚 Gewählte KP: <span id="selected-praktika-kp">0</span> KP
                </div>
                <div style="margin-top: 8px;">
                    <button id="show-praktika-list" style="background: #4CA64C; color: white; border: none; padding: 5px 12px; border-radius: 3px; cursor: pointer; margin-right: 5px; font-size: 11px;">📋 Module zeigen</button>
                    <button id="save-praktika" style="background: #28a745; color: white; border: none; padding: 5px 12px; border-radius: 3px; cursor: pointer; margin-right: 5px; font-size: 11px;">💾 Speichern</button>
                    <button id="reset-praktika" style="background: #dc3545; color: white; border: none; padding: 5px 12px; border-radius: 3px; cursor: pointer; font-size: 11px;">🔄 Reset</button>
                </div>
            </div>
        `;

        legendContainer.insertBefore(praktikaControls, this.kpCounter.nextSibling);

        // Event Listeners
        document.getElementById('show-praktika-list').addEventListener('click', (e) => {
            this.showPraktikaTooltip(e);
        });

        document.getElementById('save-praktika').addEventListener('click', () => {
            this.exportPraktika();
        });

        document.getElementById('reset-praktika').addEventListener('click', () => {
            this.resetPraktika();
        });
    }

    makePraktikaDroppable() {
        document.querySelectorAll('.modul').forEach(modulEl => {
            const modulName = this.getModuleName(modulEl);
            
            if (this.isPraktikaPlaceholder(modulName)) {
                this.setupPraktikaDropZone(modulEl);
            }
        });
    }

    isPraktikaPlaceholder(modulName) {
        const praktikaIdentifiers = [
            'Android Application Development',
            'Python for Engineers',
            'Python for Science',
            'Hands-On Deep Learning',
            'Capture the Flag',
            'Neural Network on Low'
        ];
        
        return praktikaIdentifiers.some(identifier => 
            modulName.includes(identifier)
        );
    }

    setupPraktikaDropZone(praktikaBox) {
        praktikaBox.style.position = 'relative';
        praktikaBox.classList.add('praktika-dropzone');
        
        praktikaBox.addEventListener('dragover', (e) => {
            e.preventDefault();
            praktikaBox.style.borderColor = '#28a745';
            praktikaBox.style.backgroundColor = 'rgba(40, 167, 69, 0.1)';
            praktikaBox.style.transform = 'scale(1.05)';
        });
        
        praktikaBox.addEventListener('dragleave', (e) => {
            if (!praktikaBox.contains(e.relatedTarget)) {
                this.resetPraktikaBoxStyle(praktikaBox);
            }
        });
        
        praktikaBox.addEventListener('drop', (e) => {
            e.preventDefault();
            this.resetPraktikaBoxStyle(praktikaBox);
            
            try {
                const modulData = JSON.parse(e.dataTransfer.getData('text/plain'));
                this.addPraktikaToBox(modulData, praktikaBox);
            } catch (error) {
                console.error('Fehler beim Drop:', error);
                this.showMessage('❌ Fehler beim Hinzufügen des Moduls', 'error');
            }
        });

        this.updatePraktikaBoxContent(praktikaBox);
    }

    resetPraktikaBoxStyle(box) {
        box.style.borderColor = '';
        box.style.backgroundColor = '';
        box.style.transform = '';
    }

    addPraktikaToBox(modul, praktikaBox) {
        const boxId = this.getPraktikaBoxId(praktikaBox);
        
        if (this.isPraktikaSelected(modul.name)) {
            this.showMessage(`ℹ️ "${modul.name}" ist bereits ausgewählt`, 'info');
            return;
        }

        if (!this.selectedPraktika[boxId]) {
            this.selectedPraktika[boxId] = [];
        }
        
        this.selectedPraktika[boxId].push({...modul});
        this.saveSelectedPraktika();
        
        this.updatePraktikaBoxContent(praktikaBox);
        this.updatePraktikaDisplay();
        this.updateKPDisplay();
        
        this.showMessage(`✅ "${modul.name}" hinzugefügt`, 'success');
    }

    getPraktikaBoxId(praktikaBox) {
        const allPraktikaBoxes = Array.from(document.querySelectorAll('.praktika-dropzone'));
        return `praktika-${allPraktikaBoxes.indexOf(praktikaBox)}`;
    }

    isPraktikaSelected(modulName) {
        return Object.values(this.selectedPraktika).some(boxModules => 
            boxModules.some(m => m.name === modulName)
        );
    }

    updatePraktikaBoxContent(praktikaBox) {
        const boxId = this.getPraktikaBoxId(praktikaBox);
        const selectedModules = this.selectedPraktika[boxId] || [];

        const existingContainer = praktikaBox.querySelector('.praktika-container');
        if (existingContainer) {
            existingContainer.remove();
        }

        if (selectedModules.length > 0) {
            const moduleContainer = document.createElement('div');
            moduleContainer.className = 'praktika-container';
            moduleContainer.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                display: flex;
                flex-wrap: wrap;
                gap: 2px;
                padding: 20px 5px 5px 5px;
                box-sizing: border-box;
                overflow: hidden;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 4px;
            `;

            selectedModules.forEach(modul => {
                this.createDroppedPraktikaModule(modul, moduleContainer, praktikaBox);
            });

            praktikaBox.appendChild(moduleContainer);
        }
    }

    createDroppedPraktikaModule(modul, container, praktikaBox) {
        const div = document.createElement('div');
        div.classList.add('dropped-praktika-modul');
        div.classList.add('wahl-praktika-projekte');
        
        div.style.cssText = `
            width: 80px;
            height: 50px;
            position: relative;
            border-radius: 4px;
            border: 1px solid rgba(255,255,255,0.3);
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            padding: 3px;
            margin: 1px;
            overflow: hidden;
            transition: transform 0.2s ease;
            background-color: #4CA64C;
            color: white;
        `;
        
        // KP-Anzeige
        const kpDiv = document.createElement('div');
        kpDiv.textContent = `${modul.kp} KP`;
        kpDiv.style.cssText = `
            font-size: 10px;
            font-weight: bold;
            color: white;
            text-align: center;
        `;
        div.appendChild(kpDiv);
        
        // Modultitel
        const titleDiv = document.createElement('div');
        const shortName = modul.name.length > 15 ? modul.name.substring(0, 12) + '...' : modul.name;
        titleDiv.textContent = shortName;
        titleDiv.title = modul.name;
        titleDiv.style.cssText = `
            font-size: 8px;
            color: white;
            text-align: center;
            line-height: 1.1;
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            word-break: break-word;
            overflow: hidden;
        `;
        div.appendChild(titleDiv);
        
        // Remove-Button
        const removeBtn = document.createElement('div');
        removeBtn.innerHTML = '×';
        removeBtn.style.cssText = `
            position: absolute;
            top: 1px;
            right: 1px;
            width: 12px;
            height: 12px;
            background-color: rgba(220, 53, 69, 0.8);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 10px;
            font-weight: bold;
        `;
        
        removeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.removePraktika(modul, praktikaBox);
        });
        
        div.appendChild(removeBtn);
        container.appendChild(div);
        
        return div;
    }

    removePraktika(modul, praktikaBox) {
        const boxId = this.getPraktikaBoxId(praktikaBox);
        this.selectedPraktika[boxId] = this.selectedPraktika[boxId].filter(m => m.name !== modul.name);
        this.saveSelectedPraktika();
        
        this.updatePraktikaBoxContent(praktikaBox);
        this.updatePraktikaDisplay();
        this.updateKPDisplay();
        
        this.showMessage(`🗑️ "${modul.name}" entfernt`, 'info');
    }

    updatePraktikaDisplay() {
        const totalKp = Object.values(this.selectedPraktika).flat().reduce((sum, m) => sum + m.kp, 0);
        const kpDisplay = document.getElementById('selected-praktika-kp');
        
        if (kpDisplay) {
            kpDisplay.textContent = totalKp;
            kpDisplay.style.color = totalKp > 0 ? '#28a745' : '#dc3545';
            kpDisplay.style.fontWeight = 'bold';
        }
    }

    showPraktikaTooltip(event) {
        const content = this.createDraggablePraktikaTooltip();
        this.showCustomTooltip(content, event);
    }

    createDraggablePraktikaTooltip() {
        let content = `
            <div class="praktika-liste">
                <h3>🎯 Praktika, Projekte & Seminare per Drag & Drop</h3>
                <p style="font-size: 11px; color: #666; margin-bottom: 15px;">
                    💡 <strong>Ziehe Module direkt in deine Praktika-Boxen im Studienplan!</strong>
                </p>
                <div style="max-height: 400px; overflow-y: auto; display: grid; grid-template-columns: 1fr 1fr; gap: 4px;">
        `;

        this.praktikaModule.forEach(modul => {
            const isSelected = this.isPraktikaSelected(modul.name);
            const opacity = isSelected ? '0.5' : '1';
            const cursor = isSelected ? 'not-allowed' : 'grab';

            content += `
                <div class="draggable-praktika-modul" 
                     draggable="${!isSelected}" 
                     data-modul='${JSON.stringify(modul)}'
                     style="
                        padding: 4px 6px; 
                        background: linear-gradient(135deg, #4CA64C, #5db563);
                        color: white; 
                        border-radius: 8px; 
                        font-size: 8px; 
                        cursor: ${cursor};
                        opacity: ${opacity};
                        margin: 1px;
                        border: 1px solid rgba(255,255,255,0.3);
                        transition: transform 0.2s ease;
                        user-select: none;
                     ">
                    <div style="font-weight: bold; margin-bottom: 2px;">${modul.kp} KP</div>
                    <div style="line-height: 1; overflow: hidden; text-overflow: ellipsis;">${modul.name.length > 35 ? modul.name.substring(0, 32) + '...' : modul.name}</div>
                </div>
            `;
        });

        content += `</div></div>`;

        setTimeout(() => {
            this.addDragEventsToPraktikaModules();
        }, 10);

        return content;
    }

    addDragEventsToPraktikaModules() {
        const draggableModules = document.querySelectorAll('.draggable-praktika-modul[draggable="true"]');
        
        draggableModules.forEach(modulEl => {
            modulEl.addEventListener('dragstart', (e) => {
                const modulData = JSON.parse(modulEl.dataset.modul);
                e.dataTransfer.setData('text/plain', JSON.stringify(modulData));
                modulEl.style.transform = 'scale(0.8)';
                modulEl.style.opacity = '0.5';
            });

            modulEl.addEventListener('dragend', (e) => {
                modulEl.style.transform = '';
                modulEl.style.opacity = '';
            });

            modulEl.addEventListener('mouseenter', () => {
                if (modulEl.draggable) {
                    modulEl.style.transform = 'scale(1.05)';
                }
            });

            modulEl.addEventListener('mouseleave', () => {
                if (modulEl.draggable) {
                    modulEl.style.transform = '';
                }
            });
        });
    }

    resetPraktika() {
        this.showConfirmDialog(
            '🔄 Wirklich alle Praktika zurücksetzen?',
            () => {
                this.selectedPraktika = {};
                this.saveSelectedPraktika();
                
                document.querySelectorAll('.praktika-dropzone').forEach(box => {
                    this.updatePraktikaBoxContent(box);
                });
                
                this.updatePraktikaDisplay();
                this.updateKPDisplay();
                this.showMessage('✅ Alle Praktika zurückgesetzt!', 'success');
            }
        );
    }
};

// Globale Referenz setzen
window.StudiengangCustomClass = window.ITETStudienplan;

console.log('✅ ITET Extensions komplett geladen - ITETStudienplan verfügbar:', typeof window.ITETStudienplan);