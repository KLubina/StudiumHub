// Alle Studiengänge - Main JavaScript

(function () {
  let allData = [];
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

    // Rendere jede Universität
    filteredData.forEach(uni => {
      if (uni.kategorien.length > 0) {
        const uniSection = createUniSection(uni);
        container.appendChild(uniSection);
      }
    });
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
})();
