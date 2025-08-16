// module-data.js - Alle konstanten Moduldaten für ITET

window.ITETModuleData = {
  // Praktika-Module
  praktikaModule: [
    { name: "Laboratory Course in Computer Engineering", kp: 14, kategorie: "Wahl Praktika-Projekte-Seminare", beschreibung: "Praktisches Labor im Bereich Computer Engineering" },
    { name: "Laboratory Course in Communication Technology", kp: 14, kategorie: "Wahl Praktika-Projekte-Seminare", beschreibung: "Praktisches Labor im Bereich Kommunikationstechnik" },
    { name: "Laboratory Course in Information Technology", kp: 14, kategorie: "Wahl Praktika-Projekte-Seminare", beschreibung: "Praktisches Labor im Bereich Informationstechnologie" },
    { name: "Innovation Project", kp: 8, kategorie: "Wahl Praktika-Projekte-Seminare", beschreibung: "Innovatives Projekt zur Entwicklung neuer Technologien" },
    { name: "Semester Project", kp: 8, kategorie: "Wahl Praktika-Projekte-Seminare", beschreibung: "Semesterprojekt mit praktischer Anwendung" },
    { name: "Industry Internship", kp: 8, kategorie: "Wahl Praktika-Projekte-Seminare", beschreibung: "Industriepraktikum in einem Unternehmen" },
    { name: "Seminar in Computer Engineering", kp: 2, kategorie: "Wahl Praktika-Projekte-Seminare", beschreibung: "Seminar zu aktuellen Themen im Computer Engineering" },
    { name: "Seminar in Communication Technology", kp: 2, kategorie: "Wahl Praktika-Projekte-Seminare", beschreibung: "Seminar zu aktuellen Themen in der Kommunikationstechnik" },
    { name: "Seminar in Biomedical Engineering", kp: 2, kategorie: "Wahl Praktika-Projekte-Seminare", beschreibung: "Seminar zu Biomedical Engineering Themen" },
    { name: "Interdisciplinary Project", kp: 4, kategorie: "Wahl Praktika-Projekte-Seminare", beschreibung: "Interdisziplinäres Projekt über Fakultätsgrenzen hinweg" }
  ],

  // Kernfächer nach Schwerpunkt
  kernfaecherSchwerpunkte: {
    "Computer und Netzwerk": [
      { name: "Eingebettete Systeme", kp: 6, kategorie: "Kernfächer nach Schwerpunkt", beschreibung: "Design und Programmierung eingebetteter Systeme" },
      { name: "Communication Networks", kp: 6, kategorie: "Kernfächer nach Schwerpunkt", beschreibung: "Grundlagen der Kommunikationsnetze" },
      { name: "Fundamentals of Computer Architecture", kp: 6, kategorie: "Kernfächer nach Schwerpunkt", beschreibung: "Grundlagen der Computerarchitektur" },
      { name: "Advanced Computer Architecture", kp: 6, kategorie: "Kernfächer nach Schwerpunkt", beschreibung: "Fortgeschrittene Computerarchitektur" },
      { name: "Computer Networks", kp: 6, kategorie: "Kernfächer nach Schwerpunkt", beschreibung: "Vertiefung in Computer-Netzwerke" },
      { name: "Digital Integrated Circuits", kp: 6, kategorie: "Kernfächer nach Schwerpunkt", beschreibung: "Design digitaler integrierter Schaltungen" },
      { name: "Introduction to Machine Learning", kp: 8, kategorie: "Kernfächer nach Schwerpunkt", beschreibung: "Einführung in maschinelles Lernen" },
      { name: "VLSI Design", kp: 6, kategorie: "Kernfächer nach Schwerpunkt", beschreibung: "Very Large Scale Integration Design" },
      { name: "Information Theory and Coding", kp: 6, kategorie: "Kernfächer nach Schwerpunkt", beschreibung: "Informationstheorie und Kodierung" },
      { name: "Digital Signal Processing", kp: 6, kategorie: "Kernfächer nach Schwerpunkt", beschreibung: "Digitale Signalverarbeitung" }
    ],
    
    "Elektronik und Mikroelektronik": [
      { name: "Analog Integrated Circuits", kp: 6, kategorie: "Kernfächer nach Schwerpunkt", beschreibung: "Design analoger integrierter Schaltungen" },
      { name: "Power Electronics", kp: 6, kategorie: "Kernfächer nach Schwerpunkt", beschreibung: "Leistungselektronik und Energieumwandlung" },
      { name: "Semiconductor Devices", kp: 6, kategorie: "Kernfächer nach Schwerpunkt", beschreibung: "Halbleiterbauelemente und ihre Physik" },
      { name: "RF Circuit Design", kp: 6, kategorie: "Kernfächer nach Schwerpunkt", beschreibung: "Hochfrequenz-Schaltungsdesign" },
      { name: "Control Systems", kp: 6, kategorie: "Kernfächer nach Schwerpunkt", beschreibung: "Regelungssysteme und Kontrolltechnik" },
      { name: "Electronic Circuits and Systems", kp: 6, kategorie: "Kernfächer nach Schwerpunkt", beschreibung: "Elektronische Schaltungen und Systeme" }
    ]
  },

  // Wahlfächer Bereiche
  wahlfaecherBereiche: {
    "Wirtschaft und Management": [
      { name: "Managerial Economics", kp: 4, kategorie: "Wahlfächer", beschreibung: "Betriebswirtschaftliche Grundlagen" },
      { name: "Einführung in die Mikroökonomie", kp: 3, kategorie: "Wahlfächer", beschreibung: "Grundlagen der Mikroökonomie" },
      { name: "Entrepreneurship", kp: 4, kategorie: "Wahlfächer", beschreibung: "Grundlagen des Unternehmertums" },
      { name: "Technology Entrepreneurship", kp: 4, kategorie: "Wahlfächer", beschreibung: "Technologie-orientiertes Unternehmertum" },
      { name: "Innovation Management", kp: 4, kategorie: "Wahlfächer", beschreibung: "Management von Innovation" }
    ],
    
    "Zusätzliche Technik": [
      { name: "Power Electronic Systems", kp: 6, kategorie: "Wahlfächer", beschreibung: "Leistungselektronische Systeme" },
      { name: "Biomedical Engineering", kp: 4, kategorie: "Wahlfächer", beschreibung: "Ingenieurswissenschaften in der Medizin" },
      { name: "Control Systems", kp: 6, kategorie: "Wahlfächer", beschreibung: "Erweiterte Regelungssysteme" },
      { name: "Robotics", kp: 6, kategorie: "Wahlfächer", beschreibung: "Grundlagen der Robotik" },
      { name: "Computer Vision", kp: 8, kategorie: "Wahlfächer", beschreibung: "Maschinelles Sehen" }
    ],
    
    "Mathematik und Naturwissenschaften": [
      { name: "Advanced Mathematics", kp: 4, kategorie: "Wahlfächer", beschreibung: "Fortgeschrittene Mathematik" },
      { name: "Mathematical Optimization", kp: 6, kategorie: "Wahlfächer", beschreibung: "Mathematische Optimierung" },
      { name: "Applied Statistics", kp: 4, kategorie: "Wahlfächer", beschreibung: "Angewandte Statistik" },
      { name: "Physics for Engineers", kp: 6, kategorie: "Wahlfächer", beschreibung: "Physik für Ingenieure" }
    ]
  },

  // Weitere Wahl-Grundlagenfächer
  weitereWahlGrundlagen: [
    { name: "Computational Thinking", kp: 4, kategorie: "Weitere Wahl-Grundlagenfächer", beschreibung: "Computergestütztes Denken und Problemlösung" },
    { name: "High-Frequency Design Techniques", kp: 4, kategorie: "Weitere Wahl-Grundlagenfächer", beschreibung: "Hochfrequenz-Design-Techniken" },
    { name: "Introduction to Quantum Computing", kp: 6, kategorie: "Weitere Wahl-Grundlagenfächer", beschreibung: "Einführung in Quantencomputing" },
    { name: "Sustainable Engineering", kp: 4, kategorie: "Weitere Wahl-Grundlagenfächer", beschreibung: "Nachhaltiges Ingenieurwesen" }
  ]
};

console.log("✅ ITET Module Data geladen");

const ITETModuleData = {
  praktikaModule: [
    { name: "Amateurfunk-Kurs", kp: 1.5, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "COMSOL Design Tool – Design of Optical Components", kp: 3, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "Microcontrollers for Sensors and the Internet of Things", kp: 4, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "FPGA in Quantum Computing with Superconducting Qubits", kp: 3, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "Neural Network on Low Power FPGA", kp: 2, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "Bluetooth Low Energy Programming for IoT Sensing System", kp: 3, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "Spiking Neural Network on Neuromorphic Processors", kp: 3, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "Electronic Circuits & Signals Exploration Laboratory", kp: 2, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "Assembling and Controlling a Tuning-Fork AFM", kp: 3, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "Technical and Economic Aspects of Renewable Energy Supply", kp: 3, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "Python for Engineers", kp: 3, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "Machine Learning for Brain-Computer Interfaces", kp: 3, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "Bau eines drahtlosen Infrarot-Kopfhörers", kp: 2, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "Bits on Air", kp: 2, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "Software Defined Radio", kp: 3, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "Quad-Rotors: Control and Estimation", kp: 2, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "RoboCup: Learning and Control", kp: 3, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "Magnetresonanz: Vom Spektrum zum Bild", kp: 1, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "Biosignal Acquisition and Processing for IoT Wearable Devices", kp: 3, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "Android Application Development (AAD)", kp: 4, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "iCEBreaker FPGA For IoT Sensing Systems", kp: 3, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "Embedded Deep Learning with Huawei Atlas 200 AI Dev Kit", kp: 3, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "Vision Goes Vegas", kp: 2, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "Magnetische Felder im Alltag", kp: 3, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "Accelerating Genome Analysis with FPGAs, GPUs", kp: 3, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "Exploration of Emerging Memory Systems", kp: 3, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "FPGA-based Exploration of DRAM and RowHammer", kp: 3, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "Genome Sequencing on Mobile Devices", kp: 3, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "Memory-Centric Computing", kp: 3, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "Controlling Biological Neuronal Networks Using Machine Learning", kp: 4, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "Python for Science & Machine Learning", kp: 3, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "Memory Design: From Architecture down to Basic Cells", kp: 3, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "Building a receive coil for MRI", kp: 1.5, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "Clean Room Technology – Fabrication and Characterization", kp: 3, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "Understanding and Designing Modern SSDs", kp: 3, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "Robotic Maze Solving with a TI-RSLK Robot", kp: 3, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "Embedded Systems With Drones", kp: 4, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "Machine Learning on Smart Phone", kp: 3, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "Introduction to Program Nao Robots for Robocup", kp: 3, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "Smart Patch Projects", kp: 4, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "Programming Heterogeneous Computing Systems", kp: 3, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "Optics and Spectroscopy Lab", kp: 3, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "Our Daily Exposure to Electromagnetic Radiation", kp: 3, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "Intelligent Architectures via Hardware/Software Cooperation", kp: 3, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "Wearable Ultrasound: Tools and Technologies", kp: 3, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "Autonomous Cars and Robots", kp: 4, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "Erneuerbare Energien und Netto-Null-Emissions-Ziel", kp: 2, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "Enabling Smart and Low Power IoT Sensor Nodes", kp: 4, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "Gibbs? Clifford!", kp: 2, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "Image-guided digital twinning of cardiac anatomy", kp: 2, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "Coding Algorithms for a Scavenger Hunt", kp: 1, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "Clinical Genomics", kp: 4, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "Digital Audio", kp: 4, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "Let's make ITET green!", kp: 3, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "Echoes in Action: Designing Piezoelectric Transducers", kp: 2, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "Radio Frequency Electromagnetic Fields", kp: 3, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "Capture the Flag – Introduction to Cybersecurity", kp: 3, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "Exploration Project", kp: 3, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "Mission impossible: CartPole4.0", kp: 2, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "Audio Electronics and Music Production Technology", kp: 1, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "From Software Applications to FPGA Designs", kp: 3, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "Practical Antenna Design, Implementation, and Measurement", kp: 3, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "Hands-On Deep Learning", kp: 2, kategorie: "Wahl Praktika-Projekte-Seminare" },
    { name: "Applied Circuit and PCB-Design", kp: 2, kategorie: "Wahl Praktika-Projekte-Seminare" }
  ],

  kernfaecherSchwerpunkte: {
    "Biomedizinische Technik": [
      { name: "Introduction to Estimation and Machine Learning", kp: 6, kategorie: "Kernfächer nach Schwerpunkt" },
      { name: "Biomedical Imaging", kp: 6, kategorie: "Kernfächer nach Schwerpunkt" },
      { name: "Biomedical Engineering", kp: 4, kategorie: "Kernfächer nach Schwerpunkt" },
      { name: "Bioelectronics and Biosensors", kp: 6, kategorie: "Kernfächer nach Schwerpunkt" },
      { name: "Introduction to Neuroinformatics", kp: 6, kategorie: "Kernfächer nach Schwerpunkt" }
    ],
    "Computer und Netzwerke": [
      { name: "Communication Systems", kp: 6, kategorie: "Kernfächer nach Schwerpunkt" },
      { name: "Embedded Systems", kp: 6, kategorie: "Kernfächer nach Schwerpunkt" },
      { name: "Fundamentals of Computer Architecture", kp: 6, kategorie: "Kernfächer nach Schwerpunkt" }
    ],
    "Elektrische Energietechnik": [
      { name: "Control Systems", kp: 6, kategorie: "Kernfächer nach Schwerpunkt" },
      { name: "Leistungselektronik", kp: 6, kategorie: "Kernfächer nach Schwerpunkt" }
    ],
    "Elektronik und Photonik": [
      { name: "VLSI 1: HDL Based Design for FPGAs", kp: 6, kategorie: "Kernfächer nach Schwerpunkt" },
      { name: "Embedded Systems", kp: 6, kategorie: "Kernfächer nach Schwerpunkt" },
      { name: "Solid State Electronics and Optics", kp: 6, kategorie: "Kernfächer nach Schwerpunkt" },
      { name: "Analog Integrated Circuits", kp: 6, kategorie: "Kernfächer nach Schwerpunkt" }
    ],
    "Kommunikation, Regelung und Signalverarbeitung": [
      { name: "Discrete-Time and Statistical Signal Processing", kp: 6, kategorie: "Kernfächer nach Schwerpunkt" },
      { name: "Control Systems", kp: 6, kategorie: "Kernfächer nach Schwerpunkt" },
      { name: "Introduction to Estimation and Machine Learning", kp: 6, kategorie: "Kernfächer nach Schwerpunkt" },
      { name: "Communication Systems", kp: 6, kategorie: "Kernfächer nach Schwerpunkt" }
    ]
  },

  wahlfaecherBereiche: {
    "Ingenieurswissenschaftliche Wahlfächer": [
      { name: "Electromagnetic Waves: Materials, Effects, and Antennas", kp: 6, kategorie: "Wahlfächer" },
      { name: "Mechatronik", kp: 6, kategorie: "Wahlfächer" },
      { name: "VLSI 2: From Netlist to Complete System on Chip", kp: 6, kategorie: "Wahlfächer" },
      { name: "Introduction to Machine Learning", kp: 8, kategorie: "Wahlfächer" },
      { name: "Computer Security", kp: 4, kategorie: "Wahlfächer" },
      { name: "Manufacturing of Electronic Devices", kp: 4, kategorie: "Wahlfächer" }
    ],
    "Wirtschafts-, Rechts- und Managementwissenschaftliche Wahlfächer": [
      { name: "Managerial Economics", kp: 4, kategorie: "Wahlfächer" },
      { name: "Einführung in die Mikroökonomie", kp: 3, kategorie: "Wahlfächer" },
      { name: "Grundzüge des Rechts", kp: 2, kategorie: "Wahlfächer" },
      { name: "Startups und Recht", kp: 2, kategorie: "Wahlfächer" }
    ]
  }
};

export default ITETModuleData;