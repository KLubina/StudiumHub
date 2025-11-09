/* Tooltip Content Builder */

StudienplanBase.prototype.createTooltipContent = function (modul) {
    const fragment = document.createDocumentFragment();
    const details = this.config.modulDetails[modul.name];

    const title = document.createElement("h3");
    title.textContent = modul.name;
    fragment.appendChild(title);

    const kp = document.createElement("p");
    kp.innerHTML = `<strong>${modul.kp} ${
        this.config.creditUnit || "KP"
    }</strong>`;
    fragment.appendChild(kp);

    if (details) {
        if (details.kurzbeschreibung) {
            const kurzbeschreibungTitle = document.createElement("h4");
            kurzbeschreibungTitle.textContent = "Kurzbeschreibung";
            fragment.appendChild(kurzbeschreibungTitle);

            const desc = document.createElement("p");
            desc.innerHTML = details.kurzbeschreibung.replace(/\n/g, "<br>");
            fragment.appendChild(desc);
        }

        if (details.lernziel) {
            const lernzielTitle = document.createElement("h4");
            lernzielTitle.textContent = "Lernziel";
            fragment.appendChild(lernzielTitle);

            const lernziel = document.createElement("p");
            lernziel.innerHTML = details.lernziel.replace(/\n/g, "<br>");
            fragment.appendChild(lernziel);
        }

        if (details.inhalt && details.inhalt.trim() !== "") {
            const inhaltTitle = document.createElement("h4");
            inhaltTitle.textContent = "Inhalt";
            fragment.appendChild(inhaltTitle);

            const inhalt = document.createElement("p");
            inhalt.innerHTML = details.inhalt.replace(/\n/g, "<br>");
            fragment.appendChild(inhalt);
        }

        if (details.link) {
            const linkTitle = document.createElement("h4");
            linkTitle.textContent = "Weitere Informationen";
            fragment.appendChild(linkTitle);

            const linkContainer = document.createElement("p");
            const link = document.createElement("a");
            link.href = details.link;
            link.target = "_blank";
            link.textContent = "Zum Vorlesungsverzeichnis (VVZ)";
            link.style.color = "#0066cc";
            link.style.textDecoration = "underline";
            linkContainer.appendChild(link);
            fragment.appendChild(linkContainer);
        }

        if (details.kurslink) {
            const kursTitle = document.createElement("h4");
            kursTitle.textContent = "Kursmaterial / Webseiten";
            fragment.appendChild(kursTitle);

            const kursContainer = document.createElement("p");

            let links = [];
            if (Array.isArray(details.kurslink)) {
                links = details.kurslink;
            } else if (typeof details.kurslink === "string") {
                links = details.kurslink.split(/\r?\n/).map(s => s.trim()).filter(Boolean);
            }

            links.forEach((url, idx) => {
                const a = document.createElement("a");
                a.href = url;
                a.target = "_blank";
                a.textContent = url;
                a.style.color = "#0066cc";
                a.style.textDecoration = "underline";
                kursContainer.appendChild(a);

                if (idx < links.length - 1) kursContainer.appendChild(document.createElement("br"));
            });

            fragment.appendChild(kursContainer);
        }

        if (details.vorlesungslink) {
            const linkTitle = document.createElement("h4");
            linkTitle.textContent = "Vorlesungsaufzeichnung";
            fragment.appendChild(linkTitle);

            const linkContainer = document.createElement("p");
            const link = document.createElement("a");
            link.href = details.vorlesungslink;
            link.target = "_blank";
            link.textContent = "Zur Vorlesung auf video.ethz.ch";
            link.style.color = "#0066cc";
            link.style.textDecoration = "underline";
            linkContainer.appendChild(link);
            fragment.appendChild(linkContainer);
        }

        const examLink = details.pruefungen || details.pruefungslink;
        if (examLink) {
            const examTitle = document.createElement("h4");
            examTitle.textContent = "Alte Prüfungen";
            fragment.appendChild(examTitle);

            const examContainer = document.createElement("p");
            const examLinkElement = document.createElement("a");
            examLinkElement.href = examLink;
            examLinkElement.target = "_blank";
            examLinkElement.textContent = "Zu den alten Prüfungen auf GitHub";
            examLinkElement.style.color = "#0066cc";
            examLinkElement.style.textDecoration = "underline";
            examContainer.appendChild(examLinkElement);
            fragment.appendChild(examContainer);
        }
    } else {
        const noDetails = document.createElement("p");
        noDetails.textContent = "Keine detaillierten Informationen verfügbar.";
        fragment.appendChild(noDetails);
    }

    return fragment;
};
