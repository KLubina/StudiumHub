/* Wahlmodule - Utility Functions */

StudienplanWahlmoduleManager.prototype.getCategoryKey = function(categoryName) {
    const keyMappings = {
        'Kernfächer nach Schwerpunkt': 'kernfaecher',
        'Vertiefungsfächer': 'vertiefungsfaecher',
        'Weitere Wahl-Grundlagenfächer': 'weitere-wahl-grundlagen',
        'Wahlfächer': 'wahlfaecher',
        'Wahlfächer (Semester)': 'wahlfaecher',
        'Wahl Praktika-Projekte-Seminare': 'praktika',
        'Wahlmodule (3 aus 6)': 'wahlmodule',
        'Wahlmodule': 'wahlmodule',
        'Vertiefungsrichtungen': 'vertiefungsrichtungen',
        'Fachliche Wahlmodule': 'wahlmoduleBereiche',
        'Erweiterungsmodule': 'erweiterungsmoduleBereiche',
        'Zusatzmodule': 'zusatzmoduleBereiche'
    };

    if (categoryName === 'Vertiefungsgebiet' || categoryName === 'Vertiefungsgebiete') return 'vertiefungsgebiete';
    if (categoryName === 'Wahlfächer (Bereiche)' || categoryName === 'Wahlfächer - Bereiche') return 'wahlfaecher';

    if (!categoryName) return '';
    const normalized = categoryName.trim().toLowerCase();
    if (normalized === 'schwerpunktfächer' || normalized.indexOf('schwerpunkt') === 0) return 'schwerpunkt';
    if (normalized === 'kernfächer' || normalized.indexOf('kern') === 0) return 'kernfaecher';

    return keyMappings[categoryName] || categoryName.toLowerCase().replace(/\s+/g, '-');
};

StudienplanWahlmoduleManager.prototype.getCategoryFromKey = function(categoryKey) {
    const keyMappings = {
        'kernfaecher': { name: 'Kernfächer nach Schwerpunkt' },
        'weitere-wahl-grundlagen': { name: 'Weitere Wahl-Grundlagenfächer' },
        'wahlfaecher': { name: 'Wahlfächer' },
        'praktika': { name: 'Wahl Praktika-Projekte-Seminare' },
        'wahlmodule': { name: 'Wahlmodule' },
        'vertiefungsgebiete': { name: 'Vertiefungsgebiete' },
        'vertiefung': { name: 'Vertiefung' },
        'fokus-vertiefung': { name: 'Fokus-Vertiefung' },
        'vertiefungsrichtungen': { name: 'Vertiefungsrichtungen' },
        'wahlmoduleBereiche': { name: 'Fachliche Wahlmodule' },
        'erweiterungsmoduleBereiche': { name: 'Erweiterungsmodule' },
        'zusatzmoduleBereiche': { name: 'Zusatzmodule' }
    };

    return keyMappings[categoryKey] || { name: categoryKey };
};

StudienplanWahlmoduleManager.prototype.getModuleGroupsForCategory = function(categoryKey) {
    const dataMap = {
        'kernfaecher': this.wahlmoduleData.kernfaecherSchwerpunkte,
        'vertiefungsfaecher': this.wahlmoduleData.vertiefungsfaecherBereiche,
        'weitere-wahl-grundlagen': { 'Grundlagenfächer': this.wahlmoduleData.weitereWahlGrundlagen },
        'wahlfaecher': this.wahlmoduleData.wahlfaecherBereiche,
        'wahlfaecherBereiche': this.wahlmoduleData.wahlfaecherBereiche,
        'wahlfaecher-bereiche': this.wahlmoduleData.wahlfaecherBereiche,
        'vertiefungsgebiete': this.wahlmoduleData.vertiefungsgebiete,
        'vertiefung': this.wahlmoduleData.vertiefungsgebiete,
        'fokus-vertiefung': this.wahlmoduleData.vertiefungsgebiete,
        'praktika': this.wahlmoduleData.praktikaSchwerpunkte,
        'wahlmodule': this.wahlmoduleData.wahlmoduleBereiche,
        'vertiefungsrichtungen': this.wahlmoduleData.vertiefungsrichtungen,
        'wahlmoduleBereiche': this.wahlmoduleData.wahlmoduleBereiche,
        'erweiterungsmoduleBereiche': this.wahlmoduleData.erweiterungsmoduleBereiche,
        'zusatzmoduleBereiche': this.wahlmoduleData.zusatzmoduleBereiche,
        'major': this.wahlmoduleData.majorBereiche,
        'majorBereiche': this.wahlmoduleData.majorBereiche,
        'minor': this.wahlmoduleData.minorBereiche,
        'minorBereiche': this.wahlmoduleData.minorBereiche,
        'schwerpunkt': this.wahlmoduleData.schwerpunktBereiche,
        'schwerpunktBereiche': this.wahlmoduleData.schwerpunktBereiche
    };

    return dataMap[categoryKey] || {};
};

StudienplanWahlmoduleManager.prototype.getGroupColor = function(categoryKey, groupName) {
    const colorMap = {
        'kernfaecher': '#DD98DD',
        'weitere-wahl-grundlagen': '#FFD700',
        'wahlfaecher': '#F2B48F',
        'praktika': '#4CA64C',
        'wahlmodule': '#FF6B6B',
        'vertiefungsrichtungen': '#00a0e3',
        'wahlmoduleBereiche': '#28a745',
        'erweiterungsmoduleBereiche': '#0066cc',
        'zusatzmoduleBereiche': '#6c757d',
        'major': '#6c63ff',
        'majorBereiche': '#6c63ff',
        'minor': '#48c9b0',
        'minorBereiche': '#48c9b0',
        'schwerpunkt': '#96CEB4',
        'schwerpunktBereiche': '#96CEB4'
    };
    if (categoryKey === 'vertiefungsgebiete' || categoryKey === 'vertiefungsgebiete') return '#A4C8FF';

    return colorMap[categoryKey] || '#6c757d';
};

StudienplanWahlmoduleManager.prototype.getTextColor = function(backgroundColor) {
    const darkColors = ['#4CA64C', '#FF6B6B', '#DD98DD', '#00a0e3', '#28a745', '#0066cc', '#6c757d', '#6c63ff', '#48c9b0', '#96CEB4'];
    return darkColors.includes(backgroundColor) ? 'white' : 'black';
};
