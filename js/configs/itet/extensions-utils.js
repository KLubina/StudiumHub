/* ==== ITET UTILITY FUNCTIONS ==== */
/* Alle Utility-Funktionen für ITET - direkt aus der alten extensions.js */

window.ITETUtils = {
    // Controls für Praktika-Management hinzufügen
    addPraktikaControls: function() {
        const legendContainer = document.querySelector(".farben-legende");
        
        const praktikaControls = document.createElement("div");
        praktikaControls.style.marginBottom = "15px";
        praktikaControls.style.padding = "10px";
        praktikaControls.style.backgroundColor = "#fff8f8";
        praktikaControls.style.borderRadius = "5px";
        praktikaControls.style.border = "2px solid #4CA64C";

        praktikaControls.innerHTML = `
            <div style="text-align: center; margin-bottom: 10px;">
                <h4 style="margin: 0 0 8px 0; color: #4CA64C;">🎯 Modul-Auswahl</h4>
                <div style="font-size: 12px; color: #666; margin-bottom: 10px;">
                    Klicke auf die Kategorien in der Legende um Module auszuwählen!
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 11px;">
                    <div style="text-align: left;">
                        <button id="show-praktika-list" style="background: #4CA64C; color: white; border: none; padding: 3px 6px; border-radius: 3px; cursor: pointer; margin-bottom: 4px;">
                            📋 Praktika
                        </button>
                        <span style="margin-left: 5px;">
                            <span id="selected-praktika-kp" style="font-weight: bold;">0</span> KP
                        </span>
                    </div>
                    <div style="text-align: left;">
                        <button id="show-kernfaecher-list" style="background: #DD98DD; color: black; border: none; padding: 3px 6px; border-radius: 3px; cursor: pointer; margin-bottom: 4px;">
                            📚 Kernfächer
                        </button>
                        <span style="margin-left: 5px;">
                            <span id="selected-kernfaecher-kp" style="font-weight: bold;">0</span>/18 KP
                        </span>
                    </div>
                    <div style="text-align: left;">
                        <button id="show-wahlfaecher-list" style="background: #F2B48F; color: black; border: none; padding: 3px 6px; border-radius: 3px; cursor: pointer; margin-bottom: 4px;">
                            🎓 Wahlfächer
                        </button>
                        <span style="margin-left: 5px;">
                            <span id="selected-wahlfaecher-kp" style="font-weight: bold;">0</span> KP
                        </span>
                    </div>
                    <div style="text-align: left;">
                        <button id="show-weitere-wahl-grundlagen-list" style="background: #FFD700; color: black; border: none; padding: 3px 6px; border-radius: 3px; cursor: pointer; margin-bottom: 4px;">
                            ⚡ Grundlagen
                        </button>
                        <span style="margin-left: 5px;">
                            <span id="selected-weitere-wahl-grundlagen-kp" style="font-weight: bold;">0</span>/8 KP
                        </span>
                    </div>
                </div>
                <div style="margin-top: 10px;">
                    <button id="refresh-studienplan" style="background: #17a2b8; color: white; border: none; padding: 5px 12px; border-radius: 3px; cursor: pointer; margin-right: 5px; font-size: 11px;">
                        🔄 Neu laden
                    </button>
                    <button id="save-praktika" style="background: #28a745; color: white; border: none; padding: 5px 12px; border-radius: 3px; cursor: pointer; margin-right: 5px; font-size: 11px;">
                        💾 Exportieren
                    </button>
                    <button id="reset-praktika" style="background: #dc3545; color: white; border: none; padding: 5px 12px; border-radius: 3px; cursor: pointer; font-size: 11px;">
                        🗑️ Reset
                    </button>
                </div>
            </div>
        `;

        legendContainer.insertBefore(praktikaControls, document.getElementById("kp-counter").nextSibling);
    },

    // Module Name kürzen
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
    },

    // Export alle Module
    exportAllModules: function(selectedModules) {
        const praktikaKp = Object.values(selectedModules.praktika).flat().reduce((sum, m) => sum + m.kp, 0);
        const kernfaecherKp = Object.values(selectedModules.kernfaecher).flat().reduce((sum, m) => sum + m.kp, 0);
        const wahlfaecherKp = Object.values(selectedModules.wahlfaecher).flat().reduce((sum, m) => sum + m.kp, 0);
        const weitereWahlGrundlagenKp = Object.values(selectedModules.weitereWahlGrundlagen).flat().reduce((sum, m) => sum + m.kp, 0);
        
        const exportData = {
            studiengang: "BSc ITET - ETH Zürich",
            selectedPraktika: selectedModules.praktika,
            selectedKernfaecher: selectedModules.kernfaecher,
            selectedWahlfaecher: selectedModules.wahlfaecher,
            selectedWeitereWahlGrundlagen: selectedModules.weitereWahlGrundlagen,
            summary: {
                praktikaKp: praktikaKp,
                kernfaecherKp: kernfaecherKp,
                wahlfaecherKp: wahlfaecherKp,
                weitereWahlGrundlagenKp: weitereWahlGrundlagenKp,
                totalSelectedKp: praktikaKp + kernfaecherKp + wahlfaecherKp + weitereWahlGrundlagenKp
            },
            timestamp: new Date().toISOString(),
            version: "2.0"
        };

        this.downloadJSON(exportData, "itet-alle-module.json");
        this.showMessage("📁 Alle ausgewählten Module als JSON-Datei gespeichert!", "success");
    },

    // JSON Download
    downloadJSON: function(data, filename) {
        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(dataBlob);

        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        link.style.display = "none";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);
    },

    // Toast-Nachrichten
    showMessage: function(message, type = "info") {
        const toast = document.createElement("div");
        toast.style.position = "fixed";
        toast.style.top = "20px";
        toast.style.right = "20px";
        toast.style.padding = "10px 15px";
        toast.style.borderRadius = "5px";
        toast.style.zIndex = "9999";
        toast.style.fontSize = "12px";
        toast.style.fontWeight = "bold";
        toast.textContent = message;

        const colors = {
            success: { bg: "#28a745", color: "white" },
            warning: { bg: "#ffc107", color: "black" },
            info: { bg: "#17a2b8", color: "white" },
            error: { bg: "#dc3545", color: "white" }
        };

        const style = colors[type] || colors.info;
        toast.style.backgroundColor = style.bg;
        toast.style.color = style.color;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000);
    },

    // LocalStorage Management
    saveToLocalStorage: function(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error(`Fehler beim Speichern von ${key}:`, error);
            return false;
        }
    },

    loadFromLocalStorage: function(key) {
        try {
            const saved = localStorage.getItem(key);
            return saved ? JSON.parse(saved) : null;
        } catch (error) {
            console.error(`Fehler beim Laden von ${key}:`, error);
            return null;
        }
    },

    // KP Berechnung für Kategorie
    calculateKPForCategory: function(modules) {
        return Object.values(modules).flat().reduce((sum, m) => sum + m.kp, 0);
    },

    // Prüfe ob Mindestanforderungen erfüllt
    checkMinimumRequirements: function(selectedModules) {
        const kernfaecherKp = this.calculateKPForCategory(selectedModules.kernfaecher);
        const weitereWahlGrundlagenKp = this.calculateKPForCategory(selectedModules.weitereWahlGrundlagen);
        
        const requirements = {
            kernfaecher: {
                required: 18,
                current: kernfaecherKp,
                fulfilled: kernfaecherKp >= 18
            },
            weitereWahlGrundlagen: {
                required: 8,
                current: weitereWahlGrundlagenKp,
                fulfilled: weitereWahlGrundlagenKp >= 8
            },
            allFulfilled: kernfaecherKp >= 18 && weitereWahlGrundlagenKp >= 8
        };
        
        return requirements;
    }
};

console.log('✅ ITET Utility Funktionen geladen');