window.SpecificprogramModule = {
  renderModule(module) {
    const ects = module.ects || 0;
    const category = module.standardcategory || "unknown";
    const name = module.name || "Unbekanntes Modul";

    const baseSize = 100;
    const scale = Math.sqrt(ects / 4);
    const size = baseSize * scale;
    const style = `width: ${size}px; height: ${size}px;`;

    let placeholderClass = "";
    let wahlmodulSourceAttr = "";
    if (module.isPlaceholder && module.wahlmodulSource) {
      placeholderClass = "modul-platzhalter";
      wahlmodulSourceAttr = `data-wahlmodul-source="${module.wahlmodulSource}"`;
    }

    return `
      <div class="modul ${category} ${placeholderClass}" data-ects="${ects}" style="${style}" ${wahlmodulSourceAttr}>
        <div class="modul-titel">${name}</div>
        <div class="modul-kp">${ects} KP</div>
      </div>
    `;
  },

  renderSemesterModules(modules) {
    return modules.map((module) => this.renderModule(module)).join("");
  },
};
window.subModulesReady.module = Promise.resolve();
