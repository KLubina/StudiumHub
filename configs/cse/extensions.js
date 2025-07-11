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

    // Block-Prüfungen-Rechner Button hinzufügen
    const calculatorButton = document.createElement("div");
    calculatorButton.style.marginTop = "15px";
    calculatorButton.style.padding = "10px";
    calculatorButton.style.backgroundColor = "#4CAF50";
    calculatorButton.style.color = "white";
    calculatorButton.style.borderRadius = "5px";
    calculatorButton.style.cursor = "pointer";
    calculatorButton.style.textAlign = "center";
    calculatorButton.style.fontWeight = "bold";
    calculatorButton.innerHTML = "📊 Block-Prüfungen-Rechner";
    calculatorButton.addEventListener("click", () => this.showGradeCalculator());
    coloringControls.appendChild(calculatorButton);

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
      
      // WICHTIG: Inline-Styles auch entfernen!
      modulEl.style.backgroundColor = '';
      modulEl.style.color = '';

      // Neue CSS-Klasse hinzufügen
      const cssClass = this.getModuleCssClass(modul);
      if (cssClass) {
        modulEl.classList.add(cssClass);
        console.log(`✓ Angewendete Klasse für "${modulName}": ${cssClass}`);
        
        // Nur im Themenbereich-Modus Inline-Styles als Backup setzen
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

  showGradeCalculator() {
    // Modal-Container erstellen
    const modal = document.createElement("div");
    modal.id = "grade-calculator-modal";
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        z-index: 2000;
        display: flex;
        justify-content: center;
        align-items: center;
    `;

    // Modal-Inhalt
    const modalContent = document.createElement("div");
    modalContent.style.cssText = `
        background: white;
        border-radius: 10px;
        padding: 20px;
        max-width: 900px;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        position: relative;
    `;

    modalContent.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 2px solid #eee; padding-bottom: 10px;">
            <h2 style="margin: 0; color: #1F77B4;">📊 Block-Prüfungen-Rechner</h2>
            <button id="close-calculator" style="background: #ff4444; color: white; border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer; font-size: 16px;">×</button>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <!-- Eingabe-Bereich -->
            <div>
                <h3 style="color: #8064A2; border-bottom: 1px solid #eee; padding-bottom: 5px;">Noten eingeben</h3>
                
                <!-- Basisprüfungsblock 1 -->
                <div class="block-section" style="margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px;">
                    <h4 style="margin: 0 0 10px 0; color: #8064A2;">Basisprüfungsblock 1</h4>
                    <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 10px; align-items: center;">
                        <label>Lineare Algebra (33%):</label>
                        <input type="number" id="la" min="1" max="6" step="0.1" placeholder="Note" style="padding: 5px; border: 1px solid #ddd; border-radius: 4px;">
                        
                        <label>Informatik (33%):</label>
                        <input type="number" id="inf" min="1" max="6" step="0.1" placeholder="Note" style="padding: 5px; border: 1px solid #ddd; border-radius: 4px;">
                        
                        <label>Diskrete Mathematik (33%):</label>
                        <input type="number" id="dm" min="1" max="6" step="0.1" placeholder="Note" style="padding: 5px; border: 1px solid #ddd; border-radius: 4px;">
                    </div>
                    <div style="margin-top: 10px; font-weight: bold; color: #8064A2;">
                        BP1 Ergebnis: <span id="bp1-result">-</span>
                    </div>
                </div>

                <!-- Basisprüfungsblock 2 -->
                <div class="block-section" style="margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px;">
                    <h4 style="margin: 0 0 10px 0; color: #1F77B4;">Basisprüfungsblock 2</h4>
                    <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 10px; align-items: center;">
                        <label>Analysis I (16%):</label>
                        <input type="number" id="ai" min="1" max="6" step="0.1" placeholder="Note" style="padding: 5px; border: 1px solid #ddd; border-radius: 4px;">
                        
                        <label>Analysis II (16%):</label>
                        <input type="number" id="aii" min="1" max="6" step="0.1" placeholder="Note" style="padding: 5px; border: 1px solid #ddd; border-radius: 4px;">
                        
                        <label>Physik I (11%):</label>
                        <input type="number" id="phyi" min="1" max="6" step="0.1" placeholder="Note" style="padding: 5px; border: 1px solid #ddd; border-radius: 4px;">
                        
                        <label>Physik II (11%):</label>
                        <input type="number" id="phyii" min="1" max="6" step="0.1" placeholder="Note" style="padding: 5px; border: 1px solid #ddd; border-radius: 4px;">
                        
                        <label>Komplexe Analysis (11%):</label>
                        <input type="number" id="ka" min="1" max="6" step="0.1" placeholder="Note" style="padding: 5px; border: 1px solid #ddd; border-radius: 4px;">
                        
                        <label>Datenstrukturen & Algorithmen (22%):</label>
                        <input type="number" id="dsa" min="1" max="6" step="0.1" placeholder="Note" style="padding: 5px; border: 1px solid #ddd; border-radius: 4px;">
                        
                        <label>Chemie (11%):</label>
                        <input type="number" id="chem" min="1" max="6" step="0.1" placeholder="Note" style="padding: 5px; border: 1px solid #ddd; border-radius: 4px;">
                    </div>
                    <div style="margin-top: 10px; font-weight: bold; color: #1F77B4;">
                        BP2 Ergebnis: <span id="bp2-result">-</span>
                    </div>
                </div>

                <!-- Prüfungsblock G1 -->
                <div class="block-section" style="margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px;">
                    <h4 style="margin: 0 0 10px 0; color: #8DC63F;">Prüfungsblock G1</h4>
                    <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 10px; align-items: center;">
                        <label>Analysis III (25%):</label>
                        <input type="number" id="aiii" min="1" max="6" step="0.1" placeholder="Note" style="padding: 5px; border: 1px solid #ddd; border-radius: 4px;">
                        
                        <label>Mathematical Optimization (25%):</label>
                        <input type="number" id="mo" min="1" max="6" step="0.1" placeholder="Note" style="padding: 5px; border: 1px solid #ddd; border-radius: 4px;">
                        
                        <label>Numerische Methoden CSE (50%):</label>
                        <input type="number" id="nmcse" min="1" max="6" step="0.1" placeholder="Note" style="padding: 5px; border: 1px solid #ddd; border-radius: 4px;">
                    </div>
                    <div style="margin-top: 10px; font-weight: bold; color: #8DC63F;">
                        PB-G1 Ergebnis: <span id="pbg1-result">-</span>
                    </div>
                </div>

                <!-- Prüfungsblock G2 -->
                <div class="block-section" style="margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px;">
                    <h4 style="margin: 0 0 10px 0; color: #E671B8;">Prüfungsblock G2</h4>
                    <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 10px; align-items: center;">
                        <label>Programmiertechniken phys. Sim. (50%):</label>
                        <input type="number" id="ps" min="1" max="6" step="0.1" placeholder="Note" style="padding: 5px; border: 1px solid #ddd; border-radius: 4px;">
                        
                        <label>Systems Programming & CA (50%):</label>
                        <input type="number" id="spca" min="1" max="6" step="0.1" placeholder="Note" style="padding: 5px; border: 1px solid #ddd; border-radius: 4px;">
                    </div>
                    <div style="margin-top: 10px; font-weight: bold; color: #E671B8;">
                        PB-G2 Ergebnis: <span id="pbg2-result">-</span>
                    </div>
                </div>

                <!-- Prüfungsblock G3 -->
                <div class="block-section" style="margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px;">
                    <h4 style="margin: 0 0 10px 0; color: #4CAF50;">Prüfungsblock G3</h4>
                    <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 10px; align-items: center;">
                        <label>Numerical Methods PDE (66%):</label>
                        <input type="number" id="nmpde" min="1" max="6" step="0.1" placeholder="Note" style="padding: 5px; border: 1px solid #ddd; border-radius: 4px;">
                        
                        <label>Stochastik (33%):</label>
                        <input type="number" id="stoch" min="1" max="6" step="0.1" placeholder="Note" style="padding: 5px; border: 1px solid #ddd; border-radius: 4px;">
                    </div>
                    <div style="margin-top: 10px; font-weight: bold; color: #4CAF50;">
                        PB-G3 Ergebnis: <span id="pbg3-result">-</span>
                    </div>
                </div>

                <!-- Prüfungsblock G4 -->
                <div class="block-section" style="margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px;">
                    <h4 style="margin: 0 0 10px 0; color: #D32F2F;">Prüfungsblock G4</h4>
                    <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 10px; align-items: center;">
                        <label>Fluiddynamik I (50%):</label>
                        <input type="number" id="fdi" min="1" max="6" step="0.1" placeholder="Note" style="padding: 5px; border: 1px solid #ddd; border-radius: 4px;">
                        
                        <label>Statistische Physik & CS (50%):</label>
                        <input type="number" id="spcs" min="1" max="6" step="0.1" placeholder="Note" style="padding: 5px; border: 1px solid #ddd; border-radius: 4px;">
                    </div>
                    <div style="margin-top: 10px; font-weight: bold; color: #D32F2F;">
                        PB-G4 Ergebnis: <span id="pbg4-result">-</span>
                    </div>
                </div>
            </div>

            <!-- Ergebnis-Bereich -->
            <div>
                <h3 style="color: #1F77B4; border-bottom: 1px solid #eee; padding-bottom: 5px;">Ergebnisse & Szenarien</h3>
                
                <div style="padding: 20px; background: linear-gradient(135deg, #f8f9fa, #e9ecef); border-radius: 10px; margin-bottom: 20px;">
                    <h4 style="margin: 0 0 15px 0; text-align: center; color: #495057;">📈 Gesamtübersicht</h4>
                    <div id="overall-results" style="font-size: 16px; line-height: 2;">
                        <div><strong>Basisprüfungsblock 1:</strong> <span id="display-bp1">-</span></div>
                        <div><strong>Basisprüfungsblock 2:</strong> <span id="display-bp2">-</span></div>
                        <div><strong>Prüfungsblock G1:</strong> <span id="display-pbg1">-</span></div>
                        <div><strong>Prüfungsblock G2:</strong> <span id="display-pbg2">-</span></div>
                        <div><strong>Prüfungsblock G3:</strong> <span id="display-pbg3">-</span></div>
                        <div><strong>Prüfungsblock G4:</strong> <span id="display-pbg4">-</span></div>
                    </div>
                </div>

                <div style="padding: 15px; background: #f3e5f5; border-radius: 8px;">
                    <h4 style="margin: 0 0 10px 0; color: #7b1fa2;">📊 Berechnungsformeln</h4>
                    <div style="font-size: 12px; font-family: monospace; line-height: 1.5;">
                        <div><strong>BP1:</strong> (LA + Inf + DM) / 3</div>
                        <div><strong>BP2:</strong> ((AI+AII)/2)*0.33 + ((PHYI+PHYII)/2)*0.22 + KA*0.11 + DSA*0.22 + Chem*0.11</div>
                        <div><strong>PB-G1:</strong> AIII*0.25 + MO*0.25 + NMCSE*0.5</div>
                        <div><strong>PB-G2:</strong> PS*0.5 + SPCA*0.5</div>
                        <div><strong>PB-G3:</strong> NMPDE*0.66 + Stoch*0.33</div>
                        <div><strong>PB-G4:</strong> FDI*0.25 + MQ*0.25 + PC*0.25 + SPCS*0.25</div>
                    </div>
                </div>
            </div>
        </div>
    `;

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Calculator-Klasse für einfachere Referenz
    modal.classList.add('cse-grade-calculator');

    // Event-Listener
    this.setupCalculatorEvents(modal);

    // Schließen-Funktionalität
    const closeBtn = modal.querySelector('#close-calculator');
    closeBtn.addEventListener('click', () => modal.remove());
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.remove();
    });

    // ESC-Taste zum Schließen
    const escHandler = (e) => {
      if (e.key === 'Escape') {
        modal.remove();
        document.removeEventListener('keydown', escHandler);
      }
    };
    document.addEventListener('keydown', escHandler);
  }

  setupCalculatorEvents(modal) {
    // Alle Input-Felder
    const inputs = modal.querySelectorAll('input[type="number"]');
    
    inputs.forEach(input => {
      input.addEventListener('input', () => this.calculateGrades(modal));
      input.addEventListener('change', () => this.calculateGrades(modal));
    });

    // Szenario-Funktionen
    modal.fillScenario = (type) => {
      const values = {
        'good': 5.0,
        'average': 4.0,
        'passing': 4.0
      };
      
      inputs.forEach(input => {
        input.value = values[type] || '';
      });
      
      this.calculateGrades(modal);
    };

    modal.clearAll = () => {
      inputs.forEach(input => input.value = '');
      this.calculateGrades(modal);
    };
  }

  calculateGrades(modal) {
    // Hilfsfunktion zum Abrufen von Werten
    const getValue = (id) => {
      const input = modal.querySelector(`#${id}`);
      const value = parseFloat(input.value);
      return isNaN(value) ? null : value;
    };

    // Hilfsfunktion zum Formatieren von Ergebnissen
    const formatResult = (result) => {
      if (result === null) return '-';
      const formatted = result.toFixed(2);
      const color = result >= 5.5 ? '#2e7d32' : result >= 4.0 ? '#f57c00' : '#d32f2f';
      return `<span style="color: ${color}; font-weight: bold;">${formatted}</span>`;
    };

    // BP1 Berechnung: ((1 x LA) + (1 x Inf) + (1 x DM))/3
    const la = getValue('la');
    const inf = getValue('inf');
    const dm = getValue('dm');
    
    let bp1 = null;
    if (la !== null && inf !== null && dm !== null) {
      bp1 = (la + inf + dm) / 3;
    }

    // BP2 Berechnung: (((AI + AII)/2) x 0.33) + (((PHYI + PHYII)/2) x 0.22) + (KA x 0.11) + (DSA x 0.22) + (Chem x 0.11)
    const ai = getValue('ai');
    const aii = getValue('aii');
    const phyi = getValue('phyi');
    const phyii = getValue('phyii');
    const ka = getValue('ka');
    const dsa = getValue('dsa');
    const chem = getValue('chem');

    let bp2 = null;
    if (ai !== null && aii !== null && phyi !== null && phyii !== null && ka !== null && dsa !== null && chem !== null) {
      const analysisAvg = (ai + aii) / 2;
      const physikAvg = (phyi + phyii) / 2;
      bp2 = (analysisAvg * 0.33) + (physikAvg * 0.22) + (ka * 0.11) + (dsa * 0.22) + (chem * 0.11);
    }

    // PB-G1 Berechnung: (AIII x 0.25) + (MO x 0.25) + (NM CSE x 0.5)
    const aiii = getValue('aiii');
    const mo = getValue('mo');
    const nmcse = getValue('nmcse');

    let pbg1 = null;
    if (aiii !== null && mo !== null && nmcse !== null) {
      pbg1 = (aiii * 0.25) + (mo * 0.25) + (nmcse * 0.5);
    }

    // PB-G2 Berechnung: (PS x 0.5) + (SPCA x 0.5)
    const ps = getValue('ps');
    const spca = getValue('spca');

    let pbg2 = null;
    if (ps !== null && spca !== null) {
      pbg2 = (ps * 0.5) + (spca * 0.5);
    }

    // PB-G3 Berechnung: (NM PDE x 0.66) + (Stochastik x 0.33)
    const nmpde = getValue('nmpde');
    const stoch = getValue('stoch');

    let pbg3 = null;
    if (nmpde !== null && stoch !== null) {
      pbg3 = (nmpde * 0.66) + (stoch * 0.33);
    }

    // PB-G4 Berechnung: (FDI x 0.25) + (MQ x 0.25) + (PC x 0.25) + (SPCS x 0.25)
    const fdi = getValue('fdi');
    const mq = getValue('mq');
    const pc = getValue('pc');
    const spcs = getValue('spcs');

    let pbg4 = null;
    if (fdi !== null && mq !== null && pc !== null && spcs !== null) {
      pbg4 = (fdi * 0.25) + (mq * 0.25) + (pc * 0.25) + (spcs * 0.25);
    }

    // Ergebnisse anzeigen
    modal.querySelector('#bp1-result').innerHTML = formatResult(bp1);
    modal.querySelector('#bp2-result').innerHTML = formatResult(bp2);
    modal.querySelector('#pbg1-result').innerHTML = formatResult(pbg1);
    modal.querySelector('#pbg2-result').innerHTML = formatResult(pbg2);
    modal.querySelector('#pbg3-result').innerHTML = formatResult(pbg3);
    modal.querySelector('#pbg4-result').innerHTML = formatResult(pbg4);

    // Gesamtübersicht
    modal.querySelector('#display-bp1').innerHTML = formatResult(bp1);
    modal.querySelector('#display-bp2').innerHTML = formatResult(bp2);
    modal.querySelector('#display-pbg1').innerHTML = formatResult(pbg1);
    modal.querySelector('#display-pbg2').innerHTML = formatResult(pbg2);
    modal.querySelector('#display-pbg3').innerHTML = formatResult(pbg3);
    modal.querySelector('#display-pbg4').innerHTML = formatResult(pbg4);
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