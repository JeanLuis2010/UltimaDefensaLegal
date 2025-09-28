/* shared-udl.js — site-wide helpers for Ultima Defensa Legal
   - Sets local phone number per city/page
   - Formats and injects tel links
   - Tracks call clicks via window.udlTrack (no-op if undefined)
   - Auto-wires EN/ES language toggle for paired pages
*/

(function () {
  // --- Phone inventory (E.164) ---
  const PHONES = {
    "newyork": "+16468469664",       // New York, NY  (212/646 area)
    "miami": "+17863212961",         // Miami, FL
    "philadelphia": "+12153984866",  // Philadelphia, PA
    "chicago": "+13127785885",       // Chicago, IL
    "washington": "+12029536694",    // Washington, DC
    "orlando": "+13214150668",       // Orlando, FL
    "boston": "+16177659946"         // Boston, MA
  };

  // --- English/Spanish page pairs (filename without leading slash) ---
  const LANG_PAIRS = {
    "newyork-attorneys.html": "newyork-abogados.html",
    "newyork-abogados.html": "newyork-attorneys.html",
    "miami-attorneys.html": "miami-abogados.html",
    "miami-abogados.html": "miami-attorneys.html",
    "philadelphia-attorneys.html": "philadelphia-abogados.html",
    "philadelphia-abogados.html": "philadelphia-attorneys.html",
    "chicago-attorneys.html": "chicago-abogados.html",
    "chicago-abogados.html": "chicago-attorneys.html",
    "washington-attorneys.html": "washington-abogados.html",
    "washington-abogados.html": "washington-attorneys.html",
    "orlando-attorneys.html": "orlando-abogados.html",
    "orlando-abogados.html": "orlando-attorneys.html",
    "boston-attorneys.html": "boston-abogados.html",
    "boston-abogados.html": "boston-attorneys.html"
  };

  // --- Helpers ---
  const pad = s => String(s || "");
  function formatUS(e164) {
    // "+12029536694" -> "(202) 953-6694"
    const d = (e164 || "").replace(/\D/g, "");
    if (d.length === 11 && d.startsWith("1")) {
      const a = d.slice(1, 4), b = d.slice(4, 7), c = d.slice(7);
      return `(${a}) ${b}-${c}`;
    }
    return e164 || "";
  }

  function detectCityFromFilename() {
    const file = location.pathname.split("/").pop();
    // e.g., "boston-attorneys.html" → "boston"
    const m = file.match(/^([a-z]+)-(attorneys|abogados)\.html$/i);
    return m ? m[1].toLowerCase() : null;
  }

  function currentLang() {
    const htmlLang = document.documentElement.getAttribute("lang") || "en";
    return htmlLang.toLowerCase().startsWith("es") ? "es" : "en";
  }

  function numberForCity(city) {
    const key = (city || "").toLowerCase();
    return PHONES[key] || null;
  }

  function injectPhone(e164, city, lang) {
    if (!e164) return;
    const pretty = formatUS(e164);

    // 1) Any elements with class .btn-call or [data-role="call"]
    document.querySelectorAll(".btn-call,[data-role='call']").forEach(el => {
      if (el.tagName === "A") el.setAttribute("href", `tel:${e164}`);
      // If element contains a US number, replace text
      if (!el.dataset.keepText) el.textContent = (lang === "es" ? "Llamar " : "Call ") + pretty;
      el.addEventListener("click", () => {
        if (typeof window.udlTrack === "function") {
          window.udlTrack("call_click", { city, number: e164, pretty, lang });
        }
      }, { once: false });
    });

    // 2) Any elements marked with data-bind="number"
    document.querySelectorAll("[data-bind='number']").forEach(el => {
      el.textContent = pretty;
    });

    // 3) Body dataset for other scripts/styles if needed
    document.body.dataset.number = e164;
    document.body.dataset.prettyNumber = pretty;
  }

  function wireLanguageToggle() {
    const file = location.pathname.split("/").pop();
    const partner = LANG_PAIRS[file];
    if (!partner) return;

    // Find an existing toggle or create one in header nav
    let toggle = document.querySelector(".lang-toggle");
    if (!toggle) {
      const nav = document.querySelector(".udl-topnav") || document.querySelector("nav") || document.body;
      toggle = document.createElement("a");
      toggle.className = "lang-toggle";
      nav.appendChild(toggle);
    }
    const isEs = currentLang() === "es";
    toggle.href = "/" + partner;
    toggle.setAttribute("rel", "alternate");
    toggle.setAttribute("hreflang", isEs ? "en" : "es");
    toggle.textContent = isEs ? "English" : "Español";
  }

  document.addEventListener("DOMContentLoaded", () => {
    // Priority order for deciding the phone:
    //  1) <body data-number="+1..."> (page explicit)
    //  2) City inferred from file name mapping -> PHONES
    //  3) leave unchanged if none
    const lang = currentLang();
    let e164 = document.body && document.body.dataset && pad(document.body.dataset.number);
    let city = (document.body && document.body.dataset && document.body.dataset.city) || detectCityFromFilename();

    if (!e164 && city) e164 = numberForCity(city);

    if (e164) {
      injectPhone(e164, city || "unknown", lang);
    }
    wireLanguageToggle();
  });

  // Expose minimal API (optional)
  window.udl = {
    getCity: detectCityFromFilename,
    getNumber: () => document.body?.dataset?.number || null,
    setNumber: (e164, city) => injectPhone(e164, city || detectCityFromFilename(), currentLang())
  };
})();
