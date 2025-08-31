/* ==== CSE UI CONTROLS MANAGER ==== */
/* Verwaltet die UI-Steuerelemente für CSE */

class CSEUIControlsManager {
  constructor(studienplan, colorManager, gradeCalculator) {
    this.studienplan = studienplan;
    this.colorManager = colorManager;
    this.gradeCalculator = gradeCalculator;
  }

  addColoringModeControls() {
    // Radio Buttons für Färbung-Modus hinzufügen
    const legendContainer = document.querySelector(".farben-legende");

    const coloringControls = document.createElement("div");
    coloringControls.style.marginBottom = "20px";
    coloringControls.style.padding = "10px";
    coloringControls.style.backgroundColor = "#f0f0f0";
    coloringControls.style.borderRadius = "5px";
    coloringControls.innerHTML = `
        <div style="font-weight: bold; margin-bottom: 8px;">Färbung nach:</div>
        <div>
            <label style="display: block; margin-bottom: 5px;">
                <input type="radio" name="coloring-mode" value="pruefungsblock" checked> 
                Prüfungsblöcken
            </label>
            <label style="display: block;">
                <input type="radio" name="coloring-mode" value="themenbereich"> 
                Themenbereichen
            </label>
        </div>
    `;

    // Block-Prüfungen-Rechner Button hinzufügen
    const calculatorButton = document.createElement("div");
    calculatorButton.style.marginTop = "15px";
    calculatorButton.style.padding = "10px";
    calculatorButton.style.backgroundColor = "#4CAF50";
    calculatorButton.style.color = "white";
    calculatorButton.style.borderRadius = "5px";
    calculatorButton.style.cursor = "pointer";
    calculatorButton.style.textAlign = "center";
    calculatorButton.style.fontWeight = "bold";
    calculatorButton.innerHTML = "📊 Block-Prüfungen-Rechner";
    calculatorButton.addEventListener("click", () => this.gradeCalculator.showGradeCalculator());
    coloringControls.appendChild(calculatorButton);

    // Controls vor der Legende einfügen
    legendContainer.insertBefore(coloringControls, legendContainer.firstChild);

    // Event Listener für Radio Buttons
    const radioButtons = coloringControls.querySelectorAll(
      'input[name="coloring-mode"]'
    );
    radioButtons.forEach((radio) => {
      radio.addEventListener("change", (e) => {
        this.colorManager.setColoringMode(e.target.value);
      });
    });
  }
}

// Export für modularen Import
window.CSEUIControlsManager = CSEUIControlsManager;
