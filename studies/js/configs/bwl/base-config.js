/* ==== BWL BASE CONFIGURATION - STANDARDISIERT ==== */
/* Grundlegende Konfiguration für den BWL HSG Studiengang */

window.StudiengangBaseConfig = {
    // === 1. BASIC INFO ===
    title: "BA Betriebswirtschaftslehre",
    legendTitle: "Farben-Legende",
    creditUnit: "ECTS",
    
    // === 2. LAYOUT CONFIG ===
    layout: "years",
    moduleSizing: "fixed",
    baseWidth: 160,
    baseHeight: 80,
    useEctsBasedSizing: true,
    
    // === 3. FEATURE FLAGS ===
    enableTooltips: false,
    enableHover: true,
    enableColorManager: false,
    enableWahlmodule: false, 
    enableKPCounter: false,
    
    // === 4. SPEZIELLE FLAGS (BWL-spezifisch) ===
    assessmentJahr: true,
    hauptstudium: true,
    
    // === 5. BEREICHE-REIHENFOLGE ===
    bereicheReihenfolge: ["Pflichtbereich", "Pflichtwahlbereich", "Kontextstudium", "Bachelor"],
    
    // === 6. KATEGORIEN ===
    kategorien: [
        { name: "BWL & Management Kernfächer", klasse: "kernfach" },
        { name: "Methodenfächer (Mathe, Statistik, Informatik)", klasse: "methoden" },
        { name: "Grundlagenfächer (VWL, Recht)", klasse: "grundlagen" },
        { name: "Kontextstudium", klasse: "kontext" },
        { name: "Bachelor-Arbeit", klasse: "bachelor" }
    ],
    
    kategorieZuKlasse: {
        "kernfach": "kernfach",
        "methoden": "methoden",
        "grundlagen": "grundlagen",
        "kontext": "kontext",
        "bachelor": "bachelor"
    }
};