/* ==== BFH EIT TOOLTIP OVERRIDES ==== */
/* Überschreibungen für Tooltip-Verhalten */

if (window.BFHEITStudienplan) {
    /* ==== OVERRIDE TOOLTIP HIDING ==== */
    window.BFHEITStudienplan.prototype.hideTooltip = function() {
        StudienplanBase.prototype.hideTooltip.call(this);
        
        // Cleanup outside click handler if exists
        if (this.wahlmoduleManager && this.wahlmoduleManager._outsideClickHandler) {
            document.removeEventListener('click', this.wahlmoduleManager._outsideClickHandler, true);
            this.wahlmoduleManager._outsideClickHandler = null;
        }
    };
}
