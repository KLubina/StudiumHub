/* Global Initialization Function */

function initializeStudienplan(config) {
    console.log('🎯 initializeStudienplan aufgerufen!');

    let StudiengangClass = window.StudiengangClass || window.StudiengangCustomClass;

    StudiengangClass = StudiengangClass || window.ITETStudienplan || window.CSEStudienplan || window.RIGStudienplan || window.MTECStudienplan || StudienplanBase;

    const studienplan = new StudiengangClass(config);
    studienplan.initialize();

    window.currentStudienplan = studienplan;
}

window.initializeStudienplan = initializeStudienplan;
