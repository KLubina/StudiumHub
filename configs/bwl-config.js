/* ==== BWL HSG STUDIENGANG KONFIGURATION ==== */

window.StudiengangConfig = {
    // Grundlegende Informationen
    title: "BA BWL Studium an der HSG",
    subtitle: "mind. 180 ECTS insgesamt",
    legendTitle: "Farben-Legende",
    creditUnit: "ECTS",
    
    // Layout-Konfiguration
    layout: "years",
    moduleSizing: "fixed",
    useEctsBasedSizing: true,
    baseWidth: 160,
    baseHeight: 80,
    
    // Spezielle Flags
    assessmentJahr: true,
    hauptstudium: true,
    
    // Features
    enableTooltips: false,
    enableHover: true,
    
    // Bereiche-Reihenfolge für 2. Jahr
    bereicheReihenfolge: ["Pflichtbereich", "Pflichtwahlbereich", "Kontextstudium", "Bachelor"],
    
    // Kategorien und ihre CSS-Klassen
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
    },
    
    // Moduldaten
    daten: [
        // 1. Semester (Assessment Jahr)
        { jahr: 1, semester: 1, name: "Betriebswirtschaftslehre (Einführung in die Managementlehre)", kp: 5.50, kategorie: "kernfach" },
        { jahr: 1, semester: 1, name: "Mathematik A", kp: 3.50, kategorie: "methoden" },
        { jahr: 1, semester: 1, name: "Einführung ins Privatrecht", kp: 5.50, kategorie: "grundlagen" },
        { jahr: 1, semester: 1, name: "VWL A: Mikroökonomik I", kp: 5.50, kategorie: "grundlagen" },
        { jahr: 1, semester: 1, name: "Einführung in das wissenschaftliche Schreiben", kp: 3.00, kategorie: "kontext" },
        { jahr: 1, semester: 1, name: "Geschichte: Die Geschichte des Nationalismus in Europa seit 1750", kp: 2.00, kategorie: "kontext" },
        { jahr: 1, semester: 1, name: "Skills", kp: 5.00, kategorie: "methoden" },

        // 2. Semester (Assessment Jahr)
        { jahr: 1, semester: 2, name: "Betriebswirtschaftslehre (Wirtschaftsethik und Finanzielle Führung)", kp: 5.50, kategorie: "kernfach" },
        { jahr: 1, semester: 2, name: "Mathematik B", kp: 3.50, kategorie: "methoden" },
        { jahr: 1, semester: 2, name: "Einführung ins Bundesstaatsrecht", kp: 5.50, kategorie: "grundlagen" },
        { jahr: 1, semester: 2, name: "VWL B: Makroökonomik I", kp: 5.50, kategorie: "grundlagen" },
        { jahr: 1, semester: 2, name: "Integrationsprojekt", kp: 4.00, kategorie: "kontext" },
        { jahr: 1, semester: 2, name: "Geschichte: Geschichte des politischen Denkens vor ca. 1750", kp: 2.00, kategorie: "kontext" },
        { jahr: 1, semester: 2, name: "Skills", kp: 5.00, kategorie: "methoden" },

        // Fachstudium - Pflichtbereich (2.-3. Jahr)
        { jahr: 2, semester: 0, bereich: "Pflichtbereich", name: "Accounting, Controlling, Auditing", kp: 4.00, kategorie: "kernfach" },
        { jahr: 2, semester: 0, bereich: "Pflichtbereich", name: "Corporate Finance (BBWL)", kp: 4.00, kategorie: "kernfach" },
        { jahr: 2, semester: 0, bereich: "Pflichtbereich", name: "Introduction to Operations Management", kp: 4.00, kategorie: "kernfach" },
        { jahr: 2, semester: 0, bereich: "Pflichtbereich", name: "Fundamentals and Methods of Computer Science for Business Studies", kp: 8.00, kategorie: "methoden" },
        { jahr: 2, semester: 0, bereich: "Pflichtbereich", name: "Leadership und Human Resource Management", kp: 4.00, kategorie: "kernfach" },
        { jahr: 2, semester: 0, bereich: "Pflichtbereich", name: "Makroökonomik II: Vorlesung und Selbststudium", kp: 4.00, kategorie: "grundlagen" },
        { jahr: 2, semester: 0, bereich: "Pflichtbereich", name: "Marketing", kp: 4.00, kategorie: "kernfach" },
        { jahr: 2, semester: 0, bereich: "Pflichtbereich", name: "Methoden: Empirische Sozialforschung", kp: 4.00, kategorie: "methoden" },
        { jahr: 2, semester: 0, bereich: "Pflichtbereich", name: "Methoden: Statistik", kp: 4.00, kategorie: "methoden" },
        { jahr: 2, semester: 0, bereich: "Pflichtbereich", name: "Mikroökonomik II", kp: 4.00, kategorie: "grundlagen" },
        { jahr: 2, semester: 0, bereich: "Pflichtbereich", name: "Strategisches Management", kp: 4.00, kategorie: "kernfach" },
        { jahr: 2, semester: 0, bereich: "Pflichtbereich", name: "Business and Tax Law", kp: 8.00, kategorie: "grundlagen" },
        { jahr: 2, semester: 0, bereich: "Pflichtbereich", name: "Capstone-Projekt: Unternehmerische Informatik", kp: 8.00, kategorie: "methoden" },
        
        // Bachelor-Arbeit
        { jahr: 2, semester: 0, bereich: "Bachelor", name: "Bachelor-Arbeit", kp: 12.00, kategorie: "bachelor" },
        
        // Kontextstudium - Fokusbereich Geschichte
        { jahr: 2, semester: 0, bereich: "Kontextstudium", name: "Dark Continent - A History of Europe, 1914-present", kp: 3.00, kategorie: "kontext" },
        { jahr: 2, semester: 0, bereich: "Kontextstudium", name: "Grundzüge der Unternehmensgeschichte (19.-20. Jahrhundert)", kp: 3.00, kategorie: "kontext" },
        { jahr: 2, semester: 0, bereich: "Kontextstudium", name: "Die Geopolitik ist zurück auf dem Balkan - historische Voraussetzungen und künftige Risiken für Europa", kp: 3.00, kategorie: "kontext" },
        { jahr: 2, semester: 0, bereich: "Kontextstudium", name: "Unternehmer-Biographien - ein Schlüssel zur Wirtschaftsgeschichte", kp: 6.00, kategorie: "kontext" },
        { jahr: 2, semester: 0, bereich: "Kontextstudium", name: "Direkte Demokratie - ein politisches Erfolgsmodell? Seine Geschichte und Grenzen", kp: 3.00, kategorie: "kontext" },
        { jahr: 2, semester: 0, bereich: "Kontextstudium", name: "Pulverfass Balkan - Kleinstaatenpolitik und Grossmachtrivalität vor und während des Ersten Weltkriegs", kp: 3.00, kategorie: "kontext" },
        { jahr: 2, semester: 0, bereich: "Kontextstudium", name: "Increasing Racial and Ethnic Equity in Switzerland", kp: 3.00, kategorie: "kontext" },
        
        // Pflichtwahlbereich
        { jahr: 2, semester: 0, bereich: "Pflichtwahlbereich", name: "Business-to-IT-Innovation: Was (zukünftige) Managerinnen und Manager wissen sollten", kp: 4.00, kategorie: "kernfach" },
        { jahr: 2, semester: 0, bereich: "Pflichtwahlbereich", name: "Controlling mit SAP", kp: 4.00, kategorie: "kernfach" },
        { jahr: 2, semester: 0, bereich: "Pflichtwahlbereich", name: "Machine Learning in Finance", kp: 4.00, kategorie: "methoden" },
        { jahr: 2, semester: 0, bereich: "Pflichtwahlbereich", name: "Risk Management", kp: 4.00, kategorie: "kernfach" },
        { jahr: 2, semester: 0, bereich: "Pflichtwahlbereich", name: "Business and Market Research", kp: 4.00, kategorie: "kernfach" }
    ]
};