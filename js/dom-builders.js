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
          <a href="${uni.website}" target="_blank" rel="noopener noreferrer">
            → Website besuchen
          </a>
        </div>
      </div>
      <span class="toggle-icon">▼</span>
    `;

    header.addEventListener("click", function () {
      section.classList.toggle("collapsed");
    });

    const content = document.createElement("div");
    content.className = "uni-content";

    uni.categories.forEach((category) => {
      const categorySection = this.createCategorySection(category, uni.name);
      content.appendChild(categorySection);
    });

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

    // Check if category has subcategories (unterkategorien)
    if (category.subcategories && category.subcategories.length > 0) {
      // Render subcategories
      category.subcategories.forEach((subcat) => {
        const subSection = document.createElement("div");
        subSection.className = "subcategory-section";

        const subTitle = document.createElement("div");
        subTitle.className = "subcategory-title";
        subTitle.textContent = subcat.name;

        const list = document.createElement("div");
        list.className = "studiengang-list";

        subcat.programs.forEach((program) => {
          const item = this.createStudiengangItem(program, institutionName);
          list.appendChild(item);
        });

        subSection.appendChild(subTitle);
        subSection.appendChild(list);
        section.appendChild(subSection);
      });
    }

    // Also render direct study programs if they exist (mixed structure support)
    if (category.programs && category.programs.length > 0) {
      const list = document.createElement("div");
      list.className = "studiengang-list";

      category.programs.forEach((program) => {
        const item = this.createStudiengangItem(program, institutionName);
        list.appendChild(item);
      });

      section.appendChild(list);
    }

    return section;
  },

  createStudiengangItem(program, institutionName) {
    const item = document.createElement("div");
    item.className = "studiengang-item";

    const name = document.createElement("div");
    name.className = "studiengang-name";
    name.textContent = program.name;

    const info = document.createElement("div");
    info.className = "studiengang-ects";
    // FH verwendet 'degree', Uni verwendet 'ects'
    info.textContent = program.ects || program.degree || "";

    item.appendChild(name);
    item.appendChild(info);

    if (program.description) {
      const desc = document.createElement("div");
      desc.className = "studiengang-beschreibung";
      desc.textContent = program.description;
      item.appendChild(desc);
    }

    // Check if visualization exists and add link
    const mapping = window.studyProgramMapping || window.StudiengangMapping;
    if (mapping) {
      const vizUrl = mapping.getVisualizationUrl(program.name, institutionName);
      if (vizUrl) {
        const vizLink = document.createElement("a");
        vizLink.href = vizUrl;
        vizLink.className = "viz-link";
        vizLink.textContent = "→ Visualisierung ansehen";
        vizLink.style.cssText =
          "margin-top: 5px; display: inline-block; color: #0066cc; text-decoration: none; font-size: 0.9em;";
        item.appendChild(vizLink);
      }
    }

    return item;
  },

  createParentCategorySection(mainCategoryName, subcategories, directPrograms) {
    const section = document.createElement("div");
    section.className = "uni-section collapsed";
    // Geändert: Utils.sanitizeId(...) -> sanitizeId(...)
    section.id = "section-" + sanitizeId(mainCategoryName);

    // Main Category Header
    const header = document.createElement("div");
    header.className = "uni-header";

    header.innerHTML = `
      <div>
        <div class="uni-title">${mainCategoryName}</div>
      </div>
      <span class="toggle-icon">▼</span>
    `;

    // Toggle Funktionalität
    header.addEventListener("click", function () {
      section.classList.toggle("collapsed");
    });

    // Content
    const content = document.createElement("div");
    content.className = "uni-content";

    // Sortiere Unterkategorien
    const sortedSubcategories = Array.from(subcategories.keys()).sort();

    // Rendere jede Unterkategorie
    sortedSubcategories.forEach((subcategoryName) => {
      const institutions = subcategories.get(subcategoryName);

      // Unterkategorie Section (nested)
      const subcatSection = document.createElement("div");
      subcatSection.className = "category-section nested-category collapsed";

      const subcatHeader = document.createElement("div");
      subcatHeader.className = "category-title subcategory-header";
      subcatHeader.innerHTML = `
        <span>${subcategoryName.trim()}</span>
        <span class="subcategory-toggle">▼</span>
      `;

      const subcatContent = document.createElement("div");
      subcatContent.className = "subcategory-content";

      // Rendere Institutionen in dieser Unterkategorie
      institutions.forEach((inst) => {
        const instSection = document.createElement("div");
        instSection.className = "institution-section";

        const instTitle = document.createElement("div");
        instTitle.className = "institution-name";
        const typeLabel = inst.type === "uni" ? "[Uni]" : "[FH]";
        instTitle.innerHTML = `
          ${typeLabel} ${inst.institution}
          <a href="${inst.website}" target="_blank" rel="noopener noreferrer" style="margin-left: 10px; font-size: 0.85em; color: #0066cc;">
            → Website
          </a>
        `;

        const list = document.createElement("div");
        list.className = "studiengang-list";

        inst.programs.forEach((program) => {
          const item = this.createStudiengangItem(program, inst.institution);
          list.appendChild(item);
        });

        instSection.appendChild(instTitle);
        instSection.appendChild(list);
        subcatContent.appendChild(instSection);
      });

      // Toggle für Unterkategorie
      subcatHeader.addEventListener("click", function (e) {
        e.stopPropagation();
        subcatSection.classList.toggle("collapsed");
      });

      subcatSection.appendChild(subcatHeader);
      subcatSection.appendChild(subcatContent);
      content.appendChild(subcatSection);
    });

    // Rendere direkte Studiengänge (mixed structure support)
    if (directPrograms && directPrograms.length > 0) {
      directPrograms.forEach((inst) => {
        const instSection = document.createElement("div");
        instSection.className = "category-section";

        const instTitle = document.createElement("div");
        instTitle.className = "category-title";
        const typeLabel = inst.type === "uni" ? "[Uni]" : "[FH]";
        instTitle.innerHTML = `
          ${typeLabel} ${inst.institution}
          <a href="${inst.website}" target="_blank" rel="noopener noreferrer" style="margin-left: 10px; font-size: 0.85em; color: #0066cc;">
            → Website
          </a>
        `;

        const list = document.createElement("div");
        list.className = "studiengang-list";

        inst.programs.forEach((program) => {
          const item = this.createStudiengangItem(program, inst.institution);
          list.appendChild(item);
        });

        instSection.appendChild(instTitle);
        instSection.appendChild(list);
        content.appendChild(instSection);
      });
    }

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
    header.innerHTML = `
      <div>
        <div class="uni-title">${categoryName}</div>
      </div>
      <span class="toggle-icon">▼</span>
    `;

    header.addEventListener("click", function () {
      section.classList.toggle("collapsed");
    });

    const content = document.createElement("div");
    content.className = "uni-content";

    institutions.forEach((inst) => {
      const instSection = document.createElement("div");
      instSection.className = "category-section";

      const instTitle = document.createElement("div");
      instTitle.className = "category-title";
      const typeLabel = inst.type === "uni" ? "[Uni]" : "[FH]";
      instTitle.innerHTML = `
        ${typeLabel} ${inst.institution}
        <a href="${inst.website}" target="_blank" rel="noopener noreferrer" style="margin-left: 10px; font-size: 0.85em; color: #0066cc;">
          → Website
        </a>
      `;

      const list = document.createElement("div");
      list.className = "studiengang-list";

      inst.programs.forEach((program) => {
        const item = this.createStudiengangItem(program, inst.institution);
        list.appendChild(item);
      });

      instSection.appendChild(instTitle);
      instSection.appendChild(list);
      content.appendChild(instSection);
    });

    section.appendChild(header);
    section.appendChild(content);

    return section;
  },
};
