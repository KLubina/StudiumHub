/* ==== MTEC BASE CONFIGURATION ==== */
/* Grundlegende Konfiguration für den MTEC Studiengang */

window.StudiengangBaseConfig = {
    // Grundlegende Informationen
    title: "MSc Management, Technology, and Economics (MTEC)",
    subtitle: "mind. 120 KP insgesamt",
    legendTitle: "Farben-Legende & Anforderungen",
    creditUnit: "KP",
    
    // Layout-Konfiguration - PROPORTIONAL OPTIMIERT
    layout: "categories",
    moduleSizing: "proportional", 
    basisArea: 2800, // Reduziert für bessere Proportionalität
    defaultAspectRatio: 2.2, // Breiter für kompaktere Darstellung
    layoutClass: "horizontal-fachgebiete", // Spezielle Layout-Klasse
    
    // Features
    enableTooltips: true,
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