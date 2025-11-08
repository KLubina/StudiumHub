/* ==== ITET COLOR CONFIGURATION - ZENTRAL ==== */
/* Alle Farb-Zuordnungen für Module an einem Ort */

window.ITETColorConfig = {
    // === THEMENBEREICH-ZUORDNUNG (1. & 2. Jahr) ===
    themenbereiche: {
        // 1. Jahr, 1. Semester
        "Technische Mechanik": "physik",
        "Netzwerke und Schaltungen I": "elektrotechnik",
        "Digitaltechnik": "informationstechnologie",
        "Digitaltechnik Praktikum": "informationstechnologie",
        "Vorkurs Informatik": "informationstechnologie",
        "Analysis 1": "mathematik",
        "Lineare Algebra": "mathematik",

        // 1. Jahr, 2. Semester
        "Physik I": "physik",
        "Netzwerke und Schaltungen II": "elektrotechnik",
        "Netzwerke und Schaltungen Praktikum": "elektrotechnik",
        "Informatik I": "informationstechnologie",
        "Analysis 2": "mathematik",
        "Mathematische Methoden": "mathematik",

        // 2. Jahr, 1. Semester
        "Physik II": "physik",
        "Signal- und Systemtheorie I": "elektrotechnik",
        "Halbleiter-Schaltungstechnik": "elektrotechnik",
        "Halbleiter-Schaltungstechnik Praktikum": "elektrotechnik",
        "Informatik II": "informationstechnologie",
        "Analysis 3": "mathematik",
        "Diskrete Mathematik": "mathematik",

        // 2. Jahr, 2. Semester
        "Elektromagnetische Felder und Wellen": "physik",
        "Signal- und Systemtheorie II": "elektrotechnik",
        "Halbleiterelemente": "elektrotechnik",
        "Technische Informatik": "informationstechnologie",
        "Numerische Methoden": "mathematik",
        "Wahrscheinlichkeitstheorie und Statistik": "mathematik",
    },

    // === PRÜFUNGSBLOCK-ZUORDNUNG ===
    pruefungsbloecke: {
        "BPb-A": {
            name: "Basisprüfungsblock A",
            shortName: "BPb-A",
            cssClass: "block-bpa",
            color: "#FF6B6B",
            module: [
                "Digitaltechnik",
                "Lineare Algebra",
                "Netzwerke und Schaltungen I",
                "Technische Mechanik",
            ]
        },
        "BPb-B": {
            name: "Basisprüfungsblock B",
            shortName: "BPb-B",
            cssClass: "block-bpb",
            color: "#4ECDC4",
            module: [
                "Analysis 1",
                "Analysis 2",
                "Informatik I",
                "Mathematische Methoden",
                "Netzwerke und Schaltungen II",
                "Physik I",
            ]
        },
        "Pb-1": {
            name: "Prüfungsblock 1",
            shortName: "Pb-1",
            cssClass: "block-p1",
            color: "#45B7D1",
            module: [
                "Analysis 3",
                "Physik II",
                "Signal- und Systemtheorie I",
                "Informatik II",
            ]
        },
        "Pb-2": {
            name: "Prüfungsblock 2",
            shortName: "Pb-2",
            cssClass: "block-p2",
            color: "#96CEB4",
            module: [
                "Halbleiter-Schaltungstechnik",
                "Diskrete Mathematik",
                "Technische Informatik",
                "Signal- und Systemtheorie II",
            ]
        },
        "Pb-3": {
            name: "Prüfungsblock 3",
            shortName: "Pb-3",
            cssClass: "block-p3",
            color: "#FFEAA7",
            module: [
                "Numerische Methoden",
                "Elektromagnetische Felder und Wellen",
                "Halbleiterelemente",
                "Wahrscheinlichkeitstheorie und Statistik",
            ]
        }
    },

    // === FARB-DEFINITIONEN ===
    colors: {
        themenbereiche: {
            mathematik: {
                bg: "#00a99d",
                text: "white",
                emoji: "🧮",
                label: "Mathematik"
            },
            elektrotechnik: {
                bg: "#FF6B35",
                text: "white",
                emoji: "⚡",
                label: "Elektrotechnik"
            },
            informationstechnologie: {
                bg: "#2600ff",
                text: "white",
                emoji: "💻",
                label: "Informationstechnologie"
            },
            physik: {
                bg: "#2196F3",
                text: "white",
                emoji: "🌍",
                label: "Physik"
            }
        }
    },

    // === HELPER FUNCTIONS ===
    getThemenbereich: function(moduleName) {
        return this.themenbereiche[moduleName] || null;
    },

    getPruefungsblock: function(moduleName) {
        for (const [key, block] of Object.entries(this.pruefungsbloecke)) {
            if (block.module.includes(moduleName)) {
                return block;
            }
        }
        return null;
    },

    getThemenbereichColor: function(themenbereich) {
        return this.colors.themenbereiche[themenbereich] || null;
    }
};
