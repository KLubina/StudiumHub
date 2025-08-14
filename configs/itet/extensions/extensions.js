/* ==== ITET DRAG & DROP EXTENSIONS ==== */
/* Drag & Drop für Praktika, Projekte und Seminare im 3. Jahr */

window.StudiengangCustomClass = class ITETStudienplan extends StudienplanBase {
    constructor(config) {
        super(config);
        this.kpCounter = null;
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
        this.updateKPDisplay();
        this.addPraktikaControls();
        this.makePraktikaDroppable();
        this.updatePraktikaDisplay();
    }

    addKPCounter() {
        // KP-Counter Container zur Legende hinzufügen
        const legendContainer = document.querySelector(".farben-legende");
        
        // Counter vor der Legende einfügen
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
                    <!-- Status wird hier eingefügt -->
                </div>
            </div>
            
            <div id="kp-breakdown" style="font-size: 11px; line-height: 1.4;">
                <!-- Aufschlüsselung wird hier eingefügt -->
            </div>
            
            <div style="margin-top: 12px; text-align: center;">
                <button id="refresh-kp" style="background: #28a745; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 11px;">
                    🔄 Aktualisieren
                </button>
                <button id="export-kp" style="background: #17a2b8; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 11px; margin-left: 5px;">
                    📊 Export
                </button>
            </div>
        `;

        // Container vor der Legende einfügen
        legendContainer.insertBefore(kpCounterContainer, legendContainer.firstChild);
        
        // Event Listeners hinzufügen
        document.getElementById('refresh-kp').addEventListener('click', () => {
            this.updateKPDisplay();
            this.showMessage('✅ KP-Zählung aktualisiert!', 'success');
        });
        
        document.getElementById('export-kp').addEventListener('click', () => {
            this.exportKPBreakdown();
        });
        
        this.kpCounter = kpCounterContainer;
    }

    addPraktikaControls() {
        // Praktika Controls zur Legende hinzufügen
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
        // Finde alle Praktika-Boxen im Studienplan
        document.querySelectorAll('.modul').forEach(modulEl => {
            const modulName = this.getModuleName(modulEl);
            if (modulName.includes('Android Application Development') || 
                modulName.includes('Python for Engineers') || 
                modulName.includes('Python for Science') || 
                modulName.includes('Hands-On Deep Learning') || 
                modulName.includes('Capture the Flag') || 
                modulName.includes('Neural Network on Low')) {
                this.setupPraktikaDropZone(modulEl);
            }
        });
    }

    setupPraktikaDropZone(praktikaBox) {
        praktikaBox.style.position = 'relative';
        praktikaBox.classList.add('praktika-dropzone');
        
        // Drop Events
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
            
            const modulData = JSON.parse(e.dataTransfer.getData('text/plain'));
            this.addPraktikaToBox(modulData, praktikaBox);
        });

        // Zeige bereits ausgewählte Module
        this.updatePraktikaBoxContent(praktikaBox);
    }

    addPraktikaToBox(modul, praktikaBox) {
        const boxId = this.getPraktikaBoxId(praktikaBox);
        
        // Prüfe ob schon ausgewählt
        if (this.isPraktikaSelected(modul.name)) {
            this.showMessage(`ℹ️ "${modul.name}" ist bereits ausgewählt`, 'info');
            return;
        }

        // Füge zur Auswahl hinzu
        if (!this.selectedPraktika[boxId]) {
            this.selectedPraktika[boxId] = [];
        }
        
        this.selectedPraktika[boxId].push({...modul});
        this.saveSelectedPraktika();
        
        // Aktualisiere UI
        this.updatePraktikaBoxContent(praktikaBox);
        this.updatePraktikaDisplay();
        this.updateKPDisplay(); // KP-Counter aktualisieren
        this.showMessage(`✅ "${modul.name}" hinzugefügt`, 'success');
    }

    updatePraktikaBoxContent(praktikaBox) {
        const boxId = this.getPraktikaBoxId(praktikaBox);
        const selectedModules = this.selectedPraktika[boxId] || [];

        // Entferne alte Module-Container
        const existingContainer = praktikaBox.querySelector('.praktika-container');
        if (existingContainer) {
            existingContainer.remove();
        }

        // Erstelle neuen Module-Container
        if (selectedModules.length > 0) {
            const moduleContainer = document.createElement('div');
            moduleContainer.className = 'praktika-container';
            moduleContainer.style.position = 'absolute';
            moduleContainer.style.top = '0';
            moduleContainer.style.left = '0';
            moduleContainer.style.width = '100%';
            moduleContainer.style.height = '100%';
            moduleContainer.style.display = 'flex';
            moduleContainer.style.flexWrap = 'wrap';
            moduleContainer.style.gap = '2px';
            moduleContainer.style.padding = '20px 5px 5px 5px';
            moduleContainer.style.boxSizing = 'border-box';
            moduleContainer.style.overflow = 'hidden';

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
        
        // Größe setzen
        div.style.width = '80px';
        div.style.height = '50px';
        div.style.position = 'relative';
        div.style.borderRadius = '4px';
        div.style.border = '1px solid rgba(255,255,255,0.3)';
        div.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
        div.style.display = 'flex';
        div.style.flexDirection = 'column';
        div.style.justifyContent = 'space-between';
        div.style.alignItems = 'center';
        div.style.padding = '3px';
        div.style.margin = '1px';
        div.style.overflow = 'hidden';
        div.style.transition = 'transform 0.2s ease';
        div.style.background = '#4CA64C';
        div.style.color = 'white';
        
        // KP-Anzeige
        const kpDiv = document.createElement('div');
        kpDiv.textContent = `${modul.kp} KP`;
        kpDiv.style.fontSize = '9px';
        kpDiv.style.fontWeight = 'bold';
        kpDiv.style.color = 'white';
        kpDiv.style.textAlign = 'center';
        div.appendChild(kpDiv);
        
        // Modultitel (gekürzt)
        const titleDiv = document.createElement('div');
        const shortName = modul.name.length > 25 ? modul.name.substring(0, 22) + '...' : modul.name;
        titleDiv.textContent = shortName;
        titleDiv.title = modul.name;
        titleDiv.style.fontSize = '7px';
        titleDiv.style.color = 'white';
        titleDiv.style.textAlign = 'center';
        titleDiv.style.lineHeight = '1.1';
        titleDiv.style.flex = '1';
        titleDiv.style.display = 'flex';
        titleDiv.style.alignItems = 'center';
        titleDiv.style.justifyContent = 'center';
        titleDiv.style.wordBreak = 'break-word';
        div.appendChild(titleDiv);
        
        // Remove-Button
        const removeBtn = document.createElement('div');
        removeBtn.innerHTML = '×';
        removeBtn.style.position = 'absolute';
        removeBtn.style.top = '1px';
        removeBtn.style.right = '1px';
        removeBtn.style.width = '12px';
        removeBtn.style.height = '12px';
        removeBtn.style.backgroundColor = 'rgba(220, 53, 69, 0.8)';
        removeBtn.style.color = 'white';
        removeBtn.style.borderRadius = '50%';
        removeBtn.style.display = 'flex';
        removeBtn.style.alignItems = 'center';
        removeBtn.style.justifyContent = 'center';
        removeBtn.style.cursor = 'pointer';
        removeBtn.style.fontSize = '10px';
        removeBtn.style.fontWeight = 'bold';
        
        removeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.removePraktika(modul, praktikaBox);
        });
        
        div.appendChild(removeBtn);
        
        // Hover-Effekte
        div.addEventListener('mouseenter', () => {
            div.style.transform = 'scale(1.05)';
            div.style.zIndex = '10';
        });
        
        div.addEventListener('mouseleave', () => {
            div.style.transform = 'scale(1)';
            div.style.zIndex = '1';
        });
        
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

    getPraktikaBoxId(praktikaBox) {
        // Erstelle eine eindeutige ID basierend auf der Position oder dem Inhalt
        const allPraktikaBoxes = Array.from(document.querySelectorAll('.praktika-dropzone'));
        return `praktika-${allPraktikaBoxes.indexOf(praktikaBox)}`;
    }

    isPraktikaSelected(modulName) {
        return Object.values(this.selectedPraktika).some(boxModules => 
            boxModules.some(m => m.name === modulName)
        );
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
            const title = isSelected ? 'Bereits ausgewählt' : 'Ziehe mich in eine Praktika-Box';

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
                     "
                     title="${title}">
                    <div style="font-weight: bold; margin-bottom: 2px;">${modul.kp} KP</div>
                    <div style="line-height: 1; overflow: hidden; text-overflow: ellipsis;">${modul.name.length > 35 ? modul.name.substring(0, 32) + '...' : modul.name}</div>
                </div>
            `;
        });

        content += `
                </div>
            </div>
        `;

        // Nach dem Erstellen des Tooltips, füge Drag-Events hinzu
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

    updatePraktikaDisplay() {
        const totalKp = Object.values(this.selectedPraktika).flat().reduce((sum, m) => sum + m.kp, 0);
        const kpDisplay = document.getElementById('selected-praktika-kp');
        if (kpDisplay) {
            kpDisplay.textContent = totalKp;
            kpDisplay.style.color = totalKp > 0 ? '#28a745' : '#dc3545';
        }
    }

    resetPraktikaBoxStyle(box) {
        box.style.borderColor = '';
        box.style.backgroundColor = '';
        box.style.transform = '';
    }

    getModuleName(modulEl) {
        const nameEl = modulEl.querySelector('.modul-titel');
        return nameEl ? nameEl.textContent.trim() : '';
    }

    exportPraktika() {
        const exportData = {
            selectedPraktika: this.selectedPraktika,
            timestamp: new Date().toISOString(),
            totalKp: Object.values(this.selectedPraktika).flat().reduce((sum, m) => sum + m.kp, 0)
        };

        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'itet-praktika.json';
        link.click();
        
        URL.revokeObjectURL(url);
        this.showMessage('📁 Praktika als JSON-Datei gespeichert!', 'success');
    }

    resetPraktika() {
        if (confirm('🔄 Wirklich alle Praktika zurücksetzen?')) {
            this.selectedPraktika = {};
            this.saveSelectedPraktika();
            
            document.querySelectorAll('.praktika-dropzone').forEach(box => {
                this.updatePraktikaBoxContent(box);
            });
            
            this.updatePraktikaDisplay();
            this.updateKPDisplay();
            this.showMessage('✅ Alle Praktika zurückgesetzt!', 'success');
        }
    }

    saveSelectedPraktika() {
        localStorage.setItem('itet-selected-praktika', JSON.stringify(this.selectedPraktika));
    }

    loadSelectedPraktika() {
        const saved = localStorage.getItem('itet-selected-praktika');
        return saved ? JSON.parse(saved) : {};
    }

    // KP Counter Methoden (gleich wie vorher)
    updateKPDisplay() {
        const breakdown = this.calculateKPBreakdown();
        
        // Gesamtsumme aktualisieren
        document.getElementById('total-kp').textContent = breakdown.total;
        
        // Status aktualisieren
        const statusEl = document.getElementById('kp-status');
        const requiredKP = 180;
        const remaining = Math.max(0, requiredKP - breakdown.total);
        
        if (breakdown.total >= requiredKP) {
            statusEl.innerHTML = `✅ <span style="color: #28a745;">Mindestanforderung erfüllt!</span>`;
            statusEl.style.backgroundColor = 'rgba(40, 167, 69, 0.2)';
        } else {
            statusEl.innerHTML = `⚠️ <span style="color: #ffc107;">Noch ${remaining} KP benötigt</span>`;
            statusEl.style.backgroundColor = 'rgba(255, 193, 7, 0.2)';
        }
        statusEl.style.padding = '3px 6px';
        statusEl.style.borderRadius = '3px';
        statusEl.style.marginTop = '5px';
        
        // Aufschlüsselung aktualisieren
        this.updateKPBreakdown(breakdown);
    }

    calculateKPBreakdown() {
        const breakdown = {
            total: 0,
            byCategory: {},
            byYear: {},
            moduleCount: 0
        };
        
        // Standard Module
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
        
        // Hinzugefügte Praktika
        Object.values(this.selectedPraktika).flat().forEach(modul => {
            breakdown.total += modul.kp;
            breakdown.moduleCount++;
            
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
            </div>
            
            <div style="margin-bottom: 10px;">
                <strong>📚 Nach Kategorien:</strong>
        `;
        
        const sortedCategories = Object.entries(breakdown.byCategory)
            .sort(([,a], [,b]) => b.kp - a.kp);
        
        sortedCategories.forEach(([kategorie, data]) => {
            const percentage = ((data.kp / breakdown.total) * 100).toFixed(1);
            const color = this.getCategoryColor(kategorie);
            
            html += `
                <div style="margin: 3px 0; padding: 2px 4px; border-left: 3px solid ${color}; background-color: rgba(13, 91, 140, 0.05);">
                    <span style="font-weight: 500;">${kategorie}:</span> 
                    <span style="color: ${color}; font-weight: bold;">${data.kp} KP</span> 
                    <span style="color: #666; font-size: 10px;">(${data.count} Module, ${percentage}%)</span>
                </div>
            `;
        });
        
        html += `</div>`;
        breakdownEl.innerHTML = html;
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
            modules: []
        };
        
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
        
        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `itet-complete-breakdown-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        this.showMessage('📁 Vollständige Aufschlüsselung exportiert!', 'success');
    }

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

    showCustomTooltip(content, event) {
        if (!this.tooltipEl) {
            this.tooltipEl = document.getElementById('tooltip');
        }
        
        this.tooltipEl.innerHTML = content;
        
        const closeBtn = document.createElement('div');
        closeBtn.classList.add('close-btn');
        closeBtn.textContent = '×';
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.hideTooltip();
        });
        this.tooltipEl.appendChild(closeBtn);
        
        const windowWidth = window.innerWidth;
        const tooltipWidth = 600;
        
        this.tooltipEl.style.top = '100px';
        this.tooltipEl.style.left = (windowWidth - tooltipWidth - 100) + 'px';
        this.tooltipEl.style.maxWidth = tooltipWidth + 'px';
        this.tooltipEl.style.width = tooltipWidth + 'px';
        this.tooltipEl.style.display = 'block';
    }

    hideTooltip() {
        if (this.tooltipEl) {
            this.tooltipEl.style.display = 'none';
        }
        this.aktivesModul = null;
        this.isPraktikaTooltipLocked = false;
    }
};