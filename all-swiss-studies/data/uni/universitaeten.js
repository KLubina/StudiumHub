// Loader for the split university data files.
(function (global) {
  const baseUrl = new URL(".", document.currentScript.src);
  [
    "universitaet-basel.js",
    "universitaet-luzern.js",
    "universitaet-st-gallen.js",
    "universitaet-bern.js",
    "universitaet-freiburg.js",
    "eth-zuerich.js",
    "universitaet-zuerich.js",
    "fernuniversitaet-in-hagen.js",
  ].forEach((file) => {
    document.write(
      `<script src="${new URL(file, baseUrl).toString()}"><\/script>`,
    );
  });

  global.AlleSchweizerStudiengaenge = {
    universitaeten: [
      global.AlleSchweizerStudiengaengeUniversitaetBasel,
      global.AlleSchweizerStudiengaengeUniversitaetLuzern,
      global.AlleSchweizerStudiengaengeUniversitaetStGallen,
      global.AlleSchweizerStudiengaengeUniversitaetBern,
      global.AlleSchweizerStudiengaengeUniversitaetFreiburg,
      global.AlleSchweizerStudiengaengeETHZuerich,
      global.AlleSchweizerStudiengaengeUniversitaetZuerich,
      global.AlleSchweizerStudiengaengeFernUniversitaetInHagen,
    ].filter(Boolean),
  };
})(window);
