/* ==== MTEC EXTENSIONS ==== */
/* Spezielle Funktionalitäten und erweiterte Klasse für den MTEC Studiengang */

/* ==== MTEC-SPEZIFISCHE LAYOUT-KLASSE ==== */
window.StudiengangCustomClass = class MTECStudienplan extends StudienplanBase {
    constructor(config) {
        super(config);
    }
    
    // Überschreibe die Fachgebiet-Layout-Erstellung für horizontale Darstellung
    createFachgebietLayout(container, modules) {
        const fachgebiete = [...new Set(modules.map(m => m.fachgebiet).filter(f => f))];
        
        fachgebiete.forEach(fachgebiet => {
            // Fachgebiet-Label
            const fachgebietLabel = document.createElement('div');
            fachgebietLabel.classList.add('fachgebiet');
            fachgebietLabel.textContent = fachgebiet;
            container.appendChild(fachgebietLabel);
            
            // Module horizontal in Container
            const moduleContainer = document.createElement('div');
            moduleContainer.classList.add('module-container');
            moduleContainer.style.display = 'flex';
            moduleContainer.style.flexWrap = 'wrap';
            moduleContainer.style.gap = '5px';
            moduleContainer.style.marginBottom = '15px';
            
            const fachgebietModules = modules.filter(m => m.fachgebiet === fachgebiet);
            fachgebietModules.forEach(m => this.createModule(m, moduleContainer));
            
            container.appendChild(moduleContainer);
        });
        
        // Module ohne Fachgebiet
        const ohneGebiet = modules.filter(m => !m.fachgebiet);
        if (ohneGebiet.length > 0) {
            const moduleContainer = document.createElement('div');
            moduleContainer.classList.add('module-container');
            moduleContainer.style.display = 'flex';
            moduleContainer.style.flexWrap = 'wrap';
            moduleContainer.style.gap = '5px';
            moduleContainer.style.marginBottom = '15px';
            
            ohneGebiet.forEach(m => this.createModule(m, moduleContainer));
            container.appendChild(moduleContainer);
        }
    }
};