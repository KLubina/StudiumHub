/* Module Content Creation */

StudienplanBase.prototype.createModuleContent = function (div, modul) {
    const details = this.config.modulDetails[modul.name];

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

    if (details && details.link) {
        const linkIndicator = document.createElement("div");
        linkIndicator.classList.add("link-indicator");
        linkIndicator.innerHTML = "🔗";
        linkIndicator.title = "Weitere Infos (VVZ) verfügbar";
        indicatorsContainer.appendChild(linkIndicator);
    }

    if (details && details.kurslink) {
        const kursIndicator = document.createElement("div");
        kursIndicator.classList.add("kurs-indicator");
        kursIndicator.innerHTML = "📚";
        kursIndicator.title = "Kursmaterial / Webseiten verfügbar";
        indicatorsContainer.appendChild(kursIndicator);
    }

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
