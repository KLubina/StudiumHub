/* ==== RIG DRAG & DROP MANAGER ==== */
/* Verwaltet das Drag & Drop System für Wahlmodule */

window.RIGDragDropManager = {
    init(studienplan) {
        this.studienplan = studienplan;
        this.makeWahlmoduleDroppable();
    },

    makeWahlmoduleDroppable() {
        document.querySelectorAll('.modul').forEach(modulEl => {
            const modulName = this.getModuleName(modulEl);
            if (modulName === 'Wahlmodule') {
                this.setupWahlmoduleDropZone(modulEl);
            }
        });
    },

    setupWahlmoduleDropZone(wahlmoduleBox) {
        wahlmoduleBox.style.position = 'relative';
        wahlmoduleBox.classList.add('wahlmodule-dropzone');
        
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
            console.debug('RIG DragDropManager: drop event', e);
            const raw = e.dataTransfer.getData('text/plain');
            console.debug('RIG DragDropManager: dataTransfer raw:', raw);
            const modulData = raw ? JSON.parse(raw) : null;
            const semester = this.getSemesterFromBox(wahlmoduleBox);
            
            this.studienplan.wahlmoduleManager.addWahlmodulToBox(modulData, semester, wahlmoduleBox);
        });

        this.studienplan.wahlmoduleManager.updateWahlmoduleBoxContent(wahlmoduleBox);
    },

    getSemesterFromBox(wahlmoduleBox) {
        const container = wahlmoduleBox.closest('.jahr');
        if (container) {
            const className = container.className || '';
            const id = container.id || '';
            
            let match = className.match(/semester-?(\d+)/i) || id.match(/semester-?(\d+)/i);
            if (match) return parseInt(match[1]);
            
            match = className.match(/s(\d+)/i) || id.match(/s(\d+)/i);
            if (match) return parseInt(match[1]);
        }
        
        const title = container?.querySelector('.jahr-titel')?.textContent || '';
        
        let match = title.match(/(\d+)\.\s*Semester/i);
        if (match) return parseInt(match[1]);
        
        match = title.match(/Semester\s*(\d+)/i);
        if (match) return parseInt(match[1]);
        
        match = title.match(/S(\d+)/i);
        if (match) return parseInt(match[1]);
        
        const allWahlmoduleBoxes = Array.from(document.querySelectorAll('.modul')).filter(el => 
            this.getModuleName(el).includes('Wahlmodule')
        );
        
        const position = allWahlmoduleBoxes.indexOf(wahlmoduleBox);
        if (position >= 0) {
            return 4 + position;
        }
        
        const userChoice = prompt(`Semester-Erkennung fehlgeschlagen!\nIn welches Semester gehört diese Wahlmodule-Box?\n\n4 = 4. Semester\n5 = 5. Semester\n6 = 6. Semester`);
        if (userChoice && ['4', '5', '6'].includes(userChoice)) {
            return parseInt(userChoice);
        }
        
        return 4;
    },

    resetWahlmoduleBoxStyle(box) {
        box.style.borderColor = '';
        box.style.backgroundColor = '';
        box.style.transform = '';
    },

    getModuleName(modulEl) {
        const nameEl = modulEl.querySelector('.modul-titel');
        return nameEl ? nameEl.textContent.trim() : '';
    },

    addDragEventsToTooltipModules() {
        const draggableModules = document.querySelectorAll('.draggable-wahlmodul[draggable="true"]');
        
        draggableModules.forEach(modulEl => {
            modulEl.addEventListener('dragstart', (e) => {
                const modulData = JSON.parse(modulEl.dataset.modul);
                console.debug('RIG DragDropManager: dragstart', modulData, modulEl);
                try {
                    e.dataTransfer.setData('text/plain', JSON.stringify(modulData));
                } catch (err) {
                    console.warn('RIG DragDropManager: setData failed', err);
                }
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
};