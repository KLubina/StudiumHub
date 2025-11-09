/* ==== HSLU EIT CLASS REGISTRATION ==== */
/* Setzt die spezifische Studiengang-Klasse für das zentrale System.
 * Diese Datei ersetzt das frühere index.js und folgt dem neuen Namensschema
 * register-class.js, das vom Loader automatisch erkannt wird.
 */

// Erwartet: window.HSLUEITStudienplan wurde in einer anderen Datei definiert
// (z.B. class-definition oder zusammen mit Erweiterungen). Falls nicht vorhanden,
// tut diese Registrierung nichts kaputt.

if (window.HSLUEITStudienplan) {
    window.StudiengangCustomClass = window.HSLUEITStudienplan;
    console.log('[register-class] HSLU EIT Studiengang-Klasse registriert');
} else {
    console.warn('[register-class] HSLU EIT Klasse nicht gefunden – fällt auf Fallback zurück');
}