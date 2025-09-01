/* ==== RIG UI CONTROLS MANAGER ==== */
/* Verwaltet UI-Kontrollen, Messages und Benutzerinteraktionen */

window.RIGUIControlsManager = {
    init(studienplan) {
        this.studienplan = studienplan;
        this.addWahlmoduleControls();
    },

    addWahlmoduleControls() {
        const legendContainer = document.querySelector(".farben-legende");
        
        const wahlmoduleControls = document.createElement("div");
        wahlmoduleControls.style.marginBottom = "15px";
        wahlmoduleControls.style.padding = "10px";
        wahlmoduleControls.style.backgroundColor = "#fff8f8";
        wahlmoduleControls.style.borderRadius = "5px";
        wahlmoduleControls.style.border = "2px solid #FF6B6B";
        
        wahlmoduleControls.innerHTML = `
            <div style="text-align: center; margin-bottom: 10px;">
                <h4 style="margin: 0 0 8px 0; color: #DC143C;">🎯 Wahlmodule Designer</h4>
                <div style="font-size: 12px; color: #666;">
                    💡 <strong>Ziehe Module aus der Legende direkt in deine Wahlmodule-Boxen!</strong><br>
                    📊 Gewählte Bereiche: <span id="selected-bereiche-count">0</span> von 3<br>
                    📚 Gewählte KP: <span id="selected-kp-count">0</span> von 45 KP
                </div>
                <div style="margin-top: 8px;">
                    <button id="save-wahlmodule" style="background: #28a745; color: white; border: none; padding: 5px 12px; border-radius: 3px; cursor: pointer; margin-right: 5px; font-size: 11px;">💾 Speichern</button>
                    <button id="reset-wahlmodule" style="background: #dc3545; color: white; border: none; padding: 5px 12px; border-radius: 3px; cursor: pointer; font-size: 11px;">🔄 Reset</button>
                </div>
            </div>
        `;

        legendContainer.insertBefore(wahlmoduleControls, legendContainer.firstChild);

        this.setupControlEvents();
    },

    setupControlEvents() {
        document.getElementById('save-wahlmodule').addEventListener('click', () => {
            this.studienplan.wahlmoduleManager.exportWahlmodule();
        });

        document.getElementById('reset-wahlmodule').addEventListener('click', () => {
            this.studienplan.wahlmoduleManager.resetWahlmodule();
        });
    },

    showMessage(message, type = 'info') {
        const toast = document.createElement('div');
        toast.style.position = 'fixed';
        toast.style.top = '20px';
        toast.style.right = '20px';
        toast.style.padding = '10px 15px';
        toast.style.borderRadius = '5px';
        toast.style.zIndex = '9999';
        toast.style.fontSize = '12px';
        toast.style.fontWeight = 'bold';
        toast.textContent = message;

        const colors = {
            success: { bg: '#28a745', color: 'white' },
            warning: { bg: '#ffc107', color: 'black' },
            info: { bg: '#17a2b8', color: 'white' },
            error: { bg: '#dc3545', color: 'white' }
        };

        const style = colors[type] || colors.info;
        toast.style.backgroundColor = style.bg;
        toast.style.color = style.color;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
};