/* ==== ITET EXTENSIONS - VEREINFACHT UND FUNKTIONAL ==== */
/* Alle ITET-spezifischen Funktionen in einer Datei */

// ITET Studienplan Klasse mit Praktika-System
window.StudiengangCustomClass = class ITETStudienplan extends StudienplanBase {
    constructor(config) {
        super(config);
        
        // Praktika-System Properties
        this.isPraktikaTooltipLocked = false;
        this.selectedPraktika = this.loadSelectedPraktika();
        
        // KP-Counter Properties
        this.showDetailedBreakdown = false;
        this.updateTimeout = null;
        
        // Verfügbare Praktika, Projekte und Seminare
        this.praktikaModule = [
            { name: "Amateurfunk-Kurs", kp: 1.5, kategorie: "wahl-praktika-projekte" },
            { name: "COMSOL Design Tool – Design of Optical Components", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Microcontrollers for Sensors and the Internet of Things", kp: 4, kategorie: "wahl-praktika-projekte" },
            { name: "FPGA in Quantum Computing with Superconducting Qubits", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Neural Network on Low Power FPGA", kp: 2, kategorie: "wahl-praktika-projekte" },
            { name: "Bluetooth Low Energy Programming for IoT Sensing System", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Spiking Neural Network on Neuromorphic Processors", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Electronic Circuits & Signals Exploration Laboratory", kp: 2, kategorie: "wahl-praktika-projekte" },
            { name: "Assembling and Controlling a Tuning-Fork AFM", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Technical and Economic Aspects of Renewable Energy Supply", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Python for Engineers", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Machine Learning for Brain-Computer Interfaces", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Bau eines drahtlosen Infrarot-Kopfhörers", kp: 2, kategorie: "wahl-praktika-projekte" },
            { name: "Bits on Air", kp: 2, kategorie: "wahl-praktika-projekte" },
            { name: "Software Defined Radio", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Quad-Rotors: Control and Estimation", kp: 2, kategorie: "wahl-praktika-projekte" },
            { name: "RoboCup: Learning and Control", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Magnetresonanz: Vom Spektrum zum Bild", kp: 1, kategorie: "wahl-praktika-projekte" },
            { name: "Biosignal Acquisition and Processing for IoT Wearable Devices", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Android Application Development (AAD)", kp: 4, kategorie: "wahl-praktika-projekte" },
            { name: "iCEBreaker FPGA For IoT Sensing Systems", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Embedded Deep Learning with Huawei Atlas 200 AI Dev Kit", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Vision Goes Vegas", kp: 2, kategorie: "wahl-praktika-projekte" },
            { name: "Magnetische Felder im Alltag", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Accelerating Genome Analysis with FPGAs, GPUs", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Exploration of Emerging Memory Systems", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "FPGA-based Exploration of DRAM and RowHammer", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Genome Sequencing on Mobile Devices", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Memory-Centric Computing", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Controlling Biological Neuronal Networks Using Machine Learning", kp: 4, kategorie: "wahl-praktika-projekte" },
            { name: "Python for Science & Machine Learning", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Memory Design: From Architecture down to Basic Cells", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Building a receive coil for MRI", kp: 1.5, kategorie: "wahl-praktika-projekte" },
            { name: "Clean Room Technology – Fabrication and Characterization", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Understanding and Designing Modern SSDs", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Robotic Maze Solving with a TI-RSLK Robot", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Embedded Systems With Drones", kp: 4, kategorie: "wahl-praktika-projekte" },
            { name: "Machine Learning on Smart Phone", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Introduction to Program Nao Robots for Robocup", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Smart Patch Projects", kp: 4, kategorie: "wahl-praktika-projekte" },
            { name: "Programming Heterogeneous Computing Systems", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Optics and Spectroscopy Lab", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Our Daily Exposure to Electromagnetic Radiation", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Intelligent Architectures via Hardware/Software Cooperation", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Wearable Ultrasound: Tools and Technologies", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Autonomous Cars and Robots", kp: 4, kategorie: "wahl-praktika-projekte" },
            { name: "Erneuerbare Energien und Netto-Null-Emissions-Ziel", kp: 2, kategorie: "wahl-praktika-projekte" },
            { name: "Enabling Smart and Low Power IoT Sensor Nodes", kp: 4, kategorie: "wahl-praktika-projekte" },
            { name: "Gibbs? Clifford!", kp: 2, kategorie: "wahl-praktika-projekte" },
            { name: "Image-guided digital twinning of cardiac anatomy", kp: 2, kategorie: "wahl-praktika-projekte" },
            { name: "Coding Algorithms for a Scavenger Hunt", kp: 1, kategorie: "wahl-praktika-projekte" },
            { name: "Clinical Genomics", kp: 4, kategorie: "wahl-praktika-projekte" },
            { name: "Digital Audio", kp: 4, kategorie: "wahl-praktika-projekte" },
            { name: "Let's make ITET green!", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Echoes in Action: Designing Piezoelectric Transducers", kp: 2, kategorie: "wahl-praktika-projekte" },
            { name: "Radio Frequency Electromagnetic Fields", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Capture the Flag – Introduction to Cybersecurity", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Exploration Project", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Mission impossible: CartPole4.0", kp: 2, kategorie: "wahl-praktika-projekte" },
            { name: "Audio Electronics and Music Production Technology", kp: 1, kategorie: "wahl-praktika-projekte" },
            { name: "From Software Applications to FPGA Designs", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Practical Antenna Design, Implementation, and Measurement", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Hands-On Deep Learning", kp: 2, kategorie: "wahl-praktika-projekte" },
            { name: "Applied Circuit and PCB-Design", kp: 2, kategorie: "wahl-praktika-projekte" }
        ];
    }

    initialize() {
        super.initialize();
        this.addKPCounter();
        this.addPraktikaControls();
        this.makePraktikaDroppable();
        this.updateKPDisplay();
        this.updatePraktikaDisplay();
        console.log('✅ ITET Studienplan initialisiert');
    }

    /* ==== KP-COUNTER SYSTEM ==== */
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
            
            <div id="kp-breakdown" style="font-size: 11px; line-height: 1.4;">
                <!-- Aufschlüsselung wird hier eingefügt -->
            </div>
            
            <div style="margin-top: 12px; text-align: center;">
                <button id="refresh-kp" style="background: #28a745; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 11px; margin-right: 5px;">
                    🔄 Aktualisieren
                </button>
                <button id="export-kp" style="background: #17a2b8; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 11px; margin-right: 5px;">
                    📊 Export
                </button>
                <button id="toggle-breakdown" style="background: #6c757d; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 11px;">
                    👁️ Details
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
        
        document.getElementById('toggle-breakdown').addEventListener('click', () => {
            this.toggleBreakdownDetails();
        });
    }

    updateKPDisplay() {
        const breakdown = this.calculateKPBreakdown();
        
        // Gesamtsumme aktualisieren
        const totalKpEl = document.getElementById('total-kp');
        if (totalKpEl) {
            totalKpEl.textContent = breakdown.total;
        }
        
        // Status und Progress Bar aktualisieren
        this.updateKPStatus(breakdown);
        
        // Aufschlüsselung aktualisieren
        this.updateKPBreakdown(breakdown);
    }

    updateKPStatus(breakdown) {
        const statusEl = document.getElementById('kp-status');
        const progressFill = document.getElementById('kp-progress-fill');
        const requiredKP = 180;
        const remaining = Math.max(0, requiredKP - breakdown.total);
        const progress = Math.min(100, (breakdown.total / requiredKP) * 100);
        
        if (breakdown.total >= requiredKP) {
            statusEl.innerHTML = `✅ <span style="color: #28a745;">Mindestanforderung erfüllt!</span>`;
        } else {
            statusEl.innerHTML = `⚠️ <span style="color: #ffc107;">Noch ${remaining} KP benötigt</span>`;
        }
        
        if (progressFill) {
            progressFill.style.width = progress + '%';
        }
    }

    calculateKPBreakdown() {
        const breakdown = {
            total: 0,
            byCategory: {},
            byYear: {},
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
                
                const jahr = modul.jahr || 'Unbekannt';
                if (!breakdown.byYear[jahr]) {
                    breakdown.byYear[jahr] = { kp: 0, count: 0 };
                }
                breakdown.byYear[jahr].kp += modul.kp;
                breakdown.byYear[jahr].count++;
            }
        });
        
        // Hinzugefügte Praktika analysieren
        const praktikaModules = Object.values(this.selectedPraktika).flat();
        praktikaModules.forEach(modul => {
            breakdown.total += modul.kp;
            breakdown.moduleCount++;
            breakdown.praktikaKP += modul.kp;
            
            const kategorie = 'Wahl Praktika-Projekte-Seminare';
            if (!breakdown.byCategory[kategorie]) {
                breakdown.byCategory[kategorie] = { kp: 0, count: 0 };
            }
            breakdown.byCategory[kategorie].kp += modul.kp;
            breakdown.byCategory[kategorie].count++;
        });
        
        return breakdown;
    }

    updateKPBreakdown(breakdown) {
        const breakdownEl = document.getElementById('kp-breakdown');
        
        let html = `
            <div style="border-bottom: 1px solid #ddd; padding-bottom: 8px; margin-bottom: 8px;">
                <strong>📋 Zusammenfassung:</strong><br>
                <span style="color: #0D5B8C;">▶ ${breakdown.moduleCount} Module insgesamt</span><br>
                <span style="color: #00A0E3;">▶ ${breakdown.total} KP Gesamtsumme</span>
                ${breakdown.praktikaKP > 0 ? `<br><span style="color: #4CA64C;">▶ ${breakdown.praktikaKP} KP aus Praktika</span>` : ''}
            </div>
        `;
        
        if (!this.showDetailedBreakdown) {
            const topCategories = Object.entries(breakdown.byCategory)
                .sort(([,a], [,b]) => b.kp - a.kp)
                .slice(0, 3);
            
            html += `<div style="margin-bottom: 10px;"><strong>📚 Top Kategorien:</strong>`;
            
            topCategories.forEach(([kategorie, data]) => {
                const color = this.getCategoryColor(kategorie);
                const percentage = ((data.kp / breakdown.total) * 100).toFixed(1);
                
                html += `
                    <div style="margin: 3px 0; padding: 2px 4px; border-left: 3px solid ${color}; background-color: rgba(13, 91, 140, 0.05);">
                        <span style="font-weight: 500;">${kategorie}:</span> 
                        <span style="color: ${color}; font-weight: bold;">${data.kp} KP</span> 
                        <span style="color: #666; font-size: 10px;">(${percentage}%)</span>
                    </div>
                `;
            });
            
            html += `</div>`;
        }
        
        breakdownEl.innerHTML = html;
    }

    toggleBreakdownDetails() {
        this.showDetailedBreakdown = !this.showDetailedBreakdown;
        const btn = document.getElementById('toggle-breakdown');
        
        if (this.showDetailedBreakdown) {
            btn.textContent = '👁️ Weniger';
            btn.style.backgroundColor = '#28a745';
        } else {
            btn.textContent = '👁️ Details';
            btn.style.backgroundColor = '#6c757d';
        }
        
        this.updateKPDisplay();
    }

    getCategoryColor(kategorie) {
        const colorMap = {
            'Obligatorische Fächer': '#0D5B8C',
            'Obligatorische Praktikum': '#00A0E3',
            'Wahl Praktika-Projekte-Seminare': '#4CA64C',
            'Kernfächer nach Schwerpunkt': '#DD98DD',
            'Wahlfächer': '#F2B48F',
            'Wissenschaftliche Arbeit': '#888888',
            'Weitere Wahl-Grundlagenfächer': '#FFD700'
        };
        
        return colorMap[kategorie] || '#666666';
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
            byYear: breakdown.byYear,
            selectedPraktika: this.selectedPraktika,
            version: '1.0'
        };
        
        const filename = `itet-kp-breakdown-${new Date().toISOString().split('T')[0]}.json`;
        this.downloadJSON(exportData, filename);
        this.showMessage('📁 KP-Aufschlüsselung exportiert!', 'success');
    }

    /* ==== PRAKTIKA SYSTEM ==== */
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
                    💡 <strong>Wähle aus ${this.praktikaModule.length} verfügbaren Modulen!</strong><br>
                    📚 Gewählte KP: <span id="selected-praktika-kp">0</span> KP
                </div>
                <div style="margin-top: 8px;">
                    <button id="show-praktika-list" style="background: #4CA64C; color: white; border: none; padding: 5px 12px; border-radius: 3px; cursor: pointer; margin-right: 5px; font-size: 11px;">📋 Module zeigen</button>
                    <button id="save-praktika" style="background: #28a745; color: white; border: none; padding: 5px 12px; border-radius: 3px; cursor: pointer; margin-right: 5px; font-size: 11px;">💾 Speichern</button>
                    <button id="reset-praktika" style="background: #dc3545; color: white; border: none; padding: 5px 12px; border-radius: 3px; cursor: pointer; font-size: 11px;">🔄 Reset</button>
                </div>
            </div>
        `;

        legendContainer.insertBefore(praktikaControls, document.getElementById('kp-counter').nextSibling);

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
        // Vereinfachte Version - macht alle Praktika-Module als Buttons verfügbar
        const praktikaModules = this.config.daten.filter(m => 
            m.kategorie === 'wahl-praktika-projekte' || 
            m.name.includes('Android Application Development') ||
            m.name.includes('Python for Engineers') ||
            m.name.includes('Hands-On Deep Learning')
        );
        
        praktikaModules.forEach(modulEl => {
            const moduleElement = document.querySelector(`.modul .modul-titel[title="${modulEl.name}"]`);
            if (moduleElement) {
                const moduleDiv = moduleElement.closest('.modul');
                moduleDiv.style.cursor = 'pointer';
                moduleDiv.addEventListener('click', () => {
                    this.togglePraktikaSelection(modulEl);
                });
            }
        });
    }

    togglePraktikaSelection(modul) {
        if (this.isPraktikaSelected(modul.name)) {
            this.removePraktikaSelection(modul);
        } else {
            this.addPraktikaSelection(modul);
        }
    }

    addPraktikaSelection(modul) {
        if (!this.selectedPraktika['general']) {
            this.selectedPraktika['general'] = [];
        }
        
        this.selectedPraktika['general'].push({...modul});
        this.saveSelectedPraktika();
        this.updatePraktikaDisplay();
        this.updateKPDisplay();
        this.showMessage(`✅ "${modul.name}" hinzugefügt`, 'success');
    }

    removePraktikaSelection(modul) {
        if (this.selectedPraktika['general']) {
            this.selectedPraktika['general'] = this.selectedPraktika['general'].filter(m => m.name !== modul.name);
        }
        this.saveSelectedPraktika();
        this.updatePraktikaDisplay();
        this.updateKPDisplay();
        this.showMessage(`🗑️ "${modul.name}" entfernt`, 'info');
    }

    isPraktikaSelected(modulName) {
        return Object.values(this.selectedPraktika).some(moduleList => 
            moduleList.some(m => m.name === modulName)
        );
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
        const content = this.createPraktikaTooltip();
        this.showCustomTooltip(content, event);
    }

    createPraktikaTooltip() {
        let content = `
            <div class="praktika-liste">
                <h3>🎯 Verfügbare Praktika, Projekte & Seminare</h3>
                <p style="font-size: 11px; color: #666; margin-bottom: 15px;">
                    💡 <strong>Wähle aus ${this.praktikaModule.length} verfügbaren Modulen!</strong>
                </p>
                <div style="max-height: 400px; overflow-y: auto; display: grid; grid-template-columns: 1fr; gap: 2px;">
        `;

        this.praktikaModule.forEach(modul => {
            const isSelected = this.isPraktikaSelected(modul.name);
            const bgColor = isSelected ? '#d4edda' : '#f8f9fa';
            const textColor = isSelected ? '#155724' : '#333';
            const buttonText = isSelected ? '✓ Gewählt' : 'Wählen';
            const buttonColor = isSelected ? '#28a745' : '#4CA64C';

            content += `
                <div style="padding: 8px; background: ${bgColor}; color: ${textColor}; border-radius: 4px; margin: 2px; border: 1px solid #ddd; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <div style="font-weight: bold; font-size: 10px;">${modul.kp} KP</div>
                        <div style="font-size: 9px; line-height: 1.2;">${modul.name}</div>
                    </div>
                    <button onclick="window.currentStudienplan.togglePraktikaFromTooltip('${modul.name}')" 
                            style="background: ${buttonColor}; color: white; border: none; padding: 3px 6px; border-radius: 3px; cursor: pointer; font-size: 8px;">
                        ${buttonText}
                    </button>
                </div>
            `;
        });

        content += `</div></div>`;
        return content;
    }

    togglePraktikaFromTooltip(modulName) {
        const modul = this.praktikaModule.find(m => m.name === modulName);
        if (modul) {
            this.togglePraktikaSelection(modul);
            // Tooltip neu laden
            setTimeout(() => {
                const event = { clientX: 100, clientY: 100 };
                this.showPraktikaTooltip(event);
            }, 100);
        }
    }

    resetPraktika() {
        if (confirm('🔄 Wirklich alle Praktika zurücksetzen?')) {
            this.selectedPraktika = {};
            this.saveSelectedPraktika();
            this.updatePraktikaDisplay();
            this.updateKPDisplay();
            this.showMessage('✅ Alle Praktika zurückgesetzt!', 'success');
        }
    }

    exportPraktika() {
        const exportData = {
            studiengang: 'BSc ITET - ETH Zürich',
            selectedPraktika: this.selectedPraktika,
            timestamp: new Date().toISOString(),
            totalKp: Object.values(this.selectedPraktika).flat().reduce((sum, m) => sum + m.kp, 0),
            version: '1.0'
        };

        this.downloadJSON(exportData, 'itet-praktika.json');
        this.showMessage('📁 Praktika als JSON-Datei gespeichert!', 'success');
    }

    /* ==== LEGENDE TOOLTIP EVENTS ==== */
    addLegendTooltipEvents(div, kategorie) {
        if (kategorie.klasse === "wahl-praktika-projekte") {
            div.style.cursor = "pointer";
            div.style.position = "relative";

            // Icon hinzufügen
            const icon = document.createElement("span");
            icon.innerHTML = " 🎯";
            icon.style.position = "absolute";
            icon.style.top = "5px";
            icon.style.right = "5px";
            icon.style.fontSize = "12px";
            icon.style.opacity = "0.7";
            div.appendChild(icon);

            div.addEventListener("mouseenter", (event) => {
                this.showPraktikaTooltip(event);
            });

            div.addEventListener("mouseleave", () => {
                if (!this.isPraktikaTooltipLocked) {
                    this.hideTooltip();
                }
            });

            div.addEventListener("click", (event) => {
                this.isPraktikaTooltipLocked = !this.isPraktikaTooltipLocked;
                if (this.isPraktikaTooltipLocked) {
                    this.showPraktikaTooltip(event);
                } else {
                    this.hideTooltip();
                }
            });
        }
    }

    /* ==== UTILITY METHODS ==== */
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
            toast.remove();
        }, 3000);
    }

    getModuleName(modulEl) {
        const nameEl = modulEl.querySelector('.modul-titel');
        return nameEl ? nameEl.textContent.trim() : '';
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

    saveSelectedPraktika() {
        try {
            localStorage.setItem('itet-selected-praktika', JSON.stringify(this.selectedPraktika));
        } catch (error) {
            console.error('Fehler beim Speichern:', error);
        }
    }

    loadSelectedPraktika() {
        try {
            const saved = localStorage.getItem('itet-selected-praktika');
            return saved ? JSON.parse(saved) : {};
        } catch (error) {
            console.error('Fehler beim Laden:', error);
            return {};
        }
    }
};

console.log('✅ ITET Extensions - Vereinfacht und Funktional - geladen');