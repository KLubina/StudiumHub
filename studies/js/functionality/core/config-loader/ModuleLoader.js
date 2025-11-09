/* Module Loading Logic */

class ModuleLoader {
    constructor() {
        this.loadedModules = new Set();
    }

    async loadModule(url) {
        return new Promise((resolve, reject) => {
            if (this.loadedModules.has(url)) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = url;
            script.async = false;
            script.onload = () => {
                this.loadedModules.add(url);
                console.log(`✅ Geladen: ${url}`);
                resolve();
            };
            script.onerror = () => {
                reject(new Error(`Fehler beim Laden von ${url}`));
            };
            document.head.appendChild(script);
        });
    }

    async loadOptionalModule(url) {
        try {
            let okToLoad = false;
            try {
                const resp = await fetch(url, { method: 'GET' });
                if (resp.ok) {
                    const ct = resp.headers.get('content-type') || '';
                    if (/javascript|application\/ecmascript|text\/javascript/.test(ct) || url.endsWith('.js')) {
                        okToLoad = true;
                    } else {
                        console.warn(`Optionales Modul übersprungen (ungültiger Content-Type): ${url} (${ct})`);
                    }
                } else {
                    console.warn(`Optionales Modul nicht gefunden (HTTP ${resp.status}): ${url}`);
                }
            } catch (fetchErr) {
                console.warn(`Konnte Modul vorab nicht prüfen, versuche zu laden: ${url}`, fetchErr);
                okToLoad = true;
            }

            if (okToLoad) {
                await this.loadModule(url);
            }
        } catch (error) {
            console.warn(`Optionales Modul konnte nicht geladen werden: ${url}`, error);
        }
    }

    cleanup() {
        this.loadedModules.forEach(url => {
            const scripts = document.querySelectorAll(`script[src="${url}"]`);
            scripts.forEach(script => script.remove());
        });
    }
}

window.ModuleLoader = ModuleLoader;
