/* ==== ITET KP-COUNTER SYSTEM ==== */
/* KP-Counter und Tracking System für ITET */

// KP-Counter Methoden zur ITETStudienplan Klasse hinzufügen
Object.assign(window.ITETStudienplan.prototype, {
    
    /**
     * Initialisiert das KP-Counter System
     */
    initializeKPCounter() {
        this.addKPCounter();
        this.updateKPDisplay();
        
        // Auto-Update bei DOM-Änderungen
        this.observeModuleChanges();
        
        console.log('✅ KP-Counter System initialisiert');
    },

    /**
     * Fügt KP-Counter UI zur Legende hinzu
     */
    addKPCounter() {
        const legendContainer = document.querySelector(".farben-legende");
        
        const kpCounterContainer = document.createElement("div");
        kpCounterContainer.id = "kp-counter";
        kpCounterContainer.style.marginBottom = "20px";
        kpCounterContainer.style.padding = "15px";
        kpCounterContainer.style.backgroundColor = "#f8f9fa";
        kpCounterContainer.style.borderRadius = "8px";
        kpCounterContainer.style.border = "2px solid #0D5B8C";
        kpCounterContainer.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
        kpCounterContainer.style.transition = "all 0.3s ease";
        
        kpCounterContainer.innerHTML = `
            <div style="text-align: center; margin-bottom: 15px;">
                <h3 style="margin: 0 0 5px 0; color: #0D5B8C; font-size: 18px;">📊 KP-Übersicht</h3>
                <div style="font-size: 12px; color: #666;">
                    Automatische Zählung aller angezeigten Module
                </div>
            </div>
            
            <div id="kp-total" style="text-align: center; margin-bottom: 15px; padding: 10px; background: linear-gradient(135deg, #0D5B8C, #00A0E3); color: white; border-radius: 5px; font-weight: bold; transition: all 0.3s ease;">
                <div style="font-size: 24px; margin-bottom: 5px;">
                    <span id="total-kp">0</span> KP
                </div>
                <div style="font-size: 12px; opacity: 0.9;">
                    von mindestens 180 KP erforderlich
                </div>
                <div id="kp-status" style="margin-top: 5px; font-size: 11px; transition: all 0.3s ease;">
                    <div id="kp-progress-bar" style="width: 100%; height: 4px; background-color: rgba(255,255,255,0.3); border-radius: 2px; margin-top: 5px;">
                        <div id="kp-progress-fill" style="height: 100%; background-color: white; border-radius: 2px; transition: width 0.5s ease; width: 0%;"></div>
                    </div>
                </div>
            </div>
            
            <div id="kp-breakdown" style="font-size: 11px; line-height: 1.4;">
                <!-- Aufschlüsselung wird hier eingefügt -->
            </div>
            
            <div style="margin-top: 12px; text-align: center;">
                <button id="refresh-kp" style="background: #28a745; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 11px; margin-right: 5px; transition: all 0.2s ease;">
                    🔄 Aktualisieren
                </button>
                <button id="export-kp" style="background: #17a2b8; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 11px; margin-right: 5px; transition: all 0.2s ease;">
                    📊 Export
                </button>
                <button id="toggle-breakdown" style="background: #6c757d; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 11px; transition: all 0.2s ease;">
                    👁️ Details
                </button>
            </div>
        `;

        legendContainer.insertBefore(kpCounterContainer, legendContainer.firstChild);
        
        // Event Listeners hinzufügen
        this.setupKPCounterEvents();
        
        this.kpCounter = kpCounterContainer;
    },

    /**
     * Setup Event Listeners für KP-Counter
     */
    setupKPCounterEvents() {
        document.getElementById('refresh-kp').addEventListener('click', () => {
            this.updateKPDisplay();
            this.showMessage('✅ KP-Zählung aktualisiert!', 'success');
            
            // Visual Feedback
            const btn = document.getElementById('refresh-kp');
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => btn.style.transform = 'scale(1)', 100);
        });
        
        document.getElementById('export-kp').addEventListener('click', () => {
            this.exportKPBreakdown();
        });
        
        document.getElementById('toggle-breakdown').addEventListener('click', () => {
            this.toggleBreakdownDetails();
        });
    },

    /**
     * Aktualisiert die KP-Anzeige
     */
    updateKPDisplay() {
        const breakdown = this.calculateKPBreakdown();
        
        // Gesamtsumme aktualisieren
        const totalKpEl = document.getElementById('total-kp');
        if (totalKpEl) {
            totalKpEl.textContent = breakdown.total;
            
            // Animation für Zahlenänderung
            totalKpEl.style.transform = 'scale(1.1)';
            setTimeout(() => totalKpEl.style.transform = 'scale(1)', 200);
        }
        
        // Status und Progress Bar aktualisieren
        this.updateKPStatus(breakdown);
        
        // Aufschlüsselung aktualisieren
        this.updateKPBreakdown(breakdown);
    },

    /**
     * Aktualisiert KP-Status und Progress Bar
     */
    updateKPStatus(breakdown) {
        const statusEl = document.getElementById('kp-status');
        const progressFill = document.getElementById('kp-progress-fill');
        const requiredKP = 180;
        const remaining = Math.max(0, requiredKP - breakdown.total);
        const progress = Math.min(100, (breakdown.total / requiredKP) * 100);
        
        if (breakdown.total >= requiredKP) {
            statusEl.innerHTML = `✅ <span style="color: #28a745;">Mindestanforderung erfüllt!</span>`;
            statusEl.style.backgroundColor = 'rgba(40, 167, 69, 0.2)';
            
            if (progressFill) {
                progressFill.style.backgroundColor = '#28a745';
            }
        } else {
            statusEl.innerHTML = `⚠️ <span style="color: #ffc107;">Noch ${remaining} KP benötigt</span>`;
            statusEl.style.backgroundColor = 'rgba(255, 193, 7, 0.2)';
            
            if (progressFill) {
                progressFill.style.backgroundColor = remaining <= 30 ? '#ffc107' : '#dc3545';
            }
        }
        
        statusEl.style.padding = '3px 6px';
        statusEl.style.borderRadius = '3px';
        statusEl.style.marginTop = '5px';
        
        // Progress Bar animieren
        if (progressFill) {
            progressFill.style.width = progress + '%';
        }
    },

    /**
     * Berechnet KP-Aufschlüsselung
     */
    calculateKPBreakdown() {
        const breakdown = {
            total: 0,
            byCategory: {},
            byYear: {},
            bySemester: {},
            moduleCount: 0,
            praktikaKP: 0
        };
        
        // Standard Module analysieren
        const moduleElements = document.querySelectorAll('.modul');
        
        moduleElements.forEach(moduleEl => {
            const modulName = this.getModuleName(moduleEl);
            const modul = this.config.daten.find(m => m.name === modulName);
            
            if (modul) {
                breakdown.total += modul.kp;
                breakdown.moduleCount++;
                
                // Nach Kategorie gruppieren
                const kategorie = modul.kategorie || 'Unbekannt';
                if (!breakdown.byCategory[kategorie]) {
                    breakdown.byCategory[kategorie] = { kp: 0, count: 0 };
                }
                breakdown.byCategory[kategorie].kp += modul.kp;
                breakdown.byCategory[kategorie].count++;
                
                // Nach Jahr gruppieren
                const jahr = modul.jahr || 'Unbekannt';
                if (!breakdown.byYear[jahr]) {
                    breakdown.byYear[jahr] = { kp: 0, count: 0 };
                }
                breakdown.byYear[jahr].kp += modul.kp;
                breakdown.byYear[jahr].count++;
                
                // Nach Semester gruppieren
                const semester = modul.semester || 'Unbekannt';
                if (!breakdown.bySemester[semester]) {
                    breakdown.bySemester[semester] = { kp: 0, count: 0 };
                }
                breakdown.bySemester[semester].kp += modul.kp;
                breakdown.bySemester[semester].count++;
            }
        });
        
        // Hinzugefügte Praktika analysieren
        const praktikaModules = Object.values(this.selectedPraktika).flat();
        praktikaModules.forEach(modul => {
            breakdown.total += modul.kp;
            breakdown.moduleCount++;
            breakdown.praktikaKP += modul.kp;
            
            const kategorie = 'Wahl Praktika-Projekte-Seminare';
            if (!breakdown.byCategory[kategorie]) {
                breakdown.byCategory[kategorie] = { kp: 0, count: 0 };
            }
            breakdown.byCategory[kategorie].kp += modul.kp;
            breakdown.byCategory[kategorie].count++;
        });
        
        return breakdown;
    },

    /**
     * Aktualisiert KP-Aufschlüsselung im UI
     */
    updateKPBreakdown(breakdown) {
        const breakdownEl = document.getElementById('kp-breakdown');
        
        let html = `
            <div style="border-bottom: 1px solid #ddd; padding-bottom: 8px; margin-bottom: 8px;">
                <strong>📋 Zusammenfassung:</strong><br>
                <span style="color: #0D5B8C;">▶ ${breakdown.moduleCount} Module insgesamt</span><br>
                <span style="color: #00A0E3;">▶ ${breakdown.total} KP Gesamtsumme</span>
                ${breakdown.praktikaKP > 0 ? `<br><span style="color: #4CA64C;">▶ ${breakdown.praktikaKP} KP aus Praktika</span>` : ''}
            </div>
        `;
        
        // Nur Top-Kategorien anzeigen (togglebar)
        if (!this.showDetailedBreakdown) {
            const topCategories = Object.entries(breakdown.byCategory)
                .sort(([,a], [,b]) => b.kp - a.kp)
                .slice(0, 3);
            
            html += `<div style="margin-bottom: 10px;"><strong>📚 Top Kategorien:</strong>`;
            
            topCategories.forEach(([kategorie, data]) => {
                const color = this.getCategoryColor(kategorie);
                const percentage = ((data.kp / breakdown.total) * 100).toFixed(1);
                
                html += `
                    <div style="margin: 3px 0; padding: 2px 4px; border-left: 3px solid ${color}; background-color: rgba(13, 91, 140, 0.05);">
                        <span style="font-weight: 500;">${kategorie}:</span> 
                        <span style="color: ${color}; font-weight: bold;">${data.kp} KP</span> 
                        <span style="color: #666; font-size: 10px;">(${percentage}%)</span>
                    </div>
                `;
            });
            
            html += `</div>`;
        } else {
            // Detaillierte Aufschlüsselung
            html += this.createDetailedBreakdown(breakdown);
        }
        
        breakdownEl.innerHTML = html;
    },

    /**
     * Erstellt detaillierte Aufschlüsselung
     */
    createDetailedBreakdown(breakdown) {
        let html = `<div style="margin-bottom: 10px;"><strong>📚 Nach Kategorien:</strong>`;
        
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
        
        html += `</div>`;
        
        // Nach Jahren
        html += `<div style="margin-bottom: 10px;"><strong>📅 Nach Jahren:</strong>`;
        
        const sortedYears = Object.entries(breakdown.byYear)
            .sort(([a], [b]) => a - b);
        
        sortedYears.forEach(([jahr, data]) => {
            const percentage = ((data.kp / breakdown.total) * 100).toFixed(1);
            
            html += `
                <div style="margin: 2px 0; padding: 1px 4px; background-color: rgba(0, 160, 227, 0.05);">
                    <span style="font-weight: 500;">${jahr}. Jahr:</span> 
                    <span style="color: #00A0E3; font-weight: bold;">${data.kp} KP</span> 
                    <span style="color: #666; font-size: 10px;">(${data.count} Module, ${percentage}%)</span>
                </div>
            `;
        });
        
        html += `</div>`;
        
        return html;
    },

    /**
     * Toggle zwischen einfacher und detaillierter Ansicht
     */
    toggleBreakdownDetails() {
        this.showDetailedBreakdown = !this.showDetailedBreakdown;
        const btn = document.getElementById('toggle-breakdown');
        
        if (this.showDetailedBreakdown) {
            btn.textContent = '👁️ Weniger';
            btn.style.backgroundColor = '#28a745';
        } else {
            btn.textContent = '👁️ Details';
            btn.style.backgroundColor = '#6c757d';
        }
        
        this.updateKPDisplay();
    },

    /**
     * Beobachtet Änderungen an Modulen für Auto-Update
     */
    observeModuleChanges() {
        const observer = new MutationObserver((mutations) => {
            let shouldUpdate = false;
            
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    // Prüfe ob Module hinzugefügt/entfernt wurden
                    mutation.addedNodes.forEach((node) => {
                        if (node.classList && node.classList.contains('modul')) {
                            shouldUpdate = true;
                        }
                    });
                    
                    mutation.removedNodes.forEach((node) => {
                        if (node.classList && node.classList.contains('modul')) {
                            shouldUpdate = true;
                        }
                    });
                }
            });
            
            if (shouldUpdate) {
                // Debounce: Update nach kurzer Verzögerung
                clearTimeout(this.updateTimeout);
                this.updateTimeout = setTimeout(() => {
                    this.updateKPDisplay();
                }, 300);
            }
        });
        
        // Beobachte Studienplan-Container
        const studienplanContainer = document.getElementById('studienplan');
        if (studienplanContainer) {
            observer.observe(studienplanContainer, {
                childList: true,
                subtree: true
            });
        }
    },

    /**
     * Gibt Farbe für Kategorie zurück
     */
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
});

console.log('✅ KP-Counter System geladen');