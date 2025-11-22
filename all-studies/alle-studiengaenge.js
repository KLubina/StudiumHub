// Alle Studiengänge - Main JavaScript

(function () {
  let allData = [];
  let currentView = 'institution'; // 'institution' oder 'category'
  let currentFilters = {
    type: '',
    institution: '',
    category: ''
  };

  // Initialisierung
  document.addEventListener('DOMContentLoaded', function () {
    initializeData();
    populateFilters();
    setupEventListeners();
    renderStudiengaenge();
  });

  function initializeData() {
    // Kombiniere Uni und FH Daten
    const uniData = window.AlleSchweizerStudiengaenge.universitaeten.map(uni => ({
      ...uni,
      type: 'uni'
    }));

    const fhData = window.AlleFHStudiengaenge.fachhochschulen.map(fh => ({
      ...fh,
      type: 'fh'
    }));

    allData = [...uniData, ...fhData];
  }

  function populateFilters() {
    const institutionFilter = document.getElementById('institutionFilter');
    const categoryFilter = document.getElementById('categoryFilter');

    // Sammle alle Hochschulen (sortiert nach Typ und Name)
    const institutions = allData.map(inst => ({
      name: inst.name,
      type: inst.type
    }));

    institutions.forEach(inst => {
      const option = document.createElement('option');
      option.value = inst.name;
      const prefix = inst.type === 'uni' ? '[Uni] ' : '[FH] ';
      option.textContent = prefix + inst.name;
      institutionFilter.appendChild(option);
    });

    // Sammle alle Kategorien (einzigartig)
    const categories = new Set();
    allData.forEach(inst => {
      inst.kategorien.forEach(kat => {
        categories.add(kat.name);
      });
    });

    const sortedCategories = Array.from(categories).sort();
    sortedCategories.forEach(catName => {
      const option = document.createElement('option');
      option.value = catName;
      option.textContent = catName;
      categoryFilter.appendChild(option);
    });
  }

  function setupEventListeners() {
    const typeFilter = document.getElementById('typeFilter');
    const institutionFilter = document.getElementById('institutionFilter');
    const categoryFilter = document.getElementById('categoryFilter');
    const viewByInstitution = document.getElementById('viewByInstitution');
    const viewByCategory = document.getElementById('viewByCategory');

    // View Toggle
    viewByInstitution.addEventListener('click', function () {
      currentView = 'institution';
      viewByInstitution.classList.add('active');
      viewByCategory.classList.remove('active');
      renderStudiengaenge();
    });

    viewByCategory.addEventListener('click', function () {
      currentView = 'category';
      viewByCategory.classList.add('active');
      viewByInstitution.classList.remove('active');
      renderStudiengaenge();
    });

    typeFilter.addEventListener('change', function (e) {
      currentFilters.type = e.target.value;
      renderStudiengaenge();
    });

    institutionFilter.addEventListener('change', function (e) {
      currentFilters.institution = e.target.value;
      renderStudiengaenge();
    });

    categoryFilter.addEventListener('change', function (e) {
      currentFilters.category = e.target.value;
      renderStudiengaenge();
    });
  }

  function filterData() {
    let filtered = JSON.parse(JSON.stringify(allData)); // Deep copy

    // Filter nach Hochschultyp (Uni/FH)
    if (currentFilters.type) {
      filtered = filtered.filter(inst => inst.type === currentFilters.type);
    }

    // Filter nach Hochschule
    if (currentFilters.institution) {
      filtered = filtered.filter(inst => inst.name === currentFilters.institution);
    }

    // Filter nach Kategorie
    if (currentFilters.category) {
      filtered.forEach(inst => {
        inst.kategorien = inst.kategorien.filter(kat => kat.name === currentFilters.category);
      });
      filtered = filtered.filter(inst => inst.kategorien.length > 0);
    }

    return filtered;
  }

  function renderStudiengaenge() {
    const container = document.getElementById('studiengaengeContainer');
    const filteredData = filterData();

    // Leere Container
    container.innerHTML = '';

    // Zeige "Keine Ergebnisse" wenn nichts gefunden
    if (filteredData.length === 0 || filteredData.every(uni => uni.kategorien.length === 0)) {
      container.innerHTML = `
        <div class="no-results">
          <p>Keine Studiengänge gefunden.</p>
          <p>Bitte versuche es mit anderen Filterkriterien.</p>
        </div>
      `;
      updateFloatingNav([]);
      return;
    }

    // Wähle Ansicht
    if (currentView === 'category') {
      renderByCategory(filteredData, container);
    } else {
      renderByInstitution(filteredData, container);
    }

    // Aktualisiere schwebende Navigation
    updateFloatingNav(filteredData);
  }

  function renderByInstitution(filteredData, container) {
    // Rendere jede Universität
    filteredData.forEach(uni => {
      if (uni.kategorien.length > 0) {
        const uniSection = createUniSection(uni);
        container.appendChild(uniSection);
      }
    });
  }

  function renderByCategory(filteredData, container) {
    // Gruppiere nach Kategorien
    const hierarchicalCategories = new Map();

    filteredData.forEach(inst => {
      inst.kategorien.forEach(kategorie => {
        // Check if category has subcategories (unterkategorien)
        if (kategorie.unterkategorien && kategorie.unterkategorien.length > 0) {
          // Category with subcategories - create hierarchical structure
          if (!hierarchicalCategories.has(kategorie.name)) {
            hierarchicalCategories.set(kategorie.name, {
              isParent: true,
              subcategories: new Map()
            });
          }

          // Add each subcategory
          kategorie.unterkategorien.forEach(unterkategorie => {
            if (!hierarchicalCategories.get(kategorie.name).subcategories.has(unterkategorie.name)) {
              hierarchicalCategories.get(kategorie.name).subcategories.set(unterkategorie.name, []);
            }
            hierarchicalCategories.get(kategorie.name).subcategories.get(unterkategorie.name).push({
              institution: inst.name,
              type: inst.type,
              website: inst.website,
              studiengaenge: unterkategorie.studiengaenge
            });
          });
        } else {
          // Regular category without subcategories
          if (!hierarchicalCategories.has(kategorie.name)) {
            hierarchicalCategories.set(kategorie.name, {
              isParent: false,
              institutions: []
            });
          }
          hierarchicalCategories.get(kategorie.name).institutions.push({
            institution: inst.name,
            type: inst.type,
            website: inst.website,
            studiengaenge: kategorie.studiengaenge
          });
        }
      });
    });

    // Sortiere und rendere
    const sortedMainCategories = Array.from(hierarchicalCategories.keys()).sort();

    sortedMainCategories.forEach(mainCategoryName => {
      const categoryData = hierarchicalCategories.get(mainCategoryName);

      if (categoryData.isParent) {
        // Rendere Obergruppe mit Unterkategorien
        const parentSection = createParentCategorySection(mainCategoryName, categoryData.subcategories);
        container.appendChild(parentSection);
      } else {
        // Rendere normale Kategorie
        const categorySection = createCategorySectionGrouped(mainCategoryName, categoryData.institutions);
        container.appendChild(categorySection);
      }
    });
  }

  function createUniSection(uni) {
    const section = document.createElement('div');
    section.className = 'uni-section collapsed';
    section.id = 'section-' + sanitizeId(uni.name);

    // Header
    const header = document.createElement('div');
    header.className = 'uni-header';
    header.innerHTML = `
      <div>
        <div class="uni-title">${uni.name}</div>
        <div class="uni-website">
          <a href="${uni.website}" target="_blank" rel="noopener noreferrer">
            → Website besuchen
          </a>
        </div>
      </div>
      <span class="toggle-icon">▼</span>
    `;

    // Toggle Funktionalität
    header.addEventListener('click', function () {
      section.classList.toggle('collapsed');
    });

    // Content
    const content = document.createElement('div');
    content.className = 'uni-content';

    uni.kategorien.forEach(kategorie => {
      const categorySection = createCategorySection(kategorie);
      content.appendChild(categorySection);
    });

    section.appendChild(header);
    section.appendChild(content);

    return section;
  }

  function createCategorySection(kategorie) {
    const section = document.createElement('div');
    section.className = 'category-section';

    const title = document.createElement('div');
    title.className = 'category-title';
    title.textContent = kategorie.name;

    section.appendChild(title);

    // Check if category has subcategories (unterkategorien)
    if (kategorie.unterkategorien && kategorie.unterkategorien.length > 0) {
      // Render subcategories
      kategorie.unterkategorien.forEach(unterkategorie => {
        const subSection = document.createElement('div');
        subSection.className = 'subcategory-section';

        const subTitle = document.createElement('div');
        subTitle.className = 'subcategory-title';
        subTitle.textContent = unterkategorie.name;

        const list = document.createElement('div');
        list.className = 'studiengang-list';

        unterkategorie.studiengaenge.forEach(studiengang => {
          const item = createStudiengangItem(studiengang);
          list.appendChild(item);
        });

        subSection.appendChild(subTitle);
        subSection.appendChild(list);
        section.appendChild(subSection);
      });
    } else {
      // Render study programs directly (no subcategories)
      const list = document.createElement('div');
      list.className = 'studiengang-list';

      kategorie.studiengaenge.forEach(studiengang => {
        const item = createStudiengangItem(studiengang);
        list.appendChild(item);
      });

      section.appendChild(list);
    }

    return section;
  }

  function createStudiengangItem(studiengang) {
    const item = document.createElement('div');
    item.className = 'studiengang-item';

    const name = document.createElement('div');
    name.className = 'studiengang-name';
    name.textContent = studiengang.name;

    const info = document.createElement('div');
    info.className = 'studiengang-ects';
    // FH verwendet 'grad', Uni verwendet 'ects'
    info.textContent = studiengang.ects || studiengang.grad || '';

    item.appendChild(name);
    item.appendChild(info);

    if (studiengang.beschreibung) {
      const beschreibung = document.createElement('div');
      beschreibung.className = 'studiengang-beschreibung';
      beschreibung.textContent = studiengang.beschreibung;
      item.appendChild(beschreibung);
    }

    return item;
  }

  function createParentCategorySection(mainCategoryName, subcategories) {
    const section = document.createElement('div');
    section.className = 'uni-section collapsed';
    section.id = 'section-' + sanitizeId(mainCategoryName);

    // Main Category Header
    const header = document.createElement('div');
    header.className = 'uni-header';

    header.innerHTML = `
      <div>
        <div class="uni-title">${mainCategoryName}</div>
      </div>
      <span class="toggle-icon">▼</span>
    `;

    // Toggle Funktionalität
    header.addEventListener('click', function () {
      section.classList.toggle('collapsed');
    });

    // Content
    const content = document.createElement('div');
    content.className = 'uni-content';

    // Sortiere Unterkategorien
    const sortedSubcategories = Array.from(subcategories.keys()).sort();

    // Rendere jede Unterkategorie
    sortedSubcategories.forEach(subcategoryName => {
      const institutions = subcategories.get(subcategoryName);

      // Unterkategorie Section (nested)
      const subcatSection = document.createElement('div');
      subcatSection.className = 'category-section nested-category collapsed';

      const subcatHeader = document.createElement('div');
      subcatHeader.className = 'category-title subcategory-header';
      subcatHeader.innerHTML = `
        <span>${subcategoryName.trim()}</span>
        <span class="subcategory-toggle">▼</span>
      `;

      const subcatContent = document.createElement('div');
      subcatContent.className = 'subcategory-content';

      // Rendere Institutionen in dieser Unterkategorie
      institutions.forEach(inst => {
        const instSection = document.createElement('div');
        instSection.className = 'institution-section';

        const instTitle = document.createElement('div');
        instTitle.className = 'institution-name';
        const typeLabel = inst.type === 'uni' ? '[Uni]' : '[FH]';
        instTitle.innerHTML = `
          ${typeLabel} ${inst.institution}
          <a href="${inst.website}" target="_blank" rel="noopener noreferrer" style="margin-left: 10px; font-size: 0.85em; color: #0066cc;">
            → Website
          </a>
        `;

        const list = document.createElement('div');
        list.className = 'studiengang-list';

        inst.studiengaenge.forEach(studiengang => {
          const item = createStudiengangItem(studiengang);
          list.appendChild(item);
        });

        instSection.appendChild(instTitle);
        instSection.appendChild(list);
        subcatContent.appendChild(instSection);
      });

      // Toggle für Unterkategorie
      subcatHeader.addEventListener('click', function (e) {
        e.stopPropagation();
        subcatSection.classList.toggle('collapsed');
      });

      subcatSection.appendChild(subcatHeader);
      subcatSection.appendChild(subcatContent);
      content.appendChild(subcatSection);
    });

    section.appendChild(header);
    section.appendChild(content);

    return section;
  }

  function createCategorySectionGrouped(categoryName, institutions) {
    const section = document.createElement('div');
    section.className = 'uni-section collapsed';
    section.id = 'section-' + sanitizeId(categoryName);

    // Category Header
    const header = document.createElement('div');
    header.className = 'uni-header';
    header.innerHTML = `
      <div>
        <div class="uni-title">${categoryName}</div>
      </div>
      <span class="toggle-icon">▼</span>
    `;

    // Toggle Funktionalität
    header.addEventListener('click', function () {
      section.classList.toggle('collapsed');
    });

    // Content
    const content = document.createElement('div');
    content.className = 'uni-content';

    // Rendere jede Institution
    institutions.forEach(inst => {
      const instSection = document.createElement('div');
      instSection.className = 'category-section';

      const instTitle = document.createElement('div');
      instTitle.className = 'category-title';
      const typeLabel = inst.type === 'uni' ? '[Uni]' : '[FH]';
      instTitle.innerHTML = `
        ${typeLabel} ${inst.institution}
        <a href="${inst.website}" target="_blank" rel="noopener noreferrer" style="margin-left: 10px; font-size: 0.85em; color: #0066cc;">
          → Website
        </a>
      `;

      const list = document.createElement('div');
      list.className = 'studiengang-list';

      inst.studiengaenge.forEach(studiengang => {
        const item = createStudiengangItem(studiengang);
        list.appendChild(item);
      });

      instSection.appendChild(instTitle);
      instSection.appendChild(list);
      content.appendChild(instSection);
    });

    section.appendChild(header);
    section.appendChild(content);

    return section;
  }

  // Helper-Funktion: Sanitize ID
  function sanitizeId(text) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  // Aktualisiere schwebende Navigation
  function updateFloatingNav(data) {
    const navContent = document.getElementById('floatingNavContent');
    navContent.innerHTML = '';

    if (data.length === 0) {
      return;
    }

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
        item.onclick = () => scrollToSection(catName);
        navContent.appendChild(item);
      });
    } else {
      // Nach Institution: Zeige Institutionen
      data.forEach(inst => {
        const item = document.createElement('div');
        item.className = 'floating-nav-item';
        const prefix = inst.type === 'uni' ? '[Uni] ' : '[FH] ';
        item.textContent = prefix + inst.name;
        item.onclick = () => scrollToSection(inst.name);
        navContent.appendChild(item);
      });
    }
  }

  // Scroll zu Sektion
  function scrollToSection(name) {
    const sectionId = 'section-' + sanitizeId(name);
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Öffne die Sektion falls sie collapsed ist
      if (section.classList.contains('collapsed')) {
        section.classList.remove('collapsed');
      }
    }
  }
})();
