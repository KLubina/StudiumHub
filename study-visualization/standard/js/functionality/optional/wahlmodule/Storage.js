/* Wahlmodule - Storage Logic */

StudienplanWahlmoduleManager.prototype.loadSelectedModules = function() {
    try {
        const storageKey = `${this.getStudiengangKey()}-selected-wahlmodule`;
        const saved = localStorage.getItem(storageKey);
        return saved ? JSON.parse(saved) : {};
    } catch (error) {
        console.error('Fehler beim Laden der Wahlmodule:', error);
        return {};
    }
};

StudienplanWahlmoduleManager.prototype.saveSelectedModules = function() {
    try {
        const storageKey = `${this.getStudiengangKey()}-selected-wahlmodule`;
        localStorage.setItem(storageKey, JSON.stringify(this.selectedModules));
    } catch (error) {
        console.error('Fehler beim Speichern der Wahlmodule:', error);
    }
};

StudienplanWahlmoduleManager.prototype.getStudiengangKey = function() {
    return document.body.getAttribute('data-studiengang') || 'default';
};
