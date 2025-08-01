/* ==== RIG DRAG & DROP EXTENSIONS ==== */
/* Erweiterte Funktionalitäten für interaktive Studienplangestaltung */

/* ==== RIG-SPEZIFISCHE ERWEITERUNGEN MIT DRAG & DROP ==== */
window.StudiengangCustomClass = class RIGStudienplan extends StudienplanBase {
    constructor(config) {
        super(config);
        this.isWahlmoduleTooltipLocked = false;
        this.isDragDropMode = false;
        this.selectedModules = this.loadSelectedModules();
        this.maxKpPerSemester = 30;
        this.semesterKpCounts = {};
        
        // Definiere verfügbare Wahlmodule basierend auf den Bereichen
        this.wahlmoduleBereiche = {
            "Geodäsie und Satellitennavigation": [
                { name: "Physikalische und kinematische Geodäsie", kp: 6, kategorie: "wahlmodule" },
                { name: "Globale Satellitennavigationssysteme", kp: 3, kategorie: "wahlmodule" },
                { name: "Geodätische Datenanalyse", kp: 3, kategorie: "wahlmodule" },
                { name: "Navigation", kp: 3, kategorie: "wahlmodule" }
            ],
            "Digitalisierung und 3D-Modellierung": [
                { name: "Photogrammetrie", kp: 6, kategorie: "wahlmodule" },
                { name: "Geodätische Messtechnik und Laserscanning", kp: 6, kategorie: "wahlmodule" },
                { name: "Bildverarbeitung", kp: 3, kategorie: "wahlmodule" }
            ],
            "GIS und Kartografie": [
                { name: "Kartografie II", kp: 6, kategorie: "wahlmodule" },
                { name: "Geoinformationstechnologien und -analysen", kp: 6, kategorie: "wahlmodule" },
                { name: "Projekt GIS & Kartografie", kp: 3, kategorie: "wahlmodule" }
            ],
            "Raum- und Umweltplanung": [
                { name: "Umweltplanung", kp: 3, kategorie: "wahlmodule" },
                { name: "Umweltverträglichkeitsprüfung", kp: 3, kategorie: "wahlmodule" },
                { name: "Integrierte Raumentwicklung in Städten und Quartieren", kp: 6, kategorie: "wahlmodule" },
                { name: "Angewandte Planung zur nachhaltigen Siedlungsentwicklung", kp: 3, kategorie: "wahlmodule" }
            ],
            "Verkehrssysteme": [
                { name: "Verkehrsplanung", kp: 3, kategorie: "wahlmodule" },
                { name: "Projektübung Verkehr", kp: 6, kategorie: "wahlmodule" },
                { name: "Public transport and railways", kp: 3, kategorie: "wahlmodule" },
                { name: "Road Transport Systems", kp: 3, kategorie: "wahlmodule" }
            ],
            "Netzinfrastrukturen": [
                { name: "Einführung in elektrische Energiesysteme", kp: 2, kategorie: "wahlmodule" },
                { name: "Siedlungswasserwirtschaft GZ", kp: 6, kategorie: "wahlmodule" },
                { name: "Strasseninfrastruktur", kp: 3, kategorie: "wahlmodule" },
                { name: "Bahninfrastrukturen 1", kp: 2, kategorie: "wahlmodule" },
                { name: "Perspekt. auf Landschaft und urbane Transf. II", kp: 2, kategorie: "wahlmodule" }
            ]
        };
        
        // Freie Wahl Module Beispiele
        this.freieWahlModule = [
            { name: "Fremdsprachen", kp: 3, kategorie: "freie-wahl" },
            { name: "Science in Perspective I", kp: 2, kategorie: "freie-wahl" },
            { name: "Science in Perspective II", kp: 3, kategorie: "freie-wahl" },
            { name: "Entrepreneurship", kp: 2, kategorie: "freie-wahl" },
            { name: "Zusatzmodul Mathematik", kp: 4, kategorie: "freie-wahl" },
            { name: "Wissenschaftliches Schreiben", kp: 2, kategorie: "freie-wahl" }
        ];
    }

    initialize() {
        super.initialize();
        this.addDragDropControls();
        this.updateKpCounts();
    }

    addDragDropControls() {
        // Toggle Button für Drag & Drop Modus
        const legendContainer = document.querySelector(".farben-legende");

        const dragDropControls = document.createElement("div");
        dragDropControls.style.marginBottom = "20px";
        dragDropControls.style.padding = "15px";
        dragDropControls.style.backgroundColor = "#f8f9fa";
        dragDropControls.style.borderRadius = "8px";
        dragDropControls.style.border = "2px solid #DC143C";
        
        dragDropControls.innerHTML = `
            <div style="text-align: center; margin-bottom: 15px;">
                <h3 style="margin: 0 0 10px 0; color: #DC143C;">🎯 Studienplan Designer</h3>
                <button id="toggle-dragdrop" style="
                    background: #DC143C; 
                    color: white; 
                    border: none; 
                    padding: 10px 20px; 
                    border-radius: 5px; 
                    cursor: pointer;
                    font-weight: bold;
                    font-size: 14px;
                ">
                    📝 Meinen Studienplan erstellen
                </button>
            </div>
            
            <div id="dragdrop-info" style="display: none; font-size: 12px; color: #666; text-align: center;">
                <p style="margin: 5px 0;">
                    💡 <strong>Ziehe Module per Drag & Drop in deinen Studienplan!</strong><br>
                    📊 Wahlmodule: <span id="selected-wahlmodule">0</span> von 3 Bereichen<br>
                    📚 Freie Wahl: <span id="selected-freie-wahl">0</span> KP von 15 KP
                </p>
                <div style="margin-top: 10px;">
                    <button id="save-plan" style="background: #28a745; color: white; border: none; padding: 5px 15px; border-radius: 3px; cursor: pointer; margin-right: 5px;">💾 Speichern</button>
                    <button id="load-plan" style="background: #007bff; color: white; border: none; padding: 5px 15px; border-radius: 3px; cursor: pointer; margin-right: 5px;">📂 Laden</button>
                    <button id="reset-plan" style="background: #dc3545; color: white; border: none; padding: 5px 15px; border-radius: 3px; cursor: pointer;">🔄 Reset</button>
                </div>
            </div>
        `;

        legendContainer.insertBefore(dragDropControls, legendContainer.firstChild);

        // Event Listeners
        document.getElementById('toggle-dragdrop').addEventListener('click', () => {
            this.toggleDragDropMode();
        });

        document.getElementById('save-plan').addEventListener('click', () => {
            this.saveStudienplan();
        });

        document.getElementById('load-plan').addEventListener('click', () => {
            this.loadStudienplan();
        });

        document.getElementById('reset-plan').addEventListener('click', () => {
            this.resetStudienplan();
        });
    }

    toggleDragDropMode() {
        this.isDragDropMode = !this.isDragDropMode;
        const button = document.getElementById('toggle-dragdrop');
        const info = document.getElementById('dragdrop-info');
        
        if (this.isDragDropMode) {
            button.textContent = '👁️ Normale Ansicht';
            button.style.background = '#28a745';
            info.style.display = 'block';
            this.showDragDropInterface();
        } else {
            button.textContent = '📝 Meinen Studienplan erstellen';
            button.style.background = '#DC143C';
            info.style.display = 'none';
            this.showNormalInterface();
        }
    }

    showDragDropInterface() {
        const container = document.getElementById('studienplan');
        container.innerHTML = '';
        
        // Zwei-Spalten Layout
        const mainContainer = document.createElement('div');
        mainContainer.style.display = 'flex';
        mainContainer.style.gap = '20px';
        mainContainer.style.height = '80vh';
        
        // Linke Spalte: Verfügbare Module
        const availableSection = document.createElement('div');
        availableSection.style.flex = '1';
        availableSection.style.overflowY = 'auto';
        availableSection.style.border = '2px solid #90EE90';
        availableSection.style.borderRadius = '8px';
        availableSection.style.padding = '15px';
        availableSection.style.backgroundColor = '#f8fff8';
        
        const availableTitle = document.createElement('h3');
        availableTitle.textContent = '📚 Verfügbare Module';
        availableTitle.style.margin = '0 0 15px 0';
        availableTitle.style.color = '#2d5a2d';
        availableSection.appendChild(availableTitle);
        
        this.createAvailableModules(availableSection);
        
        // Rechte Spalte: Mein Studienplan
        const planSection = document.createElement('div');
        planSection.style.flex = '1';
        planSection.style.overflowY = 'auto';
        planSection.style.border = '2px solid #DC143C';
        planSection.style.borderRadius = '8px';
        planSection.style.padding = '15px';
        planSection.style.backgroundColor = '#fff8f8';
        
        const planTitle = document.createElement('h3');
        planTitle.textContent = '🎯 Mein Studienplan';
        planTitle.style.margin = '0 0 15px 0';
        planTitle.style.color = '#8B0000';
        planSection.appendChild(planTitle);
        
        this.createMyStudienplan(planSection);
        
        mainContainer.appendChild(availableSection);
        mainContainer.appendChild(planSection);
        container.appendChild(mainContainer);
        
        this.updateKpCounts();
    }

    createAvailableModules(container) {
        // Wahlmodule Bereiche
        const wahlmoduleTitle = document.createElement('h4');
        wahlmoduleTitle.textContent = '🔧 Wahlmodule (wähle 3 aus 6 Bereichen)';
        wahlmoduleTitle.style.color = '#FF6B6B';
        container.appendChild(wahlmoduleTitle);
        
        Object.entries(this.wahlmoduleBereiche).forEach(([bereich, module]) => {
            const bereichDiv = document.createElement('div');
            bereichDiv.style.marginBottom = '15px';
            bereichDiv.style.padding = '10px';
            bereichDiv.style.backgroundColor = '#fff';
            bereichDiv.style.borderRadius = '5px';
            bereichDiv.style.border = '1px solid #ddd';
            
            const bereichTitle = document.createElement('h5');
            bereichTitle.textContent = bereich;
            bereichTitle.style.margin = '0 0 8px 0';
            bereichTitle.style.color = '#333';
            bereichDiv.appendChild(bereichTitle);
            
            const moduleContainer = document.createElement('div');
            moduleContainer.style.display = 'flex';
            moduleContainer.style.flexWrap = 'wrap';
            moduleContainer.style.gap = '5px';
            
            module.forEach(modul => {
                if (!this.isModuleSelected(modul.name)) {
                    const modulDiv = this.createDraggableModule(modul, 'available');
                    moduleContainer.appendChild(modulDiv);
                }
            });
            
            bereichDiv.appendChild(moduleContainer);
            container.appendChild(bereichDiv);
        });
        
        // Freie Wahl Module
        const freieWahlTitle = document.createElement('h4');
        freieWahlTitle.textContent = '🌟 Freie Wahl + SIP (15 KP total)';
        freieWahlTitle.style.color = '#90EE90';
        freieWahlTitle.style.marginTop = '20px';
        container.appendChild(freieWahlTitle);
        
        const freieWahlContainer = document.createElement('div');
        freieWahlContainer.style.display = 'flex';
        freieWahlContainer.style.flexWrap = 'wrap';
        freieWahlContainer.style.gap = '5px';
        freieWahlContainer.style.padding = '10px';
        freieWahlContainer.style.backgroundColor = '#fff';
        freieWahlContainer.style.borderRadius = '5px';
        freieWahlContainer.style.border = '1px solid #ddd';
        
        this.freieWahlModule.forEach(modul => {
            if (!this.isModuleSelected(modul.name)) {
                const modulDiv = this.createDraggableModule(modul, 'available');
                freieWahlContainer.appendChild(modulDiv);
            }
        });
        
        container.appendChild(freieWahlContainer);
    }

    createMyStudienplan(container) {
        // Obligatorische Module zuerst anzeigen (nicht verschiebbar)
        const obligatorischTitle = document.createElement('h4');
        obligatorischTitle.textContent = '✅ Obligatorische Module (fest)';
        obligatorischTitle.style.color = '#666';
        container.appendChild(obligatorischTitle);
        
        const obligatorischContainer = document.createElement('div');
        obligatorischContainer.style.display = 'flex';
        obligatorischContainer.style.flexWrap = 'wrap';
        obligatorischContainer.style.gap = '3px';
        obligatorischContainer.style.marginBottom = '20px';
        obligatorischContainer.style.padding = '10px';
        obligatorischContainer.style.backgroundColor = '#f5f5f5';
        obligatorischContainer.style.borderRadius = '5px';
        obligatorischContainer.style.border = '1px solid #ccc';
        
        const obligatorischeModule = this.config.daten.filter(m => 
            m.kategorie === 'grundlagen' || m.kategorie === 'obligatorisch' || m.kategorie === 'selbstaendig'
        );
        
        obligatorischeModule.forEach(modul => {
            const modulDiv = this.createStaticModule(modul);
            obligatorischContainer.appendChild(modulDiv);
        });
        
        container.appendChild(obligatorischContainer);
        
        // Semester für flexible Module
        for (let semester = 3; semester <= 6; semester++) {
            const semesterDiv = document.createElement('div');
            semesterDiv.className = 'semester-dropzone';
            semesterDiv.dataset.semester = semester;
            semesterDiv.style.marginBottom = '15px';
            semesterDiv.style.padding = '10px';
            semesterDiv.style.border = '2px dashed #ccc';
            semesterDiv.style.borderRadius = '8px';
            semesterDiv.style.minHeight = '80px';
            semesterDiv.style.backgroundColor = '#fafafa';
            
            const semesterTitle = document.createElement('h5');
            semesterTitle.textContent = `${semester}. Semester`;
            semesterTitle.style.margin = '0 0 10px 0';
            semesterDiv.appendChild(semesterTitle);
            
            const kpDisplay = document.createElement('div');
            kpDisplay.className = 'kp-display';
            kpDisplay.style.fontSize = '12px';
            kpDisplay.style.color = '#666';
            kpDisplay.style.marginBottom = '8px';
            semesterDiv.appendChild(kpDisplay);
            
            const moduleContainer = document.createElement('div');
            moduleContainer.className = 'semester-modules';
            moduleContainer.style.display = 'flex';
            moduleContainer.style.flexWrap = 'wrap';
            moduleContainer.style.gap = '5px';
            
            // Bereits ausgewählte Module für dieses Semester anzeigen
            this.getSelectedModulesForSemester(semester).forEach(modul => {
                const modulDiv = this.createDraggableModule(modul, 'selected');
                moduleContainer.appendChild(modulDiv);
            });
            
            semesterDiv.appendChild(moduleContainer);
            container.appendChild(semesterDiv);
            
            this.makeSemesterDroppable(semesterDiv);
        }
    }

    createDraggableModule(modul, type) {
        const div = document.createElement('div');
        div.className = `draggable-module ${type}`;
        div.draggable = true;
        div.dataset.moduleName = modul.name;
        div.dataset.modulKp = modul.kp;
        div.dataset.modulKategorie = modul.kategorie;
        
        // Styling basierend auf Kategorie
        const cssClass = this.getModuleCssClass(modul);
        if (cssClass) {
            div.classList.add(cssClass);
        }
        
        div.style.padding = '8px';
        div.style.borderRadius = '4px';
        div.style.cursor = 'grab';
        div.style.userSelect = 'none';
        div.style.minWidth = '120px';
        div.style.textAlign = 'center';
        div.style.fontSize = '12px';
        div.style.border = '1px solid rgba(0,0,0,0.1)';
        
        // KP anzeigen
        const kpSpan = document.createElement('div');
        kpSpan.style.fontWeight = 'bold';
        kpSpan.style.fontSize = '10px';
        kpSpan.textContent = `${modul.kp} KP`;
        div.appendChild(kpSpan);
        
        // Modulname
        const nameSpan = document.createElement('div');
        nameSpan.style.fontSize = '11px';
        nameSpan.style.lineHeight = '1.2';
        nameSpan.style.marginTop = '2px';
        nameSpan.textContent = modul.name;
        div.appendChild(nameSpan);
        
        // Drag Events
        div.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', JSON.stringify(modul));
            div.style.opacity = '0.5';
        });
        
        div.addEventListener('dragend', (e) => {
            div.style.opacity = '1';
        });
        
        // Entfernen-Button für ausgewählte Module
        if (type === 'selected') {
            const removeBtn = document.createElement('span');
            removeBtn.textContent = '×';
            removeBtn.style.position = 'absolute';
            removeBtn.style.top = '-8px';
            removeBtn.style.right = '-8px';
            removeBtn.style.background = '#dc3545';
            removeBtn.style.color = 'white';
            removeBtn.style.borderRadius = '50%';
            removeBtn.style.width = '16px';
            removeBtn.style.height = '16px';
            removeBtn.style.fontSize = '12px';
            removeBtn.style.display = 'flex';
            removeBtn.style.alignItems = 'center';
            removeBtn.style.justifyContent = 'center';
            removeBtn.style.cursor = 'pointer';
            
            div.style.position = 'relative';
            div.appendChild(removeBtn);
            
            removeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.removeModuleFromPlan(modul);
            });
        }
        
        return div;
    }

    createStaticModule(modul) {
        const div = document.createElement('div');
        div.className = 'static-module';
        
        const cssClass = this.getModuleCssClass(modul);
        if (cssClass) {
            div.classList.add(cssClass);
        }
        
        div.style.padding = '6px';
        div.style.borderRadius = '3px';
        div.style.minWidth = '100px';
        div.style.textAlign = 'center';
        div.style.fontSize = '11px';
        div.style.opacity = '0.7';
        div.style.border = '1px solid rgba(0,0,0,0.1)';
        
        const kpSpan = document.createElement('div');
        kpSpan.style.fontWeight = 'bold';
        kpSpan.style.fontSize = '9px';
        kpSpan.textContent = `${modul.kp} KP`;
        div.appendChild(kpSpan);
        
        const nameSpan = document.createElement('div');
        nameSpan.style.fontSize = '10px';
        nameSpan.style.lineHeight = '1.1';
        nameSpan.textContent = modul.name.length > 20 ? modul.name.substring(0, 17) + '...' : modul.name;
        nameSpan.title = modul.name;
        div.appendChild(nameSpan);
        
        return div;
    }

    makeSemesterDroppable(semesterDiv) {
        semesterDiv.addEventListener('dragover', (e) => {
            e.preventDefault();
            semesterDiv.style.backgroundColor = '#e8f5e8';
            semesterDiv.style.borderColor = '#28a745';
        });
        
        semesterDiv.addEventListener('dragleave', (e) => {
            if (!semesterDiv.contains(e.relatedTarget)) {
                semesterDiv.style.backgroundColor = '#fafafa';
                semesterDiv.style.borderColor = '#ccc';
            }
        });
        
        semesterDiv.addEventListener('drop', (e) => {
            e.preventDefault();
            const modulData = JSON.parse(e.dataTransfer.getData('text/plain'));
            const semester = parseInt(semesterDiv.dataset.semester);
            
            semesterDiv.style.backgroundColor = '#fafafa';
            semesterDiv.style.borderColor = '#ccc';
            
            this.addModuleToPlan(modulData, semester);
        });
    }

    addModuleToPlan(modul, semester) {
        // Prüfe KP-Limit
        const currentKp = this.getSemesterKp(semester);
        if (currentKp + modul.kp > this.maxKpPerSemester) {
            alert(`⚠️ Zu viele KP! Semester ${semester} hätte ${currentKp + modul.kp} KP (Maximum: ${this.maxKpPerSemester} KP)`);
            return;
        }
        
        // Füge zur Auswahl hinzu
        if (!this.selectedModules[semester]) {
            this.selectedModules[semester] = [];
        }
        
        // Prüfe ob schon ausgewählt
        if (this.selectedModules[semester].some(m => m.name === modul.name)) {
            return;
        }
        
        this.selectedModules[semester].push({...modul, semester});
        
        // Speichere Auswahl
        this.saveSelectedModules();
        
        // Aktualisiere Interface
        this.showDragDropInterface();
    }

    removeModuleFromPlan(modul) {
        Object.keys(this.selectedModules).forEach(semester => {
            this.selectedModules[semester] = this.selectedModules[semester].filter(m => m.name !== modul.name);
        });
        
        this.saveSelectedModules();
        this.showDragDropInterface();
    }

    getSemesterKp(semester) {
        if (!this.selectedModules[semester]) return 0;
        return this.selectedModules[semester].reduce((sum, m) => sum + m.kp, 0);
    }

    getSelectedModulesForSemester(semester) {
        return this.selectedModules[semester] || [];
    }

    isModuleSelected(moduleName) {
        return Object.values(this.selectedModules).some(semesterModules => 
            semesterModules.some(m => m.name === moduleName)
        );
    }

    updateKpCounts() {
        // Update Wahlmodule Count
        const selectedBereiche = new Set();
        Object.values(this.selectedModules).flat().forEach(modul => {
            Object.entries(this.wahlmoduleBereiche).forEach(([bereich, module]) => {
                if (module.some(m => m.name === modul.name)) {
                    selectedBereiche.add(bereich);
                }
            });
        });
        
        const wahlmoduleDisplay = document.getElementById('selected-wahlmodule');
        if (wahlmoduleDisplay) {
            wahlmoduleDisplay.textContent = selectedBereiche.size;
            wahlmoduleDisplay.style.color = selectedBereiche.size >= 3 ? '#28a745' : '#dc3545';
        }
        
        // Update Freie Wahl KP
        const freieWahlKp = Object.values(this.selectedModules).flat()
            .filter(m => m.kategorie === 'freie-wahl')
            .reduce((sum, m) => sum + m.kp, 0);
        
        const freieWahlDisplay = document.getElementById('selected-freie-wahl');
        if (freieWahlDisplay) {
            freieWahlDisplay.textContent = freieWahlKp;
            freieWahlDisplay.style.color = freieWahlKp >= 15 ? '#28a745' : '#dc3545';
        }
        
        // Update Semester KP Displays
        document.querySelectorAll('.kp-display').forEach(display => {
            const semesterDiv = display.closest('.semester-dropzone');
            if (semesterDiv) {
                const semester = parseInt(semesterDiv.dataset.semester);
                const currentKp = this.getSemesterKp(semester);
                display.textContent = `KP: ${currentKp}/${this.maxKpPerSemester}`;
                display.style.color = currentKp > this.maxKpPerSemester ? '#dc3545' : '#28a745';
            }
        });
    }

    showNormalInterface() {
        // Zurück zur normalen Ansicht
        this.createStudienplan();
    }

    saveSelectedModules() {
        localStorage.setItem('rig-selected-modules', JSON.stringify(this.selectedModules));
    }

    loadSelectedModules() {
        const saved = localStorage.getItem('rig-selected-modules');
        return saved ? JSON.parse(saved) : {};
    }

    saveStudienplan() {
        const planData = {
            selectedModules: this.selectedModules,
            timestamp: new Date().toISOString(),
            version: '1.0'
        };
        
        const dataStr = JSON.stringify(planData, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'rig-studienplan.json';
        link.click();
        
        URL.revokeObjectURL(url);
        
        alert('📁 Studienplan als JSON-Datei heruntergeladen!');
    }

    loadStudienplan() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const planData = JSON.parse(e.target.result);
                    this.selectedModules = planData.selectedModules || {};
                    this.saveSelectedModules();
                    this.showDragDropInterface();
                    alert('📂 Studienplan erfolgreich geladen!');
                } catch (error) {
                    alert('❌ Fehler beim Laden der Datei!');
                }
            };
            reader.readAsText(file);
        };
        
        input.click();
    }

    resetStudienplan() {
        if (confirm('🔄 Wirklich alle Auswahlmodule zurücksetzen?')) {
            this.selectedModules = {};
            this.saveSelectedModules();
            this.showDragDropInterface();
            alert('✅ Studienplan zurückgesetzt!');
        }
    }

    // Überschreibe addLegendTooltipEvents für Wahlmodule-Tooltips
    addLegendTooltipEvents(div, kategorie) {
        if (kategorie.klasse === "wahlmodule") {
            div.addEventListener("mouseenter", (event) => {
                this.showWahlmoduleTooltip(event);
            });

            div.addEventListener("mouseleave", () => {
                if (!this.isWahlmoduleTooltipLocked) {
                    this.hideTooltip();
                }
            });

            div.addEventListener("click", (event) => {
                this.isWahlmoduleTooltipLocked = !this.isWahlmoduleTooltipLocked;
                if (this.isWahlmoduleTooltipLocked) {
                    this.showWahlmoduleTooltip(event);
                } else {
                    this.hideTooltip();
                }
            });
        }
    }

    showWahlmoduleTooltip(event) {
        const content = `
            <div class="wahlmodule-liste">
                <h3>Wahlmodule-Bereiche (3 aus 6 auswählen)</h3>
                
                <h4>Geodäsie und Satellitennavigation</h4>
                <ul>
                    <li>Physikalische und kinematische Geodäsie – 6 KP</li>
                    <li>Globale Satellitennavigationssysteme – 3 KP</li>
                    <li>Geodätische Datenanalyse – 3 KP</li>
                    <li>Navigation – 3 KP</li>
                </ul>
                
                <h4>Digitalisierung und 3D-Modellierung</h4>
                <ul>
                    <li>Photogrammetrie – 6 KP</li>
                    <li>Geodätische Messtechnik und Laserscanning – 6 KP</li>
                    <li>Bildverarbeitung – 3 KP</li>
                </ul>
                
                <h4>GIS und Kartografie</h4>
                <ul>
                    <li>Kartografie II – 6 KP</li>
                    <li>Geoinformationstechnologien und -analysen – 6 KP</li>
                    <li>Projekt GIS & Kartografie – 3 KP</li>
                </ul>
                
                <h4>Raum- und Umweltplanung</h4>
                <ul>
                    <li>Umweltplanung – 3 KP</li>
                    <li>Umweltverträglichkeitsprüfung – 3 KP</li>
                    <li>Integrierte Raumentwicklung in Städten und Quartieren – 6 KP</li>
                    <li>Angewandte Planung zur nachhaltigen Siedlungsentwicklung – 3 KP</li>
                </ul>
                
                <h4>Verkehrssysteme</h4>
                <ul>
                    <li>Verkehrsplanung – 3 KP</li>
                    <li>Projektübung Verkehr – 6 KP</li>
                    <li>Public transport and railways – 3 KP</li>
                    <li>Road Transport Systems – 3 KP</li>
                </ul>
                
                <h4>Netzinfrastrukturen</h4>
                <ul>
                    <li>Einführung in elektrische Energiesysteme – 2 KP</li>
                    <li>Siedlungswasserwirtschaft GZ – 6 KP</li>
                    <li>Strasseninfrastruktur – 3 KP</li>
                    <li>Bahninfrastrukturen 1 – 2 KP</li>
                    <li>Perspekt. auf Landschaft und urbane Transf. II – 2 KP</li>
                </ul>
            </div>
        `;
        this.showCustomTooltip(content, event);
    }

    hideTooltip() {
        if (this.tooltipEl) {
            this.tooltipEl.style.display = 'none';
        }
        this.aktivesModul = null;
        this.isWahlmoduleTooltipLocked = false;
    }
};