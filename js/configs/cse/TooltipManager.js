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
    this.studienplan.showCustomTooltip(content, event);
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
    this.studienplan.showCustomTooltip(content, event);
  }
}

// Export für modularen Import
window.CSETooltipManager = CSETooltipManager;
