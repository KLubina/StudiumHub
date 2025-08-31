/* ==== RIG WAHLMODULE MANAGER ==== */
/* Verwaltet die Wahlmodule-Auswahl, -Speicherung und -Validation */

window.RIGWahlmoduleManager = {
    init(studienplan) {
        this.studienplan = studienplan;
        this.selectedWahlmodule = this.loadSelectedWahlmodule();
        this.maxWahlmoduleKp = { 4: 18, 5: 15, 6: 12 };
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
    },

    addWahlmodulToBox(modul, semester, wahlmoduleBox) {
        const currentKp = this.getWahlmoduleKpForSemester(semester);
        const maxKp = this.maxWahlmoduleKp[semester] || 15;
        
        if (currentKp + modul.kp > maxKp) {
            this.studienplan.uiControls.showMessage(`⚠️ Zu viele KP! Semester ${semester} hätte ${currentKp + modul.kp} KP (Max: ${maxKp} KP)`, 'warning');
            return;
        }

        if (this.isWahlmodulSelected(modul.name, semester)) {
            this.studienplan.uiControls.showMessage(`ℹ️ "${modul.name}" ist bereits in Semester ${semester} ausgewählt`, 'info');
            return;
        }

        if (!this.selectedWahlmodule[semester]) {
            this.selectedWahlmodule[semester] = [];
        }
        
        this.selectedWahlmodule[semester].push({...modul, semester});
        this.saveSelectedWahlmodule();
        
        this.updateWahlmoduleBoxContent(wahlmoduleBox);
        this.updateWahlmoduleDisplay();
        this.studienplan.uiControls.showMessage(`✅ "${modul.name}" zu Semester ${semester} hinzugefügt`, 'success');
    },

    updateWahlmoduleBoxContent(wahlmoduleBox) {
        const semester = this.studienplan.dragDrop.getSemesterFromBox(wahlmoduleBox);
        const selectedModules = this.selectedWahlmodule[semester] || [];
        const currentKp = this.getWahlmoduleKpForSemester(semester);
        const maxKp = this.maxWahlmoduleKp[semester] || 15;

        const existingContainer = wahlmoduleBox.querySelector('.wahlmodule-container');
        if (existingContainer) {
            existingContainer.remove();
        }

        const kpDisplay = wahlmoduleBox.querySelector('.modul-kp');
        if (kpDisplay) {
            kpDisplay.textContent = `${currentKp}/${maxKp} KP`;
            kpDisplay.style.color = currentKp > maxKp ? '#dc3545' : '#28a745';
        }

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
            moduleContainer.style.padding = '20px 5px 5px 5px';
            moduleContainer.style.boxSizing = 'border-box';
            moduleContainer.style.overflow = 'hidden';

            selectedModules.forEach(modul => {
                this.createDroppedModule(modul, moduleContainer, semester, wahlmoduleBox);
            });

            wahlmoduleBox.appendChild(moduleContainer);
        }
    },

    createDroppedModule(modul, container, semester, wahlmoduleBox) {
        const div = document.createElement('div');
        div.classList.add('dropped-modul');
        div.classList.add('wahlmodule');
        
        this.setDroppedModuleSize(div, modul, container);
        this.createDroppedModuleContent(div, modul, semester, wahlmoduleBox);
        
        div.addEventListener('mouseenter', () => {
            div.style.transform = 'scale(1.05)';
            div.style.zIndex = '10';
        });
        
        div.addEventListener('mouseleave', () => {
            div.style.transform = 'scale(1)';
            div.style.zIndex = '1';
        });
        
        container.appendChild(div);
        
        setTimeout(() => {
            this.studienplan.fitText(div, '.dropped-modul-kp');
            this.studienplan.fitText(div, '.dropped-modul-titel');
        }, 0);
        
        return div;
    },

    setDroppedModuleSize(div, modul, container) {
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
    },

    createDroppedModuleContent(div, modul, semester, wahlmoduleBox) {
        const kpDiv = document.createElement('div');
        kpDiv.classList.add('dropped-modul-kp');
        kpDiv.textContent = `${modul.kp} KP`;
        kpDiv.style.fontSize = '11px';
        kpDiv.style.fontWeight = 'bold';
        kpDiv.style.color = 'white';
        kpDiv.style.textAlign = 'center';
        kpDiv.style.textShadow = '0 1px 2px rgba(0,0,0,0.5)';
        div.appendChild(kpDiv);
        
        const titleDiv = document.createElement('div');
        titleDiv.classList.add('dropped-modul-titel');
        titleDiv.textContent = modul.name.length > 30 ? modul.name.substring(0, 27) + '...' : modul.name;
        titleDiv.title = modul.name;
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
    },

    removeWahlmodul(modul, semester, wahlmoduleBox) {
        this.selectedWahlmodule[semester] = this.selectedWahlmodule[semester].filter(m => m.name !== modul.name);
        this.saveSelectedWahlmodule();
        this.updateWahlmoduleBoxContent(wahlmoduleBox);
        this.updateWahlmoduleDisplay();
        this.studienplan.uiControls.showMessage(`🗑️ "${modul.name}" entfernt`, 'info');
    },

    getWahlmoduleKpForSemester(semester) {
        const modules = this.selectedWahlmodule[semester] || [];
        return modules.reduce((sum, m) => sum + m.kp, 0);
    },

    isWahlmodulSelected(modulName, semester = null) {
        if (semester) {
            return (this.selectedWahlmodule[semester] || []).some(m => m.name === modulName);
        }
        return Object.values(this.selectedWahlmodule).some(semesterModules => 
            semesterModules.some(m => m.name === modulName)
        );
    },

    updateWahlmoduleDisplay() {
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

        const totalKp = Object.values(this.selectedWahlmodule).flat().reduce((sum, m) => sum + m.kp, 0);
        const kpDisplay = document.getElementById('selected-kp-count');
        if (kpDisplay) {
            kpDisplay.textContent = totalKp;
            kpDisplay.style.color = totalKp >= 45 ? '#28a745' : '#dc3545';
        }
    },

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
        this.studienplan.uiControls.showMessage('📁 Wahlmodule als JSON-Datei gespeichert!', 'success');
    },

    resetWahlmodule() {
        if (confirm('🔄 Wirklich alle Wahlmodule zurücksetzen?')) {
            this.selectedWahlmodule = {};
            this.saveSelectedWahlmodule();
            
            document.querySelectorAll('.wahlmodule-dropzone').forEach(box => {
                this.updateWahlmoduleBoxContent(box);
            });
            
            this.updateWahlmoduleDisplay();
            this.studienplan.uiControls.showMessage('✅ Alle Wahlmodule zurückgesetzt!', 'success');
        }
    },

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
    },

    saveSelectedWahlmodule() {
        localStorage.setItem('rig-selected-wahlmodule', JSON.stringify(this.selectedWahlmodule));
    },

    loadSelectedWahlmodule() {
        const saved = localStorage.getItem('rig-selected-wahlmodule');
        return saved ? JSON.parse(saved) : {};
    }
};