/* ==== CSE TOOLTIP MANAGER ==== */
/* Verwaltet die Tooltips für Vertiefungsgebiete und Wahlfächer */

class CSETooltipManager {
  constructor(studienplan) {
    this.studienplan = studienplan;
    this.isVertiefungsgebieteTooltipLocked = false;
    this.isWahlfaecherTooltipLocked = false;
  }

  addLegendTooltipEvents(div, kategorie) {
    if (kategorie.klasse === "vertiefung") {
      div.addEventListener("mouseenter", (event) => {
        this.showVertiefungsgebieteTooltip(event);
      });

      div.addEventListener("mouseleave", () => {
        if (!this.isVertiefungsgebieteTooltipLocked) {
          this.studienplan.hideTooltip();
        }
      });

      div.addEventListener("click", (event) => {
        this.isVertiefungsgebieteTooltipLocked =
          !this.isVertiefungsgebieteTooltipLocked;
        if (this.isVertiefungsgebieteTooltipLocked) {
          this.showVertiefungsgebieteTooltip(event);
        } else {
          this.studienplan.hideTooltip();
        }
      });
    }

    if (kategorie.klasse === "wahl") {
      div.addEventListener("mouseenter", (event) => {
        this.showWahlfaecherTooltip(event);
      });

      div.addEventListener("mouseleave", () => {
        if (!this.isWahlfaecherTooltipLocked) {
          this.studienplan.hideTooltip();
        }
      });

      div.addEventListener("click", (event) => {
        this.isWahlfaecherTooltipLocked = !this.isWahlfaecherTooltipLocked;
        if (this.isWahlfaecherTooltipLocked) {
          this.showWahlfaecherTooltip(event);
        } else {
          this.studienplan.hideTooltip();
        }
      });
    }
  }

  showVertiefungsgebieteTooltip(event) {
    // Lade Daten aus der separaten Datei
    const content = window.generateVertiefungsgebieteHTML 
      ? window.generateVertiefungsgebieteHTML()
      : this.getFallbackVertiefungsgebieteHTML();
    
    this.studienplan.showCustomTooltip(content, event);
  }

  getFallbackVertiefungsgebieteHTML() {
    // Fallback falls die Datei nicht geladen wurde
    return `
        <div class="vertiefungsgebiete-liste">
            <h3>Vertiefungsgebiete</h3>
            <p>Daten werden geladen...</p>
        </div>
    `;
  }

  showWahlfaecherTooltip(event) {
    // Lade Daten aus der separaten Datei
    const content = window.generateWahlfaecherHTML 
      ? window.generateWahlfaecherHTML()
      : this.getFallbackWahlfaecherHTML();
    
    this.studienplan.showCustomTooltip(content, event);
  }

  getFallbackWahlfaecherHTML() {
    // Fallback falls die Datei nicht geladen wurde
    return `
        <div class="wahlfaecher-liste">
            <h3>Wahlfächer</h3>
            <p>Daten werden geladen...</p>
        </div>
    `;
  }
}

// Export für modularen Import
window.CSETooltipManager = CSETooltipManager;
