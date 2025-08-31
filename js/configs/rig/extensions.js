/* ==== RIG MAIN EXTENSIONS CLASS ==== */
/* Hauptklasse die alle Module zusammenführt */

/*
 * Diese Datei lädt bei Bedarf die modularisierten Manager-Dateien (z.B.
 * `extensions-DragDropManager.js`) selbst nach, bevor die Custom-Klasse
 * definiert wird. So bleibt der Loader einfach und RIG ist selbstständig
 * lauffähig, auch wenn die Sub-Extensions nicht vorher vom zentralen
 * Loader geladen wurden.
 */

(async function ensureRigDependenciesAndDefineClass() {
    const basePath = 'js/configs/rig/';

    async function loadScriptIfMissing(globalName, fileName) {
        if (typeof window[globalName] !== 'undefined') return;
        try {
            await new Promise((resolve) => {
                const s = document.createElement('script');
                s.src = basePath + fileName;
                s.onload = () => { console.log(`✅ Nachgeladen: ${fileName}`); resolve(); };
                s.onerror = () => { console.warn(`⏭️ Kann ${fileName} nicht laden — übersprungen`); resolve(); };
                document.head.appendChild(s);
            });
        } catch (e) {
            console.warn('Fehler beim Nachladen von', fileName, e);
        }
    }

    // Liste der erwarteten globalen Manager und ihre Dateien (in Reihenfolge)
    const deps = [
        ['RIGDragDropManager', 'extensions-DragDropManager.js'],
        ['RIGTooltipManager', 'extensions-TooltipManager.js'],
        ['RIGUIControlsManager', 'extensions-UIControlsManager.js'],
        ['RIGWahlmoduleManager', 'extensions-WahlModuleManager.js']
    ];

    // Versuche, fehlende Abhängigkeiten nachzuladen (seriell, um Reihenfolge zu wahren)
    for (const [globalName, fileName] of deps) {
        // eslint-disable-next-line no-await-in-loop
        await loadScriptIfMissing(globalName, fileName);
    }

    // Jetzt die Custom-Klasse definieren. Falls Manager noch fehlen, wird
    // die Klasse trotzdem definiert, aber mit defensiven Checks.
    window.StudiengangCustomClass = class RIGStudienplan extends StudienplanBase {
        constructor(config) {
            super(config);

            // Initialize all managers (defensive: prüfe auf Existenz)
            this.dragDrop = (typeof RIGDragDropManager !== 'undefined') ? Object.create(RIGDragDropManager) : null;
            this.wahlmoduleManager = (typeof RIGWahlmoduleManager !== 'undefined') ? Object.create(RIGWahlmoduleManager) : null;
            this.uiControls = (typeof RIGUIControlsManager !== 'undefined') ? Object.create(RIGUIControlsManager) : null;
            this.tooltipManager = (typeof RIGTooltipManager !== 'undefined') ? Object.create(RIGTooltipManager) : null;

            // Initialize managers if present
            if (this.dragDrop && typeof this.dragDrop.init === 'function') this.dragDrop.init(this);
            if (this.wahlmoduleManager && typeof this.wahlmoduleManager.init === 'function') this.wahlmoduleManager.init(this);
            if (this.uiControls && typeof this.uiControls.init === 'function') this.uiControls.init(this);
            if (this.tooltipManager && typeof this.tooltipManager.init === 'function') this.tooltipManager.init(this);
        }

        initialize() {
            super.initialize();
            if (this.updateWahlmoduleDisplay) this.updateWahlmoduleDisplay();
        }

        updateWahlmoduleDisplay() {
            if (this.wahlmoduleManager && typeof this.wahlmoduleManager.updateWahlmoduleDisplay === 'function') {
                this.wahlmoduleManager.updateWahlmoduleDisplay();
            }
        }

        // Delegate methods to appropriate managers (defensiv)
        showWahlmoduleTooltip(event) {
            if (this.tooltipManager && typeof this.tooltipManager.showWahlmoduleTooltip === 'function') {
                this.tooltipManager.showWahlmoduleTooltip(event);
            }
        }

        addLegendTooltipEvents(div, kategorie) {
            if (this.tooltipManager && typeof this.tooltipManager.addLegendTooltipEvents === 'function') {
                this.tooltipManager.addLegendTooltipEvents(div, kategorie);
            }
        }

        hideTooltip() {
            if (this.tooltipManager && typeof this.tooltipManager.hideTooltip === 'function') {
                this.tooltipManager.hideTooltip();
            }
            super.hideTooltip();
        }
    };

    console.log('✅ RIG Custom Class definiert (mit selbstdiagnostischem Nachladen von Sub-Extensions)');
})();