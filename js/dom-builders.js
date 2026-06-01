const DOMBuilders = {
  createUniSection(uni) {
    const section = document.createElement("div");
    section.className = "uni-section collapsed";
    section.id = "section-" + sanitizeId(uni.name);

    const header = document.createElement("div");
    header.className = "uni-header";
    header.innerHTML = `
      <div>
        <div class="uni-title">${uni.name}</div>
        <div class="uni-website">
          <a href="${uni.website}" target="_blank" rel="noopener noreferrer">→ Website besuchen</a>
        </div>
      </div>
      <span class="toggle-icon">▼</span>
    `;
    header.onclick = () => section.classList.toggle("collapsed");

    const content = document.createElement("div");
    content.className = "uni-content";
    uni.categories.forEach((cat) =>
      content.appendChild(this.createCategorySection(cat, uni.name)),
    );

    section.appendChild(header);
    section.appendChild(content);
    return section;
  },

  createCategorySection(category, institutionName) {
    const section = document.createElement("div");
    section.className = "category-section";

    const title = document.createElement("div");
    title.className = "category-title";
    title.textContent = category.name;
    section.appendChild(title);

    if (category.subcategories?.length > 0) {
      category.subcategories.forEach((subcat) => {
        const subSection = document.createElement("div");
        subSection.className = "subcategory-section";

        const subTitle = document.createElement("div");
        subTitle.className = "subcategory-title";
        subTitle.textContent = subcat.name;

        subSection.appendChild(subTitle);
        subSection.appendChild(
          this._createProgramList(subcat.programs, institutionName),
        );
        section.appendChild(subSection);
      });
    }

    if (category.programs?.length > 0) {
      section.appendChild(
        this._createProgramList(category.programs, institutionName),
      );
    }

    return section;
  },

  createStudiengangItem(program, institutionName) {
    const item = document.createElement("div");
    item.className = "studiengang-item";

    item.innerHTML = `
      <div class="studiengang-name">${program.name}</div>
      <div class="studiengang-ects">${program.ects || program.degree || ""}</div>
      ${program.description ? `<div class="studiengang-beschreibung">${program.description}</div>` : ""}
    `;

    const mapping = window.studyProgramMapping || window.StudiengangMapping;
    const vizUrl = mapping?.getVisualizationUrl(program.name, institutionName);

    if (vizUrl) {
      const vizLink = document.createElement("a");
      vizLink.href = vizUrl;
      vizLink.className = "viz-link";
      vizLink.textContent = "→ Visualisierung ansehen";
      vizLink.style.cssText =
        "margin-top: 5px; display: inline-block; color: #0066cc; text-decoration: none; font-size: 0.9em;";
      item.appendChild(vizLink);
    }

    return item;
  },

  createParentCategorySection(mainCategoryName, subcategories, directPrograms) {
    const section = document.createElement("div");
    section.className = "uni-section collapsed";
    section.id = "section-" + sanitizeId(mainCategoryName);

    const header = document.createElement("div");
    header.className = "uni-header";
    header.innerHTML = `<div class="uni-title">${mainCategoryName}</div><span class="toggle-icon">▼</span>`;
    header.onclick = () => section.classList.toggle("collapsed");

    const content = document.createElement("div");
    content.className = "uni-content";

    Array.from(subcategories.keys())
      .sort()
      .forEach((subName) => {
        const subcatSection = document.createElement("div");
        subcatSection.className = "category-section nested-category collapsed";

        const subcatHeader = document.createElement("div");
        subcatHeader.className = "category-title subcategory-header";
        subcatHeader.innerHTML = `<span>${subName.trim()}</span><span class="subcategory-toggle">▼</span>`;
        subcatHeader.onclick = (e) => {
          e.stopPropagation();
          subcatSection.classList.toggle("collapsed");
        };

        const subcatContent = document.createElement("div");
        subcatContent.className = "subcategory-content";

        subcategories.get(subName).forEach((inst) => {
          subcatContent.appendChild(this._createInstitutionGroup(inst));
        });

        subcatSection.appendChild(subcatHeader);
        subcatSection.appendChild(subcatContent);
        content.appendChild(subcatSection);
      });

    directPrograms.forEach((inst) =>
      content.appendChild(
        this._createInstitutionGroup(inst, "category-section"),
      ),
    );

    section.appendChild(header);
    section.appendChild(content);
    return section;
  },

  createCategorySectionGrouped(categoryName, institutions) {
    const section = document.createElement("div");
    section.className = "uni-section collapsed";
    section.id = "section-" + sanitizeId(categoryName);

    const header = document.createElement("div");
    header.className = "uni-header";
    header.innerHTML = `<div class="uni-title">${categoryName}</div><span class="toggle-icon">▼</span>`;
    header.onclick = () => section.classList.toggle("collapsed");

    const content = document.createElement("div");
    content.className = "uni-content";

    institutions.forEach((inst) =>
      content.appendChild(
        this._createInstitutionGroup(inst, "category-section"),
      ),
    );

    section.appendChild(header);
    section.appendChild(content);
    return section;
  },

  _createProgramList(programs, institutionName) {
    const list = document.createElement("div");
    list.className = "studiengang-list";
    programs.forEach((p) =>
      list.appendChild(this.createStudiengangItem(p, institutionName)),
    );
    return list;
  },

  _createInstitutionGroup(inst, className = "institution-section") {
    const group = document.createElement("div");
    group.className = className;

    const title = document.createElement("div");
    title.className =
      className === "institution-section"
        ? "institution-name"
        : "category-title";
    const typeLabel = inst.type === "uni" ? "[Uni]" : "[FH]";
    title.innerHTML = `
      ${typeLabel} ${inst.institution}
      <a href="${inst.website}" target="_blank" rel="noopener noreferrer" style="margin-left: 10px; font-size: 0.85em; color: #0066cc;">→ Website</a>
    `;

    group.appendChild(title);
    group.appendChild(this._createProgramList(inst.programs, inst.institution));
    return group;
  },
};
