/* ==== CSE WAHLFÄCHER DATA ==== */
/* Daten für die Wahlfächer im CSE-Studiengang nach Semester */

const CSE_WAHLFAECHER = {
  "Frühlingssemester 2025": [
    { name: "Product Development and Engineering Design", ects: 4 },
    { name: "Optimization and Machine Learning", ects: 4 },
    { name: "Visualization, Simulation and Interaction - Virtual Reality I", ects: 4 },
    { name: "Informationstechnologien im digitalen Produkt", ects: 4 },
    { name: "Biofluiddynamics", ects: 4 },
    { name: "Introduction to Finite Element Analysis", ects: 4 },
    { name: "Nonlinear FEA", ects: 4 },
    { name: "Elektromagnetische Felder und Wellen", ects: 4 },
    { name: "Algebra and Error Correcting Codes", ects: 6 },
    { name: "Information Theory II", ects: 6 },
    { name: "Communication and Detection Theory", ects: 6 },
    { name: "Communication Networks", ects: 6 },
    { name: "Principles of Distributed Computing", ects: 7 },
    { name: "Information Security", ects: 8 },
    { name: "Applied Cryptography", ects: 8 },
    { name: "Game Programming Laboratory", ects: 10 },
    { name: "Shape Modeling and Geometry Processing", ects: 8 },
    { name: "Big Data for Engineers", ects: 6 },
    { name: "Mobile Health and Activity Monitoring", ects: 6 },
    { name: "Machine Learning for Health Care", ects: 5 },
    { name: "Chemometrics and Machine Learning for Chemical Engineers", ects: 4 },
    { name: "Neuromorphic Engineering II", ects: 6 },
    { name: "Computational Vision (UZH)", ects: 6 },
    { name: "Computational Models of Motion", ects: 8 },
    { name: "Statistical Methods in Experimental Physics", ects: 10 },
    { name: "Computational Systems Biology: Stochastic Approaches", ects: 4 },
    { name: "Klimasysteme", ects: 3 },
    { name: "Mathematical Optimization Lab", ects: 5 },
    { name: "Network & Integer Optimization", ects: 5 },
    { name: "Convex Optimization", ects: 5 },
    { name: "High-Dimensional Statistics", ects: 4 },
    { name: "Physikalische Chemie III: Molekulare Quantenmechanik", ects: 4 },
    { name: "Soccer Analytics", ects: 3 }
  ],
  
  "Herbstsemester 2024": [
    { name: "Visualization, Simulation and Interaction - Virtual Reality II", ects: 4 },
    { name: "Applied Finite Element Analysis", ects: 4 },
    { name: "Nonlinear FEA", ects: 4 },
    { name: "Design of Parallel and High-Performance Computing", ects: 9 },
    { name: "Discrete Event Systems", ects: 6 },
    { name: "VLSI 1: HDL Based Design for FPGAs", ects: 6 },
    { name: "VLSI 3: Full-Custom Digital Circuit Design", ects: 6 },
    { name: "Information Theory I", ects: 6 },
    { name: "Computational Psychiatry", ects: 3 },
    { name: "Algorithms, Probability, and Computing", ects: 8 },
    { name: "Visual Computing", ects: 8 },
    { name: "Computer Graphics", ects: 8 },
    { name: "Physically-Based Simulation in Computer Graphics", ects: 5 },
    { name: "Information Systems for Engineers", ects: 4 },
    { name: "High-Dimensional Statistics", ects: 4 },
    { name: "Time Series Analysis", ects: 4 },
    { name: "Linear & Combinatorial Optimization", ects: 10 },
    { name: "Allgemeine Mechanik", ects: 7 },
    { name: "Neuromorphic Engineering I", ects: 6 },
    { name: "Angewandte Computer Architektur", ects: 6 },
    { name: "Responsible Machine Learning with Insurance Applications", ects: 4 },
    { name: "Causality", ects: 5 }
  ]
};

// Hilfsfunktion zum Generieren des HTML-Contents
function generateWahlfaecherHTML() {
  let html = '<div class="wahlfaecher-liste"><h3>Wahlfächer</h3>';
  
  for (const [semester, kurse] of Object.entries(CSE_WAHLFAECHER)) {
    html += `<h4>${semester}</h4><ul>`;
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
  window.CSE_WAHLFAECHER = CSE_WAHLFAECHER;
  window.generateWahlfaecherHTML = generateWahlfaecherHTML;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CSE_WAHLFAECHER,
    generateWahlfaecherHTML
  };
}