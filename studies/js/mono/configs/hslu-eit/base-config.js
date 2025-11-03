/* ==== HSLU EIT BASE CONFIGURATION - STANDARDISIERT ==== */
/* Grundlegende Konfiguration für den HSLU Elektrotechnik und Informationstechnologie Studiengang */

window.StudiengangBaseConfig = {
    // === 1. BASIC INFO ===
    title: "BSc Elektrotechnik und Informationstechnologie",
    subtitle: "Hochschule Luzern",
    legendTitle: "Farben-Legende",
    creditUnit: "ECTS",
    
    // === 2. LAYOUT CONFIG ===
    layout: "years",
    moduleSizing: "proportional",
    basisArea: 1800,
    defaultAspectRatio: 1.4,
    layoutClass: "horizontal-modules",
    
    // === 3. FEATURE FLAGS ===
    enableTooltips: true,
    enableHover: true,
    enableColorManager: false,
    enableWahlmodule: true,
    enableKPCounter: true,
    
    // === 4. ERWEITERTE FEATURES ===
    // KP-Counter Config
    kpCounterConfig: {
        requiredKP: 180,
        showDetailedBreakdown: true,
        enableCategoryTracking: true,
    },
    
    // === 5. LAYOUT-SPEZIFISCHE CONFIG ===
    // Aspekt-Verhältnisse für verschiedene Module
    aspectRatios: {
        "Bachelor-Thesis": 2.8,
        "Industrieprojekt": 2.2,
        "Produktentwicklung 1": 2.0,
        "Produktentwicklung 2": 2.0,
        "Grundlagen elektrischer Antriebssysteme": 2.2,
        "Advanced Embedded Systems": 2.0,
        "longName": 2.0
    },
    
    // Layout für 3. Jahr (Semester 5-6)
    thirdYearLayout: "category-based",
    thirdYearCategoryOrder: [
        "Vertiefungsrichtungen",
        "Erweiterungsmodule", 
        "Zusatzmodule",
        "Abschlussarbeit"
    ],
    
    // === 6. KATEGORIEN ===
    kategorien: [
        { name: "Grundlagenfächer", klasse: "grundlagen" },
        { name: "Elektrotechnik und Elektronik", klasse: "elektrotechnik" },
        { name: "Informatik und Programmierung", klasse: "informatik" },
        { name: "Produktentwicklung und Projekte", klasse: "projekte" },
        { name: "Kontextstudium", klasse: "kontext" },
        { 
            name: "Vertiefungsrichtungen", 
            klasse: "vertiefung",
            hasTooltip: true,
            info: "💡 Wähle deine Vertiefungsrichtung!",
            description: "Eine Vertiefungsrichtung auswählen (9 ECTS)",
            minKp: 9
        },
        { 
            name: "Erweiterungsmodule", 
            klasse: "erweiterung",
            hasTooltip: true,
            info: "💡 Wähle deine Erweiterungsmodule!",
            description: "Mindestens 15 ECTS",
            minKp: 15
        },
        { 
            name: "Zusatzmodule", 
            klasse: "zusatz",
            hasTooltip: true,
            info: "💡 Wähle deine Zusatzmodule!",
            description: "Mindestens 15 ECTS",
            minKp: 15
        },
        { name: "Abschlussarbeit", klasse: "abschluss" }
    ],
    
    kategorieZuKlasse: {
        "Grundlagenfächer": "grundlagen",
        "Elektrotechnik und Elektronik": "elektrotechnik",
        "Informatik und Programmierung": "informatik",
        "Produktentwicklung und Projekte": "projekte",
        "Kontextstudium": "kontext",
        "Vertiefungsrichtungen": "vertiefung",
        "Erweiterungsmodule": "erweiterung",
        "Zusatzmodule": "zusatz",
        "Abschlussarbeit": "abschluss"
    },
    
    // === 7. CUSTOM FUNCTIONS ===
    // Custom Sizing für bessere Kompaktheit
    customSizing: function(div, modul) {
        let width = 160;
        let height = 70;
        
        // Spezielle Größen für besondere Module
        if (modul.name === "Bachelor-Thesis") {
            width = 200;
            height = 120;
        } else if (modul.name === "Industrieprojekt") {
            width = 180;
            height = 90;
        } else if (modul.name.includes("Produktentwicklung")) {
            width = 180;
            height = 85;
        } else if (modul.kp >= 6) {
            width = Math.max(160, modul.kp * 15);
            height = Math.max(70, modul.kp * 8);
        } else if (modul.kp <= 3) {
            width = 140;
            height = 65;
        }
        
        // Namen kürzen wenn zu lang
        if (modul.name && modul.name.length > 35) {
            const shortName = this.shortenModuleName(modul.name);
            div.title = modul.name;
            const titleEl = div.querySelector('.modul-titel');
            if (titleEl) {
                titleEl.textContent = shortName;
            }
        }
        
        div.style.width = `${width}px`;
        div.style.height = `${height}px`;
        div.style.minWidth = `${Math.min(120, width)}px`;
        div.style.maxWidth = `${Math.max(200, width)}px`;
    },
    
    // Hilfsfunktion zum Kürzen von Modulnamen
    shortenModuleName: function(name) {
        if (name.includes("Grundlagen elektrischer Antriebssysteme")) {
            return "Grundlagen elektr. Antriebe";
        }
        if (name.includes("Advanced Embedded Systems")) {
            return "Advanced Embedded Sys.";
        }
        if (name.includes("Data Communication Systems")) {
            return "Data Communication";
        }
        if (name.includes("Statistical Data Analysis")) {
            return "Statistical Analysis";
        }
        if (name.includes("Mikrocontroller Fundamentals")) {
            return "µController Fundamentals";
        }
        if (name.includes("Applied Programming")) {
            return "Applied Programming";
        }
        if (name.includes("Advanced Programming")) {
            return "Advanced Programming";
        }
        if (name.length > 35) {
            return name.substring(0, 32) + "...";
        }
        return name;
    }
};