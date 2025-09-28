/* shared-udl.js  — UDL site helpers (v2, robust EN/ES toggle + phone injector)
   - Auto-wires EN/ES language toggle for paired pages
   - Works by filename rule and has overrides for special cases
   - Also re-applies local phone number injection used across city pages
*/

(function () {
  // ====== PHONE INVENTORY (E.164) ======
  const PHONES = {
    "newyork": "+16468469664",
    "miami": "+17863212961",
    "philadelphia": "+12153984866",
    "chicago": "+13127785885",
    "washington": "+12029536694",
    "orlando": "+13214150668",
    "boston": "+16177659946"
  };

  // ====== OPTIONAL EXPLICIT OVERRIDES (filename → counterpart) ======
  // Use this only for exceptions. Rule-based swap handles normal pairs.
  const OVERRIDES = {
    // Philadelphia uses singular in EN:
    "philadelphia-attorney.html": "philadelphia-abogados.html",
    "philadelphia-abogados.html": "philadelphia-attorney.html"
    // Add other oddball names here if you ever diverge from the pattern.
  };

  // ====== HELPERS ======
  const fileName = () => (location.pathname.split("/").pop() || "").toLowerCase();
  const isSpanish = () => (document.documentElement.getAttribute("lang") || "en").toLowerCase().startsWith("es");
  const ensureNav = () =>
    document.querySelector(".udl-topnav") ||
    document.querySelector("header nav") ||
    document.querySelector("nav") ||
    document.body;

  function counterpartByRule(name) {
    if (OVERRIDES[name]) return OVERRIDES[name];
    // Generic swap rules:
    if (/-attorneys\.html$/.test(name)) return name.replace(/-attorneys\.html$/, "-abogados.html");
    if (/-abogados\.html$/.test(name)) return name.replace(/-abogados\.html$/, "-attorneys.html");
    return null; // no clear rule
  }

  function setLangToggle() {
    const current = fileName();
    const partner = counterpartByRule(current);
    if (!partner) return; // nothing to do

    // Find or create the toggle anchor
    let toggle = document.querySelector(".lang-toggle");
    if (!toggle) {
      const host = ensureNav();
      toggle = document.createElement("a");
      toggle.className = "lang-toggle";
      // Minimal styling safety if dropped into body
      toggle.style.marginLeft = "auto";
      toggle.style.padding = "0.4rem 0.6rem";
      host.appendChild(toggle);
    }

    const toES = !isSpanish(); // if current is EN, toggle should go to ES
    toggle.href = "/" + partner;
    toggle.setAttribute("rel", "alternate");
    toggle.setAttribute("hreflang", toES ? "es" : "en");
    toggle.textContent = toES ? "Español" : "English";

    // Also update/insert <link rel="alternate"> for SEO (optional but nice)
    // Remove previous auto-inserted links to avoid duplicates
    document.querySelectorAll('link[data-auto="alt-lang"]').forEach(n => n.remove());
    const link = document.createElement("link");
    link.setAttribute("rel", "alternate");
    link.setAttribute("hreflang", toES ? "es" : "en");
    link.setAttribute("href", location.origin + "/" + partner);
    link.setAttribute("data-auto", "alt-lang");
    document.head.appendChild(link);
  }

  // Phone formatting/injection (kept for completeness; harmless if unused)
  function formatUS(e164) {
    const d = (e164 || "").replace(/\D/g, "");
    if (d.length === 11 && d.startsWith("1")) {
      const a = d.slice(1, 4), b = d.slice(4, 7), c = d.slice(7);
      return `(${a}) ${b}-${c}`;
    }
    return e164 || "";
  }
  function detectCityFromFilename() {
    // e.g. boston-attorneys.html -> boston | philadelphia-attorney.html -> philadelphia
    const m = fileName().match(/^([a-z]+)-(attorneys|attorney|abogados)\.html$/i);
    return m ? m[1].toLowerCase() : null;
  }
  function injectPhoneIfPresent() {
    const bodyNum = document.body?.dataset?.number || "";
    let e164 = bodyNum;
    let city = document.body?.dataset?.city || detectCityFromFilename();
    if (!e164 && city && PHONES[city]) e164 = PHONES[city];
    if (!e164) return;

    const pretty = formatUS(e164);
    document.body.dataset.number = e164;
    document.body.dataset.prettyNumber = pretty;

    // Buttons/links that should dial
    document.querySelectorAll(".btn-call,[data-role='call']").forEach(el => {
      if (el.tagName === "A") el.setAttribute("href", `tel:${e164}`);
      if (!el.dataset.keepText) {
        el.textContent = (isSpanish() ? "Llamar " : "Call ") + pretty;
      }
      el.addEventListener("click", () => {
        if (typeof window.udlTrack === "function") {
          window.udlTrack("call_click", { city: city || "unknown", number: e164, pretty, lang: isSpanish() ? "es" : "en" });
        }
      });
    });

    // Any placeholders showing the number
    document.querySelectorAll("[data-bind='number']").forEach(el => (el.textContent = pretty));
  }

  document.addEventListener("DOMContentLoaded", function () {
    setLangToggle();
    injectPhoneIfPresent();
  });

  // Optional no-op tracker so clicks don’t error if you didn’t define one
  window.udlTrack = window.udlTrack || function(){};
})();
