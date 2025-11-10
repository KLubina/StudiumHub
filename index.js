// Renders study program cards from a single source of truth to avoid HTML duplication.
(function () {
  const programs = (window.StudiesData && typeof window.StudiesData.getPrograms === 'function')
    ? window.StudiesData.getPrograms()
    : [];

  // Map simple feature keys to emoji + label
  const FEATURE_MAP = {
    wahlmodule: { icon: '🧩', label: 'Wahlmodule' },
    kpCounter: { icon: '🧮', label: 'KP-Counter' },
    colorManager: { icon: '🎨', label: 'Farbmanager' },
  };

  // Load features from features-config.js at runtime
  async function loadFeatures(key, studyModel) {
    const folder = studyModel === 'major-minor' ? 'major-minor' : 'mono';
    const url = `study-visualization/program-specific/${folder}/${key}/standard-config/features-config.js`;

    try {
      const response = await fetch(url);
      if (!response.ok) return [];

      const text = await response.text();
      const features = [];

      if (/enableWahlmodule:\s*true/i.test(text)) features.push('wahlmodule');
      if (/enableKPCounter:\s*true/i.test(text)) features.push('kpCounter');
      if (/enableColorManager:\s*true/i.test(text)) features.push('colorManager');

      return features;
    } catch {
      return [];
    }
  }

  function renderFeatureIcons(features) {
    if (!Array.isArray(features) || features.length === 0) return '';
    const items = features
      .map(key => FEATURE_MAP[key])
      .filter(Boolean)
      .map(({ icon, label }) => `<span class="feature-icon" title="${label}">${icon}</span>`)
      .join('');
    if (!items) return '';
    return `<div class="feature-icons" aria-label="Studiengang-Features">${items}</div>`;
  }

  function createCard({ key, title, subtitle, studyModel }) {
    const card = document.createElement('div');
    card.className = `card ${key}`;

    const studyModelBadge = studyModel === 'major-minor'
      ? '<span class="study-model-badge">Major/Minor</span>'
      : '';

    card.innerHTML = `
      <div class="card-header">
        <h2 class="card-title">${title}${studyModelBadge}</h2>
        <p class="card-subtitle">${subtitle}</p>
        <div class="feature-icons-placeholder"></div>
      </div>
      <div class="card-body">
      </div>
      <div class="card-footer">
        <a href="study-visualization/standard/studienplan-template.html?studiengang=${encodeURIComponent(key)}" class="btn">Zum Studienplan</a>
      </div>
    `;

    // Load features asynchronously
    loadFeatures(key, studyModel).then(features => {
      const placeholder = card.querySelector('.feature-icons-placeholder');
      if (placeholder && features.length > 0) {
        placeholder.outerHTML = renderFeatureIcons(features);
      } else if (placeholder) {
        placeholder.remove();
      }
    });

    return card;
  }

  function render() {
    const featuredContainer = document.querySelector('.featured-cards');
    const cardsContainer = document.querySelector('.cards-container');
    if (!featuredContainer || !cardsContainer) return;

    const featured = programs.filter(p => p.featured);
    const categorized = programs.filter(p => p.category);

    // Render featured
    featured.forEach(p => featuredContainer.appendChild(createCard(p)));

    // Render by category
    const categories = ['Unis', 'FH Unis', 'Private Unis'];
    categories.forEach(category => {
      const categoryPrograms = categorized.filter(p => p.category === category);
      if (categoryPrograms.length > 0) {
        const categoryHeading = document.createElement('h2');
        categoryHeading.className = 'category-heading';
        categoryHeading.textContent = category;
        cardsContainer.appendChild(categoryHeading);

        const categoryGrid = document.createElement('div');
        categoryGrid.className = 'category-grid';
        categoryPrograms.forEach(p => categoryGrid.appendChild(createCard(p)));
        cardsContainer.appendChild(categoryGrid);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', render);
})();
