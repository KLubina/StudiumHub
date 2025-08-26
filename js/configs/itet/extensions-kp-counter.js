/* ==== ITET KP COUNTER FUNCTIONS ==== */
/* KP-Counter System für ITET */

window.ITETKPCounter = {
    // KP-Counter HTML erstellen
    createKPCounter: function() {
        const kpCounterContainer = document.createElement("div");
        kpCounterContainer.id = "kp-counter";
        kpCounterContainer.style.marginBottom = "20px";
        kpCounterContainer.style.padding = "15px";
        kpCounterContainer.style.backgroundColor = "#f8f9fa";
        kpCounterContainer.style.borderRadius = "8px";
        kpCounterContainer.style.border = "2px solid #0D5B8C";
        kpCounterContainer.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";

        kpCounterContainer.innerHTML = `
            <div style="text-align: center; margin-bottom: 15px;">
                <h3 style="margin: 0 0 5px 0; color: #0D5B8C; font-size: 18px;">📊 KP-Übersicht</h3>
                <div style="font-size: 12px; color: #666;">
                    Automatische Zählung aller Module
                </div>
            </div>
            
            <div id="kp-total" style="text-align: center; margin-bottom: 15px; padding: 10px; background: linear-gradient(135deg, #0D5B8C, #00A0E3); color: white; border-radius: 5px; font-weight: bold;">
                <div style="font-size: 24px; margin-bottom: 5px;">
                    <span id="total-kp">0</span> KP
                </div>
                <div style="font-size: 12px; opacity: 0.9;">
                    von mindestens 180 KP erforderlich
                </div>
                <div id="kp-status" style="margin-top: 5px; font-size: 11px;">
                    <div id="kp-progress-bar" style="width: 100%; height: 4px; background-color: rgba(255,255,255,0.3); border-radius: 2px; margin-top: 5px;">
                        <div id="kp-progress-fill" style="height: 100%; background-color: white; border-radius: 2px; transition: width 0.5s ease; width: 0%;"></div>
                    </div>
                </div>
            </div>
            
            <div id="kp-breakdown" style="font-size: 11px; line-height: 1.4;">
                <!-- Aufschlüsselung wird hier eingefügt -->
            </div>
        `;

        return kpCounterContainer;
    },

    // KP berechnen
    calculateKPBreakdown: function(config) {
        const breakdown = {
            total: 0,
            byCategory: {},
            byYear: {},
            moduleCount: 0,
            praktikaKP: 0,
            dynamicKP: 0
        };

        // Alle Module analysieren (inkl. dynamische)
        config.daten.forEach((modul) => {
            breakdown.total += modul.kp;
            breakdown.moduleCount++;

            // Markiere dynamische Module
            if (modul.isDynamic) {
                breakdown.dynamicKP += modul.kp;
            }

            const kategorie = modul.kategorie || "Unbekannt";
            if (!breakdown.byCategory[kategorie]) {
                breakdown.byCategory[kategorie] = { kp: 0, count: 0 };
            }
            breakdown.byCategory[kategorie].kp += modul.kp;
            breakdown.byCategory[kategorie].count++;

            const jahr = modul.jahr || "Unbekannt";
            if (!breakdown.byYear[jahr]) {
                breakdown.byYear[jahr] = { kp: 0, count: 0 };
            }
            breakdown.byYear[jahr].kp += modul.kp;
            breakdown.byYear[jahr].count++;
        });

        breakdown.praktikaKP = breakdown.dynamicKP;

        return breakdown;
    },

    // KP-Status updaten
    updateKPStatus: function(breakdown) {
        const statusEl = document.getElementById("kp-status");
        const progressFill = document.getElementById("kp-progress-fill");
        const requiredKP = 180;
        const remaining = Math.max(0, requiredKP - breakdown.total);
        const progress = Math.min(100, (breakdown.total / requiredKP) * 100);

        if (statusEl) {
            if (breakdown.total >= requiredKP) {
                statusEl.innerHTML = `✅ <span style="color: #28a745;">Mindestanforderung erfüllt!</span>`;
            } else {
                statusEl.innerHTML = `⚠️ <span style="color: #ffc107;">Noch ${remaining} KP benötigt</span>`;
            }
        }

        if (progressFill) {
            progressFill.style.width = progress + "%";
        }
    },

    // Vollständige KP-Anzeige aktualisieren
    updateKPDisplay: function(config) {
        const breakdown = this.calculateKPBreakdown(config);

        // Gesamtsumme aktualisieren
        const totalKpEl = document.getElementById("total-kp");
        if (totalKpEl) {
            totalKpEl.textContent = breakdown.total;
        }

        // Status und Progress Bar aktualisieren
        this.updateKPStatus(breakdown);

        // Aufschlüsselung aktualisieren (minimal für Performance)
        const breakdownEl = document.getElementById("kp-breakdown");
        if (breakdownEl) {
            breakdownEl.innerHTML = ""; // Leer lassen für cleane UI
        }
    },

    // Export-Funktion
    exportKPBreakdown: function(config, selectedModules) {
        const breakdown = this.calculateKPBreakdown(config);

        const exportData = {
            studiengang: "BSc ITET - ETH Zürich",
            timestamp: new Date().toISOString(),
            summary: {
                totalKP: breakdown.total,
                moduleCount: breakdown.moduleCount,
                dynamicKP: breakdown.dynamicKP,
                targetKP: 180,
                status: breakdown.total >= 180 ? "Erfüllt" : `${180 - breakdown.total} KP fehlen`
            },
            byCategory: breakdown.byCategory,
            byYear: breakdown.byYear,
            selectedPraktika: selectedModules.praktika,
            selectedKernfaecher: selectedModules.kernfaecher,
            selectedWahlfaecher: selectedModules.wahlfaecher,
            selectedWeitereWahlGrundlagen: selectedModules.weitereWahlGrundlagen,
            version: "2.0"
        };

        const filename = `itet-kp-breakdown-${new Date().toISOString().split("T")[0]}.json`;
        this.downloadJSON(exportData, filename);
        this.showMessage("📁 KP-Aufschlüsselung exportiert!", "success");
    },

    // Utility-Funktionen
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
    }
};

console.log('✅ ITET KP Counter Funktionen geladen');