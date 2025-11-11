/**
 * TOOLTIP - Optionale Tooltip-Funktionalität
 * Click-basierte Modul-Details
 */

window.StudienplanTooltip = {
    currentTooltip: null,

    initialize() {
        // Klick-Listener für alle Module (außer Platzhaltern)
        document.addEventListener('click', (e) => {
            const modul = e.target.closest('.modul');
            if (modul && !modul.classList.contains('modul-platzhalter')) {
                e.preventDefault();
                e.stopPropagation();
                this.showTooltip(modul);
            } else if (e.target.closest('.tooltip-container')) {
                // Klick im Tooltip - nicht schließen
                return;
            } else {
                // Klick außerhalb - Tooltip schließen
                this.hideTooltip();
            }
        });

        console.log('✅ Tooltip-System initialisiert (Click-basiert)');
    },

    showTooltip(moduleElement) {
        const tooltip = document.getElementById('tooltip');
        if (!tooltip) return;

        const name = moduleElement.querySelector('.modul-titel')?.textContent;
        const ects = moduleElement.querySelector('.modul-kp')?.textContent;

        // Hole Details aus window.StudiengangModuleDetails
        let detailsHTML = '';
        if (window.StudiengangModuleDetails && window.StudiengangModuleDetails[name]) {
            const details = window.StudiengangModuleDetails[name];
            
            detailsHTML = `
                <h3>${name}</h3>
                ${ects ? `<div style="font-size: 0.9em; color: #666; margin-bottom: 8px;">${ects}</div>` : ''}
            `;

            if (details.kurzbeschreibung) {
                detailsHTML += `
                    <h4>Kurzbeschreibung</h4>
                    <p>${details.kurzbeschreibung}</p>
                `;
            }

            if (details.inhalt) {
                detailsHTML += `
                    <h4>Inhalte</h4>
                    <p style="white-space: pre-wrap; font-size: 0.85em; line-height: 1.3;">${details.inhalt}</p>
                `;
            }

            // Links
            if (details.vorlesungslink || details.pruefungen || details.link) {
                detailsHTML += '<h4>Ressourcen</h4>';
                if (details.vorlesungslink) {
                    detailsHTML += `<p><a href="${details.vorlesungslink}" target="_blank">🎥 Vorlesungsvideos</a></p>`;
                }
                if (details.pruefungen) {
                    detailsHTML += `<p><a href="${details.pruefungen}" target="_blank">📝 Alte Prüfungen</a></p>`;
                }
                if (details.link) {
                    detailsHTML += `<p><a href="${details.link}" target="_blank">📖 VVZ Seite</a></p>`;
                }
            }
        } else {
            // Fallback ohne Details
            detailsHTML = `
                <h3>${name}</h3>
                ${ects ? `<div style="font-size: 0.9em; color: #666;">${ects}</div>` : ''}
                <p style="color: #999; font-size: 0.9em;">Keine weiteren Details verfügbar</p>
            `;
        }

        tooltip.innerHTML = detailsHTML;
        
        // Positioniere Tooltip direkt neben dem Modul
        const rect = moduleElement.getBoundingClientRect();
        const tooltipWidth = 320;
        const padding = 10;
        
        // Standard: rechts vom Modul
        let left = rect.right + padding;
        let top = rect.top + window.scrollY;
        
        // Wenn rechts nicht passt: links vom Modul
        if (left + tooltipWidth > window.innerWidth - padding) {
            left = rect.left - tooltipWidth - padding;
        }
        
        // Fallback: wenn auch links nicht passt, zentriere
        if (left < padding) {
            left = padding;
        }
        
        tooltip.style.position = 'absolute';
        tooltip.style.left = left + 'px';
        tooltip.style.top = top + 'px';
        tooltip.style.display = 'block';
        
        this.currentTooltip = moduleElement;
    },

    hideTooltip() {
        const tooltip = document.getElementById('tooltip');
        if (tooltip) {
            tooltip.style.display = 'none';
        }
        this.currentTooltip = null;
    }
};

// Initialisiere sofort oder wenn DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.StudienplanTooltip.initialize();
    });
} else {
    window.StudienplanTooltip.initialize();
}

// Markiere als geladen
window.subModulesReady['tooltip'] = Promise.resolve();
