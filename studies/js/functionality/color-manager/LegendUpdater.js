/* Color Manager - Legend Update Logic */

StudienplanBaseColorManager.prototype.updateLegend = function() {
    const legende = document.getElementById("legende");
    if (!legende) return;

    legende.querySelectorAll('.legende-item:not([data-color-controls] *)').forEach(el => el.remove());

    if (this.currentMode === "pruefungsblock" && this.colorConfig) {
        this.createPruefungsbloeckeLegend(legende);
    } else if (this.currentMode === "themenbereich" && this.colorConfig) {
        this.createThemenbereichLegend(legende);
    } else {
        this.createKategorienLegend(legende);
    }
};

StudienplanBaseColorManager.prototype.createPruefungsbloeckeLegend = function(container) {
    Object.values(this.colorConfig.pruefungsbloecke).forEach(block => {
        const div = document.createElement("div");
        div.className = "legende-item";
        if (block.cssClass) {
            div.classList.add(block.cssClass);
        }
        div.textContent = block.shortName || block.name;
        container.appendChild(div);
    });
};

StudienplanBaseColorManager.prototype.createThemenbereichLegend = function(container) {
    Object.values(this.colorConfig.colors.themenbereiche).forEach(theme => {
        const div = document.createElement("div");
        div.className = "legende-item";
        const slug = theme.label.toLowerCase().replace(/\s+/g,'-');
        div.classList.add(slug);
        div.textContent = `${theme.emoji} ${theme.label}`;
        container.appendChild(div);
    });
};

StudienplanBaseColorManager.prototype.createKategorienLegend = function(container) {
    this.config.kategorien?.forEach(kat => {
        this.studienplan.createLegendItem(kat, container);
    });
};
