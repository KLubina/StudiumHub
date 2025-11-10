/* Module Creator */

StudienplanBase.prototype.createModule = function (modul, container) {
    if (!modul || modul.isPlaceholder || (typeof modul.kp === 'number' && modul.kp <= 0)) {
        return null;
    }

    const skipNames = ["Kernfächer", "Vertiefungsgebiet", "Vertiefungsgebiete", "Wahlfächer", "Alle Kernfächer"];
    if (modul.name && skipNames.includes(modul.name)) {
        return null;
    }

    const div = document.createElement("div");
    div.classList.add("modul");

    if (modul.name) {
        div.dataset.originalName = modul.name;
    }

    const cssClass = this.getModuleCssClass(modul);
    if (cssClass) {
        div.classList.add(cssClass);
    }

    this.setModuleSize(div, modul);
    this.createModuleContent(div, modul);
    this.addModuleEvents(div, modul);

    if (this.config.enableTooltips) {
        div.classList.add("clickable");
    }
    if (this.config.enableHover) {
        div.classList.add("hover-enabled");
    }
    if (modul.kp >= 10) {
        div.classList.add("large-module");
    } else if (modul.kp <= 3) {
        div.classList.add("small-module");
    }

    container.appendChild(div);

    setTimeout(() => {
        this.fitText(div, ".modul-kp");
        this.fitText(div, ".modul-titel");

        if (modul.kp <= 2) {
            this.adjustSmallModule(div, modul);
        }
    }, 0);

    return div;
};

StudienplanBase.prototype.getModuleCssClass = function (modul) {
    if (modul.pruefungsblock) {
        const block = this.config.pruefungsbloecke.find(
            (b) => b.name === modul.pruefungsblock
        );
        return block ? block.cssClass : null;
    }

    // Kategorie-Namen mit Leerzeichen in CSS-konforme Klassen umwandeln
    // Nutzt die 'klasse' Eigenschaft aus der Kategorie-Konfiguration
    if (modul.kategorie) {
        const kategorie = this.config.kategorien?.find(
            (k) => k.name === modul.kategorie
        );
        // Falls Kategorie in Config gefunden, nutze die klasse, sonst Fallback auf kategorie
        return kategorie ? kategorie.klasse : modul.kategorie;
    }

    return null;
};

StudienplanBase.prototype.addModuleEvents = function (div, modul) {
    if (this.config.enableTooltips) {
        div.addEventListener("click", (event) => {
            this.showTooltip(modul, event);
        });
    }
};
