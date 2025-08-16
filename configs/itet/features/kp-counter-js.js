// kp-counter.js - KP-Zählsystem

window.ITETKPCounter = class ITETKPCounter {
  constructor(parent) {
    this.parent = parent;
    this.showDetailedBreakdown = false;
  }

  addKPCounter() {
    const legendContainer = document.querySelector(".farben-legende");
    const kpCounterContainer = document.createElement("div");
    kpCounterContainer.id = "kp-counter";
    kpCounterContainer.style.cssText = `
      margin-bottom: 20px; padding: 15px; background-color: #f8f9fa;
      border-radius: 8px; border: 2px solid #0D5B8C; box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    `;

    kpCounterContainer.innerHTML = `
      <div style="text-align: center; margin-bottom: 15px;">
        <h3 style="margin: 0 0 5px 0; color: #0D5B8C; font-size: 18px;">📊 KP-Übersicht</h3>
        <div style="font-size: 12px; color: #666;">Automatische Zählung aller Module</div>
      </div>
      
      <div id="kp-total" style="text-align: center; margin-bottom: 15px; padding: 10px; background: linear-gradient(135deg, #0D5B8C, #00A0E3); color: white; border-radius: 5px; font-weight: bold;">
        <div style="font-size: 24px; margin-bottom: 5px;">
          <span id="total-kp">0</span> KP
        </div>
        <div style="font-size: 12px; opacity: 0.9;">von mindestens 180 KP erforderlich</div>
        <div id="kp-status" style="margin-top: 5px; font-size: 11px;">
          <div id="kp-progress-bar" style="width: 100%; height: 4px; background-color: rgba(255,255,255,0.3); border-radius: 2px; margin-top: 5px;">
            <div id="kp-progress-fill" style="height: 100%; background-color: white; border-radius: 2px; transition: width 0.5s ease; width: 0%;"></div>
          </div>
        </div>
      </div>
      
      <div id="kp-breakdown" style="font-size: 11px; line-height: 1.4;"></div>
      
      <div style="margin-top: 12px; text-align: center;">
        <button id="refresh-kp" style="background: #28a745; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 11px; margin-right: 5px;">
          🔄 Aktualisieren
        </button>
        <button id="export-kp" style="background: #17a2b8; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 11px; margin-right: 5px;">
          📊 Export
        </button>
        <button id="toggle-breakdown" style="background: #6c757d; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 11px;">
          👁️ Details
        </button>
      </div>
    `;

    legendContainer.insertBefore(kpCounterContainer, legendContainer.firstChild);

    // Event Listeners
    document.getElementById("refresh-kp").addEventListener("click", () => {
      this.parent.updateKPDisplay();
      ITETUtilities.showMessage("✅ KP-Zählung aktualisiert!", "success");
    });

    document.getElementById("export-kp").addEventListener("click", () => {
      this.parent.exportKPBreakdown();
    });

    document.getElementById("toggle-breakdown").addEventListener("click", () => {
      this.toggleBreakdownDetails();
    });
  }

  calculateKPBreakdown() {
    const breakdown = {
      total: 0,
      byCategory: {},
      byYear: {},
      moduleCount: 0,
      praktikaKP: 0,
      dynamicKP: 0
    };

    this.parent.config.daten.forEach(modul => {
      breakdown.total += modul.kp;
      breakdown.moduleCount++;

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
  }

  updateKPStatus(breakdown) {
    const statusEl = document.getElementById("kp-status");
    const progressFill = document.getElementById("kp-progress-fill");
    const requiredKP = 180;
    const remaining = Math.max(0, requiredKP - breakdown.total);
    const progress = Math.min(100, (breakdown.total / requiredKP) * 100);

    if (breakdown.total >= requiredKP) {
      statusEl.innerHTML = `✅ <span style="color: #28a745;">Mindestanforderung erfüllt!</span>`;
    } else {
      statusEl.innerHTML = `⚠️ <span style="color: #ffc107;">Noch ${remaining} KP benötigt</span>`;
    }

    if (progressFill) {
      progressFill.style.width = progress + "%";
    }
  }

  updateKPBreakdown(breakdown) {
    const breakdownEl = document.getElementById("kp-breakdown");

    let html = `
      <div style="border-bottom: 1px solid #ddd; padding-bottom: 8px; margin-bottom: 8px;">
        <strong>📋 Zusammenfassung:</strong><br>
        <span style="color: #0D5B8C;">▶ ${breakdown.moduleCount} Module insgesamt</span><br>
        <span style="color: #00A0E3;">▶ ${breakdown.total} KP Gesamtsumme</span>
        ${breakdown.dynamicKP > 0 ? `<br><span style="color: #4CA64C;">▶ ${breakdown.dynamicKP} KP aus gewählten Praktika</span>` : ""}
      </div>
    `;

    if (!this.showDetailedBreakdown) {
      const topCategories = Object.entries(breakdown.byCategory)
        .sort(([, a], [, b]) => b.kp - a.kp)
        .slice(0, 3);

      html += `<div style="margin-bottom: 10px;"><strong>📚 Top Kategorien:</strong>`;

      topCategories.forEach(([kategorie, data]) => {
        const color = ITETUtilities.getCategoryColor(kategorie);
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
    }

    breakdownEl.innerHTML = html;
  }

  toggleBreakdownDetails() {
    this.showDetailedBreakdown = !this.showDetailedBreakdown;
    const btn = document.getElementById("toggle-breakdown");

    if (this.showDetailedBreakdown) {
      btn.textContent = "👁️ Weniger";
      btn.style.backgroundColor = "#28a745";
    } else {
      btn.textContent = "👁️ Details";
      btn.style.backgroundColor = "#6c757d";
    }

    this.parent.updateKPDisplay();
  }
};

console.log("✅ ITET KP Counter geladen");