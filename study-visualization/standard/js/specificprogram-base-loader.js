/**
 * SPECIFICPROGRAM BASE LOADER - MODULARIZED VERSION
 *
 * New structure (functionality/...):
 * - core/      → unverzichtbare Basismodule (Rendering, Layout, Legend, Config, Utils, etc.)
 * - optional/  → optionale Erweiterungen (Tooltip, KP-Counter, Color-Mode, Major/Minor, Wahlmodule)
 *
 * Lade-Reihenfolge:
 * 1) Zuerst core/index.js (dies initialisiert und lädt seine eigenen Submodule)
 * 2) Danach optionale Module (fehlende optionale Module dürfen das Laden NICHT abbrechen)
 */

// New base paths reflecting the moved modules into core/ and optional/
const corePath = "js/core";
const optionalPath = "js/optional";

console.log(
  "📦 Loading Specificprogram components (core first, then optional)...",
);

// Initialize global object to track sub-module loading
window.subModulesReady = {};

// Small helper to load a single script and return a promise
async function loadScript(src) {
  try {
    // Check if file exists first
    const response = await fetch(src, { method: "HEAD" });
    if (!response.ok) {
      throw new Error(`File not found: ${src}`);
    }

    // Load the script
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onerror = () => {
        console.error(`❌ Failed to load: ${src}`);
        reject(new Error(`Failed to load ${src}`));
      };
      script.onload = () => {
        console.log(`✅ Loaded: ${src}`);
        resolve();
      };
      document.head.appendChild(script);
    });
  } catch (error) {
    console.error(`❌ Failed to load: ${src} - ${error.message}`);
    throw error;
  }
}

// Promise that resolves when core and optional modules are loaded (lenient for optional)
window.baseModulesReady = (async () => {
  // 1) Load core entrypoint first
  console.log("📥 Loading core/index.js ...");
  await loadScript(`${corePath}/index.js`);

  // 2) CRITICAL: Wait for ALL core sub-modules to finish loading FIRST
  // This ensures Initialization.js (which defines the base initialize method)
  // is loaded BEFORE optional modules try to patch it
  console.log("⏳ Waiting for core sub-modules to finish loading ...");
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
  console.log("✅ Core modules loaded successfully");

  // 3) NOW load optional modules (after core is complete)
  const optionalModules = [
    "tooltip.js",
    "kp-counter.js",
    "color-manager.js",
    "major-minor-selector.js",
    "wahlmodule.js",
  ];

  console.log("📥 Loading optional modules ...");
  const settled = await Promise.allSettled(
    optionalModules.map((m) => loadScript(`${optionalPath}/${m}`)),
  );
  const failed = settled.filter((r) => r.status === "rejected").length;
  if (failed > 0) {
    console.warn(
      `⚠️ Optional modules failed to load: ${failed}. Core continues.`,
    );
  }

  // 4) Wait for optional sub-modules to finish loading
  console.log("⏳ Waiting for optional sub-modules to finish loading ...");
  const optionalKeys = Object.keys(window.subModulesReady).filter(
    (k) => !coreModules.includes(k),
  );
  await Promise.all(
    optionalKeys.map((key) => window.subModulesReady[key]).filter(Boolean),
  );
  console.log("✅ All modules (core + optional) loaded successfully");
})();

console.log("📦 Module loading initiated (core + optional)");
