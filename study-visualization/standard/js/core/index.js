(function () {
  const path = "js/core";
  const coreModules = [
    "utils.js",
    "module.js",
    "legend.js",
    "layout.js",
    "configLoader.js",
    "core.js",
  ];

  const promises = coreModules.map((moduleName) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = `${path}/${moduleName}`;
      script.onload = () => {
        const key = moduleName.replace(".js", "");
        window.subModulesReady[key] = Promise.resolve();
        resolve();
      };
      script.onerror = () => {
        resolve();
      };
      document.head.appendChild(script);
    });
  });

  window.coreScriptsLoaded = Promise.all(promises);
})();
