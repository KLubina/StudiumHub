/* ==== ITET BASE CONFIGURATION - VERBESSERT ==== */
/* Grundlegende Konfiguration für den ITET Studiengang */

window.StudiengangBaseConfig = {
    // Grundlegende Informationen
    title: "BSc Informationstechnologie und Elektrotechnik",
    subtitle: "mind. 180 KP insgesamt",
    legendTitle: "Farben-Legende",
    creditUnit: "KP",
    
    // Layout-Konfiguration - VERBESSERT FÜR HORIZONTALES LAYOUT
    layout: "years",
    moduleSizing: "proportional",
    basisArea: 2000,
    defaultAspectRatio: 1.5,
    layoutClass: "horizontal-modules", // Neue Layout-Klasse für horizontale Anordnung
    
    // Features
    enableTooltips: true,  // WICHTIG: Muss true sein für Drag & Drop
    enableHover: true,
    
    // Aspekt-Verhältnisse für verschiedene Module
    aspectRatios: {
        "longModuleName": 2.0,
        "Bachelorarbeit": 2.8,
        "Science in Perspective": 2.2
    },
    
    // Spezielle Layout-Anweisungen für 3. Jahr
    thirdYearLayout: "category-based", // Spezielle Behandlung für 3. Jahr
    
    // Kategorien-Reihenfolge für 3. Jahr (wie bei MTEC)
    thirdYearCategoryOrder: [
        "Kernfächer nach Schwerpunkt",
        "Wahl Praktika-Projekte-Seminare", 
        "Wissenschaftliche Arbeit",
        "Wahlfächer",
        "Weitere Wahl-Grundlagenfächer"
    ],
    
    // Kategorien basierend auf dem ITET Studienplan - OBJEKT FORMAT für Drag & Drop
// Kategorien basierend auf dem ITET Studienplan - OBJEKT FORMAT für Drag & Drop
    kategorien: [
        { name: "Obligatorische Fächer", klasse: "obligatorisch" },
        { name: "Obligatorische Praktikum", klasse: "obligatorisch-praktikum" },
        { 
            name: "Wahl Praktika-Projekte-Seminare", 
            klasse: "wahl-praktika-projekte",
            hasTooltip: true,  // WICHTIG: Aktiviert Drag & Drop
            info: "💡 Ziehe Module aus der Liste!",
            description: "Wählbare Praktika und Projekte"
        },
        { 
            name: "Kernfächer nach Schwerpunkt", 
            klasse: "kern",
            description: "Computer und Netzwerk Schwerpunkt",
            minKp: 18
        },
        { 
            name: "Wahlfächer", 
            klasse: "wahl",
            description: "Frei wählbare Module",
            minKp: 6
        },
        { 
            name: "Wissenschaftliche Arbeit", 
            klasse: "wissenschaft",
            description: "Bachelorarbeit und SIP"
        },
        { 
            name: "Weitere Wahl-Grundlagenfächer", 
            klasse: "weitere-wahl-grundlagen",
            description: "Zusätzliche Grundlagenfächer",
            minKp: 8
        }
    ],
    
    kategorieZuKlasse: {
        "Obligatorische Fächer": "obligatorisch",
        "Obligatorische Praktikum": "obligatorisch-praktikum",
        "Wahl Praktika-Projekte-Seminare": "wahl-praktika-projekte",
        "Kernfächer nach Schwerpunkt": "kern",
        "Wahlfächer": "wahl",
        "Wissenschaftliche Arbeit": "wissenschaft",
        "Weitere Wahl-Grundlagenfächer": "weitere-wahl-grundlagen"
    },
    
    // Spezielle Styling-Optionen für ITET
    styling: {
        compactLayout: true,
        horizontalModules: true,
        categoryBasedThirdYear: true,
        showCategoryTitles: true,
        moduleSpacing: "8px",
        categorySpacing: "20px"
    },
    
    // Custom Sizing für bessere Kompaktheit (ähnlich MTEC)
    customSizing: function(div, modul) {
        let width = 160;
        let height = 70;
        
        // Spezielle Größen für besondere Module
        if (modul.name === "Bachelorarbeit") {
            width = 200;
            height = 120;
        } else if (modul.name === "Science in Perspective") {
            width = 180;
            height = 90;
        } else if (modul.kp >= 8) {
            width = Math.max(160, modul.kp * 12);
            height = Math.max(70, modul.kp * 6);
        } else if (modul.kp <= 2) {
            width = 120;
            height = 60;
        }
        
        // Namen kürzen wenn zu lang
        if (modul.name && modul.name.length > 45) {
            const shortName = this.shortenModuleName(modul.name);
            div.title = modul.name; // Vollständiger Name als Tooltip
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
        if (name.includes("Halbleiter-Schaltungstechnik")) {
            return "Halbleiter-Schaltungstechnik";
        }
        if (name.includes("Netzwerke und Schaltungen")) {
            return "Netzwerke & Schaltungen";
        }
        if (name.includes("Elektromagnetische Felder")) {
            return "EM-Felder & Wellen";
        }
        if (name.includes("Wahrscheinlichkeitstheorie")) {
            return "Wahrscheinlichkeit & Statistik";
        }
        if (name.includes("Informationstechnologie")) {
            return "IT & Elektrotechnik";
        }
        if (name.includes("Signal- und Systemtheorie")) {
            return name.replace("Signal- und Systemtheorie", "Signal & Systemtheorie");
        }
        if (name.includes("Mathematische Methoden")) {
            return "Math. Methoden";
        }
        if (name.length > 45) {
            return name.substring(0, 42) + "...";
        }
        return name;
    }
};