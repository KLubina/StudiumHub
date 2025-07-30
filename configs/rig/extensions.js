/* ==== RIG EXTENSIONS ==== */
/* Spezielle Funktionalitäten und erweiterte Klasse für den RIG Studiengang */

/* ==== RIG-SPEZIFISCHE ERWEITERUNGEN ==== */
// Erweiterte Klasse für RIG-spezifische Features
window.StudiengangCustomClass = class RIGStudienplan extends StudienplanBase {
    constructor(config) {
        super(config);
        this.isWahlmoduleTooltipLocked = false;
    }

    // Überschreibe addLegendTooltipEvents für Wahlmodule-Tooltips
    addLegendTooltipEvents(div, kategorie) {
        if (kategorie.klasse === "wahlmodule") {
            div.addEventListener("mouseenter", (event) => {
                this.showWahlmoduleTooltip(event);
            });

            div.addEventListener("mouseleave", () => {
                if (!this.isWahlmoduleTooltipLocked) {
                    this.hideTooltip();
                }
            });

            div.addEventListener("click", (event) => {
                this.isWahlmoduleTooltipLocked = !this.isWahlmoduleTooltipLocked;
                if (this.isWahlmoduleTooltipLocked) {
                    this.showWahlmoduleTooltip(event);
                } else {
                    this.hideTooltip();
                }
            });
        }
    }

    showWahlmoduleTooltip(event) {
        const content = `
            <div class="wahlmodule-liste">
                <h3>Wahlmodule-Bereiche (3 aus 6 auswählen)</h3>
                
                <h4>Geodäsie und Satellitennavigation</h4>
                <ul>
                    <li>Physikalische und kinematische Geodäsie – 6 KP</li>
                    <li>Globale Satellitennavigationssysteme – 3 KP</li>
                    <li>Geodätische Datenanalyse – 3 KP</li>
                    <li>Navigation – 3 KP</li>
                </ul>
                
                <h4>Digitalisierung und 3D-Modellierung</h4>
                <ul>
                    <li>Photogrammetrie – 6 KP</li>
                    <li>Geodätische Messtechnik und Laserscanning – 6 KP</li>
                    <li>Bildverarbeitung – 3 KP</li>
                </ul>
                
                <h4>GIS und Kartografie</h4>
                <ul>
                    <li>Kartografie II – 6 KP</li>
                    <li>Geoinformationstechnologien und -analysen – 6 KP</li>
                    <li>Projekt GIS & Kartografie – 3 KP</li>
                </ul>
                
                <h4>Raum- und Umweltplanung</h4>
                <ul>
                    <li>Umweltplanung – 3 KP</li>
                    <li>Umweltverträglichkeitsprüfung – 3 KP</li>
                    <li>Integrierte Raumentwicklung in Städten und Quartieren – 6 KP</li>
                    <li>Angewandte Planung zur nachhaltigen Siedlungsentwicklung – 3 KP</li>
                </ul>
                
                <h4>Verkehrssysteme</h4>
                <ul>
                    <li>Verkehrsplanung – 3 KP</li>
                    <li>Projektübung Verkehr – 6 KP</li>
                    <li>Public transport and railways – 3 KP</li>
                    <li>Road Transport Systems – 3 KP</li>
                </ul>
                
                <h4>Netzinfrastrukturen</h4>
                <ul>
                    <li>Einführung in elektrische Energiesysteme – 2 KP</li>
                    <li>Siedlungswasserwirtschaft GZ – 6 KP</li>
                    <li>Strasseninfrastruktur – 3 KP</li>
                    <li>Bahninfrastrukturen 1 – 2 KP</li>
                    <li>Perspekt. auf Landschaft und urbane Transf. II – 2 KP</li>
                </ul>
            </div>
        `;
        this.showCustomTooltip(content, event);
    }

    hideTooltip() {
        if (this.tooltipEl) {
            this.tooltipEl.style.display = 'none';
        }
        this.aktivesModul = null;
        this.isWahlmoduleTooltipLocked = false;
    }
};