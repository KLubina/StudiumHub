/* ==== STUDIENPLAN BASE JAVASCRIPT ==== */
/* Gemeinsame Basis-Funktionalität für alle Studiengänge */

class StudienplanBase {
    constructor(config) {
        this.config = config;
        this.tooltipEl = null;
        this.aktivesModul = null;
        this.isTooltipLocked = false;
        this.isVertiefungsgebieteTooltipLocked = false;
        this.isWahlfaecherTooltipLocked = false;
    }

    /* ==== INITIALIZATION ==== */
    initialize() {
        this.setPageInfo();
        this.createLegend();
        this.createStudienplan();
        this.setupEventListeners();
        
        // Text-fitting nach dem Rendern
        setTimeout(() => {
            this.adjustAllText();
        }, 100);
    }

    setPageInfo() {
        if (this.config.title) {
            document.getElementById('page-title').textContent = this.config.title;
            document.getElementById('studienplan-title').textContent = this.config.title;
        }
        
        if (this.config.subtitle) {
            document.getElementById('studienplan-subtitle').textContent = this.config.subtitle;
        }
        
        if (this.config.legendTitle) {
            document.getElementById('legende-titel').textContent = this.config.legendTitle;
        }
    }

    /* ==== LEGEND CREATION ==== */
    createLegend() {
        const legendElement = document.getElementById('legende');
        legendElement.innerHTML = '';

        // Spezielle Behandlung für Prüfungsblöcke (CSE)
        if (this.config.pruefungsbloecke) {
            this.createPruefungsbloeckeLegend(legendElement);
        }

        // Standard Kategorien
        if (this.config.kategorien) {
            this.config.kategorien.forEach(kategorie => {
                this.createLegendItem(kategorie, legendElement);
            });
        }
    }

    createPruefungsbloeckeLegend(container) {
        this.config.pruefungsbloecke.forEach(block => {
            const div = document.createElement('div');
            div.classList.add('legende-item');
            div.classList.add(block.cssClass);
            
            const titelDiv = document.createElement('div');
            titelDiv.classList.add('legende-item-titel');
            titelDiv.textContent = block.name;
            div.appendChild(titelDiv);
            
            const inhaltDiv = document.createElement('div');
            inhaltDiv.classList.add('legende-item-inhalt');
            
            block.module.forEach(modul => {
                const modulDiv = document.createElement('div');
                modulDiv.classList.add('legende-modul');
                modulDiv.textContent = `${modul.name}, NG: ${modul.ng}`;
                inhaltDiv.appendChild(modulDiv);
            });
            
            div.appendChild(inhaltDiv);
            container.appendChild(div);
        });
    }

    createLegendItem(kategorie, container) {
        const div = document.createElement('div');
        div.classList.add('legende-item');
        
        if (typeof kategorie === 'string') {
            div.classList.add(this.getCssClassForCategory(kategorie));
            div.textContent = kategorie;
        } else {
            div.classList.add(kategorie.klasse || this.getCssClassForCategory(kategorie.name));
            
            const contentContainer = document.createElement('div');
            contentContainer.style.display = 'flex';
            contentContainer.style.flexDirection = 'column';
            
            const nameSpan = document.createElement('span');
            nameSpan.textContent = kategorie.name;
            nameSpan.style.fontWeight = 'bold';
            contentContainer.appendChild(nameSpan);
            
            if (kategorie.info) {
                const infoSpan = document.createElement('span');
                infoSpan.textContent = kategorie.info;
                infoSpan.style.fontStyle = 'italic';
                infoSpan.style.fontSize = '12px';
                infoSpan.style.marginTop = '5px';
                contentContainer.appendChild(infoSpan);
            }
            
            if (kategorie.description) {
                const descSpan = document.createElement('div');
                descSpan.classList.add('legende-description');
                descSpan.textContent = kategorie.description;
                contentContainer.appendChild(descSpan);
            }
            
            div.appendChild(contentContainer);
            
            // Spezielle Hover-Funktionalität für bestimmte Kategorien
            if (kategorie.hasTooltip) {
                this.addLegendTooltipEvents(div, kategorie);
            }
        }
        
        container.appendChild(div);
    }

    getCssClassForCategory(categoryName) {
        const mapping = this.config.kategorieZuKlasse || {};
        return mapping[categoryName] || categoryName.toLowerCase().replace(/\s+/g, '-');
    }

    /* ==== MODULE CREATION ==== */
    createStudienplan() {
        const container = document.getElementById('studienplan');
        container.innerHTML = '';

        if (this.config.layout === 'categories') {
            this.createCategoryBasedLayout(container);
        } else {
            this.createYearBasedLayout(container); // Default
        }
    }

    createYearBasedLayout(container) {
        const years = this.getUniqueYears();
        
        years.forEach(year => {
            const yearDiv = this.createYearSection(year);
            container.appendChild(yearDiv);
        });
    }

    createCategoryBasedLayout(container) {
        const categories = this.config.kategorien.map(k => typeof k === 'string' ? k : k.name);
        
        categories.forEach(category => {
            const categoryDiv = this.createCategorySection(category);
            if (categoryDiv) {
                container.appendChild(categoryDiv);
                
                // Spacer zwischen Kategorien (außer der letzten)
                if (category !== categories[categories.length - 1]) {
                    const spacer = document.createElement('div');
                    spacer.style.height = '30px';
                    container.appendChild(spacer);
                }
            }
        });
    }

    createYearSection(year) {
        const yearDiv = document.createElement('div');
        yearDiv.classList.add('jahr');
        
        const yearTitle = document.createElement('div');
        yearTitle.classList.add('jahr-titel');
        
        // Spezielle Titel für Assessment-Jahr (BWL)
        if (year === 1 && this.config.assessmentJahr) {
            yearTitle.textContent = 'Assessment-Jahr (1. Jahr)';
        } else if (year === 2 && this.config.hauptstudium) {
            yearTitle.textContent = '2.-3. Jahr';
        } else {
            yearTitle.textContent = `${year}. Jahr`;
        }
        
        yearDiv.appendChild(yearTitle);
        
        const yearModules = this.config.daten.filter(m => m.jahr === year);
        
        if (this.hasSemesters(yearModules)) {
            this.createSemesterLayout(yearDiv, yearModules);
        } else if (this.hasBereiche(yearModules)) {
            this.createBereichLayout(yearDiv, yearModules);
        } else {
            this.createSimpleLayout(yearDiv, yearModules);
        }
        
        return yearDiv;
    }

    createCategorySection(category) {
        const categoryModules = this.config.daten.filter(m => 
            m.kategorie === category || 
            (this.config.kategorieZuKlasse && this.config.kategorieZuKlasse[m.kategorie] === this.getCssClassForCategory(category))
        );
        
        if (categoryModules.length === 0) return null;
        
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('jahr');
        
        const categoryTitle = document.createElement('div');
        categoryTitle.classList.add('jahr-titel');
        categoryTitle.textContent = category;
        categoryDiv.appendChild(categoryTitle);
        
        if (this.hasFachgebiete(categoryModules)) {
            this.createFachgebietLayout(categoryDiv, categoryModules);
        } else {
            this.createSimpleLayout(categoryDiv, categoryModules);
        }
        
        return categoryDiv;
    }

    hasSemesters(modules) {
        return modules.some(m => m.semester && m.semester > 0);
    }

    hasBereiche(modules) {
        return modules.some(m => m.bereich);
    }

    hasFachgebiete(modules) {
        return modules.some(m => m.fachgebiet);
    }

    createSemesterLayout(container, modules) {
        const semesters = [...new Set(modules.map(m => m.semester).filter(s => s > 0))].sort();
        
        semesters.forEach(semester => {
            const semesterTitle = document.createElement('div');
            semesterTitle.classList.add('bereich-titel');
            semesterTitle.textContent = `${semester}. Semester`;
            container.appendChild(semesterTitle);
            
            const semesterContainer = document.createElement('div');
            semesterContainer.classList.add('module-container');
            if (this.config.layoutClass) {
                semesterContainer.classList.add(this.config.layoutClass);
            }
            
            const semesterModules = modules.filter(m => m.semester === semester);
            semesterModules.forEach(m => this.createModule(m, semesterContainer));
            
            container.appendChild(semesterContainer);
        });
    }

    createBereichLayout(container, modules) {
        // Definierte Reihenfolge für Bereiche (falls in config vorhanden)
        let bereiche;
        if (this.config.bereicheReihenfolge) {
            bereiche = this.config.bereicheReihenfolge.filter(b => modules.some(m => m.bereich === b));
        } else {
            bereiche = [...new Set(modules.map(m => m.bereich).filter(b => b))];
        }
        
        bereiche.forEach(bereich => {
            const bereichTitle = document.createElement('div');
            bereichTitle.classList.add('bereich-titel');
            bereichTitle.textContent = bereich;
            container.appendChild(bereichTitle);
            
            const bereichContainer = document.createElement('div');
            bereichContainer.classList.add('module-container');
            if (this.config.layoutClass) {
                bereichContainer.classList.add(this.config.layoutClass);
            }
            
            const bereichModules = modules.filter(m => m.bereich === bereich);
            
            if (this.hasFachgebiete(bereichModules)) {
                this.createFachgebietLayout(bereichContainer, bereichModules);
            } else {
                bereichModules.forEach(m => this.createModule(m, bereichContainer));
            }
            
            container.appendChild(bereichContainer);
        });
    }

    createFachgebietLayout(container, modules) {
        const fachgebiete = [...new Set(modules.map(m => m.fachgebiet).filter(f => f))];
        
        fachgebiete.forEach(fachgebiet => {
            const fachgebietColumn = document.createElement('div');
            fachgebietColumn.classList.add('fachgebiet-column');
            
            const fachgebietTitle = document.createElement('div');
            fachgebietTitle.classList.add('fachgebiet');
            fachgebietTitle.textContent = fachgebiet;
            fachgebietColumn.appendChild(fachgebietTitle);
            
            const fachgebietModules = modules.filter(m => m.fachgebiet === fachgebiet);
            fachgebietModules.forEach(m => this.createModule(m, fachgebietColumn));
            
            container.appendChild(fachgebietColumn);
        });
        
        // Module ohne Fachgebiet
        const ohneGebiet = modules.filter(m => !m.fachgebiet);
        ohneGebiet.forEach(m => this.createModule(m, container));
    }

    createSimpleLayout(container, modules) {
        const moduleContainer = document.createElement('div');
        moduleContainer.classList.add('module-container');
        if (this.config.layoutClass) {
            moduleContainer.classList.add(this.config.layoutClass);
        }
        
        modules.forEach(m => this.createModule(m, moduleContainer));
        
        container.appendChild(moduleContainer);
    }

    createModule(modul, container) {
        const div = document.createElement('div');
        div.classList.add('modul');
        
        // CSS-Klasse basierend auf Kategorie oder Prüfungsblock
        const cssClass = this.getModuleCssClass(modul);
        if (cssClass) {
            div.classList.add(cssClass);
        }
        
        // Größe basierend auf Konfiguration
        this.setModuleSize(div, modul);
        
        // Inhalt erstellen
        this.createModuleContent(div, modul);
        
        // Event-Listener hinzufügen
        this.addModuleEvents(div, modul);
        
        // Spezielle Klassen hinzufügen
        if (this.config.enableTooltips) {
            div.classList.add('clickable');
        }
        if (this.config.enableHover) {
            div.classList.add('hover-enabled');
        }
        if (modul.kp >= 10) {
            div.classList.add('large-module');
        } else if (modul.kp <= 3) {
            div.classList.add('small-module');
        }
        
        container.appendChild(div);
        
        // Text-Anpassung
        setTimeout(() => {
            this.fitText(div, '.modul-kp');
            this.fitText(div, '.modul-titel');
            
            // Spezielle Behandlung für sehr kleine Module
            if (modul.kp <= 2) {
                this.adjustSmallModule(div, modul);
            }
        }, 0);
        
        return div;
    }

    adjustSmallModule(div, modul) {
        const kp = div.querySelector('.modul-kp');
        const titel = div.querySelector('.modul-titel');
        
        if (kp) {
            kp.style.fontSize = '15px';
            kp.style.fontWeight = 'bold';
            kp.style.marginTop = '2px';
            kp.style.marginBottom = '2px';
        }
        
        if (titel) {
            titel.style.fontSize = '12px';
            titel.style.lineHeight = '1.1';
            titel.style.marginTop = '1px';
            
            // Bei sehr langen Titeln in kleinen Modulen kürzen
            if (modul.name.length > 25) {
                if (modul.name.includes('Geschichte:')) {
                    titel.textContent = modul.name.split('Geschichte:')[1].trim();
                } else {
                    titel.textContent = modul.name.substring(0, 22) + '...';
                }
                div.title = modul.name; // Tooltip für vollen Namen
            }
        }
        
        if (kp && titel) {
            kp.style.marginBottom = '0';
            titel.style.marginTop = '0';
            titel.style.marginBottom = '0';
        }
    }

    getModuleCssClass(modul) {
        if (modul.pruefungsblock && this.config.pruefungsbloecke) {
            const block = this.config.pruefungsbloecke.find(b => b.name === modul.pruefungsblock);
            return block ? block.cssClass : null;
        }
        
        if (modul.kategorie && this.config.kategorieZuKlasse) {
            return this.config.kategorieZuKlasse[modul.kategorie];
        }
        
        return modul.kategorie;
    }

    setModuleSize(div, modul) {
        const sizing = this.config.moduleSizing || 'proportional';
        
        if (sizing === 'proportional') {
            this.setProportionalSize(div, modul);
        } else if (sizing === 'fixed') {
            this.setFixedSize(div, modul);
        } else if (sizing === 'custom' && this.config.customSizing) {
            this.config.customSizing(div, modul);
        }
    }

    setProportionalSize(div, modul) {
        const basisArea = this.config.basisArea || 2500;
        const aspectRatio = this.getAspectRatio(modul);
        
        const area = modul.kp * basisArea;
        const width = Math.sqrt(area * aspectRatio);
        const height = area / width;
        
        div.style.width = `${Math.round(width)}px`;
        div.style.height = `${Math.round(height)}px`;
    }

    setFixedSize(div, modul) {
        let width = this.config.baseWidth || 160;
        let height = this.config.baseHeight || 80;
        
        // Anpassungen basierend auf Modul-Eigenschaften
        if (modul.name.length > 60) {
            if (modul.name.includes(':')) {
                const shortName = modul.name.split(':')[1].trim();
                if (shortName.length <= 57) {
                    modul.name = shortName;
                } else {
                    modul.name = modul.name.substring(0, 57) + '...';
                }
            } else {
                modul.name = modul.name.substring(0, 57) + '...';
            }
        }
        
        // Größenanpassung basierend auf ECTS für BWL-Stil
        if (this.config.useEctsBasedSizing) {
            const baseWidthForCategory = this.getBaseWidthForCategory(modul);
            width = Math.max(baseWidthForCategory, Math.sqrt(modul.kp) * 80);
            height = Math.max(45, modul.kp * 25);
        }
        
        div.style.width = `${width}px`;
        div.style.height = `${height}px`;
    }

    getBaseWidthForCategory(modul) {
        if (modul.kategorie === 'kontext') return 180;
        if (modul.name.includes('Fundamentals and Methods of Computer Science') || 
            modul.name.includes('Business-to-IT-Innovation')) return 200;
        return 160;
    }

    getAspectRatio(modul) {
        if (this.config.aspectRatios) {
            for (const [condition, ratio] of Object.entries(this.config.aspectRatios)) {
                if (this.checkCondition(modul, condition)) {
                    return ratio;
                }
            }
        }
        
        return this.config.defaultAspectRatio || 1.5;
    }

    checkCondition(modul, condition) {
        if (condition === 'longName') {
            return modul.name.length > 30;
        }
        if (condition === 'specialModule') {
            return modul.name.includes('Spezialisierung') || modul.name.includes('Bachelorarbeit');
        }
        if (condition.startsWith('category:')) {
            return modul.kategorie === condition.split(':')[1];
        }
        if (condition === 'longModuleName') {
            return modul.name.includes('Netzwerke und Schaltungen') || 
                   modul.name.includes('Elektromagnetische Felder') || 
                   modul.name.includes('Kommunikation') ||
                   modul.name.includes('Analysis') || 
                   modul.name.includes('Algebra') || 
                   modul.name.includes('Datenstrukturen') ||
                   modul.name.includes('Computational') ||
                   modul.name.includes('Probability Theory') ||
                   modul.name.includes('Algebraic Geometry');
        }
        return false;
    }

    createModuleContent(div, modul) {
        // KP/ECTS anzeigen
        const kpDiv = document.createElement('div');
        kpDiv.classList.add('modul-kp');
        kpDiv.textContent = `${modul.kp} ${this.config.creditUnit || 'KP'}`;
        div.appendChild(kpDiv);
        
        // Spezielle Behandlung für Spezialisierungsmodule
        if (modul.name === 'Spezialisierung' && modul.inhalt) {
            this.createSpecializationContent(div, modul);
        } else {
            // Standard Modultitel
            const titleDiv = document.createElement('div');
            titleDiv.classList.add('modul-titel');
            titleDiv.textContent = modul.name;
            div.appendChild(titleDiv);
        }
    }

    createSpecializationContent(div, modul) {
        const spezTitel = document.createElement('div');
        spezTitel.classList.add('spezialisierung-titel');
        spezTitel.textContent = 'Eine Spezialisierung auswählen:';
        div.appendChild(spezTitel);

        const bulletList = document.createElement('ul');
        bulletList.classList.add('bullet-list');
        
        modul.inhalt.forEach(option => {
            const listItem = document.createElement('li');
            listItem.textContent = option;
            bulletList.appendChild(listItem);
        });
        
        div.appendChild(bulletList);
    }

    addModuleEvents(div, modul) {
        if (this.config.enableTooltips) {
            div.addEventListener('click', (event) => {
                this.showTooltip(modul, event);
            });
        }
    }

    /* ==== TEXT FITTING ==== */
    fitText(container, selector) {
        const node = container.querySelector(selector);
        if (!node) return;

        let fs = 16;
        node.style.fontSize = fs + 'px';

        const containerWidth = container.clientWidth - 10;
        const containerHeight = selector === '.modul-titel' 
            ? container.clientHeight * 0.7 - 10 
            : container.clientHeight * 0.3 - 5;

        while ((node.scrollWidth > containerWidth || node.scrollHeight > containerHeight) && fs > 6) {
            fs--;
            node.style.fontSize = fs + 'px';
        }

        if (fs <= 8) {
            node.style.lineHeight = '1';
            if (selector === '.modul-titel') {
                node.style.margin = '1px 0';
                if (fs === 6) {
                    node.style.textOverflow = 'ellipsis';
                    node.style.whiteSpace = 'nowrap';
                }
            }
        }
    }

    adjustAllText() {
        document.querySelectorAll('.modul').forEach(modul => {
            this.fitText(modul, '.modul-kp');
            this.fitText(modul, '.modul-titel');
        });
    }

    /* ==== TOOLTIPS ==== */
    showTooltip(modul, event) {
        if (!this.tooltipEl) {
            this.tooltipEl = document.getElementById('tooltip');
        }
        
        if (this.aktivesModul === modul) return;
        
        this.aktivesModul = modul;
        this.tooltipEl.innerHTML = '';
        
        const tooltipContent = this.createTooltipContent(modul);
        this.tooltipEl.appendChild(tooltipContent);
        
        const closeBtn = document.createElement('div');
        closeBtn.classList.add('close-btn');
        closeBtn.textContent = '×';
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.hideTooltip();
        });
        this.tooltipEl.appendChild(closeBtn);
        
        this.tooltipEl.style.top = (event.clientY + 10) + 'px';
        this.tooltipEl.style.left = (event.clientX + 10) + 'px';
        this.tooltipEl.style.display = 'block';
    }

    createTooltipContent(modul) {
        const fragment = document.createDocumentFragment();
        const details = this.config.modulDetails && this.config.modulDetails[modul.name];
        
        if (details) {
            const title = document.createElement('h3');
            title.textContent = modul.name;
            fragment.appendChild(title);
            
            const kp = document.createElement('p');
            kp.innerHTML = `<strong>${modul.kp} ${this.config.creditUnit || 'KP'}</strong>`;
            fragment.appendChild(kp);
            
            if (details.kurzbeschreibung) {
                const kurzbeschreibungTitle = document.createElement('h4');
                kurzbeschreibungTitle.textContent = 'Kurzbeschreibung';
                fragment.appendChild(kurzbeschreibungTitle);
                
                const desc = document.createElement('p');
                desc.innerHTML = details.kurzbeschreibung.replace(/\n/g, '<br>');
                fragment.appendChild(desc);
            }
            
            if (details.lernziel) {
                const lernzielTitle = document.createElement('h4');
                lernzielTitle.textContent = 'Lernziel';
                fragment.appendChild(lernzielTitle);
                
                const lernziel = document.createElement('p');
                lernziel.innerHTML = details.lernziel.replace(/\n/g, '<br>');
                fragment.appendChild(lernziel);
            }
            
            if (details.inhalt && details.inhalt.trim() !== "") {
                const inhaltTitle = document.createElement('h4');
                inhaltTitle.textContent = 'Inhalt';
                fragment.appendChild(inhaltTitle);
                
                const inhalt = document.createElement('p');
                inhalt.innerHTML = details.inhalt.replace(/\n/g, '<br>');
                fragment.appendChild(inhalt);
            }
        } else {
            const title = document.createElement('h3');
            title.textContent = modul.name;
            fragment.appendChild(title);
            
            const kp = document.createElement('p');
            kp.innerHTML = `<strong>${modul.kp} ${this.config.creditUnit || 'KP'}</strong>`;
            fragment.appendChild(kp);
            
            const noDetails = document.createElement('p');
            noDetails.textContent = 'Keine detaillierten Informationen verfügbar.';
            fragment.appendChild(noDetails);
        }
        
        return fragment;
    }

    hideTooltip() {
        if (this.tooltipEl) {
            this.tooltipEl.style.display = 'none';
        }
        this.aktivesModul = null;
        this.isVertiefungsgebieteTooltipLocked = false;
        this.isWahlfaecherTooltipLocked = false;
    }

    /* ==== EVENT LISTENERS ==== */
    setupEventListeners() {
        // Click outside tooltip to close
        document.addEventListener('click', (event) => {
            if (this.tooltipEl && event.target !== this.tooltipEl && !this.tooltipEl.contains(event.target)) {
                let isModulClick = false;
                let isLegendClick = false;
                let target = event.target;
                
                while (target && !isModulClick && !isLegendClick) {
                    if (target.classList) {
                        if (target.classList.contains('modul')) {
                            isModulClick = true;
                        } else if (target.classList.contains('legende-item')) {
                            isLegendClick = true;
                        }
                    }
                    target = target.parentElement;
                }
                
                if (!isModulClick && !isLegendClick) {
                    this.hideTooltip();
                }
            }
        });
    }

    /* ==== UTILITY METHODS ==== */
    getUniqueYears() {
        return [...new Set(this.config.daten.map(m => m.jahr))].sort();
    }

    addLegendTooltipEvents(div, kategorie) {
        // Override in subclasses for special tooltip functionality
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
        const tooltipWidth = 500;
        
        this.tooltipEl.style.top = '100px';
        this.tooltipEl.style.left = (windowWidth - tooltipWidth - 100) + 'px';
        this.tooltipEl.style.maxWidth = tooltipWidth + 'px';
        this.tooltipEl.style.width = tooltipWidth + 'px';
        this.tooltipEl.style.display = 'block';
    }
}

/* ==== GLOBAL INITIALIZATION FUNCTION ==== */
function initializeStudienplan(config) {
    // Prüfe ob eine spezielle Klasse definiert ist
    const StudiengangClass = window.StudiengangClass || StudienplanBase;
    const studienplan = new StudiengangClass(config);
    studienplan.initialize();
    
    // Global verfügbar machen für eventuelle Erweiterungen
    window.currentStudienplan = studienplan;
}

/* ==== POLYFILLS ==== */
if (!Event.prototype.composedPath) {
    Event.prototype.composedPath = function() {
        if (this.path) return this.path;
        
        let target = this.target;
        this.path = [];
        while (target.parentNode !== null) {
            this.path.push(target);
            target = target.parentNode;
        }
        this.path.push(document, window);
        return this.path;
    }
}