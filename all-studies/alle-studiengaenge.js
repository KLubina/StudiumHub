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
      return;
    }

    // Wähle Ansicht
    if (currentView === 'category') {
      renderByCategory(filteredData, container);
    } else {
      renderByInstitution(filteredData, container);
    }
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
    const categoryMap = new Map();

    filteredData.forEach(inst => {
      inst.kategorien.forEach(kategorie => {
        if (!categoryMap.has(kategorie.name)) {
          categoryMap.set(kategorie.name, []);
        }
        categoryMap.get(kategorie.name).push({
          institution: inst.name,
          type: inst.type,
          website: inst.website,
          studiengaenge: kategorie.studiengaenge
        });
      });
    });

    // Gruppiere Unterkategorien unter Obergruppen
    const hierarchicalCategories = new Map();

    categoryMap.forEach((institutions, categoryName) => {
      // Prüfe ob es eine Unterkategorie ist (beginnt mit Leerzeichen)
      if (categoryName.startsWith('  ')) {
        // Extrahiere die Obergruppen-Nummer (z.B. "1" aus "  1.1 ...")
        const match = categoryName.match(/^\s+(\d+)\./);
        if (match) {
          const mainGroupNum = match[1];
          const mainGroupName = getMainGroupName(mainGroupNum);

          if (!hierarchicalCategories.has(mainGroupName)) {
            hierarchicalCategories.set(mainGroupName, {
              isParent: true,
              subcategories: new Map()
            });
          }

          hierarchicalCategories.get(mainGroupName).subcategories.set(categoryName, institutions);
        }
      } else {
        // Normale Kategorie (keine Unterkategorie)
        if (!hierarchicalCategories.has(categoryName)) {
          hierarchicalCategories.set(categoryName, {
            isParent: false,
            institutions: institutions
          });
        }
      }
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

  function getMainGroupName(groupNum) {
    const groupNames = {
      '1': '1. Wissenschaften vom Menschen und seiner Kultur',
      '2': '2. Rechtswissenschaften',
      '3': '3. Wirtschaftswissenschaften',
      '7': '7. Psychologie',
      '8': '8. Naturwissenschaften',
      '9': '9. Mathematik und Informatik',
      '10': '10. Medizin und Gesundheitswissenschaften',
      '11': '11. Ingenieurwissenschaften',
      '12': '12. Sportwissenschaften'
    };
    return groupNames[groupNum] || `${groupNum}. Kategorie`;
  }

  function createUniSection(uni) {
    const section = document.createElement('div');
    section.className = 'uni-section';

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

    const list = document.createElement('div');
    list.className = 'studiengang-list';

    kategorie.studiengaenge.forEach(studiengang => {
      const item = createStudiengangItem(studiengang);
      list.appendChild(item);
    });

    section.appendChild(title);
    section.appendChild(list);

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
    section.className = 'uni-section';

    // Main Category Header
    const header = document.createElement('div');
    header.className = 'uni-header';

    // Zähle Gesamtzahl der Hochschulen in allen Unterkategorien
    let totalInstitutions = 0;
    subcategories.forEach(institutions => {
      totalInstitutions += institutions.length;
    });

    header.innerHTML = `
      <div>
        <div class="uni-title">${mainCategoryName}</div>
        <div class="uni-website" style="color: #999;">
          ${totalInstitutions} Hochschule${totalInstitutions > 1 ? 'n' : ''}
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

    // Sortiere Unterkategorien
    const sortedSubcategories = Array.from(subcategories.keys()).sort();

    // Rendere jede Unterkategorie
    sortedSubcategories.forEach(subcategoryName => {
      const institutions = subcategories.get(subcategoryName);

      // Unterkategorie Section (nested)
      const subcatSection = document.createElement('div');
      subcatSection.className = 'category-section nested-category';

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
    section.className = 'uni-section';

    // Category Header
    const header = document.createElement('div');
    header.className = 'uni-header';
    header.innerHTML = `
      <div>
        <div class="uni-title">${categoryName}</div>
        <div class="uni-website" style="color: #999;">
          ${institutions.length} Hochschule${institutions.length > 1 ? 'n' : ''}
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
})();
