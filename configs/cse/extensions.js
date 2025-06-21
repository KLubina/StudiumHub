/* ==== CSE EXTENSIONS ==== */
/* Spezielle Funktionalitäten und erweiterte Klasse für den CSE Studiengang */

/* ==== CSE-SPEZIFISCHE ERWEITERUNGEN ==== */
// Erweiterte Klasse für CSE-spezifische Features
window.StudiengangCustomClass = class CSEStudienplan extends StudienplanBase {
  constructor(config) {
    super(config);
    this.isVertiefungsgebieteTooltipLocked = false;
    this.isWahlfaecherTooltipLocked = false;
    this.coloringMode = "pruefungsblock"; // 'pruefungsblock' oder 'themenbereich'
  }

  initialize() {
    super.initialize();
    this.addColoringModeControls();
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

    // Controls vor der Legende einfügen
    legendContainer.insertBefore(coloringControls, legendContainer.firstChild);

    // Event Listener für Radio Buttons
    const radioButtons = coloringControls.querySelectorAll(
      'input[name="coloring-mode"]'
    );
    radioButtons.forEach((radio) => {
      radio.addEventListener("change", (e) => {
        this.coloringMode = e.target.value;
        this.updateModuleColors();
        this.updateLegend();
      });
    });
  }

  updateModuleColors() {
    console.log("=== UPDATE MODULE COLORS ===");
    console.log("Coloring Mode:", this.coloringMode);
    
    // Alle Module neu färben basierend auf dem gewählten Modus
    const moduleElements = document.querySelectorAll(".modul");
    console.log("Gefundene Module Elemente:", moduleElements.length);
    
    moduleElements.forEach((modulEl, index) => {
      // Verschiedene Methoden zum Extrahieren des Modulnamens
      let modulName = "";
      
      // Methode 1: Suche nach .modul-name
      const modulNameElement = modulEl.querySelector('.modul-name');
      if (modulNameElement) {
        modulName = modulNameElement.textContent.trim();
      } else {
        // Methode 2: Verwende den gesamten Text des Elements
        modulName = modulEl.textContent.trim();
        // Entferne KP-Angaben (z.B. "4 KP" am Anfang)
        modulName = modulName.replace(/^\d+\s*KP\s*/i, '').trim();
      }
      
      console.log(`Element ${index}: "${modulName}"`);
      
      // Entsprechendes Modul in den Daten finden
      const modul = this.config.daten.find(m => m.name === modulName);
      
      if (!modul) {
        console.warn(`Modul nicht gefunden: "${modulName}"`);
        console.log("Verfügbare Module:", this.config.daten.map(m => m.name));
        return;
      }

      console.log(`Gefundenes Modul:`, modul);

      // Alte CSS-Klassen entfernen
      this.removeColorClasses(modulEl);

      // Neue CSS-Klasse hinzufügen
      const cssClass = this.getModuleCssClass(modul);
      if (cssClass) {
        modulEl.classList.add(cssClass);
        console.log(`✓ Angewendete Klasse für "${modulName}": ${cssClass}`);
        
        // Versuche auch, Inline-Styles zu setzen zur Sicherheit
        if (this.coloringMode === "themenbereich") {
          const colorMap = {
            'physik': '#2196F3',
            'informatik': '#2600ff', 
            'mathematik': '#00a99d',
            'chemie': '#9C27B0',
            'sonstiges': '#795548'
          };
          
          if (colorMap[cssClass]) {
            modulEl.style.backgroundColor = colorMap[cssClass];
            modulEl.style.color = 'white';
            console.log(`✓ Inline style gesetzt: ${colorMap[cssClass]}`);
          }
        }
      } else {
        console.warn(`Keine CSS-Klasse für Modul: "${modulName}", Themenbereich: ${modul.themenbereich}, Kategorie: ${modul.kategorie}`);
      }
    });
    
    console.log("=== ENDE UPDATE MODULE COLORS ===");
  }

  removeColorClasses(element) {
    // Alle Farbklassen entfernen
    const colorClasses = [
      "basis1",
      "basis2", 
      "block-g1",
      "block-g2",
      "block-g3",
      "block-g4",
      "physik",
      "informatik",
      "mathematik",
      "chemie",
      "sonstiges",
      "wissenschaftliche-arbeit",
      "kern",
      "wahl",
      "vertiefung",
    ];

    colorClasses.forEach((cls) => element.classList.remove(cls));
  }

  getModuleCssClass(modul) {
    console.log(`getModuleCssClass für "${modul.name}"`);
    console.log(`- Coloring Mode: ${this.coloringMode}`);
    console.log(`- Themenbereich: ${modul.themenbereich}`);
    console.log(`- Kategorie: ${modul.kategorie}`);
    console.log(`- Prüfungsblock: ${modul.pruefungsblock}`);
    
    if (this.coloringMode === "themenbereich") {
      // Zuerst themenbereich prüfen, dann kategorie als Fallback
      let result = modul.themenbereich || modul.kategorie;
      
      // Spezielle Zuordnungen für Kategorien zu Themenbereichen
      if (!result || result === "wissenschaftliche-arbeit") {
        result = "sonstiges";
      }
      
      console.log(`- Ergebnis: ${result}`);
      return result;
    } else {
      // Standard Prüfungsblock-Logik
      if (modul.pruefungsblock && this.config.pruefungsbloecke) {
        const block = this.config.pruefungsbloecke.find(
          (b) => b.name === modul.pruefungsblock
        );
        const result = block ? block.cssClass : null;
        console.log(`- Prüfungsblock Ergebnis: ${result}`);
        return result;
      }

      if (modul.kategorie && this.config.kategorieZuKlasse) {
        const result = this.config.kategorieZuKlasse[modul.kategorie];
        console.log(`- Kategorie Ergebnis: ${result}`);
        return result;
      }

      console.log(`- Fallback Ergebnis: ${modul.kategorie}`);
      return modul.kategorie;
    }
  }

  updateLegend() {
    const legendElement = document.getElementById("legende");
    legendElement.innerHTML = "";

    if (this.coloringMode === "themenbereich") {
      this.createThemenbereichLegend(legendElement);
    } else {
      // Standard Prüfungsblock-Legende
      this.createPruefungsbloeckeLegend(legendElement);

      // Standard Kategorien
      if (this.config.kategorien) {
        this.config.kategorien.forEach((kategorie) => {
          this.createLegendItem(kategorie, legendElement);
        });
      }
    }
  }

  createThemenbereichLegend(container) {
    const themenbereiche = [
      { name: "Physik", klasse: "physik" },
      { name: "Informatik", klasse: "informatik" },
      { name: "Mathematik", klasse: "mathematik" },
      { name: "Chemie", klasse: "chemie" },
      { name: "Sonstiges", klasse: "sonstiges" },
    ];

    themenbereiche.forEach((thema) => {
      const div = document.createElement("div");
      div.classList.add("legende-item");
      div.classList.add(thema.klasse);
      div.textContent = thema.name;
      container.appendChild(div);
    });
  }

  addLegendTooltipEvents(div, kategorie) {
    if (kategorie.klasse === "vertiefung") {
      div.addEventListener("mouseenter", (event) => {
        this.showVertiefungsgebieteTooltip(event);
      });

      div.addEventListener("mouseleave", () => {
        if (!this.isVertiefungsgebieteTooltipLocked) {
          this.hideTooltip();
        }
      });

      div.addEventListener("click", (event) => {
        this.isVertiefungsgebieteTooltipLocked =
          !this.isVertiefungsgebieteTooltipLocked;
        if (this.isVertiefungsgebieteTooltipLocked) {
          this.showVertiefungsgebieteTooltip(event);
        } else {
          this.hideTooltip();
        }
      });
    }

    if (kategorie.klasse === "wahl") {
      div.addEventListener("mouseenter", (event) => {
        this.showWahlfaecherTooltip(event);
      });

      div.addEventListener("mouseleave", () => {
        if (!this.isWahlfaecherTooltipLocked) {
          this.hideTooltip();
        }
      });

      div.addEventListener("click", (event) => {
        this.isWahlfaecherTooltipLocked = !this.isWahlfaecherTooltipLocked;
        if (this.isWahlfaecherTooltipLocked) {
          this.showWahlfaecherTooltip(event);
        } else {
          this.hideTooltip();
        }
      });
    }
  }

  showVertiefungsgebieteTooltip(event) {
    const content = `
        <div class="vertiefungsgebiete-liste">
            <h3>Vertiefungsgebiete</h3>
            
            <h4>Astrophysik</h4>
            <ul>
                <li>Theoretical Astrophysics – 10 ECTS</li>
                <li>Theoretical Cosmology – 10 ECTS</li>
                <li>Computational Astrophysics – 6 ECTS</li>
            </ul>
            
            <h4>Atmosphärenphysik</h4>
            <ul>
                <li>Atmosphäre – 3 ECTS</li>
                <li>Weather and Climate Models – 4 ECTS</li>
            </ul>
            
            <h4>Chemie</h4>
            <ul>
                <li>Classical Simulation of (Biol)Molecular Systems – 6 ECTS</li>
                <li>Quantenchemie – 6 ECTS</li>
                <li>Molecular and Materials Modelling – 4 ECTS</li>
            </ul>
            
            <h4>Fluiddynamik</h4>
            <ul>
                <li>Fluiddynamik II – 3 ECTS</li>
                <li>Computational Methods for Flow, Heat and Mass Transfer Problems – 4 ECTS</li>
            </ul>
            
            <h4>Systems and Control</h4>
            <ul>
                <li>Control Systems I (Regelsysteme) – 6 ECTS</li>
                <li>Control Systems II – 6 ECTS</li>
                <li>Signal- und Systemtheorie I – 4 ECTS</li>
                <li>Signal- und Systemtheorie II – 4 ECTS</li>
            </ul>
            
            <h4>Robotik</h4>
            <ul>
                <li>Theory of Robotics and Mechatronics – 4 ECTS</li>
                <li>Autonomous Mobile Robots – 5 ECTS</li>
                <li>Introduction to Machine Learning – 8 ECTS</li>
                <li>Probabilistic Artificial Intelligence – 8 ECTS</li>
                <li>Deep Learning – 8 ECTS</li>
                <li>Computer Vision – 8 ECTS</li>
                <li>Image Analysis and Computer Vision – 6 ECTS</li>
                <li>Dynamic Programming and Optimal Control – 4 ECTS</li>
                <li>Recursive Estimation – 4 ECTS</li>
                <li>Robot Dynamics – 4 ECTS</li>
                <li>Advanced Machine Learning – 10 ECTS</li>
                <li>3D Vision – 4 ECTS</li>
                <li>Seminar in Robotics for CSE – 4 ECTS</li>
            </ul>
            
            <h4>Physik</h4>
            <ul>
                <li>Introduction to Computational Physics – 8 ECTS</li>
                <li>Computational Statistical Physics – 8 ECTS</li>
                <li>Computational Quantum Physics – 8 ECTS</li>
                <li>Molecular and Materials Modelling – 4 ECTS</li>
            </ul>
            
            <h4>Computational Finance</h4>
            <ul>
                <li>Mathematical Foundations for Finance – 4 ECTS</li>
                <li>Computational Methods for Quantitative Finance – Monte Carlo and Sampling Methods – 6 ECTS</li>
            </ul>
            
            <h4>Electromagnetics</h4>
            <ul>
                <li>Physical Modelling and Simulation – 6 ECTS</li>
                <li>Optimization Methods for Engineers – 3 ECTS</li>
            </ul>
            
            <h4>Geophysik</h4>
            <ul>
                <li>Continuum Mechanics – 3 ECTS</li>
                <li>Numerical Modelling I and II – 6 ECTS</li>
                <li>Dynamics of the Mantle and Lithosphere – 3 ECTS</li>
                <li>Numerical Modelling for Applied Geophysics – 4 ECTS</li>
                <li>Tomographic Imaging – 3 ECTS</li>
                <li>Seismology of the Spherical Earth – 3 ECTS</li>
                <li>Inverse Theory I+II – 6 ECTS</li>
                <li>Numerical Modelling in Fortran – 3 ECTS</li>
            </ul>
            
            <h4>Biologie</h4>
            <ul>
                <li>Computational Systems Biology – 6 ECTS</li>
                <li>Statistical Models in Computational Biology – 6 ECTS</li>
                <li>Spatio-Temporal Modelling in Biology – 4 ECTS</li>
                <li>Introduction to Neuroinformatics – 6 ECTS</li>
            </ul>
        </div>
    `;
    this.showCustomTooltip(content, event);
  }

  showWahlfaecherTooltip(event) {
    const content = `
        <div class="wahlfaecher-liste">
            <h3>Wahlfächer</h3>
            
            <h4>Frühlingssemester 2025</h4>
            <ul>
                <li>Product Development and Engineering Design – 4 ECTS</li>
                <li>Optimization and Machine Learning – 4 ECTS</li>
                <li>Visualization, Simulation and Interaction - Virtual Reality I – 4 ECTS</li>
                <li>Informationstechnologien im digitalen Produkt – 4 ECTS</li>
                <li>Biofluiddynamics – 4 ECTS</li>
                <li>Introduction to Finite Element Analysis – 4 ECTS</li>
                <li>Nonlinear FEA – 4 ECTS</li>
                <li>Elektromagnetische Felder und Wellen – 4 ECTS</li>
                <li>Algebra and Error Correcting Codes – 6 ECTS</li>
                <li>Information Theory II – 6 ECTS</li>
                <li>Communication and Detection Theory – 6 ECTS</li>
                <li>Communication Networks – 6 ECTS</li>
                <li>Principles of Distributed Computing – 7 ECTS</li>
                <li>Information Security – 8 ECTS</li>
                <li>Applied Cryptography – 8 ECTS</li>
                <li>Game Programming Laboratory – 10 ECTS</li>
                <li>Shape Modeling and Geometry Processing – 8 ECTS</li>
                <li>Big Data for Engineers – 6 ECTS</li>
                <li>Mobile Health and Activity Monitoring – 6 ECTS</li>
                <li>Machine Learning for Health Care – 5 ECTS</li>
                <li>Chemometrics and Machine Learning for Chemical Engineers – 4 ECTS</li>
                <li>Neuromorphic Engineering II – 6 ECTS</li>
                <li>Computational Vision (UZH) – 6 ECTS</li>
                <li>Computational Models of Motion – 8 ECTS</li>
                <li>Statistical Methods in Experimental Physics – 10 ECTS</li>
                <li>Computational Systems Biology: Stochastic Approaches – 4 ECTS</li>
                <li>Klimasysteme – 3 ECTS</li>
                <li>Mathematical Optimization Lab – 5 ECTS</li>
                <li>Network & Integer Optimization – 5 ECTS</li>
                <li>Convex Optimization – 5 ECTS</li>
                <li>High-Dimensional Statistics – 4 ECTS</li>
                <li>Physikalische Chemie III: Molekulare Quantenmechanik – 4 ECTS</li>
                <li>Soccer Analytics – 3 ECTS</li>
            </ul>
            
            <h4>Herbstsemester 2024</h4>
            <ul>
                <li>Visualization, Simulation and Interaction - Virtual Reality II – 4 ECTS</li>
                <li>Applied Finite Element Analysis – 4 ECTS</li>
                <li>Nonlinear FEA – 4 ECTS</li>
                <li>Design of Parallel and High-Performance Computing – 9 ECTS</li>
                <li>Discrete Event Systems – 6 ECTS</li>
                <li>VLSI 1: HDL Based Design for FPGAs – 6 ECTS</li>
                <li>VLSI 3: Full-Custom Digital Circuit Design – 6 ECTS</li>
                <li>Information Theory I – 6 ECTS</li>
                <li>Computational Psychiatry – 3 ECTS</li>
                <li>Algorithms, Probability, and Computing – 8 ECTS</li>
                <li>Visual Computing – 8 ECTS</li>
                <li>Computer Graphics – 8 ECTS</li>
                <li>Physically-Based Simulation in Computer Graphics – 5 ECTS</li>
                <li>Information Systems for Engineers – 4 ECTS</li>
                <li>High-Dimensional Statistics – 4 ECTS</li>
                <li>Time Series Analysis – 4 ECTS</li>
                <li>Linear & Combinatorial Optimization – 10 ECTS</li>
                <li>Allgemeine Mechanik – 7 ECTS</li>
                <li>Neuromorphic Engineering I – 6 ECTS</li>
                <li>Angewandte Computer Architektur – 6 ECTS</li>
                <li>Responsible Machine Learning with Insurance Applications – 4 ECTS</li>
                <li>Causality – 5 ECTS</li>
            </ul>
        </div>
    `;
    this.showCustomTooltip(content, event);
  }
};