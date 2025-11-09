/* Legend Creator */

StudienplanBase.prototype.createLegend = function() {
    const legendElement = document.getElementById('legende');
    legendElement.innerHTML = '';

    if (this.config.enableColorManager) {
        if (this.config.kategorien && this.config.kategorien.length > 0) {
            this.config.kategorien.forEach(kategorie => {
                this.createLegendItem(kategorie, legendElement);
            });
        }
        return;
    }

    if (this.config.pruefungsbloecke) {
        this.createPruefungsbloeckeLegend(legendElement);
    }

    if (this.config.kategorien && this.config.kategorien.length > 0) {
        this.config.kategorien.forEach(kategorie => {
            this.createLegendItem(kategorie, legendElement);
        });
    } else if (this.config.enableMajorMinorSelector) {
        const hint = document.createElement('div');
        hint.className = 'legend-hint';
        hint.innerHTML = '👆 Bitte wähle zuerst deinen <strong>Major</strong> und <strong>Minor</strong> aus, um die verfügbaren Module zu sehen.';
        legendElement.appendChild(hint);
    }
};

StudienplanBase.prototype.createPruefungsbloeckeLegend = function(container) {
    this.config.pruefungsbloecke.forEach(block => {
        const div = document.createElement('div');
        div.classList.add('legende-item');
        if (block.cssClass) {
            div.classList.add(block.cssClass);
        }
        div.textContent = block.name || block.shortName || 'Unnamed Block';
        container.appendChild(div);
    });
};
