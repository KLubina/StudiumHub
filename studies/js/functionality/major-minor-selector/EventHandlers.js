/* Major/Minor Selector - Event Handlers */

StudienplanBase.prototype.attachSelectorEvents = function() {
    const majorSelect = document.getElementById('major-select');
    const minorSelect = document.getElementById('minor-select');

    if (!majorSelect || !minorSelect) {
        return;
    }

    majorSelect.addEventListener('change', () => {
        this.onSelectionChange();
    });

    minorSelect.addEventListener('change', () => {
        this.onSelectionChange();
    });
};

StudienplanBase.prototype.onSelectionChange = function() {
    const majorSelect = document.getElementById('major-select');
    const minorSelect = document.getElementById('minor-select');

    if (!majorSelect || !minorSelect) {
        return;
    }

    const selectedMajor = majorSelect.value;
    const selectedMinor = minorSelect.value;

    if (selectedMajor) {
        localStorage.setItem('selectedMajor', selectedMajor);
    }
    if (selectedMinor) {
        localStorage.setItem('selectedMinor', selectedMinor);
    }

    if (selectedMajor && selectedMinor) {
        this.updateLegendForSelection(selectedMajor, selectedMinor);
    }
};

StudienplanBase.prototype.loadSavedSelection = function(fixedMajor) {
    const savedMinor = localStorage.getItem('selectedMinor');

    const majorSelect = document.getElementById('major-select');
    const minorSelect = document.getElementById('minor-select');

    if (fixedMajor && majorSelect) {
        majorSelect.value = fixedMajor;
    }

    if (savedMinor && minorSelect) {
        minorSelect.value = savedMinor;
    }

    if (fixedMajor && savedMinor) {
        this.updateLegendForSelection(fixedMajor, savedMinor);
    }
};
