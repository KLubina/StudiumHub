/* Major/Minor Selector - Data Handler */

StudienplanBase.prototype.updateLegendForSelection = function(selectedMajor, selectedMinor) {
    const majorModules = this.majorData.majorBereiche[selectedMajor] || [];
    const minorModules = this.minorData.minorBereiche[selectedMinor] || [];

    const studiengang = this.getStudiengangKey();
    const moduleDataKey = this.capitalizeStudiengang(studiengang) + 'ModuleData';

    window[moduleDataKey] = {
        majorBereiche: { [selectedMajor]: majorModules },
        minorBereiche: { [selectedMinor]: minorModules },
        getAllWahlmoduleData: function() {
            return {
                majorBereiche: this.majorBereiche,
                minorBereiche: this.minorBereiche
            };
        }
    };

    this.config.kategorien = [
        {
            name: `Major: ${selectedMajor}`,
            klasse: "major",
            hasTooltip: true,
            info: "120 ECTS",
            description: `Wähle Module für deinen ${selectedMajor} Major`,
            minKp: 120,
        },
        {
            name: `Minor: ${selectedMinor}`,
            klasse: "minor",
            hasTooltip: true,
            info: "60 ECTS",
            description: `Wähle Module für deinen ${selectedMinor} Minor`,
            minKp: 60,
        }
    ];

    this.createLegend();

    if (this.config.enableWahlmodule && this.wahlmoduleManager) {
        this.wahlmoduleManager.wahlmoduleData = window[moduleDataKey].getAllWahlmoduleData();
        console.log('✅ Major/Minor-Daten aktualisiert:', this.wahlmoduleManager.wahlmoduleData);
    }
};
