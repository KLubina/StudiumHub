/* ==== ETH MTEC CLASS REGISTRATION ==== */
/* Stellt die MTEC spezifische Klasse bereit für das zentrale System.
 * Neuer Standard-Dateiname: register-class.js
 */

if (window.MTECStudienplan) {
    window.StudiengangCustomClass = window.MTECStudienplan;
    console.log('[register-class] MTEC Studiengang-Klasse registriert');
} else {
    console.warn('[register-class] MTEC Klasse nicht gefunden – Fallback aktiv');
}