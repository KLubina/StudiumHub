/* ==== CSE EXTENSIONS (VEREINFACHT) ==== */
/* Minimale CSE-spezifische Funktionalitäten */

/* ==== CSE STUDIENPLAN KLASSE ==== */
window.StudiengangCustomClass = class CSEStudienplan extends StudienplanBase {
    constructor(config) {
        super(config);
    }

    initialize() {
        super.initialize();
        
        // ColorManager wird automatisch vom Base-System initialisiert
        // enableColorManager ist standardmäßig aktiviert
        this.config.enableColorManager = true;
        
        // Grade Calculator hinzufügen
        if (window.CSEGradeCalculator) {
            this.gradeCalculator = new CSEGradeCalculator(this);
            this.addGradeCalculatorButton();
        }
    }

    addGradeCalculatorButton() {
        const legendContainer = document.querySelector(".farben-legende");
        if (!legendContainer || document.getElementById("grade-calculator-btn")) return;

        const calculatorButton = document.createElement("div");
        calculatorButton.id = "grade-calculator-btn";
        calculatorButton.style.marginTop = "15px";
        calculatorButton.style.padding = "10px";
        calculatorButton.style.backgroundColor = "#4CAF50";
        calculatorButton.style.color = "white";
        calculatorButton.style.borderRadius = "5px";
        calculatorButton.style.cursor = "pointer";
        calculatorButton.style.textAlign = "center";
        calculatorButton.style.fontWeight = "bold";
        calculatorButton.innerHTML = "📊 Block-Prüfungen-Rechner";
        
        calculatorButton.addEventListener("click", () => {
            if (this.gradeCalculator) {
                this.gradeCalculator.showGradeCalculator();
            }
        });

        legendContainer.appendChild(calculatorButton);
    }

    // Rückwärtskompatibilität für bestehenden Code
    showGradeCalculator() {
        if (this.gradeCalculator) {
            this.gradeCalculator.showGradeCalculator();
        }
    }
};