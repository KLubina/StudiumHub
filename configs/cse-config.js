/* ==== CSE STUDIENGANG KONFIGURATION ==== */

window.StudiengangConfig = {
    // Grundlegende Informationen
    title: "BSc Computational Science and Engineering (CSE)",
    subtitle: "mind. 180 KP insgesamt",
    legendTitle: "Farben-Legende",
    creditUnit: "KP",
    
    // Layout-Konfiguration
    layout: "years",
    moduleSizing: "proportional",
    basisArea: 2000,
    defaultAspectRatio: 1.5,
    layoutClass: "layout-bereich",
    
    // Features
    enableTooltips: true,
    enableHover: true,
    
    // Aspekt-Verhältnisse
    aspectRatios: {
        "longName": 2.0,
        "specialModule": 2.5
    },
    
    // Bereiche-Reihenfolge für 3. Jahr
    bereicheReihenfolge: ["Kernfächer", "Vertiefungsgebiet", "Wahlfächer", "Abschluss"],
    
    // Prüfungsblöcke (spezifisch für CSE)
    pruefungsbloecke: [
        {
            name: "Prüfungsblock G1",
            module: [
                { name: "Analysis III", ng: 1 },
                { name: "Introduction to Mathematical Optimization", ng: 1 },
                { name: "Numerische Methoden für CSE", ng: 2 }
            ],
            cssClass: "block-g1"
        },
        {
            name: "Prüfungsblock G2", 
            module: [
                { name: "Programmiertechniken für physikalische Simulationen", ng: 1 },
                { name: "Systems Programming and Computer Architecture", ng: 1 }
            ],
            cssClass: "block-g2"
        },
        {
            name: "Prüfungsblock G3",
            module: [
                { name: "Numerical Methods for Partial Differential Equations", ng: 2 },
                { name: "Stochastik", ng: 1 }
            ],
            cssClass: "block-g3"
        },
        {
            name: "Prüfungsblock G4",
            module: [
                { name: "Fluiddynamik I", ng: 1 },
                { name: "Molekulare Quantenmechanik", ng: 1 },
                { name: "Physikalische Chemie III", ng: 1 },
                { name: "Statistische Physik und Computer Simulation", ng: 1 }
            ],
            cssClass: "block-g4"
        },
        {
            name: "Basisprüfungsblock 2",
            module: [
                { name: "Analysis I und II", ng: 3 },
                { name: "Physik I und II", ng: 2 },
                { name: "Komplexe Analysis", ng: 1 },
                { name: "Datenstrukturen und Algorithmen", ng: 2 },
                { name: "Chemie", ng: 1 }
            ],
            cssClass: "basis2"
        },
        {
            name: "Basisprüfungsblock 1",
            module: [
                { name: "Lineare Algebra", ng: 1 },
                { name: "Informatik", ng: 1 },
                { name: "Diskrete Mathematik", ng: 1 }
            ],
            cssClass: "basis1"
        }
    ],
    
    // Standard Kategorien (zusätzlich zu Prüfungsblöcken)
    kategorien: [
        { name: "Wissenschaftliche Arbeit", klasse: "wissenschaftliche-arbeit" },
        { name: "Kernfächer", klasse: "kern", info: "3 von 4 möglichen auswählen" },
        { name: "Wahlfächer", klasse: "wahl", info: "mind. zwei Module", hasTooltip: true },
        { name: "Vertiefungsgebiet", klasse: "vertiefung", info: "2 Module auswählen (Robotik)", hasTooltip: true }
    ],
    
    kategorieZuKlasse: {
        "wissenschaftliche-arbeit": "wissenschaftliche-arbeit",
        "kern": "kern",
        "wahl": "wahl", 
        "vertiefung": "vertiefung"
    },
    
    // Moduldaten mit Prüfungsblöcken und Bereichen
    daten: [
        // 1. Jahr
        { jahr: 1, semester: 1, name: "Physik I", kp: 4, pruefungsblock: "Basisprüfungsblock 2", ng: 2 },
        { jahr: 1, semester: 1, name: "Informatik", kp: 4, pruefungsblock: "Basisprüfungsblock 1", ng: 1 },
        { jahr: 1, semester: 1, name: "Lineare Algebra", kp: 5, pruefungsblock: "Basisprüfungsblock 1", ng: 1 },
        { jahr: 1, semester: 1, name: "Diskrete Mathematik", kp: 7, pruefungsblock: "Basisprüfungsblock 1", ng: 1 },
        { jahr: 1, semester: 1, name: "Analysis I", kp: 8, pruefungsblock: "Basisprüfungsblock 2", ng: 3 },

        { jahr: 1, semester: 2, name: "Physik II", kp: 4, pruefungsblock: "Basisprüfungsblock 2", ng: 2 },
        { jahr: 1, semester: 2, name: "Komplexe Analysis", kp: 4, pruefungsblock: "Basisprüfungsblock 2", ng: 1 },
        { jahr: 1, semester: 2, name: "Chemie", kp: 4, pruefungsblock: "Basisprüfungsblock 2", ng: 1 },
        { jahr: 1, semester: 2, name: "Analysis II", kp: 8, pruefungsblock: "Basisprüfungsblock 2", ng: 3 },
        { jahr: 1, semester: 2, name: "Datenstrukturen und Algorithmen", kp: 8, pruefungsblock: "Basisprüfungsblock 2", ng: 2 },

        // 2. Jahr - ohne Semesterunterscheidung
        { jahr: 2, name: "Analysis III", kp: 4, pruefungsblock: "Prüfungsblock G1", ng: 1 },
        { jahr: 2, name: "Introduction to Mathematical Optimization", kp: 5, pruefungsblock: "Prüfungsblock G1", ng: 1 },
        { jahr: 2, name: "Numerische Methoden für CSE", kp: 9, pruefungsblock: "Prüfungsblock G1", ng: 2 },
        { jahr: 2, name: "Stochastik", kp: 4, pruefungsblock: "Prüfungsblock G3", ng: 1 },
        { jahr: 2, name: "Numerical Methods for Partial Differential Equations", kp: 10, pruefungsblock: "Prüfungsblock G3", ng: 2 },
        { jahr: 2, name: "Programmiertechniken für physikalische Simulationen", kp: 5, pruefungsblock: "Prüfungsblock G2", ng: 1 },
        { jahr: 2, name: "Systems Programming and Computer Architecture", kp: 7, pruefungsblock: "Prüfungsblock G2", ng: 1 },
        { jahr: 2, name: "Wissenschaft im Kontext", kp: 6, kategorie: "wissenschaftliche-arbeit" },
        { jahr: 2, name: "Fluiddynamik I", kp: 6, pruefungsblock: "Prüfungsblock G4", ng: 1 },
        { jahr: 2, name: "Molekulare Quantenmechanik", kp: 4, pruefungsblock: "Prüfungsblock G4", ng: 1 },
        { jahr: 2, name: "Physikalische Chemie III", kp: 4, pruefungsblock: "Prüfungsblock G4", ng: 1 },
        { jahr: 2, name: "Statistische Physik und Computer Simulation", kp: 5, pruefungsblock: "Prüfungsblock G4", ng: 1 },

        // 3. Jahr - Kernfächer
        { jahr: 3, semester: 0, bereich: "Kernfächer", name: "Software Engineering", kp: 6, kategorie: "kern" },
        { jahr: 3, semester: 0, bereich: "Kernfächer", name: "Design of High Performance Computing", kp: 6, kategorie: "kern" },
        { jahr: 3, semester: 0, bereich: "Kernfächer", name: "Introduction into Machine Learning", kp: 8, kategorie: "kern" },

        // 3. Jahr - Vertiefungsgebiet
        { jahr: 3, semester: 0, bereich: "Vertiefungsgebiet", name: "3D Vision", kp: 4, kategorie: "vertiefung" },
        { jahr: 3, semester: 0, bereich: "Vertiefungsgebiet", name: "Image Analysis and Computer Vision", kp: 6, kategorie: "vertiefung" },

        // 3. Jahr - Wahlfächer
        { jahr: 3, semester: 0, bereich: "Wahlfächer", name: "Information Systems for Engineers", kp: 5, kategorie: "wahl" },
        { jahr: 3, semester: 0, bereich: "Wahlfächer", name: "Communication Networks", kp: 6, kategorie: "wahl" },

        // 3. Jahr - Abschluss
        { jahr: 3, semester: 0, bereich: "Abschluss", name: "Fallstudien", kp: 6, kategorie: "wissenschaftliche-arbeit" },
        { jahr: 3, semester: 0, bereich: "Abschluss", name: "Bachelorarbeit", kp: 14, kategorie: "wissenschaftliche-arbeit" }
    ],
    
 // Modul-Details für Tooltips
const modulDetails = {
  "Analysis I": {
    kurzbeschreibung: "Einführung in die Grundlagen der Analysis",
    inhalt:
      "• Reelle und komplexe Zahlen\n" +
      "• Grenzwerte\n" +
      "• Folgen\n" +
      "• Reihen\n" +
      "• Potenzreihen\n" +
      "• Stetige Abbildungen\n" +
      "• Differential- und Integralrechnung einer Variablen\n" +
      "• Einführung in gewöhnliche Differentialgleichungen"
  },
  "Analysis II": {
    kurzbeschreibung: "Einführung in die mehrdimensionale Differential- und Integralrechnung",
    inhalt:
      "• Differenzierbare Abbildungen\n" +
      "• Maxima und Minima\n" +
      "• der Satz über implizite Funktionen\n" +
      "• Mehrfache Integrale\n" +
      "• Integration über Untermannigfaltigkeiten\n" +
      "• Sätze von Gauss und Stokes"
  },
  "Analysis III": {
    kurzbeschreibung: "In this lecture we treat problems in applied analysis. The focus lies on the solution of quasilinear first order PDEs with the method of characteristics, and on the study of three fundamental types of partial differential equations of second order.",
    inhalt:
      "General introduction to PDEs and their classification:\n" +
      "• linear\n" +
      "• quasilinear\n" +
      "• semilinear\n" +
      "• nonlinear\n" +
      "• elliptic\n" +
      "• parabolic\n" +
      "• hyperbolic\n" +
      "Quasilinear first order PDEs:\n" +
      "• Solution with the method of characteristics\n" +
      "• Conservation laws\n" +
      "Hyperbolic PDEs:\n" +
      "• wave equation\n" +
      "• d'Alembert formula in (1+1)-dimensions\n" +
      "• method of separation of variables\n" +
      "Parabolic PDEs:\n" +
      "• heat equation\n" +
      "• maximum principle\n" +
      "• method of separation of variables\n" +
      "Elliptic PDEs:\n" +
      "• Laplace equation\n" +
      "• maximum principle\n" +
      "• method of separation of variables\n" +
      "• variational method"
  },
  "Physik I": {
    kurzbeschreibung: "Einführung in die Denk- und Arbeitsweise in der Physik unter Zuhilfenahme von Demonstrationsexperimenten.",
    inhalt:
      "Mechanik:\n" +
      "• Bewegung\n" +
      "• Newtonsche Axiome\n" +
      "• Arbeit und Energie\n" +
      "• Impulserhaltung\n" +
      "• Drehbewegungen\n" +
      "• Gravitation\n" +
      "• deformierbare Körper\n" +
      "Schwingungen und Wellen:\n" +
      "• Schwingungen\n" +
      "• mechanische Wellen\n" +
      "• Akustik"
  },
  "Physik II": {
    kurzbeschreibung: "Einführung in die Denk- und Arbeitsweise in der Physik unter Zuhilfenahme von Demonstrationsexperimenten.",
    inhalt:
      "• Elektrizität und Magnetismus\n" +
      "• Licht\n" +
      "• Einführung in die Moderne Physik"
  },
  "Komplexe Analysis": {
    kurzbeschreibung: "Erwerb von einigen grundlegenden Werkzeugen der komplexen Analysis, sowie Verständnis und Anwendung Fourier- und Laplacetransformationen.",
    inhalt:
      "• Beispiele analytischer Funktionen\n" +
      "• Cauchyscher Integralsatz\n" +
      "• Taylor- und Laurententwicklungen\n" +
      "• Singularitäten analytischer Funktionen\n" +
      "• Residuenkalkül\n" +
      "• Fourierreihen und Fourier-Transformation\n" +
      "• Laplace-Transformation"
  },
  "Chemie": {
    kurzbeschreibung: "Einführung in die Chemie mit Aspekten aus der anorganischen, organischen und physikalischen Chemie.",
    inhalt:
      "• Periodisches System der Elemente\n" +
      "• chemische Bindung (LCAO-MO)\n" +
      "• molekulare Struktur (VSEPR)\n" +
      "• Reaktionen\n" +
      "• Gleichgewicht\n" +
      "• chemische Kinetik\n" +
      "  - Reaktionsordnung\n" +
      "  - Geschwindigkeitsgesetz und -konstante"
  },
  "Datenstrukturen und Algorithmen": {
    kurzbeschreibung: "Der Kurs vermittelt die Grundlagen für den Entwurf und die Analyse von Algorithmen. Anhand klassischer Probleme werden gängige Datenstrukturen, Algorithmen und Paradigmen für den Algorithmenentwurf diskutiert. Der Kurs umfasst auch eine Einführung in die parallele und nebenläufige Programmierung und das Programmiermodell von C++ wird eingehend diskutiert.",
    inhalt:
      "Mathematische Tools für die Analyse von Algorithmen:\n" +
      "• asymptotisches Funktionenwachstum\n" +
      "• Rekursionsgleichungen\n" +
      "• Rekursionsbäume\n" +
      "Informelle Beweise für die Korrektheit von Algorithmen:\n" +
      "• Invarianten\n" +
      "• Codetransformation\n" +
      "Entwurfsparadigmen für die Entwicklung von Algorithmen:\n" +
      "• Induktion\n" +
      "• Divide-and-Conquer\n" +
      "• Sweep-Line-Methode\n" +
      "• Backtracking\n" +
      "• dynamische Programmierung\n" +
      "Klassische algorithmische Probleme:\n" +
      "• Suche\n" +
      "• Auswahl\n" +
      "• Sortierung\n" +
      "Datenstrukturen für verschiedene Zwecke:\n" +
      "• verkettete Listen\n" +
      "• Hash-Tabellen\n" +
      "• balancierte Suchbäume\n" +
      "• Quad-Trees\n" +
      "• Heaps\n" +
      "• Union-Find\n" +
      "Geometrische Probleme:\n" +
      "• konvexe Hülle\n" +
      "• Linienschnitte\n" +
      "• dichteste Punktepaare\n" +
      "Graphenalgorithmen:\n" +
      "• Traversierungen\n" +
      "• topologische Sortierung\n" +
      "• transitive Hülle\n" +
      "• kürzeste Pfade\n" +
      "• minimale Spannbäume\n" +
      "• maximaler Fluss\n" +
      "Programmiermodell von C++:\n" +
      "• korrekte und effiziente Speicherbehandlung\n" +
      "• generische Programmierung mit Templates\n" +
      "• funktionale Ansätze mit Funktoren und Lambda-Ausdrücken\n" +
      "Parallele Programmierung:\n" +
      "• Konzepte der parallelen Programmierung\n" +
      "• Probleme der Nebenläufigkeit\n" +
      "• Prozess-Synchronisation und Kommunikation"
  },
  "Informatik": {
    kurzbeschreibung: "Die Vorlesung bietet eine Einführung in das Programmieren mit einem Fokus auf systematischem algorithmischem Problemlösen. Lehrsprache ist C++.",
    inhalt:
      "Einführung:\n" +
      "• fundamentale Datentypen\n" +
      "• Ausdrücke und Anweisungen\n" +
      "• (Grenzen der) Computerarithmetik\n" +
      "• Kontrollanweisungen\n" +
      "• Funktionen\n" +
      "• Felder\n" +
      "• zusammengesetzte Strukturen\n" +
      "• Zeiger\n" +
      "Objektorientierung:\n" +
      "• Klassen\n" +
      "• Vererbung\n" +
      "• Polymorphie\n" +
      "• dynamische Datentypen"
  },
  "Diskrete Mathematik": {
    kurzbeschreibung: "Ziel ist die Einführung in die wichtigsten Grundbegriffe der diskreten Mathematik, das Verständnis der Rolle von Abstraktion und Beweisen sowie die Auseinandersetzung mit Anwendungen, etwa aus der Kryptographie, Codierungstheorie und Algorithmentheorie.",
    inhalt:
      "• Mathematisches Denken und Beweise\n" +
      "• Abstraktion\n" +
      "• Mengen\n" +
      "• Relationen (z.B. Äquivalenz- und Ordnungsrelationen)\n" +
      "• Funktionen\n" +
      "• (Un-)abzählbarkeit\n" +
      "• Zahlentheorie\n" +
      "Algebra:\n" +
      "• Gruppen\n" +
      "• Ringe\n" +
      "• Körper\n" +
      "• Polynome\n" +
      "• Unteralgebren\n" +
      "• Morphismen\n" +
      "Logik:\n" +
      "• Aussagen- und Prädikatenlogik\n" +
      "• Beweiskalküle"
  },
  "Lineare Algebra": {
    kurzbeschreibung: "Ziel ist der sichere Umgang mit grundlegenden Verfahren der linearen Algebra, insbesondere das Lösen linearer Gleichungssysteme, das Verständnis und die Anwendung von Vektor- und Matrixoperationen sowie die Nutzung von Zerlegungen, Eigenwertmethoden und linearen Abbildungen zur Analyse und Lösung mathematischer und technischer Probleme.",
    inhalt:
      "• Lineare Gleichungssysteme, Matrizen, Gauss-Elimination, LU- und QR-Zerlegungen\n" +
      "• Lineare Räume, Fundamentalsatz der linearen Algebra - Teil I, Basiswahl und Basiswechsel\n" +
      "• Lineare Abbildungen und Abbildungsmatrix bei Koordinatentransformationen\n" +
      "• Norm und Skalarprodukt in linearen Räumen, Gram-Schmidt-Algorithmus, Projektoren\n" +
      "• Lineare Ausgleichsrechnung\n" +
      "• Determinanten\n" +
      "• Eigenwerte und Eigenvektoren, Symmetrische Matrizen\n" +
      "• Singulärwertzerlegung und Fundamentalsatz der linearen Algebra, Anwendungen"
  },
  "Numerical Methods for Partial Differential Equations": {
    kurzbeschreibung: "This course covers the derivation, properties, and practical implementation of fundamental numerical methods for solving key partial differential equations, including convection-diffusion, heat, and wave equations, as well as conservation laws. Emphasis is placed on efficient implementation in C++ using a finite element library, with a strong focus on understanding the mathematical foundations and selecting appropriate methods based on the characteristics of the PDE models.",
    inhalt:
      "• Second-order scalar elliptic boundary value problems\n" +
      "• Finite-element methods (FEM)\n" +
      "• FEM: Convergence and Accuracy\n" +
      "• Beyond FEM: Alternative Discretizations\n" +
      "• Non-linear elliptic boundary value problems\n" +
      "• Second-order linear evolution problems\n" +
      "• Convection-diffusion problems\n" +
      "• Finite Elements for the Stokes Equation"
  },
  "Stochastik": {
    kurzbeschreibung: "Wahrscheinlichkeitsmodelle und Anwendungen, Einführung in Schätztheorie und statistische Testtheorie",
    inhalt:
      "Der Begriff Wahrscheinlichkeitsraum und einige klassische Modelle:\n" +
      "• Axiome von Kolmogorov\n" +
      "• einfache Folgerungen\n" +
      "• diskrete Modelle\n" +
      "• Dichtefunktionen\n" +
      "• Produktmodelle\n" +
      "• Zusammenhang zwischen den bisher betrachteten Modellen\n" +
      "• Verteilungsfunktionen\n" +
      "• Transformation von Wahrscheinlichkeitsverteilungen\n" +
      "Bedingte Wahrscheinlichkeiten:\n" +
      "• Definition und Beispiele\n" +
      "• Berechnung von absoluten aus bedingten Wahrscheinlichkeiten\n" +
      "• Bayes'sche Regel\n" +
      "• Anwendung auf Nachrichtenquellen\n" +
      "• bedingte Verteilungen\n" +
      "• Erwartungswert eine Zufallsvariable\n" +
      "• Varianz\n" +
      "• Kovarianz und Korrelation\n" +
      "• lineare Prognosen\n" +
      "• Gesetz der grossen Zahlen\n" +
      "• zentraler Grenzwertsatz\n" +
      "Einführung in die Statistik:\n" +
      "• Schätzung von Parametern\n" +
      "• Tests"
  },
  "Fluiddynamik I": {
    kurzbeschreibung: "An introduction to the physical and mathematical foundations of fluid dynamics is given.",
    inhalt:
      "• Dimensional analysis\n" +
      "• integral and differential conservation laws\n" +
      "• inviscid and viscous flows\n" +
      "• Navier-Stokes equations\n" +
      "• boundary layers, turbulence\n" +
      "• potential flows\n" +
      "• unsteady flows\n" +
      "• aerodynamic concepts\n" +
      "• vorticity dynamics\n" +
      "• compressible flows"
  },
  "Statistische Physik und Computer Simulation": {
    kurzbeschreibung: "Der Kurs vermittelt zentrale Prinzipien und Anwendungen der statistischen Mechanik, einschließlich Gleichgewichts-Molekulardynamik, Monte-Carlo-Verfahren, stochastischer Dynamik und Methoden zur Berechnung freier Energien. In den begleitenden Übungen werden Computersimulationsprogramme eingesetzt, um Ensembles zu erzeugen und statistische Mittelwerte zu bestimmen.",
    inhalt:
      "• Prinzipien und Anwendungen der statistischen Mechanik und Gleichgewichts-Molekulardynamik\n" +
      "• Monte-Carlo-Verfahren\n" +
      "• stochastische Dynamik und freien Energie-Rechnung"
  },
  "Introduction to Mathematical Optimization": {
    kurzbeschreibung: "Introduction to basic techniques and problems in mathematical optimization, and their applications to a variety of problems in engineering.",
    inhalt:
      "• Linear programming (simplex method, duality theory, shadow prices, ...)\n" +
      "• Basic combinatorial optimization problems (spanning trees, shortest paths, network flows, ...)\n" +
      "• Modelling with mathematical optimization: applications of mathematical programming in engineering"
  },
  "Numerische Methoden für CSE": {
    kurzbeschreibung: "The course gives an introduction into fundamental techniques and algorithms of numerical mathematics which play a central role in numerical simulations in science and technology. The course focuses on fundamental ideas and algorithmic aspects of numerical methods. The exercises involve actual implementation of numerical methods in C++.",
    inhalt:
      "• Computing with Matrices and Vectors\n" +
      "• Direct Methods for linear systems of equations\n" +
      "• Least Squares Techniques\n" +
      "• Data Interpolation and Fitting\n" +
      "• Iterative Methods for non-linear systems of equations\n" +
      "• Filtering Algorithms\n" +
      "• Approximation of Functions\n" +
      "• Numerical Quadrature"
  },
  "Programmiertechniken für physikalische Simulationen": {
    kurzbeschreibung: "This lecture provides an overview of programming techniques for scientific simulations. The focus is on basic and advanced C++ programming techniques and scientific software libraries. Based on an overview over the hardware components of PCs and supercomputer, optimization methods for scientific simulation codes are explained.",
    inhalt:
      "• Basic and advanced C++ programming techniques\n" +
      "• Scientific software libraries\n" +
      "• Hardware components of PCs and supercomputers\n" +
      "• Optimization methods for scientific simulation codes"
  },
  "Systems Programming and Computer Architecture": {
    kurzbeschreibung: "Introduction to systems programming. C and assembly language, floating point arithmetic, basic translation of C into assembler, compiler optimizations, manual optimizations. How hardware features like superscalar architecture, exceptions and interrupts, caches, virtual memory, multicore processors, devices, and memory systems function and affect correctness, performance, and optimization.",
    inhalt:
      "Overview of modern computer systems as platforms for executing compiled programs\n" +
      "Programmer's perspective on:\n" +
      "• Program execution\n" +
      "• Memory storage and management\n" +
      "• System-level communication\n" +
      "Introduction to key architectural components:\n" +
      "• Processors and registers\n" +
      "• Cache memory and memory hierarchy\n" +
      "• Virtual memory systems\n" +
      "• Supervisor/kernel mode\n" +
      "• Input/output structures\n" +
      "Understanding the impact of:\n" +
      "• Compiler optimizations\n" +
      "• Operating system behavior\n" +
      "• Hardware features on performance, scalability, and correctness\n" +
      "Exposure to practical system-level issues:\n" +
      "• Performance tuning and profiling\n" +
      "• Portability and security\n" +
      "• Robustness and extensibility of code\n" +
      "Topics covered include:\n" +
      "• Machine-level code and its generation by optimizing compilers\n" +
      "• Address translation techniques\n" +
      "• Input and output mechanisms\n" +
      "• Trap and event handling\n" +
      "• Performance evaluation and optimization"
  },
  "Software Engineering": {
    kurzbeschreibung: "This course introduces both theoretical and practical aspects of software engineering, all of which are applied in a substantial team project.",
    inhalt:
      "• requirements\n" +
      "• specifications and documentation\n" +
      "• formal and informal modelling\n" +
      "• modularity\n" +
      "• testing and concolic execution"
  },
  "Design of High Performance Computing": {
    kurzbeschreibung: "Advanced topics in parallel and high-performance computing.",
    inhalt:
      "• Comprehensive overview of high-performance computing (HPC) from hardware architecture to programming and algorithms\n" +
      "Introduction to:\n" +
      "• Cache architectures and cache coherence in real-world systems\n" +
      "Parallel programming concepts, including:\n" +
      "• Memory models\n" +
      "• Locks and lock-free programming techniques\n" +
      "• Performance modeling techniques\n" +
      "• Principles of parallel software design\n" +
      "• Fundamental parallel algorithms"
  },
  "Introduction into Machine Learning": {
    kurzbeschreibung: "The course introduces the foundations of learning and making predictions based on data.",
    inhalt:
      "• Linear regression (overfitting, cross-validation/bootstrap, model selection, regularization, [stochastic] gradient descent)\n" +
      "• Linear classification: Logistic regression (feature selection, sparsity, multi-class)\n" +
      "• Kernels and the kernel trick (Properties of kernels; applications to linear and logistic regression); k-nearest neighbor\n" +
      "• Neural networks (backpropagation, regularization, convolutional neural networks)\n" +
      "• Unsupervised learning (k-means, PCA, neural network autoencoders)\n" +
      "• The statistical perspective (regularization as prior; loss as likelihood; learning as MAP inference)\n" +
      "• Statistical decision theory (decision making based on statistical models and utility functions)\n" +
      "• Discriminative vs. generative modeling (benefits and challenges in modeling joint vs. conditional distributions)\n" +
      "• Bayes' classifiers (Naive Bayes, Gaussian Bayes; MLE)\n" +
      "• Bayesian approaches to unsupervised learning (Gaussian mixtures, EM)"
  },
  "Wissenschaft im Kontext": {
    kurzbeschreibung: "Wissenschaftliches Arbeiten und Methodenkompetenz",
    inhalt:
      "• Wissenschaftliche Methoden\n" +
      "• Recherche\n" +
      "• wissenschaftliches Schreiben"
  },
  "Fallstudien": {
    kurzbeschreibung: "Praktische Anwendung der im Studium erlernten Fähigkeiten in einem Praxisprojekt",
    inhalt:
      "• Projektarbeit in Teams an realen Problemstellungen"
  },
  "Bachelorarbeit": {
    kurzbeschreibung: "Selbständige Bearbeitung eines wissenschaftlichen Themas",
    inhalt:
      "• Individuell definiertes wissenschaftliches Projekt"
  }
}
};

/* ==== CSE-SPEZIFISCHE ERWEITERUNGEN ==== */

// Erweiterte Klasse für CSE-spezifische Features
window.StudiengangClass = class CSEStudienplan extends StudienplanBase {
    constructor(config) {
        super(config);
        this.isVertiefungsgebieteTooltipLocked = false;
        this.isWahlfaecherTooltipLocked = false;
    }
    
    addLegendTooltipEvents(div, kategorie) {
        if (kategorie.klasse === 'vertiefung') {
            div.addEventListener('mouseenter', (event) => {
                this.showVertiefungsgebieteTooltip(event);
            });
            
            div.addEventListener('mouseleave', () => {
                if (!this.isVertiefungsgebieteTooltipLocked) {
                    this.hideTooltip();
                }
            });
            
            div.addEventListener('click', (event) => {
                this.isVertiefungsgebieteTooltipLocked = !this.isVertiefungsgebieteTooltipLocked;
                if (this.isVertiefungsgebieteTooltipLocked) {
                    this.showVertiefungsgebieteTooltip(event);
                } else {
                    this.hideTooltip();
                }
            });
        }
        
        if (kategorie.klasse === 'wahl') {
            div.addEventListener('mouseenter', (event) => {
                this.showWahlfaecherTooltip(event);
            });
            
            div.addEventListener('mouseleave', () => {
                if (!this.isWahlfaecherTooltipLocked) {
                    this.hideTooltip();
                }
            });
            
            div.addEventListener('click', (event) => {
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