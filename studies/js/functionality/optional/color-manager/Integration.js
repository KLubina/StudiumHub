/* Color Manager - StudienplanBase Integration */

StudienplanBase.prototype.initializeColorManager = function() {
    console.log('🎨 [ColorManager] initializeColorManager called', {
        enableColorManager: this.config.enableColorManager,
        colorManagerExists: !!this.colorManager
    });

    if (!this.config.enableColorManager || this.colorManager) return;

    console.log('🎨 [ColorManager] Creating ColorManager instance');
    this.colorManager = new StudienplanBaseColorManager(this);

    setTimeout(() => {
        console.log('🎨 [ColorManager] Adding controls and applying colors');
        this.colorManager.addControls();
        this.colorManager.applyColors();
    }, 100);
};

// Auto-Integration
if (!StudienplanBase.prototype._colorManagerIntegrated) {
    console.log('🎨 [ColorManager] Patching StudienplanBase.prototype.initialize');
    const originalInit = StudienplanBase.prototype.initialize;
    StudienplanBase.prototype.initialize = function() {
        console.log('🎨 [ColorManager] Patched initialize() called, enableColorManager:', this.config?.enableColorManager);
        originalInit.call(this);
        if (this.config.enableColorManager) {
            console.log('🎨 [ColorManager] Calling initializeColorManager()');
            this.initializeColorManager();
        } else {
            console.log('🎨 [ColorManager] Skipping initializeColorManager (enableColorManager is false)');
        }
    };
    StudienplanBase.prototype._colorManagerIntegrated = true;
}
