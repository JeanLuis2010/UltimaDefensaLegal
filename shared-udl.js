/* shared-udl.js — unified language toggle + helpers
   Drop-in: replace the whole file with this content.
*/
(function () {
  // ---- CONFIG: exact file mappings in your repo ----
  const MAP = {
    // home
    "index.html": "es-index.html",
    "es-index.html": "index.html",

    // cities (east coast + Chicago)
    "boston-attorneys.html": "boston-abogados.html",
    "boston-abogados.html": "boston-attorneys.html",

    "newark-attorneys.html": "newark-abogados.html",
    "newark-abogados.html": "newark-attorneys.html",

    "newyork-attorneys.html": "newyork-abogados.html",
    "newyork-abogados.html": "newyork-attorneys.html",
    // legacy alias some files used earlier—keep both working:
    "nuevayork-abogados.html": "newyork-attorneys.html",

    "philadelphia-attorneys.html": "philadelphia-abogados.html",
    "philadelphia-abogados.html": "philadelphia-attorneys.html",
    // if a singular version appears, map it too:
    "philadelphia-attorney.html": "philadelphia-abogados.html",

    "washington-attorneys.html": "washington-abogados.html",
    "washington-abogados.html": "washington-attorneys.html",

    "miami-attorneys.html": "miami-abogados.html",
    "miami-abogados.html": "miami-attorneys.html",

    "chicago-attorneys.html": "chicago-abogados.html",
    "chicago-abogados.html": "chicago-attorneys.html",

    "orlando-attorneys.html": "orlando-abogados.html",
    "orlando-abogados.html": "orlando-attorneys.html"
  };

  // Fallback rule: try swapping attorneys<->abogados in the filename
  function smartSwap(file) {
    if (file.includes("attorneys")) return file.replace("attorneys", "abogados");
    if (file.includes("abogados")) return file.replace("abogados", "attorneys");
    if (file === "index.html") return "es-index.html";
    if (file === "es-index.html") return "index.html";
    return file;
  }

  function baseFile(pathname) {
    const p = pathname.split("/").filter(Boolean);
    let f = p.length ? p[p.length - 1] : "index.html";
    // Normalize Netlify “/” to index.html
    if (!/\./.test(f)) f = "index.html";
    return f;
  }

  // Expose small API
  window.UDL = window.UDL || {};
  window.UDL.lang = {
    go: function (to) {
      const here = baseFile(location.pathname);
      const mapped = MAP[here] || smartSwap(here);
      // if user asked for the current language, just no-op
      if ((to === "es" && (MAP[here] || here).includes("abogados")) ||
          (to === "en" && (MAP[here] || here).includes("attorneys"))) return;
      // Navigate (same folder structure—root level files)
      const dest = mapped;
      if (dest && dest !== here) location.href = "/" + dest;
    },
    // mark active pill when the page loads
    markActive: function () {
      const file = baseFile(location.pathname);
      const es = document.querySelector('[data-lang-btn="es"]');
      const en = document.querySelector('[data-lang-btn="en"]');
      const isES = /(^|\/)(es-|.*abogados\.html)$/.test(file);
      [es, en].forEach(b => b && b.classList.remove("active"));
      (isES ? es : en)?.classList.add("active");
    }
  };

  // Auto-mark on DOM ready
  document.addEventListener("DOMContentLoaded", function () {
    window.UDL.lang.markActive();
  });
})();
