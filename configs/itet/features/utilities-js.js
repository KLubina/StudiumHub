// utilities.js - Allgemeine Hilfsfunktionen

window.ITETUtilities = {
  showMessage(message, type = "info") {
    const toast = document.createElement("div");
    toast.style.cssText = `
      position: fixed; top: 20px; right: 20px; padding: 10px 15px;
      border-radius: 5px; z-index: 9999; font-size: 12px; font-weight: bold;
    `;
    toast.textContent = message;

    const colors = {
      success: { bg: "#28a745", color: "white" },
      warning: { bg: "#ffc107", color: "black" },
      info: { bg: "#17a2b8", color: "white" },
      error: { bg: "#dc3545", color: "white" }
    };

    const style = colors[type] || colors.info;
    toast.style.backgroundColor = style.bg;
    toast.style.color = style.color;

    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  },

  downloadJSON(data, filename) {
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.style.display = "none";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },

  getCategoryColor(kategorie) {
    const colorMap = {
      "Obligatorische Fächer": "#0D5B8C",
      "Obligatorische Praktikum": "#00A0E3",
      "Wahl Praktika-Projekte-Seminare": "#4CA64C",
      "Kernfächer nach Schwerpunkt": "#DD98DD",
      "Wahlfächer": "#F2B48F",
      "Wissenschaftliche Arbeit": "#888888",
      "Weitere Wahl-Grundlagenfächer": "#FFD700"
    };
    return colorMap[kategorie] || "#666666";
  }
};

console.log("✅ ITET Utilities geladen");