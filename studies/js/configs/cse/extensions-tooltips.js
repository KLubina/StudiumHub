/* ==== CSE TOOLTIPS MANAGER ==== */
/* CSE-spezifische Tooltip-Funktionalitäten für das zentrale System */

// Verhindere Redeclaration-Fehler
if (typeof window.CSETooltipManager === 'undefined') {

class CSETooltipManager {
  constructor(studienplan) {
    this.studienplan = studienplan;
  }

  addLegendTooltipEvents(div, kategorie) {
    // CSE-spezifische Tooltip-Events für bestimmte Kategorien
    if (kategorie.name === "Vertiefungsgebiet") {
      this.addVertiefungsgebieteTooltip(div, kategorie);
    } else if (kategorie.name === "Wahlfächer") {
      this.addWahlfaecherTooltip(div, kategorie);
    }
  }

  addVertiefungsgebieteTooltip(div, kategorie) {
    div.classList.add("tooltip-enabled");
    div.style.cursor = "pointer";
    div.title = "Klicken um Vertiefungsgebiete zu sehen";

    const showTooltip = (e) => {
      if (!e.clientX || !e.clientY) {
        const rect = div.getBoundingClientRect();
        e.clientX = rect.left + rect.width / 2;
        e.clientY = rect.top + rect.height / 2;
      }
      this.showVertiefungsgebieteTooltip(e);
    };

    div.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      showTooltip(e);
    });

    div.tabIndex = 0;
    div.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        showTooltip(e);
      }
    });
  }

  addWahlfaecherTooltip(div, kategorie) {
    div.classList.add("tooltip-enabled");
    div.style.cursor = "pointer";
    div.title = "Klicken um Wahlfächer zu sehen";

    const showTooltip = (e) => {
      if (!e.clientX || !e.clientY) {
        const rect = div.getBoundingClientRect();
        e.clientX = rect.left + rect.width / 2;
        e.clientY = rect.top + rect.height / 2;
      }
      this.showWahlfaecherTooltip(e);
    };

    div.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      showTooltip(e);
    });

    div.tabIndex = 0;
    div.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        showTooltip(e);
      }
    });
  }

  showVertiefungsgebieteTooltip(event) {
    const content = this.createVertiefungsgebieteContent();
    this.studienplan.showCustomTooltip(content, event);
  }

  showWahlfaecherTooltip(event) {
    const content = this.createWahlfaecherContent();
    this.studienplan.showCustomTooltip(content, event);
  }

  createVertiefungsgebieteContent() {
    const vertiefungsgebiete = this.getVertiefungsgebieteKategorien();
    
    let content = `
      <div class="vertiefungsgebiete-info">
        <h3>🎯 Vertiefungsgebiete</h3>
        <p style="font-size: 11px; color: #666; margin-bottom: 15px;">
          <strong>Wähle 2 Module aus einem Vertiefungsgebiet:</strong>
        </p>
        <div style="max-height: 350px; overflow-y: auto;">
    `;

    vertiefungsgebiete.forEach(kategorie => {
      const kurse = this.getVertiefungsgebieteByKategorie(kategorie);
      const totalKP = kurse.reduce((sum, kurs) => sum + kurs.kp, 0);
      
      content += `
        <div style="margin-bottom: 15px; padding: 10px; border: 1px solid #ddd; border-radius: 5px; background: #f8f9fa;">
          <h4 style="margin: 0 0 8px 0; color: #1F77B4; font-size: 13px;">
            ${kategorie} (${kurse.length} Module, ${totalKP} KP verfügbar)
          </h4>
          <div style="font-size: 10px; line-height: 1.3;">
      `;
      
      kurse.forEach(kurs => {
        content += `
          <div style="margin: 2px 0; padding: 2px 5px; background: white; border-radius: 3px;">
            <strong>${kurs.kp} KP:</strong> ${kurs.name}
          </div>
        `;
      });
      
      content += `</div></div>`;
    });

    content += `
        </div>
        <div style="margin-top: 15px; padding: 10px; background-color: #e7f3ff; border-radius: 5px; border: 1px solid #b3d7ff;">
          <strong>💡 Beispiel:</strong> Robotik mit "Computer Vision" (8 KP) + "Autonomous Mobile Robots" (5 KP) = 13 KP
        </div>
      </div>
    `;
    
    return content;
  }

  createWahlfaecherContent() {
    const wahlfaecherBySemester = this.getWahlfaecherBySemester();
    
    let content = `
      <div class="wahlfaecher-info">
        <h3>📚 Wahlfächer</h3>
        <p style="font-size: 11px; color: #666; margin-bottom: 15px;">
          <strong>Mindestens 2 Module frei wählbar</strong><br>
          Verfügbarkeit nach Semester:
        </p>
        <div style="max-height: 350px; overflow-y: auto;">
    `;

    Object.entries(wahlfaecherBySemester).forEach(([semester, kurse]) => {
      const totalKP = kurse.reduce((sum, kurs) => sum + kurs.kp, 0);
      
      content += `
        <div style="margin-bottom: 15px;">
          <h4 style="margin: 5px 0; padding: 5px; background: #f0f0f0; border-radius: 4px; font-size: 12px; color: #333;">
            ${semester} (${kurse.length} Module)
          </h4>
          <div style="display: grid; grid-template-columns: 1fr; gap: 2px; font-size: 9px;">
      `;
      
      // Gruppiere nach Themenbereich
      const byThema = {};
      kurse.forEach(kurs => {
        const thema = kurs.themenbereich || 'sonstiges';
        if (!byThema[thema]) byThema[thema] = [];
        byThema[thema].push(kurs);
      });
      
      Object.entries(byThema).forEach(([thema, themaKurse]) => {
        const themaColor = this.getThemaColor(thema);
        
        content += `
          <div style="margin: 3px 0;">
            <div style="font-weight: bold; color: ${themaColor}; font-size: 8px; margin-bottom: 2px;">
              ${this.getThemaDisplayName(thema)} (${themaKurse.length})
            </div>
        `;
        
        themaKurse.slice(0, 5).forEach(kurs => { // Zeige max 5 pro Thema
          content += `
            <div style="margin: 1px 0 1px 10px; padding: 1px 3px; background: white; border-radius: 2px; border-left: 3px solid ${themaColor};">
              ${kurs.kp}KP: ${kurs.name.length > 40 ? kurs.name.substring(0, 40) + '...' : kurs.name}
            </div>
          `;
        });
        
        if (themaKurse.length > 5) {
          content += `<div style="margin-left: 10px; font-style: italic; color: #666;">... und ${themaKurse.length - 5} weitere</div>`;
        }
        
        content += `</div>`;
      });
      
      content += `</div></div>`;
    });

    content += `
        </div>
        <div style="margin-top: 15px; padding: 8px; background-color: #fff3cd; border-radius: 5px; border: 1px solid #ffeaa7;">
          <strong>⚠️ Wichtig:</strong> Prüfe die aktuellen Angebote im VVZ, da sich Verfügbarkeiten ändern können.
        </div>
      </div>
    `;
    
    return content;
  }

  // Helper functions für Vertiefungsgebiete
  getVertiefungsgebieteKategorien() {
    if (window.getVertiefungsgebieteKategorien) {
      return window.getVertiefungsgebieteKategorien();
    }
    return ["Robotik", "Astrophysik", "Fluiddynamik", "Chemie", "Physik"]; // Fallback
  }

  getVertiefungsgebieteByKategorie(kategorie) {
    if (window.getVertiefungsgebieteByKategorie) {
      return window.getVertiefungsgebieteByKategorie(kategorie);
    }
    return []; // Fallback
  }

  // Helper functions für Wahlfächer  
  getWahlfaecherBySemester() {
    const grouped = {};
    
    if (window.getWahlfaecherBySemester) {
      const fs2025 = window.getWahlfaecherBySemester("Frühlingssemester 2025") || [];
      const hs2024 = window.getWahlfaecherBySemester("Herbstsemester 2024") || [];
      
      if (fs2025.length > 0) grouped["Frühlingssemester 2025"] = fs2025;
      if (hs2024.length > 0) grouped["Herbstsemester 2024"] = hs2024;
    }
    
    return grouped;
  }

  getThemaColor(thema) {
    const colors = {
      'informatik': '#2600ff',
      'mathematik': '#00a99d', 
      'physik': '#2196F3',
      'chemie': '#9C27B0',
      'engineering': '#FF9800',
      'medizin': '#E91E63',
      'biologie': '#4CAF50',
      'sonstiges': '#795548'
    };
    return colors[thema] || '#6c757d';
  }

  getThemaDisplayName(thema) {
    const names = {
      'informatik': 'Informatik',
      'mathematik': 'Mathematik',
      'physik': 'Physik', 
      'chemie': 'Chemie',
      'engineering': 'Engineering',
      'medizin': 'Medizin',
      'biologie': 'Biologie',
      'sonstiges': 'Sonstiges'
    };
    return names[thema] || thema;
  }
}

// Export für modularen Import
window.CSETooltipManager = CSETooltipManager;

} // Ende der if-Klausel für Redeclaration-Schutz