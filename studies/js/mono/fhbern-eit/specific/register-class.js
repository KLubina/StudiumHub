/* ==== BFH EIT CLASS REGISTRATION ==== */
/* Registriert die BFH EIT spezifische Klasse für das zentrale System.
 * Standardisierter Dateiname: register-class.js
 */

if (window.BFHEITStudienplan) {
    window.StudiengangCustomClass = window.BFHEITStudienplan;
    console.log('[register-class] BFH EIT Studiengang-Klasse registriert');
} else {
    console.warn('[register-class] BFH EIT Klasse nicht gefunden – verwendet Fallback');
}