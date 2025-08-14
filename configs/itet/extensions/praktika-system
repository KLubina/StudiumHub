/* ==== ITET PRAKTIKA SYSTEM ==== */
/* Praktika Drag & Drop System für ITET */

// Praktika System Methoden zur ITETStudienplan Klasse hinzufügen
Object.assign(window.ITETStudienplan.prototype, {
    
    /**
     * Initialisiert das Praktika System
     */
    initializePraktikaSystem() {
        this.addPraktikaControls();
        this.makePraktikaDroppable();
        this.updatePraktikaDisplay();
        
        console.log('✅ Praktika System initialisiert');
    },

    /**
     * Fügt Praktika-Controls zur UI hinzu
     */
    addPraktikaControls() {
        const legendContainer = document.querySelector(".farben-legende");
        
        const praktikaControls = document.createElement("div");
        praktikaControls.style.marginBottom = "15px";
        praktikaControls.style.padding = "10px";
        praktikaControls.style.backgroundColor = "#fff8f8";
        praktikaControls.style.borderRadius = "5px";
        praktikaControls.style.border = "2px solid #4CA64C";
        praktikaControls.style.transition = "all 0.3s ease";
        
        praktikaControls.innerHTML = `
            <div style="text-align: center; margin-bottom: 10px;">
                <h4 style="margin: 0 0 8px 0; color: #4CA64C;">🎯 Praktika Designer</h4>
                <div style="font-size: 12px; color: #666;">
                    💡 <strong>Ziehe Module aus der Liste in deine Praktika-Boxen!</strong><br>
                    📚 Gewählte KP: <span id="selected-praktika-kp">0</span> KP
                    <span id="praktika-status" style="margin-left: 10px;"></span>
                </div>
                <div style="margin-top: 8px;">
                    <button id="show-praktika-list" style="background: #4CA64C; color: white; border: none; padding: 5px 12px; border-radius: 3px; cursor: pointer; margin-right: 5px; font-size: 11px; transition: all 0.2s ease;">📋 Module zeigen</button>
                    <button id="save-praktika" style="background: #28a745; color: white; border: none; padding: 5px 12px; border-radius: 3px; cursor: pointer; margin-right: 5px; font-size: 11px; transition: all 0.2s ease;">💾 Speichern</button>
                    <button id="reset-praktika" style="background: #dc3545; color: white; border: none; padding: 5px 12px; border-radius: 3px; cursor: pointer; margin-right: 5px; font-size: 11px; transition: all 0.2s ease;">🔄 Reset</button>
                    <button id="import-praktika" style="background: #17a2b8; color: white; border: none; padding: 5px 12px; border-radius: 3px; cursor: pointer; font-size: 11px; transition: all 0.2s ease;">📥 Import</button>
                </div>
            </div>
        `;

        legendContainer.insertBefore(praktikaControls, this.kpCounter.nextSibling);

        // Event Listeners setup
        this.setupPraktikaControlEvents();
    },

    /**
     * Setup Event Listeners für Praktika Controls
     */
    setupPraktikaControlEvents() {
        document.getElementById('show-praktika-list').addEventListener('click', (e) => {
            this.showPraktikaTooltip(e);
        });

        document.getElementById('save-praktika').addEventListener('click', () => {
            this.exportPraktika();
        });

        document.getElementById('reset-praktika').addEventListener('click', () => {
            this.resetPraktika();
        });

        document.getElementById('import-praktika').addEventListener('click', () => {
            this.createFileImporter();
        });
    },

    /**
     * Macht Module zu Dropzones für Praktika
     */
    makePraktikaDroppable() {
        document.querySelectorAll('.modul').forEach(modulEl => {
            const modulName = this.getModuleName(modulEl);
            
            // Prüfe ob es ein Praktika-Platzhalter ist
            if (this.isPraktikaPlaceholder(modulName)) {
                this.setupPraktikaDropZone(modulEl);
            }
        });
    },

    /**
     * Prüft ob ein Modul ein Praktika-Platzhalter ist
     */
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
    },

    /**
     * Setup Dropzone für Praktika-Module
     */
    setupPraktikaDropZone(praktikaBox) {
        praktikaBox.style.position = 'relative';
        praktikaBox.classList.add('praktika-dropzone');
        
        // Drag over Event
        praktikaBox.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.highlightDropZone(praktikaBox, true);
        });
        
        // Drag leave Event
        praktikaBox.addEventListener('dragleave', (e) => {
            if (!praktikaBox.contains(e.relatedTarget)) {
                this.highlightDropZone(praktikaBox, false);
            }
        });
        
        // Drop Event
        praktikaBox.addEventListener('drop', (e) => {
            e.preventDefault();
            this.highlightDropZone(praktikaBox, false);
            
            try {
                const modulData = JSON.parse(e.dataTransfer.getData('text/plain'));
                this.addPraktikaToBox(modulData, praktikaBox);
            } catch (error) {
                console.error('Fehler beim Drop:', error);
                this.showMessage('❌ Fehler beim Hinzufügen des Moduls', 'error');
            }
        });

        // Zeige bereits ausgewählte Module
        this.updatePraktikaBoxContent(praktikaBox);
    },

    /**
     * Highlightet Dropzone beim Drag
     */
    highlightDropZone(box, highlight) {
        if (highlight) {
            box.style.borderColor = '#28a745';
            box.style.backgroundColor = 'rgba(40, 167, 69, 0.1)';
            box.style.transform = 'scale(1.05)';
            box.style.boxShadow = '0 0 20px rgba(40, 167, 69, 0.4)';
        } else {
            box.style.borderColor = '';
            box.style.backgroundColor = '';
            box.style.transform = '';
            box.style.boxShadow = '';
        }
    },

    /**
     * Fügt Praktika-Modul zu Box hinzu
     */
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
        
        // UI aktualisieren
        this.updatePraktikaBoxContent(praktikaBox);
        this.updatePraktikaDisplay();
        this.updateKPDisplay();
        
        // Success Animation
        praktikaBox.style.animation = 'praktikaAdded 0.6s ease-out';
        setTimeout(() => praktikaBox.style.animation = '', 600);
        
        this.showMessage(`✅ "${modul.name}" hinzugefügt`, 'success');
    },

    /**
     * Generiert eindeutige Box-ID
     */
    getPraktikaBoxId(praktikaBox) {
        const allPraktikaBoxes = Array.from(document.querySelectorAll('.praktika-dropzone'));
        return `praktika-${allPraktikaBoxes.indexOf(praktikaBox)}`;
    },

    /**
     * Prüft ob Praktika bereits ausgewählt ist
     */
    isPraktikaSelected(modulName) {
        return Object.values(this.selectedPraktika).some(boxModules => 
            boxModules.some(m => m.name === modulName)
        );
    },

    /**
     * Aktualisiert Inhalt der Praktika-Box
     */
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
                backdrop-filter: blur(2px);
            `;

            selectedModules.forEach(modul => {
                this.createDroppedPraktikaModule(modul, moduleContainer, praktikaBox);
            });

            praktikaBox.appendChild(moduleContainer);
        }
    },

    /**
     * Erstellt dropped Praktika-Modul Element
     */
    createDroppedPraktikaModule(modul, container, praktikaBox) {
        const div = document.createElement('div');
        div.classList.add('dropped-praktika-modul');
        div.classList.add('wahl-praktika-projekte');
        
        // Größe proportional zu KP berechnen
        this.setDroppedModuleSize(div, modul);
        
        // Inhalt erstellen
        this.createDroppedModuleContent(div, modul, praktikaBox);
        
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
        
        // Text-Anpassung nach dem Rendern
        setTimeout(() => {
            this.fitText(div, '.dropped-modul-kp');
            this.fitText(div, '.dropped-modul-titel');
        }, 0);
        
        return div;
    },

    /**
     * Setzt Größe für dropped Module
     */
    setDroppedModuleSize(div, modul) {
        const baseArea = 800;
        const aspectRatio = 1.3;
        
        const area = modul.kp * baseArea;
        const width = Math.sqrt(area * aspectRatio);
        const height = area / width;
        
        const minWidth = 80;
        const maxWidth = 160;
        const minHeight = 50;
        const maxHeight = 100;
        
        const finalWidth = Math.max(minWidth, Math.min(maxWidth, width));
        const finalHeight = Math.max(minHeight, Math.min(maxHeight, height));
        
        div.style.cssText = `
            width: ${Math.round(finalWidth)}px;
            height: ${Math.round(finalHeight)}px;
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
    },

    /**
     * Erstellt Inhalt für dropped Module
     */
    createDroppedModuleContent(div, modul, praktikaBox) {
        // KP-Anzeige
        const kpDiv = document.createElement('div');
        kpDiv.classList.add('dropped-modul-kp');
        kpDiv.textContent = `${modul.kp} KP`;
        kpDiv.style.cssText = `
            font-size: 11px;
            font-weight: bold;
            color: white;
            text-align: center;
            text-shadow: 0 1px 2px rgba(0,0,0,0.5);
            margin: 0;
            padding: 2px;
        `;
        div.appendChild(kpDiv);
        
        // Modultitel
        const titleDiv = document.createElement('div');
        titleDiv.classList.add('dropped-modul-titel');
        const shortName = modul.name.length > 30 ? modul.name.substring(0, 27) + '...' : modul.name;
        titleDiv.textContent = shortName;
        titleDiv.title = modul.name;
        titleDiv.style.cssText = `
            font-size: 9px;
            color: white;
            text-align: center;
            line-height: 1.1;
            text-shadow: 0 1px 2px rgba(0,0,0,0.5);
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            word-break: break-word;
            overflow: hidden;
            margin: 0;
            padding: 2px;
        `;
        div.appendChild(titleDiv);
        
        // Remove-Button
        const removeBtn = document.createElement('div');
        removeBtn.innerHTML = '×';
        removeBtn.style.cssText = `
            position: absolute;
            top: 2px;
            right: 2px;
            width: 16px;
            height: 16px;
            background-color: rgba(220, 53, 69, 0.8);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 12px;
            font-weight: bold;
            transition: all 0.2s ease;
            opacity: 0.7;
        `;
        
        removeBtn.addEventListener('mouseenter', () => {
            removeBtn.style.opacity = '1';
            removeBtn.style.transform = 'scale(1.1)';
            removeBtn.style.backgroundColor = '#dc3545';
        });
        
        removeBtn.addEventListener('mouseleave', () => {
            removeBtn.style.opacity = '0.7';
            removeBtn.style.transform = 'scale(1)';
            removeBtn.style.backgroundColor = 'rgba(220, 53, 69, 0.8)';
        });
        
        removeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.removePraktika(modul, praktikaBox);
        });
        
        div.appendChild(removeBtn);
    },

    /**
     * Entfernt Praktika aus Box
     */
    removePraktika(modul, praktikaBox) {
        const boxId = this.getPraktikaBoxId(praktikaBox);
        this.selectedPraktika[boxId] = this.selectedPraktika[boxId].filter(m => m.name !== modul.name);
        this.saveSelectedPraktika();
        
        this.updatePraktikaBoxContent(praktikaBox);
        this.updatePraktikaDisplay();
        this.updateKPDisplay();
        
        this.showMessage(`🗑️ "${modul.name}" entfernt`, 'info');
    },

    /**
     * Aktualisiert Praktika-Display
     */
    updatePraktikaDisplay() {
        const totalKp = Object.values(this.selectedPraktika).flat().reduce((sum, m) => sum + m.kp, 0);
        const kpDisplay = document.getElementById('selected-praktika-kp');
        const statusDisplay = document.getElementById('praktika-status');
        
        if (kpDisplay) {
            kpDisplay.textContent = totalKp;
            kpDisplay.style.color = totalKp > 0 ? '#28a745' : '#dc3545';
            kpDisplay.style.fontWeight = 'bold';
        }
        
        if (statusDisplay) {
            const moduleCount = Object.values(this.selectedPraktika).flat().length;
            if (moduleCount > 0) {
                statusDisplay.innerHTML = `<span style="color: #28a745;">✅ ${moduleCount} Module</span>`;
            } else {
                statusDisplay.innerHTML = `<span style="color: #6c757d;">Keine Module gewählt</span>`;
            }
        }
    },

    /**
     * Zeigt Praktika-Tooltip mit drag & drop
     */
    showPraktikaTooltip(event) {
        const content = this.createDraggablePraktikaTooltip();
        this.showCustomTooltip(content, event);
    },

    /**
     * Erstellt draggable Praktika Tooltip
     */
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

        content += `</div></div>`;

        // Nach dem Erstellen des Tooltips, füge Drag-Events hinzu
        setTimeout(() => {
            this.addDragEventsToPraktikaModules();
        }, 10);

        return content;
    },

    /**
     * Fügt Drag-Events zu Tooltip-Modulen hinzu
     */
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
    },

    /**
     * Setzt Praktika zurück
     */
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
});

// CSS für Praktika-Animationen hinzufügen
const praktikaStyle = document.createElement('style');
praktikaStyle.textContent = `
    @keyframes praktikaAdded {
        0% { background-color: #28a745; transform: scale(1); }
        50% { background-color: #34ce57; transform: scale(1.05); }
        100% { background-color: #4CA64C; transform: scale(1); }
    }
`;
document.head.appendChild(praktikaStyle);

console.log('✅ Praktika System geladen');