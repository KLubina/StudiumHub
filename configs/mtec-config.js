/* ==== MTEC STUDIENGANG KONFIGURATION ==== */

window.StudiengangConfig = {
    // Grundlegende Informationen
    title: "MSc Management, Technology, and Economics (MTEC)",
    subtitle: "mind. 120 KP insgesamt",
    legendTitle: "Farben-Legende & Anforderungen",
    creditUnit: "KP",
    
    // Layout-Konfiguration
    layout: "categories",
    moduleSizing: "proportional",
    basisArea: 2500,
    defaultAspectRatio: 1.2,
    
    // Features
    enableTooltips: false,
    enableHover: true,
    
    // Kategorien mit Beschreibungen
    kategorien: [
        { 
            name: "Core Courses", 
            klasse: "core",
            description: "mind. 51 KP - Pflichtmodule aus Management, Wirtschaft, Strategie, Technologie"
        },
        { 
            name: "Elective Courses", 
            klasse: "elective",
            description: "mind. 10 KP - Wahlmodule aus D-MTEC Forschungsgruppen, definieren die Spezialisierung"
        },
        { 
            name: "Supplementary Courses", 
            klasse: "supplementary",
            description: "mind. 12 KP - Ergänzungsmodule aus anderen ETH-Departementen"
        },
        { 
            name: "Master's Thesis", 
            klasse: "thesis",
            description: "30 KP - Abschlussarbeit zu einem Forschungsthema in MTEC"
        },
        { 
            name: "Internship", 
            klasse: "internship",
            description: "6 KP - Pflichtpraktikum in der Wirtschaft oder Forschung"
        }
    ],
    
    kategorieZuKlasse: {
        "Core Courses": "core",
        "Elective Courses": "elective",
        "Supplementary Courses": "supplementary",
        "Master's Thesis": "thesis",
        "Internship": "internship"
    },
    
    // Moduldaten - ohne Jahr/Semester-Einteilung
    daten: [
        // Core Courses: 1. General Management and Human Resource Management
        { name: "Introduction to Management", kp: 3, kategorie: "Core Courses", fachgebiet: "1. General Management and Human Resource Management" },
        { name: "Human Resource Management: Leading Teams", kp: 3, kategorie: "Core Courses", fachgebiet: "1. General Management and Human Resource Management" },
        { name: "Responsible Leadership", kp: 3, kategorie: "Core Courses", fachgebiet: "1. General Management and Human Resource Management" },
        
        // Core Courses: 2. Strategy, Markets and Technology
        { name: "Strategic Management", kp: 3, kategorie: "Core Courses", fachgebiet: "2. Strategy, Markets and Technology" },
        { name: "Corporate Sustainability", kp: 3, kategorie: "Core Courses", fachgebiet: "2. Strategy, Markets and Technology" },
        { name: "Technology and Innovation Management", kp: 3, kategorie: "Core Courses", fachgebiet: "2. Strategy, Markets and Technology" },
        { name: "Introduction to Marketing", kp: 3, kategorie: "Core Courses", fachgebiet: "2. Strategy, Markets and Technology" },
        { name: "Entrepreneurship", kp: 3, kategorie: "Core Courses", fachgebiet: "2. Strategy, Markets and Technology" },
        
        // Core Courses: 3. Information Management and Operations Management
        { name: "Management of Digital Transformation", kp: 3, kategorie: "Core Courses", fachgebiet: "3. Information Management and Operations Management" },
        { name: "Production and Operations Management", kp: 3, kategorie: "Core Courses", fachgebiet: "3. Information Management and Operations Management" },
        { name: "Strategic Supply Chain Management", kp: 3, kategorie: "Core Courses", fachgebiet: "3. Information Management and Operations Management" },
        
        // Core Courses: 4. Quantitative and Qualitative Methods
        { name: "Operations Research", kp: 3, kategorie: "Core Courses", fachgebiet: "4. Quantitative and Qualitative Methods" },
        { name: "Economic Dynamics and Complexity", kp: 3, kategorie: "Core Courses", fachgebiet: "4. Quantitative and Qualitative Methods" },
        { name: "Empirical Methods in Management", kp: 3, kategorie: "Core Courses", fachgebiet: "4. Quantitative and Qualitative Methods" },
        { name: "Principles of Econometrics", kp: 3, kategorie: "Core Courses", fachgebiet: "4. Quantitative and Qualitative Methods" },
        
        // Core Courses: 5. Micro and Macroeconomics
        { name: "Principles of Macroeconomics", kp: 3, kategorie: "Core Courses", fachgebiet: "5. Micro and Macroeconomics" },
        { name: "Principles of Microeconomics", kp: 3, kategorie: "Core Courses", fachgebiet: "5. Micro and Macroeconomics" },
        { name: "Sustainability Economics", kp: 3, kategorie: "Core Courses", fachgebiet: "5. Micro and Macroeconomics" },
        { name: "Economic Growth, Cycles and Policy", kp: 3, kategorie: "Core Courses", fachgebiet: "5. Micro and Macroeconomics" },
        { name: "Markets and Games", kp: 3, kategorie: "Core Courses", fachgebiet: "5. Micro and Macroeconomics" },
        
        // Core Courses: 6. Financial Management
        { name: "Accounting for Managers", kp: 3, kategorie: "Core Courses", fachgebiet: "6. Financial Management" },
        { name: "Introduction to Finance", kp: 3, kategorie: "Core Courses", fachgebiet: "6. Financial Management" },
        { name: "Advanced Finance", kp: 3, kategorie: "Core Courses", fachgebiet: "6. Financial Management" },
        
        // Elective courses
        { name: "Social Data Science", kp: 2, kategorie: "Elective Courses", fachgebiet: "Systems Design and Risks" },
        { name: "Semester Project Small", kp: 3, kategorie: "Elective Courses", fachgebiet: "Additional Courses" },
        { name: "Semester Project Large", kp: 6, kategorie: "Elective Courses", fachgebiet: "Additional Courses" },
        { name: "Risk and Insurance Economics", kp: 3, kategorie: "Elective Courses", fachgebiet: "Systems Design and Risks" },
        
        // Supplementary courses
        { name: "Supplementary Courses", kp: 12, kategorie: "Supplementary Courses", fachgebiet: "" },
        
        // Master's Thesis and Internship
        { name: "Master's Thesis", kp: 30, kategorie: "Master's Thesis", fachgebiet: "" },
        { name: "Internship", kp: 6, kategorie: "Internship", fachgebiet: "" }
    ]
};