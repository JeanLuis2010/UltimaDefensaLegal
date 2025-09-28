/* shared-udl.js — Language toggle + phone injector (v3)
   - Supports two buttons (EN/ES) or single .lang-toggle link
   - Rule-based page pairing + explicit overrides for exceptions
*/

(function () {
  // --- explicit pairs for pages that don't follow the pattern or for the home page
  // If you add a Spanish home page, name it `index-es.html`.
  const EXPLICIT = {
    "index.html": { es: "index-es.html" },
    "index-es.html": { en: "index.html" },
    "philadelphia-attorney.html": { es: "philadelphia-abogados.html" },
    "philadelphia-abogados.html": { en: "philadelphia-attorney.html" }
    // Add more one-offs here if needed.
  };

  // ---- helpers
  const file = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  const $ = (sel) => document.querySelector(sel);
  const isES = () => (document.documentElement.getAttribute("lang") || "en").toLowerCase().startsWith("es");

  function partnerByRule(fname, to) {
    if (EXPLICIT[fname] && EXPLICIT[fname][to]) return EXPLICIT[fname][to];

    // Pattern pairs for city pages
    if (to === "es" && /-attorneys\.html$/.test(fname)) {
      return fname.replace(/-attorneys\.html$/, "-abogados.html");
    }
    if (to === "en" && /-abogados\.html$/.test(fname)) {
      return fname.replace(/-abogados\.html$/, "-attorneys.html");
    }

    // If nothing matches, give up (no navigation change)
    return null;
  }

  function setAltLink(to, href) {
    // Remove prior auto links to avoid duplicates
    document.querySelectorAll('link[data-auto="alt-lang"]').forEach(n => n.remove());
    if (!href) return;
    const link = document.createElement("link");
    link.rel = "alternate";
    link.hreflang = to === "es" ? "es" : "en";
    link.href = href.startsWith("http") ? href : (location.origin + "/" + href.replace(/^\//, ""));
    link.setAttribute("data-auto", "alt-lang");
    document.head.appendChild(link);
  }

  function wireToggles() {
    // Your two pills:
    const btnEN = $(".toggle-en") || $("#toggle-en") || $('[data-lang="en"]');
    const btnES = $(".toggle-es") || $("#toggle-es") || $('[data-lang="es"]');

    // Single-link fallback:
    let single = $(".lang-toggle");

    const toES = partnerByRule(file, "es");
    const toEN = partnerByRule(file, "en");

    // set hrefs if buttons exist
    if (btnEN && toEN) {
      btnEN.setAttribute("href", "/" + toEN);
      btnEN.setAttribute("rel", "alternate");
      btnEN.setAttribute("hreflang", "en");
    }
    if (btnES && toES) {
      btnES.setAttribute("href", "/" + toES);
      btnES.setAttribute("rel", "alternate");
      btnES.setAttribute("hreflang", "es");
    }

    // create a single link if neither button exists
    if (!btnEN && !btnES) {
      if (!single) {
        single = document.createElement("a");
        single.className = "lang-toggle";
        // try to place it in the same header area as your pills
        (document.querySelector("header") || document.body).appendChild(single);
      }
      const goTo = isES() ? toEN : toES;
      if (goTo) {
        single.href = "/" + goTo;
        single.textContent = isES() ? "English" : "Español";
        single.setAttribute("rel", "alternate");
        single.setAttribute("hreflang", isES() ? "en" : "es");
      }
    }

    // SEO alternate link (nice to have)
    const altHref = isES() ? (toEN ? "/" + toEN : null) : (toES ? "/" + toES : null);
    setAltLink(isES() ? "en" : "es", altHref);
  }

  // Optional: keep the phone injection that other pages expect (safe if unused)
  function formatUS(e164) {
    const d = (e164 || "").replace(/\D/g, "");
    if (d.length === 11 && d.startsWith("1")) {
      const a = d.slice(1, 4), b = d.slice(4, 7), c = d.slice(7);
      return `(${a}) ${b}-${c}`;
    }
    return e164 || "";
  }
  function injectPhones() {
    const e164 = document.body?.dataset?.number;
    if (!e164) return;
    const pretty = formatUS(e164);
    document.querySelectorAll(".btn-call,[data-role='call']").forEach(el => {
      if (el.tagName === "A") el.href = `tel:${e164}`;
      if (!el.dataset.keepText) el.textContent = (isES() ? "Llamar " : "Call ") + pretty;
    });
    document.querySelectorAll("[data-bind='number']").forEach(el => (el.textContent = pretty));
  }

  document.addEventListener("DOMContentLoaded", function () {
    wireToggles();
    injectPhones();
  });
})();
