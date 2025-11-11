/**
 * TOOLTIP - Optionale Tooltip-Funktionalität
 */

window.StudienplanTooltip = {
    initialize() {
        // Füge Event-Listener für Module hinzu
        document.addEventListener('mouseover', (e) => {
            if (e.target.classList.contains('modul') || e.target.closest('.modul')) {
                this.showTooltip(e.target.closest('.modul'));
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (e.target.classList.contains('modul') || e.target.closest('.modul')) {
                this.hideTooltip();
            }
        });
    },

    showTooltip(moduleElement) {
        const tooltip = document.getElementById('tooltip');
        if (!tooltip) return;

        const name = moduleElement.querySelector('.modul-titel').textContent;
        const ects = moduleElement.querySelector('.modul-kp').textContent;

        tooltip.innerHTML = `
            <div class="tooltip-content">
                <div class="tooltip-name">${name}</div>
                <div class="tooltip-ects">${ects}</div>
            </div>
        `;

        tooltip.style.display = 'block';
        // Positioniere Tooltip (einfach)
        tooltip.style.left = (event.pageX + 10) + 'px';
        tooltip.style.top = (event.pageY + 10) + 'px';
    },

    hideTooltip() {
        const tooltip = document.getElementById('tooltip');
        if (tooltip) {
            tooltip.style.display = 'none';
        }
    }
};

// Initialisiere wenn DOM ready
document.addEventListener('DOMContentLoaded', () => {
    window.StudienplanTooltip.initialize();
});

// Markiere als geladen
window.subModulesReady['tooltip'] = Promise.resolve();