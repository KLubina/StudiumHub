/* Legend Item Creator */

StudienplanBase.prototype.createLegendItem = function(kategorie, container) {
    const div = document.createElement('div');
    div.classList.add('legende-item');

    if (typeof kategorie === 'string') {
        const slug = this.getCssClassForCategory(kategorie);
        div.classList.add(slug);
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
