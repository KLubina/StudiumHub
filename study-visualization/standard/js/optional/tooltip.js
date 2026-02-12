/**
 * TOOLTIP - Optionale Tooltip-Funktionalität
 * Click-basierte Modul-Details
 */

window.StudienplanTooltip = {
  currentTooltip: null,

  initialize() {
    // Klick-Listener für alle Module (außer Platzhaltern)
    document.addEventListener("click", (e) => {
      const modul = e.target.closest(".modul");
      if (modul && !modul.classList.contains("modul-platzhalter")) {
        e.preventDefault();
        e.stopPropagation();
        this.showTooltip(modul);
      } else if (e.target.closest(".tooltip-container")) {
        // Klick im Tooltip - nicht schließen
        return;
      } else {
        // Klick außerhalb - Tooltip schließen
        this.hideTooltip();
      }
    });

    // Warte bis Details geladen sind, dann füge Indikatoren hinzu
    this.waitForDetailsAndAddIndicators();

    console.log("✅ Tooltip-System initialisiert (Click-basiert)");
  },

  waitForDetailsAndAddIndicators() {
    // Prüfe wiederholt ob Details geladen sind
    const checkDetails = () => {
      if (
        window.StudiengangModuleDetails &&
        Object.keys(window.StudiengangModuleDetails).length > 0
      ) {
        this.addIndicatorsToAllModules();
      } else {
        // Versuche in 100ms wieder
        setTimeout(checkDetails, 100);
      }
    };
    checkDetails();
  },

  addIndicatorsToAllModules() {
    // Finde alle Module (außer Platzhaltern)
    const modules = document.querySelectorAll(".modul:not(.modul-platzhalter)");
    modules.forEach((modul) => {
      const name = modul.querySelector(".modul-titel")?.textContent;
      if (name && window.StudiengangModuleDetails[name]) {
        this.addIndicators(modul, window.StudiengangModuleDetails[name]);
      }
    });
  },

  addIndicators(moduleElement, details) {
    // Prüfe ob schon ein Container existiert
    let container = moduleElement.querySelector(".indicators-container");
    if (!container) {
      container = document.createElement("div");
      container.className = "indicators-container";
      moduleElement.style.position = "relative";
      moduleElement.appendChild(container);
    }

    // Leere Container (um nicht doppelt hinzuzufügen)
    container.innerHTML = "";

    // Füge Indikatoren basierend auf verfügbaren Details hinzu
    if (details.vorlesungslink) {
      const indicator = document.createElement("div");
      indicator.className = "video-indicator";
      indicator.title = "Vorlesungsvideos verfügbar";
      indicator.textContent = "🎥";
      container.appendChild(indicator);
    }

    if (details.skript) {
      const indicator = document.createElement("div");
      indicator.className = "script-indicator";
      indicator.title = "Skript verfügbar";
      indicator.textContent = "📄";
      container.appendChild(indicator);
    }

    if (details.pruefungen) {
      const indicator = document.createElement("div");
      indicator.className = "exam-indicator";
      indicator.title = "Alte Prüfungen verfügbar";
      indicator.textContent = "📝";
      container.appendChild(indicator);
    }

    if (details.link) {
      const indicator = document.createElement("div");
      indicator.className = "link-indicator";
      indicator.title = "VVZ Seite verfügbar";
      indicator.textContent = "📖";
      container.appendChild(indicator);
    }

    if (details.kurslink) {
      const indicator = document.createElement("div");
      indicator.className = "kurslink-indicator";
      indicator.title = "Kursunterlagen verfügbar";
      indicator.textContent = "📚";
      container.appendChild(indicator);
    }
  },

  showTooltip(moduleElement) {
    const tooltip = document.getElementById("tooltip");
    if (!tooltip) return;

    const name = moduleElement.querySelector(".modul-titel")?.textContent;
    const ects = moduleElement.querySelector(".modul-kp")?.textContent;

    // Hole Details aus window.StudiengangModuleDetails
    let detailsHTML = "";
    if (
      window.StudiengangModuleDetails &&
      window.StudiengangModuleDetails[name]
    ) {
      const details = window.StudiengangModuleDetails[name];

      detailsHTML = `
                <h3>${name}</h3>
                ${ects ? `<div style="font-size: 0.9em; color: #666; margin-bottom: 8px;">${ects}</div>` : ""}
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
      if (
        details.vorlesungslink ||
        details.pruefungen ||
        details.skript ||
        details.link ||
        details.kurslink
      ) {
        detailsHTML += "<h4>Ressourcen</h4>";
        if (details.vorlesungslink) {
          detailsHTML += `<p><a href="${details.vorlesungslink}" target="_blank">🎥 Vorlesungsvideos</a></p>`;
        }
        if (details.skript) {
          detailsHTML += `<p><a href="${details.skript}" target="_blank">📄 Skript</a></p>`;
        }
        if (details.pruefungen) {
          detailsHTML += `<p><a href="${details.pruefungen}" target="_blank">📝 Alte Prüfungen</a></p>`;
        }
        if (details.link) {
          if (Array.isArray(details.link)) {
            details.link.forEach((link) => {
              detailsHTML += `<p><a href="${link}" target="_blank">📖 VVZ Seite</a></p>`;
            });
          } else {
            detailsHTML += `<p><a href="${details.link}" target="_blank">📖 VVZ Seite</a></p>`;
          }
        }
        if (details.kurslink) {
          if (
            typeof details.kurslink === "string" &&
            details.kurslink.includes("\n")
          ) {
            // Multiple links separated by newline
            const links = details.kurslink
              .split("\n")
              .filter((link) => link.trim());
            links.forEach((link) => {
              detailsHTML += `<p><a href="${link.trim()}" target="_blank">📚 Kursunterlagen</a></p>`;
            });
          } else {
            detailsHTML += `<p><a href="${details.kurslink}" target="_blank">📚 Kursunterlagen</a></p>`;
          }
        }
      }
    } else {
      // Fallback ohne Details
      detailsHTML = `
                <h3>${name}</h3>
                ${ects ? `<div style="font-size: 0.9em; color: #666;">${ects}</div>` : ""}
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

    tooltip.style.position = "absolute";
    tooltip.style.left = left + "px";
    tooltip.style.top = top + "px";
    tooltip.style.display = "block";

    this.currentTooltip = moduleElement;
  },

  hideTooltip() {
    const tooltip = document.getElementById("tooltip");
    if (tooltip) {
      tooltip.style.display = "none";
    }
    this.currentTooltip = null;
  },
};

// Initialisiere sofort oder wenn DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    window.StudienplanTooltip.initialize();
  });
} else {
  window.StudienplanTooltip.initialize();
}

// Markiere als geladen
window.subModulesReady["tooltip"] = Promise.resolve();
