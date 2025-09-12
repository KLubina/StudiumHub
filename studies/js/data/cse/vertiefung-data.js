/* ==== CSE VERTIEFUNGSGEBIETE DATA ==== */
/* Daten für die verschiedenen Vertiefungsgebiete im CSE-Studiengang */

const CSE_VERTIEFUNGSGEBIETE = {
  "Astrophysik": [
    { name: "Theoretical Astrophysics", ects: 10 },
    { name: "Theoretical Cosmology", ects: 10 },
    { name: "Computational Astrophysics", ects: 6 }
  ],
  
  "Atmosphärenphysik": [
    { name: "Atmosphäre", ects: 3 },
    { name: "Weather and Climate Models", ects: 4 }
  ],
  
  "Chemie": [
    { name: "Classical Simulation of (Biol)Molecular Systems", ects: 6 },
    { name: "Quantenchemie", ects: 6 },
    { name: "Molecular and Materials Modelling", ects: 4 }
  ],
  
  "Fluiddynamik": [
    { name: "Fluiddynamik II", ects: 3 },
    { name: "Computational Methods for Flow, Heat and Mass Transfer Problems", ects: 4 }
  ],
  
  "Systems and Control": [
    { name: "Control Systems I (Regelsysteme)", ects: 6 },
    { name: "Control Systems II", ects: 6 },
    { name: "Signal- und Systemtheorie I", ects: 4 },
    { name: "Signal- und Systemtheorie II", ects: 4 }
  ],
  
  "Robotik": [
    { name: "Theory of Robotics and Mechatronics", ects: 4 },
    { name: "Autonomous Mobile Robots", ects: 5 },
    { name: "Introduction to Machine Learning", ects: 8 },
    { name: "Probabilistic Artificial Intelligence", ects: 8 },
    { name: "Deep Learning", ects: 8 },
    { name: "Computer Vision", ects: 8 },
    { name: "Image Analysis and Computer Vision", ects: 6 },
    { name: "Dynamic Programming and Optimal Control", ects: 4 },
    { name: "Recursive Estimation", ects: 4 },
    { name: "Robot Dynamics", ects: 4 },
    { name: "Advanced Machine Learning", ects: 10 },
    { name: "3D Vision", ects: 4 },
    { name: "Seminar in Robotics for CSE", ects: 4 }
  ],
  
  "Physik": [
    { name: "Introduction to Computational Physics", ects: 8 },
    { name: "Computational Statistical Physics", ects: 8 },
    { name: "Computational Quantum Physics", ects: 8 },
    { name: "Molecular and Materials Modelling", ects: 4 }
  ],
  
  "Computational Finance": [
    { name: "Mathematical Foundations for Finance", ects: 4 },
    { name: "Computational Methods for Quantitative Finance – Monte Carlo and Sampling Methods", ects: 6 }
  ],
  
  "Electromagnetics": [
    { name: "Physical Modelling and Simulation", ects: 6 },
    { name: "Optimization Methods for Engineers", ects: 3 }
  ],
  
  "Geophysik": [
    { name: "Continuum Mechanics", ects: 3 },
    { name: "Numerical Modelling I and II", ects: 6 },
    { name: "Dynamics of the Mantle and Lithosphere", ects: 3 },
    { name: "Numerical Modelling for Applied Geophysics", ects: 4 },
    { name: "Tomographic Imaging", ects: 3 },
    { name: "Seismology of the Spherical Earth", ects: 3 },
    { name: "Inverse Theory I+II", ects: 6 },
    { name: "Numerical Modelling in Fortran", ects: 3 }
  ],
  
  "Biologie": [
    { name: "Computational Systems Biology", ects: 6 },
    { name: "Statistical Models in Computational Biology", ects: 6 },
    { name: "Spatio-Temporal Modelling in Biology", ects: 4 },
    { name: "Introduction to Neuroinformatics", ects: 6 }
  ]
};

// Hilfsfunktion zum Generieren des HTML-Contents
function generateVertiefungsgebieteHTML() {
  let html = '<div class="vertiefungsgebiete-liste"><h3>Vertiefungsgebiete</h3>';
  
  for (const [bereich, kurse] of Object.entries(CSE_VERTIEFUNGSGEBIETE)) {
    html += `<h4>${bereich}</h4><ul>`;
    kurse.forEach(kurs => {
      html += `<li>${kurs.name} – ${kurs.ects} ECTS</li>`;
    });
    html += '</ul>';
  }
  
  html += '</div>';
  return html;
}

// Export für modularen Import
if (typeof window !== 'undefined') {
  window.CSE_VERTIEFUNGSGEBIETE = CSE_VERTIEFUNGSGEBIETE;
  window.generateVertiefungsgebieteHTML = generateVertiefungsgebieteHTML;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CSE_VERTIEFUNGSGEBIETE,
    generateVertiefungsgebieteHTML
  };
}