// Loader for the split FH data files.
(function (global) {
  const baseUrl = new URL(".", document.currentScript.src);
  [
    "berner-fachhochschule.js",
    "fh-graubuenden.js",
    "fhnw.js",
    "ostschweizer-fachhochschule.js",
    "zhaw.js",
    "zhdk.js",
    "hslu.js",
    "ffhs.js",
  ].forEach((file) => {
    document.write(
      `<script src="${new URL(file, baseUrl).toString()}"><\/script>`,
    );
  });

  global.AlleFHStudiengaenge = {
    fachhochschulen: [
      global.AlleFHStudiengaengeBernerFachhochschule,
      global.AlleFHStudiengaengeFHGraubuenden,
      global.AlleFHStudiengaengeFHNW,
      global.AlleFHStudiengaengeOstschweizerFachhochschule,
      global.AlleFHStudiengaengeZHAW,
      global.AlleFHStudiengaengeZHdK,
      global.AlleFHStudiengaengeHSLU,
      global.AlleFHStudiengaengeFFHS,
    ].filter(Boolean),
  };
})(window);
