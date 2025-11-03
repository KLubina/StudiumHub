// Renders study program cards from a single source of truth to avoid HTML duplication.
(function () {
  const programs = (window.StudiesData && typeof window.StudiesData.getPrograms === 'function')
    ? window.StudiesData.getPrograms()
    : [];

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
      </div>
      <div class="card-body"></div>
      <div class="card-footer">
        <a href="studies/studienplan-template.html?studiengang=${encodeURIComponent(key)}" class="btn">Zum Studienplan</a>
      </div>
    `;

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
