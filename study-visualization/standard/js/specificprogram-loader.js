var corePath = "js/core";
var optionalPath = "js/optional";

window.subModulesReady = {};

async function loadScript(src) {
  try {
    const response = await fetch(src, { method: "HEAD" });
    if (!response.ok) {
      throw new Error(`File not found: ${src}`);
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onerror = () => {
        reject(new Error(`Failed to load ${src}`));
      };
      script.onload = () => {
        resolve();
      };
      document.head.appendChild(script);
    });
  } catch (error) {
    throw error;
  }
}

window.baseModulesReady = (async () => {
  await loadScript(`${corePath}/index.js`);

  const coreModules = [
    "utils",
    "module",
    "legend",
    "layout",
    "configLoader",
    "core",
  ];

  await Promise.all(
    coreModules.map((key) => window.subModulesReady[key]).filter(Boolean),
  );

  const optionalModules = [
    "tooltip.js",
    "kp-counter.js",
    "color-manager.js",
    "major-minor-selector.js",
    "wahlmodule.js",
  ];

  const settled = await Promise.allSettled(
    optionalModules.map((m) => loadScript(`${optionalPath}/${m}`)),
  );

  const optionalKeys = Object.keys(window.subModulesReady).filter(
    (k) => !coreModules.includes(k),
  );
  await Promise.all(
    optionalKeys.map((key) => window.subModulesReady[key]).filter(Boolean),
  );
})();
