/* ==== MTEC STUDIENGANG KONFIGURATION - OPTIMIERT ==== */

window.StudiengangConfig = {
    // Grundlegende Informationen
    title: "MSc Management, Technology, and Economics (MTEC)",
    subtitle: "mind. 120 KP insgesamt",
    legendTitle: "Farben-Legende & Anforderungen",
    creditUnit: "KP",
    
// Layout-Konfiguration - PROPORTIONAL OPTIMIERT
    layout: "categories",
    moduleSizing: "proportional", 
    basisArea: 2800, // Reduziert für bessere Proportionalität
    defaultAspectRatio: 2.2, // Breiter für kompaktere Darstellung
    layoutClass: "horizontal-fachgebiete", // Spezielle Layout-Klasse
    
    // Features
    enableTooltips: true,
    enableHover: true,
    
    // Kategorien mit Beschreibungen - KOMPAKTER
    kategorien: [
        { 
            name: "Core Courses", 
            klasse: "core",
            description: "mind. 51 KP - Pflichtmodule"
        },
        { 
            name: "Elective Courses", 
            klasse: "elective",
            description: "mind. 10 KP - Wahlmodule"
        },
        { 
            name: "Supplementary Courses", 
            klasse: "supplementary",
            description: "mind. 12 KP - Ergänzungsmodule"
        },
        { 
            name: "Master's Thesis", 
            klasse: "thesis",
            description: "30 KP - Abschlussarbeit"
        },
        { 
            name: "Internship", 
            klasse: "internship",
            description: "6 KP - Pflichtpraktikum"
        }
    ],
    
    kategorieZuKlasse: {
        "Core Courses": "core",
        "Elective Courses": "elective",
        "Supplementary Courses": "supplementary",
        "Master's Thesis": "thesis",
        "Internship": "internship"
    },
    
    // Moduldaten - KOMPAKT MIT FACHGEBIETEN
    daten: [
        // Core Courses: 1. General Management and Human Resource Management
        { name: "Introduction to Management", kp: 3, kategorie: "Core Courses", fachgebiet: "Management & HR" },
        { name: "Human Resource Management: Leading Teams", kp: 3, kategorie: "Core Courses", fachgebiet: "Management & HR" },
        { name: "Responsible Leadership", kp: 3, kategorie: "Core Courses", fachgebiet: "Management & HR" },
        
        // Core Courses: 2. Strategy, Markets and Technology
        { name: "Strategic Management", kp: 3, kategorie: "Core Courses", fachgebiet: "Strategy & Technology" },
        { name: "Corporate Sustainability", kp: 3, kategorie: "Core Courses", fachgebiet: "Strategy & Technology" },
        { name: "Technology and Innovation Management", kp: 3, kategorie: "Core Courses", fachgebiet: "Strategy & Technology" },
        { name: "Introduction to Marketing", kp: 3, kategorie: "Core Courses", fachgebiet: "Strategy & Technology" },
        { name: "Entrepreneurship", kp: 3, kategorie: "Core Courses", fachgebiet: "Strategy & Technology" },
        
        // Core Courses: 3. Information Management and Operations Management
        { name: "Management of Digital Transformation", kp: 3, kategorie: "Core Courses", fachgebiet: "Operations & IT" },
        { name: "Production and Operations Management", kp: 3, kategorie: "Core Courses", fachgebiet: "Operations & IT" },
        { name: "Strategic Supply Chain Management", kp: 3, kategorie: "Core Courses", fachgebiet: "Operations & IT" },
        
        // Core Courses: 4. Quantitative and Qualitative Methods
        { name: "Operations Research", kp: 3, kategorie: "Core Courses", fachgebiet: "Methods" },
        { name: "Economic Dynamics and Complexity", kp: 3, kategorie: "Core Courses", fachgebiet: "Methods" },
        { name: "Empirical Methods in Management", kp: 3, kategorie: "Core Courses", fachgebiet: "Methods" },
        { name: "Principles of Econometrics", kp: 3, kategorie: "Core Courses", fachgebiet: "Methods" },
        
        // Core Courses: 5. Micro and Macroeconomics
        { name: "Principles of Macroeconomics", kp: 3, kategorie: "Core Courses", fachgebiet: "Economics" },
        { name: "Principles of Microeconomics", kp: 3, kategorie: "Core Courses", fachgebiet: "Economics" },
        { name: "Sustainability Economics", kp: 3, kategorie: "Core Courses", fachgebiet: "Economics" },
        { name: "Economic Growth, Cycles and Policy", kp: 3, kategorie: "Core Courses", fachgebiet: "Economics" },
        { name: "Markets and Games", kp: 3, kategorie: "Core Courses", fachgebiet: "Economics" },
        
        // Core Courses: 6. Financial Management
        { name: "Accounting for Managers", kp: 3, kategorie: "Core Courses", fachgebiet: "Finance" },
        { name: "Introduction to Finance", kp: 3, kategorie: "Core Courses", fachgebiet: "Finance" },
        { name: "Advanced Finance", kp: 3, kategorie: "Core Courses", fachgebiet: "Finance" },
        
        // Elective courses - mit Fachgebieten
        { name: "Social Data Science", kp: 2, kategorie: "Elective Courses", fachgebiet: "Systems Design & Risks" },
        { name: "Risk and Insurance Economics", kp: 3, kategorie: "Elective Courses", fachgebiet: "Systems Design & Risks" },
        { name: "Semester Project Small", kp: 3, kategorie: "Elective Courses", fachgebiet: "Additional Courses" },
        { name: "Semester Project Large", kp: 6, kategorie: "Elective Courses", fachgebiet: "Additional Courses" },
        
        // Supplementary courses - als ein großes Modul
        { name: "Supplementary Courses", kp: 12, kategorie: "Supplementary Courses" },
        
        // Master's Thesis and Internship - prominent dargestellt
        { name: "Master's Thesis", kp: 30, kategorie: "Master's Thesis" },
        { name: "Internship", kp: 6, kategorie: "Internship" }
    ],
    
    // Modul-Details für Tooltips
    modulDetails: {
        "Introduction to Management": {
            kurzbeschreibung: "Introduction to general management following a systemic view of organizations using the congruence model framework",
            inhalt:
                "• Organizations as open systems and their critical elements\n" +
                "• Conceptual tools and methods for organizational analysis\n" +
                "• Different notions of organizational performance\n" +
                "• Relationships between critical organizational elements\n" +
                "• Impact of internal and external change\n" +
                "• Input from external environment\n" +
                "• Strategy development and implementation\n" +
                "• People and human resources\n" +
                "• Work design and processes\n" +
                "• Formal and informal organizational structure\n" +
                "• Organizational outputs and performance measurement"
        },
        "Human Resource Management: Leading Teams": {
            kurzbeschreibung: "Basic processes of human resource management embedded in the broader context of team leadership",
            inhalt:
                "• Basic HRM functions and leadership relationship\n" +
                "• Employee selection instruments and methods\n" +
                "• Performance appraisal systems\n" +
                "• Compensation and reward systems\n" +
                "• Career development and personnel development\n" +
                "• Leadership requirements and success factors\n" +
                "• Fundamental team processes\n" +
                "• Team diversity management\n" +
                "• HRM policies and practices\n" +
                "• Company projects with real-world HRM applications"
        },
        "Responsible Leadership": {
            kurzbeschreibung: "Different leadership styles and how power and leadership play out in social interactions with emphasis on personal development",
            inhalt:
                "• Leadership styles and theories\n" +
                "• Communication and interpersonal skills\n" +
                "• Team agility and dynamics\n" +
                "• Power dynamics and ethics in leadership\n" +
                "• Diversity and discrimination issues\n" +
                "• Leadership and innovation\n" +
                "• Hierarchical workplace relationships\n" +
                "• Social and emotional leadership skills\n" +
                "• Integrity and ethical decision-making\n" +
                "• Personal leadership development"
        },
        "Strategic Management": {
            kurzbeschreibung: "Key competences, frameworks and methods for designing, implementing and executing strategy",
            inhalt:
                "• Core strategy concepts and frameworks\n" +
                "• Strategy and industry evolution\n" +
                "• Technology dynamics in strategy\n" +
                "• Resource-based view of the firm\n" +
                "• Knowledge-based view of the firm\n" +
                "• Case-based problem solving\n" +
                "• Executive testimonials and real-world applications\n" +
                "• Strategic analysis and development\n" +
                "• Contemporary strategizing challenges"
        },
        "Corporate Sustainability": {
            kurzbeschreibung: "Current challenges of corporate sustainability preparing students to become champions for sustainable business practices",
            inhalt:
                "• Role, potential, and limits of corporate sustainability\n" +
                "• Sustainability framework assessment for companies\n" +
                "• Concrete, actionable sustainability solutions\n" +
                "• Strategic sustainability recommendations\n" +
                "• Case-based experiential learning\n" +
                "• Reflective thinking and collaborative decision-making\n" +
                "• Group work on sustainability challenges\n" +
                "• Blended learning approaches"
        },
        "Technology and Innovation Management": {
            kurzbeschreibung: "Sources of innovation with focus on digital technologies, tools and techniques for routine innovation, and strategic implications of technical change",
            inhalt:
                "• Sources of innovation and digital technologies\n" +
                "• Organizational innovation tools and techniques\n" +
                "• Strategic implications of technical change\n" +
                "• Innovation processes and management\n" +
                "• Individual vs. organizational decision processes\n" +
                "• Digital technology impact on business organizations\n" +
                "• Resource allocation between known tasks and exploration\n" +
                "• Decision-making in volatile environments\n" +
                "• Guest speakers and case discussions"
        },
        "Introduction to Marketing": {
            kurzbeschreibung: "Overview of essential marketing perspectives and how marketing adds value to business with concepts, frameworks and methods for marketing decision making",
            inhalt:
                "• Marketing as value-creating activity\n" +
                "• Role of marketing within business\n" +
                "• Strategic marketing management decisions\n" +
                "• Marketing mix elements (product, price, promotion, place)\n" +
                "• Consumer behavior and its marketing impact\n" +
                "• Analytics and quantitative methods in marketing\n" +
                "• Marketing strategy and tactics\n" +
                "• Specific marketing contexts\n" +
                "• Data-driven marketing techniques"
        },
        "Entrepreneurship": {
            kurzbeschreibung: "Various elements important to start an innovative business including technology context, opportunity assessment, idea protection, market testing, team formation, and investment raising",
            inhalt:
                "• Science to technology commercialization\n" +
                "• Market research and design thinking\n" +
                "• Appropriability and value flow\n" +
                "• HR and team composition\n" +
                "• Capital raising from various sources\n" +
                "• Legal aspects and pitching\n" +
                "• Entrepreneurial opportunity identification\n" +
                "• Market assumption testing and business plan development\n" +
                "• Founding team dynamics\n" +
                "• Dragon's Den presentation"
        },
        "Principles of Macroeconomics": {
            kurzbeschreibung: "Examination of macroeconomic variables behavior including gross domestic product, unemployment and inflation rates",
            inhalt:
                "• Fundamentals of macroeconomic theory\n" +
                "• Living standards and economic growth\n" +
                "• Inflation and price level determination\n" +
                "• Government policy and its economic effects\n" +
                "• Taxation and its economic burdens\n" +
                "• Free trade effects and implications\n" +
                "• Government budget deficits\n" +
                "• Macroeconomic indicators and their interpretation\n" +
                "• Economic policy analysis"
        },
        "Introduction to Finance": {
            kurzbeschreibung: "Fundamental financial decisions encountered by corporate managers and application of financial theory to real-world challenges",
            inhalt:
                "• Time value of money\n" +
                "• Bond and stock valuation\n" +
                "• Net Present Value (NPV) analysis\n" +
                "• Risk and return analysis\n" +
                "• Capital budgeting techniques\n" +
                "• Corporate financing options\n" +
                "• Behavioral finance concepts\n" +
                "• Capital structure and payout policies\n" +
                "• Corporate objectives and governance\n" +
                "• Sustainability and finance interplay"
        },
        "Advanced Finance": {
            kurzbeschreibung: "Advanced financial decisions for corporate managers with sophisticated financial theory applications to practical challenges",
            inhalt:
                "• Options valuation techniques\n" +
                "• Debt financing and credit risk assessment\n" +
                "• Risk management with derivatives\n" +
                "• Financial planning and working capital management\n" +
                "• Mergers and corporate restructuring\n" +
                "• Fintech innovations and trends\n" +
                "• Sustainable finance principles\n" +
                "• Financial crises analysis\n" +
                "• Advanced financial risk assessment\n" +
                "• Integration of sustainability in financial decisions"
        },
        "Operations Research": {
            kurzbeschreibung: "Introduction to operations research methods in management science and economics with practical, problem-solving perspective",
            inhalt:
                "• System modeling techniques\n" +
                "• Linear programming\n" +
                "• Duality theory and shadow prices\n" +
                "• Integer programming\n" +
                "• Dynamic optimization\n" +
                "• Inventory management applications\n" +
                "• Production planning\n" +
                "• Supply chain management\n" +
                "• Transportation networks\n" +
                "• Revenue management\n" +
                "• Quantitative model integration in managerial decisions"
        },
        "Social Data Science": {
            kurzbeschreibung: "Techniques to analyze human behavior and social interaction through digital traces with data retrieval, processing, and analysis",
            inhalt:
                "• Digital trace data retrieval from online sources\n" +
                "• Online data storage, processing, and summarization\n" +
                "• Statistical analyses for hypothesis testing\n" +
                "• Theoretical principles of human behavior interpretation\n" +
                "• Observational data analysis limitations\n" +
                "• Collective behavior analysis\n" +
                "• Sentiment analysis techniques\n" +
                "• Social network analysis\n" +
                "• Search trends and popularity analysis\n" +
                "• Twitter network analysis"
        },
        "Management of Digital Transformation": {
            kurzbeschreibung: "Overview of digital transformation within organizations, opportunities and management challenges in transforming to the digital age",
            inhalt:
                "• Digital transformation strategies\n" +
                "• Business model patterns and platform companies\n" +
                "• Subscription models\n" +
                "• Organizing for digital transformation\n" +
                "• Agile organization development\n" +
                "• Digital transformation and technology\n" +
                "• Future-proof infrastructure\n" +
                "• Industry-specific digital transformation\n" +
                "• Healthcare digital transformation\n" +
                "• Automotive industry digitalization"
        },
        "Production and Operations Management": {
            kurzbeschreibung: "Basic theories, principles, concepts, and techniques to design, analyze, and improve organizational operational capabilities",
            inhalt:
                "• Manufacturing strategy development\n" +
                "• Forecasting and capacity planning\n" +
                "• Process design and mapping analysis\n" +
                "• Layout design and optimization\n" +
                "• Industry 4.0 concepts\n" +
                "• Information flow design\n" +
                "• Material flow management\n" +
                "• Logistics and supply chain management\n" +
                "• Performance management systems\n" +
                "• Quality management\n" +
                "• Problem-solving tools and techniques"
        },
        "Principles of Microeconomics": {
            kurzbeschreibung: "Basic principles, problems and approaches of microeconomics providing reflective and contextual knowledge on resource allocation",
            inhalt:
                "• Supply and demand analysis\n" +
                "• Consumer demand (neoclassical and behavioral perspectives)\n" +
                "• Cost of production\n" +
                "• Welfare economics\n" +
                "• Governmental policies analysis\n" +
                "• Market failures and externalities\n" +
                "• Public goods and tax systems\n" +
                "• Market forms and structures\n" +
                "• Firm and consumer behavior\n" +
                "• Behavioral economics concepts\n" +
                "• International trade\n" +
                "• Mathematical applications to economic problems"
        },
        "Principles of Econometrics": {
            kurzbeschreibung: "Fundamentals of econometrics covering simple and multiple regression analysis with emphasis on hypothesis testing and interpretation",
            inhalt:
                "• Different forms of data and their strengths/weaknesses\n" +
                "• Economic policy questions into testable research hypotheses\n" +
                "• STATA software applications\n" +
                "• Threats to causal interpretations\n" +
                "• Simple regression analysis\n" +
                "• Multiple regression techniques\n" +
                "• Hypothesis testing methods\n" +
                "• Model fitting and reliability\n" +
                "• Prediction precision\n" +
                "• Assumptions for causal effects"
        },
        "Accounting for Managers": {
            kurzbeschreibung: "Introduction to financial and managerial accounting for students aspiring for business and management careers",
            inhalt:
                "• Basic accounting concepts and systems\n" +
                "• Accounting cycle and reporting process\n" +
                "• Financial statements analysis\n" +
                "• Revenues, expenses, assets, liabilities, equities\n" +
                "• Cost behavior and estimation\n" +
                "• Cost-Volume-Profit (CVP) analyses\n" +
                "• Relevant costing techniques\n" +
                "• Budgeting processes\n" +
                "• Standard costing systems\n" +
                "• Managerial accounting decision-making"
        },
        "Sustainability Economics": {
            kurzbeschreibung: "Economic perspective and core tools for private and public sustainability management covering dynamic systems, trade-offs, and business/policy tools",
            inhalt:
                "• Standard sustainability definitions and measurement\n" +
                "• Core trade-offs and sustainability challenges\n" +
                "• Dynamic systems modeling\n" +
                "• Consumer demand quantification for environmental goods\n" +
                "• Sustainability investment costs and benefits\n" +
                "• Environmental systems valuation methods\n" +
                "• Cost-benefit analysis for sustainability\n" +
                "• Private vs. public sector roles\n" +
                "• Innovation's role in sustainability\n" +
                "• Energy resources, climate change, biodiversity\n" +
                "• Air pollution economics"
        },
        "Strategic Supply Chain Management": {
            kurzbeschreibung: "Theory and practice of supply chain management with development of supply chain strategies and networks based on competitive strategies",
            inhalt:
                "• Supply chain management importance for strategy\n" +
                "• Supply chain optimization tools and methods\n" +
                "• Supply chain network designs\n" +
                "• Fundamental logistics and supply chain concepts\n" +
                "• Trade-offs between efficiency and responsiveness\n" +
                "• Facilities and inventory management\n" +
                "• Transportation and logistics\n" +
                "• Information infrastructure\n" +
                "• Sourcing decisions and pricing\n" +
                "• Forecasting methods\n" +
                "• Network design modeling"
        },
        "Economic Dynamics and Complexity": {
            kurzbeschreibung: "Complex networks examination of systemic risk in financial markets and global supply networks through interactions among firms, institutions, and countries",
            inhalt:
                "• Complex networks foundations and economic relevance\n" +
                "• Network metrics and economic interpretation\n" +
                "• Economic systems as networks (input-output, financial, trade)\n" +
                "• Game theory and strategic interactions on networks\n" +
                "• Dynamic processes and resilience\n" +
                "• Systemic risk characterization\n" +
                "• Power, vulnerability, and resilience analysis\n" +
                "• Contagion, diffusion, and growth simulation\n" +
                "• Policy implications and network-based perspective\n" +
                "• Python coding and real-world economic datasets"
        },
        "Empirical Methods in Management": {
            kurzbeschreibung: "Understanding and conducting empirical research enabling evidence-based business management decision-making",
            inhalt:
                "• Basic principles of empirical studies\n" +
                "• Research question formulation\n" +
                "• Empirical study design\n" +
                "• Qualitative and quantitative research methods\n" +
                "• Interview conducting and evaluation\n" +
                "• Measurement and scaling methods\n" +
                "• Experimental design\n" +
                "• Variance analysis\n" +
                "• Statistical software usage (SPSS or R)\n" +
                "• Data analysis using basic statistical approaches"
        },
        "Economic Growth, Cycles and Policy": {
            kurzbeschreibung: "Core thinking devices and foundations in macroeconomics and monetary economics for understanding growth, cycles, crises and policy conduct",
            inhalt:
                "• IS-LM Model applications\n" +
                "• Macroeconomic schools of thought\n" +
                "• Consumption and investment analysis\n" +
                "• Solow Growth Model\n" +
                "• Money holding, inflation, and monetary policy\n" +
                "• Market economy crises\n" +
                "• Open economy analysis\n" +
                "• Exchange rate theories\n" +
                "• Economic growth drivers (short and long run)\n" +
                "• Key macroeconomic variables and patterns\n" +
                "• Fiscal policy conduct"
        },
        "Markets and Games": {
            kurzbeschreibung: "Foundations of microeconomics covering markets and game theory with theoretical tools for analyzing strategic behavior in industrial organization",
            inhalt:
                "• Normal-form games\n" +
                "• Extensive-form games\n" +
                "• Strategic interactions analysis\n" +
                "• Monopoly firm behavior\n" +
                "• Market competition models\n" +
                "• Collusion and mergers\n" +
                "• Competition law applications\n" +
                "• Market competition with innovation/R&D\n" +
                "• Market competition with advertising\n" +
                "• Firm and market behavior predictions\n" +
                "• Market regulations benefits and costs"
        },
        "Risk and Insurance Economics": {
            kurzbeschreibung: "Individual decision-making under uncertainty covering risk attitudes, insurance demand and supply, information issues, and macroeconomic role of insurers",
            inhalt:
                "• Risk-based decision making\n" +
                "• Expected Utility theory vs. empirical behavior\n" +
                "• Insurance purchase and provision rationale\n" +
                "• Optimal insurance demand levels\n" +
                "• Information asymmetries in insurance markets\n" +
                "• Behavioral economics applications\n" +
                "• Insurance regulation\n" +
                "• Macroeconomic role of insurers\n" +
                "• Decision theory refinements\n" +
                "• Individual uncertainty decision-making"
        },
        "Semester Project Small": {
            kurzbeschreibung: "Training in solution of specific engineering problems using technical and social skills from the master's program",
            inhalt:
                "• Specific engineering problem solving\n" +
                "• Technical skills application\n" +
                "• Social skills integration\n" +
                "• Project planning and execution\n" +
                "• Tutor guidance and mentoring\n" +
                "• Roadmap development with students\n" +
                "• Execution monitoring and evaluation"
        },
        "Semester Project Large": {
            kurzbeschreibung: "Comprehensive training in solution of complex engineering problems using advanced technical and social skills from the master's program",
            inhalt:
                "• Complex engineering problem solving\n" +
                "• Advanced technical skills application\n" +
                "• Enhanced social skills integration\n" +
                "• Extended project planning and execution\n" +
                "• Comprehensive tutor guidance\n" +
                "• Detailed roadmap development\n" +
                "• Intensive execution monitoring\n" +
                "• Advanced evaluation methodologies"
        },
        "Supplementary Courses": {
            kurzbeschreibung: "Complementary courses from various fields to broaden knowledge base and enhance interdisciplinary understanding",
            inhalt:
                "• Courses from natural sciences, engineering, or mathematics\n" +
                "• Interdisciplinary learning opportunities\n" +
                "• Technical skill enhancement\n" +
                "• Research methodology\n" +
                "• Statistical analysis techniques\n" +
                "• Programming and computational skills\n" +
                "• Scientific communication\n" +
                "• Individual learning path customization"
        },
        "Master's Thesis": {
            kurzbeschreibung: "Independent research project demonstrating mastery of knowledge and research skills in management, technology, and economics",
            inhalt:
                "• Independent research design and execution\n" +
                "• Literature review and theoretical framework\n" +
                "• Research methodology and data collection\n" +
                "• Data analysis and interpretation\n" +
                "• Scientific writing and presentation\n" +
                "• Critical thinking and problem-solving\n" +
                "• Academic supervision and guidance\n" +
                "• Original contribution to knowledge\n" +
                "• Professional research standards"
        },
        "Internship": {
            kurzbeschreibung: "Practical work experience in industry, consulting, or research organizations to apply academic knowledge in real-world settings",
            inhalt:
                "• Professional work experience\n" +
                "• Application of academic knowledge\n" +
                "• Industry exposure and networking\n" +
                "• Practical skill development\n" +
                "• Professional communication\n" +
                "• Project management experience\n" +
                "• Career development and exploration\n" +
                "• Reflection on learning outcomes\n" +
                "• Integration of theory and practice"
        }
    },
    
    // Custom Sizing für bessere Kompaktheit
    customSizing: function(div, modul) {
        let width = 160;
        let height = 70;
        
        // Spezielle Größen für besondere Module
        if (modul.name === "Master's Thesis") {
            width = 200;
            height = 120;
        } else if (modul.name === "Supplementary Courses") {
            width = 180;
            height = 90;
        } else if (modul.name === "Semester Project Large") {
            width = 180;
            height = 80;
        } else if (modul.kp >= 10) {
            width = Math.max(160, modul.kp * 8);
            height = Math.max(70, modul.kp * 4);
        }
        
        // Namen kürzen wenn zu lang
        if (modul.name.length > 35) {
            const shortName = this.shortenModuleName(modul.name);
            div.title = modul.name; // Vollständiger Name als Tooltip
            const titleEl = div.querySelector('.modul-titel');
            if (titleEl) {
                titleEl.textContent = shortName;
            }
        }
        
        div.style.width = `${width}px`;
        div.style.height = `${height}px`;
    },
    
    // Hilfsfunktion zum Kürzen von Modulnamen
    shortenModuleName: function(name) {
        if (name.includes("Management")) {
            return name.replace("Management", "Mgmt");
        }
        if (name.includes("and")) {
            return name.replace(" and ", " & ");
        }
        if (name.includes("Introduction to")) {
            return name.replace("Introduction to ", "Intro ");
        }
        if (name.includes("Principles of")) {
            return name.replace("Principles of ", "");
        }
        if (name.length > 35) {
            return name.substring(0, 32) + "...";
        }
        return name;
    }
};

/* ==== MTEC-SPEZIFISCHE LAYOUT-KLASSE ==== */
window.StudiengangClass = class MTECStudienplan extends StudienplanBase {
    constructor(config) {
        super(config);
    }
    
    // Überschreibe die Fachgebiet-Layout-Erstellung für horizontale Darstellung
    createFachgebietLayout(container, modules) {
        const fachgebiete = [...new Set(modules.map(m => m.fachgebiet).filter(f => f))];
        
        fachgebiete.forEach(fachgebiet => {
            // Fachgebiet-Label
            const fachgebietLabel = document.createElement('div');
            fachgebietLabel.classList.add('fachgebiet');
            fachgebietLabel.textContent = fachgebiet;
            container.appendChild(fachgebietLabel);
            
            // Module horizontal in Container
            const moduleContainer = document.createElement('div');
            moduleContainer.classList.add('module-container');
            moduleContainer.style.display = 'flex';
            moduleContainer.style.flexWrap = 'wrap';
            moduleContainer.style.gap = '5px';
            moduleContainer.style.marginBottom = '15px';
            
            const fachgebietModules = modules.filter(m => m.fachgebiet === fachgebiet);
            fachgebietModules.forEach(m => this.createModule(m, moduleContainer));
            
            container.appendChild(moduleContainer);
        });
        
        // Module ohne Fachgebiet
        const ohneGebiet = modules.filter(m => !m.fachgebiet);
        if (ohneGebiet.length > 0) {
            const moduleContainer = document.createElement('div');
            moduleContainer.classList.add('module-container');
            moduleContainer.style.display = 'flex';
            moduleContainer.style.flexWrap = 'wrap';
            moduleContainer.style.gap = '5px';
            moduleContainer.style.marginBottom = '15px';
            
            ohneGebiet.forEach(m => this.createModule(m, moduleContainer));
            container.appendChild(moduleContainer);
        }
    }
};