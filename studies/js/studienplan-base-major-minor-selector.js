/**
 * Major/Minor Selector Module
 *
 * Ermöglicht die Auswahl von Major/Minor-Kombinationen für Studiengänge
 * mit studyModel: "major-minor".
 *
 * Voraussetzungen:
 * - window.{STUDIENGANG}MajorData.majorBereiche muss existieren
 * - window.{STUDIENGANG}MinorData.minorBereiche muss existieren
 * - config.enableMajorMinorSelector muss true sein
 */

StudienplanBase.prototype.initMajorMinorSelector = function() {
    if (!this.config.enableMajorMinorSelector) {
        return;
    }

    const studiengang = this.getStudiengangKey();

    // Konstruiere die globalen Variablennamen (z.B. SozwiMajorData, SozwiMinorData)
    const majorDataKey = this.capitalizeStudiengang(studiengang) + 'MajorData';
    const minorDataKey = this.capitalizeStudiengang(studiengang) + 'MinorData';

    const majorData = window[majorDataKey];
    const minorData = window[minorDataKey];

    if (!majorData || !majorData.majorBereiche || !minorData || !minorData.minorBereiche) {
        console.warn(`Major/Minor-Daten nicht gefunden für ${studiengang}. Erwarte ${majorDataKey} und ${minorDataKey}.`);
        return;
    }

    this.majorData = majorData;
    this.minorData = minorData;

    this.createMajorMinorSelector();
};

StudienplanBase.prototype.capitalizeStudiengang = function(studiengang) {
    // Konvertiert 'sozwi' -> 'Sozwi', 'bsc-itet' -> 'BscItet'
    return studiengang
        .split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');
};

StudienplanBase.prototype.getStudiengangKey = function() {
    // Extrahiere Studiengang-Key aus URL oder data-studiengang Attribut
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('studiengang') || document.body.getAttribute('data-studiengang') || 'cs';
};

StudienplanBase.prototype.createMajorMinorSelector = function() {
    const container = document.getElementById('major-minor-selector');
    if (!container) {
        console.warn('major-minor-selector Container nicht gefunden');
        return;
    }

    // Container sichtbar machen für major-minor Studiengänge
    container.style.display = 'block';
    container.innerHTML = '';

    // Titel
    const title = document.createElement('h3');
    title.className = 'selector-title';
    title.textContent = 'Wähle deine Studienrichtung';
    container.appendChild(title);

    const selectionContainer = document.createElement('div');
    selectionContainer.className = 'selection-container';

    // Major Anzeige (FIXED - nicht auswählbar)
    const majorOptions = Object.keys(this.majorData.majorBereiche);
    const fixedMajor = majorOptions[0]; // Nimm den ersten (und einzigen) Major
    
    const majorGroup = document.createElement('div');
    majorGroup.className = 'selector-group';
    
    const majorLabel = document.createElement('label');
    majorLabel.textContent = 'Major (120 ECTS)';
    majorGroup.appendChild(majorLabel);
    
    const majorDisplay = document.createElement('div');
    majorDisplay.className = 'fixed-major-display';
    majorDisplay.textContent = fixedMajor;
    majorGroup.appendChild(majorDisplay);
    
    // Verstecktes Input für den fixen Major-Wert
    const hiddenMajorInput = document.createElement('input');
    hiddenMajorInput.type = 'hidden';
    hiddenMajorInput.id = 'major-select';
    hiddenMajorInput.value = fixedMajor;
    majorGroup.appendChild(hiddenMajorInput);
    
    selectionContainer.appendChild(majorGroup);

    // Minor Auswahl (mit Gruppen wenn vorhanden)
    const minorGroup = this.minorData.minorGruppen
        ? this.createGroupedSelectorGroup(
            'Minor',
            'minor-select',
            this.minorData.minorGruppen,
            'Wähle deinen Minor...'
          )
        : this.createSelectorGroup(
            'Minor (60 ECTS)',
            'minor-select',
            Object.keys(this.minorData.minorBereiche),
            'Wähle deinen Minor...'
          );
    selectionContainer.appendChild(minorGroup);

    container.appendChild(selectionContainer);

    // Event Listener
    this.attachSelectorEvents();

    // Lade gespeicherte Auswahl (oder setze Major automatisch)
    this.loadSavedSelection(fixedMajor);
};

StudienplanBase.prototype.createSelectorGroup = function(label, selectId, options, placeholder) {
    const group = document.createElement('div');
    group.className = 'selector-group';

    const labelEl = document.createElement('label');
    labelEl.textContent = label;
    labelEl.setAttribute('for', selectId);
    group.appendChild(labelEl);

    const select = document.createElement('select');
    select.id = selectId;
    select.className = 'study-select';

    // Placeholder Option
    const placeholderOption = document.createElement('option');
    placeholderOption.value = '';
    placeholderOption.textContent = placeholder;
    placeholderOption.disabled = true;
    placeholderOption.selected = true;
    select.appendChild(placeholderOption);

    // Optionen
    options.forEach(option => {
        const optionEl = document.createElement('option');
        optionEl.value = option;
        optionEl.textContent = option;
        select.appendChild(optionEl);
    });

    group.appendChild(select);

    return group;
};

StudienplanBase.prototype.createGroupedSelectorGroup = function(label, selectId, groups, placeholder) {
    const group = document.createElement('div');
    group.className = 'selector-group';

    const labelEl = document.createElement('label');
    labelEl.textContent = label;
    labelEl.setAttribute('for', selectId);
    group.appendChild(labelEl);

    const select = document.createElement('select');
    select.id = selectId;
    select.className = 'study-select';

    // Placeholder Option
    const placeholderOption = document.createElement('option');
    placeholderOption.value = '';
    placeholderOption.textContent = placeholder;
    placeholderOption.disabled = true;
    placeholderOption.selected = true;
    select.appendChild(placeholderOption);

    // Gruppierte Optionen mit <optgroup>
    Object.keys(groups).forEach(groupName => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = groupName;

        groups[groupName].forEach(option => {
            const optionEl = document.createElement('option');
            optionEl.value = option;
            optionEl.textContent = option;
            optgroup.appendChild(optionEl);
        });

        select.appendChild(optgroup);
    });

    group.appendChild(select);

    return group;
};

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

    // Speichere Auswahl
    if (selectedMajor) {
        localStorage.setItem('selectedMajor', selectedMajor);
    }
    if (selectedMinor) {
        localStorage.setItem('selectedMinor', selectedMinor);
    }

    // Aktualisiere Legende nur wenn beide ausgewählt sind
    if (selectedMajor && selectedMinor) {
        this.updateLegendForSelection(selectedMajor, selectedMinor);
    }
};

StudienplanBase.prototype.updateLegendForSelection = function(selectedMajor, selectedMinor) {
    // Hole Major und Minor Module
    const majorModules = this.majorData.majorBereiche[selectedMajor] || [];
    const minorModules = this.minorData.minorBereiche[selectedMinor] || [];

    // Erstelle ein globales ModuleData-Objekt für das Wahlmodule-System
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

    // Aktualisiere die Kategorien in der Config
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

    // Legende neu erstellen
    this.createLegend();

    // Wahlmodule neu initialisieren falls aktiviert
    if (this.config.enableWahlmodule && this.wahlmoduleManager) {
        this.wahlmoduleManager.wahlmoduleData = window[moduleDataKey].getAllWahlmoduleData();
        console.log('✅ Major/Minor-Daten aktualisiert:', this.wahlmoduleManager.wahlmoduleData);
    }
};

StudienplanBase.prototype.loadSavedSelection = function(fixedMajor) {
    const savedMinor = localStorage.getItem('selectedMinor');

    const majorSelect = document.getElementById('major-select');
    const minorSelect = document.getElementById('minor-select');

    // Major ist immer fix gesetzt
    if (fixedMajor && majorSelect) {
        majorSelect.value = fixedMajor;
    }
    
    // Lade gespeicherten Minor
    if (savedMinor && minorSelect) {
        minorSelect.value = savedMinor;
    }

    // Aktualisiere Legende wenn Major fix und Minor gespeichert ist
    if (fixedMajor && savedMinor) {
        this.updateLegendForSelection(fixedMajor, savedMinor);
    }
};
