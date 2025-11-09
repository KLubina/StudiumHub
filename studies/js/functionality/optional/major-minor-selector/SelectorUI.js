/* Major/Minor Selector - UI Creation */

StudienplanBase.prototype.createMajorMinorSelector = function() {
    const container = document.getElementById('major-minor-selector');
    if (!container) {
        console.warn('major-minor-selector Container nicht gefunden');
        return;
    }

    container.style.display = 'block';
    container.innerHTML = '';

    const title = document.createElement('h3');
    title.className = 'selector-title';
    title.textContent = 'Wähle deine Studienrichtung';
    container.appendChild(title);

    const selectionContainer = document.createElement('div');
    selectionContainer.className = 'selection-container';

    const majorOptions = Object.keys(this.majorData.majorBereiche);
    const fixedMajor = majorOptions[0];

    const majorGroup = document.createElement('div');
    majorGroup.className = 'selector-group';

    const majorLabel = document.createElement('label');
    majorLabel.textContent = 'Major (120 ECTS)';
    majorGroup.appendChild(majorLabel);

    const majorDisplay = document.createElement('div');
    majorDisplay.className = 'fixed-major-display';
    majorDisplay.textContent = fixedMajor;
    majorGroup.appendChild(majorDisplay);

    const hiddenMajorInput = document.createElement('input');
    hiddenMajorInput.type = 'hidden';
    hiddenMajorInput.id = 'major-select';
    hiddenMajorInput.value = fixedMajor;
    majorGroup.appendChild(hiddenMajorInput);

    selectionContainer.appendChild(majorGroup);

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

    this.attachSelectorEvents();
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

    const placeholderOption = document.createElement('option');
    placeholderOption.value = '';
    placeholderOption.textContent = placeholder;
    placeholderOption.disabled = true;
    placeholderOption.selected = true;
    select.appendChild(placeholderOption);

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

    const placeholderOption = document.createElement('option');
    placeholderOption.value = '';
    placeholderOption.textContent = placeholder;
    placeholderOption.disabled = true;
    placeholderOption.selected = true;
    select.appendChild(placeholderOption);

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
