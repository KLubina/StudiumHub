/* Color Manager - Entry Point */

window.subModulesReady.colorManager = (async () => {
  const loadScript = (src) =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve();
      script.onerror = () => resolve();
      document.head.appendChild(script);
    });

  await loadScript("js/functionality/optional/color-manager/ColorManager.js");
  await loadScript("js/functionality/optional/color-manager/Integration.js");
})();

