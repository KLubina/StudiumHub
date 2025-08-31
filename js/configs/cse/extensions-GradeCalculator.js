/* ==== CSE GRADE CALCULATOR ==== */
/* Verwaltet den Block-Prüfungen-Rechner für CSE */

class CSEGradeCalculator {
  constructor(studienplan) {
    this.studienplan = studienplan;
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
                        <label>Fluiddynamik I (25%):</label>
                        <input type="number" id="fdi" min="1" max="6" step="0.1" placeholder="Note" style="padding: 5px; border: 1px solid #ddd; border-radius: 4px;">
                        
                        <label>Materialquantenmechanik (25%):</label>
                        <input type="number" id="mq" min="1" max="6" step="0.1" placeholder="Note" style="padding: 5px; border: 1px solid #ddd; border-radius: 4px;">
                        
                        <label>Parallel Computing (25%):</label>
                        <input type="number" id="pc" min="1" max="6" step="0.1" placeholder="Note" style="padding: 5px; border: 1px solid #ddd; border-radius: 4px;">
                        
                        <label>Statistische Physik & CS (25%):</label>
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
    const bp1Values = [la, inf, dm].filter(v => v !== null);
    if (bp1Values.length > 0) {
      bp1 = bp1Values.reduce((sum, val) => sum + val, 0) / bp1Values.length;
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
    let bp2Sum = 0;
    let bp2Weight = 0;

    // Analysis-Durchschnitt
    const analysisValues = [ai, aii].filter(v => v !== null);
    if (analysisValues.length > 0) {
      const analysisAvg = analysisValues.reduce((sum, val) => sum + val, 0) / analysisValues.length;
      bp2Sum += analysisAvg * 0.33;
      bp2Weight += 0.33;
    }

    // Physik-Durchschnitt
    const physikValues = [phyi, phyii].filter(v => v !== null);
    if (physikValues.length > 0) {
      const physikAvg = physikValues.reduce((sum, val) => sum + val, 0) / physikValues.length;
      bp2Sum += physikAvg * 0.22;
      bp2Weight += 0.22;
    }

    // Komplexe Analysis
    if (ka !== null) {
      bp2Sum += ka * 0.11;
      bp2Weight += 0.11;
    }

    // DSA
    if (dsa !== null) {
      bp2Sum += dsa * 0.22;
      bp2Weight += 0.22;
    }

    // Chemie
    if (chem !== null) {
      bp2Sum += chem * 0.11;
      bp2Weight += 0.11;
    }

    if (bp2Weight > 0) {
      bp2 = bp2Sum / bp2Weight;
    }

    // PB-G1 Berechnung: (AIII x 0.25) + (MO x 0.25) + (NM CSE x 0.5)
    const aiii = getValue('aiii');
    const mo = getValue('mo');
    const nmcse = getValue('nmcse');

    let pbg1 = null;
    let pbg1Sum = 0;
    let pbg1Weight = 0;

    if (aiii !== null) {
      pbg1Sum += aiii * 0.25;
      pbg1Weight += 0.25;
    }
    if (mo !== null) {
      pbg1Sum += mo * 0.25;
      pbg1Weight += 0.25;
    }
    if (nmcse !== null) {
      pbg1Sum += nmcse * 0.5;
      pbg1Weight += 0.5;
    }

    if (pbg1Weight > 0) {
      pbg1 = pbg1Sum / pbg1Weight;
    }

    // PB-G2 Berechnung: (PS x 0.5) + (SPCA x 0.5)
    const ps = getValue('ps');
    const spca = getValue('spca');

    let pbg2 = null;
    const pbg2Values = [ps, spca].filter(v => v !== null);
    if (pbg2Values.length > 0) {
      pbg2 = pbg2Values.reduce((sum, val) => sum + val, 0) / pbg2Values.length;
    }

    // PB-G3 Berechnung: (NM PDE x 0.66) + (Stochastik x 0.33)
    const nmpde = getValue('nmpde');
    const stoch = getValue('stoch');

    let pbg3 = null;
    let pbg3Sum = 0;
    let pbg3Weight = 0;

    if (nmpde !== null) {
      pbg3Sum += nmpde * 0.66;
      pbg3Weight += 0.66;
    }
    if (stoch !== null) {
      pbg3Sum += stoch * 0.33;
      pbg3Weight += 0.33;
    }

    if (pbg3Weight > 0) {
      pbg3 = pbg3Sum / pbg3Weight;
    }

    // PB-G4 Berechnung: (FDI x 0.25) + (MQ x 0.25) + (PC x 0.25) + (SPCS x 0.25)
    const fdi = getValue('fdi');
    const mq = getValue('mq');
    const pc = getValue('pc');
    const spcs = getValue('spcs');

    let pbg4 = null;
    let pbg4Sum = 0;
    let pbg4Weight = 0;

    if (fdi !== null) {
      pbg4Sum += fdi * 0.25;
      pbg4Weight += 0.25;
    }
    if (mq !== null) {
      pbg4Sum += mq * 0.25;
      pbg4Weight += 0.25;
    }
    if (pc !== null) {
      pbg4Sum += pc * 0.25;
      pbg4Weight += 0.25;
    }
    if (spcs !== null) {
      pbg4Sum += spcs * 0.25;
      pbg4Weight += 0.25;
    }

    if (pbg4Weight > 0) {
      pbg4 = pbg4Sum / pbg4Weight;
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
}

// Export für modularen Import
window.CSEGradeCalculator = CSEGradeCalculator;
