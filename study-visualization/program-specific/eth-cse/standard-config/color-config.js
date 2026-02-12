/* ==== CSE COLOR CONFIGURATION - ZENTRAL ==== */
/* Alle Farb-Zuordnungen für Module an einem Ort */

window.CSEColorConfig = {
    // === THEMENBEREICH-ZUORDNUNG ===
    themenbereiche: {
        // 1. Jahr, 1. Semester
        "Physik I": "physik",
        "Informatik": "informatik",
        "Lineare Algebra": "mathematik",
        "Diskrete Mathematik": "mathematik",
        "Analysis I": "mathematik",

        // 1. Jahr, 2. Semester
        "Physik II": "physik",
        "Mathematische Methoden (ehem. Komplexe Analysis)": "mathematik",
        "Chemie": "chemie",
        "Analysis II": "mathematik",
        "Datenstrukturen und Algorithmen": "informatik",

        // 2. Jahr
        "Analysis III": "mathematik",
        "Introduction to Mathematical Optimization": "mathematik",
        "Numerische Methoden für CSE": "informatik",
        "Wahrscheinlichkeitstheorie und Statistik (ehem. Stochastik)": "mathematik",
        "Numerical Methods for Partial Differential Equations": "informatik",
        "Programmiertechniken für physikalische Simulationen": "informatik",
        "Systems Programming and Computer Architecture": "informatik",
        "Wissenschaft im Kontext": "sonstiges",
        "Fluid Dynamics I": "physik",
        "Statistische Physik und Computer Simulation": "informatik",

        // 3. Jahr - Abschluss
        "Fallstudien": "sonstiges",
        "Bachelorarbeit": "sonstiges",
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
            informatik: {
                bg: "#2600ff",
                text: "white",
                emoji: "💻",
                label: "Informatik"
            },
            physik: {
                bg: "#2196F3",
                text: "white",
                emoji: "🌍",
                label: "Physik"
            },
            chemie: {
                bg: "#9C27B0",
                text: "white",
                emoji: "⚗️",
                label: "Chemie"
            },
            sonstiges: {
                bg: "#E0E0E0",
                text: "black",
                emoji: "📚",
                label: "Sonstiges"
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
