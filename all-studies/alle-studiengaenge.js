// Alle Studiengänge - Main JavaScript

(function () {
  let allData = [];
  let currentFilters = {
    uni: '',
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
    allData = window.AlleSchweizerStudiengaenge.universitaeten;
  }

  function populateFilters() {
    const uniFilter = document.getElementById('uniFilter');
    const categoryFilter = document.getElementById('categoryFilter');

    // Sammle alle Universitäten
    const universities = allData.map(uni => uni.name);
    universities.forEach(uniName => {
      const option = document.createElement('option');
      option.value = uniName;
      option.textContent = uniName;
      uniFilter.appendChild(option);
    });

    // Sammle alle Kategorien (einzigartig)
    const categories = new Set();
    allData.forEach(uni => {
      uni.kategorien.forEach(kat => {
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
    const uniFilter = document.getElementById('uniFilter');
    const categoryFilter = document.getElementById('categoryFilter');

    uniFilter.addEventListener('change', function (e) {
      currentFilters.uni = e.target.value;
      renderStudiengaenge();
    });

    categoryFilter.addEventListener('change', function (e) {
      currentFilters.category = e.target.value;
      renderStudiengaenge();
    });
  }

  function filterData() {
    let filtered = JSON.parse(JSON.stringify(allData)); // Deep copy

    // Filter nach Universität
    if (currentFilters.uni) {
      filtered = filtered.filter(uni => uni.name === currentFilters.uni);
    }

    // Filter nach Kategorie
    if (currentFilters.category) {
      filtered.forEach(uni => {
        uni.kategorien = uni.kategorien.filter(kat => kat.name === currentFilters.category);
      });
      filtered = filtered.filter(uni => uni.kategorien.length > 0);
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

    const ects = document.createElement('div');
    ects.className = 'studiengang-ects';
    ects.textContent = studiengang.ects;

    item.appendChild(name);
    item.appendChild(ects);

    if (studiengang.beschreibung) {
      const beschreibung = document.createElement('div');
      beschreibung.className = 'studiengang-beschreibung';
      beschreibung.textContent = studiengang.beschreibung;
      item.appendChild(beschreibung);
    }

    return item;
  }
})();
