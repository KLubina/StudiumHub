/* Initialization Logic */

StudienplanBase.prototype.initialize = function() {
    this.setPageInfo();
    this.initMajorMinorSelector();
    this.createLegend();
    this.createStudienplan();
    this.setupEventListeners();

    this.initializeKPCounter();

    setTimeout(() => {
        this.adjustAllText();
    }, 100);
};

StudienplanBase.prototype.setPageInfo = function() {
    document.getElementById('page-title').textContent = this.config.title;
    document.getElementById('studienplan-title').textContent = this.config.title;

    const subtitleEl = document.getElementById('studienplan-subtitle');
    if (this.config.subtitleHtml) {
        subtitleEl.innerHTML = this.config.subtitleHtml;
    } else {
        subtitleEl.textContent = this.config.subtitle || '';
    }

    document.getElementById('legende-titel').textContent = this.config.legendTitle;
};
