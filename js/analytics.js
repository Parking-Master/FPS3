(async () => {
  await import("https://www.googletagmanager.com/gtag/js?id=G-GWRDPSLTC8");
  window.dataLayer = window.dataLayer || [];
  function uploadAnalytic() {
    dataLayer.push(arguments);
  }
  let tag = "G-GWRDPSLTC8";
  uploadAnalytic("js", new Date());
  uploadAnalytic("config", tag);
})();