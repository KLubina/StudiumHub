StudienplanBase.prototype.createLegend = function() {
    const legendElement = document.getElementById('legende');
    legendElement.innerHTML = '';

    if (this.config.pruefungsbloecke) {
        this.createPruefungsbloeckeLegend(legendElement);
    }

    if (this.config.kategorien && this.config.kategorien.length > 0) {
        this.config.kategorien.forEach(kategorie => {
            this.createLegendItem(kategorie, legendElement);
        });
    } else if (this.config.enableMajorMinorSelector) {
        // Zeige Hinweis für Major/Minor-Studiengänge
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
        div.classList.add(block.cssClass || '');
        
        // KISS: Farbe direkt aus Config setzen
        if (block.color) {
            div.style.backgroundColor = block.color;
            div.style.color = 'white';
        }
        
        // KISS: Nur Block-Namen anzeigen, keine undefined Module
        div.textContent = block.name || block.shortName || 'Unnamed Block';
        
        container.appendChild(div);
    });
};

StudienplanBase.prototype.createLegendItem = function(kategorie, container) {
    const div = document.createElement('div');
    div.classList.add('legende-item');
    
    if (typeof kategorie === 'string') {
        div.classList.add(this.getCssClassForCategory(kategorie));
        div.textContent = kategorie;
    } else {
        div.classList.add(kategorie.klasse || this.getCssClassForCategory(kategorie.name));
        
        const contentContainer = document.createElement('div');
        contentContainer.style.display = 'flex';
        contentContainer.style.flexDirection = 'column';
        
        const nameSpan = document.createElement('span');
        nameSpan.textContent = kategorie.name;
        nameSpan.style.fontWeight = 'bold';
        contentContainer.appendChild(nameSpan);
        
        if (kategorie.info) {
            const infoSpan = document.createElement('span');
            infoSpan.textContent = kategorie.info;
            infoSpan.style.fontStyle = 'italic';
            infoSpan.style.fontSize = '12px';
            infoSpan.style.marginTop = '5px';
            contentContainer.appendChild(infoSpan);
        }
        
        if (kategorie.description) {
            const descSpan = document.createElement('div');
            descSpan.classList.add('legende-description');
            descSpan.textContent = kategorie.description;
            contentContainer.appendChild(descSpan);
        }
        
        div.appendChild(contentContainer);
        
        if (kategorie.hasTooltip) {
            this.addLegendTooltipEvents(div, kategorie);
        }
    }
    
    container.appendChild(div);
};