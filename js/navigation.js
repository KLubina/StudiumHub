const Navigation = {
  updateFloatingNav(data) {
    const navContent = document.getElementById("floatingNavContent");
    navContent.innerHTML = "";

    if (data.length === 0) return;

    if (State.getView() === "category") {
      const categories = new Set();
      data.forEach((inst) =>
        inst.categories.forEach((cat) => categories.add(cat.name)),
      );

      Array.from(categories)
        .sort()
        .forEach((catName) => {
          this._createNavItem(navContent, catName, catName);
        });
    } else {
      data.forEach((inst) => {
        const prefix = inst.type === "uni" ? "[Uni] " : "[FH] ";
        this._createNavItem(navContent, inst.name, prefix + inst.name);
      });
    }
  },

  _createNavItem(container, sectionName, label) {
    const item = document.createElement("div");
    item.className = "floating-nav-item";
    item.textContent = label;
    item.onclick = () => this.scrollToSection(sectionName);
    container.appendChild(item);
  },

  scrollToSection(name) {
    const section = document.getElementById("section-" + sanitizeId(name));
    if (!section) return;

    section.scrollIntoView({ behavior: "smooth", block: "start" });
    section.classList.remove("collapsed");
  },
};
