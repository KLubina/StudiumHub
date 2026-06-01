/* ==== BFH EIT CLASS REGISTRATION ==== */
/* Registriert die BFH EIT spezifische Klasse für das zentrale System.
 * Standardisierter Dateiname: register-class.js
 */

if (window.BFHEITSpecificprogram) {
  window.StudiengangCustomClass = window.BFHEITSpecificprogram;
  console.log("[register-class] BFH EIT Studiengang-Klasse registriert");
} else {
  console.warn(
    "[register-class] BFH EIT Klasse nicht gefunden – verwendet Fallback",
  );
}
