/* ==== SOZIALWISSENSCHAFTEN MAJOR DATA ==== */
// Enthält strukturierte Listen für Major-Optionen (120 ECTS)

window.SozwiMajorData = {
    majorBereiche: {
        // Ethnologie Module werden aus separater Datei geladen
        // Siehe: ethnologie-modules-data.js
        get "Ethnologie"() {
            return window.SozwiEthnologieModules || [];
        },
        // Kommunikationswissenschaft Module werden aus separater Datei geladen
        // Siehe: kommunikationswissenschaft-modules-data.js
        get "Kommunikationswissenschaft und Medienforschung"() {
            return window.SozwiKommunikationswissenschaftModules || [];
        },
        "Politikwissenschaft": [
            // 1. Studienjahr - Einführung
            { name: "Politische Systeme und Theorien I", kp: 9, kategorie: "Major", jahr: 1, semester: 1 },
            { name: "Einführung in die Schweizer Politik", kp: 3, kategorie: "Major", jahr: 1, semester: 1 },
            { name: "Einführung Methoden und Statistik", kp: 3, kategorie: "Major", jahr: 1, semester: 1 },
            { name: "Politische Systeme und Theorien II", kp: 9, kategorie: "Major", jahr: 1, semester: 2 },
            { name: "Aufbaukurs Methoden und Statistik", kp: 6, kategorie: "Major", jahr: 1, semester: 2 },

            // 2. Studienjahr - Vertiefung und Methoden
            { name: "Fortgeschrittene Methoden und Statistik", kp: 6, kategorie: "Major", jahr: 2, semester: 1 },
            { name: "Vertiefung: Vorlesungen (3 ECTS pro Modul)", kp: 12, kategorie: "Major", jahr: 2, semester: 0, isPlaceholder: true, info: "Wähle 4 von 12 Vorlesungen zu Teilbereichen der Politikwissenschaft" },
            { name: "Einführung in die qualitativen Methoden", kp: 6, kategorie: "Major", jahr: 2, semester: 2 },
            { name: "Vertiefung: Vorlesungen (3 ECTS pro Modul)", kp: 12, kategorie: "Major", jahr: 2, semester: 0, isPlaceholder: true, info: "Weitere 4 Vorlesungen zu Teilbereichen der Politikwissenschaft" },

            // 3. Studienjahr - Anwendung, Spezialisierung und Bachelorarbeit
            { name: "Anwendung: Seminare (6 ECTS pro Modul)", kp: 24, kategorie: "Major", jahr: 3, semester: 0, isPlaceholder: true, info: "Wähle 4 Seminare aufbauend auf den Vorlesungen" },
            { name: "Spezialisierung", kp: 6, kategorie: "Major", jahr: 3, semester: 1, info: "Vorbereitung auf die Bachelorarbeit in einer Gruppe von max. 15 Studierenden" },
            { name: "Bachelorarbeit", kp: 15, kategorie: "Major", jahr: 3, semester: 2 },

            // Wahlmodule (optional)
            { name: "Wahlmodule", kp: 9, kategorie: "Major", jahr: 3, semester: 0, isPlaceholder: true, info: "Optionale Wahlmodule zur Erweiterung" },
        ],
        "Populäre Kulturen": [
            {
                name: "Populäre Kulturen Major",
                kp: 120,
                kategorie: "Major",
                info: "Studieninhalte gemäss Modulkatalog Populäre Kulturen"
            }
        ],
        "Soziologie": [
            {
                name: "Soziologie Major",
                kp: 120,
                kategorie: "Major",
                info: "Studieninhalte gemäss Modulkatalog Soziologie"
            }
        ],
    },
};
