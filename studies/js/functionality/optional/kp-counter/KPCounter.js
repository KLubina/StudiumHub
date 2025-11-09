/* KP Counter - Main Class */

class StudienplanKPCounter {
    constructor(config) {
        this.config = config;
        this.creditUnit = config.creditUnit || 'KP';
        this.counterConfig = config.kpCounterConfig || {};
    }

    createKPCounter() {
        const kpCounterContainer = document.createElement("div");
        kpCounterContainer.id = "kp-counter";
        kpCounterContainer.style.marginBottom = "20px";
        kpCounterContainer.style.padding = "15px";
        kpCounterContainer.style.backgroundColor = "#f8f9fa";
        kpCounterContainer.style.borderRadius = "8px";
        kpCounterContainer.style.border = "2px solid var(--primary-color, #0D5B8C)";
        kpCounterContainer.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";

        const primaryColor = this.getPrimaryColor();
        kpCounterContainer.innerHTML = `
            <div style="text-align: center;">
                <h3 style="margin: 0; color: ${primaryColor}; font-size: 16px;">${this.creditUnit}</h3>
                <div id="kp-total" style="font-size: 22px; font-weight: 700; margin-top: 6px;">0</div>
            </div>
        `;

        return kpCounterContainer;
    }

    getPrimaryColor() {
        const style = getComputedStyle(document.documentElement);
        return style.getPropertyValue('--primary-color') || '#0D5B8C';
    }

    getGradientColor() {
        const style = getComputedStyle(document.documentElement);
        return style.getPropertyValue('--secondary-color') || '#00A0E3';
    }
}

window.StudienplanKPCounter = StudienplanKPCounter;
