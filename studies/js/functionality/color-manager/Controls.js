/* Color Manager - UI Controls */

StudienplanBaseColorManager.prototype.addControls = function() {
    if (Object.keys(this.modes).length <= 1) return;

    const legende = document.querySelector(".farben-legende");
    if (!legende || legende.querySelector('[data-color-controls]')) return;

    const controls = document.createElement("div");
    controls.setAttribute('data-color-controls', 'true');
    controls.innerHTML = `
        <div style="margin-bottom:15px;padding:10px;background:#f0f0f0;border-radius:5px;">
            <div style="font-weight:bold;margin-bottom:8px;">Färbung nach:</div>
            ${this.createRadioButtons()}
        </div>
    `;

    legende.insertBefore(controls, legende.firstChild);

    controls.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', () => this.setMode(radio.value));
    });

    this.addCSS();
};

StudienplanBaseColorManager.prototype.createRadioButtons = function() {
    return Object.entries(this.modes)
        .map(([mode, label]) => `
            <label style="display:block;margin-bottom:5px;cursor:pointer;">
                <input type="radio" name="color-mode" value="${mode}"
                       ${mode === this.currentMode ? 'checked' : ''}>
                ${label}
            </label>
        `).join('');
};

StudienplanBaseColorManager.prototype.addCSS = function() {
    if (document.getElementById('colormanager-styles')) return;

    const style = document.createElement('style');
    style.id = 'colormanager-styles';
    style.textContent = `
        [data-color-controls] label:hover {
            background: rgba(0,0,0,0.05);
            border-radius: 3px;
            padding: 2px;
        }
    `;
    document.head.appendChild(style);
};
