/* ==== BWL BASE CONFIGURATION - STANDARDISIERT ==== */
/* Grundlegende Konfiguration für den BWL HSG Studiengang */

window.StudiengangBaseConfig = {
    // === 1. BASIC INFO ===
    title: "BA Betriebswirtschaftslehre",
    legendTitle: "Farben-Legende",
        // Optional HTML subtitle (renders clickable links when provided)
    subtitleHtml: `Herbstsemester: <a href="https://courses.unisg.ch/event/event-hierarchy/by-term/4d90fc2e-5321-473f-84d5-498a70062b9d" target="_blank" rel="noopener">VVZ Herbst 2025</a>
        <br>
        Sommersemester: <a href="https://courses.unisg.ch/event/event-hierarchy/by-term/578663a7-e4fc-4b04-8ed9-0d43ef1e9d46" target="_blank" rel="noopener">VVZ Sommer 2025</a>`,
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
