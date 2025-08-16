// tooltip-manager.js - Tooltip-Verwaltung für alle Module-Typen

window.ITETTooltipManager = class ITETTooltipManager {
  constructor(parent) {
    this.parent = parent;
  }

  createPraktikaTooltip() {
    let content = `
      <div class="praktika-liste">
        <h3>🎯 Verfügbare Praktika, Projekte & Seminare</h3>
        <p style="font-size: 11px; color: #666; margin-bottom: 15px;">
          💡 <strong>Klicke auf Module um sie auszuwählen!</strong><br>
          📊 Gewählte Module werden dynamisch im Studienplan angezeigt.
        </p>
        <div style="max-height: 400px; overflow-y: auto; display: grid; grid-template-columns: 1fr; gap: 2px;">
    `;

    this.parent.praktikaModule.forEach(modul => {
      const isSelected = this.parent.moduleSelector.isPraktikaSelected(modul.name);
      const bgColor = isSelected ? "#d4edda" : "#f8f9fa";
      const textColor = isSelected ? "#155724" : "#333";
      const buttonText = isSelected ? "✓ Gewählt" : "Wählen";
      const buttonColor = isSelected ? "#28a745" : "#4CA64C";

      content += `
        <div style="padding: 8px; background: ${bgColor}; color: ${textColor}; border-radius: 4px; margin: 2px; border: 1px solid #ddd; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-weight: bold; font-size: 10px;">${modul.kp} KP</div>
            <div style="font-size: 9px; line-height: 1.2;">${modul.name}</div>
          </div>
          <button onclick="window.currentStudienplan.togglePraktikaFromTooltip('${modul.name}')" 
                  style="background: ${buttonColor}; color: white; border: none; padding: 3px 6px; border-radius: 3px; cursor: pointer; font-size: 8px;">
            ${buttonText}
          </button>
        </div>
      `;
    });

    content += `
        </div>
        <div style="margin-top: 15px; padding: 10px; background-color: #e7f3ff; border-radius: 5px; border: 1px solid #b3d7ff;">
          <strong>💡 Hinweis:</strong> Nach der Auswahl klicke auf "🔄 Neu laden" um die Module im Studienplan zu sehen!
        </div>
      </div>
    `;
    return content;
  }

  createKernfaecherTooltip() {
    let content = `
      <div class="kernfaecher-liste">
        <h3>📚 Kernfächer nach Schwerpunkt</h3>
        <p style="font-size: 11px; color: #666; margin-bottom: 15px;">
          💡 <strong>Klicke auf Module um sie auszuwählen!</strong><br>
          ⚠️ Du musst mindestens 18 KP aus Kernfächern wählen.
        </p>
    `;

    Object.entries(this.parent.kernfaecherSchwerpunkte).forEach(([schwerpunkt, module]) => {
      content += `
        <div style="margin-bottom: 15px;">
          <h4 style="margin: 10px 0 8px 0; padding: 3px 8px; background-color: #DD98DD; color: black; border-radius: 4px; font-size: 12px;">
            ${schwerpunkt}
          </h4>
          <div style="display: grid; grid-template-columns: 1fr; gap: 2px;">
      `;

      module.forEach(modul => {
        const isSelected = this.parent.moduleSelector.isModulSelected(modul.name, "kernfaecher");
        const bgColor = isSelected ? "#d4edda" : "#f8f9fa";
        const textColor = isSelected ? "#155724" : "#333";
        const buttonText = isSelected ? "✓ Gewählt" : "Wählen";
        const buttonColor = isSelected ? "#28a745" : "#DD98DD";

        content += `
          <div style="padding: 6px; background: ${bgColor}; color: ${textColor}; border-radius: 4px; margin: 2px; border: 1px solid #ddd; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-weight: bold; font-size: 10px;">${modul.kp} KP</div>
              <div style="font-size: 9px; line-height: 1.2;">${modul.name}</div>
            </div>
            <button onclick="window.currentStudienplan.toggleModulFromTooltip('${modul.name}', 'kernfaecher')" 
                    style="background: ${buttonColor}; color: ${isSelected ? "white" : "black"}; border: none; padding: 3px 6px; border-radius: 3px; cursor: pointer; font-size: 8px;">
              ${buttonText}
            </button>
          </div>
        `;
      });

      content += `</div></div>`;
    });

    content += `</div>`;
    return content;
  }

  createWahlfaecherTooltip() {
    let content = `
      <div class="wahlfaecher-liste">
        <h3>🎓 Wahlfächer</h3>
        <p style="font-size: 11px; color: #666; margin-bottom: 15px;">
          💡 <strong>Klicke auf Module um sie auszuwählen!</strong><br>
          ℹ️ Freie Auswahl zusätzlicher Module.
        </p>
    `;

    Object.entries(this.parent.wahlfaecherBereiche).forEach(([bereich, module]) => {
      content += `
        <div style="margin-bottom: 15px;">
          <h4 style="margin: 10px 0 8px 0; padding: 3px 8px; background-color: #F2B48F; color: black; border-radius: 4px; font-size: 12px;">
            ${bereich}
          </h4>
          <div style="display: grid; grid-template-columns: 1fr; gap: 2px;">
      `;

      module.forEach(modul => {
        const isSelected = this.parent.moduleSelector.isModulSelected(modul.name, "wahlfaecher");
        const bgColor = isSelected ? "#d4edda" : "#f8f9fa";
        const textColor = isSelected ? "#155724" : "#333";
        const buttonText = isSelected ? "✓ Gewählt" : "Wählen";
        const buttonColor = isSelected ? "#28a745" : "#F2B48F";

        content += `
          <div style="padding: 6px; background: ${bgColor}; color: ${textColor}; border-radius: 4px; margin: 2px; border: 1px solid #ddd; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-weight: bold; font-size: 10px;">${modul.kp} KP</div>
              <div style="font-size: 9px; line-height: 1.2;">${modul.name}</div>
            </div>
            <button onclick="window.currentStudienplan.toggleModulFromTooltip('${modul.name}', 'wahlfaecher')" 
                    style="background: ${buttonColor}; color: black; border: none; padding: 3px 6px; border-radius: 3px; cursor: pointer; font-size: 8px;">
              ${buttonText}
            </button>
          </div>
        `;
      });

      content += `</div></div>`;
    });

    content += `</div>`;
    return content;
  }
};

console.log("✅ ITET Tooltip Manager geladen");