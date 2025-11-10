/* Tooltip Display Logic */

StudienplanBase.prototype.showTooltip = function (modul, event) {
    this.tooltipEl = document.getElementById("tooltip");

    if (this.aktivesModul === modul) return;

    this.aktivesModul = modul;
    this.tooltipEl.innerHTML = "";

    const tooltipContent = this.createTooltipContent(modul);
    this.tooltipEl.appendChild(tooltipContent);

    const closeBtn = document.createElement("div");
    closeBtn.classList.add("close-btn");
    closeBtn.textContent = "×";
    closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.hideTooltip();
    });
    this.tooltipEl.appendChild(closeBtn);

    this.tooltipEl.style.top = event.clientY + 10 + "px";
    this.tooltipEl.style.left = event.clientX + 10 + "px";
    this.tooltipEl.style.display = "block";
};

StudienplanBase.prototype.hideTooltip = function () {
    if (!this.tooltipEl) {
        this.tooltipEl = document.getElementById("tooltip");
    }
    if (this.tooltipEl) {
        this.tooltipEl.style.display = "none";
    }
    this.aktivesModul = null;
    this.isVertiefungsgebieteTooltipLocked = false;
    this.isWahlfaecherTooltipLocked = false;
};

StudienplanBase.prototype.showCustomTooltip = function (content, event) {
    this.tooltipEl = document.getElementById("tooltip");

    this.tooltipEl.innerHTML = content;

    const closeBtn = document.createElement("div");
    closeBtn.classList.add("close-btn");
    closeBtn.textContent = "×";
    closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.hideTooltip();
    });
    this.tooltipEl.appendChild(closeBtn);

    const windowWidth = window.innerWidth;
    const tooltipWidth = 500;

    this.tooltipEl.style.top = "100px";
    this.tooltipEl.style.left = windowWidth - tooltipWidth - 100 + "px";
    this.tooltipEl.style.maxWidth = tooltipWidth + "px";
    this.tooltipEl.style.width = tooltipWidth + "px";
    this.tooltipEl.style.display = "block";
};
