/* ==== MTEC STUDIENGANG KONFIGURATION - OPTIMIERT ==== */

window.StudiengangConfig = {
    // Grundlegende Informationen
    title: "MSc Management, Technology, and Economics (MTEC)",
    subtitle: "mind. 120 KP insgesamt",
    legendTitle: "Farben-Legende & Anforderungen",
    creditUnit: "KP",
    
    // Layout-Konfiguration - OPTIMIERT FÜR HORIZONTAL
    layout: "categories",
    moduleSizing: "fixed", 
    baseWidth: 160,
    baseHeight: 70, 
    layoutClass: "horizontal-fachgebiete", // Spezielle Layout-Klasse
    
    // Features
    enableTooltips: false,
    enableHover: true,
    
    // Kategorien mit Beschreibungen - KOMPAKTER
    kategorien: [
        { 
            name: "Core Courses", 
            klasse: "core",
            description: "mind. 51 KP - Pflichtmodule"
        },
        { 
            name: "Elective Courses", 
            klasse: "elective",
            description: "mind. 10 KP - Wahlmodule"
        },
        { 
            name: "Supplementary Courses", 
            klasse: "supplementary",
            description: "mind. 12 KP - Ergänzungsmodule"
        },
        { 
            name: "Master's Thesis", 
            klasse: "thesis",
            description: "30 KP - Abschlussarbeit"
        },
        { 
            name: "Internship", 
            klasse: "internship",
            description: "6 KP - Pflichtpraktikum"
        }
    ],
    
    kategorieZuKlasse: {
        "Core Courses": "core",
        "Elective Courses": "elective",
        "Supplementary Courses": "supplementary",
        "Master's Thesis": "thesis",
        "Internship": "internship"
    },
    
    // Moduldaten - KOMPAKT MIT FACHGEBIETEN
    daten: [
        // Core Courses: 1. General Management and Human Resource Management
        { name: "Introduction to Management", kp: 3, kategorie: "Core Courses", fachgebiet: "Management & HR" },
        { name: "Human Resource Management: Leading Teams", kp: 3, kategorie: "Core Courses", fachgebiet: "Management & HR" },
        { name: "Responsible Leadership", kp: 3, kategorie: "Core Courses", fachgebiet: "Management & HR" },
        
        // Core Courses: 2. Strategy, Markets and Technology
        { name: "Strategic Management", kp: 3, kategorie: "Core Courses", fachgebiet: "Strategy & Technology" },
        { name: "Corporate Sustainability", kp: 3, kategorie: "Core Courses", fachgebiet: "Strategy & Technology" },
        { name: "Technology and Innovation Management", kp: 3, kategorie: "Core Courses", fachgebiet: "Strategy & Technology" },
        { name: "Introduction to Marketing", kp: 3, kategorie: "Core Courses", fachgebiet: "Strategy & Technology" },
        { name: "Entrepreneurship", kp: 3, kategorie: "Core Courses", fachgebiet: "Strategy & Technology" },
        
        // Core Courses: 3. Information Management and Operations Management
        { name: "Management of Digital Transformation", kp: 3, kategorie: "Core Courses", fachgebiet: "Operations & IT" },
        { name: "Production and Operations Management", kp: 3, kategorie: "Core Courses", fachgebiet: "Operations & IT" },
        { name: "Strategic Supply Chain Management", kp: 3, kategorie: "Core Courses", fachgebiet: "Operations & IT" },
        
        // Core Courses: 4. Quantitative and Qualitative Methods
        { name: "Operations Research", kp: 3, kategorie: "Core Courses", fachgebiet: "Methods" },
        { name: "Economic Dynamics and Complexity", kp: 3, kategorie: "Core Courses", fachgebiet: "Methods" },
        { name: "Empirical Methods in Management", kp: 3, kategorie: "Core Courses", fachgebiet: "Methods" },
        { name: "Principles of Econometrics", kp: 3, kategorie: "Core Courses", fachgebiet: "Methods" },
        
        // Core Courses: 5. Micro and Macroeconomics
        { name: "Principles of Macroeconomics", kp: 3, kategorie: "Core Courses", fachgebiet: "Economics" },
        { name: "Principles of Microeconomics", kp: 3, kategorie: "Core Courses", fachgebiet: "Economics" },
        { name: "Sustainability Economics", kp: 3, kategorie: "Core Courses", fachgebiet: "Economics" },
        { name: "Economic Growth, Cycles and Policy", kp: 3, kategorie: "Core Courses", fachgebiet: "Economics" },
        { name: "Markets and Games", kp: 3, kategorie: "Core Courses", fachgebiet: "Economics" },
        
        // Core Courses: 6. Financial Management
        { name: "Accounting for Managers", kp: 3, kategorie: "Core Courses", fachgebiet: "Finance" },
        { name: "Introduction to Finance", kp: 3, kategorie: "Core Courses", fachgebiet: "Finance" },
        { name: "Advanced Finance", kp: 3, kategorie: "Core Courses", fachgebiet: "Finance" },
        
        // Elective courses - mit Fachgebieten
        { name: "Social Data Science", kp: 2, kategorie: "Elective Courses", fachgebiet: "Systems Design & Risks" },
        { name: "Risk and Insurance Economics", kp: 3, kategorie: "Elective Courses", fachgebiet: "Systems Design & Risks" },
        { name: "Semester Project Small", kp: 3, kategorie: "Elective Courses", fachgebiet: "Additional Courses" },
        { name: "Semester Project Large", kp: 6, kategorie: "Elective Courses", fachgebiet: "Additional Courses" },
        
        // Supplementary courses - als ein großes Modul
        { name: "Supplementary Courses", kp: 12, kategorie: "Supplementary Courses" },
        
        // Master's Thesis and Internship - prominent dargestellt
        { name: "Master's Thesis", kp: 30, kategorie: "Master's Thesis" },
        { name: "Internship", kp: 6, kategorie: "Internship" }
    ],
    
    // Custom Sizing für bessere Kompaktheit
    customSizing: function(div, modul) {
        let width = 160;
        let height = 70;
        
        // Spezielle Größen für besondere Module
        if (modul.name === "Master's Thesis") {
            width = 200;
            height = 120;
        } else if (modul.name === "Supplementary Courses") {
            width = 180;
            height = 90;
        } else if (modul.name === "Semester Project Large") {
            width = 180;
            height = 80;
        } else if (modul.kp >= 10) {
            width = Math.max(160, modul.kp * 8);
            height = Math.max(70, modul.kp * 4);
        }
        
        // Namen kürzen wenn zu lang
        if (modul.name.length > 35) {
            const shortName = this.shortenModuleName(modul.name);
            div.title = modul.name; // Vollständiger Name als Tooltip
            const titleEl = div.querySelector('.modul-titel');
            if (titleEl) {
                titleEl.textContent = shortName;
            }
        }
        
        div.style.width = `${width}px`;
        div.style.height = `${height}px`;
    },
    
    // Hilfsfunktion zum Kürzen von Modulnamen
    shortenModuleName: function(name) {
        if (name.includes("Management")) {
            return name.replace("Management", "Mgmt");
        }
        if (name.includes("and")) {
            return name.replace(" and ", " & ");
        }
        if (name.includes("Introduction to")) {
            return name.replace("Introduction to ", "Intro ");
        }
        if (name.includes("Principles of")) {
            return name.replace("Principles of ", "");
        }
        if (name.length > 35) {
            return name.substring(0, 32) + "...";
        }
        return name;
    }
};

/* ==== MTEC-SPEZIFISCHE LAYOUT-KLASSE ==== */
window.StudiengangClass = class MTECStudienplan extends StudienplanBase {
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