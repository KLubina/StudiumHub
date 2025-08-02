/* ==== RIG LEGENDE DRAG & DROP EXTENSIONS - VERBESSERT ==== */
/* Drag & Drop direkt aus der Legende in die Wahlmodule-Boxen mit KP-proportionaler Größe */

window.StudiengangCustomClass = class RIGStudienplan extends StudienplanBase {
    constructor(config) {
        super(config);
        this.isWahlmoduleTooltipLocked = false;
        this.selectedWahlmodule = this.loadSelectedWahlmodule();
        this.maxWahlmoduleKp = { 4: 18, 5: 15, 6: 12 }; // Pro Semester
        
        // Definiere verfügbare Wahlmodule
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
    }

    initialize() {
        super.initialize();
        this.makeWahlmoduleDroppable();
        this.updateWahlmoduleDisplay();
        this.addWahlmoduleControls();
    }

    addWahlmoduleControls() {
        // Kontrollen für Wahlmodule-Management
        const legendContainer = document.querySelector(".farben-legende");
        
        const wahlmoduleControls = document.createElement("div");
        wahlmoduleControls.style.marginBottom = "15px";
        wahlmoduleControls.style.padding = "10px";
        wahlmoduleControls.style.backgroundColor = "#fff8f8";
        wahlmoduleControls.style.borderRadius = "5px";
        wahlmoduleControls.style.border = "2px solid #FF6B6B";
        
        wahlmoduleControls.innerHTML = `
            <div style="text-align: center; margin-bottom: 10px;">
                <h4 style="margin: 0 0 8px 0; color: #DC143C;">🎯 Wahlmodule Designer</h4>
                <div style="font-size: 12px; color: #666;">
                    💡 <strong>Ziehe Module aus der Legende direkt in deine Wahlmodule-Boxen!</strong><br>
                    📊 Gewählte Bereiche: <span id="selected-bereiche-count">0</span> von 3<br>
                    📚 Gewählte KP: <span id="selected-kp-count">0</span> von 45 KP
                </div>
                <div style="margin-top: 8px;">
                    <button id="save-wahlmodule" style="background: #28a745; color: white; border: none; padding: 5px 12px; border-radius: 3px; cursor: pointer; margin-right: 5px; font-size: 11px;">💾 Speichern</button>
                    <button id="reset-wahlmodule" style="background: #dc3545; color: white; border: none; padding: 5px 12px; border-radius: 3px; cursor: pointer; font-size: 11px;">🔄 Reset</button>
                </div>
            </div>
        `;

        legendContainer.insertBefore(wahlmoduleControls, legendContainer.firstChild);

        // Event Listeners
        document.getElementById('save-wahlmodule').addEventListener('click', () => {
            this.exportWahlmodule();
        });

        document.getElementById('reset-wahlmodule').addEventListener('click', () => {
            this.resetWahlmodule();
        });
    }

    makeWahlmoduleDroppable() {
        // Finde alle Wahlmodule-Boxen im Studienplan
        const wahlmoduleBoxes = document.querySelectorAll('.modul').forEach(modulEl => {
            const modulName = this.getModuleName(modulEl);
            if (modulName === 'Wahlmodule') {
                this.setupWahlmoduleDropZone(modulEl);
            }
        });
    }

    setupWahlmoduleDropZone(wahlmoduleBox) {
        wahlmoduleBox.style.position = 'relative';
        wahlmoduleBox.classList.add('wahlmodule-dropzone');
        
        // Drop Events
        wahlmoduleBox.addEventListener('dragover', (e) => {
            e.preventDefault();
            wahlmoduleBox.style.borderColor = '#28a745';
            wahlmoduleBox.style.backgroundColor = 'rgba(40, 167, 69, 0.1)';
            wahlmoduleBox.style.transform = 'scale(1.05)';
        });
        
        wahlmoduleBox.addEventListener('dragleave', (e) => {
            if (!wahlmoduleBox.contains(e.relatedTarget)) {
                this.resetWahlmoduleBoxStyle(wahlmoduleBox);
            }
        });
        
        wahlmoduleBox.addEventListener('drop', (e) => {
            e.preventDefault();
            this.resetWahlmoduleBoxStyle(wahlmoduleBox);
            
            const modulData = JSON.parse(e.dataTransfer.getData('text/plain'));
            const semester = this.getSemesterFromBox(wahlmoduleBox);
            
            this.addWahlmodulToBox(modulData, semester, wahlmoduleBox);
        });

        // Zeige bereits ausgewählte Module
        this.updateWahlmoduleBoxContent(wahlmoduleBox);
    }

getSemesterFromBox(wahlmoduleBox) {
    // Methode 1: Über Container-Klassen oder IDs
    const container = wahlmoduleBox.closest('.jahr');
    if (container) {
        // Suche nach Semester-Hinweisen in Klassen oder IDs
        const className = container.className || '';
        const id = container.id || '';
        
        // Verschiedene Muster probieren
        let match = className.match(/semester-?(\d+)/i) || id.match(/semester-?(\d+)/i);
        if (match) return parseInt(match[1]);
        
        match = className.match(/s(\d+)/i) || id.match(/s(\d+)/i);
        if (match) return parseInt(match[1]);
    }
    
    // Methode 2: Über Jahr-Titel (verbessert)
    const title = container?.querySelector('.jahr-titel')?.textContent || '';
    console.log('Titel gefunden:', title); // Debug
    
    // Alle möglichen Semester-Formate probieren
    let match = title.match(/(\d+)\.\s*Semester/i);
    if (match) return parseInt(match[1]);
    
    match = title.match(/Semester\s*(\d+)/i);
    if (match) return parseInt(match[1]);
    
    match = title.match(/S(\d+)/i);
    if (match) return parseInt(match[1]);
    
    // Methode 3: Position in der Seite
    const allWahlmoduleBoxes = Array.from(document.querySelectorAll('.modul')).filter(el => 
        this.getModuleName(el).includes('Wahlmodule')
    );
    
    const position = allWahlmoduleBoxes.indexOf(wahlmoduleBox);
    if (position >= 0) {
        return 4 + position; // 1. Box = Semester 4, 2. Box = Semester 5, etc.
    }
    
    // Methode 4: Notfall - frage den Benutzer
    const userChoice = prompt(`Semester-Erkennung fehlgeschlagen!\nIn welches Semester gehört diese Wahlmodule-Box?\n\n4 = 4. Semester\n5 = 5. Semester\n6 = 6. Semester`);
    if (userChoice && ['4', '5', '6'].includes(userChoice)) {
        return parseInt(userChoice);
    }
    
    return 4; // Absoluter Fallback
}


    addWahlmodulToBox(modul, semester, wahlmoduleBox) {
        // Prüfe KP-Limit für dieses Semester
        const currentKp = this.getWahlmoduleKpForSemester(semester);
        const maxKp = this.maxWahlmoduleKp[semester] || 15;
        
        if (currentKp + modul.kp > maxKp) {
            this.showMessage(`⚠️ Zu viele KP! Semester ${semester} hätte ${currentKp + modul.kp} KP (Max: ${maxKp} KP)`, 'warning');
            return;
        }

        // Prüfe ob schon ausgewählt
        if (this.isWahlmodulSelected(modul.name, semester)) {
            this.showMessage(`ℹ️ "${modul.name}" ist bereits in Semester ${semester} ausgewählt`, 'info');
            return;
        }

        // Füge zur Auswahl hinzu
        if (!this.selectedWahlmodule[semester]) {
            this.selectedWahlmodule[semester] = [];
        }
        
        this.selectedWahlmodule[semester].push({...modul, semester});
        this.saveSelectedWahlmodule();
        
        // Aktualisiere UI
        this.updateWahlmoduleBoxContent(wahlmoduleBox);
        this.updateWahlmoduleDisplay();
        this.showMessage(`✅ "${modul.name}" zu Semester ${semester} hinzugefügt`, 'success');
    }

    updateWahlmoduleBoxContent(wahlmoduleBox) {
        const semester = this.getSemesterFromBox(wahlmoduleBox);
        const selectedModules = this.selectedWahlmodule[semester] || [];
        const currentKp = this.getWahlmoduleKpForSemester(semester);
        const maxKp = this.maxWahlmoduleKp[semester] || 15;

        // Entferne alte Module-Container
        const existingContainer = wahlmoduleBox.querySelector('.wahlmodule-container');
        if (existingContainer) {
            existingContainer.remove();
        }

        // Aktualisiere KP-Anzeige in der Box
        const kpDisplay = wahlmoduleBox.querySelector('.modul-kp');
        if (kpDisplay) {
            kpDisplay.textContent = `${currentKp}/${maxKp} KP`;
            kpDisplay.style.color = currentKp > maxKp ? '#dc3545' : '#28a745';
        }

        // Erstelle neuen Module-Container mit echten Modulen
        if (selectedModules.length > 0) {
            const moduleContainer = document.createElement('div');
            moduleContainer.className = 'wahlmodule-container';
            moduleContainer.style.position = 'absolute';
            moduleContainer.style.top = '0';
            moduleContainer.style.left = '0';
            moduleContainer.style.width = '100%';
            moduleContainer.style.height = '100%';
            moduleContainer.style.display = 'flex';
            moduleContainer.style.flexWrap = 'wrap';
            moduleContainer.style.gap = '2px';
            moduleContainer.style.padding = '20px 5px 5px 5px'; // Platz für KP-Anzeige oben
            moduleContainer.style.boxSizing = 'border-box';
            moduleContainer.style.overflow = 'hidden';

            selectedModules.forEach(modul => {
                this.createDroppedModule(modul, moduleContainer, semester, wahlmoduleBox);
            });

            wahlmoduleBox.appendChild(moduleContainer);
        }
    }

    createDroppedModule(modul, container, semester, wahlmoduleBox) {
        const div = document.createElement('div');
        div.classList.add('dropped-modul');
        div.classList.add('wahlmodule'); // Für Styling
        
        // Größe proportional zu KP berechnen - angepasst für kleineren Container
        this.setDroppedModuleSize(div, modul, container);
        
        // Inhalt erstellen
        this.createDroppedModuleContent(div, modul, semester, wahlmoduleBox);
        
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
    }

    setDroppedModuleSize(div, modul, container) {
        // Basis-Größe kleiner für Container
        const baseArea = 800; // Kleinere Basis-Area für bessere Passung
        const aspectRatio = 1.3;
        
        const area = modul.kp * baseArea;
        const width = Math.sqrt(area * aspectRatio);
        const height = area / width;
        
        // Mindest- und Maximal-Größen
        const minWidth = 80;
        const maxWidth = 160;
        const minHeight = 50;
        const maxHeight = 100;
        
        const finalWidth = Math.max(minWidth, Math.min(maxWidth, width));
        const finalHeight = Math.max(minHeight, Math.min(maxHeight, height));
        
        div.style.width = `${Math.round(finalWidth)}px`;
        div.style.height = `${Math.round(finalHeight)}px`;
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
    }

    createDroppedModuleContent(div, modul, semester, wahlmoduleBox) {
        // KP-Anzeige
        const kpDiv = document.createElement('div');
        kpDiv.classList.add('dropped-modul-kp');
        kpDiv.textContent = `${modul.kp} KP`;
        kpDiv.style.fontSize = '11px';
        kpDiv.style.fontWeight = 'bold';
        kpDiv.style.color = 'white';
        kpDiv.style.textAlign = 'center';
        kpDiv.style.textShadow = '0 1px 2px rgba(0,0,0,0.5)';
        div.appendChild(kpDiv);
        
        // Modultitel
        const titleDiv = document.createElement('div');
        titleDiv.classList.add('dropped-modul-titel');
        titleDiv.textContent = modul.name.length > 30 ? modul.name.substring(0, 27) + '...' : modul.name;
        titleDiv.title = modul.name; // Vollständiger Name als Tooltip
        titleDiv.style.fontSize = '9px';
        titleDiv.style.color = 'white';
        titleDiv.style.textAlign = 'center';
        titleDiv.style.lineHeight = '1.1';
        titleDiv.style.textShadow = '0 1px 2px rgba(0,0,0,0.5)';
        titleDiv.style.flex = '1';
        titleDiv.style.display = 'flex';
        titleDiv.style.alignItems = 'center';
        titleDiv.style.justifyContent = 'center';
        titleDiv.style.wordBreak = 'break-word';
        titleDiv.style.overflow = 'hidden';
        div.appendChild(titleDiv);
        
        // Remove-Button
        const removeBtn = document.createElement('div');
        removeBtn.innerHTML = '×';
        removeBtn.style.position = 'absolute';
        removeBtn.style.top = '2px';
        removeBtn.style.right = '2px';
        removeBtn.style.width = '16px';
        removeBtn.style.height = '16px';
        removeBtn.style.backgroundColor = 'rgba(220, 53, 69, 0.8)';
        removeBtn.style.color = 'white';
        removeBtn.style.borderRadius = '50%';
        removeBtn.style.display = 'flex';
        removeBtn.style.alignItems = 'center';
        removeBtn.style.justifyContent = 'center';
        removeBtn.style.cursor = 'pointer';
        removeBtn.style.fontSize = '12px';
        removeBtn.style.fontWeight = 'bold';
        removeBtn.style.transition = 'all 0.2s ease';
        removeBtn.style.opacity = '0.7';
        
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
            this.removeWahlmodul(modul, semester, wahlmoduleBox);
        });
        
        div.appendChild(removeBtn);
    }

    removeWahlmodul(modul, semester, wahlmoduleBox) {
        this.selectedWahlmodule[semester] = this.selectedWahlmodule[semester].filter(m => m.name !== modul.name);
        this.saveSelectedWahlmodule();
        this.updateWahlmoduleBoxContent(wahlmoduleBox);
        this.updateWahlmoduleDisplay();
        this.showMessage(`🗑️ "${modul.name}" entfernt`, 'info');
    }

    getWahlmoduleKpForSemester(semester) {
        const modules = this.selectedWahlmodule[semester] || [];
        return modules.reduce((sum, m) => sum + m.kp, 0);
    }

    isWahlmodulSelected(modulName, semester = null) {
        if (semester) {
            return (this.selectedWahlmodule[semester] || []).some(m => m.name === modulName);
        }
        return Object.values(this.selectedWahlmodule).some(semesterModules => 
            semesterModules.some(m => m.name === modulName)
        );
    }

    updateWahlmoduleDisplay() {
        // Update Bereiche Count
        const selectedBereiche = new Set();
        Object.values(this.selectedWahlmodule).flat().forEach(modul => {
            Object.entries(this.wahlmoduleBereiche).forEach(([bereich, module]) => {
                if (module.some(m => m.name === modul.name)) {
                    selectedBereiche.add(bereich);
                }
            });
        });

        const bereicheDisplay = document.getElementById('selected-bereiche-count');
        if (bereicheDisplay) {
            bereicheDisplay.textContent = selectedBereiche.size;
            bereicheDisplay.style.color = selectedBereiche.size >= 3 ? '#28a745' : '#dc3545';
        }

        // Update Total KP
        const totalKp = Object.values(this.selectedWahlmodule).flat().reduce((sum, m) => sum + m.kp, 0);
        const kpDisplay = document.getElementById('selected-kp-count');
        if (kpDisplay) {
            kpDisplay.textContent = totalKp;
            kpDisplay.style.color = totalKp >= 45 ? '#28a745' : '#dc3545';
        }
    }

    resetWahlmoduleBoxStyle(box) {
        box.style.borderColor = '';
        box.style.backgroundColor = '';
        box.style.transform = '';
    }

    getModuleName(modulEl) {
        const nameEl = modulEl.querySelector('.modul-titel');
        return nameEl ? nameEl.textContent.trim() : '';
    }

    showMessage(message, type = 'info') {
        // Einfache Toast-Nachricht
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

    // Überschreibe Wahlmodule Tooltip um draggable Module zu zeigen
    showWahlmoduleTooltip(event) {
        const content = this.createDraggableWahlmoduleTooltip();
        this.showCustomTooltip(content, event);
    }

    createDraggableWahlmoduleTooltip() {
        let content = `
            <div class="wahlmodule-liste">
                <h3>🎯 Wahlmodule-Bereiche per Drag & Drop</h3>
                <p style="font-size: 11px; color: #666; margin-bottom: 15px;">
                    💡 <strong>Ziehe Module direkt in deine Wahlmodule-Boxen im Studienplan!</strong>
                </p>
        `;

        Object.entries(this.wahlmoduleBereiche).forEach(([bereich, module]) => {
            content += `
                <div class="wahlbereich-section" style="margin-bottom: 15px;">
                    <h4 style="margin: 10px 0 8px 0; padding: 3px 8px; background-color: #FF6B6B; color: white; border-radius: 4px; font-size: 12px;">
                        ${bereich}
                    </h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 4px;">
            `;

            module.forEach(modul => {
                const isSelected = this.isWahlmodulSelected(modul.name);
                const opacity = isSelected ? '0.5' : '1';
                const cursor = isSelected ? 'not-allowed' : 'grab';
                const title = isSelected ? 'Bereits ausgewählt' : 'Ziehe mich in eine Wahlmodule-Box';

                content += `
                    <div class="draggable-wahlmodul" 
                         draggable="${!isSelected}" 
                         data-modul='${JSON.stringify(modul)}'
                         style="
                            padding: 4px 8px; 
                            background: linear-gradient(135deg, #FF6B6B, #FF8E8E);
                            color: white; 
                            border-radius: 12px; 
                            font-size: 9px; 
                            cursor: ${cursor};
                            opacity: ${opacity};
                            margin: 2px;
                            border: 1px solid rgba(255,255,255,0.3);
                            transition: transform 0.2s ease;
                            user-select: none;
                         "
                         title="${title}">
                        <div style="font-weight: bold;">${modul.kp} KP</div>
                        <div style="font-size: 8px; line-height: 1;">${modul.name}</div>
                    </div>
                `;
            });

            content += `
                    </div>
                </div>
            `;
        });

        content += `</div>`;

        // Nach dem Erstellen des Tooltips, füge Drag-Events hinzu
        setTimeout(() => {
            this.addDragEventsToTooltipModules();
        }, 10);

        return content;
    }

    addDragEventsToTooltipModules() {
        const draggableModules = document.querySelectorAll('.draggable-wahlmodul[draggable="true"]');
        
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

    exportWahlmodule() {
        const exportData = {
            selectedWahlmodule: this.selectedWahlmodule,
            timestamp: new Date().toISOString(),
            totalKp: Object.values(this.selectedWahlmodule).flat().reduce((sum, m) => sum + m.kp, 0),
            bereiche: this.getSelectedBereiche()
        };

        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'rig-wahlmodule.json';
        link.click();
        
        URL.revokeObjectURL(url);
        this.showMessage('📁 Wahlmodule als JSON-Datei gespeichert!', 'success');
    }

    resetWahlmodule() {
        if (confirm('🔄 Wirklich alle Wahlmodule zurücksetzen?')) {
            this.selectedWahlmodule = {};
            this.saveSelectedWahlmodule();
            
            // Aktualisiere alle Wahlmodule-Boxen
            document.querySelectorAll('.wahlmodule-dropzone').forEach(box => {
                this.updateWahlmoduleBoxContent(box);
            });
            
            this.updateWahlmoduleDisplay();
            this.showMessage('✅ Alle Wahlmodule zurückgesetzt!', 'success');
        }
    }

    getSelectedBereiche() {
        const bereiche = new Set();
        Object.values(this.selectedWahlmodule).flat().forEach(modul => {
            Object.entries(this.wahlmoduleBereiche).forEach(([bereich, module]) => {
                if (module.some(m => m.name === modul.name)) {
                    bereiche.add(bereich);
                }
            });
        });
        return Array.from(bereiche);
    }

    saveSelectedWahlmodule() {
        localStorage.setItem('rig-selected-wahlmodule', JSON.stringify(this.selectedWahlmodule));
    }

    loadSelectedWahlmodule() {
        const saved = localStorage.getItem('rig-selected-wahlmodule');
        return saved ? JSON.parse(saved) : {};
    }

    hideTooltip() {
        if (this.tooltipEl) {
            this.tooltipEl.style.display = 'none';
        }
        this.aktivesModul = null;
        this.isWahlmoduleTooltipLocked = false;
    }
};