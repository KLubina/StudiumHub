/* ==== ITET EXTENSIONS ==== */
/* Lädt alle Feature-Module aus dem features Ordner */

// Feature-Module sequenziell laden
(function loadITETFeatures() {
    console.log('🚀 Lade ITET Features aus features/ Ordner...');
    
    const featurePath = 'configs/itet/features';
    const featureModules = [
        'utilities-js.js',
        'module-data-js.js', 
        'kp-counter-js.js',
        'layout-manager-js.js',
        'module-selector-js.js',
        'tooltip-manager-js.js',
        'itet-studienplan-js.js'
    ];
    
    let loadedCount = 0;
    
    // Sequential loading function
    function loadNextModule(index) {
        if (index >= featureModules.length) {
            console.log('🎯 Alle ITET Features geladen!');
            // Hier können wir sicherstellen, dass alles bereit ist
            validateFeaturesLoaded();
            return;
        }
        
        const moduleFile = featureModules[index];
        const script = document.createElement('script');
        script.src = `${featurePath}/${moduleFile}`;
        script.onload = () => {
            loadedCount++;
            console.log(`✅ ${moduleFile} geladen (${loadedCount}/${featureModules.length})`);
            loadNextModule(index + 1); // Load next module
        };
        script.onerror = () => {
            console.error(`❌ Fehler beim Laden von ${moduleFile}`);
            loadNextModule(index + 1); // Continue even if one fails
        };
        document.head.appendChild(script);
    }
    
    // Start loading
    loadNextModule(0);
    
    function validateFeaturesLoaded() {
        console.log('🔍 Validiere geladene Features:');
        console.log('- ITETUtilities:', typeof window.ITETUtilities);
        console.log('- ITETModuleData:', typeof window.ITETModuleData);
        console.log('- ITETKPCounter:', typeof window.ITETKPCounter);
        console.log('- ITETLayoutManager:', typeof window.ITETLayoutManager);
        console.log('- ITETModuleSelector:', typeof window.ITETModuleSelector);
        console.log('- ITETTooltipManager:', typeof window.ITETTooltipManager);
        console.log('- ITETStudienplan:', typeof window.ITETStudienplan);
        
        if (window.ITETStudienplan) {
            console.log('✅ ITET Features vollständig geladen');
        } else {
            console.error('❌ ITET Hauptklasse nicht geladen!');
        }
    }
})();

/* ==== EXTENSIONS CONFIG ==== */
window.StudiengangExtensions = {
    enableDragAndDrop: true,
    enableModularFeatures: true
};

console.log("✅ ITET Extensions - Modularer Loader - initialisiert");
