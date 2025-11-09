/* ==== ETH ITET CLASS REGISTRATION ==== */
/* Bindet die ITET spezifische Studiengang-Klasse ins zentrale System ein.
 * Dateiname vereinheitlicht: register-class.js
 */

if (window.ITETStudienplan) {
    window.StudiengangCustomClass = window.ITETStudienplan;
    console.log('[register-class] ITET Studiengang-Klasse registriert');
} else {
    console.warn('[register-class] ITET Klasse nicht gefunden – nutze Fallback');
}