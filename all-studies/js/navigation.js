// Navigation Functions
const Navigation = {
  // Aktualisiere schwebende Navigation
  updateFloatingNav(data) {
    const navContent = document.getElementById('floatingNavContent');
    navContent.innerHTML = '';

    if (data.length === 0) {
      return;
    }

    const currentView = State.getView();

    if (currentView === 'category') {
      // Nach Kategorie: Zeige Kategorien
      const categories = new Set();
      data.forEach(inst => {
        inst.kategorien.forEach(kat => {
          categories.add(kat.name);
        });
      });

      const sortedCategories = Array.from(categories).sort();
      sortedCategories.forEach(catName => {
        const item = document.createElement('div');
        item.className = 'floating-nav-item';
        item.textContent = catName;
        item.onclick = () => this.scrollToSection(catName);
        navContent.appendChild(item);
      });
    } else {
      // Nach Institution: Zeige Institutionen
      data.forEach(inst => {
        const item = document.createElement('div');
        item.className = 'floating-nav-item';
        const prefix = inst.type === 'uni' ? '[Uni] ' : '[FH] ';
        item.textContent = prefix + inst.name;
        item.onclick = () => this.scrollToSection(inst.name);
        navContent.appendChild(item);
      });
    }
  },

  // Scroll zu Sektion
  scrollToSection(name) {
    const sectionId = 'section-' + Utils.sanitizeId(name);
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Öffne die Sektion falls sie collapsed ist
      if (section.classList.contains('collapsed')) {
        section.classList.remove('collapsed');
      }
    }
  }
};
