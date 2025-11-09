/* Wahlmodule - Module Selection Logic */

StudienplanWahlmoduleManager.prototype.toggleModulFromTooltip = function(modulName, categoryKey) {
    const moduleGroups = this.getModuleGroupsForCategory(categoryKey);
    const allModules = Object.values(moduleGroups).flat();
    const modul = allModules.find(m => m.name === modulName);

    if (modul) {
        this.toggleModulSelection(modul, categoryKey);
        this.updateStudienplanWithSelection();

        setTimeout(() => {
            const kategorie = this.getCategoryFromKey(categoryKey);
            const event = { clientX: 100, clientY: 100 };
            this.showWahlmoduleTooltip(kategorie, event);
        }, 100);
    }
};

StudienplanWahlmoduleManager.prototype.toggleModulSelection = function(modul, categoryKey) {
    if (this.isModulSelected(modul.name, categoryKey)) {
        this.removeModulSelection(modul, categoryKey);
    } else {
        this.addModulSelection(modul, categoryKey);
    }
};

StudienplanWahlmoduleManager.prototype.addModulSelection = function(modul, categoryKey) {
    if (!this.selectedModules[categoryKey]) {
        this.selectedModules[categoryKey] = [];
    }

    this.selectedModules[categoryKey].push({ ...modul, categoryKey });
    this.saveSelectedModules();

    if (this.studienplan.updateKPDisplayWithCategories) {
        this.studienplan.updateKPDisplayWithCategories();
    } else if (this.studienplan.updateKPDisplay) {
        this.studienplan.updateKPDisplay();
    }

    this.showMessage(`✅ "${modul.name}" hinzugefügt`, "success");
};

StudienplanWahlmoduleManager.prototype.removeModulSelection = function(modul, categoryKey) {
    if (this.selectedModules[categoryKey]) {
        this.selectedModules[categoryKey] = this.selectedModules[categoryKey].filter(
            m => m.name !== modul.name
        );
    }

    this.saveSelectedModules();

    if (this.studienplan.updateKPDisplayWithCategories) {
        this.studienplan.updateKPDisplayWithCategories();
    } else if (this.studienplan.updateKPDisplay) {
        this.studienplan.updateKPDisplay();
    }

    this.showMessage(`🗑️ "${modul.name}" entfernt`, "info");
};

StudienplanWahlmoduleManager.prototype.isModulSelected = function(modulName, categoryKey) {
    return (this.selectedModules[categoryKey] || []).some(m => m.name === modulName);
};

StudienplanWahlmoduleManager.prototype.updateStudienplanWithSelection = function() {
    this.config.daten = this.config.daten.filter(m => !m.isDynamic);

    const allSelectedModules = Object.values(this.selectedModules).flat();

    allSelectedModules.forEach(modul => {
        const moduleCopy = {
            ...modul,
            jahr: 3,
            semester: 0,
            isDynamic: true
        };
        this.config.daten.push(moduleCopy);
    });

    this.studienplan.createStudienplan();

    if (this.studienplan.updateKPDisplayWithCategories) {
        this.studienplan.updateKPDisplayWithCategories();
    } else if (this.studienplan.updateKPDisplay) {
        this.studienplan.updateKPDisplay();
    }
};
