// module-selector.js - Modul-Auswahl System

window.ITETModuleSelector = class ITETModuleSelector {
  constructor(parent) {
    this.parent = parent;
  }

  toggleModulFromTooltip(modulName, category) {
    const moduleMap = {
      praktika: this.parent.praktikaModule,
      kernfaecher: Object.values(this.parent.kernfaecherSchwerpunkte).flat(),
      wahlfaecher: Object.values(this.parent.wahlfaecherBereiche).flat()
    };

    const modul = moduleMap[category].find(m => m.name === modulName);
    if (modul) {
      this.toggleModulSelection(modul, category);
      // Tooltip neu laden
      setTimeout(() => {
        const event = { clientX: 100, clientY: 100 };
        if (category === "praktika") this.parent.showPraktikaTooltip(event);
        else if (category === "kernfaecher") this.parent.showKernfaecherTooltip(event);
        else if (category === "wahlfaecher") this.parent.showWahlfaecherTooltip(event);
      }, 100);
    }
  }

  toggleModulSelection(modul, category) {
    if (this.isModulSelected(modul.name, category)) {
      this.removeModulSelection(modul, category);
    } else {
      this.addModulSelection(modul, category);
    }
  }

  addModulSelection(modul, category) {
    const selectedMap = {
      praktika: this.parent.selectedPraktika,
      kernfaecher: this.parent.selectedKernfaecher,
      wahlfaecher: this.parent.selectedWahlfaecher
    };

    if (!selectedMap[category]["general"]) {
      selectedMap[category]["general"] = [];
    }

    selectedMap[category]["general"].push({ ...modul });
    this.parent.saveSelectedModules(category);
    this.parent.updatePraktikaDisplay();
    window.ITETUtilities.showMessage(`✅ "${modul.name}" zu ${category} hinzugefügt`, "success");
  }

  removeModulSelection(modul, category) {
    const selectedMap = {
      praktika: this.parent.selectedPraktika,
      kernfaecher: this.parent.selectedKernfaecher,
      wahlfaecher: this.parent.selectedWahlfaecher
    };

    if (selectedMap[category]["general"]) {
      selectedMap[category]["general"] = selectedMap[category]["general"].filter(m => m.name !== modul.name);
    }
    this.parent.saveSelectedModules(category);
    this.parent.updatePraktikaDisplay();
    window.ITETUtilities.showMessage(`🗑️ "${modul.name}" aus ${category} entfernt`, "info");
  }

  isModulSelected(modulName, category) {
    const selectedMap = {
      praktika: this.parent.selectedPraktika,
      kernfaecher: this.parent.selectedKernfaecher,
      wahlfaecher: this.parent.selectedWahlfaecher
    };

    return Object.values(selectedMap[category]).some(moduleList =>
      moduleList.some(m => m.name === modulName)
    );
  }

  // Praktika-spezifische Methoden
  togglePraktikaSelection(modul) {
    if (this.isPraktikaSelected(modul.name)) {
      this.removePraktikaSelection(modul);
    } else {
      this.addPraktikaSelection(modul);
    }
  }

  isPraktikaSelected(modulName) {
    return Object.values(this.parent.selectedPraktika).some(moduleList =>
      moduleList.some(m => m.name === modulName)
    );
  }

  addPraktikaSelection(modul) {
    if (!this.parent.selectedPraktika["general"]) {
      this.parent.selectedPraktika["general"] = [];
    }

    this.parent.selectedPraktika["general"].push({ ...modul });
    this.parent.saveSelectedPraktika();
    this.parent.updatePraktikaDisplay();
    this.parent.updateKPDisplay();
    window.ITETUtilities.showMessage(`✅ "${modul.name}" hinzugefügt`, "success");
  }

  removePraktikaSelection(modul) {
    if (this.parent.selectedPraktika["general"]) {
      this.parent.selectedPraktika["general"] = this.parent.selectedPraktika["general"].filter(m => m.name !== modul.name);
    }
    this.parent.saveSelectedPraktika();
    this.parent.updatePraktikaDisplay();
    this.parent.updateKPDisplay();
    window.ITETUtilities.showMessage(`🗑️ "${modul.name}" entfernt`, "info");
  }
};

console.log("✅ ITET Module Selector geladen");