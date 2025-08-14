/* ==== ITET EXTENSIONS ==== */
/* Spezielle Funktionalitäten und erweiterte Klasse für den ITET Studiengang */

/* ==== ITET-SPEZIFISCHE ERWEITERUNGEN ==== */
// Erweiterte Klasse für ITET-spezifische Features
window.StudiengangCustomClass = class ITETStudienplan extends StudienplanBase {
    constructor(config) {
        super(config);
        this.kpCounter = null;
    }

    initialize() {
        super.initialize();
        this.addKPCounter();
        this.updateKPDisplay();
    }

    addKPCounter() {
        // KP-Counter Container zur Legende hinzufügen
        const legendContainer = document.querySelector(".farben-legende");
        
        // Counter vor der Legende einfügen
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
                    Automatische Zählung aller angezeigten Module
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
                    <!-- Status wird hier eingefügt -->
                </div>
            </div>
            
            <div id="kp-breakdown" style="font-size: 11px; line-height: 1.4;">
                <!-- Aufschlüsselung wird hier eingefügt -->
            </div>
            
            <div style="margin-top: 12px; text-align: center;">
                <button id="refresh-kp" style="background: #28a745; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 11px;">
                    🔄 Aktualisieren
                </button>
                <button id="export-kp" style="background: #17a2b8; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 11px; margin-left: 5px;">
                    📊 Export
                </button>
            </div>
        `;

        // Container vor der Legende einfügen
        legendContainer.insertBefore(kpCounterContainer, legendContainer.firstChild);
        
        // Event Listeners hinzufügen
        document.getElementById('refresh-kp').addEventListener('click', () => {
            this.updateKPDisplay();
            this.showKPMessage('✅ KP-Zählung aktualisiert!', 'success');
        });
        
        document.getElementById('export-kp').addEventListener('click', () => {
            this.exportKPBreakdown();
        });
        
        this.kpCounter = kpCounterContainer;
    }

    updateKPDisplay() {
        const breakdown = this.calculateKPBreakdown();
        
        // Gesamtsumme aktualisieren
        document.getElementById('total-kp').textContent = breakdown.total;
        
        // Status aktualisieren
        const statusEl = document.getElementById('kp-status');
        const requiredKP = 180;
        const remaining = Math.max(0, requiredKP - breakdown.total);
        
        if (breakdown.total >= requiredKP) {
            statusEl.innerHTML = `✅ <span style="color: #28a745;">Mindestanforderung erfüllt!</span>`;
            statusEl.style.backgroundColor = 'rgba(40, 167, 69, 0.2)';
        } else {
            statusEl.innerHTML = `⚠️ <span style="color: #ffc107;">Noch ${remaining} KP benötigt</span>`;
            statusEl.style.backgroundColor = 'rgba(255, 193, 7, 0.2)';
        }
        statusEl.style.padding = '3px 6px';
        statusEl.style.borderRadius = '3px';
        statusEl.style.marginTop = '5px';
        
        // Aufschlüsselung aktualisieren
        this.updateKPBreakdown(breakdown);
    }

    calculateKPBreakdown() {
        const breakdown = {
            total: 0,
            byCategory: {},
            byYear: {},
            moduleCount: 0
        };
        
        // Alle sichtbaren Module durchgehen
        const moduleElements = document.querySelectorAll('.modul');
        
        moduleElements.forEach(moduleEl => {
            // Modulname extrahieren
            const modulName = this.getModuleName(moduleEl);
            
            // Entsprechendes Modul in den Daten finden
            const modul = this.config.daten.find(m => m.name === modulName);
            
            if (modul) {
                breakdown.total += modul.kp;
                breakdown.moduleCount++;
                
                // Nach Kategorie
                const kategorie = modul.kategorie || 'Unbekannt';
                if (!breakdown.byCategory[kategorie]) {
                    breakdown.byCategory[kategorie] = { kp: 0, count: 0 };
                }
                breakdown.byCategory[kategorie].kp += modul.kp;
                breakdown.byCategory[kategorie].count++;
                
                // Nach Jahr
                const jahr = modul.jahr || 'Unbekannt';
                if (!breakdown.byYear[jahr]) {
                    breakdown.byYear[jahr] = { kp: 0, count: 0 };
                }
                breakdown.byYear[jahr].kp += modul.kp;
                breakdown.byYear[jahr].count++;
            }
        });
        
        return breakdown;
    }

    updateKPBreakdown(breakdown) {
        const breakdownEl = document.getElementById('kp-breakdown');
        
        let html = `
            <div style="border-bottom: 1px solid #ddd; padding-bottom: 8px; margin-bottom: 8px;">
                <strong>📋 Zusammenfassung:</strong><br>
                <span style="color: #0D5B8C;">▶ ${breakdown.moduleCount} Module insgesamt</span><br>
                <span style="color: #00A0E3;">▶ ${breakdown.total} KP Gesamtsumme</span>
            </div>
            
            <div style="margin-bottom: 10px;">
                <strong>📚 Nach Kategorien:</strong>
        `;
        
        // Kategorien sortiert nach KP (absteigend)
        const sortedCategories = Object.entries(breakdown.byCategory)
            .sort(([,a], [,b]) => b.kp - a.kp);
        
        sortedCategories.forEach(([kategorie, data]) => {
            const percentage = ((data.kp / breakdown.total) * 100).toFixed(1);
            const color = this.getCategoryColor(kategorie);
            
            html += `
                <div style="margin: 3px 0; padding: 2px 4px; border-left: 3px solid ${color}; background-color: rgba(13, 91, 140, 0.05);">
                    <span style="font-weight: 500;">${kategorie}:</span> 
                    <span style="color: ${color}; font-weight: bold;">${data.kp} KP</span> 
                    <span style="color: #666; font-size: 10px;">(${data.count} Module, ${percentage}%)</span>
                </div>
            `;
        });
        
        html += `
            </div>
            
            <div>
                <strong>📅 Nach Studienjahren:</strong>
        `;
        
        // Jahre sortiert
        const sortedYears = Object.entries(breakdown.byYear)
            .sort(([a], [b]) => {
                if (a === 'Unbekannt') return 1;
                if (b === 'Unbekannt') return -1;
                return parseInt(a) - parseInt(b);
            });
        
        sortedYears.forEach(([jahr, data]) => {
            const percentage = ((data.kp / breakdown.total) * 100).toFixed(1);
            
            html += `
                <div style="margin: 3px 0; padding: 2px 4px; border-left: 3px solid #00A0E3; background-color: rgba(0, 160, 227, 0.05);">
                    <span style="font-weight: 500;">${jahr}. Jahr:</span> 
                    <span style="color: #00A0E3; font-weight: bold;">${data.kp} KP</span> 
                    <span style="color: #666; font-size: 10px;">(${data.count} Module, ${percentage}%)</span>
                </div>
            `;
        });
        
        html += `</div>`;
        
        breakdownEl.innerHTML = html;
    }

    getCategoryColor(kategorie) {
        const colorMap = {
            'Obligatorische Fächer': '#0D5B8C',
            'Obligatorische Praktikum': '#00A0E3',
            'Wahl Praktika-Projekte-Seminare': '#4CA64C',
            'Kernfächer nach Schwerpunkt': '#DD98DD',
            'Wahlfächer': '#F2B48F',
            'Wissenschaftliche Arbeit': '#888888',
            'Weitere Wahl-Grundlagenfächer': '#FFD700'
        };
        
        return colorMap[kategorie] || '#666666';
    }

    getModuleName(moduleEl) {
        const nameEl = moduleEl.querySelector('.modul-titel');
        return nameEl ? nameEl.textContent.trim() : '';
    }

    exportKPBreakdown() {
        const breakdown = this.calculateKPBreakdown();
        
        const exportData = {
            studiengang: 'BSc ITET - ETH Zürich',
            timestamp: new Date().toISOString(),
            summary: {
                totalKP: breakdown.total,
                moduleCount: breakdown.moduleCount,
                targetKP: 180,
                status: breakdown.total >= 180 ? 'Erfüllt' : `${180 - breakdown.total} KP fehlen`
            },
            byCategory: breakdown.byCategory,
            byYear: breakdown.byYear,
            modules: []
        };
        
        // Alle Module für Export sammeln
        this.config.daten.forEach(modul => {
            const moduleEl = Array.from(document.querySelectorAll('.modul')).find(el => 
                this.getModuleName(el) === modul.name
            );
            
            if (moduleEl) {
                exportData.modules.push({
                    name: modul.name,
                    kp: modul.kp,
                    kategorie: modul.kategorie,
                    jahr: modul.jahr,
                    semester: modul.semester
                });
            }
        });
        
        // Als JSON-Datei downloaden
        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `itet-kp-breakdown-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        this.showKPMessage('📁 KP-Aufschlüsselung als JSON exportiert!', 'success');
    }

    showKPMessage(message, type = 'info') {
        // Einfache Toast-Nachricht
        const toast = document.createElement('div');
        toast.style.position = 'fixed';
        toast.style.top = '20px';
        toast.style.right = '20px';
        toast.style.padding = '10px 15px';
        toast.style.borderRadius = '5px';
        toast.style.zIndex = '9999';
        toast.style.fontSize = '12px';
        toast.style.fontWeight = 'bold';
        toast.textContent = message;

        const colors = {
            success: { bg: '#28a745', color: 'white' },
            warning: { bg: '#ffc107', color: 'black' },
            info: { bg: '#17a2b8', color: 'white' },
            error: { bg: '#dc3545', color: 'white' }
        };

        const style = colors[type] || colors.info;
        toast.style.backgroundColor = style.bg;
        toast.style.color = style.color;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    // Override createModule um automatisches Update zu triggern
    createModule(modul, container) {
        const moduleDiv = super.createModule(modul, container);
        
        // Nach Modul-Erstellung KP-Display aktualisieren
        setTimeout(() => {
            if (this.kpCounter) {
                this.updateKPDisplay();
            }
        }, 50);
        
        return moduleDiv;
    }
};