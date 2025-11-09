/* Major/Minor Selector - Core Logic */

StudienplanBase.prototype.initMajorMinorSelector = function() {
    if (!this.config.enableMajorMinorSelector) {
        return;
    }

    const studiengang = this.getStudiengangKey();

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
    return studiengang
        .split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');
};

StudienplanBase.prototype.getStudiengangKey = function() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('studiengang') || document.body.getAttribute('data-studiengang') || 'cs';
};
