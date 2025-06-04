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
        { name: "Vertiefungsgebiet", klasse: "vertiefung", info: "2 Module auswählen (Atmosphärenphysik)", hasTooltip: true }
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
        { jahr: 3, semester: 0, bereich: "Vertiefungsgebiet", name: "Atmosphäre", kp: 3, kategorie: "vertiefung" },
        { jahr: 3, semester: 0, bereich: "Vertiefungsgebiet", name: "Weather and Climate Modeling", kp: 4, kategorie: "vertiefung" },

        // 3. Jahr - Wahlfächer
        { jahr: 3, semester: 0, bereich: "Wahlfächer", name: "Information Systems for Engineers", kp: 5, kategorie: "wahl" },
        { jahr: 3, semester: 0, bereich: "Wahlfächer", name: "Communication Networks", kp: 6, kategorie: "wahl" },

        // 3. Jahr - Abschluss
        { jahr: 3, semester: 0, bereich: "Abschluss", name: "Fallstudien", kp: 6, kategorie: "wissenschaftliche-arbeit" },
        { jahr: 3, semester: 0, bereich: "Abschluss", name: "Bachelorarbeit", kp: 14, kategorie: "wissenschaftliche-arbeit" }
    ],
    
    // Modul-Details für Tooltips
    modulDetails: {
        "Analysis I": {
            kurzbeschreibung: "• Reelle und komplexe Zahlen\n• Grenzwerte\n• Folgen\n• Reihen\n• Potenzreihen\n• stetige Abbildungen\n• Differential- und Integralrechnung einer Variablen\n• Einführung in gewöhnliche Differentialgleichungen",
            lernziel: "Einführung in die Grundlagen der Analysis",
            inhalt: ""
        },
        "Analysis II": {
            kurzbeschreibung: "Einführung in die mehrdimensionale Differential- und Integralrechung.",
            lernziel: "Einführung in die Grundlagen der Analysis",
            inhalt: "• Differenzierbare Abbildungen\n• Maxima und Minima\n• der Satz ueber implizite Funktionen\n• mehrfache Integrale\n• Integration ueber Untermannigfaltigkeiten\n• die Saetze von Gauss und Stokes"
        },
        "Analysis III": {
            kurzbeschreibung: "In this lecture we treat problems in applied analysis. The focus lies on the solution of quasilinear first order PDEs with the method of characteristics, and on the study of three fundamental types of partial differential equations of second order: • the Laplace equation\n• the heat equation\n• the wave equation",
            lernziel: "The aim of this class is to provide students with a general overview of first and second order PDEs, and teach them how to solve some of these equations using characteristics and/or separation of variables.",
            inhalt: "1. General introduction to PDEs and their classification \n• linear\n• quasilinear\n• semilinear\n• nonlinear \n• elliptic\n• parabolic\n• hyperbolic\n2. Quasilinear first order PDEs\n• Solution with the method of characteristics\n• Conservation laws\n3. Hyperbolic PDEs\n• wave equation\n• d'Alembert formula in (1+1)-dimensions\n• method of separation of variables\n4. Parabolic PDEs\n• heat equation\n• maximum principle\n• method of separation of variables\n5. Elliptic PDEs\n• Laplace equation\n• maximum principle\n• method of separation of variables\n• variational method"
        },
        "Physik I": {
            kurzbeschreibung: "Einführung in die Denk- und Arbeitsweise in der Physik unter Zuhilfenahme von Demonstrationsexperimenten: \n• Mechanik von Massenpunkten und starren Körpern\n• Schwingungen und Wellen",
            lernziel: "Vermittlung der physikalischen Denk- und Arbeitsweise und Einführung in die Methoden in einer experimentellen Wissenschaft. \nDie Studenten und Tarentine soll lernen, physicalist Fragestellungen im eigenen Wissenschaftsbereich zu identifizieren, zu kommunizieren und zu lösen.",
            inhalt: "• Mechanik (Bewegung, Newtonsche Axiome, Arbeit und Energie, Impulserhaltung, Drehbewegungen, Gravitation, deformierbare Körper)\n• Schwingungen und Wellen (Schwingungen, mechanische Wellen, Akustik)"
        },
        "Physik II": {
            kurzbeschreibung: "Einführung in die Denk- und Arbeitsweise in der Physik unter Zuhilfenahme von Demonstrationsexperimenten: \n• Elektrizität und Magnetismus\n• Licht\n• Einführung in die Moderne Physik",
            lernziel: "Vermittlung der physikalischen Denk- und Arbeitsweise und Einführung in die Methoden in einer experimentellen Wissenschaft. \nDer Studenten/in soll lernen physikalische Fragestellungen im eigenen Wissenschaftsbereich zu identifizieren, zu kommunizieren und zu lösen.",
            inhalt: ""
        },
        "Komplexe Analysis": {
            kurzbeschreibung: "• Grundlagen der Komplexen Analysis in Theorie und Anwendung, insbesondere globale Eigenschaften analytischer Funktionen. \n• Einführung in die Integraltransformationen und Beschreibung einiger Anwendungen.",
            lernziel: "Erwerb von einigen grundlegenden Werkzeugen der komplexen Analysis, sowie Verständnis und Anwendung Fourier- und Laplacetransformationen.",
            inhalt: "• Beispiele analytischer Funktionen\n• Cauchyscher Integralsatz\n• Taylor- und Laurententwicklungen\n• Singularitäten analytischer Funktionen\n• Residuenkalkül\n• Fourierreihen und Fourier-Transformation\n• Laplace-Transformation"
        },
        "Chemie": {
            kurzbeschreibung: "Einführung in die Chemie mit Aspekten aus der anorganischen, organischen und physikalischen Chemie.",
            lernziel: "• Einfache Modelle der chemischen Bindung und der dreidimensionalen Struktur von Molekülen verstehen\n• Ausgewählte chemische Systeme anhand von Reaktionsgleichungen und Gleichgewichtsrechnungen beschreiben und quantitativ erfassen\n• Grundlegende Begriffe der chemischen Kinetik (z. B. Reaktionsordnung, Geschwindigkeitsgesetz und -konstante) verstehen und anwenden.",
            inhalt: "• Periodisches System der Elemente\n• chemische Bindung (LCAO-MO)\n• molekulare Struktur (VSEPR)\n• Reaktionen\n• Gleichgewicht\n• chemische Kinetik."
        },
        "Datenstrukturen und Algorithmen": {
            kurzbeschreibung: "• Der Kurs vermittelt die Grundlagen für den Entwurf und die Analyse von Algorithmen.\n• Anhand klassischer Probleme werden gängige Datenstrukturen, Algorithmen und Paradigmen für den Algorithmenentwurf diskutiert.\n• Der Kurs umfasst auch eine Einführung in die parallele und nebenläufige Programmierung und das Programmiermodell von C++ wird eingehend diskutiert.",
            lernziel: "Verständnis des Entwurfs und der Analyse grundlegender Algorithmen und Datenstrukturen. \nWissen um die Chancen, Probleme und Grenzen der parallelen und nebenläufigen Programmierung. \nVertiefter Einblick in ein modernes Programmiermodell anhand der Prorgammiersprache C++.",
            inhalt: "Datenstrukturen und Algorithmen: \n• Mathematische Tools für die Analyse von Algorithmen (asymptotisches Funktionenwachstum, Rekursionsgleichungen, Rekursionsbäume)\n• informelle Beweise für die Korrektheit von Algorithmen (Invarianten und Codetransformation)\n• Entwurfsparadigmen für die Entwicklung von Algorithmen (Induktion, Divide-and-Conquer, Sweep-Line-Methode, Backtracking und dynamische Programmierung)\n• klassische algorithmische Probleme (Suche, Auswahl und Sortierung), Datenstrukturen für verschiedene Zwecke (verkettete Listen, Hash-Tabellen, balancierte Suchbäume, Quad-Trees, Heaps, Union-Find)\n• weitere Tools für die Laufzeitanalyse (z.B. amortisierte Analyse)\n\nDie Beziehung und enge Kopplung zwischen Algorithmen und Datenstrukturen wird anhand von geometrischen Problemen (konvexe Hülle, Linienschnitte, dichteste Punktepaare) und Graphenalgorithmen (Traversierungen, topologische Sortierung, transitive Hülle, kürzeste Pfade, minimale Spannbäume, maximaler Fluss) illustriert.\n\nProgrammiermodell von C++:\n• korrekte und effiziente Speicherbehandlung\n• generische Programmierung mit Templates\n• funktionale Ansätze mit Funktoren und Lambda-Ausdrücken\n\nParallele Programmierung: \n• Konzepte der parallelen Programmierung (Amdahl/Gustavson, Task/Daten-Parallelität, Scheduling)\n• Probleme der Nebenläufigkeit (data races, bad interleavings, memory reordering)\n• Prozess-Synchronisation und Kommunikation in einem Shared-Memory-System (Mutual Exclusion, Semaphoren, Monitore, Condition-Variablen)\n• Fortschrittsbedingungen (Deadlock-Freiheit, Starvation)."
        },
        "Informatik": {
            kurzbeschreibung: "Die Vorlesung bietet eine Einführung in das Programmieren mit einem Fokus auf systematischem algorithmischem Problemlösen.\nLehrsprache ist C++. \nEs wird keine Programmiererfahrung vorausgesetzt.",
            lernziel: "Primäres Lernziel der Vorlesung ist die Befähigung zum Programmieren mit C++. Studenten beherrschen nach erfolgreichem Abschluss der Vorlesung die Mechanismen zum Erstellen eines Programms.\nSie kennen \n• die fundamentalen Kontrollstrukturen\n• Datenstrukturen \n• verstehen wie man ein algorithmisches Problem in ein Programm abbildet. \nSie haben eine Vorstellung davon, was \"hinter den Kulissen\" passiert, wenn ein Programm übersetzt und ausgeführt wird.\n\nSekundäre Lernziele der Vorlesung sind\n• das Computer-basierte, algorithmische Denken\n• Verständnis der Möglichkeiten und der Grenzen der Programmierung \n• die Vermittlung der Denkart eines Computerwissenschaftlers",
            inhalt: "Wir behandeln \n• fundamentale Datentypen\n• Ausdrücke und Anweisungen\n• (Grenzen der) Computerarithmetik\n• Kontrollanweisungen\n• Funktionen\n• Felder\n• zusammengesetze Strukturen \n• Zeiger\nIm Teil zur Objektorientierung werden Klassen, Vererbung und Polymorhpie behandelt, es werden exemplarisch einfache dynamische Datentypen eingeführt.\nDie Konzepte der Vorlesung werden jeweils durch Algorithmen und Anwendungen motiviert und illustriert."
        },
        "Diskrete Mathematik": {
            kurzbeschreibung: "Inhalt: \n• Mathematisches Denken und Beweise\n• Abstraktion\n• Mengen\n• Relationen (z.B. Aequivalenz- und Ordnungsrelationen)\n• Funktionen\n• (Un-)abzählbarkeit\n• Zahlentheorie\n• Algebra (Gruppen, Ringe, Körper, Polynome, Unteralgebren, Morphismen)\n• Logik (Aussagen- und Prädikatenlogik, Beweiskalküle).",
            lernziel: "Hauptziele der Vorlesung sind\n• die Einführung der wichtigsten Grundbegriffe der diskreten Mathematik\n• das Verständnis der Rolle von Abstraktion und von Beweisen \n• die Diskussion einiger Anwendungen, z.B. aus der Kryptographie, Codierungstheorie und Algorithmentheorie",
            inhalt: ""
        },
        "Lineare Algebra": {
            kurzbeschreibung: "Inhalt: \n• Lineare Gleichungssysteme - der Algorithmus von Gauss\n• Matrizen - LR-Zerlegung\n• Determinanten\n• Vektorräume\n• Ausgleichsrechnung - QR-Zerlegung\n• Lineare Abbildungen\n• Eigenwertproblem\n• Normalformen - Singulärwertzerlegung; numerische Aspekte",
            lernziel: "Sie können:\n• lineare Gleichungssysteme mit dem Gauss-Algorithmus lösen;\n• die Grundoperationen mit Vektoren und Matrizen anwenden und geometrisch interpretieren;\n• verschiedene Matrizenzerlegungen berechnen und passend anwenden;\n• Eigenwerte, Eigenvektoren und Determinanten von Matrizen berechnen;\n• Eigenschaften von Vektorräumen und lineraren Abbildungen verwenden;\n• lineare Ausgleichsprobleme formulieren und mit geeigneten Methoden lösen;\n• die Singularwertzerlegung verstehen und anwenden.",
            inhalt: "• Lineare Gleichungsysteme, Matrizen, Gauss-Elimination, LU- und QR-Zerlegungen\n• Lineare Räume, Fundamentalsatz der linearen Algebra - Teil I, Basiswahl und Basiswechsel\n• Lineare Abbildungen und Abbildungsmatrix bei Koordinatentransformationen\n• Norm und Skalarprodukt in linearen Räumen, Gram-Schmidt-Algorithmus, Projektoren\n• Lineare Ausgleichsrechnung\n• Determinanten\n• Eigenwerte und Eigenvektoren, Symmetrische Matrizen\n• Singulärwertzerlegung und Fundamentalsatz der linearen Algebra, Anwendungen"
        },
        "Numerical Methods for Partial Differential Equations": {
            kurzbeschreibung: "Derivation, properties, and implementation of fundamental numerical methods for a few key partial differential equations: \n• convection-diffusion\n• heat equation\n• wave equation\n• conservation laws\nImplementation in C++ based on a finite element library.",
            lernziel: "Main skills to be acquired in this course:\n• Ability to implement fundamental numerical methods for the solution of partial differential equations efficiently.\n• Ability to modify and adapt numerical algorithms guided by awareness of their mathematical foundations.\n• Ability to select and assess numerical methods in light of the predictions of theory\n• Ability to identify features of a PDE (= partial differential equation) based model that are relevant for the selection and performance of a numerical algorithm.\n• Ability to understand research publications on theoretical and practical aspects of numerical methods for partial differential equations.\n• Skills in the efficient implementation of finite element methods on unstructured meshes.\nThis course is neither a course on the mathematical foundations and numerical analysis of methods nor an course that merely teaches recipes and how to apply software packages.",
            inhalt: "• Second-order scalar elliptic boundary value problems\n• Finite-element methods (FEM)\n• FEM: Convergence and Accuracy\n• Beyond FEM: Alternative Discretizations\n• Non-linear elliptic boundary value problems\n• Second-order linear evolution problems\n• Convection-diffusion problems\n• Finite Elements for the Stokes Equation"
        },
        "Stochastik": {
            kurzbeschreibung: "Wahrscheinlichkeitsmodelle und Anwendungen, Einführung in Schätztheorie und statistische Testtheorie",
            lernziel: "Fähigkeit, die behandelten wahrscheinlichkeitstheoretischen Methoden und Modelle zu verstehen und anzuwenden. \nFähigkeit, einfache statistische Tests selbst durchzuführen und die Resultate zu interpretieren.",
            inhalt: "Der Begriff Wahrscheinlichkeitsraum und einige klassische Modelle: \n• Axiome von Kolmogorov\n• einfache Folgerungen\n• diskrete Modelle\n• Dichtefunktionen\n• Produktmodelle\n• Zusammenhang zwischen den bisher betrachteten Modellen\n• Verteilungsfunktionen\n• Transformation von Wahrscheinlichkeitsverteilungen. \n\nBedingte Wahrscheinlichkeiten: \n• Definition und Beispiele\n• Berechnung von absoluten aus bedingten Wahrscheinlichkeiten\n• Bayes'sche Regel\n• Anwendung auf Nachrichtenquellen\n• bedingte Verteilungen\n• Erwartungswert einer Zufallsvariablen\n• Varianz\n• Kovarianz und Korrelation\n• lineare Prognosen\n• Gesetz der grossen Zahlen\n• zentraler Grenzwertsatz\n\nEinführung in die Statistik:\n• Schätzung von Parametern\n• Tests"
        },
        "Fluiddynamik I": {
            kurzbeschreibung: "An introduction to the physical and mathematical foundations of fluid dynamics is given. \nTopics include:\n• dimensional analysis\n• integral and differential conservation laws\n• inviscid and viscous flows\n• Navier-Stokes equations\n• boundary layers\n• turbulence\n• potential flows\n• unsteady flows\n• aerodynamic concepts\n• vorticity dynamics\n• compressible flows",
            lernziel: "Introduction to the physical and mathematical principles of fluid dynamics. \nFundamental terminology/principles and their application to simple problems. \nConcepts, phenomena and quantitative description of potential, rotational, and one-dimensional compressible flows.",
            inhalt: "• Dimensional analysis\n• integral and differential conservation laws\n• inviscid and viscous flows\n• Navier-Stokes equations\n• boundary layers, turbulence\n• potential flows\n• unsteady flows\n• aerodynamic concepts\n• vorticity dynamics\n• compressible flows"
        },
        "Statistische Physik und Computer Simulation": {
            kurzbeschreibung: "• Prinzipien und Anwendungen der statistischen Mechanik und Gleichgewichts-Molekulardynamik\n• Monte-Carlo-Verfahren\n• stochastischen Dynamik \n• freien Energie-Rechnung\nDie Übungen verwenden ein Computersimulationsprogramm, um Ensembles zu generieren und danach Ensembledurchschnitte zu berechnen.",
            lernziel: "• Einführung in die statistische Mechanik mit Hilfe von Computersimulationen\n• Erwerben der Fertigkeit, Computersimulationen durchzuführen und die Resultate zu interpretieren.",
            inhalt: "• Prinzipien und Anwendungen der statistischen Mechanik und Gleichgewichts-Molekulardynamik\n• Monte-Carlo-Verfahren\n• stochastischen Dynamik und freien Energie-Rechnung\nDie Übungen verwenden ein Computersimulationsprogramm, um Ensembles zu generieren und danach Ensembledurchschnitte zu berechnen."
        },
        "Introduction to Mathematical Optimization": {
            kurzbeschreibung: "Introduction to basic techniques and problems in mathematical optimization, and their applications to a variety of problems in engineering.",
            lernziel: "The goal of the course is to obtain a good understanding of some of the most fundamental mathematical optimization techniques used to solve linear programs and basic combinatorial optimization problems. The students will also practice applying the learned models to problems in engineering.",
            inhalt: "Topics covered in this course include:\n• Linear programming (simplex method, duality theory, shadow prices, ...).\n• Basic combinatorial optimization problems (spanning trees, shortest paths, network flows, ...).\n• Modelling with mathematical optimization: applications of mathematical programming in engineering."
        },
        "Numerische Methoden für CSE": {
            kurzbeschreibung: "The course gives an introduction into fundamental techniques and algorithms of numerical mathematics which play a central role in numerical simulations in science and technology. The course focuses on fundamental ideas and algorithmic aspects of numerical methods. The exercises involve actual implementation of numerical methods in C++.",
            lernziel: "• Knowledge of the fundamental algorithms in numerical mathematics\n• Knowledge of the essential terms in numerical mathematics and the techniques used for the analysis of numerical algorithms\n• Ability to choose the appropriate numerical method for concrete problems\n• Ability to interpret numerical results\n• Ability to implement numerical algorithms afficiently",
            inhalt: "• Computing with Matrices and Vectors\n• Direct Methods for linear systems of equations\n• Least Squares Techniques\n• Data Interpolation and Fitting\n• Iterative Methods for non-linear systems of equations\n• Filtering Algorithms\n• Approximation of Functions\n• Numerical Quadrature"
        },
        "Programmiertechniken für physikalische Simulationen": {
            kurzbeschreibung: "This lecture provides an overview of programming techniques for scientific simulations. The focus is on basic and advanced C++ programming techniques and scientific software libraries. Based on an overview over the hardware components of PCs and supercomputer, optimization methods for scientific simulation codes are explained.",
            lernziel: "The goal of the course is that students learn basic and advanced programming techniques and scientific software libraries as used and applied for scientific simulations.",
            inhalt: ""
        },
        "Systems Programming and Computer Architecture": {
            kurzbeschreibung: "Introduction to systems programming. C and assembly language, floating point arithmetic, basic translation of C into assembler, compiler optimizations, manual optimizations.\n\nHow hardware features like superscalar architecture, exceptions and interrupts, caches, virtual memory, multicore processors, devices, and memory systems function and affect correctness, performance, and optimization.",
            lernziel: "The course objectives are for students to:\n1. Develop a deep understanding of, and intuition about, the execution of all the layers (compiler, runtime, OS, etc.) between programs in high-level languages and the underlying hardware: the impact of compiler decisions, the role of the operating system, the effects of hardware on code performance and scalability, etc.\n2. Be able to write correct, efficient programs on modern hardware, not only in C but high-level languages as well.\n3. Understand Systems Programming as a complement to other disciplines within Computer Science and other forms of software development.\nThis course does not cover how to design or build a processor or computer.",
            inhalt: "1. This course provides an overview of \"computers\" as a platform for the execution of (compiled) computer programs. \n2. This course provides a programmer's view of how computer systems execute programs, store information, and communicate. \n3. The course introduces the major computer architecture structures that have direct influence on the execution of programs (processors with registers, caches, other levels of the memory hierarchy, supervisor/kernel mode, and I/O structures) and covers implementation and representation issues only to the extend that they are necessary to understand the structure and operation of a computer system.\nThe course attempts to expose students to the practical issues that affect performance, portability, security, robustness, and extensibility. \nThis course provides a foundation for subsequent courses on operating systems, networks, compilers and many other courses that require an understanding of the system-level issues. \n\nTopics covered include: \n• machine-level code and its generation by optimizing compilers\n• address translation\n• input and output\n• trap/event handlers\n• performance evaluation and optimization (with a focus on the practical aspects of data collection and analysis)"
        },
        "Software Engineering": {
            kurzbeschreibung: "This course introduces both theoretical and practical aspects of software engineering, all of which are applied in a substantial team project.",
            lernziel: "The course has two main objectives:\n• Obtain an end-to-end (both, theoretical and practical) understanding of the core techniques used for building quality software.\n• Be able to apply these techniques in practice.",
            inhalt: "This course introduces theoretical and applied aspects of software engineering, including: \n• requirements\n• specifications and documentation\n• formal and informal modelling\n• modularity\n• testing and concolic execution.\nThe theoretical foundations provided in the lecture, from understanding requirements over design and implementation to deployment and change requests, will be applied by the students in a mandatory project that spans the whole semester: developing, as a team, a small multiplayer game with graphical user interface and network support.\n\nLectures and project use C++, and we expect knowledge corresponding to lecture 252-0856 Computer Science."
        },
        "Design of High Performance Computing": {
            kurzbeschreibung: "Advanced topics in parallel and high-performance computing.",
            lernziel: "Understand concurrency paradigms and models from a higher perspective and acquire skills for designing, structuring and developing possibly large parallel high-performance software systems. \n\nBecome able to distinguish parallelism in problem space and in machine space. Become familiar with important technical concepts and with concurrency folklore.",
            inhalt: "We will cover all aspects of high-performance computing ranging from architecture through programming up to algorithms. \nWe will start with a discussion of caches and cache coherence in practical computer systems. \nWe will dive into parallel programming concepts such as memory models, locks, and lock-free. \nWe will cover performance modeling and parallel design principles as well as basic parallel algorithms."
        },
        "Introduction into Machine Learning": {
            kurzbeschreibung: "The course introduces the foundations of learning and making predictions based on data.",
            lernziel: "The course will introduce the foundations of learning and making predictions from data. We will study basic concepts such as trading goodness of fit and model complexitiy. We will discuss important machine learning algorithms used in practice, and provide hands-on experience in a course project.",
            inhalt: "• Linear regression (overfitting, cross-validation/bootstrap, model selection, regularization, [stochastic] gradient descent)\n• Linear classification: Logistic regression (feature selection, sparsity, multi-class)\n• Kernels and the kernel trick (Properties of kernels; applications to linear and logistic regression); k-nearest neighbor\n• Neural networks (backpropagation, regularization, convolutional neural networks)\n• Unsupervised learning (k-means, PCA, neural network autoencoders)\n• The statistical perspective (regularization as prior; loss as likelihood; learning as MAP inference)\n• Statistical decision theory (decision making based on statistical models and utility functions)\n• Discriminative vs. generative modeling (benefits and challenges in modeling joint vy. conditional distributions)\n• Bayes' classifiers (Naive Bayes, Gaussian Bayes; MLE)\n• Bayesian approaches to unsupervised learning (Gaussian mixtures, EM)"
        },
        "Wissenschaft im Kontext": {
            kurzbeschreibung: "Wissenschaftliches Arbeiten und Methodenkompetenz",
            lernziel: "Erlangung von Methodenkompetenzen für wissenschaftliches Arbeiten im Studium und in der beruflichen Praxis",
            inhalt: "Wissenschaftliche Methoden, Recherche, wissenschaftliches Schreiben"
        },
        "Fallstudien": {
            kurzbeschreibung: "Praktische Anwendung der im Studium erlernten Fähigkeiten in einem Praxisprojekt",
            lernziel: "Fähigkeit zum selbständigen Bearbeiten einer Aufgabenstellung aus der Praxis",
            inhalt: "Projektarbeit in Teams an realen Problemstellungen"
        },
        "Bachelorarbeit": {
            kurzbeschreibung: "Selbständige Bearbeitung eines wissenschaftlichen Themas",
            lernziel: "Erlernen und Anwenden wissenschaftlicher Methoden, selbstständiges Bearbeiten einer wissenschaftlichen Fragestellung",
            inhalt: "Individuell definiertes wissenschaftliches Projekt"
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