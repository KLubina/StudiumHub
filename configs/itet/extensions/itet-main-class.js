/* ==== ITET HAUPTKLASSE ==== */
/* ITETStudienplan Klasse mit allen Properties und Basis-Funktionalität */

window.ITETStudienplan = class ITETStudienplan extends StudienplanBase {
    constructor(config) {
        super(config);
        
        // KP-Counter Properties
        this.kpCounter = null;
        
        // Praktika Properties
        this.isPraktikaTooltipLocked = false;
        this.selectedPraktika = this.loadSelectedPraktika();
        
        // Verfügbare Praktika, Projekte und Seminare
        this.praktikaModule = [
            { name: "Amateurfunk-Kurs", kp: 1.5, kategorie: "wahl-praktika-projekte" },
            { name: "COMSOL Design Tool – Design of Optical Components", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Microcontrollers for Sensors and the Internet of Things", kp: 4, kategorie: "wahl-praktika-projekte" },
            { name: "FPGA in Quantum Computing with Superconducting Qubits", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Neural Network on Low Power FPGA", kp: 2, kategorie: "wahl-praktika-projekte" },
            { name: "Bluetooth Low Energy Programming for IoT Sensing System", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Spiking Neural Network on Neuromorphic Processors", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Electronic Circuits & Signals Exploration Laboratory", kp: 2, kategorie: "wahl-praktika-projekte" },
            { name: "Assembling and Controlling a Tuning-Fork AFM", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Technical and Economic Aspects of Renewable Energy Supply", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Python for Engineers", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Machine Learning for Brain-Computer Interfaces", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Bau eines drahtlosen Infrarot-Kopfhörers", kp: 2, kategorie: "wahl-praktika-projekte" },
            { name: "Bits on Air", kp: 2, kategorie: "wahl-praktika-projekte" },
            { name: "Software Defined Radio", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Quad-Rotors: Control and Estimation", kp: 2, kategorie: "wahl-praktika-projekte" },
            { name: "RoboCup: Learning and Control", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Magnetresonanz: Vom Spektrum zum Bild", kp: 1, kategorie: "wahl-praktika-projekte" },
            { name: "Biosignal Acquisition and Processing for IoT Wearable Devices", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Android Application Development (AAD)", kp: 4, kategorie: "wahl-praktika-projekte" },
            { name: "iCEBreaker FPGA For IoT Sensing Systems", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Embedded Deep Learning with Huawei Atlas 200 AI Dev Kit", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Vision Goes Vegas", kp: 2, kategorie: "wahl-praktika-projekte" },
            { name: "Magnetische Felder im Alltag", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Accelerating Genome Analysis with FPGAs, GPUs", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Exploration of Emerging Memory Systems", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "FPGA-based Exploration of DRAM and RowHammer", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Genome Sequencing on Mobile Devices", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Memory-Centric Computing", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Controlling Biological Neuronal Networks Using Machine Learning", kp: 4, kategorie: "wahl-praktika-projekte" },
            { name: "Python for Science & Machine Learning", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Memory Design: From Architecture down to Basic Cells", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Building a receive coil for MRI", kp: 1.5, kategorie: "wahl-praktika-projekte" },
            { name: "Clean Room Technology – Fabrication and Characterization", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Understanding and Designing Modern SSDs", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Robotic Maze Solving with a TI-RSLK Robot", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Embedded Systems With Drones", kp: 4, kategorie: "wahl-praktika-projekte" },
            { name: "Machine Learning on Smart Phone", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Introduction to Program Nao Robots for Robocup", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Smart Patch Projects", kp: 4, kategorie: "wahl-praktika-projekte" },
            { name: "Programming Heterogeneous Computing Systems", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Optics and Spectroscopy Lab", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Our Daily Exposure to Electromagnetic Radiation", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Intelligent Architectures via Hardware/Software Cooperation", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Wearable Ultrasound: Tools and Technologies", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Autonomous Cars and Robots", kp: 4, kategorie: "wahl-praktika-projekte" },
            { name: "Erneuerbare Energien und Netto-Null-Emissions-Ziel", kp: 2, kategorie: "wahl-praktika-projekte" },
            { name: "Enabling Smart and Low Power IoT Sensor Nodes", kp: 4, kategorie: "wahl-praktika-projekte" },
            { name: "Gibbs? Clifford!", kp: 2, kategorie: "wahl-praktika-projekte" },
            { name: "Image-guided digital twinning of cardiac anatomy", kp: 2, kategorie: "wahl-praktika-projekte" },
            { name: "Coding Algorithms for a Scavenger Hunt", kp: 1, kategorie: "wahl-praktika-projekte" },
            { name: "Clinical Genomics", kp: 4, kategorie: "wahl-praktika-projekte" },
            { name: "Digital Audio", kp: 4, kategorie: "wahl-praktika-projekte" },
            { name: "Let's make ITET green!", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Echoes in Action: Designing Piezoelectric Transducers", kp: 2, kategorie: "wahl-praktika-projekte" },
            { name: "Radio Frequency Electromagnetic Fields", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Capture the Flag – Introduction to Cybersecurity", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Exploration Project", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Mission impossible: CartPole4.0", kp: 2, kategorie: "wahl-praktika-projekte" },
            { name: "Audio Electronics and Music Production Technology", kp: 1, kategorie: "wahl-praktika-projekte" },
            { name: "From Software Applications to FPGA Designs", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Practical Antenna Design, Implementation, and Measurement", kp: 3, kategorie: "wahl-praktika-projekte" },
            { name: "Hands-On Deep Learning", kp: 2, kategorie: "wahl-praktika-projekte" },
            { name: "Applied Circuit and PCB-Design", kp: 2, kategorie: "wahl-praktika-projekte" }
        ];
    }

    initialize() {
        super.initialize();
        
        // Initialisiere alle Systeme
        this.initializeKPCounter();
        this.initializePraktikaSystem();
        this.updateKPDisplay();
        this.updatePraktikaDisplay();
        
        console.log('✅ ITETStudienplan initialisiert');
    }

    // Platzhalter-Methoden (werden von anderen Modulen überschrieben)
    initializeKPCounter() {
        console.log('🔄 KP-Counter wird initialisiert...');
    }

    initializePraktikaSystem() {
        console.log('🔄 Praktika-System wird initialisiert...');
    }

    updateKPDisplay() {
        console.log('🔄 KP-Display wird aktualisiert...');
    }

    updatePraktikaDisplay() {
        console.log('🔄 Praktika-Display wird aktualisiert...');
    }

    // Basis-Methode für Datenpersistierung (wird überschrieben)
    loadSelectedPraktika() {
        return {};
    }
};

// Globale Referenz setzen
window.StudiengangCustomClass = window.ITETStudienplan;

console.log('✅ ITETStudienplan Hauptklasse definiert');