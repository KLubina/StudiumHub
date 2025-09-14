/* ==== BFH EIT BASE CONFIGURATION - STANDARDISIERT ==== */
/* Grundlegende Konfiguration für den BFH Elektrotechnik und Informationstechnologie Studiengang */

window.StudiengangBaseConfig = {
    // === 1. BASIC INFO ===
    title: "BSc Elektrotechnik und Informationstechnologie",
    legendTitle: "Farben-Legende",
    creditUnit: "ECTS",
    
    // === 2. LAYOUT CONFIG ===
    layout: "years",
    moduleSizing: "proportional",
    basisArea: 2000,
    defaultAspectRatio: 1.4,
    layoutClass: "horizontal-modules",
    
    // === 3. FEATURE FLAGS ===
    enableTooltips: true,
    enableHover: true,
    enableColorManager: true,
    enableWahlmodule: true,
    enableKPCounter: true,
    
    // === 4. ERWEITERTE FEATURES ===
    // ColorManager Config
    coloringModes: {
        kategorie: "Kategorien",
        semester: "Semestern",
    },
    defaultColoringMode: "kategorie",
    
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
        "Projektarbeit": 2.2,
        "Wahrscheinlichkeit, Statistik und dynamische Systeme": 2.5,
        "Mathematik der Signalverarbeitung": 2.0,
        "longName": 2.0
    },
    
    // Layout für 3. Jahr (Semester 5-6)
    thirdYearLayout: "category-based",
    thirdYearCategoryOrder: [
        "Vertiefungsrichtungen",
        "Fachliche Wahlmodule", 
        "Projektarbeiten",
        "Abschlussarbeit"
    ],
    
    // === 6. KATEGORIEN ===
    kategorien: [
        { name: "Grundlagenfächer", klasse: "grundlagen" },
        { name: "Praktika und Projekte", klasse: "praktika" },
        { name: "Sprachen und Soft Skills", klasse: "sprachen" },
        { 
            name: "Vertiefungsrichtungen", 
            klasse: "vertiefung",
            hasTooltip: true,
            info: "💡 Wähle deine Vertiefungsrichtung!",
            description: "Eine Vertiefungsrichtung auswählen (min. 20 ECTS)",
            minKp: 20
        },
        { 
            name: "Fachliche Wahlmodule", 
            klasse: "wahlmodule",
            hasTooltip: true,
            info: "💡 Wähle deine Wahlmodule!",
            description: "Frei wählbare Module (min. 10, max. 22 ECTS)",
            minKp: 10
        },
        { name: "Abschlussarbeit", klasse: "abschluss" }
    ],
    
    kategorieZuKlasse: {
        "Grundlagenfächer": "grundlagen",
        "Praktika und Projekte": "praktika", 
        "Sprachen und Soft Skills": "sprachen",
        "Vertiefungsrichtungen": "vertiefung",
        "Fachliche Wahlmodule": "wahlmodule",
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
        } else if (modul.name === "Projektarbeit") {
            width = 180;
            height = 90;
        } else if (modul.kp >= 6) {
            width = Math.max(160, modul.kp * 15);
            height = Math.max(70, modul.kp * 8);
        } else if (modul.kp <= 2) {
            width = 120;
            height = 60;
        }
        
        // Namen kürzen wenn zu lang
        if (modul.name && modul.name.length > 40) {
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
        if (name.includes("Wahrscheinlichkeit, Statistik")) {
            return "Wahrscheinlichkeit & Statistik";
        }
        if (name.includes("Mathematik der Signalverarbeitung")) {
            return "Math. Signalverarbeitung";
        }
        if (name.includes("Elektrische und magnetische Felder")) {
            return "EM-Felder";
        }
        if (name.includes("Kontinuierliche Signale")) {
            return "Kontinuierliche Signale";
        }
        if (name.includes("Hardwarenahe Softwareentwicklung")) {
            return "HW-nahe SW-Entwicklung";
        }
        if (name.includes("Funktionale Softwareentwicklung")) {
            return "Funktionale SW-Entwicklung";
        }
        if (name.length > 40) {
            return name.substring(0, 37) + "...";
        }
        return name;
    }
};