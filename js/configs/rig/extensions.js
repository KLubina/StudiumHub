/* ==== RIG MAIN EXTENSIONS CLASS ==== */
/* Hauptklasse die alle Module zusammenführt */

window.StudiengangCustomClass = class RIGStudienplan extends StudienplanBase {
    constructor(config) {
        super(config);
        
        // Initialize all managers
        this.dragDrop = Object.create(RIGDragDropManager);
        this.wahlmoduleManager = Object.create(RIGWahlmoduleManager);
        this.uiControls = Object.create(RIGUIControlsManager);
        this.tooltipManager = Object.create(RIGTooltipManager);
        
        // Initialize managers
        this.dragDrop.init(this);
        this.wahlmoduleManager.init(this);
        this.uiControls.init(this);
        this.tooltipManager.init(this);
    }

    initialize() {
        super.initialize();
        this.updateWahlmoduleDisplay();
    }

    updateWahlmoduleDisplay() {
        this.wahlmoduleManager.updateWahlmoduleDisplay();
    }

    // Delegate methods to appropriate managers
    showWahlmoduleTooltip(event) {
        this.tooltipManager.showWahlmoduleTooltip(event);
    }

    addLegendTooltipEvents(div, kategorie) {
        this.tooltipManager.addLegendTooltipEvents(div, kategorie);
    }

    hideTooltip() {
        this.tooltipManager.hideTooltip();
        super.hideTooltip();
    }
};