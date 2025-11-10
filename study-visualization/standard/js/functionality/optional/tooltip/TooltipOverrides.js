/* Tooltip Overrides - zentralisiert
 * Vereinheitlicht die bisher duplizierte Logik in
 * mono/<studiengang>/specific/tooltip-overrides.js
 *
 * Aufgabe: Beim Ausblenden des Tooltips evtl. registrierten Outside-Click
 * Handler des Wahlmodule-Systems entfernen, um Memory-Leaks oder doppelte
 * Listener zu vermeiden.
 */

(function() {
    if (!window.StudienplanBase || !window.StudienplanBase.prototype.hideTooltip) {
        console.warn('TooltipOverrides: Basis hideTooltip nicht gefunden – Überschreibung übersprungen.');
        return;
    }

    const originalHide = window.StudienplanBase.prototype.hideTooltip;

    // Nur einmal überschreiben
    if (window.StudienplanBase.prototype.__overriddenForOutsideHandler) return;
    window.StudienplanBase.prototype.__overriddenForOutsideHandler = true;

    window.StudienplanBase.prototype.hideTooltip = function() {
        // Original ausführen
        originalHide.call(this);

        // Wahlmodule Outside-Click Handler bereinigen (falls vorhanden)
        try {
            const mgr = this.wahlmoduleManager;
            if (mgr && mgr._outsideClickHandler) {
                document.removeEventListener('click', mgr._outsideClickHandler, true);
                mgr._outsideClickHandler = null;
            }
        } catch (e) {
            console.warn('TooltipOverrides: Fehler beim Bereinigen des Outside-Click Handlers', e);
        }
    };

    console.log('✅ TooltipOverrides: hideTooltip zentral erweitert.');
})();
