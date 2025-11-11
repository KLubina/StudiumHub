/**
 * KP COUNTER - Optionale KP-Zähl-Funktionalität
 */

window.StudienplanKPCounter = {
    initialize() {
        // Verhindere doppelte Initialisierung
        if (this._initialized) return;
        this._initialized = true;

        // Erstelle KP-Counter Box wenn sie noch nicht existiert
        this.createCounterBox();

        // Berechne und zeige Gesamt-KP
        this.updateTotalKP();

        // Starte Beobachtung des DOM, damit Änderungen an Modulen automatisch nachgezählt werden
        this.startMutationObserver();
    },

    createCounterBox() {
        // Schaue ob Counter-Box bereits existiert
        if (document.getElementById('kp-counter')) {
            return;
        }

        // Erstelle Container für KP-Counter
        const counterBox = document.createElement('div');
        counterBox.id = 'kp-counter';
        counterBox.className = 'kp-counter-box';

        // Füge IN die Farben-Legende ein (am Ende)
        const legendeContainer = document.querySelector('.farben-legende');
        if (legendeContainer) {
            legendeContainer.appendChild(counterBox);
        }
    },

    updateTotalKP() {
        const modules = document.querySelectorAll('.modul');
        let total = 0;

        modules.forEach(module => {
            const ects = parseInt(module.dataset.ects) || 0;
            total += ects;
        });

        // Zeige in KP-Counter Box
        const counterBox = document.getElementById('kp-counter');
        if (counterBox) {
            counterBox.innerHTML = `<div id="kp-total">Gesamt: <strong>${total} KP</strong> (mind. 180 KP erforderlich)</div>`;
        }
    }

    // Alias-Methode für Abwärtskompatibilität (anderes Modul ruft updateCounter())
    ,updateCounter() {
        this.updateTotalKP();
    }

    // Beobachtet DOM-Änderungen und aktualisiert den KP-Counter bei hinzugefügten/entfernten Modulen
    ,startMutationObserver() {
        if (this._observer) return;

        const observer = new MutationObserver((mutations) => {
            // Debounce: kurz warten, falls mehrere Änderungen in Folge auftreten
            if (this._debounceTimer) clearTimeout(this._debounceTimer);
            this._debounceTimer = setTimeout(() => {
                // Prüfe ob relevante Änderungen vorhanden sind
                const relevant = mutations.some(m => {
                    return Array.from(m.addedNodes).some(n => n.nodeType === 1 && n.classList && n.classList.contains('modul')) ||
                           Array.from(m.removedNodes).some(n => n.nodeType === 1 && n.classList && n.classList.contains('modul'));
                });
                if (relevant) this.updateTotalKP();
            }, 50);
        });

        observer.observe(document.body, { childList: true, subtree: true });
        this._observer = observer;
    }
};

// Initialisiere wenn DOM ready
document.addEventListener('DOMContentLoaded', () => {
    window.StudienplanKPCounter.initialize();
});

// Falls das Script nach dem DOMContentLoaded geladen wird, sofort initialisieren
if (document.readyState === 'interactive' || document.readyState === 'complete') {
    // Kleiner Timeout, damit andere Module (z.B. Layout) zuerst ihre Arbeit beenden können
    setTimeout(() => window.StudienplanKPCounter.initialize(), 0);
}

// Markiere als geladen
window.subModulesReady['kp-counter'] = Promise.resolve();