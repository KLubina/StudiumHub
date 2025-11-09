StudienplanBase.prototype.createModule = function (modul, container) {
  // Do not render placeholder or empty modules (e.g. small legend placeholders)
  // Skip modules with non-positive KP, explicit isPlaceholder flag, or known placeholder names
  if (!modul || modul.isPlaceholder || (typeof modul.kp === 'number' && modul.kp <= 0)) {
    return null;
  }

  // Also skip common placeholder titles used in some configs
  const skipNames = ["Kernfächer", "Vertiefungsgebiet", "Vertiefungsgebiete", "Wahlfächer", "Alle Kernfächer"];
  if (modul.name && skipNames.includes(modul.name)) {
    return null;
  }

  const div = document.createElement("div");
  div.classList.add("modul");

  // Speichere den unveränderten Originalnamen für spätere Farbzuordnung (ColorManager)
  // Falls der sichtbare Titel gekürzt oder angepasst wird, bleibt originalName unverändert.
  if (modul.name) {
    div.dataset.originalName = modul.name;
  }

  const cssClass = this.getModuleCssClass(modul);
  if (cssClass) {
    div.classList.add(cssClass);
  }

  this.setModuleSize(div, modul);
  this.createModuleContent(div, modul);
  this.addModuleEvents(div, modul);

  if (this.config.enableTooltips) {
    div.classList.add("clickable");
  }
  if (this.config.enableHover) {
    div.classList.add("hover-enabled");
  }
  if (modul.kp >= 10) {
    div.classList.add("large-module");
  } else if (modul.kp <= 3) {
    div.classList.add("small-module");
  }

  container.appendChild(div);

  setTimeout(() => {
    this.fitText(div, ".modul-kp");
    this.fitText(div, ".modul-titel");

    if (modul.kp <= 2) {
      this.adjustSmallModule(div, modul);
    }
  }, 0);

  return div;
};

StudienplanBase.prototype.getModuleCssClass = function (modul) {
  if (modul.pruefungsblock) {
    const block = this.config.pruefungsbloecke.find(
      (b) => b.name === modul.pruefungsblock
    );
    return block.cssClass;
  }

  if (modul.kategorie) {
    return this.config.kategorieZuKlasse[modul.kategorie];
  }

  return modul.kategorie;
};

StudienplanBase.prototype.setModuleSize = function (div, modul) {
  const sizing = this.config.moduleSizing || "proportional";

  if (sizing === "proportional") {
    this.setProportionalSize(div, modul);
  } else if (sizing === "fixed") {
    this.setFixedSize(div, modul);
  } else if (sizing === "custom") {
    this.config.customSizing(div, modul);
  }
};

StudienplanBase.prototype.setProportionalSize = function (div, modul) {
  const basisArea = this.config.basisArea || 2500;
  const aspectRatio = this.getAspectRatio(modul);

  const area = modul.kp * basisArea;
  const width = Math.sqrt(area * aspectRatio);
  const height = area / width;

  div.style.width = `${Math.round(width)}px`;
  div.style.height = `${Math.round(height)}px`;
};

StudienplanBase.prototype.setFixedSize = function (div, modul) {
  let width = this.config.baseWidth || 160;
  let height = this.config.baseHeight || 80;

  if (modul.name.length > 60) {
    if (modul.name.includes(":")) {
      const shortName = modul.name.split(":")[1].trim();
      if (shortName.length <= 57) {
        modul.name = shortName;
      } else {
        modul.name = modul.name.substring(0, 57) + "...";
      }
    } else {
      modul.name = modul.name.substring(0, 57) + "...";
    }
  }

  if (this.config.useEctsBasedSizing) {
    const baseWidthForCategory = this.getBaseWidthForCategory(modul);
    width = Math.max(baseWidthForCategory, Math.sqrt(modul.kp) * 80);
    height = Math.max(45, modul.kp * 25);
  }

  div.style.width = `${width}px`;
  div.style.height = `${height}px`;
};

StudienplanBase.prototype.getBaseWidthForCategory = function (modul) {
  if (modul.kategorie === "kontext") return 180;
  if (
    modul.name.includes("Fundamentals and Methods of Computer Science") ||
    modul.name.includes("Business-to-IT-Innovation")
  )
    return 200;
  return 160;
};

StudienplanBase.prototype.getAspectRatio = function (modul) {
  if (this.config.aspectRatios) {
    for (const [condition, ratio] of Object.entries(this.config.aspectRatios)) {
      if (this.checkCondition(modul, condition)) {
        return ratio;
      }
    }
  }

  return this.config.defaultAspectRatio || 1.5;
};

StudienplanBase.prototype.checkCondition = function (modul, condition) {
  if (modul.name === condition) {
    return true;
  }

  if (condition === "longName") {
    return modul.name.length > 30;
  }
  if (condition === "specialModule") {
    return (
      modul.name.includes("Spezialisierung") ||
      modul.name.includes("Bachelorarbeit")
    );
  }
  if (condition.startsWith("category:")) {
    return modul.kategorie === condition.split(":")[1];
  }
  if (condition === "longModuleName") {
    return (
      modul.name.includes("Netzwerke und Schaltungen") ||
      modul.name.includes("Elektromagnetische Felder") ||
      modul.name.includes("Kommunikation") ||
      modul.name.includes("Analysis") ||
      modul.name.includes("Algebra") ||
      modul.name.includes("Datenstrukturen") ||
      modul.name.includes("Computational") ||
      modul.name.includes("Probability Theory") ||
      modul.name.includes("Algebraic Geometry")
    );
  }
  return false;
};

StudienplanBase.prototype.createModuleContent = function (div, modul) {
  const details = this.config.modulDetails[modul.name];
  
  // Container für alle Indikatoren erstellen
  const hasAnyIndicator = (details && details.vorlesungslink) || 
                         (details && details.link) || 
                         (details && (details.pruefungen || details.pruefungslink)) ||
                         (details && details.kurslink);
  
  let indicatorsContainer;
  if (hasAnyIndicator) {
    indicatorsContainer = document.createElement("div");
    indicatorsContainer.classList.add("indicators-container");
    div.appendChild(indicatorsContainer);
  }

  if (details && details.vorlesungslink) {
    const videoIndicator = document.createElement("div");
    videoIndicator.classList.add("video-indicator");
    videoIndicator.innerHTML = "🎥";
    videoIndicator.title = "Vorlesungsvideo verfügbar";
    indicatorsContainer.appendChild(videoIndicator);
  }

  // Link-Indikator für VVZ-Links
  if (details && details.link) {
    const linkIndicator = document.createElement("div");
    linkIndicator.classList.add("link-indicator");
    linkIndicator.innerHTML = "🔗";
    linkIndicator.title = "Weitere Infos (VVZ) verfügbar";
    indicatorsContainer.appendChild(linkIndicator);
  }

  // Kurs-Indikator für Kurswebseiten / Materialien
  if (details && details.kurslink) {
    const kursIndicator = document.createElement("div");
    kursIndicator.classList.add("kurs-indicator");
    kursIndicator.innerHTML = "📚";
    kursIndicator.title = "Kursmaterial / Webseiten verfügbar";
    indicatorsContainer.appendChild(kursIndicator);
  }

  // Prüfungs-Indikator für alte Prüfungen
  if (details && (details.pruefungen || details.pruefungslink)) {
    const examIndicator = document.createElement("div");
    examIndicator.classList.add("exam-indicator");
    examIndicator.innerHTML = "📋";
    examIndicator.title = "Alte Prüfungen verfügbar";
    indicatorsContainer.appendChild(examIndicator);
  }

  const kpDiv = document.createElement("div");
  kpDiv.classList.add("modul-kp");
  kpDiv.textContent = `${modul.kp} ${this.config.creditUnit || "KP"}`;
  div.appendChild(kpDiv);

  if (modul.name === "Spezialisierung" && modul.inhalt) {
    this.createSpecializationContent(div, modul);
  } else {
    const titleDiv = document.createElement("div");
    titleDiv.classList.add("modul-titel");
    titleDiv.textContent = modul.name;
    div.appendChild(titleDiv);
  }
};

StudienplanBase.prototype.createSpecializationContent = function (div, modul) {
  const spezTitel = document.createElement("div");
  spezTitel.classList.add("spezialisierung-titel");
  spezTitel.textContent = "Eine Spezialisierung auswählen:";
  div.appendChild(spezTitel);

  const bulletList = document.createElement("ul");
  bulletList.classList.add("bullet-list");

  modul.inhalt.forEach((option) => {
    const listItem = document.createElement("li");
    listItem.textContent = option;
    bulletList.appendChild(listItem);
  });

  div.appendChild(bulletList);
};

StudienplanBase.prototype.addModuleEvents = function (div, modul) {
  if (this.config.enableTooltips) {
    div.addEventListener("click", (event) => {
      this.showTooltip(modul, event);
    });
  }
};
