/* Event Listeners */

StudienplanBase.prototype.setupEventListeners = function() {
    document.addEventListener('click', (event) => {
        let isModulClick = false;
        let isLegendClick = false;
        let target = event.target;

        while (target && !isModulClick && !isLegendClick) {
            if (target.classList.contains('modul')) {
                isModulClick = true;
            } else if (target.classList.contains('legende-item')) {
                isLegendClick = true;
            }
            target = target.parentElement;
        }

        if (!isModulClick && !isLegendClick) {
            this.hideTooltip();
        }
    });
};
