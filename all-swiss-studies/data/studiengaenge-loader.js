// Single entrypoint for all Swiss study program data.
(function (global) {
  const baseUrl = new URL(".", document.currentScript.src);

  const files = [
    "uni/universitaet-basel.js",
    "uni/universitaet-luzern.js",
    "uni/universitaet-st-gallen.js",
    "uni/universitaet-bern.js",
    "uni/universitaet-freiburg.js",
    "uni/eth-zuerich.js",
    "uni/universitaet-zuerich.js",
    "uni/fernuniversitaet-in-hagen.js",
    "fh/berner-fachhochschule.js",
    "fh/fh-graubuenden.js",
    "fh/fhnw.js",
    "fh/ostschweizer-fachhochschule.js",
    "fh/zhaw.js",
    "fh/zhdk.js",
    "fh/hslu.js",
    "fh/ffhs.js",
  ];

  const scriptTags = files
    .map(
      (file) => `<script src="${new URL(file, baseUrl).toString()}"><\/script>`,
    )
    .join("");

  const initScript = `
    <script>
      window.AlleSchweizerStudiengaenge = {
        universitaeten: [
          window.AlleSchweizerStudiengaengeUniversitaetBasel,
          window.AlleSchweizerStudiengaengeUniversitaetLuzern,
          window.AlleSchweizerStudiengaengeUniversitaetStGallen,
          window.AlleSchweizerStudiengaengeUniversitaetBern,
          window.AlleSchweizerStudiengaengeUniversitaetFreiburg,
          window.AlleSchweizerStudiengaengeETHZuerich,
          window.AlleSchweizerStudiengaengeUniversitaetZuerich,
          window.AlleSchweizerStudiengaengeFernUniversitaetInHagen,
        ].filter(Boolean),
      };

      window.AlleFHStudiengaenge = {
        fachhochschulen: [
          window.AlleFHStudiengaengeBernerFachhochschule,
          window.AlleFHStudiengaengeFHGraubuenden,
          window.AlleFHStudiengaengeFHNW,
          window.AlleFHStudiengaengeOstschweizerFachhochschule,
          window.AlleFHStudiengaengeZHAW,
          window.AlleFHStudiengaengeZHdK,
          window.AlleFHStudiengaengeHSLU,
          window.AlleFHStudiengaengeFFHS,
        ].filter(Boolean),
      };
    <\/script>`;

  document.write(scriptTags + initScript);
})(window);
