/* Module Sizing Logic */

StudienplanBase.prototype.setModuleSize = function (div, modul) {
    const sizing = this.config.moduleSizing || "proportional";

    if (sizing === "proportional") {
        this.setProportionalSize(div, modul);
    } else if (sizing === "fixed") {
        this.setFixedSize(div, modul);
    } else if (sizing === "custom") {
        this.config.customSizing(div, modul);
    }
};

StudienplanBase.prototype.setProportionalSize = function (div, modul) {
    const basisArea = this.config.basisArea || 2500;
    const aspectRatio = this.getAspectRatio(modul);

    const area = modul.kp * basisArea;
    const width = Math.sqrt(area * aspectRatio);
    const height = area / width;

    div.style.width = `${Math.round(width)}px`;
    div.style.height = `${Math.round(height)}px`;
};

StudienplanBase.prototype.setFixedSize = function (div, modul) {
    let width = this.config.baseWidth || 160;
    let height = this.config.baseHeight || 80;

    if (modul.name.length > 60) {
        if (modul.name.includes(":")) {
            const shortName = modul.name.split(":")[1].trim();
            if (shortName.length <= 57) {
                modul.name = shortName;
            } else {
                modul.name = modul.name.substring(0, 57) + "...";
            }
        } else {
            modul.name = modul.name.substring(0, 57) + "...";
        }
    }

    if (this.config.useEctsBasedSizing) {
        const baseWidthForCategory = this.getBaseWidthForCategory(modul);
        width = Math.max(baseWidthForCategory, Math.sqrt(modul.kp) * 80);
        height = Math.max(45, modul.kp * 25);
    }

    div.style.width = `${width}px`;
    div.style.height = `${height}px`;
};

StudienplanBase.prototype.getBaseWidthForCategory = function (modul) {
    if (modul.kategorie === "kontext") return 180;
    if (
        modul.name.includes("Fundamentals and Methods of Computer Science") ||
        modul.name.includes("Business-to-IT-Innovation")
    )
        return 200;
    return 160;
};

StudienplanBase.prototype.getAspectRatio = function (modul) {
    if (this.config.aspectRatios) {
        for (const [condition, ratio] of Object.entries(this.config.aspectRatios)) {
            if (this.checkCondition(modul, condition)) {
                return ratio;
            }
        }
    }

    return this.config.defaultAspectRatio || 1.5;
};

StudienplanBase.prototype.checkCondition = function (modul, condition) {
    if (modul.name === condition) {
        return true;
    }

    if (condition === "longName") {
        return modul.name.length > 30;
    }
    if (condition === "specialModule") {
        return (
            modul.name.includes("Spezialisierung") ||
            modul.name.includes("Bachelorarbeit")
        );
    }
    if (condition.startsWith("category:")) {
        return modul.kategorie === condition.split(":")[1];
    }
    if (condition === "longModuleName") {
        return (
            modul.name.includes("Netzwerke und Schaltungen") ||
            modul.name.includes("Elektromagnetische Felder") ||
            modul.name.includes("Kommunikation") ||
            modul.name.includes("Analysis") ||
            modul.name.includes("Algebra") ||
            modul.name.includes("Datenstrukturen") ||
            modul.name.includes("Computational") ||
            modul.name.includes("Probability Theory") ||
            modul.name.includes("Algebraic Geometry")
        );
    }
    return false;
};
