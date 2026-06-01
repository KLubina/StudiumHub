const Navigation = {
  updateFloatingNav(data) {
    const navContent = document.getElementById("floatingNavContent");
    navContent.innerHTML = "";

    if (data.length === 0) {
      return;
    }

    const currentView = State.getView();

    if (currentView === "category") {
      const categories = new Set();
      data.forEach((inst) => {
        inst.categories.forEach((cat) => {
          categories.add(cat.name);
        });
      });

      const sortedCategories = Array.from(categories).sort();
      sortedCategories.forEach((catName) => {
        const item = document.createElement("div");
        item.className = "floating-nav-item";
        item.textContent = catName;
        item.onclick = () => this.scrollToSection(catName);
        navContent.appendChild(item);
      });
    } else {
      data.forEach((inst) => {
        const item = document.createElement("div");
        item.className = "floating-nav-item";
        const prefix = inst.type === "uni" ? "[Uni] " : "[FH] ";
        item.textContent = prefix + inst.name;
        item.onclick = () => this.scrollToSection(inst.name);
        navContent.appendChild(item);
      });
    }
  },

  scrollToSection(name) {
    const sectionId = "section-" + sanitizeId(name);
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });

      if (section.classList.contains("collapsed")) {
        section.classList.remove("collapsed");
      }
    }
  },
};
