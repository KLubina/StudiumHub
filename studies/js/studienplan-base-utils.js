/* ==== STUDIENPLAN BASE UTILS ==== */
/* Text-Fitting und kleine Utility-Funktionen */

StudienplanBase.prototype.fitText = function(container, selector) {
    const node = container.querySelector(selector);
    if (!node) return;

    let fs = 16;
    node.style.fontSize = fs + 'px';

    const containerWidth = container.clientWidth - 10;
    const containerHeight = selector === '.modul-titel' 
        ? container.clientHeight * 0.7 - 10 
        : container.clientHeight * 0.3 - 5;

    while ((node.scrollWidth > containerWidth || node.scrollHeight > containerHeight) && fs > 6) {
        fs--;
        node.style.fontSize = fs + 'px';
    }

    if (fs <= 8) {
        node.style.lineHeight = '1';
        if (selector === '.modul-titel') {
            node.style.margin = '1px 0';
            if (fs === 6) {
                node.style.textOverflow = 'ellipsis';
                node.style.whiteSpace = 'nowrap';
            }
        }
    }
};

StudienplanBase.prototype.adjustAllText = function() {
    document.querySelectorAll('.modul').forEach(modul => {
        this.fitText(modul, '.modul-kp');
        this.fitText(modul, '.modul-titel');
    });
};

StudienplanBase.prototype.adjustSmallModule = function(div, modul) {
    const kp = div.querySelector('.modul-kp');
    const titel = div.querySelector('.modul-titel');
    
    if (kp) {
        kp.style.fontSize = '15px';
        kp.style.fontWeight = 'bold';
        kp.style.marginTop = '2px';
        kp.style.marginBottom = '2px';
    }
    
    if (titel) {
        titel.style.fontSize = '12px';
        titel.style.lineHeight = '1.1';
        titel.style.marginTop = '1px';
        
        if (modul.name.length > 25) {
            if (modul.name.includes('Geschichte:')) {
                titel.textContent = modul.name.split('Geschichte:')[1].trim();
            } else {
                titel.textContent = modul.name.substring(0, 22) + '...';
            }
            div.title = modul.name;
        }
    }
    
    if (kp && titel) {
        kp.style.marginBottom = '0';
        titel.style.marginTop = '0';
        titel.style.marginBottom = '0';
    }
};

/* ==== POLYFILLS ==== */
if (!Event.prototype.composedPath) {
    Event.prototype.composedPath = function() {
        if (this.path) return this.path;
        
        let target = this.target;
        this.path = [];
        while (target.parentNode !== null) {
            this.path.push(target);
            target = target.parentNode;
        }
        this.path.push(document, window);
        return this.path;
    }
}