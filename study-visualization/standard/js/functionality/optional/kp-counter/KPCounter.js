/* KP Counter - Main Class */

class StudienplanKPCounter {
    constructor(config) {
        this.config = config;
        this.creditUnit = config.creditUnit || 'KP';
        this.counterConfig = config.kpCounterConfig || {};
    }

    createKPCounter() {
        const kpCounterContainer = document.createElement('div');
        kpCounterContainer.id = 'kp-counter';

        // Keep it simple: only the total box, styled by CSS (original black look)
        kpCounterContainer.innerHTML = `
            <div id="kp-total">0</div>
        `;

        return kpCounterContainer;
    }
}

window.StudienplanKPCounter = StudienplanKPCounter;
