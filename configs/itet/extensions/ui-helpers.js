/* ==== ITET UI HELPERS ==== */
/* UI Helper Funktionen für ITET Studienplan */

// UI Helper Methoden zur ITETStudienplan Klasse hinzufügen
Object.assign(window.ITETStudienplan.prototype, {
    
    /**
     * Zeigt eine Toast-Nachricht an
     */
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
        toast.style.animation = 'slideInRight 0.3s ease-out';
        toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
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

        // Auto-remove nach 3 Sekunden
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    },

    /**
     * Extrahiert den Modulnamen aus einem Modul-Element
     */
    getModuleName(modulEl) {
        const nameEl = modulEl.querySelector('.modul-titel');
        return nameEl ? nameEl.textContent.trim() : '';
    },

    /**
     * Setzt Praktika-Box Styling zurück
     */
    resetPraktikaBoxStyle(box) {
        box.style.borderColor = '';
        box.style.backgroundColor = '';
        box.style.transform = '';
    },

    /**
     * Zeigt einen benutzerdefinierten Tooltip an
     */
    showCustomTooltip(content, event) {
        if (!this.tooltipEl) {
            this.tooltipEl = document.getElementById('tooltip');
        }
        
        this.tooltipEl.innerHTML = content;
        
        const closeBtn = document.createElement('div');
        closeBtn.classList.add('close-btn');
        closeBtn.textContent = '×';
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.hideTooltip();
        });
        this.tooltipEl.appendChild(closeBtn);
        
        const windowWidth = window.innerWidth;
        const tooltipWidth = 600;
        
        this.tooltipEl.style.top = '100px';
        this.tooltipEl.style.left = (windowWidth - tooltipWidth - 100) + 'px';
        this.tooltipEl.style.maxWidth = tooltipWidth + 'px';
        this.tooltipEl.style.width = tooltipWidth + 'px';
        this.tooltipEl.style.display = 'block';
    },

    /**
     * Versteckt den aktiven Tooltip
     */
    hideTooltip() {
        if (this.tooltipEl) {
            this.tooltipEl.style.display = 'none';
        }
        this.aktivesModul = null;
        this.isPraktikaTooltipLocked = false;
    },

    /**
     * Passt Text-Größe automatisch an Container an
     */
    fitText(container, selector) {
        const node = container.querySelector(selector);
        if (!node) return;

        let fs = 16;
        node.style.fontSize = fs + 'px';

        const containerWidth = container.clientWidth - 10;
        const containerHeight = selector === '.modul-titel' 
            ? container.clientHeight * 0.7 - 10 
            : container.clientHeight * 0.3 - 5;

        while ((node.scrollWidth > containerWidth || node.scrollHeight > containerHeight) && fs > 6) {
            fs--;
            node.style.fontSize = fs + 'px';
        }

        if (fs <= 8) {
            node.style.lineHeight = '1';
            if (selector === '.modul-titel') {
                node.style.margin = '1px 0';
                if (fs === 6) {
                    node.style.textOverflow = 'ellipsis';
                    node.style.whiteSpace = 'nowrap';
                }
            }
        }
    },

    /**
     * Zeigt Loading-Indikator
     */
    showLoading(message = 'Laden...') {
        const loader = document.createElement('div');
        loader.id = 'itet-loader';
        loader.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 10000;
            text-align: center;
        `;
        
        loader.innerHTML = `
            <div style="margin-bottom: 10px;">
                <div style="border: 3px solid #f3f3f3; border-radius: 50%; border-top: 3px solid #0D5B8C; width: 30px; height: 30px; animation: spin 1s linear infinite; margin: 0 auto;"></div>
            </div>
            <div>${message}</div>
        `;
        
        document.body.appendChild(loader);
        return loader;
    },

    /**
     * Versteckt Loading-Indikator
     */
    hideLoading() {
        const loader = document.getElementById('itet-loader');
        if (loader) {
            loader.remove();
        }
    },

    /**
     * Erstellt eine Bestätigungsdialog
     */
    showConfirmDialog(message, onConfirm, onCancel = null) {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 10000;
            display: flex;
            justify-content: center;
            align-items: center;
        `;

        const dialog = document.createElement('div');
        dialog.style.cssText = `
            background: white;
            border-radius: 8px;
            padding: 20px;
            max-width: 400px;
            text-align: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `;

        dialog.innerHTML = `
            <div style="margin-bottom: 20px; font-size: 16px;">${message}</div>
            <div>
                <button id="confirm-yes" style="background: #28a745; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; margin-right: 10px;">Ja</button>
                <button id="confirm-no" style="background: #dc3545; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer;">Nein</button>
            </div>
        `;

        modal.appendChild(dialog);
        document.body.appendChild(modal);

        // Event Listeners
        dialog.querySelector('#confirm-yes').addEventListener('click', () => {
            modal.remove();
            if (onConfirm) onConfirm();
        });

        dialog.querySelector('#confirm-no').addEventListener('click', () => {
            modal.remove();
            if (onCancel) onCancel();
        });

        // Click outside to close
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
                if (onCancel) onCancel();
            }
        });

        return modal;
    }
});

// CSS für Animationen hinzufügen
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

console.log('✅ UI Helpers geladen');