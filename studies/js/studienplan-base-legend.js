StudienplanBase.prototype.createLegend = function() {
    const legendElement = document.getElementById('legende');
    legendElement.innerHTML = '';

    if (this.config.pruefungsbloecke) {
        this.createPruefungsbloeckeLegend(legendElement);
    }

    if (this.config.kategorien) {
        this.config.kategorien.forEach(kategorie => {
            this.createLegendItem(kategorie, legendElement);
        });
    }
};

StudienplanBase.prototype.createPruefungsbloeckeLegend = function(container) {
    this.config.pruefungsbloecke.forEach(block => {
        const div = document.createElement('div');
        div.classList.add('legende-item');
        div.classList.add(block.cssClass);
        
        const titelDiv = document.createElement('div');
        titelDiv.classList.add('legende-item-titel');
        titelDiv.textContent = block.name;
        div.appendChild(titelDiv);
        
        const inhaltDiv = document.createElement('div');
        inhaltDiv.classList.add('legende-item-inhalt');
        
        block.module.forEach(modul => {
            const modulDiv = document.createElement('div');
            modulDiv.classList.add('legende-modul');
            modulDiv.textContent = `${modul.name}, NG: ${modul.ng}`;
            inhaltDiv.appendChild(modulDiv);
        });
        
        div.appendChild(inhaltDiv);
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