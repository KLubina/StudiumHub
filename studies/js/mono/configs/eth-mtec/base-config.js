/* ==== MTEC BASE CONFIGURATION - STANDARDISIERT ==== */
/* Grundlegende Konfiguration für den MTEC Studiengang */

window.StudiengangBaseConfig = {
    // === 1. BASIC INFO ===
    title: "MSc Management, Technology, and Economics",
    legendTitle: "Farben-Legende & Anforderungen",
    creditUnit: "KP",
    
    // === 2. LAYOUT CONFIG ===
    layout: "categories",
    moduleSizing: "proportional", 
    basisArea: 2800,
    defaultAspectRatio: 2.2,
    layoutClass: "horizontal-fachgebiete",
    
    // === 3. FEATURE FLAGS ===
    enableTooltips: true,
    enableHover: true,
    enableColorManager: false,
    enableWahlmodule: false,
    enableKPCounter: true,
    
    // === 4. ERWEITERTE FEATURES ===
    // KP-Counter Config
    kpCounterConfig: {
        requiredKP: 120,
        showDetailedBreakdown: false,
        enableCategoryTracking: true
    },
    
    // === 5. LAYOUT-SPEZIFISCHE CONFIG ===
    // Aspekt-Verhältnisse (nicht verwendet, aber konsistenz)
    aspectRatios: {},
    
    // === 6. KATEGORIEN ===
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
    
    // === 7. CUSTOM FUNCTIONS ===
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